import React, { useState } from 'react';
import { Lesson } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lightbulb,
  Code2,
  Sparkles,
} from 'lucide-react';
import { tokenizeGoCode, getTokenColor } from '../utils/goHighlighter';

interface LessonViewerProps {
  lesson: Lesson;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isCompleted: boolean;
  onToggleCompleted: () => void;
  onApplySolution?: (code: string) => void;
  currentIndex: number;
  totalLessons: number;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  isCompleted,
  onToggleCompleted,
  onApplySolution,
  currentIndex,
  totalLessons,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const renderHighlightedCode = (rawCode: string) => {
    const tokens = tokenizeGoCode(rawCode);
    return tokens.map((token, i) => {
      const color = getTokenColor(token);
      const isComment = token.type === 'comment';
      const isBracket = token.type === 'bracket';
      return (
        <span
          key={i}
          style={{
            color,
            fontStyle: isComment ? 'italic' : 'normal',
            fontWeight: isBracket ? 600 : 'normal',
          }}
        >
          {token.text}
        </span>
      );
    });
  };

  // Simple Markdown-to-HTML parser for the lesson content
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          const rawCode = codeBuffer.join('\n');
          elements.push(
            <pre
              key={`code-${idx}`}
              className="my-3 p-3.5 bg-[#1e1e1e] text-slate-100 rounded-lg text-xs font-mono overflow-x-auto border border-[#333333] shadow-xs"
            >
              <code>{renderHighlightedCode(rawCode)}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      const trimmed = line.trim();

      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3
            key={idx}
            className="text-base font-bold text-slate-900 dark:text-white mt-5 mb-2 tracking-tight"
          >
            {trimmed.slice(4)}
          </h3>
        );
        return;
      }

      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2
            key={idx}
            className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2 tracking-tight"
          >
            {trimmed.slice(3)}
          </h2>
        );
        return;
      }

      if (trimmed.startsWith('- ')) {
        elements.push(
          <li key={idx} className="ml-5 list-disc text-sm text-slate-700 dark:text-slate-300 my-1 leading-relaxed">
            {formatInlineText(trimmed.slice(2))}
          </li>
        );
        return;
      }

      if (trimmed === '') {
        return;
      }

      elements.push(
        <p key={idx} className="my-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {formatInlineText(trimmed)}
        </p>
      );
    });

    return elements;
  };

  const formatInlineText = (text: string): React.ReactNode => {
    // Replace backticks with code tag, bold with strong
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 mx-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 rounded font-medium border border-slate-200/60 dark:border-slate-700"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Lesson Header */}
      <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>{lesson.moduleTitle}</span>
            <span aria-hidden="true">·</span>
            <span>Slide {lesson.pageNumber} of {lesson.totalInModule}</span>
          </div>

          <button
            onClick={onToggleCompleted}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              isCompleted
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-500' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark complete'}</span>
          </button>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          {lesson.title}
          {lesson.isExercise && (
            <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded">
              Exercise
            </span>
          )}
        </h1>
      </div>

      {/* Main Prose Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        {lesson.id === 'welcome' && (
          <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 mb-5 aspect-video bg-slate-100 dark:bg-slate-800 shadow-xs">
            <img
              src="/src/assets/images/go_tour_hero_1793766235070.jpg"
              alt="Go Mascot Gopher coding workstation"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-medium tracking-wide">
                Interactive Go Learning Playground & Runtime
              </span>
            </div>
          </div>
        )}

        <div className="prose prose-slate dark:prose-invert max-w-none">
          {renderFormattedContent(lesson.content)}
        </div>

        {/* Key Takeaway box */}
        {lesson.keyTakeaway && (
          <div className="my-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#00ADD8] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white mr-1.5">Core Rule:</span>
              <span>{lesson.keyTakeaway}</span>
            </div>
          </div>
        )}

        {/* Exercise Hint / Solution Dropdowns */}
        {lesson.isExercise && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            {lesson.hint && (
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-3.5">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                  </div>
                  <span className="text-xs text-slate-400">{showHint ? '▲' : '▼'}</span>
                </button>
                {showHint && (
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60 pt-2">
                    {lesson.hint}
                  </p>
                )}
              </div>
            )}

            {lesson.solutionCode && (
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-3.5">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <Code2 className="w-4 h-4 text-[#00ADD8]" />
                    <span>{showSolution ? 'Hide Solution' : 'View Canonical Solution'}</span>
                  </button>
                  {showSolution && onApplySolution && (
                    <button
                      onClick={() => onApplySolution(lesson.solutionCode!)}
                      className="text-xs font-medium text-[#00ADD8] hover:text-[#008cb0] underline decoration-dotted"
                    >
                      Apply to Editor
                    </button>
                  )}
                </div>

                {showSolution && (
                  <div className="mt-3">
                    <pre className="p-3 bg-[#1e1e1e] text-slate-100 rounded-lg text-xs font-mono overflow-x-auto border border-[#333333]">
                      <code>{renderHighlightedCode(lesson.solutionCode)}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lesson Navigation Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between gap-4">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors ${
            hasPrevious
              ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed border border-transparent'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="text-center">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            {currentIndex + 1} / {totalLessons}
          </span>
          <div className="w-24 h-1 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-[#00ADD8] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalLessons) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
            hasNext
              ? 'bg-[#00ADD8] hover:bg-[#009ac0] text-white shadow-xs font-semibold'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed border border-transparent'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
