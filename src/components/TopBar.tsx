import React from 'react';
import { BookOpen, Moon, Sun, HelpCircle } from 'lucide-react';

interface TopBarProps {
  onOpenTOC: () => void;
  onOpenShortcuts: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenTOC,
  onOpenShortcuts,
  darkMode,
  onToggleDarkMode,
  activeModuleId,
  onSelectModule,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30 transition-colors">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onSelectModule('basics');
        }}
        className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
      >
        <span className="w-7 h-7 rounded-md bg-[#00ADD8] flex items-center justify-center text-white font-extrabold text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
          Go
        </span>
        <span className="tracking-tight">A Tour of Go</span>
      </a>

      {/* Zone 2: 4-5 concise single-line nav links */}
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
      <div className="flex items-center gap-3 shrink-0">
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

        <button
          onClick={onOpenTOC}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-[#00ADD8] dark:hover:bg-[#009ac0] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Table of Contents</span>
        </button>
      </div>
    </header>
  );
};
