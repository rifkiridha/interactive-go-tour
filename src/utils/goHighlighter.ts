/**
 * Go Syntax & Rainbow Bracket Tokenizer for Tour of Go & VS Code aesthetic
 */

export interface Token {
  text: string;
  type:
    | 'keyword'
    | 'builtin-type'
    | 'function'
    | 'string'
    | 'number'
    | 'comment'
    | 'operator'
    | 'bracket'
    | 'punctuation'
    | 'plain';
  bracketLevel?: number;
}

const KEYWORDS = new Set([
  'break', 'case', 'chan', 'const', 'continue', 'default', 'defer',
  'else', 'fallthrough', 'for', 'func', 'go', 'goto', 'if', 'import',
  'interface', 'map', 'package', 'range', 'return', 'select', 'struct',
  'switch', 'type', 'var'
]);

const BUILTIN_TYPES_AND_CONSTS = new Set([
  'bool', 'byte', 'complex64', 'complex128', 'error', 'float32', 'float64',
  'int', 'int8', 'int16', 'int32', 'int64', 'rune', 'string',
  'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'uintptr',
  'true', 'false', 'iota', 'nil', 'any', 'comparable'
]);

const BUILTIN_FUNCS = new Set([
  'append', 'cap', 'close', 'complex', 'copy', 'delete', 'imag',
  'len', 'make', 'new', 'panic', 'print', 'println', 'real', 'recover'
]);

// VS Code Rainbow Bracket palette (cycling depths)
export const RAINBOW_BRACKET_COLORS = [
  '#FFD700', // Gold (depth 0)
  '#DA70D6', // Orchid / Magenta (depth 1)
  '#179FFF', // Bright Cyan (depth 2)
  '#FFA500', // Amber / Orange (depth 3)
];

export function tokenizeGoCode(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const n = code.length;
  let bracketDepth = 0;

  while (i < n) {
    const char = code[i];

    // 1. Comments: Single-line // ...
    if (char === '/' && i + 1 < n && code[i + 1] === '/') {
      const start = i;
      while (i < n && code[i] !== '\n') {
        i++;
      }
      tokens.push({ text: code.slice(start, i), type: 'comment' });
      continue;
    }

    // 2. Comments: Multi-line /* ... */
    if (char === '/' && i + 1 < n && code[i + 1] === '*') {
      const start = i;
      i += 2;
      while (i < n && !(code[i - 1] === '*' && code[i] === '/')) {
        i++;
      }
      if (i < n) i++; // consume the closing '/'
      tokens.push({ text: code.slice(start, i), type: 'comment' });
      continue;
    }

    // 3. String literals ("..." or `...`)
    if (char === '"' || char === '`') {
      const quote = char;
      const start = i;
      i++;
      while (i < n) {
        if (code[i] === '\\' && quote === '"' && i + 1 < n) {
          i += 2;
          continue;
        }
        if (code[i] === quote) {
          i++;
          break;
        }
        i++;
      }
      tokens.push({ text: code.slice(start, i), type: 'string' });
      continue;
    }

    // 4. Character literals ('a', '\n')
    if (char === "'") {
      const start = i;
      i++;
      while (i < n && code[i] !== "'") {
        if (code[i] === '\\' && i + 1 < n) i += 2;
        else i++;
      }
      if (i < n) i++;
      tokens.push({ text: code.slice(start, i), type: 'string' });
      continue;
    }

    // 5. Rainbow Brackets: (, ), {, }, [, ]
    if (char === '(' || char === '{' || char === '[') {
      const currentLevel = bracketDepth % RAINBOW_BRACKET_COLORS.length;
      tokens.push({ text: char, type: 'bracket', bracketLevel: currentLevel });
      bracketDepth++;
      i++;
      continue;
    }
    if (char === ')' || char === '}' || char === ']') {
      bracketDepth = Math.max(0, bracketDepth - 1);
      const currentLevel = bracketDepth % RAINBOW_BRACKET_COLORS.length;
      tokens.push({ text: char, type: 'bracket', bracketLevel: currentLevel });
      i++;
      continue;
    }

    // 6. Numbers: Decimal, Hex, Octal, Floats (e.g. 42, 3.14, 1e-10)
    if (
      /\d/.test(char) ||
      (char === '.' && i + 1 < n && /\d/.test(code[i + 1]))
    ) {
      const start = i;
      while (
        i < n &&
        /[\d.xXa-fA-FeE_+-]/.test(code[i]) &&
        !['(', ')', '{', '}', '[', ']', ';', ',', ' '].includes(code[i])
      ) {
        i++;
      }
      tokens.push({ text: code.slice(start, i), type: 'number' });
      continue;
    }

    // 7. Operators and delimiters
    if (char === ':' && i + 1 < n && code[i + 1] === '=') {
      tokens.push({ text: ':=', type: 'operator' });
      i += 2;
      continue;
    }
    if (char === '<' && i + 1 < n && code[i + 1] === '-') {
      tokens.push({ text: '<-', type: 'operator' });
      i += 2;
      continue;
    }
    if (/[+\-*/%=&|^<>!~]/.test(char)) {
      const start = i;
      while (i < n && /[+\-*/%=&|^<>!~]/.test(code[i])) {
        i++;
      }
      tokens.push({ text: code.slice(start, i), type: 'operator' });
      continue;
    }

    // 8. Punctuation
    if (char === ';' || char === ',' || char === '.') {
      tokens.push({ text: char, type: 'punctuation' });
      i++;
      continue;
    }

    // 9. Identifiers & Keywords
    if (/[a-zA-Z_]/.test(char)) {
      const start = i;
      while (i < n && /[a-zA-Z0-9_]/.test(code[i])) {
        i++;
      }
      const word = code.slice(start, i);

      // Check if followed by '(' -> it's a function invocation / declaration!
      let nextIdx = i;
      while (nextIdx < n && (code[nextIdx] === ' ' || code[nextIdx] === '\t')) {
        nextIdx++;
      }
      const isFuncCall = nextIdx < n && code[nextIdx] === '(';

      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, type: 'keyword' });
      } else if (BUILTIN_TYPES_AND_CONSTS.has(word)) {
        tokens.push({ text: word, type: 'builtin-type' });
      } else if (BUILTIN_FUNCS.has(word) || isFuncCall) {
        tokens.push({ text: word, type: 'function' });
      } else {
        tokens.push({ text: word, type: 'plain' });
      }
      continue;
    }

    // 10. Whitespace / newlines
    tokens.push({ text: char, type: 'plain' });
    i++;
  }

  return tokens;
}

/**
 * Returns the CSS color code matching VS Code Dark+ & Tour of Go themes
 */
export function getTokenColor(token: Token): string {
  switch (token.type) {
    case 'keyword':
      return '#C586C0'; // Purple / Magenta (VS Code keyword color)
    case 'builtin-type':
      return '#4EC9B0'; // Teal / Cyan (Go types)
    case 'function':
      return '#DCDCAA'; // Warm Gold / Yellow (Functions)
    case 'string':
      return '#CE9178'; // Coral Orange / Amber (Strings)
    case 'number':
      return '#B5CEA8'; // Mint Light Green (Numbers)
    case 'comment':
      return '#6A9955'; // Moss Green Italic (Comments)
    case 'operator':
      return '#569CD6'; // Sky Blue / Cyan (Operators)
    case 'bracket':
      return RAINBOW_BRACKET_COLORS[token.bracketLevel ?? 0] || '#FFD700';
    case 'punctuation':
      return '#D4D4D4';
    default:
      return '#9CDCFE'; // Light Blue (Variables & Identifiers)
  }
}
