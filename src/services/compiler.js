
const PISTON_API_URL = 'https://emkc.org/api/v2/piston';

// Map Monaco languages to Piston runtimes (language, version)
const RUNTIME_MAP = {
    javascript: { language: 'javascript', version: '18.15.0' },
    python: { language: 'python', version: '3.10.0' },
    java: { language: 'java', version: '15.0.2' },
    csharp: { language: 'csharp', version: '6.12.0' },
    cpp: { language: 'cpp', version: '10.2.0' },
    php: { language: 'php', version: '8.2.3' },
    ruby: { language: 'ruby', version: '3.0.1' },
    go: { language: 'go', version: '1.16.2' },
    swift: { language: 'swift', version: '5.3.3' },
    kotlin: { language: 'kotlin', version: '1.8.20' },
    typescript: { language: 'typescript', version: '5.0.3' },
    rust: { language: 'rust', version: '1.68.2' },
    dart: { language: 'dart', version: '2.19.6' },
    scala: { language: 'scala', version: '3.2.2' },
    perl: { language: 'perl', version: '5.36.1' }, // Verify availability
    haskell: { language: 'haskell', version: '9.0.1' },
    elixir: { language: 'elixir', version: '1.11.3' },
    bash: { language: 'bash', version: '5.2.0' }
};

export const executeCode = async (language, sourceCode) => {
    const runtime = RUNTIME_MAP[language];

    if (!runtime) {
        return {
            error: `Language '${language}' is not supported for execution yet.`
        };
    }

    try {
        const response = await fetch(`${PISTON_API_URL}/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: runtime.language,
                version: runtime.version,
                files: [
                    {
                        content: sourceCode
                    }
                ]
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Compiler API Error:", error);
        return {
            error: "Failed to connect to the compiler service."
        };
    }
};
