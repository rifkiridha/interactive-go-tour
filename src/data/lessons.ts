import { Lesson, Module } from '../types';

export const LESSONS: Lesson[] = [
  // ================= 1. WELCOME / USING THE TOUR =================
  {
    id: 'welcome',
    moduleId: 'welcome',
    moduleTitle: '1. Welcome',
    title: 'Welcome!',
    pageNumber: 1,
    totalInModule: 3,
    content: `
Welcome to a tour of the **Go programming language**!

The tour covers the full breadth of the Go programming language, from basic syntax and data structures to interfaces, concurrency, and generics.

### Navigating the Tour
- Use the **Previous** and **Next** buttons at the bottom (or \`Alt + Left\` / \`Alt + Right\`).
- Access any module at any time from the **Table of Contents** on the left.
- Hide or expand the syllabus sidebar using the arrow button (\`<\` / \`>\`).

### Interactive Sandbox
The tour is completely interactive. You can edit any program on the right and click **Run** (or press \`Ctrl + Enter\` / \`Cmd + Enter\`) to compile and run it instantly.
    `,
    keyTakeaway: 'The Go tour is fully interactive: write, edit, format, and run code directly in your browser.',
    defaultCode: `package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}
`,
  },
  {
    id: 'hello-world',
    moduleId: 'welcome',
    moduleTitle: '1. Welcome',
    title: 'Hello, 世界',
    pageNumber: 2,
    totalInModule: 3,
    content: `
Programs start running in package \`main\`.

This program imports the \`fmt\` package to print a message to the standard output.

Go supports full UTF-8 source code out of the box. Identifiers, strings, and comments can use any Unicode characters.

Try changing the greeting to your own name or language and click **Run**!
    `,
    keyTakeaway: 'Go source code is UTF-8 by default; programs start running in package main.',
    defaultCode: `package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界! Welcome to Go.")
}
`,
  },
  {
    id: 'the-go-playground',
    moduleId: 'welcome',
    moduleTitle: '1. Welcome',
    title: 'The Go Playground',
    pageNumber: 3,
    totalInModule: 3,
    content: `
This tour is built on an interactive Go playground environment.

In the playground:
- Programs compile and execute with fast feedback.
- The standard library packages are readily accessible.
- Formatting code is standardized via \`gofmt\` (click the **Format** button above the editor).

Let's check the current time using the standard \`time\` package!
    `,
    keyTakeaway: 'The playground lets you experiment safely and format code cleanly using gofmt.',
    defaultCode: `package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Welcome to the playground!")
	fmt.Println("The time is", time.Now())
}
`,
  },

  // ================= 2. BASICS =================
  {
    id: 'packages',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Packages',
    pageNumber: 1,
    totalInModule: 16,
    content: `
Every Go program is made up of packages.

Programs start running in package \`main\`.

This program uses the packages with import paths \`"fmt"\` and \`"math/rand"\`.

By convention, the package name is the same as the last element of the import path. For instance, the \`"math/rand"\` package comprises files that begin with the statement \`package rand\`.
    `,
    keyTakeaway: 'Programs start running in package main; package names match the last element of the import path.',
    defaultCode: `package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))
}
`,
  },
  {
    id: 'imports',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Imports & Factored Statements',
    pageNumber: 2,
    totalInModule: 16,
    content: `
This code groups the imports into a parenthesized, "factored" import statement:

\`\`\`go
import (
    "fmt"
    "math"
)
\`\`\`

You can also write multiple import statements, like:
\`\`\`go
import "fmt"
import "math"
\`\`\`
But it is standard Go style to use the factored import statement.
    `,
    keyTakeaway: 'Use factored import statements (grouping in parentheses) for clean, idiomatic code.',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Printf("Now you have %g problems.\\n", math.Sqrt(7))
}
`,
  },
  {
    id: 'exported-names',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Exported Names',
    pageNumber: 3,
    totalInModule: 16,
    content: `
In Go, a name is exported if it begins with a **capital letter**.

For example, \`Pi\` is an exported name from the \`math\` package. \`pi\` (with a lowercase 'p') is **not** exported.

When importing a package, you can refer only to its exported names. Any unexported names are not accessible outside of the package.

Run the code. Notice that \`math.pi\` causes an error. Change it to \`math.Pi\` to fix it!
    `,
    keyTakeaway: 'Capitalized names are exported/public; lowercase names are package-private.',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

func main() {
	// Fix the error by changing math.pi to math.Pi
	fmt.Println(math.pi)
}
`,
    solutionCode: `package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println(math.Pi)
}
`,
  },
  {
    id: 'functions',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Functions',
    pageNumber: 4,
    totalInModule: 16,
    content: `
A function can take zero or more arguments.

In this example, \`add\` takes two parameters of type \`int\`.

Notice that the type comes **after** the variable name:
\`\`\`go
func add(x int, y int) int {
    return x + y
}
\`\`\`
    `,
    keyTakeaway: 'Types appear after parameter names: func add(x int, y int) int.',
    defaultCode: `package main

import "fmt"

func add(x int, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}
`,
  },
  {
    id: 'functions-continued',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Functions Continued',
    pageNumber: 5,
    totalInModule: 16,
    content: `
When two or more consecutive named function parameters share a type, you can omit the type from all but the last.

In this example, we shortened:
\`\`\`go
x int, y int
\`\`\`
to:
\`\`\`go
x, y int
\`\`\`
    `,
    keyTakeaway: 'Consecutive parameters of the same type can share the trailing type declaration: x, y int.',
    defaultCode: `package main

import "fmt"

func add(x, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}
`,
  },
  {
    id: 'multiple-results',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Multiple Results',
    pageNumber: 6,
    totalInModule: 16,
    content: `
A function can return any number of results!

The \`swap\` function returns two strings:
\`\`\`go
func swap(x, y string) (string, string) {
    return y, x
}
\`\`\`

Multiple return values are widely used in Go, especially to return a function result alongside an \`error\` value.
    `,
    keyTakeaway: 'Functions can return multiple values: func swap(x, y string) (string, string).',
    defaultCode: `package main

import "fmt"

func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b)
}
`,
  },
  {
    id: 'named-return-values',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Named Return Values & Naked Returns',
    pageNumber: 7,
    totalInModule: 16,
    content: `
Go's return values may be named. If so, they are treated as variables defined at the top of the function.

These names document the meaning of the return values.

A \`return\` statement without arguments returns the named return values. This is known as a **"naked" return**.

\`\`\`go
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
}
\`\`\`
Naked returns should be used only in short functions to avoid hurting readability in long code.
    `,
    keyTakeaway: 'Named return values document return semantics and allow naked return statements in short functions.',
    defaultCode: `package main

import "fmt"

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func main() {
	fmt.Println(split(17))
}
`,
  },
  {
    id: 'variables',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Variables',
    pageNumber: 8,
    totalInModule: 16,
    content: `
The \`var\` statement declares a list of variables; as in function argument lists, the type is last.

A \`var\` statement can be at package or function level. We see both in this example.
    `,
    keyTakeaway: 'var declares variables at package or function scope with trailing type: var c, python, java bool.',
    defaultCode: `package main

import "fmt"

var c, python, java bool

func main() {
	var i int
	fmt.Println(i, c, python, java)
}
`,
  },
  {
    id: 'variables-with-initializers',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Variables with Initializers',
    pageNumber: 9,
    totalInModule: 16,
    content: `
A \`var\` declaration can include initializers, one per variable.

If an initializer is present, the type can be omitted; the variable will take the type of the initializer.

\`\`\`go
var i, j int = 1, 2
var c, python, java = true, false, "no!"
\`\`\`
    `,
    keyTakeaway: 'Initializers allow omitting the type: var c, python, java = true, false, "no!".',
    defaultCode: `package main

import "fmt"

var i, j int = 1, 2

func main() {
	var c, python, java = true, false, "no!"
	fmt.Println(i, j, c, python, java)
}
`,
  },
  {
    id: 'short-variable-declarations',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Short Variable Declarations ( := )',
    pageNumber: 10,
    totalInModule: 16,
    content: `
Inside a function, the \`:=\` short assignment statement can be used in place of a \`var\` declaration with implicit type.

Outside a function, every statement begins with a keyword (\`var\`, \`func\`, and so on) and so the \`:=\` construct is not available.
    `,
    keyTakeaway: 'Inside functions, use := for concise declaration and initialization.',
    defaultCode: `package main

import "fmt"

func main() {
	var i, j int = 1, 2
	k := 3
	c, python, java := true, false, "no!"

	fmt.Println(i, j, k, c, python, java)
}
`,
  },
  {
    id: 'basic-types',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Basic Types',
    pageNumber: 11,
    totalInModule: 16,
    content: `
Go's basic types are:
- \`bool\`
- \`string\`
- \`int\`, \`int8\`, \`int16\`, \`int32\`, \`int64\`
- \`uint\`, \`uint8\`, \`uint16\`, \`uint32\`, \`uint64\`, \`uintptr\`
- \`byte\` (alias for \`uint8\`)
- \`rune\` (alias for \`int32\`, represents a Unicode code point)
- \`float32\`, \`float64\`
- \`complex64\`, \`complex128\`

The example shows variables of several types, and that variable declarations may be "factored" into blocks, just like with import statements.
    `,
    keyTakeaway: 'Go provides explicit sized integer, float, rune, and complex types.',
    defaultCode: `package main

import (
	"fmt"
	"math/cmplx"
)

var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-5 + 12i)
)

func main() {
	fmt.Printf("Type: %T Value: %v\\n", ToBe, ToBe)
	fmt.Printf("Type: %T Value: %v\\n", MaxInt, MaxInt)
	fmt.Printf("Type: %T Value: %v\\n", z, z)
}
`,
  },
  {
    id: 'zero-values',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Zero Values',
    pageNumber: 12,
    totalInModule: 16,
    content: `
Variables declared without an explicit initial value are given their **zero value**:
- \`0\` for numeric types,
- \`false\` for the boolean type, and
- \`""\` (the empty string) for strings.
    `,
    keyTakeaway: 'Uninitialized variables deterministically default to their zero values (0, false, or "").',
    defaultCode: `package main

import "fmt"

func main() {
	var i int
	var f float64
	var b bool
	var s string
	fmt.Printf("%v %v %v %q\\n", i, f, b, s)
}
`,
  },
  {
    id: 'type-conversions',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Type Conversions',
    pageNumber: 13,
    totalInModule: 16,
    content: `
The expression \`T(v)\` converts the value \`v\` to the type \`T\`.

Some numeric conversions:
\`\`\`go
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
\`\`\`

Or, put more simply:
\`\`\`go
i := 42
f := float64(i)
u := uint(f)
\`\`\`

Unlike in C, in Go assignment between items of different type requires an **explicit conversion**.
    `,
    keyTakeaway: 'Go strictly enforces explicit conversions T(v); there is no implicit type casting.',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

func main() {
	var x, y int = 3, 4
	var f float64 = math.Sqrt(float64(x*x + y*y))
	var z uint = uint(f)
	fmt.Println(x, y, z)
}
`,
  },
  {
    id: 'type-inference',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Type Inference',
    pageNumber: 14,
    totalInModule: 16,
    content: `
When declaring a variable without specifying an explicit type (either by using the \`:=\` syntax or \`var = \` expression syntax), the variable's type is inferred from the value on the right hand side.

When the right hand side of the declaration is typed, the new variable is of that same type:
\`\`\`go
var i int
j := i // j is an int
\`\`\`

When the right hand side contains an untyped numeric constant, the new variable may be an \`int\`, \`float64\`, or \`complex128\` depending on the precision of the constant:
\`\`\`go
i := 42           // int
f := 3.142        // float64
g := 0.867 + 0.5i // complex128
\`\`\`
    `,
    keyTakeaway: 'Untyped numeric literals infer int, float64, or complex128 based on syntax.',
    defaultCode: `package main

import "fmt"

func main() {
	v := 42 // change me!
	fmt.Printf("v is of type %T\\n", v)
}
`,
  },
  {
    id: 'constants',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Constants',
    pageNumber: 15,
    totalInModule: 16,
    content: `
Constants are declared like variables, but with the \`const\` keyword.

Constants can be character, string, boolean, or numeric values.

Constants cannot be declared using the \`:=\` syntax.
    `,
    keyTakeaway: 'Constants use const keyword and cannot use the := operator.',
    defaultCode: `package main

import "fmt"

const Pi = 3.14

func main() {
	const World = "世界"
	fmt.Println("Hello", World)
	fmt.Println("Happy", Pi, "Day")

	const Truth = true
	fmt.Println("Go rules?", Truth)
}
`,
  },
  {
    id: 'numeric-constants',
    moduleId: 'basics',
    moduleTitle: '2. Basics',
    title: 'Numeric Constants',
    pageNumber: 16,
    totalInModule: 16,
    content: `
Numeric constants are **high-precision values**.

An untyped constant takes the type needed by its context.

See what \`needInt(Big)\` prints:
\`Big\` is $1 \\times 10^{100}$, which cannot fit into an \`int\`, but can be used in floating point operations or bitwise shifted!
    `,
    keyTakeaway: 'Numeric constants are arbitrary-precision values that adapt to context.',
    defaultCode: `package main

import "fmt"

const (
	// Create a huge number by shifting a 1 bit left 100 places.
	// In other words, the binary number that is 1 followed by 100 zeroes.
	Big = 1 << 100
	// Shift it right again 99 places, so we end up with 1 << 1, or 2.
	Small = Big >> 99
)

func needInt(x int) int { return x*10 + 1 }
func needFloat(x float64) float64 {
	return x * 0.1
}

func main() {
	fmt.Println(needInt(Small))
	fmt.Println(needFloat(Small))
	fmt.Println(needFloat(Big))
}
`,
  },

  // ================= 3. FLOW CONTROL STATEMENTS =================
  {
    id: 'for-loop',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'For',
    pageNumber: 1,
    totalInModule: 13,
    content: `
Go has only one looping construct: the **\`for\` loop**.

The basic \`for\` loop has three components separated by semicolons:
1. The **init statement**: executed before the first iteration
2. The **condition expression**: evaluated before every iteration
3. The **post statement**: executed at the end of every iteration

There are no parentheses \`()\` surrounding the three components, and braces \`{}\` are always required.
    `,
    keyTakeaway: 'Go has only one looping construct: for. No parentheses around the 3 components.',
    defaultCode: `package main

import "fmt"

func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)
}
`,
  },
  {
    id: 'for-continued',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'For Continued',
    pageNumber: 2,
    totalInModule: 13,
    content: `
The init and post statements are optional:

\`\`\`go
sum := 1
for ; sum < 1000; {
    sum += sum
}
\`\`\`
    `,
    keyTakeaway: 'Init and post statements in for loops are optional.',
    defaultCode: `package main

import "fmt"

func main() {
	sum := 1
	for ; sum < 1000; {
		sum += sum
	}
	fmt.Println(sum)
}
`,
  },
  {
    id: 'for-is-gos-while',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'For is Go\'s "While"',
    pageNumber: 3,
    totalInModule: 13,
    content: `
At that point you can drop the semicolons: C's \`while\` is spelled \`for\` in Go!

\`\`\`go
sum := 1
for sum < 1000 {
    sum += sum
}
\`\`\`
    `,
    keyTakeaway: 'Drop semicolons to turn for into Go\'s while loop: for condition { ... }.',
    defaultCode: `package main

import "fmt"

func main() {
	sum := 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)
}
`,
  },
  {
    id: 'forever',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'Forever',
    pageNumber: 4,
    totalInModule: 13,
    content: `
If you omit the loop condition it loops forever, so an infinite loop is compactly expressed:

\`\`\`go
for {
    // loops forever
}
\`\`\`
Use \`break\` or \`return\` to exit an infinite loop.
    `,
    keyTakeaway: 'for { ... } without condition loops indefinitely until break or return.',
    defaultCode: `package main

import "fmt"

func main() {
	count := 0
	for {
		count++
		if count > 5 {
			break
		}
		fmt.Println("Loop iteration:", count)
	}
}
`,
  },
  {
    id: 'if',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'If',
    pageNumber: 5,
    totalInModule: 13,
    content: `
Go's \`if\` statements look like its \`for\` loops; the expression need not be surrounded by parentheses \`()\` but the braces \`{}\` are required.
    `,
    keyTakeaway: 'if statements require braces {} but no parentheses () around condition.',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

func sqrt(x float64) string {
	if x < 0 {
		return sqrt(-x) + "i"
	}
	return fmt.Sprint(math.Sqrt(x))
}

func main() {
	fmt.Println(sqrt(2), sqrt(-4))
}
`,
  },
  {
    id: 'if-with-short-statement',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'If with a Short Statement',
    pageNumber: 6,
    totalInModule: 13,
    content: `
Like \`for\`, the \`if\` statement can start with a short statement to execute before the condition.

Variables declared by the statement are only in scope until the end of the \`if\`.
    `,
    keyTakeaway: 'Use short if statements to restrict temporary variable scope: if v := fn(); v < lim.',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	}
	return lim
}

func main() {
	fmt.Println(
		pow(3, 2, 10),
		pow(3, 3, 20),
	)
}
`,
  },
  {
    id: 'if-and-else',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'If and Else',
    pageNumber: 7,
    totalInModule: 13,
    content: `
Variables declared inside an \`if\` short statement are also available inside any of the \`else\` blocks.
    `,
    keyTakeaway: 'Variables from the if short statement are available across all else if and else branches.',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	} else {
		fmt.Printf("%g >= %g\\n", v, lim)
	}
	// can't use v here, though
	return lim
}

func main() {
	fmt.Println(
		pow(3, 2, 10),
		pow(3, 3, 20),
	)
}
`,
  },
  {
    id: 'exercise-loops-and-functions',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'Exercise: Loops and Functions',
    pageNumber: 8,
    totalInModule: 13,
    isExercise: true,
    content: `
### Newton\'s Method for Square Roots
Implement a square root function using **Newton's method**.

Starting with a guess $z = 1.0$, repeatedly adjust:
$$z = z - \\frac{z^2 - x}{2z}$$

Repeat this calculation 10 times or until $z$ changes by less than \`1e-10\`. Compare with \`math.Sqrt\`.
    `,
    keyTakeaway: 'Newton\'s method formula: z -= (z*z - x) / (2*z).',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

func Sqrt(x float64) float64 {
	z := 1.0
	for i := 0; i < 10; i++ {
		z -= (z*z - x) / (2 * z)
	}
	return z
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(math.Sqrt(2))
}
`,
    solutionCode: `package main

import (
	"fmt"
	"math"
)

func Sqrt(x float64) float64 {
	z := 1.0
	for i := 0; i < 10; i++ {
		prev := z
		z -= (z*z - x) / (2 * z)
		if math.Abs(z - prev) < 1e-12 {
			break
		}
	}
	return z
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(math.Sqrt(2))
}
`,
    hint: 'Use z -= (z*z - x) / (2*z) in a loop, comparing delta with math.Abs(z - prev).',
  },
  {
    id: 'switch',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'Switch',
    pageNumber: 9,
    totalInModule: 13,
    content: `
A \`switch\` statement is a shorter way to write a sequence of \`if - else\` statements.

In Go, the \`break\` statement that is needed at the end of each case in C, C++, or Java is provided **automatically**!
    `,
    keyTakeaway: 'Go switches break automatically after the matching case executes.',
    defaultCode: `package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.\\n", os)
	}
}
`,
  },
  {
    id: 'switch-evaluation-order',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'Switch Evaluation Order',
    pageNumber: 10,
    totalInModule: 13,
    content: `
Switch cases evaluate cases from top to bottom, stopping when a case succeeds.

For example:
\`\`\`go
switch i {
case 0:
case f():
}
\`\`\`
does not call \`f\` if \`i == 0\`.
    `,
    keyTakeaway: 'Switch cases evaluate from top to bottom and short-circuit upon match.',
    defaultCode: `package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("When's Saturday?")
	today := time.Now().Weekday()
	switch time.Saturday {
	case today + 0:
		fmt.Println("Today.")
	case today + 1:
		fmt.Println("Tomorrow.")
	case today + 2:
		fmt.Println("In two days.")
	default:
		fmt.Println("Too far away.")
	}
}
`,
  },
  {
    id: 'switch-with-no-condition',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'Switch with No Condition',
    pageNumber: 11,
    totalInModule: 13,
    content: `
Switch without a condition is the same as \`switch true\`.

This construct can be a clean way to write long \`if-then-else\` chains.
    `,
    keyTakeaway: 'switch without a condition is switch true, providing clean multi-branch logic.',
    defaultCode: `package main

import (
	"fmt"
	"time"
)

func main() {
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
}
`,
  },
  {
    id: 'defer',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'Defer',
    pageNumber: 12,
    totalInModule: 13,
    content: `
A \`defer\` statement defers the execution of a function until the surrounding function returns.

The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns.
    `,
    keyTakeaway: 'defer delays execution until the surrounding function returns.',
    defaultCode: `package main

import "fmt"

func main() {
	defer fmt.Println("world")

	fmt.Println("hello")
}
`,
  },
  {
    id: 'stacking-defers',
    moduleId: 'flow-control',
    moduleTitle: '3. Flow Control',
    title: 'Stacking Defers',
    pageNumber: 13,
    totalInModule: 13,
    content: `
Deferred function calls are pushed onto a stack. When a function returns, its deferred calls are executed in **last-in-first-out (LIFO)** order.
    `,
    keyTakeaway: 'Stacked defers execute in LIFO order upon function return.',
    defaultCode: `package main

import "fmt"

func main() {
	fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}

	fmt.Println("done")
}
`,
  },

  // ================= 4. MORE TYPES: STRUCTS, SLICES, AND MAPS =================
  {
    id: 'pointers',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Pointers',
    pageNumber: 1,
    totalInModule: 16,
    content: `
Go has pointers. A pointer holds the memory address of a value.

- The type \`*T\` is a pointer to a \`T\` value.
- \`&i\` generates a pointer to \`i\`.
- \`*p\` dereferences the pointer \`p\`.

Unlike C, Go has **no pointer arithmetic**.
    `,
    keyTakeaway: 'Pointers hold memory addresses; Go strictly forbids pointer arithmetic.',
    defaultCode: `package main

import "fmt"

func main() {
	i, j := 42, 2701

	p := &i         // point to i
	fmt.Println(*p) // read i through the pointer
	*p = 21         // set i through the pointer
	fmt.Println(i)  // see the new value of i

	p = &j         // point to j
	*p = *p / 37   // divide j through the pointer
	fmt.Println(j) // see the new value of j
}
`,
  },
  {
    id: 'structs',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Structs & Struct Fields',
    pageNumber: 2,
    totalInModule: 16,
    content: `
A \`struct\` is a collection of fields.

Struct fields are accessed using a dot (\`.\`):
\`\`\`go
v := Vertex{1, 2}
v.X = 4
\`\`\`
    `,
    keyTakeaway: 'Structs group typed fields, accessed via dot notation.',
    defaultCode: `package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	v.X = 4
	fmt.Println(v)
}
`,
  },
  {
    id: 'pointers-to-structs',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Pointers to Structs',
    pageNumber: 3,
    totalInModule: 16,
    content: `
Struct fields can be accessed through a struct pointer.

To access the field \`X\` of a struct when we have the struct pointer \`p\` we could write \`(*p).X\`. However, that notation is cumbersome, so Go permits us instead to write just \`p.X\`, without the explicit dereference!
    `,
    keyTakeaway: 'p.X automatically dereferences struct pointer p without (*p).X syntax.',
    defaultCode: `package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	p := &v
	p.X = 1e9
	fmt.Println(v)
}
`,
  },
  {
    id: 'struct-literals',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Struct Literals',
    pageNumber: 4,
    totalInModule: 16,
    content: `
A struct literal denotes a newly allocated struct value by listing the values of its fields.

You can list just a subset of fields by using the \`Name:\` syntax (and the order of named fields does not matter).
The special prefix \`&\` returns a pointer to the struct value.
    `,
    keyTakeaway: 'Struct literals initialize fields; omitted fields take their zero values.',
    defaultCode: `package main

import "fmt"

type Vertex struct {
	X, Y int
}

var (
	v1 = Vertex{1, 2}  // has type Vertex
	v2 = Vertex{X: 1}  // Y:0 is implicit
	v3 = Vertex{}      // X:0 and Y:0
	p  = &Vertex{1, 2} // has type *Vertex
)

func main() {
	fmt.Println(v1, v2, v3, p)
}
`,
  },
  {
    id: 'arrays',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Arrays',
    pageNumber: 5,
    totalInModule: 16,
    content: `
The type \`[n]T\` is an array of \`n\` values of type \`T\`.

The expression:
\`\`\`go
var a [10]int
\`\`\`
declares a variable \`a\` as an array of ten integers.

An array's length is part of its type, so arrays cannot be resized.
    `,
    keyTakeaway: 'Array size [n]T is fixed and part of its type.',
    defaultCode: `package main

import "fmt"

func main() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])
	fmt.Println(a)

	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes)
}
`,
  },
  {
    id: 'slices',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Slices & Slice References',
    pageNumber: 6,
    totalInModule: 16,
    content: `
A slice is a dynamically-sized, flexible view into the elements of an array.

A slice does not store any data, it just describes a section of an underlying array.

Changing the elements of a slice modifies the corresponding elements of its underlying array. Other slices that share the same array will see those changes!
    `,
    keyTakeaway: 'Slices are views into underlying arrays; modifying elements affects all sharing slices.',
    defaultCode: `package main

import "fmt"

func main() {
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	fmt.Println(names)

	a := names[0:2]
	b := names[1:3]
	fmt.Println(a, b)

	b[0] = "XXX"
	fmt.Println(a, b)
	fmt.Println(names)
}
`,
  },
  {
    id: 'slice-len-cap',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Slice Length and Capacity',
    pageNumber: 7,
    totalInModule: 16,
    content: `
A slice has both a **length** and a **capacity**.

- \`len(s)\`: number of elements in slice.
- \`cap(s)\`: number of elements in the underlying array, counting from the first element in the slice.
    `,
    keyTakeaway: 'len(s) is count of elements; cap(s) is total underlying capacity from start index.',
    defaultCode: `package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s)

	s = s[:0]
	printSlice(s)

	s = s[:4]
	printSlice(s)

	s = s[2:]
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\\n", len(s), cap(s), s)
}
`,
  },
  {
    id: 'nil-slices-and-make',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Creating a Slice with make',
    pageNumber: 8,
    totalInModule: 16,
    content: `
Slices can be created with the built-in \`make\` function; this is how you create dynamically-sized arrays:

\`\`\`go
a := make([]int, 5)  // len(a)=5
b := make([]int, 0, 5) // len(b)=0, cap(b)=5
\`\`\`
    `,
    keyTakeaway: 'make([]T, len, cap) allocates a zeroed array and returns a slice referencing it.',
    defaultCode: `package main

import "fmt"

func main() {
	a := make([]int, 5)
	printSlice("a", a)

	b := make([]int, 0, 5)
	printSlice("b", b)

	c := b[:2]
	printSlice("c", c)

	d := c[2:5]
	printSlice("d", d)
}

func printSlice(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\\n", s, len(x), cap(x), x)
}
`,
  },
  {
    id: 'slices-of-slices',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Slices of Slices',
    pageNumber: 9,
    totalInModule: 16,
    content: `
Slices can contain any type, including other slices!

Here is a Tic-Tac-Toe board represented as a slice of slices of strings:
\`\`\`go
board := [][]string{
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
}
\`\`\`
    `,
    keyTakeaway: 'Slices can be nested ([][]T) to represent matrices and multidimensional data.',
    defaultCode: `package main

import (
	"fmt"
	"strings"
)

func main() {
	// Create a tic-tac-toe board.
	board := [][]string{
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}

	// The players take turns.
	board[0][0] = "X"
	board[2][2] = "O"
	board[1][2] = "X"
	board[1][0] = "O"
	board[0][2] = "X"

	for i := 0; i < len(board); i++ {
		fmt.Printf("%s\\n", strings.Join(board[i], " "))
	}
}
`,
  },
  {
    id: 'append-slice',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Appending to a Slice',
    pageNumber: 10,
    totalInModule: 16,
    content: `
It is common to append new elements to a slice, and so Go provides a built-in \`append\` function:
\`\`\`go
func append(s []T, vs ...T) []T
\`\`\`

If the backing array of \`s\` is too small, a bigger array will be allocated. The returned slice will point to the newly allocated array.
    `,
    keyTakeaway: 'append automatically resizes slices, reallocating underlying capacity when full.',
    defaultCode: `package main

import "fmt"

func main() {
	var s []int
	printSlice(s)

	s = append(s, 0)
	printSlice(s)

	s = append(s, 1)
	printSlice(s)

	s = append(s, 2, 3, 4)
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\\n", len(s), cap(s), s)
}
`,
  },
  {
    id: 'range',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Range',
    pageNumber: 11,
    totalInModule: 16,
    content: `
The \`range\` form of the \`for\` loop iterates over a slice or map.

When ranging over a slice, two values are returned for each iteration: the index, and a copy of the element at that index.
    `,
    keyTakeaway: 'for i, v := range s iterates over index and value.',
    defaultCode: `package main

import "fmt"

var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow {
		fmt.Printf("2**%d = %d\\n", i, v)
	}
}
`,
  },
  {
    id: 'range-continued',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Range Continued',
    pageNumber: 12,
    totalInModule: 16,
    content: `
You can skip the index or value by assigning to \`_\`.

If you only want the index, you can omit the second variable.
    `,
    keyTakeaway: 'Use _ to ignore unwanted index or value variables in range loops.',
    defaultCode: `package main

import "fmt"

func main() {
	pow := make([]int, 10)
	for i := range pow {
		pow[i] = 1 << uint(i) // == 2**i
	}
	for _, value := range pow {
		fmt.Printf("%d\\n", value)
	}
}
`,
  },
  {
    id: 'exercise-slices',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Exercise: Slices',
    pageNumber: 13,
    totalInModule: 16,
    isExercise: true,
    content: `
Implement \`Pic\`. It should return a slice of length \`dy\`, each element of which is a slice of \`dx\` 8-bit unsigned integers.

When you run the program, it displays your picture, interpreting the integers as grayscale values.

Try interesting functions like \`(x+y)/2\`, \`x*y\`, or \`x^y\`.
    `,
    keyTakeaway: 'Allocate dynamic 2D slices with make([][]uint8, dy) and make([]uint8, dx).',
    defaultCode: `package main

import "fmt"

func Pic(dx, dy int) [][]uint8 {
	picture := make([][]uint8, dy)
	for y := 0; y < dy; y++ {
		row := make([]uint8, dx)
		for x := 0; x < dx; x++ {
			row[x] = uint8((x + y) / 2)
		}
		picture[y] = row
	}
	return picture
}

func main() {
	pic := Pic(8, 8)
	for y := range pic {
		fmt.Println(pic[y])
	}
}
`,
    solutionCode: `package main

import "fmt"

func Pic(dx, dy int) [][]uint8 {
	pic := make([][]uint8, dy)
	for y := range pic {
		pic[y] = make([]uint8, dx)
		for x := range pic[y] {
			pic[y][x] = uint8(x ^ y)
		}
	}
	return pic
}

func main() {
	pic := Pic(8, 8)
	for y := range pic {
		fmt.Println(pic[y])
	}
}
`,
    hint: 'Allocate picture := make([][]uint8, dy), then loop each row with make([]uint8, dx).',
  },
  {
    id: 'maps-and-mutating',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Maps & Mutating Maps',
    pageNumber: 14,
    totalInModule: 16,
    content: `
A map maps keys to values.

Mutating maps:
- Insert or update an element: \`m[key] = elem\`
- Retrieve an element: \`elem = m[key]\`
- Delete an element: \`delete(m, key)\`
- Test that a key is present: \`elem, ok = m[key]\`
    `,
    keyTakeaway: 'Check key presence with two-value assignment: elem, ok := m[key].',
    defaultCode: `package main

import "fmt"

func main() {
	m := make(map[string]int)

	m["Answer"] = 42
	fmt.Println("The value:", m["Answer"])

	m["Answer"] = 48
	fmt.Println("The value:", m["Answer"])

	delete(m, "Answer")
	fmt.Println("The value:", m["Answer"])

	v, ok := m["Answer"]
	fmt.Println("The value:", v, "Present?", ok)
}
`,
  },
  {
    id: 'exercise-word-count',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Exercise: Maps',
    pageNumber: 15,
    totalInModule: 16,
    isExercise: true,
    content: `
Implement \`WordCount\`. It should return a map of the counts of each "word" in the string \`s\`.

The \`strings.Fields\` function is helpful to separate words by spaces.
    `,
    keyTakeaway: 'Use make(map[string]int) and range over strings.Fields(s) to count frequencies.',
    defaultCode: `package main

import (
	"fmt"
	"strings"
)

func WordCount(s string) map[string]int {
	counts := make(map[string]int)
	for _, word := range strings.Fields(s) {
		counts[word]++
	}
	return counts
}

func main() {
	fmt.Println(WordCount("I am learning Go!"))
}
`,
    solutionCode: `package main

import (
	"fmt"
	"strings"
)

func WordCount(s string) map[string]int {
	counts := make(map[string]int)
	for _, word := range strings.Fields(s) {
		counts[word]++
	}
	return counts
}

func main() {
	fmt.Println(WordCount("I am learning Go!"))
}
`,
    hint: 'Initialize counts := make(map[string]int), loop through strings.Fields(s), and increment counts[word]++.',
  },
  {
    id: 'exercise-fibonacci-closure',
    moduleId: 'more-types',
    moduleTitle: '4. More Types',
    title: 'Exercise: Fibonacci Closure',
    pageNumber: 16,
    totalInModule: 16,
    isExercise: true,
    content: `
Implement a \`fibonacci\` function that returns a function (a closure) that returns successive Fibonacci numbers (0, 1, 1, 2, 3, 5, ...).
    `,
    keyTakeaway: 'Closures retain access to variables declared outside their body.',
    defaultCode: `package main

import "fmt"

// fibonacci is a function that returns
// a function that returns an int.
func fibonacci() func() int {
	a, b := 0, 1
	return func() int {
		curr := a
		a, b = b, a+b
		return curr
	}
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}
`,
    solutionCode: `package main

import "fmt"

func fibonacci() func() int {
	a, b := 0, 1
	return func() int {
		curr := a
		a, b = b, a+b
		return curr
	}
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}
`,
    hint: 'Store state in two variables a, b outside the returned closure and update them: a, b = b, a+b.',
  },

  // ================= 5. METHODS AND INTERFACES =================
  {
    id: 'methods',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'Methods',
    pageNumber: 1,
    totalInModule: 12,
    content: `
Go does not have classes. However, you can define methods on types.

A method is a function with a special receiver argument.

The receiver appears in its own argument list between the \`func\` keyword and the method name.
    `,
    keyTakeaway: 'Methods are functions with a receiver argument placed between func and the method name.',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
`,
  },
  {
    id: 'pointer-receivers',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'Pointer Receivers',
    pageNumber: 2,
    totalInModule: 12,
    content: `
You can declare methods with pointer receivers.

This means the receiver type has the literal syntax \`*T\` for some type \`T\`. (Also, \`T\` cannot itself be a pointer such as \`*int\`.)

Pointer receivers allow the method to modify the value that the receiver points to, and avoid copying the value on each method call.
    `,
    keyTakeaway: 'Use pointer receivers (*T) to modify receiver state and avoid struct copy overhead.',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(10)
	fmt.Println(v.Abs())
}
`,
  },
  {
    id: 'interfaces',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'Interfaces',
    pageNumber: 3,
    totalInModule: 12,
    content: `
An **interface type** is defined as a set of method signatures.

A value of interface type can hold any value that implements those methods.
    `,
    keyTakeaway: 'Interfaces define sets of method signatures fulfilled by any satisfying type.',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat implements Abser
	a = &v // a *Vertex implements Abser

	fmt.Println(a.Abs())
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
`,
  },
  {
    id: 'interfaces-are-implicit',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'Interfaces are Implemented Implicitly',
    pageNumber: 4,
    totalInModule: 12,
    content: `
A type implements an interface by implementing its methods.

**There is no explicit declaration of intent, no "implements" keyword.**

Implicit interfaces decouple the definition of an interface from its implementation.
    `,
    keyTakeaway: 'Types implement interfaces implicitly by implementing their methods without implements keyword.',
    defaultCode: `package main

import "fmt"

type I interface {
	M()
}

type T struct {
	S string
}

// This method means type T implements the interface I,
// but we don't need to explicitly declare it does so.
func (t T) M() {
	fmt.Println(t.S)
}

func main() {
	var i I = T{"hello"}
	i.M()
}
`,
  },
  {
    id: 'the-empty-interface',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'The Empty Interface (any)',
    pageNumber: 5,
    totalInModule: 12,
    content: `
The interface type that specifies zero methods is known as the **empty interface**:
\`\`\`go
interface{}
\`\`\`
In Go 1.18+, \`any\` is an alias for \`interface{}\`.

An empty interface may hold values of any type (since every type implements at least zero methods).
    `,
    keyTakeaway: 'interface{} (alias any) specifies zero methods and can hold any value.',
    defaultCode: `package main

import "fmt"

func main() {
	var i interface{}
	describe(i)

	i = 42
	describe(i)

	i = "hello"
	describe(i)
}

func describe(i interface{}) {
	fmt.Printf("(%v, %T)\\n", i, i)
}
`,
  },
  {
    id: 'type-assertions',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'Type Assertions',
    pageNumber: 6,
    totalInModule: 12,
    content: `
A **type assertion** provides access to an interface value's underlying concrete value:
\`\`\`go
t := i.(T)
\`\`\`

To test whether an interface value holds a specific type, a type assertion can return two values:
\`\`\`go
t, ok := i.(T)
\`\`\`
If \`i\` holds a \`T\`, \`ok\` is \`true\`. If not, \`ok\` is \`false\` and \`t\` is zero-valued without triggering a panic.
    `,
    keyTakeaway: 'Use t, ok := i.(T) to safely test concrete types stored inside interface values.',
    defaultCode: `package main

import "fmt"

func main() {
	var i interface{} = "hello"

	s := i.(string)
	fmt.Println(s)

	s, ok := i.(string)
	fmt.Println(s, ok)

	f, ok := i.(float64)
	fmt.Println(f, ok)
}
`,
  },
  {
    id: 'stringers',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'Stringers',
    pageNumber: 7,
    totalInModule: 12,
    content: `
One of the most ubiquitous interfaces is \`fmt.Stringer\`:
\`\`\`go
type Stringer interface {
    String() string
}
\`\`\`

A \`Stringer\` is a type that can describe itself as a string.
    `,
    keyTakeaway: 'Implement String() string on your types to customize their formatted output.',
    defaultCode: `package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func (p Person) String() string {
	return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
}

func main() {
	a := Person{"Arthur Dent", 42}
	z := Person{"Zaphod Beeblebrox", 9001}
	fmt.Println(a)
	fmt.Println(z)
}
`,
  },
  {
    id: 'exercise-stringers',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'Exercise: Stringers (IPAddr)',
    pageNumber: 8,
    totalInModule: 12,
    isExercise: true,
    content: `
Make the \`IPAddr\` type implement \`fmt.Stringer\` to print the address as a dotted quad.

For instance, \`IPAddr{1, 2, 3, 4}\` should print as \`"1.2.3.4"\`.
    `,
    keyTakeaway: 'fmt.Sprintf("%d.%d.%d.%d", ip[0], ip[1], ip[2], ip[3]) satisfies fmt.Stringer.',
    defaultCode: `package main

import "fmt"

type IPAddr [4]byte

func (ip IPAddr) String() string {
	return fmt.Sprintf("%d.%d.%d.%d", ip[0], ip[1], ip[2], ip[3])
}

func main() {
	hosts := map[string]IPAddr{
		"loopback":  {127, 0, 0, 1},
		"googleDNS": {8, 8, 8, 8},
	}
	for name, ip := range hosts {
		fmt.Printf("%v: %v\\n", name, ip)
	}
}
`,
    solutionCode: `package main

import "fmt"

type IPAddr [4]byte

func (ip IPAddr) String() string {
	return fmt.Sprintf("%d.%d.%d.%d", ip[0], ip[1], ip[2], ip[3])
}

func main() {
	hosts := map[string]IPAddr{
		"loopback":  {127, 0, 0, 1},
		"googleDNS": {8, 8, 8, 8},
	}
	for name, ip := range hosts {
		fmt.Printf("%v: %v\\n", name, ip)
	}
}
`,
    hint: 'Define func (ip IPAddr) String() string returning fmt.Sprintf("%d.%d.%d.%d", ip[0], ip[1], ip[2], ip[3]).',
  },
  {
    id: 'errors',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'Errors',
    pageNumber: 9,
    totalInModule: 12,
    content: `
Go programs express error states with \`error\` values.

The \`error\` type is a built-in interface similar to \`fmt.Stringer\`:
\`\`\`go
type error interface {
    Error() string
}
\`\`\`
Functions often return an \`error\` value, and calling code should handle errors by testing whether the error equals \`nil\`.
    `,
    keyTakeaway: 'The built-in error interface requires Error() string; nil indicates success.',
    defaultCode: `package main

import (
	"fmt"
	"time"
)

type MyError struct {
	When time.Time
	What string
}

func (e *MyError) Error() string {
	return fmt.Sprintf("at %v, %s", e.When, e.What)
}

func run() error {
	return &MyError{
		time.Now(),
		"it didn't work",
	}
}

func main() {
	if err := run(); err != nil {
		fmt.Println(err)
	}
}
`,
  },
  {
    id: 'exercise-errors',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'Exercise: Errors',
    pageNumber: 10,
    totalInModule: 12,
    isExercise: true,
    content: `
Create a new type:
\`\`\`go
type ErrNegativeSqrt float64
\`\`\`
and make it an \`error\` by giving it a method:
\`\`\`go
func (e ErrNegativeSqrt) Error() string
\`\`\`
Update your \`Sqrt\` function to return an \`ErrNegativeSqrt\` value when given a negative number.
    `,
    keyTakeaway: 'Custom error types implement Error() string to convey rich error context.',
    defaultCode: `package main

import (
	"fmt"
)

type ErrNegativeSqrt float64

func (e ErrNegativeSqrt) Error() string {
	return fmt.Sprintf("cannot Sqrt negative number: %v", float64(e))
}

func Sqrt(x float64) (float64, error) {
	if x < 0 {
		return 0, ErrNegativeSqrt(x)
	}
	z := 1.0
	for i := 0; i < 10; i++ {
		z -= (z*z - x) / (2 * z)
	}
	return z, nil
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(Sqrt(-2))
}
`,
    solutionCode: `package main

import (
	"fmt"
)

type ErrNegativeSqrt float64

func (e ErrNegativeSqrt) Error() string {
	return fmt.Sprintf("cannot Sqrt negative number: %v", float64(e))
}

func Sqrt(x float64) (float64, error) {
	if x < 0 {
		return 0, ErrNegativeSqrt(x)
	}
	z := 1.0
	for i := 0; i < 10; i++ {
		z -= (z*z - x) / (2 * z)
	}
	return z, nil
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(Sqrt(-2))
}
`,
    hint: 'Cast e to float64(e) inside Error() string to prevent infinite recursion.',
  },
  {
    id: 'readers',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'Readers (io.Reader)',
    pageNumber: 11,
    totalInModule: 12,
    content: `
The \`io\` package specifies the \`io.Reader\` interface, which represents the read end of a stream of data.

The Go standard library contains many implementations of this interface, including files, network connections, compressors, ciphers, and more.

\`\`\`go
func (T) Read(b []byte) (n int, err error)
\`\`\`
\`Read\` populates the given byte slice with data and returns the number of bytes populated and an error value. It returns an \`io.EOF\` error when the stream ends.
    `,
    keyTakeaway: 'io.Reader is the universal stream interface: Read(b []byte) (n int, err error).',
    defaultCode: `package main

import (
	"fmt"
	"io"
	"strings"
)

func main() {
	r := strings.NewReader("Hello, Reader!")

	b := make([]byte, 8)
	for {
		n, err := r.Read(b)
		fmt.Printf("n = %v err = %v b = %v\\n", n, err, b)
		fmt.Printf("b[:n] = %q\\n", b[:n])
		if err == io.EOF {
			break
		}
	}
}
`,
  },
  {
    id: 'exercise-rot13-reader',
    moduleId: 'methods-interfaces',
    moduleTitle: '5. Methods & Interfaces',
    title: 'Exercise: rot13Reader',
    pageNumber: 12,
    totalInModule: 12,
    isExercise: true,
    content: `
A common pattern is an \`io.Reader\` that wraps another \`io.Reader\`, modifying the stream in some way.

Implement a \`rot13Reader\` that implements \`io.Reader\` and reads from an \`io.Reader\`, modifying the stream by applying the **ROT13** cipher to all alphabetical characters.
    `,
    keyTakeaway: 'Reader wrappers compose streams by delegating Read() and transforming bytes.',
    defaultCode: `package main

import (
	"io"
	"os"
	"strings"
)

type rot13Reader struct {
	r io.Reader
}

func (rot *rot13Reader) Read(b []byte) (int, error) {
	n, err := rot.r.Read(b)
	for i := 0; i < n; i++ {
		c := b[i]
		if (c >= 'A' && c <= 'M') || (c >= 'a' && c <= 'm') {
			b[i] += 13
		} else if (c >= 'N' && c <= 'Z') || (c >= 'n' && c <= 'z') {
			b[i] -= 13
		}
	}
	return n, err
}

func main() {
	s := strings.NewReader("Lbh penpxrq gur pbqr!")
	r := rot13Reader{s}
	io.Copy(os.Stdout, &r)
}
`,
    solutionCode: `package main

import (
	"io"
	"os"
	"strings"
)

type rot13Reader struct {
	r io.Reader
}

func (rot *rot13Reader) Read(b []byte) (int, error) {
	n, err := rot.r.Read(b)
	for i := 0; i < n; i++ {
		c := b[i]
		if (c >= 'A' && c <= 'M') || (c >= 'a' && c <= 'm') {
			b[i] += 13
		} else if (c >= 'N' && c <= 'Z') || (c >= 'n' && c <= 'z') {
			b[i] -= 13
		}
	}
	return n, err
}

func main() {
	s := strings.NewReader("Lbh penpxrq gur pbqr!")
	r := rot13Reader{s}
	io.Copy(os.Stdout, &r)
}
`,
    hint: 'Rotate characters by 13: if c between A-M or a-m add 13, else subtract 13.',
  },

  // ================= 6. GENERICS =================
  {
    id: 'generics-type-parameters',
    moduleId: 'generics',
    moduleTitle: '6. Generics',
    title: 'Type Parameters',
    pageNumber: 1,
    totalInModule: 2,
    content: `
Go functions can be written to work on multiple types using **type parameters**.

The type parameters of a function appear before the function's arguments, between brackets:
\`\`\`go
func Index[T comparable](s []T, x T) int
\`\`\`

This declaration means that \`s\` is a slice of any type \`T\` that fulfills the built-in constraint \`comparable\`. \`x\` is also a value of the same type.
    `,
    keyTakeaway: 'Type parameters [T comparable] enable reusable, type-safe generic functions.',
    defaultCode: `package main

import "fmt"

func Index[T comparable](s []T, x T) int {
	for i, v := range s {
		if v == x {
			return i
		}
	}
	return -1
}

func main() {
	si := []int{10, 20, 15, -10}
	fmt.Println("Index of 20 in si:", Index(si, 20))

	ss := []string{"foo", "bar", "baz"}
	fmt.Println("Index of 'bar' in ss:", Index(ss, "bar"))
}
`,
  },
  {
    id: 'generics-types',
    moduleId: 'generics',
    moduleTitle: '6. Generics',
    title: 'Generic Types',
    pageNumber: 2,
    totalInModule: 2,
    content: `
In addition to generic functions, Go also supports **generic types**.

A type can be parameterized with a type parameter, which could be useful for implementing generic data structures.

This example demonstrates a simple singly-linked list holding values of any type:
\`\`\`go
type List[T any] struct {
    next *List[T]
    val  T
}
\`\`\`
    `,
    keyTakeaway: 'type List[T any] struct parameterizes custom data structures with generic types.',
    defaultCode: `package main

import "fmt"

type List[T any] struct {
	next *List[T]
	val  T
}

func main() {
	head := &List[int]{val: 10}
	head.next = &List[int]{val: 20}
	head.next.next = &List[int]{val: 30}

	for curr := head; curr != nil; curr = curr.next {
		fmt.Printf("%d -> ", curr.val)
	}
	fmt.Println("nil")
}
`,
  },

  // ================= 7. CONCURRENCY =================
  {
    id: 'goroutines',
    moduleId: 'concurrency',
    moduleTitle: '7. Concurrency',
    title: 'Goroutines',
    pageNumber: 1,
    totalInModule: 7,
    content: `
A **goroutine** is a lightweight thread managed by the Go runtime.

\`\`\`go
go f(x, y, z)
\`\`\`
starts a new goroutine running \`f(x, y, z)\`.

Goroutines run in the same address space, so access to shared memory must be synchronized.
    `,
    keyTakeaway: 'The go keyword spawns concurrent, lightweight goroutines managed by the Go runtime.',
    defaultCode: `package main

import (
	"fmt"
	"time"
)

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world")
	say("hello")
}
`,
  },
  {
    id: 'channels',
    moduleId: 'concurrency',
    moduleTitle: '7. Concurrency',
    title: 'Channels',
    pageNumber: 2,
    totalInModule: 7,
    content: `
Channels are a typed conduit through which you can send and receive values with the channel operator, \`<- \`.

\`\`\`go
ch <- v    // Send v to channel ch.
v := <-ch  // Receive from ch, and assign value to v.
\`\`\`

By default, sends and receives block until the other side is ready. This allows goroutines to synchronize without explicit locks.
    `,
    keyTakeaway: 'Channels send and receive data (ch <- v and v := <-ch) and synchronize goroutines without locks.',
    defaultCode: `package main

import "fmt"

func sum(s []int, c chan int) {
	total := 0
	for _, v := range s {
		total += v
	}
	c <- total
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c

	fmt.Println(x, y, x+y)
}
`,
  },
  {
    id: 'buffered-channels',
    moduleId: 'concurrency',
    moduleTitle: '7. Concurrency',
    title: 'Buffered Channels',
    pageNumber: 3,
    totalInModule: 7,
    content: `
Channels can be buffered. Provide the buffer length as the second argument to \`make\` to initialize a buffered channel:

\`\`\`go
ch := make(chan int, 100)
\`\`\`

Sends to a buffered channel block only when the buffer is full. Receives block when the buffer is empty.
    `,
    keyTakeaway: 'Buffered channels make(chan T, cap) block sends only when full and receives only when empty.',
    defaultCode: `package main

import "fmt"

func main() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
`,
  },
  {
    id: 'range-and-close',
    moduleId: 'concurrency',
    moduleTitle: '7. Concurrency',
    title: 'Range and Close',
    pageNumber: 4,
    totalInModule: 7,
    content: `
A sender can \`close\` a channel to indicate that no more values will be sent. Receivers can test whether a channel has been closed by assigning a second parameter:

\`\`\`go
v, ok := <-ch
\`\`\`
\`ok\` is \`false\` if there are no more values to receive and the channel is closed.

The loop \`for i := range c\` receives values from the channel repeatedly until it is closed.
    `,
    keyTakeaway: 'close(c) signals no more data will be sent; for v := range c drains until closed.',
    defaultCode: `package main

import "fmt"

func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}
`,
  },
  {
    id: 'select',
    moduleId: 'concurrency',
    moduleTitle: '7. Concurrency',
    title: 'Select',
    pageNumber: 5,
    totalInModule: 7,
    content: `
The \`select\` statement lets a goroutine wait on multiple communication operations.

A \`select\` blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready.
    `,
    keyTakeaway: 'select blocks on multiple channel operations, executing whichever case is ready.',
    defaultCode: `package main

import "fmt"

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}
`,
  },
  {
    id: 'sync-mutex',
    moduleId: 'concurrency',
    moduleTitle: '7. Concurrency',
    title: 'sync.Mutex',
    pageNumber: 6,
    totalInModule: 7,
    content: `
When goroutines need to access shared data without race conditions, Go provides **mutual exclusion** via \`sync.Mutex\` and its methods \`Lock\` and \`Unlock\`.

We can use \`defer\` to ensure the mutex will always be unlocked!
    `,
    keyTakeaway: 'sync.Mutex guards shared memory with mu.Lock() and defer mu.Unlock().',
    defaultCode: `package main

import (
	"fmt"
	"sync"
	"time"
)

type SafeCounter struct {
	mu sync.Mutex
	v  map[string]int
}

func (c *SafeCounter) Inc(key string) {
	c.mu.Lock()
	c.v[key]++
	c.mu.Unlock()
}

func (c *SafeCounter) Value(key string) int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.v[key]
}

func main() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(100 * time.Millisecond)
	fmt.Println(c.Value("somekey"))
}
`,
  },
  {
    id: 'exercise-web-crawler',
    moduleId: 'concurrency',
    moduleTitle: '7. Concurrency',
    title: 'Exercise: Web Crawler',
    pageNumber: 7,
    totalInModule: 7,
    isExercise: true,
    content: `
In this exercise you'll use Go's concurrency features to parallelize a web crawler.

Modify the \`Crawl\` function to fetch URLs in parallel without fetching the same URL twice!
    `,
    keyTakeaway: 'Combine goroutines and sync.Mutex or channels to crawl concurrently without cycles.',
    defaultCode: `package main

import (
	"fmt"
	"sync"
)

type Fetcher interface {
	Fetch(url string) (body string, urls []string, err error)
}

type SafeCache struct {
	mu      sync.Mutex
	visited map[string]bool
}

func (s *SafeCache) Seen(url string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.visited[url] {
		return true
	}
	s.visited[url] = true
	return false
}

func Crawl(url string, depth int, fetcher Fetcher, cache *SafeCache) {
	if depth <= 0 || cache.Seen(url) {
		return
	}
	body, urls, err := fetcher.Fetch(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("found: %s %q\\n", url, body)
	var wg sync.WaitGroup
	for _, u := range urls {
		wg.Add(1)
		go func(target string) {
			defer wg.Done()
			Crawl(target, depth-1, fetcher, cache)
		}(u)
	}
	wg.Wait()
}

func main() {
	cache := &SafeCache{visited: make(map[string]bool)}
	Crawl("https://golang.org/", 4, fetcher, cache)
}

type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}
`,
    solutionCode: `package main

import (
	"fmt"
	"sync"
)

type Fetcher interface {
	Fetch(url string) (body string, urls []string, err error)
}

type SafeCache struct {
	mu      sync.Mutex
	visited map[string]bool
}

func (s *SafeCache) Seen(url string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.visited[url] {
		return true
	}
	s.visited[url] = true
	return false
}

func Crawl(url string, depth int, fetcher Fetcher, cache *SafeCache) {
	if depth <= 0 || cache.Seen(url) {
		return
	}
	body, urls, err := fetcher.Fetch(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("found: %s %q\\n", url, body)
	var wg sync.WaitGroup
	for _, u := range urls {
		wg.Add(1)
		go func(target string) {
			defer wg.Done()
			Crawl(target, depth-1, fetcher, cache)
		}(u)
	}
	wg.Wait()
}

func main() {
	cache := &SafeCache{visited: make(map[string]bool)}
	Crawl("https://golang.org/", 4, fetcher, cache)
}

type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}
`,
    hint: 'Use a map[string]bool protected by sync.Mutex to avoid duplicate crawls, and sync.WaitGroup to wait.',
  },
];

export const MODULES: Module[] = [
  {
    id: 'welcome',
    title: '1. Welcome',
    description: 'Introduction, Hello World, and using the Go interactive playground.',
    iconName: 'Smile',
    lessons: LESSONS.filter(l => l.moduleId === 'welcome'),
  },
  {
    id: 'basics',
    title: '2. Basics',
    description: 'Packages, variables, functions, exported names, basic types, zero values, and constants.',
    iconName: 'Package',
    lessons: LESSONS.filter(l => l.moduleId === 'basics'),
  },
  {
    id: 'flow-control',
    title: '3. Flow Control',
    description: 'For, while-style loops, if with short statement, switch, defer, and Newton\'s square root method.',
    iconName: 'GitBranch',
    lessons: LESSONS.filter(l => l.moduleId === 'flow-control'),
  },
  {
    id: 'more-types',
    title: '4. More Types',
    description: 'Pointers, structs, arrays, slices, slice references, make, append, range, maps, and closures.',
    iconName: 'Layers',
    lessons: LESSONS.filter(l => l.moduleId === 'more-types'),
  },
  {
    id: 'methods-interfaces',
    title: '5. Methods & Interfaces',
    description: 'Methods, pointer receivers, implicit interfaces, fmt.Stringer, errors, and io.Reader streams.',
    iconName: 'Cpu',
    lessons: LESSONS.filter(l => l.moduleId === 'methods-interfaces'),
  },
  {
    id: 'generics',
    title: '6. Generics',
    description: 'Type parameters, comparable constraints, and parameterized generic data structures.',
    iconName: 'Boxes',
    lessons: LESSONS.filter(l => l.moduleId === 'generics'),
  },
  {
    id: 'concurrency',
    title: '7. Concurrency',
    description: 'Goroutines, channels, buffered channels, select, sync.Mutex, and concurrent web crawler.',
    iconName: 'Zap',
    lessons: LESSONS.filter(l => l.moduleId === 'concurrency'),
  },
];
