/**
 * Comprehensive C Programming Curriculum (Exhaustive B.Tech Computer Science Syllabus)
 * Granular Sub-Topics with Detailed Explanations, GCC Compiler Architecture, Separated I/O,
 * Separated Conditionals, Separated Data Types & Formatting, and Complete Pattern Programming.
 */

export const C_NOTES = [
  // ================= MODULE 1: COMPILER PIPELINE & GCC ARCHITECTURE =================
  {
    id: 'gcc-compiler-architecture',
    letter: 'A',
    title: 'GCC Compiler Architecture & Internal 4-Stage Pipeline',
    category: 'GCC & Compiler Pipeline',
    summary: 'Deep dive into the GNU Compiler Collection (GCC), how GCC translates high-level C code into CPU machine instructions, and stage-by-stage command execution.',
    sections: [
      {
        title: 'What is GCC (GNU Compiler Collection)?',
        subTitle: 'The engine behind Unix/Linux C compilation',
        points: [
          'GCC stands for GNU Compiler Collection, created by Richard Stallman for the GNU Project.',
          'It is a modular, highly optimized compiler supporting C, C++, Fortran, Go, and Objective-C across various CPU architectures (x86, ARM, RISC-V).',
          'GCC does not compile code in a single step; it coordinates 4 distinct tools: Preprocessor (cpp), Compiler (cc1), Assembler (as), and Linker (ld).'
        ],
        code: `// To compile and run a C program using GCC in terminal:
// Step 1: Compile source file main.c into executable main.out
// gcc main.c -o main.out
// Step 2: Execute the compiled binary
// ./main.out

#include <stdio.h>

int main() {
    printf("GCC Compiler Engine Initialized Successfully!\\n");
    return 0;
}`,
        expectedOutput: `GCC Compiler Engine Initialized Successfully!`
      },
      {
        title: 'GCC Step-by-Step 4-Stage Internal Compilation Workflow',
        subTitle: 'Tracing files generated at each compilation stage',
        points: [
          'Stage 1: Preprocessing (gcc -E main.c -o main.i) -> Removes comments, expands #include headers, and replaces #define macros.',
          'Stage 2: Compilation (gcc -S main.i -o main.s) -> Translates clean C code into assembly instructions specific to the CPU architecture.',
          'Stage 3: Assembly (gcc -c main.s -o main.o) -> Converts assembly instructions into machine binary Object code (.o / .obj file).',
          'Stage 4: Linking (gcc main.o -o main.out) -> Combines object code with system C runtime libraries (libc.so / msvcrt.dll) to build final runnable binary.'
        ],
        code: `#include <stdio.h>
#define PLATFORM "GCC Linux x86_64"

int main() {
    printf("Stage 1 (Preprocessing): Macro expanded -> %s\\n", PLATFORM);
    printf("Stage 2 (Compilation): C translated to Assembly (.s)\\n");
    printf("Stage 3 (Assembly): Assembly converted to Object code (.o)\\n");
    printf("Stage 4 (Linking): Linked with standard C library to generate executable binary.\\n");
    return 0;
}`,
        expectedOutput: `Stage 1 (Preprocessing): Macro expanded -> GCC Linux x86_64
Stage 2 (Compilation): C translated to Assembly (.s)
Stage 3 (Assembly): Assembly converted to Object code (.o)
Stage 4 (Linking): Linked with standard C library to generate executable binary.`
      },
      {
        title: 'Essential GCC Command Line Flags & Controls',
        subTitle: 'Mastering GCC compilation options for production code',
        points: [
          'gcc main.c -o app -> Names output binary as "app" instead of default a.out.',
          'gcc -Wall -Wextra main.c -> Enables all compiler warning messages to catch subtle bugs early.',
          'gcc -O2 main.c -> Enables Level 2 compiler optimization for faster runtime execution.',
          'gcc -std=c11 main.c -> Enforces the ISO C11 language standard strict rules.',
          'gcc -g main.c -> Generates debug symbols used by GDB (GNU Debugger).',
          'gcc main.c -lm -> Explicitly links math library (libm) when using <math.h>.'
        ],
        code: `#include <stdio.h>
#include <math.h>

int main() {
    double number = 25.0;
    double root = sqrt(number);
    printf("Compiled with GCC -lm flag! Square root of %.1f = %.1f\\n", number, root);
    return 0;
}`,
        expectedOutput: `Compiled with GCC -lm flag! Square root of 25.0 = 5.0`
      }
    ],
    keyTakeaways: [
      'GCC translates C code in 4 stages: Preprocessor (-E) -> Compiler (-S) -> Assembler (-c) -> Linker (-o).',
      'Always use gcc -Wall -Wextra to catch uninitialized variables and type mismatches.',
      'Link math functions with the -lm flag during GCC compilation.'
    ]
  },

  // ================= MODULE 2: PRIMITIVE DATA TYPES & MODIFIERS =================
  {
    id: 'c-primitive-datatypes',
    letter: 'B',
    title: 'Primitive Fundamental Data Types in C',
    category: 'Data Types & Variables',
    summary: 'Detailed study of integer, floating-point, character, and void data types, their memory footprints, and value ranges.',
    sections: [
      {
        title: 'Integer Data Type (int)',
        subTitle: 'Storing whole numerical numbers in binary memory',
        points: [
          'int occupies 4 Bytes (32 bits) on standard 34/64-bit operating systems.',
          'Range: -2,147,483,648 to +2,147,483,647 (signed 2\'s complement representation).',
          'Format Specifier: %d or %i.'
        ],
        code: `#include <stdio.h>

int main() {
    int score = 98;
    int temperature = -15;
    printf("Score: %d | Temperature: %d degrees | Size: %lu Bytes\\n", score, temperature, sizeof(int));
    return 0;
}`,
        expectedOutput: `Score: 98 | Temperature: -15 degrees | Size: 4 Bytes`
      },
      {
        title: 'Floating-Point & Double Data Types (float, double)',
        subTitle: 'Representing decimal numbers and scientific values',
        points: [
          'float: 4 Bytes (32 bits), provides 6-7 decimal digits of precision. Format specifier: %f.',
          'double: 8 Bytes (64 bits), provides 15-17 decimal digits of precision. Format specifier: %lf.',
          'Always append "f" suffix to float literals (e.g. 3.14f), otherwise C treats literals as double by default.'
        ],
        code: `#include <stdio.h>

int main() {
    float floatVal = 3.14159265f;
    double doubleVal = 3.141592653589793;
    printf("float precision  (6 digits)  : %.8f (Size: %lu B)\\n", floatVal, sizeof(float));
    printf("double precision (15 digits) : %.15lf (Size: %lu B)\\n", doubleVal, sizeof(double));
    return 0;
}`,
        expectedOutput: `float precision  (6 digits)  : 3.14159274 (Size: 4 B)
double precision (15 digits) : 3.141592653589793 (Size: 8 B)`
      },
      {
        title: 'Character Data Type (char) & ASCII Encodings',
        subTitle: 'Storing alphanumeric characters as 8-bit ASCII integers',
        points: [
          'char: 1 Byte (8 bits). Stores single character inside single quotes (\'A\').',
          'Internally, C stores characters as ASCII integer numerical values (e.g. \'A\' = 65, \'a\' = 97, \'0\' = 48).',
          'Format specifier: %c for character view, %d for ASCII code view.'
        ],
        code: `#include <stdio.h>

int main() {
    char letter = 'A';
    printf("Character: %c | ASCII Code: %d | Size: %lu Byte\\n", letter, letter, sizeof(char));
    printf("Next ASCII Char: %c (Code %d)\\n", letter + 1, letter + 1);
    return 0;
}`,
        expectedOutput: `Character: A | ASCII Code: 65 | Size: 1 Byte
Next ASCII Char: B (Code 66)`
      }
    ],
    keyTakeaways: [
      'Primitive types: char (1B), int (4B), float (4B), double (8B).',
      'Characters are represented as 8-bit ASCII integers under the hood.',
      'Use sizeof operator to dynamically determine exact byte allocation on any CPU target.'
    ]
  },
  {
    id: 'c-datatype-modifiers',
    letter: 'C',
    title: 'Data Type Modifiers & Type Qualifiers',
    category: 'Data Types & Variables',
    summary: 'Signed vs Unsigned, Short vs Long modifiers, and const / volatile storage qualifiers.',
    sections: [
      {
        title: 'Sign & Size Modifiers (unsigned, short, long)',
        subTitle: 'Altering bit storage capacity and negative sign support',
        points: [
          'unsigned int: 4 Bytes, eliminates negative range to double positive range (0 to 4,294,967,295). Format: %u.',
          'short int: 2 Bytes (16 bits), range: -32,768 to +32,767. Format: %hd.',
          'long long int: 8 Bytes (64 bits), range: -9^18 to +9^18. Format: %lld.'
        ],
        code: `#include <stdio.h>

int main() {
    short sVal = 32000;
    unsigned int uVal = 4000000000U;
    long long llVal = 9223372036854775807LL;
    printf("short (2 Bytes)    : %hd\\n", sVal);
    printf("unsigned (4 Bytes) : %u\\n", uVal);
    printf("long long (8 Bytes): %lld\\n", llVal);
    return 0;
}`,
        expectedOutput: `short (2 Bytes)    : 32000
unsigned (4 Bytes) : 4000000000
long long (8 Bytes): 9223372036854775807`
      },
      {
        title: 'Type Qualifiers (const, volatile)',
        subTitle: 'Enforcing read-only protection and preventing compiler optimization',
        points: [
          'const: Marks variable as read-only. Modifying a const variable triggers a compile-time error.',
          'volatile: Tells GCC compiler that variable value can change unexpectedly (e.g. hardware sensor / interrupt handler), disabling register caching.'
        ],
        code: `#include <stdio.h>

int main() {
    const double PI = 3.14159;
    const int MAX_USERS = 100;
    printf("Constant PI: %.5f | Max Users: %d\\n", PI, MAX_USERS);
    // PI = 3.14; // Un-commenting this line would cause GCC compilation error
    return 0;
}`,
        expectedOutput: `Constant PI: 3.14159 | Max Users: 100`
      }
    ],
    keyTakeaways: [
      'unsigned doubles the positive capacity by removing negative sign bits.',
      'use long long (%lld) for 64-bit integer values exceeding 2 billion.',
      'const guarantees immutability at compile time.'
    ]
  },

  // ================= MODULE 3: SEPARATED INPUT & OUTPUT OPERATIONS =================
  {
    id: 'c-output-operations',
    letter: 'D',
    title: 'Output Operations in C (printf, putchar, puts)',
    category: 'Input & Output',
    summary: 'Comprehensive guide to output streams, printing formatted text with printf(), single char output with putchar(), and strings with puts().',
    sections: [
      {
        title: 'Formatted Output with printf()',
        subTitle: 'Printing structured data to standard output stream (stdout)',
        points: [
          'printf() comes from <stdio.h> header file.',
          'Accepts a format string containing raw text and format placeholders (%d, %s, %f).',
          'Returns the total number of characters successfully printed to stdout stream.'
        ],
        code: `#include <stdio.h>

int main() {
    int count = printf("Hello World!\\n");
    printf("The above printf() call printed %d characters.\\n", count);
    return 0;
}`,
        expectedOutput: `Hello World!
The above printf() call printed 13 characters.`
      },
      {
        title: 'Unformatted Character & String Output (putchar, puts)',
        subTitle: 'Fast lightweight output without formatting overhead',
        points: [
          'putchar(ch): Writes a single character to standard output stream.',
          'puts(str): Writes a null-terminated string to stdout and automatically appends a newline (\\n) character.'
        ],
        code: `#include <stdio.h>

int main() {
    putchar('X');
    putchar('S');
    putchar('A');
    putchar('N');
    putchar('D');
    putchar('B');
    putchar('O');
    putchar('X');
    putchar('\\n');

    puts("Puts automatically appends a new line!");
    return 0;
}`,
        expectedOutput: `XSANDBOX
Puts automatically appends a new line!`
      }
    ],
    keyTakeaways: [
      'printf() handles formatted values and returns total printed character count.',
      'puts() automatically appends a newline \\n after printing the string.',
      'putchar() is the fastest single-character output mechanism.'
    ]
  },
  {
    id: 'c-input-operations',
    letter: 'E',
    title: 'Input Operations in C (scanf, getchar, Standard Input Stream)',
    category: 'Input & Output',
    summary: 'Reading user input from stdin using scanf(), getchar(), handling address-of (&) memory pointers, and buffer clearing.',
    sections: [
      {
        title: 'Formatted Reading with scanf()',
        subTitle: 'Extracting typed data from standard input stream (stdin)',
        points: [
          'scanf() reads formatted input from keyboard/stdin buffer.',
          'Crucial: Arguments must be memory addresses using the address-of operator (&var). For arrays/strings, array name is already a pointer address.',
          'Returns the number of input items successfully matched and assigned.'
        ],
        code: `#include <stdio.h>

int main() {
    int age;
    float gpa;
    printf("Enter age and GPA (e.g. 21 3.8): ");
    // Simulating input reading
    scanf("%d %f", &age, &gpa);
    printf("Read Age: %d | Read GPA: %.2f\\n", age, gpa);
    return 0;
}`,
        expectedOutput: `Enter age and GPA (e.g. 21 3.8): Read Age: 21 | Read GPA: 3.80`
      },
      {
        title: 'Single Character Input (getchar) & Buffer Management',
        subTitle: 'Handling character streams and removing leftover newline buffer',
        points: [
          'getchar(): Reads next available single character from stdin buffer.',
          'When scanf() reads numbers, pressing Enter leaves a newline character (\\n) in stdin buffer. Use getchar() or " %c" space trick to consume leftover whitespace.'
        ],
        code: `#include <stdio.h>

int main() {
    char ch;
    printf("Press a key and hit Enter: ");
    ch = getchar();
    printf("You pressed character: '%c' (ASCII %d)\\n", ch, ch);
    return 0;
}`,
        expectedOutput: `Press a key and hit Enter: You pressed character: 'A' (ASCII 65)`
      }
    ],
    keyTakeaways: [
      'Always pass address-of operator (&) to scanf() for primitive variables.',
      'scanf() returns total assigned arguments count.',
      'Beware of leftover \\n in stdin buffer after numeric scanf calls.'
    ]
  },

  // ================= MODULE 4: SEPARATED FORMATTING & SPECIFIERS =================
  {
    id: 'c-format-specifiers',
    letter: 'F',
    title: 'Format Specifiers & Escape Sequences',
    category: 'Formatting & Controls',
    summary: 'Detailed table of C format specifiers (%d, %f, %c, %s, %p) and essential control escape sequences.',
    sections: [
      {
        title: 'Complete Table of Format Specifiers',
        subTitle: 'Mapping variables to their exact text display representations',
        points: [
          '%d / %i -> Signed 32-bit Integer',
          '%u -> Unsigned 32-bit Integer',
          '%f -> Single-Precision Float',
          '%lf -> Double-Precision Double Float',
          '%c -> Single Character',
          '%s -> Null-Terminated Character Array (String)',
          '%p -> Memory Hexadecimal Pointer Address',
          '%x / %X -> Hexadecimal Integer View'
        ],
        code: `#include <stdio.h>

int main() {
    int num = 255;
    void *ptr = &num;
    printf("Decimal      : %d\\n", num);
    printf("Hexadecimal  : 0x%X\\n", num);
    printf("Pointer Addr : %p\\n", ptr);
    return 0;
}`,
        expectedOutput: `Decimal      : 255
Hexadecimal  : 0xFF
Pointer Addr : 0x7ffd9a4b2c8c`
      },
      {
        title: 'Control Escape Sequences (\n, \t, \\, \")',
        subTitle: 'Embedding special non-printable control actions in text',
        points: [
          '\\n -> Newline (moves cursor to start of next line).',
          '\\t -> Horizontal Tab (inserts 4 or 8 space tab indentation).',
          '\\\\ -> Backslash character literal.',
          '\\\" -> Double quote inside string literal.'
        ],
        code: `#include <stdio.h>

int main() {
    printf("Line 1\\nLine 2\\n");
    printf("Col1\\tCol2\\tCol3\\n");
    printf("Path: C:\\\\ProgramFiles\\\\XSandbox\\n");
    printf("Quote: \\"C Programming is powerful!\\"\\n");
    return 0;
}`,
        expectedOutput: `Line 1
Line 2
Col1	Col2	Col3
Path: C:\ProgramFiles\XSandbox
Quote: "C Programming is powerful!"`
      }
    ],
    keyTakeaways: [
      'Match format specifier precisely with variable type to avoid corrupted output.',
      'Use %p to print memory pointer addresses in hexadecimal format.',
      'Escape quotes and backslashes with backslash prefix (\\", \\\\).'
    ]
  },
  {
    id: 'c-width-precision-formatting',
    letter: 'G',
    title: 'Width, Precision & Alignment Formatting',
    category: 'Formatting & Controls',
    summary: 'Master field width, decimal precision controls (%8.2f), zero padding (%05d), and left/right text alignment.',
    sections: [
      {
        title: 'Decimal Precision Control (%.Nf)',
        subTitle: 'Truncating and rounding floating point decimals',
        points: [
          '%.2f -> Renders float with exactly 2 decimal digits after dot (rounds automatically).',
          '%.0f -> Renders float rounded to nearest integer whole number.'
        ],
        code: `#include <stdio.h>

int main() {
    double price = 149.8974;
    printf("Raw          : %f\\n", price);
    printf("2 Decimals   : $%.2f\\n", price);
    printf("No Decimals  : $%.0f\\n", price);
    return 0;
}`,
        expectedOutput: `Raw          : 149.897400
2 Decimals   : $149.90
No Decimals  : $150`
      },
      {
        title: 'Field Width Alignment & Zero Padding (%ND, %-ND, %0ND)',
        subTitle: 'Formatting neat tables, columns, and padded serial numbers',
        points: [
          '%10d -> Right-aligns number in 10-character wide column.',
          '%-10d -> Left-aligns number in 10-character wide column.',
          '%05d -> Pads leading zeros to guarantee 5 digits width (e.g. 00042).'
        ],
        code: `#include <stdio.h>

int main() {
    int id1 = 7, id2 = 142, id3 = 9850;
    printf("Padded Serial Numbers:\\n");
    printf("ID 1: %05d\\n", id1);
    printf("ID 2: %05d\\n", id2);
    printf("ID 3: %05d\\n", id3);

    printf("\\nFormatted Tabular Layout:\\n");
    printf("%-10s | %8s\\n", "Item", "Price");
    printf("---------------------\\n");
    printf("%-10s | %8.2f\\n", "Apple", 2.50);
    printf("%-10s | %8.2f\\n", "Sandwich", 12.99);
    return 0;
}`,
        expectedOutput: `Padded Serial Numbers:
ID 1: 00007
ID 2: 00142
ID 3: 09850

Formatted Tabular Layout:
Item       |    Price
---------------------
Apple      |     2.50
Sandwich   |    12.99`
      }
    ],
    keyTakeaways: [
      'Use %.2f for currency and precise floating-point decimal rounding.',
      'Use %-10s for left-aligned columns and %10s for right-aligned numerical columns.',
      'Use %05d for leading zero padding in invoice/ID numbers.'
    ]
  },

  // ================= MODULE 5: SEPARATED CONDITIONAL BRANCHING =================
  {
    id: 'c-if-else-conditionals',
    letter: 'H',
    title: 'if, else-if & else Conditional Branching',
    category: 'Conditional Control Flow',
    summary: 'Decision-making execution using relational operators (<, >, ==, !=) and nested if-else ladders.',
    sections: [
      {
        title: 'if / else Logic & Relational Expressions',
        subTitle: 'Evaluating boolean truth values in C (0 = false, non-zero = true)',
        points: [
          'C does not have a native boolean primitive type in standard C89 (0 is False, any Non-Zero value is True).',
          'Relational Operators: == (Equal), != (Not Equal), <, >, <=, >=.',
          'Logical Operators: && (AND), || (OR), ! (NOT).'
        ],
        code: `#include <stdio.h>

int main() {
    int score = 85;

    if (score >= 90) {
        printf("Grade: A+\\n");
    } else if (score >= 80) {
        printf("Grade: A (Passed with Distinction)\\n");
    } else if (score >= 50) {
        printf("Grade: Pass\\n");
    } else {
        printf("Grade: Fail\\n");
    }
    return 0;
}`,
        expectedOutput: `Grade: A (Passed with Distinction)`
      },
      {
        title: 'Ternary Conditional Operator (condition ? val1 : val2)',
        subTitle: 'Compact inline single-line if-else assignment',
        points: [
          'Syntax: result = (condition) ? value_if_true : value_if_false;',
          'Great for quick inline minimum/maximum calculations.'
        ],
        code: `#include <stdio.h>

int main() {
    int a = 45, b = 72;
    int max = (a > b) ? a : b;
    printf("Max between %d and %d is: %d\\n", a, b, max);
    return 0;
}`,
        expectedOutput: `Max between 45 and 72 is: 72`
      }
    ],
    keyTakeaways: [
      'In C conditionals, 0 means False while any Non-Zero integer evaluates to True.',
      'Use && for logical AND (both conditions true) and || for logical OR.',
      'Ternary operator ?: provides clean single-line if-else expressions.'
    ]
  },
  {
    id: 'c-switch-case-conditionals',
    letter: 'I',
    title: 'switch-case Conditional Selection & Jump Tables',
    category: 'Conditional Control Flow',
    summary: 'Multi-way branching using switch, case constants, default fallback, and break statement mechanics.',
    sections: [
      {
        title: 'switch-case Statements & Jump Table Execution',
        subTitle: 'Efficient fixed-value multi-branch dispatching',
        points: [
          'Evaluates an integer or character expression against multiple fixed case constants.',
          'Compiler optimizes switch statements into O(1) jump tables for fast execution.',
          'break: Exits the switch block immediately. Omitting break causes "fall-through" into subsequent cases!'
        ],
        code: `#include <stdio.h>

int main() {
    int option = 2;

    switch (option) {
        case 1:
            printf("Selected Option 1: View Profile\\n");
            break;
        case 2:
            printf("Selected Option 2: Edit Settings\\n");
            break;
        case 3:
            printf("Selected Option 3: Logout\\n");
            break;
        default:
            printf("Invalid Selection! Choose 1-3.\\n");
            break;
    }
    return 0;
}`,
        expectedOutput: `Selected Option 2: Edit Settings`
      },
      {
        title: 'Intentional Fall-Through in switch-case',
        subTitle: 'Grouping multiple case values to execute shared logic',
        points: [
          'By intentionally omitting break statements, multiple matching values can share the same execution block (e.g. testing for vowels).'
        ],
        code: `#include <stdio.h>

int main() {
    char ch = 'e';

    switch (ch) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
            printf("'%c' is a Vowel.\\n", ch);
            break;
        default:
            printf("'%c' is a Consonant or Symbol.\\n", ch);
            break;
    }
    return 0;
}`,
        expectedOutput: `'e' is a Vowel.`
      }
    ],
    keyTakeaways: [
      'switch cases must be integral or character compile-time constants.',
      'Always add break to prevent unintended case fall-through execution.',
      'Use default case to gracefully handle unexpected input values.'
    ]
  },

  // ================= MODULE 6: LOOPING MECHANICS & ENTRY/EXIT CONTROL =================
  {
    id: 'c-entry-controlled-loops',
    letter: 'J',
    title: 'Entry-Controlled Loops (while & for Loops)',
    category: 'Loop Control Mechanics',
    summary: 'Detailed explanation of entry-controlled loops where condition is checked BEFORE entering the loop body.',
    sections: [
      {
        title: 'What is an Entry-Controlled Loop?',
        subTitle: 'Condition tested at top: If initial condition is false, body runs 0 times',
        points: [
          'Entry-Controlled loops test the boolean expression BEFORE executing the loop body.',
          'Examples: while loop and for loop.',
          'Guarantee: If the condition is initially FALSE, the loop body will execute 0 times.'
        ],
        code: `#include <stdio.h>

int main() {
    int i = 1;
    printf("--- Entry-Controlled while loop ---\\n");
    while (i <= 4) {
        printf("Iteration %d\\n", i);
        i++;
    }

    printf("\\n--- Entry-Controlled for loop ---\\n");
    for (int j = 10; j <= 25; j += 5) {
        printf("Val: %d\\n", j);
    }
    return 0;
}`,
        expectedOutput: `--- Entry-Controlled while loop ---
Iteration 1
Iteration 2
Iteration 3
Iteration 4

--- Entry-Controlled for loop ---
Val: 10
Val: 15
Val: 20
Val: 25`
      }
    ],
    keyTakeaways: [
      'while and for loops test condition at entry point.',
      'If initial condition evaluates to false, body executes 0 times.',
      'Ideal when iteration count depends on initial dynamic state.'
    ]
  },
  {
    id: 'c-exit-controlled-loops',
    letter: 'K',
    title: 'Exit-Controlled Loops (do-while Loop)',
    category: 'Loop Control Mechanics',
    summary: 'Detailed explanation of exit-controlled loops where condition is checked AFTER executing the loop body at least once.',
    sections: [
      {
        title: 'What is an Exit-Controlled Loop?',
        subTitle: 'Condition tested at bottom: Guarantees AT LEAST ONE execution',
        points: [
          'Exit-Controlled loops test the boolean condition at the BOTTOM after executing the body.',
          'Example: do-while loop.',
          'Guarantee: The body ALWAYS executes AT LEAST ONCE, even if the condition is false on the very first evaluation.',
          'Syntax note: Must terminate with a semicolon (do { ... } while (cond);).'
        ],
        code: `#include <stdio.h>

int main() {
    int count = 100; // Condition (count < 5) is initially FALSE

    printf("--- Exit-Controlled do-while loop ---\\n");
    do {
        printf("This line executes AT LEAST ONCE! (count = %d)\\n", count);
        count++;
    } while (count < 5);

    return 0;
}`,
        expectedOutput: `--- Exit-Controlled do-while loop ---
This line executes AT LEAST ONCE! (count = 100)`
      }
    ],
    keyTakeaways: [
      'do-while loop tests condition at exit point.',
      'Guarantees at least 1 execution regardless of condition truth value.',
      'Crucial for interactive menu selection prompts where menu must render before reading input.'
    ]
  },

  // ================= MODULE 7: PATTERN PROGRAMMING IN C =================
  {
    id: 'c-pattern-programming',
    letter: 'L',
    title: 'Pattern Programming in C (Star Pyramids, Numbers & Floyd\'s Triangle)',
    category: 'Pattern Programming',
    summary: 'Master nested loops, coordinate grids, star pyramids, diamond patterns, and number triangles.',
    sections: [
      {
        title: 'Right-Angled Star Triangle Pattern',
        subTitle: 'Outer loop manages rows (i), inner loop manages columns (j)',
        points: [
          'Outer loop (i) controls row count from 1 to N.',
          'Inner loop (j) prints stars up to current row count (j <= i).'
        ],
        code: `#include <stdio.h>

int main() {
    int rows = 5;
    printf("Right-Angled Star Triangle:\\n");
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }
    return 0;
}`,
        expectedOutput: `Right-Angled Star Triangle:
* 
* * 
* * * 
* * * * 
* * * * * `
      },
      {
        title: 'Centering Star Pyramid Pattern',
        subTitle: 'Combining leading spaces with odd-count star output (2*i - 1)',
        points: [
          'Space loop: Prints (rows - i) leading spaces for centering alignment.',
          'Star loop: Prints (2 * i - 1) stars per row to construct a symmetric pyramid.'
        ],
        code: `#include <stdio.h>

int main() {
    int rows = 5;
    printf("Symmetric Star Pyramid:\\n");
    for (int i = 1; i <= rows; i++) {
        // Leading space padding
        for (int space = 1; space <= rows - i; space++) {
            printf(" ");
        }
        // Star printing
        for (int j = 1; j <= (2 * i - 1); j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
        expectedOutput: `Symmetric Star Pyramid:
    *
   ***
  *****
 *******
*********`
      },
      {
        title: 'Floyd\'s Triangle Number Pattern',
        subTitle: 'Sequential incrementing integer pattern across rows',
        points: [
          'Floyd\'s Triangle prints consecutive natural numbers starting from 1.'
        ],
        code: `#include <stdio.h>

int main() {
    int rows = 4, num = 1;
    printf("Floyd's Triangle:\\n");
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            printf("%-3d ", num);
            num++;
        }
        printf("\\n");
    }
    return 0;
}`,
        expectedOutput: `Floyd's Triangle:
1   
2   3   
4   5   6   
7   8   9   10  `
      }
    ],
    keyTakeaways: [
      'Outer loop controls row index i; Inner loop controls column elements j.',
      'Space loop (rows - i) centers pyramid patterns.',
      'Floyd\'s triangle uses a running counter variable incremented across iterations.'
    ]
  },

  // ================= MODULE 8: FUNCTIONS & RECURSION =================
  {
    id: 'c-functions-recursion',
    letter: 'M',
    title: 'Functions, Call Stack & Recursion',
    category: 'Functions & Modular Code',
    summary: 'Function prototypes, call-by-value vs call-by-reference, and stack frame recursion.',
    sections: [
      {
        title: 'Function Definition, Declaration & Return Types',
        subTitle: 'Encapsulating reusable modular logic into named subroutines',
        points: [
          'Function Prototype: Declares function signature before main().',
          'Return Type: Data type returned to caller (or void if no value returned).'
        ],
        code: `#include <stdio.h>

// Function Prototype
int calculateSquare(int n);

int main() {
    int val = 8;
    int result = calculateSquare(val);
    printf("Square of %d is: %d\\n", val, result);
    return 0;
}

// Function Definition
int calculateSquare(int n) {
    return n * n;
}`,
        expectedOutput: `Square of 8 is: 64`
      },
      {
        title: 'Call by Value vs Call by Reference (Pointers)',
        subTitle: 'Comparing local variable copies with direct memory modification',
        points: [
          'Call by Value: Passes a COPY of variable. Modifying inside function does NOT affect original variable.',
          'Call by Reference: Passes MEMORY ADDRESS (&var) using pointers (*p). Direct modification alters original variable in caller stack frame.'
        ],
        code: `#include <stdio.h>

void swapByReference(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 50;
    printf("Before Swap: x = %d, y = %d\\n", x, y);
    swapByReference(&x, &y);
    printf("After Swap : x = %d, y = %d\\n", x, y);
    return 0;
}`,
        expectedOutput: `Before Swap: x = 10, y = 50
After Swap : x = %d, y = %d -> x = 50, y = 10`
      },
      {
        title: 'Recursion & The Call Stack (Factorial Example)',
        subTitle: 'Functions calling themselves until reaching a base condition stop',
        points: [
          'Base Case: Mandatory termination condition preventing infinite stack overflow recursion.',
          'Recursive Case: Function calls itself with reduced parameter value.'
        ],
        code: `#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) return 1; // Base case
    return n * factorial(n - 1); // Recursive call
}

int main() {
    int num = 6;
    printf("Factorial of %d = %lld\\n", num, factorial(num));
    return 0;
}`,
        expectedOutput: `Factorial of 6 = 720`
      }
    ],
    keyTakeaways: [
      'Call by reference (&var) allows functions to modify original caller variables.',
      'Every recursive function MUST have a base case to prevent stack overflow crashes.',
      'Each function call creates a new stack frame storing local variables.'
    ]
  },

  // ================= MODULE 9: ARRAYS & STRINGS =================
  {
    id: 'c-arrays-strings',
    letter: 'N',
    title: 'Arrays, Multi-Dimensional Matrices & Strings',
    category: 'Arrays & Strings',
    summary: 'Contiguous memory layout of 1D/2D arrays, matrix arithmetic, and string handling with <string.h>.',
    sections: [
      {
        title: '1D Contiguous Arrays & Indexing',
        subTitle: 'Storing fixed-size elements sequentially in physical RAM',
        points: [
          'Arrays store elements of identical data type in contiguous sequential memory addresses.',
          '0-indexed: First element is arr[0], last element is arr[N-1].'
        ],
        code: `#include <stdio.h>

int main() {
    int scores[5] = {88, 92, 79, 95, 84};
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }
    printf("Average Score: %.2f (Size: %lu Bytes)\\n", (float)sum / 5, sizeof(scores));
    return 0;
}`,
        expectedOutput: `Average Score: 87.60 (Size: 20 Bytes)`
      },
      {
        title: 'Strings & Null Terminator (\\0)',
        subTitle: 'Character arrays terminated by null byte character',
        points: [
          'Strings in C are character arrays ending with null terminator character \'\\0\'.',
          'Library <string.h> functions: strlen() (length), strcpy() (copy), strcmp() (compare).'
        ],
        code: `#include <stdio.h>
#include <string.h>

int main() {
    char greeting[] = "Hello XSandbox";
    printf("String: %s\\n", greeting);
    printf("Length: %lu characters\\n", strlen(greeting));
    printf("Memory Size: %lu Bytes (includes \\\\0)\\n", sizeof(greeting));
    return 0;
}`,
        expectedOutput: `String: Hello XSandbox
Length: 13 characters
Memory Size: 14 Bytes (includes \0)`
      }
    ],
    keyTakeaways: [
      'Array elements are stored contiguously in physical RAM.',
      'C strings MUST end with a null terminator character \\0.',
      'Use strlen() to measure text length without counting the null byte.'
    ]
  },

  // ================= MODULE 10: POINTERS & DYNAMIC MEMORY (DMA) =================
  {
    id: 'c-pointers-dma',
    letter: 'O',
    title: 'Pointers Architecture & Dynamic Memory Allocation (DMA)',
    category: 'Pointers & Memory Architecture',
    summary: 'Direct RAM pointer addresses, dereferencing, heap memory allocation (malloc, calloc, realloc, free), and memory leaks.',
    sections: [
      {
        title: 'Pointer Basics & Dereferencing Operator (*)',
        subTitle: 'Variables storing RAM memory addresses of other variables',
        points: [
          '& (Address-Of Operator): Returns physical RAM memory address of a variable.',
          '* (Dereference Operator): Accesses or modifies the value stored at target memory address.'
        ],
        code: `#include <stdio.h>

int main() {
    int number = 42;
    int *ptr = &number;

    printf("Variable Value   : %d\\n", number);
    printf("RAM Address (&)  : %p\\n", ptr);
    printf("Dereferenced (*) : %d\\n", *ptr);

    // Modifying value via pointer dereference
    *ptr = 99;
    printf("Updated Value    : %d\\n", number);
    return 0;
}`,
        expectedOutput: `Variable Value   : 42
RAM Address (&)  : 0x7ffe921b34ac
Dereferenced (*) : 42
Updated Value    : 99`
      },
      {
        title: 'Heap Allocation (malloc, calloc, realloc, free)',
        subTitle: 'Dynamically allocating RAM at runtime from heap pool',
        points: [
          'malloc(size): Allocates raw uninitialized memory block. Returns void* pointer.',
          'calloc(n, size): Allocates memory block and initializes all bytes to ZERO.',
          'realloc(ptr, newSize): Resizes previously allocated heap block.',
          'free(ptr): Deallocates heap memory back to OS to prevent memory leaks.'
        ],
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 3;
    int *arr = (int *)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Memory Allocation Failed!\\n");
        return 1;
    }

    arr[0] = 10; arr[1] = 20; arr[2] = 30;
    printf("Dynamically Allocated Heap Array: %d, %d, %d\\n", arr[0], arr[1], arr[2]);

    // Deallocate Heap RAM
    free(arr);
    arr = NULL; // Prevent dangling pointer
    printf("Heap Memory Freed Successfully!\\n");
    return 0;
}`,
        expectedOutput: `Dynamically Allocated Heap Array: 10, 20, 30
Heap Memory Freed Successfully!`
      }
    ],
    keyTakeaways: [
      'Pointers hold memory addresses (&var); dereference (*) accesses stored value.',
      'Always call free() on malloc/calloc pointers to prevent memory leaks.',
      'Set freed pointers to NULL to prevent dangerous dangling pointer bugs.'
    ]
  },

  // ================= MODULE 11: STRUCTURES, UNIONS & FILE HANDLING =================
  {
    id: 'c-structures-files',
    letter: 'P',
    title: 'Structures (struct), Unions & File I/O',
    category: 'Structures & File System',
    summary: 'Heterogeneous data structures, struct member operators (., ->), and persistent file stream reading/writing.',
    sections: [
      {
        title: 'Structures (struct) & Member Access',
        subTitle: 'Grouping different data types into a single custom data entity',
        points: [
          'struct bundles related fields of different data types into one entity.',
          'Member access: Use dot operator (.) for direct struct variable, arrow operator (->) for struct pointer.'
        ],
        code: `#include <stdio.h>

struct Student {
    int rollNo;
    char name[30];
    float gpa;
};

int main() {
    struct Student s1 = {101, "Alex Mercer", 3.92f};
    struct Student *ptr = &s1;

    printf("Direct Access (.)  : Roll: %d | Name: %s | GPA: %.2f\\n", s1.rollNo, s1.name, s1.gpa);
    printf("Pointer Access (->): Roll: %d | Name: %s | GPA: %.2f\\n", ptr->rollNo, ptr->name, ptr->gpa);
    return 0;
}`,
        expectedOutput: `Direct Access (.)  : Roll: 101 | Name: Alex Mercer | GPA: 3.92
Pointer Access (->): Roll: 101 | Name: Alex Mercer | GPA: 3.92`
      },
      {
        title: 'File System Operations (fopen, fprintf, fscanf, fclose)',
        subTitle: 'Reading and writing persistent disk files using FILE streams',
        points: [
          'FILE *fp: File stream handle pointer.',
          'fopen("data.txt", "w"): Opens file in write mode ("r" for read, "a" for append).'
        ],
        code: `#include <stdio.h>

int main() {
    FILE *fp = fopen("output.txt", "w");
    if (fp != NULL) {
        fprintf(fp, "XSandbox C Engine File Logging Test\\n");
        fclose(fp);
        printf("Successfully wrote persistent log to output.txt\\n");
    }
    return 0;
}`,
        expectedOutput: `Successfully wrote persistent log to output.txt`
      }
    ],
    keyTakeaways: [
      'Use struct to model complex real-world domain objects.',
      'Use arrow operator (->) when accessing struct members through pointers.',
      'Always close open file pointers with fclose(fp).'
    ]
  }
];
