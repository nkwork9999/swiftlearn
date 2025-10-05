// data/content.ts
export interface TopicData {
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  overview: string;
  keyPoints: string[];
  code: string;
}

interface ContentStructure {
  basics: {
    hello: TopicData;
    variables: TopicData;
    types: TopicData;
  };
  functions: {
    basic: TopicData;
    closures: TopicData;
    higher: TopicData;
  };
  structures: {
    arrays: TopicData;
    dictionaries: TopicData;
    structs: TopicData;
  };
  wasm: {
    intro: TopicData;
    interop: TopicData;
    performance: TopicData;
  };
}

export const content: ContentStructure = {
  basics: {
    hello: {
      title: "Hello World",
      description: "Your first program running with SwiftWasm",
      level: "Beginner",
      overview:
        "Using SwiftWasm, execute Swift code directly in the browser. Swift compiled to WebAssembly runs natively.",
      keyPoints: [
        "Swift code executed as WebAssembly",
        "DOM manipulation with JavaScriptKit",
        "Near-native performance",
      ],
      code: `// Swift code executed by SwiftWasm
import Foundation

print("Hello from SwiftWasm! 🚀")

let message = "Swift is running in the browser"
let platform = "WebAssembly"

print("\\(message) via \\(platform)")

// Array operation demo
let numbers = [1, 2, 3, 4, 5]
let doubled = numbers.map { $0 * 2 }
print("Original: \\(numbers)")
print("Doubled: \\(doubled)")`,
    },
    variables: {
      title: "Variables and Constants",
      description: "Swift's type-safe variable system",
      level: "Beginner",
      overview:
        "Variable declarations using Swift's let and var. Type safety is guaranteed even in WebAssembly environment.",
      keyPoints: [
        "let for immutable, var for mutable",
        "Concise syntax with type inference",
        "Type-safe even in WebAssembly",
      ],
      code: `// Declaring variables and constants
let pi = 3.14159  // constant
var score = 0     // variable

score = 100
print("Score: \\(score)")

// Type annotations
let explicit: Double = 70
let text: String = "WebAssembly"

print("Pi: \\(pi)")
print("Platform: \\(text)")

// Type inference verification
let auto = "Swift"  // Inferred as String
print("Type inference: \\(auto)")`,
    },
    types: {
      title: "Type System",
      description: "Powerful type inference and type safety",
      level: "Beginner",
      overview:
        "Swift's static type system works completely in WebAssembly as well.",
      keyPoints: [
        "Safety through static typing",
        "Compile-time type checking",
        "Mapping to WebAssembly types",
      ],
      code: `// Swift's basic types
let integer: Int = 42
let decimal: Double = 3.14
let text: String = "WASM"
let flag: Bool = true

print("Integer: \\(integer)")
print("Double: \\(decimal)")
print("String: \\(text)")
print("Bool: \\(flag)")

// Type conversion
let total = Double(integer) + decimal
print("Total: \\(total)")

// Optionals
var optional: String? = "SwiftWasm"
if let value = optional {
    print("Optional value: \\(value)")
}`,
    },
  },
  functions: {
    basic: {
      title: "Function Basics",
      description: "Swift functions running in WebAssembly",
      level: "Beginner",
      overview:
        "Functions compiled with SwiftWasm are executed as WebAssembly functions.",
      keyPoints: [
        "Compilation to WASM functions",
        "Type safety for arguments and return values",
        "Optimized bytecode",
      ],
      code: `// Defining and calling functions
func greet(name: String) -> String {
    return "Hello, \\(name) from WASM!"
}

func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}

// Function execution
print(greet(name: "Developer"))
print("Sum: \\(add(10, 20))")

// Multiple return values
func calculate(x: Int) -> (double: Int, triple: Int) {
    return (x * 2, x * 3)
}

let result = calculate(x: 5)
print("Double: \\(result.double), Triple: \\(result.triple)")`,
    },
    closures: {
      title: "Closures",
      description: "Closure execution in WebAssembly",
      level: "Intermediate",
      overview:
        "Closures are also compiled to WebAssembly and executed at high speed.",
      keyPoints: [
        "WASM compilation of closures",
        "Optimized capture",
        "Higher-order function support",
      ],
      code: `// Defining closures
let multiply = { (a: Int, b: Int) -> Int in
    return a * b
}

print("Multiply: \\(multiply(3, 4))")

// Array higher-order functions
let numbers = [1, 2, 3, 4, 5]

let squared = numbers.map { $0 * $0 }
print("Squared: \\(squared)")

let evens = numbers.filter { $0 % 2 == 0 }
print("Evens: \\(evens)")

let sum = numbers.reduce(0, +)
print("Sum: \\(sum)")`,
    },
    higher: {
      title: "Higher-Order Functions",
      description: "Functional programming in WASM",
      level: "Intermediate",
      overview:
        "Swift's higher-order functions work efficiently in WebAssembly too.",
      keyPoints: [
        "Optimization of map, filter, reduce",
        "Function composition support",
        "Potential for parallel processing in WASM",
      ],
      code: `// Utilizing higher-order functions
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Chained processing
let result = data
    .filter { $0 % 2 == 0 }
    .map { $0 * 3 }
    .reduce(0, +)

print("Result: \\(result)")

// Custom higher-order function
func apply<T>(_ value: T, _ transform: (T) -> T) -> T {
    return transform(value)
}

let doubled = apply(5) { $0 * 2 }
print("Applied: \\(doubled)")

// Function returning a function
func makeMultiplier(_ factor: Int) -> (Int) -> Int {
    return { $0 * factor }
}

let triple = makeMultiplier(3)
print("Triple of 7: \\(triple(7))")`,
    },
  },
  structures: {
    arrays: {
      title: "Arrays",
      description: "Array operations on WebAssembly memory",
      level: "Beginner",
      overview:
        "Swift arrays are efficiently managed on WebAssembly's linear memory.",
      keyPoints: [
        "Array management in WASM memory",
        "Preserving value type semantics",
        "Efficient memory access",
      ],
      code: `// Array operations
var fruits = ["Apple", "Orange", "Banana"]
fruits.append("Grape")

print("Fruits: \\(fruits)")
print("Count: \\(fruits.count)")

// Index access
if fruits.indices.contains(1) {
    print("Second fruit: \\(fruits[1])")
}

// Array transformation
let numbers = Array(1...5)
let doubled = numbers.map { $0 * 2 }

print("Numbers: \\(numbers)")
print("Doubled: \\(doubled)")

// Slice operations
let slice = fruits[1...2]
print("Slice: \\(Array(slice))")`,
    },
    dictionaries: {
      title: "Dictionaries",
      description: "WASM implementation of hash tables",
      level: "Beginner",
      overview:
        "Swift's Dictionary works as a fast hash table in WebAssembly as well.",
      keyPoints: [
        "Hash computation in WASM",
        "Memory-efficient implementation",
        "Type-safe key-value store",
      ],
      code: `// Dictionary operations
var scores = ["Alice": 95, "Bob": 87, "Charlie": 92]

// Adding and updating values
scores["David"] = 88
scores["Alice"] = 98

print("Scores: \\(scores)")

// Retrieving values
if let aliceScore = scores["Alice"] {
    print("Alice's score: \\(aliceScore)")
}

// Iterating over dictionary
for (name, score) in scores {
    print("\\(name): \\(score)")
}

// Dictionary transformation
let grades = scores.mapValues { score in
    score >= 90 ? "A" : "B"
}
print("Grades: \\(grades)")`,
    },
    structs: {
      title: "Structures",
      description: "WASM memory layout and structures",
      level: "Intermediate",
      overview:
        "Swift structures are optimized for WebAssembly's memory layout.",
      keyPoints: [
        "Efficient memory layout",
        "Value type semantics",
        "Structure performance in WASM",
      ],
      code: `// Defining structures
struct Point {
    var x: Double
    var y: Double
    
    func distance(to other: Point) -> Double {
        let dx = x - other.x
        let dy = y - other.y
        return (dx * dx + dy * dy).squareRoot()
    }
}

// Using structures
let p1 = Point(x: 0, y: 0)
let p2 = Point(x: 3, y: 4)

print("Point 1: (\\(p1.x), \\(p1.y))")
print("Point 2: (\\(p2.x), \\(p2.y))")
print("Distance: \\(p1.distance(to: p2))")

// Mutable structure
struct Counter {
    private var value = 0
    
    mutating func increment() {
        value += 1
    }
    
    var count: Int { value }
}

var counter = Counter()
counter.increment()
counter.increment()
print("Count: \\(counter.count)")`,
    },
  },
  wasm: {
    intro: {
      title: "WASM Overview",
      description: "How SwiftWasm works and its features",
      level: "Intermediate",
      overview:
        "Understand the process of compiling Swift code to WebAssembly binary and how it executes in browsers.",
      keyPoints: [
        "Swift → LLVM IR → WASM",
        "Binary size optimization",
        "Native-speed execution in browsers",
      ],
      code: `// Code demonstrating SwiftWasm features
print("=== SwiftWasm Demo ===")

// Performance measurement simulation
func fibonacci(_ n: Int) -> Int {
    if n <= 1 { return n }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

// Execute with small value (considering browser execution)
let n = 10
let result = fibonacci(n)
print("Fibonacci(\\(n)) = \\(result)")

// Memory usage verification
let largeArray = Array(repeating: 0, count: 1000)
print("Array size: \\(largeArray.count)")

// WebAssembly types
print("Int size: \\(MemoryLayout<Int>.size) bytes")
print("Double size: \\(MemoryLayout<Double>.size) bytes")

print("✅ WASM execution successful!")`,
    },
    interop: {
      title: "JS Interoperability",
      description: "Integration with JavaScriptKit",
      level: "Advanced",
      overview:
        "Learn how to access JavaScript APIs from Swift using JavaScriptKit.",
      keyPoints: [
        "DOM manipulation implementation",
        "Calling JavaScript functions",
        "Bidirectional data exchange",
      ],
      code: `// JavaScriptKit simulation
// In actual code: import JavaScriptKit

// Accessing JS global objects
print("=== JavaScript Interop ===")

// DOM manipulation simulation
func updateDOM(id: String, text: String) {
    print("DOM Update: #\\(id) -> '\\(text)'")
}

updateDOM(id: "title", text: "Hello from Swift!")

// JavaScript function call simulation
func callJSFunction(name: String, args: [Any]) {
    print("JS Call: \\(name)(\\(args))")
}

callJSFunction(name: "alert", args: ["SwiftWasm is running!"])

// Event handler simulation
func onClick(handler: () -> Void) {
    print("Click handler registered")
    handler()
}

onClick {
    print("Button clicked!")
}

print("✅ JS Interop demo complete")`,
    },
    performance: {
      title: "Performance",
      description: "WebAssembly optimization techniques",
      level: "Advanced",
      overview:
        "Learn SwiftWasm's performance characteristics and best practices for optimization.",
      keyPoints: [
        "Binary size reduction",
        "Execution speed optimization",
        "Memory usage management",
      ],
      code: `// Performance optimization demo
print("=== Performance Optimization ===")

// 1. Optimization through inlining
@inline(__always)
func fastAdd(_ a: Int, _ b: Int) -> Int {
    return a + b
}

// 2. Pre-allocating arrays
var optimizedArray = [Int]()
optimizedArray.reserveCapacity(1000)
for i in 0..<1000 {
    optimizedArray.append(i)
}
print("Optimized array created: \\(optimizedArray.count) elements")

// 3. Lazy evaluation
let lazySequence = (1...1000).lazy
    .map { $0 * 2 }
    .filter { $0 % 4 == 0 }

print("Lazy sequence created (not evaluated yet)")

// 4. Memory-efficient processing
func processInChunks<T>(_ data: [T], chunkSize: Int) {
    for chunk in data.chunked(into: chunkSize) {
        print("Processing chunk of \\(chunk.count) items")
    }
}

// Extension for chunking
extension Array {
    func chunked(into size: Int) -> [[Element]] {
        return stride(from: 0, to: count, by: size).map {
            Array(self[$0..<Swift.min($0 + size, count)])
        }
    }
}

let testData = Array(1...10)
processInChunks(testData, chunkSize: 3)

print("✅ Performance optimizations applied")`,
    },
  },
};
