import React from 'react';
import { X, Check, ArrowRight, Layers, Sparkles } from 'lucide-react';

export interface SubjectTrack {
  id: string;
  title: string;
  category: string;
  description: string;
  level: string;
  lessonCount: number;
  isActive?: boolean;
  badge?: string;
}

interface SubjectSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSubjectId: string;
  onSelectSubject: (id: string) => void;
}

export const SUBJECTS: SubjectTrack[] = [
  {
    id: 'tour-of-go',
    title: 'A Tour of Go',
    category: 'Core Language',
    description: 'Comprehensive interactive walkthrough of Go syntax, types, flow control, interfaces, concurrency, and generics.',
    level: 'Beginner to Intermediate',
    lessonCount: 32,
    isActive: true,
    badge: 'Current Track',
  },
  {
    id: 'go-concurrency',
    title: 'Go Concurrency & Patterns',
    category: 'Advanced Go',
    description: 'Master channels, worker pools, pipeline architectures, select timeouts, errgroup, and sync primitives.',
    level: 'Intermediate to Advanced',
    lessonCount: 18,
    badge: 'Coming Next',
  },
  {
    id: 'go-web-apis',
    title: 'Building Web APIs with Go',
    category: 'Backend & Cloud',
    description: 'Production-ready REST APIs with net/http, middleware chaining, routing, JSON streaming, and authentication.',
    level: 'Intermediate',
    lessonCount: 22,
    badge: 'Coming Soon',
  },
  {
    id: 'go-systems',
    title: 'Go Systems & CLI Tools',
    category: 'Systems & DevOps',
    description: 'Build fast terminal tools, file processing pipelines, TCP/UDP sockets, and daemon services.',
    level: 'Intermediate',
    lessonCount: 16,
    badge: 'Roadmap',
  },
  {
    id: 'go-dsa',
    title: 'Algorithms & Data Structures in Go',
    category: 'Computer Science',
    description: 'Efficient implementation of binary trees, priority queues, graphs, and dynamic programming in Go.',
    level: 'All Levels',
    lessonCount: 20,
    badge: 'Roadmap',
  },
];

export const SubjectSwitcherModal: React.FC<SubjectSwitcherModalProps> = ({
  isOpen,
  onClose,
  activeSubjectId,
  onSelectSubject,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="subject-switcher-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00ADD8]/10 text-[#00ADD8]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 id="subject-switcher-title" className="text-base font-bold text-slate-900 dark:text-white">
                Learning Subjects & Tracks
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Switch subjects or explore upcoming learning curricula
              </p>
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

        {/* Tracks List */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-3">
          {SUBJECTS.map((subject) => {
            const isCurrent = subject.id === activeSubjectId;

            return (
              <div
                key={subject.id}
                onClick={() => {
                  if (subject.isActive) {
                    onSelectSubject(subject.id);
                    onClose();
                  }
                }}
                className={`p-4 rounded-xl border transition-all text-left flex items-start justify-between gap-4 ${
                  isCurrent
                    ? 'border-[#00ADD8] bg-[#00ADD8]/5 dark:bg-[#00ADD8]/10 shadow-xs'
                    : subject.isActive
                    ? 'border-slate-200 dark:border-slate-800 hover:border-[#00ADD8]/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer'
                    : 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/40 dark:bg-slate-800/20 opacity-80'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {subject.category}
                    </span>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {subject.level}
                    </span>
                    {subject.badge && (
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          isCurrent
                            ? 'bg-[#00ADD8] text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {subject.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {subject.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                    {subject.description}
                  </p>

                  <div className="text-[11px] font-medium text-slate-400 pt-1">
                    {subject.lessonCount} interactive modules & exercises
                  </div>
                </div>

                <div className="shrink-0 mt-2">
                  {isCurrent ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00ADD8] text-white text-xs font-semibold shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </div>
                  ) : subject.isActive ? (
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors">
                      <span>Switch</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-medium px-2 py-1 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200/60 dark:border-amber-900/40">
                      <Sparkles className="w-3 h-3" />
                      <span>In Development</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>More subjects and practical project tracks will be rolled out continuously.</span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#00ADD8] hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
