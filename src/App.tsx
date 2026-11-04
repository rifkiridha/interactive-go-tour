/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LESSONS, MODULES } from './data/lessons';
import { Lesson, ExecutionResult } from './types';
import { executeGoCode } from './utils/goInterpreter';
import { TopBar } from './components/TopBar';
import { LessonViewer } from './components/LessonViewer';
import { CodeEditor } from './components/CodeEditor';
import { OutputConsole } from './components/OutputConsole';
import { SidebarTOC } from './components/SidebarTOC';
import { SubjectSwitcherModal } from './components/SubjectSwitcherModal';
import { ShortcutsModal } from './components/ShortcutsModal';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('tour_go_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark class to documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tour_go_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tour_go_theme', 'light');
    }
  }, [darkMode]);

  // Lesson state
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(() => {
    const saved = localStorage.getItem('tour_go_lesson_index');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const currentLesson: Lesson = LESSONS[currentLessonIndex] || LESSONS[0];

  // Saved code modifications per lesson
  const [userCodes, setUserCodes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('tour_go_user_codes');
    return saved ? JSON.parse(saved) : {};
  });

  // Track completed lessons
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('tour_go_completed_lessons');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Active code for currently selected lesson
  const currentCode = userCodes[currentLesson.id] !== undefined
    ? userCodes[currentLesson.id]
    : currentLesson.defaultCode;

  // Execution state
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Subject switcher & Modals state
  const [activeSubjectId, setActiveSubjectId] = useState<string>('tour-of-go');
  const [isSubjectsOpen, setIsSubjectsOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);

  // Mobile tab state
  const [mobileTab, setMobileTab] = useState<'tutorial' | 'code'>('tutorial');

  // Adjustable layout splitter states & refs
  const mainContainerRef = useRef<HTMLElement>(null);
  const rightPanelRef = useRef<HTMLElement>(null);

  // Sidebar Table of Contents (W3Schools style)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem('tour_go_sidebar_open');
    return saved !== null ? saved === 'true' : true;
  });
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    const saved = localStorage.getItem('tour_go_sidebar_width');
    return saved !== null ? Math.min(460, Math.max(200, parseInt(saved, 10))) : 260;
  });
  const [isDraggingSidebar, setIsDraggingSidebar] = useState<boolean>(false);

  // Horizontal split (Center Lesson width % relative to editor)
  const [hSplitPercent, setHSplitPercent] = useState<number>(() => {
    const saved = localStorage.getItem('tour_go_h_split');
    return saved !== null ? Math.min(75, Math.max(25, parseFloat(saved))) : 45;
  });
  const [isDraggingH, setIsDraggingH] = useState<boolean>(false);

  // Vertical split (Terminal height % of right panel)
  const [vSplitPercent, setVSplitPercent] = useState<number>(() => {
    const saved = localStorage.getItem('tour_go_v_split');
    return saved !== null ? Math.min(75, Math.max(15, parseFloat(saved))) : 35;
  });
  const [isDraggingV, setIsDraggingV] = useState<boolean>(false);

  // Save lesson index
  useEffect(() => {
    localStorage.setItem('tour_go_lesson_index', String(currentLessonIndex));
    setExecutionResult(null);
  }, [currentLessonIndex]);

  // Save user code edits
  const handleCodeChange = (newCode: string) => {
    setUserCodes(prev => {
      const updated = { ...prev, [currentLesson.id]: newCode };
      localStorage.setItem('tour_go_user_codes', JSON.stringify(updated));
      return updated;
    });
  };

  // Reset code to default for this lesson
  const handleResetCode = () => {
    setUserCodes(prev => {
      const updated = { ...prev };
      delete updated[currentLesson.id];
      localStorage.setItem('tour_go_user_codes', JSON.stringify(updated));
      return updated;
    });
    setExecutionResult(null);
  };

  // Apply canonical solution
  const handleApplySolution = (solutionCode: string) => {
    handleCodeChange(solutionCode);
  };

  // Toggle completed status
  const handleToggleCompleted = () => {
    setCompletedLessonIds(prev => {
      const next = new Set(prev);
      if (next.has(currentLesson.id)) {
        next.delete(currentLesson.id);
      } else {
        next.add(currentLesson.id);
      }
      localStorage.setItem('tour_go_completed_lessons', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // Run code handler
  const handleRunCode = useCallback(() => {
    setIsRunning(true);
    setTimeout(() => {
      const res = executeGoCode(currentCode, currentLesson.id);
      setExecutionResult(res);
      setIsRunning(false);

      if (currentLesson.isExercise && res.testResults?.every(t => t.passed)) {
        setCompletedLessonIds(prev => {
          const next = new Set(prev);
          next.add(currentLesson.id);
          localStorage.setItem('tour_go_completed_lessons', JSON.stringify(Array.from(next)));
          return next;
        });
      }
    }, 150);
  }, [currentCode, currentLesson.id, currentLesson.isExercise]);

  // Lesson navigation
  const handlePrevious = useCallback(() => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    }
  }, [currentLessonIndex]);

  const handleNext = useCallback(() => {
    if (currentLessonIndex < LESSONS.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    }
  }, [currentLessonIndex]);

  const handleSelectLesson = (lesson: Lesson) => {
    const idx = LESSONS.findIndex(l => l.id === lesson.id);
    if (idx !== -1) {
      setCurrentLessonIndex(idx);
    }
  };

  const handleSelectModule = (moduleId: string) => {
    const mod = MODULES.find(m => m.id === moduleId);
    if (mod && mod.lessons.length > 0) {
      handleSelectLesson(mod.lessons[0]);
    }
  };

  // Toggle sidebar collapse
  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => {
      const next = !prev;
      localStorage.setItem('tour_go_sidebar_open', String(next));
      return next;
    });
  };

  // ---------------- Sidebar Width Dragging ----------------
  const handlePointerDownSidebar = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDraggingSidebar(true);
  };

  useEffect(() => {
    if (!isDraggingSidebar) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!mainContainerRef.current) return;
      const rect = mainContainerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      setSidebarWidth(Math.min(460, Math.max(200, newWidth)));
    };

    const handlePointerUp = () => {
      setIsDraggingSidebar(false);
      localStorage.setItem('tour_go_sidebar_width', String(sidebarWidth));
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDraggingSidebar, sidebarWidth]);

  // ---------------- Horizontal Splitter Dragging (Center vs Right) ----------------
  const handlePointerDownH = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDraggingH(true);
  };

  useEffect(() => {
    if (!isDraggingH) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!mainContainerRef.current) return;
      const rect = mainContainerRef.current.getBoundingClientRect();
      const effectiveLeft = isSidebarOpen ? sidebarWidth : 40;
      const availableWidth = rect.width - effectiveLeft;
      if (availableWidth <= 0) return;

      const offsetInRemaining = e.clientX - (rect.left + effectiveLeft);
      const newPercent = (offsetInRemaining / availableWidth) * 100;
      setHSplitPercent(Math.min(75, Math.max(25, newPercent)));
    };

    const handlePointerUp = () => {
      setIsDraggingH(false);
      localStorage.setItem('tour_go_h_split', String(hSplitPercent));
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDraggingH, hSplitPercent, isSidebarOpen, sidebarWidth]);

  // ---------------- Vertical Splitter Dragging (Editor vs Terminal) ----------------
  const handlePointerDownV = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDraggingV(true);
  };

  useEffect(() => {
    if (!isDraggingV) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!rightPanelRef.current) return;
      const rect = rightPanelRef.current.getBoundingClientRect();
      const fromBottomPercent = ((rect.bottom - e.clientY) / rect.height) * 100;
      setVSplitPercent(Math.min(75, Math.max(15, fromBottomPercent)));
    };

    const handlePointerUp = () => {
      setIsDraggingV(false);
      localStorage.setItem('tour_go_v_split', String(vSplitPercent));
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDraggingV, vSplitPercent]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
        return;
      }

      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }

      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
        return;
      }

      if (e.key === 'Escape') {
        setIsSubjectsOpen(false);
        setIsShortcutsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunCode, handleNext, handlePrevious]);

  return (
    <div
      className={`flex flex-col h-screen w-screen overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 ${
        isDraggingSidebar || isDraggingH
          ? 'cursor-col-resize select-none'
          : isDraggingV
          ? 'cursor-row-resize select-none'
          : ''
      }`}
    >
      {/* Top Navigation Bar with Platform Branding & Subjects Switcher */}
      <TopBar
        onOpenSubjects={() => setIsSubjectsOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(prev => !prev)}
        activeModuleId={currentLesson.moduleId}
        onSelectModule={handleSelectModule}
        activeSubjectTitle="Go"
      />

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex items-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-semibold shrink-0">
        <button
          onClick={() => setMobileTab('tutorial')}
          className={`flex-1 py-1.5 text-center rounded-md transition-colors ${
            mobileTab === 'tutorial'
              ? 'bg-[#00ADD8] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Lesson
        </button>
        <button
          onClick={() => setMobileTab('code')}
          className={`flex-1 py-1.5 text-center rounded-md transition-colors ${
            mobileTab === 'code'
              ? 'bg-[#00ADD8] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Editor & Run
        </button>
      </div>

      {/* Main 3-Zone Workspace */}
      <main
        ref={mainContainerRef}
        className="flex-1 flex overflow-hidden relative"
      >
        {/* 1. Leftmost Panel: W3Schools-Style Scrollable & Collapsible Table of Contents */}
        <SidebarTOC
          currentLessonId={currentLesson.id}
          onSelectLesson={handleSelectLesson}
          completedLessonIds={completedLessonIds}
          isOpen={isSidebarOpen}
          onToggleOpen={handleToggleSidebar}
          width={sidebarWidth}
        />

        {/* Sidebar Resizable Splitter (Invisible at rest, illuminated on hover) */}
        {isSidebarOpen && (
          <div
            onPointerDown={handlePointerDownSidebar}
            onDoubleClick={() => setSidebarWidth(260)}
            title="Drag to resize syllabus width · Double-click to reset"
            className={`hidden md:flex relative cursor-col-resize shrink-0 z-20 group select-none items-center justify-center w-1 hover:w-1 -mx-0.5 transition-colors duration-150 ${
              isDraggingSidebar
                ? 'bg-[#00ADD8] shadow-xs'
                : 'bg-transparent hover:bg-[#00ADD8]'
            }`}
          >
            <div className="absolute inset-y-0 -left-2 -right-2 cursor-col-resize" />
          </div>
        )}

        {/* 2. Middle Panel: Tutorial Guide (Lesson Content) */}
        <section
          style={{ width: `${hSplitPercent}%` }}
          className={`h-full shrink-0 min-w-[280px] overflow-hidden ${
            mobileTab === 'code' ? 'hidden md:block' : 'w-full md:w-auto block'
          }`}
          aria-label="Lesson content"
        >
          <LessonViewer
            lesson={currentLesson}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={currentLessonIndex > 0}
            hasNext={currentLessonIndex < LESSONS.length - 1}
            isCompleted={completedLessonIds.has(currentLesson.id)}
            onToggleCompleted={handleToggleCompleted}
            onApplySolution={handleApplySolution}
            currentIndex={currentLessonIndex}
            totalLessons={LESSONS.length}
            darkMode={darkMode}
          />
        </section>

        {/* Horizontal Splitter (Tutorial vs Code Editor) */}
        <div
          onPointerDown={handlePointerDownH}
          onDoubleClick={() => setHSplitPercent(45)}
          title="Drag to resize panels · Double-click to reset"
          className={`hidden md:flex relative cursor-col-resize shrink-0 z-20 group select-none items-center justify-center w-1 hover:w-1 -mx-0.5 transition-colors duration-150 ${
            isDraggingH
              ? 'bg-[#00ADD8] shadow-xs'
              : 'bg-transparent hover:bg-[#00ADD8]'
          }`}
        >
          <div className="absolute inset-y-0 -left-2 -right-2 cursor-col-resize" />
        </div>

        {/* 3. Right Panel: Code Editor on Top, Terminal Console on Bottom */}
        <section
          ref={rightPanelRef}
          className={`h-full flex flex-col bg-[#FDFBF2] dark:bg-slate-900 overflow-hidden shrink-0 flex-1 min-w-[320px] ${
            mobileTab === 'tutorial' ? 'hidden md:flex' : 'w-full md:w-auto flex'
          }`}
          aria-label="Code playground and terminal"
        >
          {/* Top Code Editor */}
          <div
            style={{ height: `${100 - vSplitPercent}%` }}
            className="min-h-[140px] overflow-hidden flex flex-col"
          >
            <CodeEditor
              code={currentCode}
              onChange={handleCodeChange}
              onRun={handleRunCode}
              onReset={handleResetCode}
              isRunning={isRunning}
              darkMode={darkMode}
            />
          </div>

          {/* Vertical Splitter (Editor vs Terminal) */}
          <div
            onPointerDown={handlePointerDownV}
            onDoubleClick={() => setVSplitPercent(35)}
            title="Drag to resize terminal · Double-click to reset"
            className={`relative cursor-row-resize shrink-0 z-20 group select-none items-center justify-center h-1 hover:h-1 -my-0.5 transition-colors duration-150 ${
              isDraggingV
                ? 'bg-[#00ADD8] shadow-xs'
                : 'bg-transparent hover:bg-[#00ADD8]'
            }`}
          >
            <div className="absolute inset-x-0 -top-2 -bottom-2 cursor-row-resize" />
          </div>

          {/* Bottom Output Console */}
          <div
            style={{ height: `${vSplitPercent}%` }}
            className="min-h-[120px] overflow-hidden flex flex-col"
          >
            <OutputConsole
              result={executionResult}
              isRunning={isRunning}
              onClear={() => setExecutionResult(null)}
              isExercise={currentLesson.isExercise}
              darkMode={darkMode}
            />
          </div>
        </section>
      </main>

      {/* Subjects & Learning Tracks Modal (replaces the old TOC button) */}
      <SubjectSwitcherModal
        isOpen={isSubjectsOpen}
        onClose={() => setIsSubjectsOpen(false)}
        activeSubjectId={activeSubjectId}
        onSelectSubject={(id) => setActiveSubjectId(id)}
      />

      {/* Shortcuts Help Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
