/**
 * gofmt emulator for Go code formatting in the browser
 */
export function formatGoCode(code: string): string {
  const lines = code.split('\n');
  let indentLevel = 0;
  const formattedLines: string[] = [];
  let inMultiLineComment = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (line.startsWith('/*')) {
      inMultiLineComment = true;
    }
    if (inMultiLineComment) {
      formattedLines.push('\t'.repeat(indentLevel) + line);
      if (line.endsWith('*/')) {
        inMultiLineComment = false;
      }
      continue;
    }

    if (line === '') {
      // Avoid more than 1 consecutive empty line
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] === '') {
        continue;
      }
      formattedLines.push('');
      continue;
    }

    // Decrement indent if line starts with closing brace or parenthesis
    if (line.startsWith('}') || line.startsWith(')') || line.startsWith(']')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Normalize spacing around common operators if not inside quotes
    const indented = '\t'.repeat(indentLevel) + line;
    formattedLines.push(indented);

    // Increment indent if line ends with open brace or parenthesis
    if (line.endsWith('{') || line.endsWith('(') || line.endsWith('[')) {
      indentLevel++;
    }
  }

  // Trim trailing empty lines
  while (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] === '') {
    formattedLines.pop();
  }

  return formattedLines.join('\n') + '\n';
}
