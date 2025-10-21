
#CodRev AI - Real-Time Code Review & Fixer

[![Vercel](https://img.shields.io/badge/Deployed-Vercel-purple)](https://codrev.vercel.app/)

**CodeFixer AI** is a web-based AI-powered code assistant that allows developers to **review, analyze, and automatically fix code** in multiple programming languages. Using Google’s Gemini AI, it provides detailed code feedback, syntax fixes, bug detection, optimization suggestions, and best practice recommendations in real-time.  

---

## Features

- **Multi-language support:** JavaScript, Python, Java, C#, C++, PHP, Ruby, Go, Swift, Kotlin, TypeScript, Rust, Dart, Scala, Perl, Haskell, Elixir, R, MATLAB, Bash.
- **Dark/Light theme toggle** for a comfortable coding experience.
- **AI-powered code review:**  
  - Quality rating of code (Better, Good, Normal, Bad).  
  - Step-by-step explanation of code functionality.  
  - Identification of syntax, runtime, and logical errors.  
  - Suggestions for improvements and optimizations.
- **Automatic code fixing:**  
  - Fixes syntax and logical errors.  
  - Follows best coding practices.  
  - Adds proper error handling where missing.  
  - Returns ready-to-use, optimized code.
- **Live code editor** using **Monaco Editor**.  
- **Responsive UI** with side-by-side code editor and AI response panel.  
- **Markdown-based output** for clean, readable AI feedback.  
- **Loader animation** during AI processing for better UX.

---

## Demo

Check the live demo: [https://codrev.vercel.app](https://codrev.vercel.app)

---

## Screenshots

![CodeFixer AI Screenshot](ss.png)  

*Editor on the left and AI response panel on the right with dark theme enabled.*

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Ujjwal120605/codrev.git
cd codrev
Install dependencies:

bash
Copy code
npm install
Add environment variables:

Create a .env file at the root and add your Gemini AI API key:

env
Copy code
VITE_GEMINI_API_KEY=your_gemini_api_key_here
Start the development server:

bash
Copy code
npm run dev
Open http://localhost:5173 in your browser to see the app.

Usage
Select the programming language from the dropdown.

Enter or paste your code into the editor.

Click Review to get a detailed AI review of your code.

Click Fix Code to automatically correct errors and improve your code.

Toggle between dark and light mode using the navbar.

Tech Stack
Frontend: React, TailwindCSS, React-Select, Monaco Editor

AI Integration: Google Gemini API (@google/genai)

Markdown Rendering: react-markdown

Loading Animations: react-spinners

Deployment: Vercel

Folder Structure
arduino
Copy code
codrev/
├─ public/
├─ src/
│  ├─ components/
│  │  └─ Navbar.jsx
│  ├─ App.jsx
│  └─ App.css
├─ package.json
├─ vite.config.js
└─ .env
Contributing
Contributions are welcome!

Fork the repository

Create a branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m 'Add YourFeature')

Push to the branch (git push origin feature/YourFeature)

Open a Pull Request

License
MIT License © 2025 Ujjwal Bajpai

Future Enhancements
Add history and version tracking of code fixes.

Support collaborative editing with multiple users.

Add AI suggestions for test cases.

Enable download fixed code functionality.

Made with ❤️ using React and Google Gemini AI.

yaml
Copy code

---

If you want, I can also **write an ultra-professional version with badges, GIF demo, and live deployment links**, which will make your GitHub repo **look portfolio-ready** for recruiters.  

Do you want me to do that?
