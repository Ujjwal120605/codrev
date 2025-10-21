import React, { useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown'
import RingLoader from "react-spinners/RingLoader";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'rust', label: 'Rust' },
    { value: 'dart', label: 'Dart' },
    { value: 'scala', label: 'Scala' },
    { value: 'perl', label: 'Perl' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'bash', label: 'Bash' }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [analysisMode, setAnalysisMode] = useState('comprehensive'); // comprehensive, security, performance, refactor

  const getCustomStyles = (isDark) => ({
    control: (provided) => ({
      ...provided,
      backgroundColor: isDark ? '#18181b' : '#ffffff',
      borderColor: isDark ? '#3f3f46' : '#d4d4d8',
      color: isDark ? '#fff' : '#000',
      width: "100%"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark ? '#18181b' : '#ffffff',
      color: isDark ? '#fff' : '#000',
      width: "100%"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDark ? '#fff' : '#000',
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused 
        ? (isDark ? '#27272a' : '#f4f4f5') 
        : (isDark ? '#18181b' : '#ffffff'),
      color: isDark ? '#fff' : '#000',
      cursor: 'pointer',
    }),
    input: (provided) => ({
      ...provided,
      color: isDark ? '#fff' : '#000',
      width: "100%"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDark ? '#a1a1aa' : '#71717a',
      width: "100%"
    }),
  });

  const [code, setCode] = useState("");
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [codeHistory, setCodeHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Save code to history before making changes
  const saveToHistory = (currentCode) => {
    const newHistory = [...codeHistory.slice(0, historyIndex + 1), currentCode];
    setCodeHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo functionality
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCode(codeHistory[historyIndex - 1]);
    }
  };

  // Redo functionality
  const redo = () => {
    if (historyIndex < codeHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCode(codeHistory[historyIndex + 1]);
    }
  };

  const getAnalysisPrompt = () => {
    const baseContext = `You are a Senior Software Architect and Security Expert analyzing ${selectedOption.value} code.`;
    
    const prompts = {
      comprehensive: `${baseContext}

Perform a COMPREHENSIVE ENTERPRISE-LEVEL CODE AUDIT:

## 📊 CODE QUALITY METRICS (Score each /10):
- Code Readability: 
- Maintainability:
- Scalability:
- Performance:
- Security:
- **Overall Quality Grade**: A+ to F

## 🔍 DEEP ANALYSIS:

### 1. ARCHITECTURE REVIEW
- Design patterns used (or missing)
- SOLID principles adherence
- Separation of concerns
- Coupling and cohesion analysis

### 2. PERFORMANCE ANALYSIS
- Time complexity (Big O notation)
- Space complexity
- Memory leaks or inefficiencies
- Database query optimization (if applicable)
- Async/await handling

### 3. SECURITY VULNERABILITIES
- Input validation issues
- SQL injection risks
- XSS vulnerabilities
- Authentication/Authorization flaws
- Sensitive data exposure
- OWASP Top 10 compliance

### 4. CODE SMELLS & ANTI-PATTERNS
- Duplicated code
- Long methods/functions
- God objects
- Magic numbers/strings
- Commented-out code

### 5. BEST PRACTICES VIOLATIONS
- Naming conventions
- Error handling
- Logging and monitoring
- Testing considerations
- Documentation quality

### 6. REFACTORING OPPORTUNITIES
- Extract method/class opportunities
- Replace conditionals with polymorphism
- Simplify complex logic

### 7. PRODUCTION READINESS
- Edge case handling
- Error recovery
- Monitoring hooks
- Scalability concerns

**Code to analyze:**
\`\`\`${selectedOption.value}
${code}
\`\`\`

Provide actionable insights a senior developer would give during a critical code review.`,

      security: `${baseContext}

Perform a PENETRATION-TESTING LEVEL SECURITY AUDIT:

## 🛡️ SECURITY THREAT ANALYSIS:

### OWASP Top 10 Assessment:
1. **Injection Vulnerabilities**: SQL, NoSQL, Command Injection
2. **Broken Authentication**: Session management, password policies
3. **Sensitive Data Exposure**: Encryption, secure storage
4. **XML External Entities (XXE)**
5. **Broken Access Control**: Authorization bypass
6. **Security Misconfiguration**
7. **Cross-Site Scripting (XSS)**
8. **Insecure Deserialization**
9. **Using Components with Known Vulnerabilities**
10. **Insufficient Logging & Monitoring**

### Additional Security Checks:
- **Input Sanitization**: Are all inputs validated and sanitized?
- **Output Encoding**: Is data properly encoded before display?
- **CSRF Protection**: Are state-changing operations protected?
- **API Security**: Rate limiting, authentication tokens
- **Secrets Management**: Are API keys, passwords hardcoded?
- **Dependency Vulnerabilities**: Third-party library risks
- **Error Information Disclosure**: Do errors leak sensitive info?

### Threat Modeling:
- Identify attack vectors
- Assess exploitability (Low/Medium/High/Critical)
- Provide CVE-style severity ratings

**Code to audit:**
\`\`\`${selectedOption.value}
${code}
\`\`\`

Provide a security report with CVSS scores and immediate remediation steps.`,

      performance: `${baseContext}

Perform a PERFORMANCE ENGINEERING ANALYSIS:

## ⚡ PERFORMANCE DEEP DIVE:

### 1. COMPUTATIONAL COMPLEXITY
- **Time Complexity**: Big O notation for each operation
- **Space Complexity**: Memory usage analysis
- **Algorithmic Efficiency**: Better algorithms available?

### 2. RESOURCE UTILIZATION
- **CPU Usage**: Intensive computations, blocking operations
- **Memory Footprint**: Object creation, garbage collection
- **I/O Operations**: File/network access efficiency
- **Database Queries**: N+1 problems, missing indexes

### 3. CONCURRENCY & PARALLELISM
- **Thread Safety**: Race conditions, deadlocks
- **Async Operations**: Promise chaining, parallel execution
- **Resource Contention**: Bottlenecks identification

### 4. CACHING OPPORTUNITIES
- **Memoization**: Repeated calculations
- **Data Caching**: Frequently accessed data
- **Lazy Loading**: Deferred initialization

### 5. OPTIMIZATION TECHNIQUES
- **Loop Optimization**: Reduce iterations, vectorization
- **Data Structure Selection**: Arrays vs Sets vs Maps
- **Early Returns**: Avoid unnecessary computation
- **Batch Processing**: Reduce overhead

### 6. BENCHMARKING RECOMMENDATIONS
- Critical path identification
- Expected vs actual performance
- Profiling suggestions

### 7. SCALABILITY ANALYSIS
- Horizontal scaling readiness
- Load handling capacity
- Performance degradation patterns

**Code to optimize:**
\`\`\`${selectedOption.value}
${code}
\`\`\`

Provide optimization recommendations with estimated performance gains.`,

      refactor: `${baseContext}

Perform an EXPERT-LEVEL REFACTORING ANALYSIS:

## 🔧 REFACTORING MASTERCLASS:

### 1. CODE SMELLS DETECTED
Identify all Martin Fowler code smells:
- Bloaters (long methods, large classes)
- Object-Orientation Abusers
- Change Preventers
- Dispensables (dead code, speculative generality)
- Couplers (feature envy, inappropriate intimacy)

### 2. DESIGN PATTERN OPPORTUNITIES
Suggest applicable patterns:
- **Creational**: Factory, Builder, Singleton, Prototype
- **Structural**: Adapter, Decorator, Facade, Proxy
- **Behavioral**: Strategy, Observer, Command, Template Method

### 3. SOLID PRINCIPLES VIOLATIONS
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### 4. CLEAN CODE TRANSFORMATIONS
- **Extract Method**: Break down complex functions
- **Extract Class**: Separate responsibilities
- **Replace Conditional with Polymorphism**
- **Introduce Parameter Object**
- **Replace Magic Numbers with Named Constants**
- **Decompose Conditional Logic**

### 5. NAMING IMPROVEMENTS
- Variable/function naming clarity
- Intention-revealing names
- Avoid mental mapping

### 6. ARCHITECTURAL IMPROVEMENTS
- Layer separation
- Dependency injection opportunities
- Interface abstractions

### 7. TESTABILITY ENHANCEMENTS
- Mock/stub injection points
- Pure function extraction
- Dependency decoupling

**Code to refactor:**
\`\`\`${selectedOption.value}
${code}
\`\`\`

Provide step-by-step refactoring guide with before/after examples for top 5 improvements.`
    };

    return prompts[analysisMode];
  };

  async function analyzeCode() {
    if (code === "") {
      alert("Please enter code first");
      return;
    }

    setResponse("");
    setLoading(true);
    
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: getAnalysisPrompt(),
      });
      
      setResponse(result.text);
      setLoading(false);
    } catch (error) {
      setResponse(`❌ Analysis Error: ${error.message}`);
      setLoading(false);
    }
  }

  async function fixCode() {
    if (code === "") {
      alert("Please enter code first");
      return;
    }

    saveToHistory(code);
    setResponse("");
    setLoading(true);
    
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are an expert ${selectedOption.value} developer. Transform the provided code into PRODUCTION-READY, ENTERPRISE-GRADE code.

## TRANSFORMATION REQUIREMENTS:

1. **Fix ALL Issues**: Bugs, security vulnerabilities, performance problems
2. **Apply Best Practices**: Industry standards, design patterns, SOLID principles
3. **Enhance Error Handling**: Comprehensive try-catch, input validation, edge cases
4. **Optimize Performance**: Better algorithms, efficient data structures
5. **Improve Readability**: Clear naming, proper comments, modular structure
6. **Add Type Safety**: (if applicable for the language)
7. **Security Hardening**: Input sanitization, output encoding, secure defaults

## OUTPUT FORMAT:
Return ONLY the transformed code without explanations, markdown, or code blocks. Just clean, production-ready code.

**Original Code:**
\`\`\`${selectedOption.value}
${code}
\`\`\`

Transform this into code worthy of a senior developer's approval.`,
      });

      let fixedCode = result.text.trim();
      
      // Remove markdown code blocks if present
      if (fixedCode.startsWith('```')) {
        fixedCode = fixedCode.replace(/```[\w]*\n?/g, '').trim();
      }
      
      setCode(fixedCode);
      setResponse("✅ **Code Successfully Transformed!**\n\nYour code has been upgraded to production quality with:\n- Security enhancements\n- Performance optimizations\n- Best practices applied\n- Error handling improved\n\n*Use Undo (Ctrl+Z) to revert if needed.*");
      setLoading(false);
    } catch (error) {
      setResponse(`❌ Transformation Error: ${error.message}`);
      setLoading(false);
    }
  }

  async function explainCode() {
    if (code === "") {
      alert("Please enter code first");
      return;
    }

    setResponse("");
    setLoading(true);
    
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are a Computer Science professor explaining code to students.

Provide a COMPREHENSIVE EDUCATIONAL EXPLANATION of this ${selectedOption.value} code:

## 📚 CODE EXPLANATION:

### 1. HIGH-LEVEL OVERVIEW
What does this code accomplish? (2-3 sentences)

### 2. STEP-BY-STEP BREAKDOWN
Walk through the code line by line or block by block, explaining:
- What each section does
- Why it's written this way
- How it contributes to the overall goal

### 3. KEY CONCEPTS & TECHNIQUES
Explain any:
- Algorithms used
- Data structures employed
- Design patterns applied
- Language-specific features

### 4. DEPENDENCIES & IMPORTS
What external libraries/modules are used and why?

### 5. FLOW DIAGRAMS (if complex)
Describe the execution flow in simple terms

### 6. LEARNING POINTS
What can a developer learn from this code?

### 7. REAL-WORLD ANALOGIES
Use analogies to explain complex parts

**Code to explain:**
\`\`\`${selectedOption.value}
${code}
\`\`\`

Make it understandable for both beginners and experienced developers.`,
      });
      
      setResponse(result.text);
      setLoading(false);
    } catch (error) {
      setResponse(`❌ Explanation Error: ${error.message}`);
      setLoading(false);
    }
  }

  async function generateTests() {
    if (code === "") {
      alert("Please enter code first");
      return;
    }

    setResponse("");
    setLoading(true);
    
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are a Test-Driven Development expert specializing in ${selectedOption.value}.

Generate COMPREHENSIVE TEST CASES for the provided code:

## 🧪 TEST SUITE REQUIREMENTS:

### 1. UNIT TESTS
- Test each function/method independently
- Cover all public APIs
- Use appropriate testing framework for ${selectedOption.value}

### 2. TEST COVERAGE
- **Happy Path**: Normal execution flow
- **Edge Cases**: Boundary conditions, empty inputs, null/undefined
- **Error Cases**: Invalid inputs, exceptions, failures
- **Performance Tests**: Large datasets, stress scenarios

### 3. TEST STRUCTURE
For each test include:
- Descriptive test name
- Setup/Arrange
- Action/Act
- Assertion/Assert
- Teardown (if needed)

### 4. MOCKING & STUBBING
- Mock external dependencies
- Stub API calls, database queries
- Isolate units under test

### 5. INTEGRATION TESTS
- Test component interactions
- End-to-end scenarios

### 6. TEST DATA
- Provide realistic test fixtures
- Include both valid and invalid data

**Code to test:**
\`\`\`${selectedOption.value}
${code}
\`\`\`

Generate production-ready tests with comments explaining what each test validates.`,
      });
      
      setResponse(result.text);
      setLoading(false);
    } catch (error) {
      setResponse(`❌ Test Generation Error: ${error.message}`);
      setLoading(false);
    }
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      <div 
        className="main flex justify-between" 
        style={{ 
          height: "calc(100vh - 90px)", 
          backgroundColor: isDarkTheme ? '#09090b' : '#ffffff' 
        }}
      >
        <div className="left h-[87.5%] w-[50%]">
          <div className="tabs !mt-5 !px-5 !mb-3 w-full flex flex-col gap-[10px]">
            {/* First Row: Language selector and History controls */}
            <div className="flex items-center gap-[10px]">
              <Select
                value={selectedOption}
                onChange={(e) => { setSelectedOption(e) }}
                options={options}
                styles={getCustomStyles(isDarkTheme)}
              />
              <button 
                onClick={undo}
                disabled={historyIndex <= 0}
                className="btnNormal min-w-[80px] transition-all disabled:opacity-50"
                style={{
                  backgroundColor: isDarkTheme ? '#18181b' : '#f4f4f5',
                  color: isDarkTheme ? '#fff' : '#000'
                }}
                title="Undo (Ctrl+Z)"
              >
                ↶ Undo
              </button>
              <button 
                onClick={redo}
                disabled={historyIndex >= codeHistory.length - 1}
                className="btnNormal min-w-[80px] transition-all disabled:opacity-50"
                style={{
                  backgroundColor: isDarkTheme ? '#18181b' : '#f4f4f5',
                  color: isDarkTheme ? '#fff' : '#000'
                }}
                title="Redo (Ctrl+Y)"
              >
                ↷ Redo
              </button>
            </div>

            {/* Second Row: Analysis mode selector */}
            <div className="flex items-center gap-[10px]">
              <span 
                className="text-sm font-semibold whitespace-nowrap"
                style={{ color: isDarkTheme ? '#a1a1aa' : '#71717a' }}
              >
                Analysis Mode:
              </span>
              <select
                value={analysisMode}
                onChange={(e) => setAnalysisMode(e.target.value)}
                className="flex-1 px-3 py-2 rounded border"
                style={{
                  backgroundColor: isDarkTheme ? '#18181b' : '#ffffff',
                  borderColor: isDarkTheme ? '#3f3f46' : '#d4d4d8',
                  color: isDarkTheme ? '#fff' : '#000'
                }}
              >
                <option value="comprehensive">🎯 Comprehensive Review</option>
                <option value="security">🛡️ Security Audit</option>
                <option value="performance">⚡ Performance Analysis</option>
                <option value="refactor">🔧 Refactoring Guide</option>
              </select>
            </div>

            {/* Third Row: Action buttons */}
            <div className="flex items-center gap-[10px] flex-wrap">
              <button 
                onClick={analyzeCode}
                className="btnNormal flex-1 min-w-[100px] transition-all"
                style={{
                  backgroundColor: isDarkTheme ? '#7c3aed' : '#8b5cf6',
                  color: '#fff'
                }}
              >
                🔍 Analyze
              </button>
              <button 
                onClick={fixCode}
                className="btnNormal flex-1 min-w-[100px] transition-all"
                style={{
                  backgroundColor: isDarkTheme ? '#059669' : '#10b981',
                  color: '#fff'
                }}
              >
                🔧 Fix Code
              </button>
              <button 
                onClick={explainCode}
                className="btnNormal flex-1 min-w-[100px] transition-all"
                style={{
                  backgroundColor: isDarkTheme ? '#dc2626' : '#ef4444',
                  color: '#fff'
                }}
              >
                📚 Explain
              </button>
              <button 
                onClick={generateTests}
                className="btnNormal flex-1 min-w-[100px] transition-all"
                style={{
                  backgroundColor: isDarkTheme ? '#ea580c' : '#f97316',
                  color: '#fff'
                }}
              >
                🧪 Tests
              </button>
            </div>
          </div>

          <Editor 
            height="100%" 
            theme={isDarkTheme ? 'vs-dark' : 'light'} 
            language={selectedOption.value} 
            value={code} 
            onChange={(e) => { setCode(e) }} 
          />
        </div>

        <div 
          className="right overflow-scroll !p-[10px] w-[50%] h-[101%]"
          style={{
            backgroundColor: isDarkTheme ? '#18181b' : '#f9fafb',
            color: isDarkTheme ? '#fff' : '#000'
          }}
        >
          <div 
            className="topTab border-b-[1px] border-t-[1px] flex items-center justify-between h-[60px] px-4"
            style={{
              borderColor: isDarkTheme ? '#27272a' : '#e4e4e7'
            }}
          >
            <p className='font-[700] text-[17px]'>
              {loading ? 'Analyzing...' : 'Analysis Results'}
            </p>
            {response && !loading && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(response);
                  alert('Analysis copied to clipboard!');
                }}
                className="text-sm px-3 py-1 rounded"
                style={{
                  backgroundColor: isDarkTheme ? '#27272a' : '#e4e4e7',
                  color: isDarkTheme ? '#fff' : '#000'
                }}
              >
                📋 Copy
              </button>
            )}
          </div>
          {loading && (
            <div className="flex justify-center items-center h-[200px]">
              <RingLoader color='#9333ea' size={60}/>
            </div>
          )}
          <div className="p-4">
            <Markdown>{response || "👈 Paste your code and select an analysis mode to get started!\n\n**Available Modes:**\n- 🎯 **Comprehensive Review**: Full code audit\n- 🛡️ **Security Audit**: OWASP Top 10 analysis\n- ⚡ **Performance Analysis**: Optimization opportunities\n- 🔧 **Refactoring Guide**: Clean code recommendations"}</Markdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
