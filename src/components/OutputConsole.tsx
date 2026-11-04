import React, { useState } from 'react';
import { ExecutionResult } from '../types';
import { Terminal, CheckCircle2, XCircle, Trash2, Copy, Check } from 'lucide-react';

interface OutputConsoleProps {
  result: ExecutionResult | null;
  isRunning: boolean;
  onClear: () => void;
  isExercise?: boolean;
  darkMode: boolean;
}

export const OutputConsole: React.FC<OutputConsoleProps> = ({
  result,
  isRunning,
  onClear,
  isExercise,
  darkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'output' | 'tests'>('output');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    const text = result.stderr ? `${result.stdout}\n${result.stderr}` : result.stdout;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasTests = Boolean(result?.testResults && result.testResults.length > 0);
  const testsPassed = hasTests && result!.testResults!.every(t => t.passed);

  const themeClasses = darkMode
    ? {
        rootBg: 'bg-[#090D16] text-slate-200 border-slate-800',
        headerBg: 'bg-[#0F172A] border-slate-800',
        tabActive: 'bg-slate-800 text-white',
        tabInactive: 'text-slate-400 hover:text-slate-200',
        tabBorder: 'border-slate-800 bg-slate-950',
        btnHover: 'text-slate-400 hover:text-slate-200 hover:bg-slate-800',
        mutedText: 'text-slate-500',
        stdoutText: 'text-slate-200',
        stderrText: 'text-rose-400',
      }
    : {
        rootBg: 'bg-[#FAF8F0] text-slate-800 border-[#E5E0CF]',
        headerBg: 'bg-[#F2ECE0] border-[#E5E0CF]',
        tabActive: 'bg-white text-slate-900 shadow-xs',
        tabInactive: 'text-slate-600 hover:text-slate-900',
        tabBorder: 'border-[#DFD8C4] bg-[#EBE4D4]',
        btnHover: 'text-slate-600 hover:text-slate-900 hover:bg-[#E5DFCF]',
        mutedText: 'text-slate-500',
        stdoutText: 'text-slate-900 font-medium',
        stderrText: 'text-rose-600 font-medium',
      };

  return (
    <div className={`flex flex-col h-full border-t font-mono text-xs select-text overflow-hidden transition-colors duration-150 ${themeClasses.rootBg}`}>
      {/* Console Header Bar */}
      <div className={`flex items-center justify-between px-4 py-2 border-b shrink-0 transition-colors ${themeClasses.headerBg}`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <Terminal className="w-3.5 h-3.5 text-[#00ADD8]" />
            <span className="text-xs">Terminal</span>
          </div>

          {/* Execution status metrics */}
          {isRunning ? (
            <span className="text-[11px] text-amber-500 font-medium animate-pulse">
              Compiling & running...
            </span>
          ) : result ? (
            <div className="flex items-center gap-2 text-[11px] opacity-75">
              <span className={result.exitCode === 0 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-rose-600 dark:text-rose-400 font-semibold'}>
                {result.exitCode === 0 ? 'Program exited.' : `Exit code ${result.exitCode}`}
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{result.durationMs}ms</span>
            </div>
          ) : null}

          {/* Exercise test tab switchers */}
          {isExercise && hasTests && (
            <div className={`flex items-center gap-1 p-0.5 rounded border ml-2 ${themeClasses.tabBorder}`}>
              <button
                onClick={() => setActiveTab('output')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  activeTab === 'output' ? themeClasses.tabActive : themeClasses.tabInactive
                }`}
              >
                Output
              </button>
              <button
                onClick={() => setActiveTab('tests')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  activeTab === 'tests' ? themeClasses.tabActive : themeClasses.tabInactive
                }`}
              >
                <span>Tests</span>
                {testsPassed ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                ) : (
                  <XCircle className="w-3 h-3 text-amber-500" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Toolbar actions */}
        <div className="flex items-center gap-1.5">
          {result && (
            <button
              onClick={handleCopy}
              title="Copy output"
              className={`p-1 rounded transition-colors ${themeClasses.btnHover}`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={onClear}
            title="Clear console"
            className={`p-1 rounded transition-colors ${themeClasses.btnHover}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Console Output Body */}
      <div className="flex-1 p-3.5 overflow-y-auto leading-relaxed select-text font-mono text-xs">
        {isRunning ? (
          <div className={`${themeClasses.mutedText} italic py-2`}>
            Compiling and executing Go binary...
          </div>
        ) : !result ? (
          <div className={`${themeClasses.mutedText} py-3 flex items-center gap-2`}>
            <span>Click &ldquo;Run&rdquo; or press</span>
            <kbd className={`px-1.5 py-0.5 text-[10px] rounded border font-semibold ${
              darkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700'
                : 'bg-[#ECE5D4] text-slate-800 border-[#DFD8C4]'
            }`}>
              Ctrl+Enter
            </kbd>
            <span>to execute this program.</span>
          </div>
        ) : activeTab === 'tests' && hasTests ? (
          /* Exercise Tests tab view */
          <div className="space-y-2.5">
            <div className={`flex items-center justify-between pb-2 border-b ${
              darkMode ? 'border-slate-800' : 'border-[#E5E0CF]'
            }`}>
              <span className="font-semibold text-xs">
                Test Results
              </span>
              <span className={`text-[11px] font-bold ${testsPassed ? 'text-emerald-500' : 'text-amber-500'}`}>
                {result.testResults!.filter(t => t.passed).length} of {result.testResults!.length} passed
              </span>
            </div>

            {result.testResults!.map((test, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-lg border text-[11px] ${
                  test.passed
                    ? darkMode
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : darkMode
                      ? 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold">
                  {test.passed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  )}
                  <span>{test.description}</span>
                </div>
                <div className="mt-1.5 pl-5.5 space-y-0.5 opacity-85 font-mono text-[10px]">
                  {test.input && <div>Input: <span>{test.input}</span></div>}
                  <div>Expected: <span className="font-medium text-emerald-600 dark:text-emerald-400">{test.expected}</span></div>
                  <div>Actual: <span className={`font-medium ${test.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{test.actual}</span></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Standard stdout / stderr view */
          <div>
            {result.stdout && (
              <pre className={`${themeClasses.stdoutText} whitespace-pre-wrap`}>{result.stdout}</pre>
            )}
            {result.stderr && (
              <pre className={`${themeClasses.stderrText} whitespace-pre-wrap mt-2`}>{result.stderr}</pre>
            )}
            {!result.stdout && !result.stderr && (
              <span className={`${themeClasses.mutedText} italic`}>Program exited with no output.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
