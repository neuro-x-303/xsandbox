import React from 'react';

/**
 * Advanced Multi-Semantic Code Syntax Highlighter for C & Python
 * Color Palette:
 * - Preprocessors (#include <stdio.h>) -> Cyan (#56b6c2)
 * - Datatypes & Specifiers (int, void, char, float, struct) -> Red/Coral (#e06c75)
 * - Keywords (return, for, while, if, else, switch) -> Purple/Magenta (#c678dd)
 * - Function Names (main, printf, bubbleSort, itoa) -> Gold Yellow (#e5c07b)
 * - Identifiers & Variables (arr, n, i, j, temp) -> Light Blue (#9cdcfe)
 * - Format Specifiers & Escapes (%d, %s, \n, \t) -> Crimson Red (#f85149)
 * - Strings ("Original array: ") -> Soft Emerald (#98c379)
 * - Numbers (64, 34, 25, 0x12) -> Peach Orange (#d19a66)
 * - Operators & Brackets (=, <, >, ;, {, }, [, ]) -> Silver Slate (#abb2bf)
 * - Comments (// ...) -> Muted Olive (#5c6370)
 */
export default function SyntaxHighlighter({ code, language = 'c', customFontColor = null }) {
  if (!code) return null;

  const tokenizeLine = (line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || (language === 'python' && trimmed.startsWith('#'))) {
      return <span style={{ color: '#5c6370', fontStyle: 'italic' }}>{line}</span>;
    }

    const elements = [];
    let idx = 0;

    while (idx < line.length) {
      // 1. Comments
      if (line.startsWith('//', idx) || (line.startsWith('#', idx) && language === 'python')) {
        elements.push(
          <span key={idx} style={{ color: '#5c6370', fontStyle: 'italic' }}>
            {line.substring(idx)}
          </span>
        );
        break;
      }

      // 2. Preprocessor Directives (#include <stdio.h>, #define)
      if (line.startsWith('#', idx) && language === 'c') {
        let prepEnd = line.indexOf('\n', idx);
        if (prepEnd === -1) prepEnd = line.length;
        const prepLine = line.substring(idx, prepEnd);
        
        // Match #include <header.h> or #include "header.h"
        const incMatch = prepLine.match(/^(#include|#define|#ifdef|#ifndef|#endif)\s*(<[^>]+>|"[^"]+"|[a-zA-Z0-9_]+)?(.*)/);
        if (incMatch) {
          elements.push(
            <span key={idx} style={{ color: '#56b6c2', fontWeight: 'bold' }}>
              {incMatch[1]}
            </span>
          );
          if (incMatch[2]) {
            elements.push(
              <span key={`${idx}-hdr`} style={{ color: '#98c379', fontWeight: 'normal' }}>
                {' ' + incMatch[2]}
              </span>
            );
          }
          if (incMatch[3]) {
            elements.push(
              <span key={`${idx}-rest`} style={{ color: '#abb2bf' }}>
                {incMatch[3]}
              </span>
            );
          }
          idx = prepEnd;
          continue;
        }
      }

      // 3. Strings with Format Specifiers (%d, %s, \n, \t)
      if (line[idx] === '"' || line[idx] === "'") {
        const quoteChar = line[idx];
        let endIdx = idx + 1;
        while (endIdx < line.length && line[endIdx] !== quoteChar) {
          if (line[endIdx] === '\\') endIdx += 2;
          else endIdx++;
        }
        if (endIdx < line.length) endIdx++;

        const strContent = line.substring(idx, endIdx);
        
        const strParts = [];
        const strRegex = /(\\[nt0r"'\\]|%(?:d|i|f|\.2f|\.6lf|s|c|p|lld|lu))/g;
        let sIdx = 0;
        let sMatch;

        while ((sMatch = strRegex.exec(strContent)) !== null) {
          if (sMatch.index > sIdx) {
            strParts.push(
              <span key={`s-${sIdx}`} style={{ color: customFontColor || '#98c379' }}>
                {strContent.substring(sIdx, sMatch.index)}
              </span>
            );
          }
          strParts.push(
            <span key={`esc-${sMatch.index}`} style={{ color: '#f85149', fontWeight: 'bold' }}>
              {sMatch[0]}
            </span>
          );
          sIdx = strRegex.lastIndex;
        }

        if (sIdx < strContent.length) {
          strParts.push(
            <span key={`s-${sIdx}`} style={{ color: customFontColor || '#98c379' }}>
              {strContent.substring(sIdx)}
            </span>
          );
        }

        elements.push(<React.Fragment key={idx}>{strParts}</React.Fragment>);
        idx = endIdx;
        continue;
      }

      // 4. Hex and Numbers
      const numMatch = line.substring(idx).match(/^(0x[0-9a-fA-F]+|\b\d+(?:\.\d+)?\b)/);
      if (numMatch) {
        elements.push(
          <span key={idx} style={{ color: customFontColor || '#d19a66', fontWeight: 600 }}>
            {numMatch[0]}
          </span>
        );
        idx += numMatch[0].length;
        continue;
      }

      // 5. Keywords, Datatypes, Functions & Variables
      const idMatch = line.substring(idx).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      if (idMatch) {
        const token = idMatch[0];
        const nextCharIdx = idx + token.length;
        let isFunc = false;

        let p = nextCharIdx;
        while (p < line.length && (line[p] === ' ' || line[p] === '\t')) p++;
        if (p < line.length && line[p] === '(') {
          isFunc = true;
        }

        // Color Logic matching user requirements:
        // A. Datatypes -> Red/Coral (#e06c75)
        if (/^(int|float|double|char|void|long|short|unsigned|signed|size_t|uint8_t|uint32_t|struct|union|enum|typedef|Node|Student)$/.test(token)) {
          elements.push(
            <span key={idx} style={{ color: customFontColor || '#e06c75', fontWeight: 'bold' }}>
              {token}
            </span>
          );
        }
        // B. Control Keywords -> Purple (#c678dd)
        else if (/^(return|if|else|switch|case|default|for|while|do|break|continue|goto|def|class|import|from|as|try|except|finally|raise|with|yield)$/.test(token)) {
          elements.push(
            <span key={idx} style={{ color: customFontColor || '#c678dd', fontWeight: 'bold' }}>
              {token}
            </span>
          );
        }
        // C. Storage Specifiers -> Hot Pink (#ff79c6)
        else if (/^(static|extern|const|volatile|inline|register|auto|asm|__asm__|__volatile__)$/.test(token)) {
          elements.push(
            <span key={idx} style={{ color: customFontColor || '#ff79c6', fontWeight: 'bold' }}>
              {token}
            </span>
          );
        }
        // D. Booleans & Special -> Lavender (#bd93f9)
        else if (/^(True|False|None|NULL|true|false)$/.test(token)) {
          elements.push(
            <span key={idx} style={{ color: customFontColor || '#bd93f9', fontWeight: 'bold' }}>
              {token}
            </span>
          );
        }
        // E. Functions & Sub-functions -> Bright Gold Yellow (#e5c07b)
        else if (isFunc || /^(main|printf|scanf|malloc|calloc|realloc|free|strlen|strcpy|itoa|bubbleSort|get_cpu_vendor|get_cpu_cores|rdtsc|print|range|len|enumerate|zip|sum|round)$/.test(token)) {
          elements.push(
            <span key={idx} style={{ color: customFontColor || '#e5c07b', fontWeight: 'bold' }}>
              {token}
            </span>
          );
        }
        // F. Variables & Parameters -> Light Blue (#9cdcfe)
        else {
          elements.push(
            <span key={idx} style={{ color: customFontColor || '#9cdcfe' }}>
              {token}
            </span>
          );
        }

        idx += token.length;
        continue;
      }

      // 6. Operators & Punctuation -> Silver Slate (#abb2bf)
      const char = line[idx];
      if (/^[=+\-*\/%&|^!<>~;.,:()?{}\[\]]$/.test(char)) {
        elements.push(
          <span key={idx} style={{ color: customFontColor || '#abb2bf', fontWeight: 'bold' }}>
            {char}
          </span>
        );
      } else {
        elements.push(
          <span key={idx} style={{ color: customFontColor || '#abb2bf' }}>
            {char}
          </span>
        );
      }

      idx++;
    }

    return elements;
  };

  const lines = code.split('\n');

  return (
    <div className="font-mono text-xs sm:text-sm leading-6 selection:bg-blue-600 selection:text-white pointer-events-none">
      {lines.map((line, idx) => (
        <div key={idx} className="whitespace-pre h-6">
          {tokenizeLine(line)}
        </div>
      ))}
    </div>
  );
}
