import React, { useState, useRef, useMemo } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  AlignLeft,
  ZoomIn,
  ZoomOut,
  Palette,
} from 'lucide-react';
import { formatGoCode } from '../utils/gofmt';
import { tokenizeGoCode, getTokenColor } from '../utils/goHighlighter';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onReset,
  isRunning,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<number>(13);
  const [enableRainbow, setEnableRainbow] = useState<boolean>(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea, syntax highlight overlay, and line numbers
  const handleScroll = () => {
    if (textareaRef.current) {
      const { scrollTop, scrollLeft } = textareaRef.current;
      if (preRef.current) {
        preRef.current.scrollTop = scrollTop;
        preRef.current.scrollLeft = scrollLeft;
      }
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = scrollTop;
      }
    }
  };

  // Format code with gofmt
  const handleFormat = () => {
    const formatted = formatGoCode(code);
    onChange(formatted);
  };

  // Handle Tab and shortcut keys inside textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onRun();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert tab character (Go standard tab indentation)
      const newCode = code.substring(0, start) + '\t' + code.substring(end);
      onChange(newCode);

      // Restore cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Tokenize code for VS Code syntax & rainbow brackets
  const tokens = useMemo(() => {
    return tokenizeGoCode(code);
  }, [code]);

  const lines = code.split('\n');

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-slate-100 font-mono text-xs select-text overflow-hidden">
      {/* Editor Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333333] shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ADD8]" />
            <span className="text-xs tracking-wide">main.go</span>
          </div>
          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            VS Code Dark+
          </span>
        </div>

        {/* Toolbar Actions */}
        <div className="flex items-center gap-1.5">
          {/* Rainbow syntax toggle */}
          <button
            onClick={() => setEnableRainbow(prev => !prev)}
            title={enableRainbow ? 'Rainbow Syntax Enabled' : 'Enable Rainbow Syntax'}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors text-[11px] font-sans font-medium ${
              enableRainbow
                ? 'bg-purple-950/60 text-purple-300 border border-purple-700/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">Rainbow</span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button
            onClick={() => setFontSize(prev => Math.max(11, prev - 1))}
            title="Decrease font size"
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700/60 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setFontSize(prev => Math.min(18, prev + 1))}
            title="Increase font size"
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700/60 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button
            onClick={handleCopy}
            title="Copy code"
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700/60 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleFormat}
            title="Format code (gofmt)"
            className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white rounded hover:bg-slate-700/60 transition-colors text-[11px] font-sans font-medium"
          >
            <AlignLeft className="w-3.5 h-3.5 text-[#00ADD8]" />
            <span className="hidden sm:inline">Format</span>
          </button>

          <button
            onClick={onReset}
            title="Reset to original code"
            className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white rounded hover:bg-slate-700/60 transition-colors text-[11px] font-sans font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button
            onClick={onRun}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-md text-[12px] font-sans font-bold transition-all shadow-xs ${
              isRunning
                ? 'bg-slate-700 text-slate-400 cursor-wait'
                : 'bg-[#00ADD8] hover:bg-[#009ac0] text-white active:scale-95'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-pulse' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
            <span className="text-[10px] opacity-75 font-normal hidden md:inline ml-1">
              (Ctrl+Enter)
            </span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 flex overflow-hidden relative bg-[#1e1e1e]">
        {/* Line numbers gutter */}
        <div
          ref={lineNumbersRef}
          aria-hidden="true"
          className="w-12 py-3 pr-3 text-right bg-[#1e1e1e] text-[#858585] select-none overflow-hidden shrink-0 font-mono border-r border-[#333333]"
          style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Canvas Container */}
        <div className="relative flex-1 h-full overflow-hidden">
          {/* Syntax Highlighted & Rainbow Brackets Layer */}
          {enableRainbow && (
            <pre
              ref={preRef}
              aria-hidden="true"
              className="absolute inset-0 p-3 m-0 bg-transparent pointer-events-none select-none overflow-hidden font-mono whitespace-pre leading-relaxed z-0"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: '1.6',
                tabSize: 4,
              }}
            >
              {tokens.map((token, idx) => {
                const color = getTokenColor(token);
                const isComment = token.type === 'comment';
                const isBracket = token.type === 'bracket';

                return (
                  <span
                    key={idx}
                    style={{
                      color,
                      fontStyle: isComment ? 'italic' : 'normal',
                      fontWeight: isBracket ? 600 : 'normal',
                    }}
                  >
                    {token.text}
                  </span>
                );
              })}
            </pre>
          )}

          {/* Transparent Input Textarea Overlay */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className={`absolute inset-0 p-3 m-0 resize-none overflow-auto font-mono whitespace-pre leading-relaxed outline-hidden border-0 z-10 ${
              enableRainbow
                ? 'bg-transparent text-transparent caret-white selection:bg-[#264f78]/80 selection:text-white'
                : 'bg-transparent text-slate-100 caret-[#00ADD8]'
            }`}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: '1.6',
              tabSize: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
};
