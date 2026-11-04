import React, { useState } from 'react';
import { ExecutionResult } from '../types';
import { Terminal, CheckCircle2, XCircle, Trash2, Copy, Check } from 'lucide-react';

interface OutputConsoleProps {
  result: ExecutionResult | null;
  isRunning: boolean;
  onClear: () => void;
  isExercise?: boolean;
}

export const OutputConsole: React.FC<OutputConsoleProps> = ({
  result,
  isRunning,
  onClear,
  isExercise,
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

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-t border-slate-800 font-mono text-xs select-text overflow-hidden">
      {/* Console Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <Terminal className="w-3.5 h-3.5 text-[#00ADD8]" />
            <span>Terminal</span>
          </div>

          {/* Execution status metrics */}
          {isRunning ? (
            <span className="text-[11px] text-amber-400 animate-pulse">
              Compiling & running...
            </span>
          ) : result ? (
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className={result.exitCode === 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {result.exitCode === 0 ? 'Program exited.' : `Exit code ${result.exitCode}`}
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{result.durationMs}ms</span>
            </div>
          ) : null}

          {/* Exercise test tab switchers */}
          {isExercise && hasTests && (
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded border border-slate-800 ml-2">
              <button
                onClick={() => setActiveTab('output')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  activeTab === 'output' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Output
              </button>
              <button
                onClick={() => setActiveTab('tests')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  activeTab === 'tests' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Tests</span>
                {testsPassed ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <XCircle className="w-3 h-3 text-amber-400" />
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
              className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={onClear}
            title="Clear console"
            className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Console Output Body */}
      <div className="flex-1 p-3.5 overflow-y-auto leading-relaxed select-text font-mono text-xs">
        {isRunning ? (
          <div className="text-slate-500 italic py-2">
            Compiling and executing Go binary...
          </div>
        ) : !result ? (
          <div className="text-slate-500 py-3 flex items-center gap-2">
            <span>Click &ldquo;Run&rdquo; or press</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded border border-slate-700">
              Ctrl+Enter
            </kbd>
            <span>to execute this program.</span>
          </div>
        ) : activeTab === 'tests' && hasTests ? (
          /* Exercise Tests tab view */
          <div className="space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-semibold text-slate-300 text-xs">
                Test Results
              </span>
              <span className={`text-[11px] font-bold ${testsPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {result.testResults!.filter(t => t.passed).length} of {result.testResults!.length} passed
              </span>
            </div>

            {result.testResults!.map((test, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-lg border text-[11px] ${
                  test.passed
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                    : 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold">
                  {test.passed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  )}
                  <span>{test.description}</span>
                </div>
                <div className="mt-1.5 pl-5.5 space-y-0.5 text-slate-400 font-mono text-[10px]">
                  {test.input && <div>Input: <span className="text-slate-300">{test.input}</span></div>}
                  <div>Expected: <span className="text-emerald-300">{test.expected}</span></div>
                  <div>Actual: <span className={test.passed ? 'text-emerald-300' : 'text-rose-300'}>{test.actual}</span></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Standard stdout / stderr view */
          <div>
            {result.stdout && (
              <pre className="text-slate-200 whitespace-pre-wrap">{result.stdout}</pre>
            )}
            {result.stderr && (
              <pre className="text-rose-400 whitespace-pre-wrap mt-2">{result.stderr}</pre>
            )}
            {!result.stdout && !result.stderr && (
              <span className="text-slate-500 italic">Program exited with no output.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
