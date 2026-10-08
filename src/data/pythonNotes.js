/**
 * GeeksforGeeks-Curated Python Programming Learning Curriculum
 * Structured JSON objects for clean visual rendering (No raw markdown ### or **)
 */

export const PYTHON_NOTES = [
  {
    id: 'py-intro',
    letter: 'A',
    title: 'Python Introduction & Setup',
    category: 'Fundamentals',
    summary: 'Learn Python syntax, dynamic typing, indentation rules, and interactive shell behavior.',
    sections: [
      {
        title: 'What is Python?',
        subTitle: 'High-level, interpreted, general-purpose language',
        points: [
          'Python is an interpreted, high-level, dynamically typed language created by Guido van Rossum in 1991.',
          'Readable & Clean: Uses indentation (4 spaces) instead of curly braces {} for block scoping.',
          'Batteries Included: Comes with built-in modules for web development, data science, AI, and system automation.',
          'Dynamic Typing: Variables infer types automatically without explicit type declarations.'
        ],
        code: `# Welcome to Python in XSandbox

def greet(name: str) -> str:
    return f"Hello, {name}! Welcome to Python Sandbox."

if __name__ == "__main__":
    message = greet("Developer")
    print(message)
    print("Python 3.x Environment Ready")`,
        expectedOutput: `Hello, Developer! Welcome to Python Sandbox.
Python 3.x Environment Ready`
      }
    ],
    keyTakeaways: [
      'Python code relies on consistent indentation (4 spaces per block).',
      'f-strings enable easy string interpolation.',
      'Dynamically typed: variables infer types automatically at runtime.'
    ]
  },
  {
    id: 'py-types-vars',
    letter: 'B',
    title: 'Variables & Data Types',
    category: 'Fundamentals',
    summary: 'Explore integers, floats, booleans, strings, and dynamic type casting.',
    sections: [
      {
        title: 'Primitive Types & Type Casting',
        subTitle: 'Core numeric and string data types in Python',
        points: [
          'int: Whole integer numbers (e.g. 42, -500).',
          'float: Real floating-point numbers (e.g. 3.14159).',
          'bool: Boolean truth values (True, False).',
          'str: Textual strings enclosed in single or double quotes.',
          'Type Casting: Functions like int(), float(), str() perform explicit type conversion.'
        ],
        code: `# Variable assignment and dynamic casting
item_name = "XSandbox Node"
quantity = 3
price_per_unit = 29.99
is_active = True

total_cost = quantity * price_per_unit

print("Item:", item_name, "| Type:", type(item_name).__name__)
print("Total Cost: $" + str(round(total_cost, 2)))
print("Status Active:", is_active)

# Explicit Type Conversion
str_num = "42"
int_num = int(str_num)
print("Converted string to int:", int_num + 8)`,
        expectedOutput: `Item: XSandbox Node | Type: str
Total Cost: $89.97
Status Active: True
Converted string to int: 50`
      }
    ],
    keyTakeaways: [
      'Variables do not require type declarations.',
      'Use type(var) to inspect object types at runtime.',
      'Explicit conversion with int(), float(), str() prevents type errors.'
    ]
  },
  {
    id: 'py-data-structures',
    letter: 'C',
    title: 'Lists, Tuples & Dictionaries',
    category: 'Data Structures',
    summary: 'Master built-in collections: mutable lists, immutable tuples, unique sets, and key-value dicts.',
    sections: [
      {
        title: 'Python Collections Overview',
        subTitle: 'Built-in data structures for managing data groups',
        points: [
          'List [ ]: Mutable ordered collection (can add/remove elements).',
          'Tuple ( ): Immutable ordered collection (fixed size once created).',
          'Set { }: Unordered collection of unique elements (no duplicates).',
          'Dictionary {key: value}: Key-value mapping with O(1) average lookup speed.'
        ],
        code: `# Lists (Mutable)
tech_stack = ["React", "Python", "C", "Docker"]
tech_stack.append("Node.js")
print("Tech Stack List:", tech_stack)

# Dictionary (Key-Value map)
user_profile = {
    "username": "alex_coder",
    "engine": "XSandbox Engine",
    "role": "Admin"
}

print("User:", user_profile['username'], "| Engine:", user_profile['engine'])

# List Comprehension
squares = [x**2 for x in range(1, 6)]
print("Squares (1-5):", squares)`,
        expectedOutput: `Tech Stack List: ['React', 'Python', 'C', 'Docker', 'Node.js']
User: alex_coder | Engine: XSandbox Engine
Squares (1-5): [1, 4, 9, 16, 25]`
      }
    ],
    keyTakeaways: [
      'List comprehensions offer concise syntax for list transformations.',
      'Dictionaries offer O(1) fast key-value lookups.',
      'Tuples are immutable and protect data from accidental modification.'
    ]
  },
  {
    id: 'py-control-loops',
    letter: 'D',
    title: 'Conditionals & Loops',
    category: 'Control Flow',
    summary: 'Learn branching conditionals, for/while loops, zip, and enumerate.',
    sections: [
      {
        title: 'Control Flow & Iteration',
        subTitle: 'Branching logic and sequence looping',
        points: [
          'if / elif / else: Conditional branching based on truth evaluation.',
          'for loop: Iterates over sequences (lists, ranges, tuples, dicts).',
          'enumerate(): Yields both element index and value simultaneously.',
          'range(start, stop, step): Generates sequence of numbers.'
        ],
        code: `# Conditionals & Loops
languages = ["C Language", "Python 3", "WebAssembly"]

for index, lang in enumerate(languages, start=1):
    if "Python" in lang:
        status = "Featured Dynamic Language"
    elif "C" in lang:
        status = "Featured Compiled Language"
    else:
        status = "Sandbox Execution Engine"
        
    print(f"[{index}] {lang} -> {status}")`,
        expectedOutput: `[1] C Language -> Featured Compiled Language
[2] Python 3 -> Featured Dynamic Language
[3] WebAssembly -> Sandbox Execution Engine`
      }
    ],
    keyTakeaways: [
      'enumerate() yields both loop index and value simultaneously.',
      'Python supports chained comparison operators (e.g. 10 <= x <= 20).',
      'range() generates lightweight memory-efficient integer sequences.'
    ]
  },
  {
    id: 'py-functions-lambdas',
    letter: 'E',
    title: 'Functions, *args & Lambdas',
    category: 'Functions',
    summary: 'Understand function arguments, default parameters, variable positional args, keyword args, and lambda functions.',
    sections: [
      {
        title: 'Functions & Lambdas',
        subTitle: 'First-class subroutines and anonymous inline functions',
        points: [
          'def Keyword: Defines a reusable function block.',
          '*args: Packs arbitrary positional arguments into a tuple.',
          '**kwargs: Packs arbitrary keyword arguments into a dictionary.',
          'Lambda: One-line anonymous function expression (lambda x: expr).'
        ],
        code: `# Positional and Keyword Arg expansion
def calculate_sandbox_metrics(language, *tests, **options):
    print("Evaluating", language, "Sandbox Specs:")
    print("- Test Cases:", tests)
    print("- Configuration:", options)
    return len(tests)

test_count = calculate_sandbox_metrics(
    "Python", 
    "Unit Test 1", "Memory Audit",
    timeout=5,
    memory_limit="512MB"
)

# Lambda Anonymous Function
double_val = lambda x: x * 2
print("Lambda Result (double 21):", double_val(21))`,
        expectedOutput: `Evaluating Python Sandbox Specs:
- Test Cases: ('Unit Test 1', 'Memory Audit')
- Configuration: {'timeout': 5, 'memory_limit': '512MB'}
Lambda Result (double 21): 42`
      }
    ],
    keyTakeaways: [
      '*args accepts flexible positional argument lists.',
      '**kwargs accepts flexible named keyword arguments.',
      'Lambdas create concise one-liner functions for map/filter operations.'
    ]
  },
  {
    id: 'py-oop',
    letter: 'F',
    title: 'Object-Oriented Programming',
    category: 'Object Oriented',
    summary: 'Master classes, __init__ constructor, instance attributes, methods, inheritance, and encapsulation.',
    sections: [
      {
        title: 'Classes & Inheritance',
        subTitle: 'Encapsulating data attributes and behavior into objects',
        points: [
          'class Keyword: Defines a blue-print for creating object instances.',
          '__init__ Method: Constructor called automatically upon object creation.',
          'self Parameter: Refers to the specific active object instance.',
          'Inheritance: Subclasses inherit attributes and methods from parent classes.'
        ],
        code: `class CodeSandbox:
    def __init__(self, name: str, language: str):
        self.name = name
        self.language = language
        self.code_snippets = []

    def add_snippet(self, title: str, code: str):
        self.code_snippets.append({"title": title, "code": code})
        print("Added snippet", title, "to", self.name)

    def run_all(self):
        print("Executing", len(self.code_snippets), "snippets in", self.language, "Sandbox...")

# Inheritance
class LocalSandbox(CodeSandbox):
    def __init__(self, name: str, language: str, engine_ver: str):
        super().__init__(name, language)
        self.engine_ver = engine_ver

# Instantiate
sandbox = LocalSandbox("XSandbox Core", "Python", "3.10")
sandbox.add_snippet("Fibonacci Generator", "def fib(n): pass")
sandbox.run_all()`,
        expectedOutput: `Added snippet Fibonacci Generator to XSandbox Core
Executing 1 snippets in Python Sandbox...`
      }
    ],
    keyTakeaways: [
      'self binds attributes to individual object instances.',
      'super().__init__() calls parent class initialization method.',
      'Classes modularize complex application states.'
    ]
  }
];
