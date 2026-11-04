import { Lesson, Module } from '../types';

export const LESSONS: Lesson[] = [
  // ================= MODULE 1: BASICS =================
  {
    id: 'welcome',
    moduleId: 'basics',
    moduleTitle: '1. Basics',
    title: 'Welcome to the Tour of Go',
    pageNumber: 1,
    totalInModule: 10,
    content: `
Welcome to a tour of the **Go programming language**!

The tour is divided into a list of modules that you can access by clicking on the **Table of Contents** button in the header.

Throughout the tour you will find a series of slides and exercises for you to complete.

You can navigate through them using:
- The **Previous** and **Next** buttons at the bottom.
- The arrow keys on your keyboard (\`Alt + Left\` / \`Alt + Right\`).
- The Table of Contents menu.

### Interactive Playground
The tour is fully interactive! Click the **Run** button on the right (or press \`Ctrl + Enter\` / \`Cmd + Enter\`) to compile and run the program on your browser.

Whenever you're ready, click **Next** to dive in!
    `,
    keyTakeaway: 'The Go tour is interactive: edit any code snippet and click Run to test your changes immediately.',
    defaultCode: `package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}
`,
  },
  {
    id: 'packages-and-imports',
    moduleId: 'basics',
    moduleTitle: '1. Basics',
    title: 'Packages & Factored Imports',
    pageNumber: 2,
    totalInModule: 10,
    content: `
Every Go program is made up of packages. Programs start running in package \`main\`.

This program is using the packages with import paths \`"fmt"\`, \`"math/rand"\`, and \`"time"\`.

By convention, the package name is the same as the last element of the import path. For instance, the \`"math/rand"\` package comprises files that begin with the statement \`package rand\`.

### Factored Import Statements
In Go, it is good style to use the factored import statement (grouping imports in parentheses), rather than multiple separate \`import\` statements:

\`\`\`go
import (
    "fmt"
    "time"
)
\`\`\`
    `,
    keyTakeaway: 'Always group multiple imports in a factored block: import ( "fmt"; "time" ).',
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
  {
    id: 'exported-names',
    moduleId: 'basics',
    moduleTitle: '1. Basics',
    title: 'Exported Names',
    pageNumber: 3,
    totalInModule: 10,
    content: `
In Go, a name is exported if it begins with a **capital letter**.

For example, \`Pi\` is an exported name from the \`math\` package. \`pi\` (with a lowercase 'p') is **not** exported and is unexported/private to the package.

When importing a package, you can refer only to its exported names. Any unexported names are not accessible from outside the package.

### Try It!
Run the code. Notice that \`math.pi\` causes a compile error. Change \`math.pi\` to \`math.Pi\` and run it again to see the value printed!
    `,
    keyTakeaway: 'Capitalized identifiers are public/exported; lowercase identifiers are package-private.',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

func main() {
	// Try changing math.pi to math.Pi to fix the compilation error!
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
    moduleTitle: '1. Basics',
    title: 'Functions & Shortened Parameter Types',
    pageNumber: 4,
    totalInModule: 10,
    content: `
A function can take zero or more arguments.

In this example, \`add\` takes two parameters of type \`int\`. Notice that the type comes **after** the variable name:
\`\`\`go
func add(x int, y int) int
\`\`\`

### Omitting Consecutive Types
When two or more consecutive named function parameters share a type, you can omit the type from all but the last:

\`\`\`go
func add(x, y int) int {
    return x + y
}
\`\`\`
This keeps function signatures clean and readable.
    `,
    keyTakeaway: 'Types follow identifiers in Go: func add(x, y int) int.',
    defaultCode: `package main

import "fmt"

func add(x, y int) int {
	return x + y
}

func main() {
	fmt.Println("33 + 9 = ", add(33, 9))
}
`,
  },
  {
    id: 'multiple-results',
    moduleId: 'basics',
    moduleTitle: '1. Basics',
    title: 'Multiple Results',
    pageNumber: 5,
    totalInModule: 10,
    content: `
A function can return **any number of results**.

This is one of Go's most celebrated features! In languages like C, Java, or Python, returning multiple items often requires tuples, objects, or out-parameters.

The \`swap\` function takes two strings and returns two strings:
\`\`\`go
func swap(x, y string) (string, string) {
    return y, x
}
\`\`\`

Multiple return values are widely used throughout Go's standard library, notably to return both a **result** and an **error** (e.g. \`result, err := os.Open(...)\`).
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
    moduleTitle: '1. Basics',
    title: 'Named Return Values & Naked Returns',
    pageNumber: 6,
    totalInModule: 10,
    content: `
Go's return values may be named. If so, they are treated as variables defined at the top of the function.

These names should be used to document the meaning of the return values.

A \`return\` statement without arguments returns the named return values. This is known as a **"naked" return**.

\`\`\`go
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
}
\`\`\`

*Note:* Naked return statements should be used only in short functions. In longer functions they can harm readability.
    `,
    keyTakeaway: 'Named return values act as local variables and can be returned via a naked return statement.',
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
    moduleTitle: '1. Basics',
    title: 'Variables & Initializers',
    pageNumber: 7,
    totalInModule: 10,
    content: `
The \`var\` statement declares a list of variables; as in function argument lists, the type is last.

A \`var\` statement can be at package or function level.

### Variable Initializers
A \`var\` declaration can include initializers, one per variable. If an initializer is present, the type can be omitted; the variable will take the type of the initializer:

\`\`\`go
var i, j int = 1, 2
var c, python, java = true, false, "no!"
\`\`\`
    `,
    keyTakeaway: 'Variables can be declared at package or function level with var x T = val.',
    defaultCode: `package main

import "fmt"

var c, python, java bool
var i int

func main() {
	fmt.Println(i, c, python, java)
}
`,
  },
  {
    id: 'short-variable-declarations',
    moduleId: 'basics',
    moduleTitle: '1. Basics',
    title: 'Short Variable Declarations ( := )',
    pageNumber: 8,
    totalInModule: 10,
    content: `
Inside a function, the \`:=\` short assignment statement can be used in place of a \`var\` declaration with implicit type.

Outside a function (at package scope), every statement begins with a keyword (\`var\`, \`func\`, etc.) and so the \`:=\` construct is not available.

\`\`\`go
// Valid inside functions:
k := 3
c, python, java := true, false, "no!"
\`\`\`
    `,
    keyTakeaway: 'Use := for concise variable declaration and initialization inside functions.',
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
    moduleTitle: '1. Basics',
    title: 'Basic Types & Zero Values',
    pageNumber: 9,
    totalInModule: 10,
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

### Zero Values
Variables declared without an explicit initial value are given their **zero value**:
- \`0\` for numeric types,
- \`false\` for the boolean type, and
- \`""\` (the empty string) for strings.
    `,
    keyTakeaway: 'Uninitialized variables always receive deterministic zero values (0, false, or "").',
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
    id: 'type-conversions-and-constants',
    moduleId: 'basics',
    moduleTitle: '1. Basics',
    title: 'Type Conversions & Constants',
    pageNumber: 10,
    totalInModule: 10,
    content: `
The expression \`T(v)\` converts the value \`v\` to the type \`T\`.

Unlike in C or C++, in Go assignment between items of different type requires an **explicit conversion**. Try removing \`float64\` or \`uint\` in the example code and see what happens!

### Constants
Constants are declared like variables, but with the \`const\` keyword:
\`\`\`go
const Pi = 3.14
const World = "世界"
\`\`\`
Constants cannot be declared using the \`:=\` syntax.
    `,
    keyTakeaway: 'Go strictly requires explicit type conversions T(v); no implicit casting is performed.',
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

  // ================= MODULE 2: FLOW CONTROL =================
  {
    id: 'for-loop',
    moduleId: 'flow-control',
    moduleTitle: '2. Flow Control',
    title: 'For Loops',
    pageNumber: 1,
    totalInModule: 6,
    content: `
Go has only one looping construct: the **\`for\` loop**!

The basic \`for\` loop has three components separated by semicolons:
1. The **init statement**: executed before the first iteration
2. The **condition expression**: evaluated before every iteration
3. The **post statement**: executed at the end of every iteration

The init statement will often be a short variable declaration, and the variables declared there are visible only in the scope of the \`for\` statement.

*Note:* Unlike other languages like C, Java, or JavaScript there are **no parentheses \`()\`** surrounding the three components, and the braces \`{}\` are always required.
    `,
    keyTakeaway: 'Go has only one looping construct: for. No parentheses around loop components.',
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
    moduleTitle: '2. Flow Control',
    title: 'For Continued (Go\'s While Loop)',
    pageNumber: 2,
    totalInModule: 6,
    content: `
The init and post statements are optional.

When you drop the semicolons, you get Go's equivalent of a \`while\` loop!

\`\`\`go
sum := 1
for sum < 1000 {
    sum += sum
}
\`\`\`

If you omit the loop condition altogether (\`for { ... }\`), you get an infinite loop that loops forever until a \`break\` or \`return\`.
    `,
    keyTakeaway: 'Omit init and post statements to write a clean while loop: for condition { ... }.',
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
    id: 'if-with-short-statement',
    moduleId: 'flow-control',
    moduleTitle: '2. Flow Control',
    title: 'If with a Short Statement',
    pageNumber: 3,
    totalInModule: 6,
    content: `
Like \`for\`, the \`if\` statement can start with a short statement to execute before the condition.

Variables declared by the statement are only in scope until the end of the \`if\` (and its corresponding \`else\` blocks):

\`\`\`go
if v := math.Pow(x, n); v < lim {
    return v
} else {
    fmt.Printf("%g >= %g\\n", v, lim)
}
\`\`\`

This idiom is very popular in Go for checking errors immediately without polluting the outer scope:
\`\`\`go
if err := doSomething(); err != nil {
    return err
}
\`\`\`
    `,
    keyTakeaway: 'Use short if statements to restrict temporary variable scope: if v := fn(); v < limit { ... }.',
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
    moduleTitle: '2. Flow Control',
    title: 'Exercise: Loops and Functions',
    pageNumber: 4,
    totalInModule: 6,
    isExercise: true,
    content: `
### Newton-Raphson Square Root
As a way to play with functions and loops, let's implement a square root function using **Newton's method**.

In this case, Newton's method is to approximate $\\sqrt{x}$ by picking a starting point $z = 1.0$ and then repeating:

$$z = z - \\frac{z^2 - x}{2z}$$

To begin with, repeat that calculation 10 times and print each $z$ along the way. See how close you get to the answer for various values of $x$ (1, 2, 3, ...), and how quickly the guess converges.

Next, change the loop condition to stop once the value has stopped changing (or only changes by very little, like \`< 1e-10\`). Compare your result to \`math.Sqrt\`.
    `,
    keyTakeaway: 'Newton\'s method converges quadratically to sqrt(x) using z -= (z*z - x) / (2*z).',
    defaultCode: `package main

import (
	"fmt"
	"math"
)

func Sqrt(x float64) float64 {
	// TODO: Initialize z = 1.0 and iterate Newton's formula:
	// z -= (z*z - x) / (2*z)
	z := 1.0
	for i := 0; i < 10; i++ {
		z -= (z*z - x) / (2 * z)
	}
	return z
}

func main() {
	fmt.Println("Sqrt(2) result: ", Sqrt(2))
	fmt.Println("math.Sqrt(2):   ", math.Sqrt(2))
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
	fmt.Println("Sqrt(2) result: ", Sqrt(2))
	fmt.Println("math.Sqrt(2):   ", math.Sqrt(2))
}
`,
    hint: 'Formula: z -= (z*z - x) / (2*z). Run 10 iterations or stop when math.Abs(z - prev) < 1e-10.',
  },
  {
    id: 'switch-statement',
    moduleId: 'flow-control',
    moduleTitle: '2. Flow Control',
    title: 'Switch Statement & No Condition',
    pageNumber: 5,
    totalInModule: 6,
    content: `
A \`switch\` statement is a shorter way to write a sequence of \`if - else\` statements.

In Go:
1. Go only runs the selected case, not all the cases that follow (the \`break\` statement that is needed at the end of each case in C, C++, or Java is provided automatically in Go).
2. Go's switch cases need not be constants, and the values involved need not be integers.

### Switch with No Condition
A \`switch\` without a condition is the same as \`switch true\`. This construct is a clean, idiomatic way to write long \`if-then-else\` chains:

\`\`\`go
switch {
case t.Hour() < 12:
    fmt.Println("Good morning!")
case t.Hour() < 17:
    fmt.Println("Good afternoon.")
default:
    fmt.Println("Good evening.")
}
\`\`\`
    `,
    keyTakeaway: 'Go switches break automatically; switch without condition provides clean multi-branch logic.',
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
    id: 'defer-statement',
    moduleId: 'flow-control',
    moduleTitle: '2. Flow Control',
    title: 'Defer & Stacking Defers',
    pageNumber: 6,
    totalInModule: 6,
    content: `
A **\`defer\`** statement defers the execution of a function until the surrounding function returns.

The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns.

### Stacking Defers (LIFO)
Deferred function calls are pushed onto a stack. When a function returns, its deferred calls are executed in **last-in-first-out (LIFO)** order.

Run this program and see how \`counting\` prints first, then \`done\`, and then the numbers \`9\` down to \`0\` in reverse order!

Defer is commonly used to ensure resources like files, network sockets, or mutexes are cleaned up cleanly:
\`\`\`go
f, err := os.Open("file.txt")
if err != nil { return err }
defer f.Close()
\`\`\`
    `,
    keyTakeaway: 'defer defers execution until the surrounding function returns; stacked defers run in LIFO order.',
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

  // ================= MODULE 3: MORE TYPES (STRUCTS, SLICES, MAPS) =================
  {
    id: 'pointers',
    moduleId: 'more-types',
    moduleTitle: '3. More Types',
    title: 'Pointers',
    pageNumber: 1,
    totalInModule: 9,
    content: `
Go has pointers! A pointer holds the memory address of a value.

- The type \`*T\` is a pointer to a \`T\` value. Its zero value is \`nil\`.
- The \`&\` operator generates a pointer to its operand:
  \`\`\`go
  p := &i
  \`\`\`
- The \`*\` operator denotes the pointer's underlying value (dereferencing):
  \`\`\`go
  fmt.Println(*p) // read i through the pointer p
  *p = 21         // set i through the pointer p
  \`\`\`

**Note:** Unlike C, Go has **no pointer arithmetic**. This prevents a huge class of memory corruption bugs.
    `,
    keyTakeaway: 'Pointers use & to obtain address and * to dereference. Go forbids pointer arithmetic.',
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
    moduleTitle: '3. More Types',
    title: 'Structs & Struct Literals',
    pageNumber: 2,
    totalInModule: 9,
    content: `
A \`struct\` is a collection of fields.

Struct fields are accessed using a dot (\`.\`):
\`\`\`go
type Vertex struct {
    X int
    Y int
}

v := Vertex{1, 2}
v.X = 4
\`\`\`

### Struct Literals
A struct literal denotes a newly allocated struct value by listing the values of its fields. You can name a subset of fields using the \`Name:\` syntax (omitted fields are given zero values):
\`\`\`go
v1 = Vertex{1, 2}  // has type Vertex
v2 = Vertex{X: 1}  // Y:0 is implicit
v3 = Vertex{}      // X:0 and Y:0
p  = &Vertex{1, 2} // has type *Vertex
\`\`\`
    `,
    keyTakeaway: 'Structs group typed fields. Fields are accessed with dot notation, even through pointers.',
    defaultCode: `package main

import "fmt"

type Vertex struct {
	X int
	Y int
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
    id: 'arrays-and-slices',
    moduleId: 'more-types',
    moduleTitle: '3. More Types',
    title: 'Arrays & Slices',
    pageNumber: 3,
    totalInModule: 9,
    content: `
The type \`[n]T\` is an array of \`n\` values of type \`T\`. An array's length is part of its type, so arrays cannot be resized.

In contrast, a **slice** is a dynamically-sized, flexible view into the elements of an array. In practice, slices are much more common than arrays!

The type \`[]T\` is a slice with elements of type \`T\`.

A slice is formed by specifying two indices, a low and high bound, separated by a colon:
\`\`\`go
a[low : high]
\`\`\`
This selects a half-open range which includes the first element, but excludes the last one.
    `,
    keyTakeaway: 'Arrays have fixed length [n]T; slices []T are dynamic lightweight views into arrays.',
    defaultCode: `package main

import "fmt"

func main() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4]
	fmt.Println(s)
}
`,
  },
  {
    id: 'slices-are-references',
    moduleId: 'more-types',
    moduleTitle: '3. More Types',
    title: 'Slices are Like References to Arrays',
    pageNumber: 4,
    totalInModule: 9,
    content: `
A slice does not store any data; it just describes a section of an underlying array.

Changing the elements of a slice modifies the corresponding elements of its underlying array.

Other slices that share the same underlying array will see those changes!

Run this example to see how changing \`b[0] = "XXX"\` mutates the underlying names array and is also reflected when printing \`a\`!
    `,
    keyTakeaway: 'Slices point to underlying array buffers; modifying a slice affects all sharing slices.',
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
    moduleTitle: '3. More Types',
    title: 'Slice Length and Capacity',
    pageNumber: 5,
    totalInModule: 9,
    content: `
A slice has both a **length** and a **capacity**.

- The **length** of a slice is the number of elements it contains: \`len(s)\`.
- The **capacity** of a slice is the number of elements in the underlying array, counting from the first element in the slice: \`cap(s)\`.

You can extend a slice's length by re-slicing it, provided it has sufficient capacity.

### Creating Slices with make()
Slices can also be created with the built-in \`make\` function; this is how you create zeroed, dynamically-sized arrays:
\`\`\`go
a := make([]int, 5)  // len(a)=5, cap(a)=5
b := make([]int, 0, 5) // len(b)=0, cap(b)=5
\`\`\`
    `,
    keyTakeaway: 'len(s) is element count; cap(s) is underlying buffer size. make([]T, len, cap) allocates dynamically.',
    defaultCode: `package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s)

	// Slice the slice to give it zero length.
	s = s[:0]
	printSlice(s)

	// Extend its length.
	s = s[:4]
	printSlice(s)

	// Drop its first two values.
	s = s[2:]
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\\n", len(s), cap(s), s)
}
`,
  },
  {
    id: 'append-slice',
    moduleId: 'more-types',
    moduleTitle: '3. More Types',
    title: 'Appending to a Slice',
    pageNumber: 6,
    totalInModule: 9,
    content: `
It is common to append new elements to a slice, and so Go provides a built-in \`append\` function:

\`\`\`go
func append(s []T, vs ...T) []T
\`\`\`

The first parameter \`s\` is a slice of type \`T\`, and the rest are \`T\` values to append to the slice.

The resulting value of \`append\` is a slice containing all the elements of the original slice plus the provided values.

If the backing array of \`s\` is too small to fit all the given values, a bigger array will be allocated automatically!
    `,
    keyTakeaway: 'append(s, val) grows slices dynamically, allocating a new larger array when capacity is reached.',
    defaultCode: `package main

import "fmt"

func main() {
	var s []int
	printSlice(s)

	// append works on nil slices.
	s = append(s, 0)
	printSlice(s)

	// The slice grows as needed.
	s = append(s, 1)
	printSlice(s)

	// We can add more than one element at a time.
	s = append(s, 2, 3, 4)
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\\n", len(s), cap(s), s)
}
`,
  },
  {
    id: 'range-slices',
    moduleId: 'more-types',
    moduleTitle: '3. More Types',
    title: 'Range Loop',
    pageNumber: 7,
    totalInModule: 9,
    content: `
The \`range\` form of the \`for\` loop iterates over a slice or map.

When ranging over a slice, two values are returned for each iteration:
1. The first is the **index** (\`i\`).
2. The second is a **copy of the element** at that index (\`v\`).

\`\`\`go
for i, v := range pow {
    fmt.Printf("2**%d = %d\\n", i, v)
}
\`\`\`

You can skip the index or value by assigning to \`_\`:
\`\`\`go
for _, value := range pow { ... }
for i := range pow { ... }
\`\`\`
    `,
    keyTakeaway: 'for i, v := range slice iterates over index and value. Use _ to ignore unused values.',
    defaultCode: `package main

import "fmt"

var pow = []int{1, 2, 4, 8, 16, 32, 64, 128, 256, 512}

func main() {
	for i, v := range pow {
		fmt.Printf("2**%d = %d\\n", i, v)
	}
}
`,
  },
  {
    id: 'maps-and-mutating',
    moduleId: 'more-types',
    moduleTitle: '3. More Types',
    title: 'Maps & Mutating Maps',
    pageNumber: 8,
    totalInModule: 9,
    content: `
A **map** maps keys to values.

The zero value of a map is \`nil\`. A \`nil\` map has no keys, nor can keys be added. The \`make\` function returns a map of the given type, initialized and ready for use:

\`\`\`go
m := make(map[string]int)
m["Answer"] = 42
\`\`\`

### Testing Key Presence
Test that a key is present with a two-value assignment:
\`\`\`go
elem, ok := m[key]
\`\`\`
If \`key\` is in \`m\`, \`ok\` is \`true\`. If not, \`ok\` is \`false\` and \`elem\` is the zero value for the map's element type.
    `,
    keyTakeaway: 'Maps store key-value associations. Check key existence with elem, ok := m[key].',
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
    moduleTitle: '3. More Types',
    title: 'Exercise: Maps (Word Count)',
    pageNumber: 9,
    totalInModule: 9,
    isExercise: true,
    content: `
### Word Count Function
Implement \`WordCount\`. It should return a map of the counts of each "word" in the string \`s\`.

The \`strings.Fields\` function from the standard library is helpful to split a string into words by whitespace:
\`\`\`go
words := strings.Fields(s)
\`\`\`

Iterate over the words and tally the occurrences in a \`map[string]int\`.
Click **Run** to execute the test suite!
    `,
    keyTakeaway: 'Use make(map[string]int) and range over strings.Fields(s) to tally frequencies.',
    defaultCode: `package main

import (
	"fmt"
	"strings"
)

func WordCount(s string) map[string]int {
	// TODO: Create a map[string]int and count occurrences
	counts := make(map[string]int)
	words := strings.Fields(s)
	for _, w := range words {
		counts[w]++
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

  // ================= MODULE 4: METHODS AND INTERFACES =================
  {
    id: 'methods',
    moduleId: 'methods-interfaces',
    moduleTitle: '4. Methods & Interfaces',
    title: 'Methods & Pointer Receivers',
    pageNumber: 1,
    totalInModule: 4,
    content: `
Go does not have classes. However, you can define **methods on types**.

A method is a function with a special **receiver** argument. The receiver appears in its own argument list between the \`func\` keyword and the method name:

\`\`\`go
func (v Vertex) Abs() float64 {
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
\`\`\`

### Pointer Receivers
You can declare methods with pointer receivers (like \`*Vertex\`).

This means the receiver type has the literal syntax \`*T\` for some type \`T\`.

There are two reasons to use a pointer receiver:
1. So that the method can **modify the value** that its receiver points to.
2. To **avoid copying the value** on each method call (much more efficient for large structs).
    `,
    keyTakeaway: 'Methods are functions with a receiver argument. Pointer receivers allow mutating the receiver state.',
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
    moduleTitle: '4. Methods & Interfaces',
    title: 'Interfaces are Implemented Implicitly',
    pageNumber: 2,
    totalInModule: 4,
    content: `
An **interface type** is defined as a set of method signatures.

A value of interface type can hold any value that implements those methods.

### Implicit Implementation
A type implements an interface by implementing its methods. **There is no explicit declaration of intent, no "implements" keyword.**

Implicit interfaces decouple the definition of an interface from its implementation, which could then appear in any package without prearrangement.

\`\`\`go
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
\`\`\`
    `,
    keyTakeaway: 'Go interfaces are implemented implicitly by satisfying method signatures; no "implements" keyword.',
    defaultCode: `package main

import "fmt"

type I interface {
	M()
}

type T struct {
	S string
}

func (t T) M() {
	fmt.Println(t.S)
}

func main() {
	var i I = T{"hello world"}
	i.M()
}
`,
  },
  {
    id: 'stringers',
    moduleId: 'methods-interfaces',
    moduleTitle: '4. Methods & Interfaces',
    title: 'Stringers (fmt.Stringer)',
    pageNumber: 3,
    totalInModule: 4,
    content: `
One of the most ubiquitous interfaces in Go is **\`Stringer\`** defined by the \`fmt\` package:

\`\`\`go
type Stringer interface {
    String() string
}
\`\`\`

A \`Stringer\` is a type that can describe itself as a string. The \`fmt\` package (and many others) look for this interface to print values.

Whenever you pass any type that implements \`String() string\` to \`fmt.Println\`, \`fmt.Printf("%v")\`, or \`fmt.Sprintf\`, Go calls its \`String()\` method automatically!
    `,
    keyTakeaway: 'Implement String() string to customize how your types are formatted across the fmt package.',
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
    moduleTitle: '4. Methods & Interfaces',
    title: 'Exercise: Stringers (IPAddr)',
    pageNumber: 4,
    totalInModule: 4,
    isExercise: true,
    content: `
### Format IP Addresses
Make the \`IPAddr\` type implement \`fmt.Stringer\` to print the address as a dotted quad.

For instance, \`IPAddr{1, 2, 3, 4}\` should print as \`"1.2.3.4"\`.

Implement the method signature:
\`\`\`go
func (ip IPAddr) String() string
\`\`\`

Click **Run** to verify your solution!
    `,
    keyTakeaway: 'Return fmt.Sprintf("%d.%d.%d.%d", ip[0], ip[1], ip[2], ip[3]) on IPAddr.',
    defaultCode: `package main

import "fmt"

type IPAddr [4]byte

// TODO: Add a "String() string" method to IPAddr.
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
    hint: 'Use fmt.Sprintf("%d.%d.%d.%d", ip[0], ip[1], ip[2], ip[3]) in your String() method.',
  },

  // ================= MODULE 5: CONCURRENCY =================
  {
    id: 'goroutines',
    moduleId: 'concurrency',
    moduleTitle: '5. Concurrency',
    title: 'Goroutines',
    pageNumber: 1,
    totalInModule: 4,
    content: `
A **goroutine** is a lightweight thread managed by the Go runtime.

\`\`\`go
go f(x, y, z)
\`\`\`
starts a new goroutine running \`f(x, y, z)\`.

The evaluation of \`f\`, \`x\`, \`y\`, and \`z\` happens in the current goroutine and the execution of \`f\` happens in the new goroutine.

Goroutines run in the same address space, so access to shared memory must be synchronized. The \`sync\` package provides useful primitives, though you won't need them much in Go because of channels!
    `,
    keyTakeaway: 'The "go" keyword spawns extremely lightweight concurrent threads managed by the Go runtime.',
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
    moduleTitle: '5. Concurrency',
    title: 'Channels & Buffered Channels',
    pageNumber: 2,
    totalInModule: 4,
    content: `
**Channels** are a typed conduit through which you can send and receive values with the channel operator, \`<- \`.

\`\`\`go
ch <- v    // Send v to channel ch.
v := <-ch  // Receive from ch, and assign value to v.
\`\`\`
(The data flows in the direction of the arrow.)

Like maps and slices, channels must be created before use:
\`\`\`go
ch := make(chan int)
\`\`\`

By default, sends and receives block until the other side is ready. This allows goroutines to synchronize without explicit locks or condition variables.

### Buffered Channels
Channels can be buffered:
\`\`\`go
ch := make(chan int, 100)
\`\`\`
Sends to a buffered channel block only when the buffer is full. Receives block when the buffer is empty.
    `,
    keyTakeaway: 'Channels (make(chan T)) synchronize goroutines by sending and receiving data: ch <- v and v := <-ch.',
    defaultCode: `package main

import "fmt"

func sum(s []int, c chan int) {
	total := 0
	for _, v := range s {
		total += v
	}
	c <- total // send total to c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // receive from c

	fmt.Println(x, y, x+y)
}
`,
  },
  {
    id: 'select-statement',
    moduleId: 'concurrency',
    moduleTitle: '5. Concurrency',
    title: 'Select Statement',
    pageNumber: 3,
    totalInModule: 4,
    content: `
The **\`select\`** statement lets a goroutine wait on multiple communication operations.

A \`select\` blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready.

\`\`\`go
select {
case c <- x:
    x, y = y, x+y
case <-quit:
    fmt.Println("quit")
    return
}
\`\`\`

### Default Selection
The \`default\` case in a \`select\` is run if no other case is ready. Use a \`default\` case to try a send or receive without blocking!
    `,
    keyTakeaway: 'select allows waiting on multiple channel operations simultaneously with optional non-blocking default.',
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
    moduleTitle: '5. Concurrency',
    title: 'sync.Mutex (Mutual Exclusion)',
    pageNumber: 4,
    totalInModule: 4,
    content: `
We've seen how channels are great for communication among goroutines.

But what if we don't need communication? What if we just want to make sure only one goroutine can access a variable at a time to avoid conflicts?

This concept is called **mutual exclusion**, and the conventional name for the data structure that provides it is **mutex**.

Go's standard library provides mutual exclusion with \`sync.Mutex\` and its two methods:
- \`Lock\`
- \`Unlock\`

We can define a block of code to be executed in mutual exclusion by surrounding it with a call to \`Lock\` and \`Unlock\`. We can also use \`defer\` to ensure the mutex will be unlocked!
    `,
    keyTakeaway: 'Use sync.Mutex with Lock() and defer Unlock() to safely guard shared memory across goroutines.',
    defaultCode: `package main

import (
	"fmt"
	"sync"
	"time"
)

// SafeCounter is safe to use concurrently.
type SafeCounter struct {
	mu sync.Mutex
	v  map[string]int
}

// Inc increments the counter for the given key.
func (c *SafeCounter) Inc(key string) {
	c.mu.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	c.v[key]++
	c.mu.Unlock()
}

// Value returns the current value of the counter for the given key.
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

  // ================= MODULE 6: GENERICS =================
  {
    id: 'generics-type-parameters',
    moduleId: 'generics',
    moduleTitle: '6. Generics',
    title: 'Type Parameters & Constraints',
    pageNumber: 1,
    totalInModule: 2,
    content: `
Go functions can be written to work on multiple types using **type parameters**.

The type parameters of a function appear before the function's arguments, between brackets \`[T ...]\`:

\`\`\`go
func Index[T comparable](s []T, x T) int
\`\`\`

This declaration means that \`s\` is a slice of any type \`T\` that fulfills the built-in constraint \`comparable\`. \`x\` is also a value of the same type.

\`comparable\` is a useful constraint that makes it possible to use the \`==\` and \`!=\` operators on values of the type.
    `,
    keyTakeaway: 'Type parameters [T comparable] enable writing reusable type-safe generic functions.',
    defaultCode: `package main

import "fmt"

// Index returns the index of x in s, or -1 if not found.
func Index[T comparable](s []T, x T) int {
	for i, v := range s {
		// v and x are type T, which has the comparable
		// constraint, so we can use == here.
		if v == x {
			return i
		}
	}
	return -1
}

func main() {
	// Index works on a slice of ints
	si := []int{10, 20, 15, -10}
	fmt.Println("Index of 20 in si:", Index(si, 20))

	// Index also works on a slice of strings
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

A type can be parameterized with a type parameter, which could be useful for implementing generic data structures like lists, trees, caches, or stacks.

This example demonstrates a simple singly-linked list holding values of any type (\`any\`):

\`\`\`go
type List[T any] struct {
    next *List[T]
    val  T
}
\`\`\`
    `,
    keyTakeaway: 'Generic types like type List[T any] struct allow building type-safe data structures for any type.',
    defaultCode: `package main

import "fmt"

// List represents a singly-linked list that holds
// values of any type.
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
];

export const MODULES: Module[] = [
  {
    id: 'basics',
    title: '1. Basics',
    description: 'Packages, variables, functions, exported names, basic types, zero values, and constants.',
    iconName: 'Package',
    lessons: LESSONS.filter(l => l.moduleId === 'basics'),
  },
  {
    id: 'flow-control',
    title: '2. Flow Control',
    description: 'For loops, if with short statement, switch without condition, defer, and Newton\'s algorithm.',
    iconName: 'GitBranch',
    lessons: LESSONS.filter(l => l.moduleId === 'flow-control'),
  },
  {
    id: 'more-types',
    title: '3. More Types',
    description: 'Pointers, structs, arrays, slice references, len/cap, make, append, range, maps, and closures.',
    iconName: 'Layers',
    lessons: LESSONS.filter(l => l.moduleId === 'more-types'),
  },
  {
    id: 'methods-interfaces',
    title: '4. Methods & Interfaces',
    description: 'Methods with value/pointer receivers, implicit interfaces, fmt.Stringer, and errors.',
    iconName: 'Cpu',
    lessons: LESSONS.filter(l => l.moduleId === 'methods-interfaces'),
  },
  {
    id: 'concurrency',
    title: '5. Concurrency',
    description: 'Goroutines, channels, buffered channels, select statement, and sync.Mutex mutual exclusion.',
    iconName: 'Zap',
    lessons: LESSONS.filter(l => l.moduleId === 'concurrency'),
  },
  {
    id: 'generics',
    title: '6. Generics',
    description: 'Type parameters, comparable constraint, and parameterized generic data structures.',
    iconName: 'Boxes',
    lessons: LESSONS.filter(l => l.moduleId === 'generics'),
  },
];
