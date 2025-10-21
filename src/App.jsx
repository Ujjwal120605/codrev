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

  async function reviewCode() {
    setResponse("")
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I'm sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following:

1️⃣ A quality rating: Better, Good, Normal, or Bad.
2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.
3️⃣ A clear explanation of what the code does, step by step.
4️⃣ A list of any potential bugs or logical errors, if found.
5️⃣ Identification of syntax errors or runtime errors, if present.
6️⃣ Solutions and recommendations on how to fix each identified issue.

Analyze it like a senior developer reviewing a pull request.


Code: ${code}
`,
    });
    setResponse(response.text)
    setLoading(false);
  }

  async function fixCode() {
    if (code === "") {
      alert("Please enter code first");
      return;
    }

    setResponse("");
    setLoading(true);
    
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are an expert software developer. I have code written in ${selectedOption.value} that may contain bugs, errors, or could be improved.

Your task is to:
1. Fix all syntax errors
2. Fix all logical errors and bugs
3. Improve code quality and follow best practices
4. Optimize performance where possible
5. Add proper error handling if missing

**IMPORTANT**: Return ONLY the fixed code without any explanations, markdown formatting, or code blocks. Just the raw, corrected code that can be directly used.

Original Code:
${code}
`,
      });

      const fixedCode = result.text.trim();
      
      // Remove markdown code blocks if present
      let cleanedCode = fixedCode;
      if (cleanedCode.startsWith('```')) {
        cleanedCode = cleanedCode.replace(/```[\w]*\n?/g, '').trim();
      }
      
      setCode(cleanedCode);
      setResponse("✅ Code has been fixed and updated in the editor!");
      setLoading(false);
    } catch (error) {
      setResponse(`❌ Error fixing code: ${error.message}`);
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
          <div className="tabs !mt-5 !px-5 !mb-3 w-full flex items-center gap-[10px]">
            <Select
              value={selectedOption}
              onChange={(e) => { setSelectedOption(e) }}
              options={options}
              styles={getCustomStyles(isDarkTheme)}
            />
            <button 
              onClick={fixCode}
              className="btnNormal min-w-[120px] transition-all"
              style={{
                backgroundColor: isDarkTheme ? '#18181b' : '#f4f4f5',
                color: isDarkTheme ? '#fff' : '#000'
              }}
            >
              Fix Code
            </button>
            <button 
              onClick={() => {
                if (code === "") {
                  alert("Please enter code first")
                }
                else {
                  reviewCode()
                }
              }} 
              className="btnNormal min-w-[120px] transition-all"
              style={{
                backgroundColor: isDarkTheme ? '#18181b' : '#f4f4f5',
                color: isDarkTheme ? '#fff' : '#000'
              }}
            >
              Review
            </button>
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
            className="topTab border-b-[1px] border-t-[1px] flex items-center justif-between h-[60px]"
            style={{
              borderColor: isDarkTheme ? '#27272a' : '#e4e4e7'
            }}
          >
            <p className='font-[700] text-[17px]'>Response</p>
          </div>
          {loading && <RingLoader color='#9333ea'/>}
          <Markdown>{response}</Markdown>
        </div>
      </div>
    </>
  )
}

export default App
