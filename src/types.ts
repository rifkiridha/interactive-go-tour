export interface TestCase {
  description: string;
  input: string;
  expected: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  moduleTitle: string;
  title: string;
  pageNumber: number;
  totalInModule: number;
  content: string; // Markdown or rich HTML-friendly text
  keyTakeaway?: string;
  defaultCode: string;
  solutionCode?: string;
  hint?: string;
  isExercise?: boolean;
  testCases?: TestCase[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  iconName: string;
  lessons: Lesson[];
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  durationMs: number;
  testResults?: {
    passed: boolean;
    description: string;
    input?: string;
    actual: string;
    expected: string;
  }[];
}
