import React from 'react';
import { Layers, Moon, Sun, HelpCircle, Terminal } from 'lucide-react';

interface TopBarProps {
  onOpenSubjects: () => void;
  onOpenShortcuts: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
  activeSubjectTitle?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenSubjects,
  onOpenShortcuts,
  darkMode,
  onToggleDarkMode,
  activeModuleId,
  onSelectModule,
  activeSubjectTitle = 'Go',
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30 transition-colors shrink-0">
      {/* Zone 1: Single text element wordmark for the overall tutorial platform */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onSelectModule('basics');
        }}
        className="flex items-center gap-2.5 text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
      >
        <span className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-[#00ADD8] shadow-2xs group-hover:bg-[#00ADD8] group-hover:text-white transition-colors">
          <Terminal className="w-4 h-4 stroke-[2.5]" />
        </span>
        <span className="tracking-tight text-base font-extrabold">DevTour</span>
        <span className="text-[11px] font-semibold text-[#00ADD8] bg-[#00ADD8]/10 dark:bg-[#00ADD8]/20 px-2 py-0.5 rounded-full ml-1 hidden sm:inline-block">
          {activeSubjectTitle}
        </span>
      </a>

      {/* Zone 2: Concise single-line nav links for quick module jumping */}
      <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
        <button
          onClick={() => onSelectModule('basics')}
          className={`hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
            activeModuleId === 'basics' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
          }`}
        >
          Basics
        </button>
        <button
          onClick={() => onSelectModule('flow-control')}
          className={`hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
            activeModuleId === 'flow-control' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
          }`}
        >
          Flow Control
        </button>
        <button
          onClick={() => onSelectModule('more-types')}
          className={`hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
            activeModuleId === 'more-types' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
          }`}
        >
          Types & Slices
        </button>
        <button
          onClick={() => onSelectModule('methods-interfaces')}
          className={`hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
            activeModuleId === 'methods-interfaces' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
          }`}
        >
          Interfaces
        </button>
        <button
          onClick={() => onSelectModule('concurrency')}
          className={`hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
            activeModuleId === 'concurrency' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
          }`}
        >
          Concurrency
        </button>
      </nav>

      {/* Zone 3: 1 primary action area */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenShortcuts}
          title="Keyboard shortcuts"
          className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Keyboard Shortcuts"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleDarkMode}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Subjects & Learning Tracks Button (replaces the old TOC button) */}
        <button
          onClick={onOpenSubjects}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700/50 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs group"
        >
          <Layers className="w-3.5 h-3.5 text-[#00ADD8] group-hover:scale-110 transition-transform" />
          <span>Subjects</span>
        </button>
      </div>
    </header>
  );
};
