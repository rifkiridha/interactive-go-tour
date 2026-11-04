import React, { useState, useMemo } from 'react';
import { X, Search, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { MODULES, LESSONS } from '../data/lessons';
import { Lesson } from '../types';

interface TableOfContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  completedLessonIds: Set<string>;
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  isOpen,
  onClose,
  currentLessonId,
  onSelectLesson,
  completedLessonIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return MODULES;
    const q = searchQuery.toLowerCase();
    return MODULES.map(m => ({
      ...m,
      lessons: m.lessons.filter(
        l => l.title.toLowerCase().includes(q) || l.content.toLowerCase().includes(q)
      ),
    })).filter(m => m.lessons.length > 0);
  }, [searchQuery]);

  if (!isOpen) return null;

  const totalLessons = LESSONS.length;
  const completedCount = completedLessonIds.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="toc-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-[#00ADD8]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="toc-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                Tour Syllabus & Progress
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span>{totalLessons} lessons total</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#00ADD8]">{completedCount} completed ({progressPercent}%)</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts, types, slices, goroutines, interfaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800/80 border-0 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#00ADD8]"
            />
          </div>
        </div>

        {/* Modules and Lessons List */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {filteredModules.map((module) => (
            <div key={module.id} className="space-y-2">
              <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800/80 pb-1.5">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {module.title}
                </h3>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {module.lessons.filter(l => completedLessonIds.has(l.id)).length} of {module.lessons.length} completed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 pt-1">
                {module.lessons.map((lesson) => {
                  const isCurrent = lesson.id === currentLessonId;
                  const isCompleted = completedLessonIds.has(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        onSelectLesson(lesson);
                        onClose();
                      }}
                      className={`flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                        isCurrent
                          ? 'bg-cyan-50 dark:bg-cyan-950/40 text-[#00ADD8] border border-cyan-200 dark:border-cyan-800/60 shadow-xs'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <div className={`w-3.5 h-3.5 rounded-full border shrink-0 ${isCurrent ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-300 dark:border-slate-600'}`} />
                        )}
                        <span className="truncate">
                          {lesson.title}
                        </span>
                        {lesson.isExercise && (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded shrink-0">
                            Exercise
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 shrink-0 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredModules.length === 0 && (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500">
              <p className="text-sm">No topics match &quot;{searchQuery}&quot;</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-[#00ADD8] hover:underline font-medium"
              >
                Clear search query
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
