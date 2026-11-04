/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { LESSONS, MODULES } from './data/lessons';
import { Lesson, ExecutionResult } from './types';
import { executeGoCode } from './utils/goInterpreter';
import { TopBar } from './components/TopBar';
import { LessonViewer } from './components/LessonViewer';
import { CodeEditor } from './components/CodeEditor';
import { OutputConsole } from './components/OutputConsole';
import { TableOfContentsModal } from './components/TableOfContentsModal';
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

  // Modals state
  const [isTOCOpen, setIsTOCOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);

  // Mobile tab state
  const [mobileTab, setMobileTab] = useState<'tutorial' | 'code'>('tutorial');

  // Save lesson index
  useEffect(() => {
    localStorage.setItem('tour_go_lesson_index', String(currentLessonIndex));
    // Clear old execution result when switching slides
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
    // Slight tick to allow UI to show running state
    setTimeout(() => {
      const res = executeGoCode(currentCode, currentLesson.id);
      setExecutionResult(res);
      setIsRunning(false);

      // If exercise and all tests passed, auto-mark completed
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

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter or Cmd+Enter to Run
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
        return;
      }

      // Alt+Right for Next slide
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }

      // Alt+Left for Previous slide
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
        return;
      }

      // Escape to close open modals
      if (e.key === 'Escape') {
        setIsTOCOpen(false);
        setIsShortcutsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunCode, handleNext, handlePrevious]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Top Navigation Bar */}
      <TopBar
        onOpenTOC={() => setIsTOCOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(prev => !prev)}
        activeModuleId={currentLesson.moduleId}
        onSelectModule={handleSelectModule}
      />

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex items-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-semibold">
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

      {/* Main Split-Screen Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: Tutorial & Lesson Guide */}
        <section
          className={`w-full md:w-[48%] lg:w-[45%] xl:w-[42%] h-full shrink-0 ${
            mobileTab === 'code' ? 'hidden md:block' : 'block'
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
          />
        </section>

        {/* Right Panel: Code Editor on Top, Terminal Console on Bottom */}
        <section
          className={`w-full md:flex-1 h-full flex flex-col bg-slate-900 overflow-hidden ${
            mobileTab === 'tutorial' ? 'hidden md:flex' : 'flex'
          }`}
          aria-label="Code playground and terminal"
        >
          {/* Top 62% Code Editor */}
          <div className="flex-1 min-h-[300px] overflow-hidden">
            <CodeEditor
              code={currentCode}
              onChange={handleCodeChange}
              onRun={handleRunCode}
              onReset={handleResetCode}
              isRunning={isRunning}
            />
          </div>

          {/* Bottom 38% Output Console */}
          <div className="h-[260px] lg:h-[300px] shrink-0 overflow-hidden">
            <OutputConsole
              result={executionResult}
              isRunning={isRunning}
              onClear={() => setExecutionResult(null)}
              isExercise={currentLesson.isExercise}
            />
          </div>
        </section>
      </main>

      {/* Table of Contents Modal */}
      <TableOfContentsModal
        isOpen={isTOCOpen}
        onClose={() => setIsTOCOpen(false)}
        currentLessonId={currentLesson.id}
        onSelectLesson={handleSelectLesson}
        completedLessonIds={completedLessonIds}
      />

      {/* Shortcuts Help Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
