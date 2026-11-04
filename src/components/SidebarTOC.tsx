import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { MODULES, LESSONS } from '../data/lessons';
import { Lesson } from '../types';

interface SidebarTOCProps {
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  completedLessonIds: Set<string>;
  isOpen: boolean;
  onToggleOpen: () => void;
  width: number;
}

export const SidebarTOC: React.FC<SidebarTOCProps> = ({
  currentLessonId,
  onSelectLesson,
  completedLessonIds,
  isOpen,
  onToggleOpen,
  width,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedModuleIds, setCollapsedModuleIds] = useState<Set<string>>(new Set());

  const toggleModuleCollapse = (moduleId: string) => {
    setCollapsedModuleIds((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return MODULES;
    const q = searchQuery.toLowerCase();
    return MODULES.map((m) => ({
      ...m,
      lessons: m.lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.content.toLowerCase().includes(q)
      ),
    })).filter((m) => m.lessons.length > 0);
  }, [searchQuery]);

  const totalLessons = LESSONS.length;
  const completedCount = completedLessonIds.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // When collapsed: show a slim sidebar strip with the expand toggle button
  if (!isOpen) {
    return (
      <aside
        className="w-10 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center py-3 select-none shrink-0 transition-all duration-200 z-10"
        aria-label="Collapsed Table of Contents"
      >
        <button
          onClick={onToggleOpen}
          title="Show Table of Contents"
          className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          aria-label="Expand Table of Contents"
        >
          <ChevronRight className="w-4 h-4 text-[#00ADD8]" />
        </button>
        <div
          onClick={onToggleOpen}
          className="cursor-pointer writing-mode-vertical mt-6 text-[11px] font-semibold text-slate-500 hover:text-[#00ADD8] dark:text-slate-400 dark:hover:text-[#00ADD8] tracking-wider uppercase transition-colors"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Table of Contents
        </div>
      </aside>
    );
  }

  return (
    <aside
      style={{ width: `${width}px` }}
      className="h-full bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col select-text shrink-0 overflow-hidden z-10 transition-[width] duration-75"
      aria-label="Table of Contents Navigation"
    >
      {/* Sidebar Header: Go Logo + A Tour of Go + Collapse Arrow */}
      <div className="flex items-center justify-between px-3.5 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/90 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-6 h-6 rounded bg-[#00ADD8] flex items-center justify-center text-white font-extrabold text-xs tracking-tighter shrink-0 shadow-2xs">
            Go
          </span>
          <div className="min-w-0">
            <h2 className="text-xs font-bold text-slate-900 dark:text-white tracking-tight truncate">
              A Tour of Go
            </h2>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {completedCount} / {totalLessons} done ({progressPercent}%)
            </div>
          </div>
        </div>

        {/* Arrow button to hide/collapse Table of Contents */}
        <button
          onClick={onToggleOpen}
          title="Collapse Table of Contents"
          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          aria-label="Collapse Table of Contents"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input Filter */}
      <div className="p-2.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Filter topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-md text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#00ADD8]"
          />
        </div>
      </div>

      {/* Scrollable Curriculum List (W3Schools / Docs style) */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
        {filteredModules.map((module) => {
          const isCollapsed = collapsedModuleIds.has(module.id);
          const completedInModule = module.lessons.filter((l) =>
            completedLessonIds.has(l.id)
          ).length;

          return (
            <div key={module.id} className="space-y-1">
              {/* Module Accordion Header */}
              <button
                onClick={() => toggleModuleCollapse(module.id)}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:text-[#00ADD8] dark:hover:text-[#00ADD8] transition-colors group"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 transition-transform ${
                      isCollapsed ? '-rotate-90' : 'rotate-0'
                    }`}
                  />
                  <span className="truncate">{module.title}</span>
                </div>
                <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500 shrink-0 ml-1">
                  {completedInModule}/{module.lessons.length}
                </span>
              </button>

              {/* Lesson Items */}
              {!isCollapsed && (
                <div className="space-y-0.5 pl-3 border-l border-slate-200 dark:border-slate-800 ml-2.5">
                  {module.lessons.map((lesson) => {
                    const isCurrent = lesson.id === currentLessonId;
                    const isCompleted = completedLessonIds.has(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`w-full flex items-center justify-between text-left px-2 py-1.5 rounded text-xs transition-colors group ${
                          isCurrent
                            ? 'bg-[#00ADD8]/10 text-[#00ADD8] dark:bg-[#00ADD8]/20 font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-1">
                          {isCompleted ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          ) : (
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                isCurrent
                                  ? 'bg-[#00ADD8]'
                                  : 'bg-slate-300 dark:bg-slate-600'
                              }`}
                            />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>

                        {lesson.isExercise && (
                          <span className="text-[9px] uppercase px-1 py-0.2 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded font-medium shrink-0 ml-1">
                            Ex
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredModules.length === 0 && (
          <div className="p-4 text-center text-xs text-slate-400">
            No topics matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </div>
    </aside>
  );
};
