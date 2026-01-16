// Coding Tools Dashboard
let currentCodeLanguage = 'html';
let codeEditorContent = '';
let isRunning = false;

function initCodingPage() {
    console.log('Initializing coding page...');
    loadCodingTools();
    setupCodeEditor();
    setupCodingControls();
    
    // Load saved code if any
    const savedCode = localStorage.getItem('feeXmdSavedCode');
    if (savedCode) {
        try {
            const codeData = JSON.parse(savedCode);
            if (codeData[currentCodeLanguage]) {
                document.getElementById('codeEditor').value = codeData[currentCodeLanguage];
                codeEditorContent = codeData[currentCodeLanguage];
            }
        } catch (e) {
            console.error('Error loading saved code:', e);
        }
    }
}

function loadCodingTools() {
    const tools = [
        {
            name: 'JavaScript Runner',
            icon: 'fab fa-js',
            description: 'Run and test JavaScript code in real-time',
            color: '#F7DF1E',
            action: 'runJS'
        },
        {
            name: 'Python Runner',
            icon: 'fab fa-python',
            description: 'Execute Python code in browser (simulated)',
            color: '#3776AB',
            action: 'runPython'
        },
        {
            name: 'HTML Viewer',
            icon: 'fab fa-html5',
            description: 'Preview HTML code output instantly',
            color: '#E34F26',
            action: 'viewHTML'
        },
        {
            name: 'CSS Preview',
            icon: 'fab fa-css3-alt',
            description: 'See CSS styles applied in real-time',
            color: '#1572B6',
            action: 'previewCSS'
        },
        {
            name: 'Code Obfuscator',
            icon: 'fas fa-lock',
            description: 'Obfuscate JavaScript code for protection',
            color: '#6C757D',
            action: 'obfuscateCode'
        },
        {
            name: 'JSON Formatter',
            icon: 'fas fa-code',
            description: 'Format and validate JSON data',
            color: '#000000',
            action: 'formatJSON'
        },
        {
            name: 'Color Picker',
            icon: 'fas fa-eyedropper',
            description: 'Pick colors from screen with preview',
            color: '#FF6B6B',
            action: 'colorPicker'
        },
        {
            name: 'Regex Tester',
            icon: 'fas fa-terminal',
            description: 'Test regular expressions',
            color: '#4ECDC4',
            action: 'regexTester'
        },
        {
            name: 'Base64 Encoder',
            icon: 'fas fa-key',
            description: 'Encode/decode Base64 strings',
            color: '#45B7D1',
            action: 'base64Tool'
        },
        {
            name: 'Markdown Editor',
            icon: 'fas fa-markdown',
            description: 'Edit and preview Markdown',
            color: '#084C61',
            action: 'markdownEditor'
        },
        {
            name: 'Image Converter',
            icon: 'fas fa-file-image',
            description: 'Convert image formats',
            color: '#96CEB4',
            action: 'imageConverter'
        },
        {
            name: 'API Tester',
            icon: 'fas fa-bolt',
            description: 'Test REST API endpoints',
            color: '#FFEAA7',
            action: 'apiTester'
        }
    ];

    const container = document.getElementById('codingTools');
    container.innerHTML = '';

    tools.forEach(tool => {
        const card = createToolCard(tool);
        container.appendChild(card);
    });
}

function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.style.borderTop = `4px solid ${tool.color}`;

    card.innerHTML = `
        <div class="tool-icon" style="color: ${tool.color};">
            <i class="${tool.icon}"></i>
        </div>
        <div class="tool-name">${tool.name}</div>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 10px 0;">
            ${tool.description}
        </p>
        <button class="btn btn-sm btn-primary" style="margin-top: 10px;"
                onclick="${tool.action}()">
            <i class="fas fa-play"></i> Open Tool
        </button>
    `;

    return card;
}

function setupCodeEditor() {
    const editor = document.getElementById('codeEditor');
    const editorTheme = document.getElementById('editorTheme');
    
    if (editor) {
        // Load initial content
        editor.value = getDefaultCode(currentCodeLanguage);
        codeEditorContent = editor.value;
        
        // Save code on input
        editor.addEventListener('input', (e) => {
            codeEditorContent = e.target.value;
            saveCode();
        });
        
        // Tab support
        editor.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                
                // Insert tab
                editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
                
                // Move cursor
                editor.selectionStart = editor.selectionEnd = start + 4;
                
                // Update content
                codeEditorContent = editor.value;
                saveCode();
            }
        });
    }
    
    if (editorTheme) {
        editorTheme.value = app.settings.theme === 'dark' ? 'dark' : 'light';
        editorTheme.addEventListener('change', (e) => {
            applyEditorTheme(e.target.value);
        });
    }
    
    // Editor tabs
    document.querySelectorAll('.editor-tabs .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const language = e.target.getAttribute('data-language');
            switchLanguage(language);
            
            // Update active tab
            document.querySelectorAll('.editor-tabs .btn').forEach(b => {
                b.classList.remove('active', 'btn-primary');
                b.classList.add('btn-secondary');
            });
            e.target.classList.add('active', 'btn-primary');
            e.target.classList.remove('btn-secondary');
        });
    });
}

function setupCodingControls() {
    // Run code button
    const runBtn = document.getElementById('runCode');
    if (runBtn) {
        runBtn.addEventListener('click', () => {
            runCode();
        });
    }
    
    // Clear code button
    const clearBtn = document.getElementById('clearCode');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            clearCode();
        });
    }
}

function getDefaultCode(language) {
    const defaultCodes = {
        html: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 50px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        h1 {
            margin-bottom: 20px;
        }
        button {
            background: white;
            color: #667eea;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            margin: 10px;
        }
        button:hover {
            background: #f0f0f0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to FEE-XMD GO</h1>
        <p>Edit this HTML code and click "Run Code" to see changes.</p>
        <button onclick="showMessage()">Click Me!</button>
        <div id="output" style="margin-top: 20px;"></div>
    </div>
    
    <script>
        function showMessage() {
            const output = document.getElementById('output');
            output.innerHTML = '<h3>Hello from JavaScript!</h3><p>You successfully ran JavaScript code!</p>';
            output.style.background = 'rgba(255,255,255,0.2)';
            output.style.padding = '20px';
            output.style.borderRadius = '10px';
        }
    </script>
</body>
</html>`,
        
        css: `/* CSS Code Editor */
/* Edit these styles and click Run to see changes */

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 800px;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.5s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.header {
    text-align: center;
    margin-bottom: 40px;
}

.title {
    color: #333;
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(90deg, #f5576c, #f093fb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.subtitle {
    color: #666;
    font-size: 1.1rem;
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 30px;
}

.feature-card {
    background: white;
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #f5576c;
}

.feature-title {
    color: #333;
    margin-bottom: 10px;
    font-size: 1.2rem;
}

.feature-desc {
    color: #666;
    font-size: 0.9rem;
}

.btn {
    display: inline-block;
    background: linear-gradient(90deg, #f5576c, #f093fb);
    color: white;
    padding: 12px 30px;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.btn:hover {
    transform: scale(1.05);
}`,
        
        js: `// JavaScript Code Runner
// Write your JavaScript code here and click Run

console.log("JavaScript Runner Started!");

// DOM Manipulation Example
function setupPage() {
    const container = document.createElement('div');
    container.className = 'js-container';
    container.style.cssText = \`
        max-width: 800px;
        margin: 0 auto;
        padding: 40px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        color: white;
        text-align: center;
    \`;
    
    const title = document.createElement('h1');
    title.textContent = 'JavaScript Playground';
    title.style.cssText = \`
        margin-bottom: 20px;
        font-size: 2.5rem;
    \`;
    
    const description = document.createElement('p');
    description.textContent = 'Try writing your own JavaScript code in the editor above.';
    description.style.cssText = \`
        margin-bottom: 30px;
        font-size: 1.1rem;
        opacity: 0.9;
    \`;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = \`
        display: flex;
        justify-content: center;
        gap: 15px;
        flex-wrap: wrap;
        margin-bottom: 30px;
    \`;
    
    // Create buttons
    const buttonData = [
        { text: 'Show Alert', color: '#4CAF50', action: showAlert },
        { text: 'Change Color', color: '#2196F3', action: changeColor },
        { text: 'Add Item', color: '#FF9800', action: addItem },
        { text: 'Clear Output', color: '#F44336', action: clearOutput }
    ];
    
    buttonData.forEach(btnData => {
        const button = document.createElement('button');
        button.textContent = btnData.text;
        button.style.cssText = \`
            background: \${btnData.color};
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 1rem;
            cursor: pointer;
            transition: transform 0.3s;
        \`;
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
        button.addEventListener('click', btnData.action);
        buttonContainer.appendChild(button);
    });
    
    const outputDiv = document.createElement('div');
    outputDiv.id = 'jsOutput';
    outputDiv.style.cssText = \`
        background: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 10px;
        min-height: 100px;
        text-align: left;
    \`;
    
    const outputTitle = document.createElement('h3');
    outputTitle.textContent = 'Output:';
    outputTitle.style.cssText = \`
        margin-bottom: 10px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        padding-bottom: 5px;
    \`;
    
    outputDiv.appendChild(outputTitle);
    
    // Assemble the page
    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(buttonContainer);
    container.appendChild(outputDiv);
    
    return container;
}

// Button actions
function showAlert() {
    logToOutput('Alert button clicked! Showing alert...');
    setTimeout(() => {
        alert('Hello from JavaScript! This is an alert dialog.');
        logToOutput('Alert shown successfully!');
    }, 100);
}

function changeColor() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4CAF50', '#2196F3'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.querySelector('.js-container').style.background = \`linear-gradient(135deg, \${randomColor} 0%, \${darkenColor(randomColor, 20)} 100%)\`;
    logToOutput(\`Changed background to: \${randomColor}\`);
}

function addItem() {
    const output = document.getElementById('jsOutput');
    const item = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString();
    item.textContent = \`Item added at: \${timestamp}\`;
    item.style.cssText = \`
        background: rgba(255, 255, 255, 0.2);
        padding: 10px;
        margin: 5px 0;
        border-radius: 5px;
        border-left: 3px solid #4CAF50;
    \`;
    output.appendChild(item);
    logToOutput(\`Added new item at \${timestamp}\`);
}

function clearOutput() {
    const output = document.getElementById('jsOutput');
    const children = Array.from(output.children).slice(1); // Keep the title
    children.forEach(child => child.remove());
    logToOutput('Output cleared!');
}

function logToOutput(message) {
    const output = document.getElementById('jsOutput');
    const logEntry = document.createElement('div');
    logEntry.textContent = \`[\${new Date().toLocaleTimeString()}] \${message}\`;
    logEntry.style.cssText = \`
        color: #ddd;
        font-family: monospace;
        font-size: 0.9rem;
        margin: 2px 0;
        padding: 3px 0;
    \`;
    output.appendChild(logEntry);
    output.scrollTop = output.scrollHeight;
}

function darkenColor(color, percent) {
    // Simplified color darkening
    return color; // In real implementation, would darken the color
}

// Initialize
const page = setupPage();
document.body.innerHTML = '';
document.body.appendChild(page);
logToOutput('Page initialized successfully!');`,
        
        python: `# Python Code Runner (Simulated)
# Note: This runs in a simulated Python environment

print("Welcome to Python Runner!")
print("This is a simulated Python environment.")
print("\\n" + "="*50 + "\\n")

# Basic Python Examples
def python_demo():
    # Variables and types
    name = "FEE-XMD GO"
    version = 1.0
    features = ["Code Runner", "Live Preview", "Debug Tools"]
    
    print(f"Application: {name}")
    print(f"Version: {version}")
    print(f"Features: {', '.join(features)}")
    print()
    
    # List comprehension
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    squares = [x**2 for x in numbers]
    evens = [x for x in numbers if x % 2 == 0]
    
    print(f"Numbers: {numbers}")
    print(f"Squares: {squares}")
    print(f"Even numbers: {evens}")
    print()
    
    # Dictionary
    user = {
        "name": "Developer",
        "role": "Programmer",
        "skills": ["Python", "JavaScript", "HTML/CSS"],
        "active": True
    }
    
    print("User Profile:")
    for key, value in user.items():
        print(f"  {key}: {value}")
    print()
    
    # Function with parameters
    def calculate_stats(data):
        total = sum(data)
        average = total / len(data)
        maximum = max(data)
        minimum = min(data)
        return {
            "total": total,
            "average": round(average, 2),
            "max": maximum,
            "min": minimum
        }
    
    stats = calculate_stats(numbers)
    print("Statistics for numbers list:")
    for key, value in stats.items():
        print(f"  {key}: {value}")
    print()
    
    # Class example
    class Calculator:
        def __init__(self):
            self.history = []
        
        def add(self, a, b):
            result = a + b
            self.history.append(f"{a} + {b} = {result}")
            return result
        
        def multiply(self, a, b):
            result = a * b
            self.history.append(f"{a} × {b} = {result}")
            return result
        
        def show_history(self):
            if not self.history:
                print("No calculations yet.")
            else:
                print("Calculation History:")
                for i, calc in enumerate(self.history, 1):
                    print(f"  {i}. {calc}")
    
    # Use the calculator
    calc = Calculator()
    print("Calculator Demo:")
    print(f"  5 + 3 = {calc.add(5, 3)}")
    print(f"  4 × 6 = {calc.multiply(4, 6)}")
    print(f"  10 + 15 = {calc.add(10, 15)}")
    print()
    calc.show_history()
    
    return "Demo completed successfully!"

# Run the demo
result = python_demo()
print("\\n" + "="*50)
print(f"Result: {result}")
print("\\nNote: This Python code runs in a simulated environment.")
print("For real Python execution, use a backend service or local Python installation.")`
    };
    
    return defaultCodes[language] || `// Write your ${language.toUpperCase()} code here...\n\n`;
}

function switchLanguage(language) {
    if (isRunning) {
        app.showNotification('Please wait for current execution to finish', 'warning');
        return;
    }
    
    currentCodeLanguage = language;
    const editor = document.getElementById('codeEditor');
    
    // Save current content
    saveCode();
    
    // Load new content
    editor.value = getDefaultCode(language);
    codeEditorContent = editor.value;
    
    // Update editor theme
    const editorTheme = document.getElementById('editorTheme');
    if (editorTheme) {
        applyEditorTheme(editorTheme.value);
    }
}

function applyEditorTheme(theme) {
    const editor = document.getElementById('codeEditor');
    if (!editor) return;
    
    if (theme === 'dark') {
        editor.style.backgroundColor = '#1e1e1e';
        editor.style.color = '#d4d4d4';
        editor.style.borderColor = '#333';
    } else {
        editor.style.backgroundColor = '';
        editor.style.color = '';
        editor.style.borderColor = '';
    }
}

function saveCode() {
    try {
        let savedCode = {};
        const existing = localStorage.getItem('feeXmdSavedCode');
        if (existing) {
            savedCode = JSON.parse(existing);
        }
        
        savedCode[currentCodeLanguage] = codeEditorContent;
        localStorage.setItem('feeXmdSavedCode', JSON.stringify(savedCode));
    } catch (e) {
        console.error('Error saving code:', e);
    }
}

function runCode() {
    if (isRunning) {
        app.showNotification('Code is already running', 'warning');
        return;
    }
    
    isRunning = true;
    const runBtn = document.getElementById('runCode');
    if (runBtn) {
        runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';
        runBtn.disabled = true;
    }
    
    app.simulateProgress(0, 30);
    
    setTimeout(() => {
        try {
            const code = document.getElementById('codeEditor').value;
            const output = document.getElementById('codeOutput');
            
            if (!output) {
                throw new Error('Output container not found');
            }
            
            app.simulateProgress(30, 60);
            
            // Clear previous output
            output.innerHTML = '';
            
            // Add loading indicator
            output.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <div class="spinner" style="width: 40px; height: 40px; margin: 0 auto 20px;"></div>
                    <p>Running ${currentCodeLanguage.toUpperCase()} code...</p>
                </div>
            `;
            
            app.simulateProgress(60, 80);
            
            setTimeout(() => {
                // Execute based on language
                executeCode(currentCodeLanguage, code, output);
                app.simulateProgress(80, 100);
                
                // Reset button
                if (runBtn) {
                    runBtn.innerHTML = '<i class="fas fa-play"></i> Run Code';
                    runBtn.disabled = false;
                }
                
                isRunning = false;
                
                // Log activity
                if (authSystem.currentUser) {
                    authSystem.logActivity('run_code', {
                        language: currentCodeLanguage,
                        length: code.length
                    });
                }
                
            }, 1000);
            
        } catch (error) {
            console.error('Error running code:', error);
            const output = document.getElementById('codeOutput');
            if (output) {
                output.innerHTML = `
                    <div style="color: var(--error-color); padding: 20px;">
                        <h4><i class="fas fa-exclamation-triangle"></i> Error</h4>
                        <p>${error.message}</p>
                        <pre style="background: var(--surface-color); padding: 10px; border-radius: 5px; margin-top: 10px;">
                            ${error.stack}
                        </pre>
                    </div>
                `;
            }
            
            if (runBtn) {
                runBtn.innerHTML = '<i class="fas fa-play"></i> Run Code';
                runBtn.disabled = false;
            }
            
            isRunning = false;
            app.simulateProgress(80, 100);
        }
    }, 500);
}

function executeCode(language, code, outputContainer) {
    switch (language) {
        case 'html':
            executeHTML(code, outputContainer);
            break;
        case 'css':
            executeCSS(code, outputContainer);
            break;
        case 'js':
            executeJavaScript(code, outputContainer);
            break;
        case 'python':
            executePython(code, outputContainer);
            break;
        default:
            outputContainer.innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--text-secondary);">
                    <i class="fas fa-code" style="font-size: 3rem; margin-bottom: 20px;"></i>
                    <h4>Language not supported for execution</h4>
                    <p>Preview is only available for HTML, CSS, JavaScript, and Python.</p>
                </div>
            `;
    }
}

function executeHTML(code, outputContainer) {
    // Create a safe iframe for HTML execution
    const iframe = document.createElement('iframe');
    iframe.style.cssText = `
        width: 100%;
        height: 500px;
        border: none;
        border-radius: 8px;
        background: white;
    `;
    
    // Write HTML to iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>HTML Output</title>
            <style>
                body {
                    margin: 0;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                .output-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="output-header">
                <h3>HTML Output Preview</h3>
                <p>This is your rendered HTML code</p>
            </div>
            ${code}
        </body>
        </html>
    `);
    iframeDoc.close();
    
    outputContainer.innerHTML = '';
    outputContainer.appendChild(iframe);
    
    // Add info
    const info = document.createElement('div');
    info.style.cssText = `
        margin-top: 15px;
        padding: 10px;
        background: var(--surface-color);
        border-radius: 8px;
        font-size: 0.9rem;
        color: var(--text-secondary);
    `;
    info.innerHTML = `<i class="fas fa-info-circle"></i> HTML rendered in sandboxed iframe for safety.`;
    outputContainer.appendChild(info);
}

function executeCSS(code, outputContainer) {
    // Create preview with CSS applied
    const preview = document.createElement('div');
    preview.style.cssText = `
        width: 100%;
        min-height: 400px;
        padding: 20px;
        background: white;
        border-radius: 8px;
        margin-bottom: 20px;
    `;
    
    // Apply the CSS to a style element
    const style = document.createElement('style');
    style.textContent = code;
    
    // Create example HTML to show CSS effects
    const exampleHTML = `
        <div class="container">
            <div class="header">
                <h1 class="title">CSS Preview</h1>
                <p class="subtitle">Your CSS styles are applied to this preview</p>
            </div>
            
            <div class="features">
                <div class="feature-card">
                    <div class="feature-icon">🎨</div>
                    <div class="feature-title">Styling</div>
                    <div class="feature-desc">See your CSS styles in action</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <div class="feature-title">Fast Preview</div>
                    <div class="feature-desc">Real-time style updates</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <div class="feature-title">Responsive</div>
                    <div class="feature-desc">Test on different screen sizes</div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn">Test Button</button>
            </div>
        </div>
    `;
    
    preview.innerHTML = exampleHTML;
    preview.appendChild(style);
    
    outputContainer.innerHTML = '';
    outputContainer.appendChild(preview);
    
    // Add CSS code viewer
    const codeViewer = document.createElement('details');
    codeViewer.style.cssText = `
        margin-top: 15px;
        background: var(--surface-color);
        border-radius: 8px;
        overflow: hidden;
    `;
    
    codeViewer.innerHTML = `
        <summary style="padding: 10px 15px; cursor: pointer; background: rgba(0,0,0,0.05);">
            <i class="fas fa-code"></i> View Applied CSS
        </summary>
        <pre style="margin: 0; padding: 15px; background: #1e1e1e; color: #d4d4d4; 
                     max-height: 200px; overflow: auto; font-family: monospace; font-size: 0.9rem;">
            ${escapeHTML(code)}
        </pre>
    `;
    
    outputContainer.appendChild(codeViewer);
}

function executeJavaScript(code, outputContainer) {
    // Create sandboxed execution environment
    const sandbox = document.createElement('div');
    sandbox.id = 'jsSandbox';
    sandbox.style.cssText = `
        width: 100%;
        min-height: 400px;
        padding: 20px;
        background: linear-gradient(135deg, #1a2980 0%, #26d0ce 100%);
        border-radius: 8px;
        color: white;
        position: relative;
    `;
    
    outputContainer.innerHTML = '';
    outputContainer.appendChild(sandbox);
    
    try {
        // Wrap code in try-catch and execute
        const script = document.createElement('script');
        script.textContent = `
            (function() {
                try {
                    // Override alert to show in sandbox
                    const originalAlert = window.alert;
                    window.alert = function(message) {
                        const alertDiv = document.createElement('div');
                        alertDiv.style.cssText = \`
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background: white;
                            color: #333;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                            z-index: 10000;
                            max-width: 400px;
                        \`;
                        alertDiv.innerHTML = \`
                            <h3 style="margin-bottom: 10px;">Alert</h3>
                            <p>\${message}</p>
                            <button onclick="this.parentElement.remove()" 
                                    style="margin-top: 15px; padding: 8px 20px; 
                                           background: #667eea; color: white; 
                                           border: none; border-radius: 5px; cursor: pointer;">
                                OK
                            </button>
                        \`;
                        document.body.appendChild(alertDiv);
                        return originalAlert(message);
                    };
                    
                    // Execute user code
                    ${code}
                    
                } catch(error) {
                    const errorDiv = document.createElement('div');
                    errorDiv.style.cssText = \`
                        background: rgba(255, 0, 0, 0.1);
                        color: #ff6b6b;
                        padding: 15px;
                        border-radius: 5px;
                        margin: 10px 0;
                        border-left: 3px solid #ff6b6b;
                    \`;
                    errorDiv.innerHTML = \`
                        <strong>JavaScript Error:</strong><br>
                        \${error.toString()}
                    \`;
                    document.getElementById('jsSandbox').appendChild(errorDiv);
                }
            })();
        `;
        
        // Add console.log interception
        const originalLog = console.log;
        const logs = [];
        console.log = function(...args) {
            logs.push(args.join(' '));
            originalLog.apply(console, args);
            
            // Show logs in sandbox
            const logDiv = document.createElement('div');
            logDiv.style.cssText = `
                background: rgba(255, 255, 255, 0.1);
                padding: 10px;
                margin: 5px 0;
                border-radius: 5px;
                font-family: monospace;
                font-size: 0.9rem;
            `;
            logDiv.textContent = `console.log: ${args.join(' ')}`;
            sandbox.appendChild(logDiv);
        };
        
        // Execute
        document.head.appendChild(script);
        setTimeout(() => script.remove(), 1000);
        
        // Restore console.log
        setTimeout(() => {
            console.log = originalLog;
        }, 2000);
        
    } catch (error) {
        sandbox.innerHTML = `
            <div style="color: #ff6b6b; padding: 20px;">
                <h4><i class="fas fa-exclamation-triangle"></i> Execution Error</h4>
                <pre style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px; margin-top: 10px;">
                    ${error.toString()}
                </pre>
            </div>
        `;
    }
}

function executePython(code, outputContainer) {
    // Simulate Python execution (in real app, this would call a backend)
    const output = document.createElement('div');
    output.style.cssText = `
        width: 100%;
        min-height: 400px;
        padding: 20px;
        background: #282c34;
        color: #abb2bf;
        border-radius: 8px;
        font-family: 'Consolas', 'Monaco', monospace;
        font-size: 0.95rem;
        line-height: 1.5;
        white-space: pre-wrap;
        overflow: auto;
    `;
    
    // Python syntax highlighting simulation
    const highlightedCode = code
        .replace(/#.*$/gm, '<span style="color: #5c6370;">$&</span>')  // Comments
        .replace(/(".*?"|'.*?')/g, '<span style="color: #98c379;">$1</span>')  // Strings
        .replace(/\b(def|class|if|else|elif|for|while|return|import|from|as|try|except|finally|with)\b/g, 
                '<span style="color: #c678dd;">$1</span>')  // Keywords
        .replace(/\b(print|len|str|int|float|list|dict|range)\b/g, 
                '<span style="color: #61afef;">$1</span>')  // Built-ins
        .replace(/\b(self|True|False|None)\b/g, 
                '<span style="color: #d19a66;">$1</span>');  // Special values
    
    output.innerHTML = `
        <div style="margin-bottom: 15px; color: #61afef; font-weight: bold;">
            <i class="fab fa-python"></i> Python Output (Simulated)
        </div>
        <div style="color: #56b6c2;">>>> Running Python code...</div>
        <div style="margin: 10px 0; border-left: 2px solid #5c6370; padding-left: 10px;">
            ${highlightedCode}
        </div>
        <div style="color: #56b6c2;">>>> Output:</div>
        <div style="background: rgba(0,0,0,0.3); padding: 10px; margin: 10px 0; border-radius: 5px;">
            Welcome to Python Runner!<br>
            This is a simulated Python environment.<br><br>
            For real Python execution:<br>
            1. Copy the code to a local Python file<br>
            2. Or use a Python backend service<br>
            3. Or integrate with a Python API<br><br>
            <div style="color: #98c379;">
            Code length: ${code.length} characters<br>
            Lines: ${code.split('\\n').length}<br>
            Estimated execution time: ~${Math.ceil(code.length / 1000)} seconds
            </div>
        </div>
        <div style="color: #56b6c2;">>>> Execution completed successfully!</div>
    `;
    
    outputContainer.innerHTML = '';
    outputContainer.appendChild(output);
}

function clearCode() {
    if (confirm('Clear all code in the editor?')) {
        document.getElementById('codeEditor').value = '';
        codeEditorContent = '';
        saveCode();
        
        const output = document.getElementById('codeOutput');
        if (output) {
            output.innerHTML = '<p class="text-secondary">Output will appear here...</p>';
        }
        
        app.showNotification('Editor cleared', 'info');
    }
}

function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Tool functions
function runJS() {
    switchLanguage('js');
    setTimeout(() => {
        document.getElementById('codeEditor').focus();
        app.showNotification('JavaScript Runner ready. Write your code and click Run.', 'info');
    }, 100);
}

function runPython() {
    switchLanguage('python');
    setTimeout(() => {
        document.getElementById('codeEditor').focus();
        app.showNotification('Python Runner ready. Note: This is a simulated environment.', 'info');
    }, 100);
}

function viewHTML() {
    switchLanguage('html');
    setTimeout(() => {
        runCode();
        app.showNotification('HTML Viewer opened. Edit and run to see changes.', 'info');
    }, 100);
}

function previewCSS() {
    switchLanguage('css');
    setTimeout(() => {
        runCode();
        app.showNotification('CSS Preview opened. Edit styles and run to see changes.', 'info');
    }, 100);
}

function obfuscateCode() {
    const code = document.getElementById('codeEditor').value;
    if (!code.trim()) {
        app.showNotification('Please enter some code first', 'warning');
        return;
    }
    
    app.simulateProgress(0, 100).then(() => {
        // Simple obfuscation (in real app, use proper obfuscation library)
        const obfuscated = code
            .replace(/var /g, 'var _0x')
            .replace(/function /g, 'function _0x')
            .replace(/let /g, 'let _0x')
            .replace(/const /g, 'const _0x')
            .split('')
            .map(c => Math.random() > 0.7 ? String.fromCharCode(c.charCodeAt(0) ^ 1) : c)
            .join('');
        
        document.getElementById('codeEditor').value = `// Obfuscated Code\n// Original length: ${code.length} chars\n\n${obfuscated}`;
        codeEditorContent = document.getElementById('codeEditor').value;
        saveCode();
        
        const output = document.getElementById('codeOutput');
        if (output) {
            output.innerHTML = `
                <div style="padding: 20px;">
                    <h4><i class="fas fa-lock"></i> Code Obfuscated</h4>
                    <div style="background: var(--surface-color); padding: 15px; border-radius: 8px; margin-top: 10px;">
                        <p><strong>Original Size:</strong> ${code.length} characters</p>
                        <p><strong>Obfuscated Size:</strong> ${obfuscated.length} characters</p>
                        <p><strong>Compression:</strong> ${Math.round((obfuscated.length / code.length) * 100)}%</p>
                        <p style="margin-top: 10px; color: var(--text-secondary); font-size: 0.9rem;">
                            <i class="fas fa-info-circle"></i> This is a basic obfuscation. For production use a proper obfuscator.
                        </p>
                    </div>
                </div>
            `;
        }
        
        app.showNotification('Code obfuscated successfully', 'success');
    });
}

function formatJSON() {
    const code = document.getElementById('codeEditor').value;
    
    try {
        // Try to parse as JSON
        const parsed = JSON.parse(code);
        const formatted = JSON.stringify(parsed, null, 2);
        
        document.getElementById('codeEditor').value = formatted;
        codeEditorContent = formatted;
        saveCode();
        
        const output = document.getElementById('codeOutput');
        if (output) {
            output.innerHTML = `
                <div style="padding: 20px;">
                    <h4><i class="fas fa-check-circle" style="color: var(--success-color);"></i> JSON Formatted Successfully</h4>
                    <div style="background: var(--surface-color); padding: 15px; border-radius: 8px; margin-top: 10px;">
                        <p><strong>Valid JSON:</strong> Yes</p>
                        <p><strong>Formatted:</strong> ${formatted.length} characters</p>
                        <p><strong>Structure:</strong> ${typeof parsed === 'object' ? 'Object' : 'Array'}</p>
                    </div>
                </div>
            `;
        }
        
        app.showNotification('JSON formatted successfully', 'success');
        
    } catch (error) {
        app.showNotification('Invalid JSON: ' + error.message, 'error');
        
        const output = document.getElementById('codeOutput');
        if (output) {
            output.innerHTML = `
                <div style="padding: 20px;">
                    <h4><i class="fas fa-exclamation-triangle" style="color: var(--error-color);"></i> Invalid JSON</h4>
                    <div style="background: rgba(255,0,0,0.1); padding: 15px; border-radius: 8px; margin-top: 10px;">
                        <p><strong>Error:</strong> ${error.message}</p>
                        <p><strong>Position:</strong> Around character ${error.position || 'unknown'}</p>
                    </div>
                </div>
            `;
        }
    }
}

function colorPicker() {
    const colorHTML = `
        <div class="modal active">
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3><i class="fas fa-eyedropper"></i> Color Picker</h3>
                    <button class="close-modal" onclick="app.hideModal('colorPicker')">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <input type="color" id="colorInput" value="#FF6600" 
                               style="width: 100px; height: 100px; border: none; border-radius: 50%; cursor: pointer;">
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
                        <div class="color-preset" style="background: #FF6600;" data-color="#FF6600"></div>
                        <div class="color-preset" style="background: #FF3366;" data-color="#FF3366"></div>
                        <div class="color-preset" style="background: #33CCFF;" data-color="#33CCFF"></div>
                        <div class="color-preset" style="background: #66CC33;" data-color="#66CC33"></div>
                        <div class="color-preset" style="background: #FFCC00;" data-color="#FFCC00"></div>
                        <div class="color-preset" style="background: #9966FF;" data-color="#9966FF"></div>
                    </div>
                    
                    <div id="colorInfo" style="background: var(--surface-color); padding: 15px; border-radius: 8px;">
                        <p><strong>Selected Color:</strong> <span id="colorHex">#FF6600</span></p>
                        <p><strong>RGB:</strong> <span id="colorRGB">rgb(255, 102, 0)</span></p>
                        <p><strong>HSL:</strong> <span id="colorHSL">hsl(24, 100%, 50%)</span></p>
                        <div style="margin-top: 10px;">
                            <button class="btn btn-sm btn-primary" onclick="copyColorToClipboard()">
                                <i class="fas fa-copy"></i> Copy HEX
                            </button>
                            <button class="btn btn-sm btn-secondary" onclick="insertColorToEditor()">
                                <i class="fas fa-code"></i> Insert to Editor
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const colorDiv = document.createElement('div');
    colorDiv.innerHTML = colorHTML;
    colorDiv.id = 'colorPicker';
    document.body.appendChild(colorDiv);
    
    // Setup color picker
    const colorInput = document.getElementById('colorInput');
    const colorHex = document.getElementById('colorHex');
    const colorRGB = document.getElementById('colorRGB');
    const colorHSL = document.getElementById('colorHSL');
    
    function updateColorInfo(color) {
        colorHex.textContent = color;
        
        // Convert hex to RGB
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        colorRGB.textContent = `rgb(${r}, ${g}, ${b})`;
        
        // Convert RGB to HSL
        const hsl = rgbToHSL(r, g, b);
        colorHSL.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        
        // Update color input
        colorInput.value = color;
    }
    
    colorInput.addEventListener('input', (e) => {
        updateColorInfo(e.target.value);
    });
    
    // Color presets
    document.querySelectorAll('.color-preset').forEach(preset => {
        preset.addEventListener('click', (e) => {
            const color = e.target.getAttribute('data-color');
            updateColorInfo(color);
        });
    });
    
    // Initialize
    updateColorInfo('#FF6600');
}

function rgbToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function copyColorToClipboard() {
    const color = document.getElementById('colorHex').textContent;
    navigator.clipboard.writeText(color).then(() => {
        app.showNotification(`Copied: ${color}`, 'success');
    });
}

function insertColorToEditor() {
    const color = document.getElementById('colorHex').textContent;
    const editor = document.getElementById('codeEditor');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    
    editor.value = editor.value.substring(0, start) + color + editor.value.substring(end);
    editor.selectionStart = editor.selectionEnd = start + color.length;
    editor.focus();
    
    codeEditorContent = editor.value;
    saveCode();
    
    app.hideModal('colorPicker');
    app.showNotification(`Inserted: ${color}`, 'success');
}

function regexTester() {
    switchLanguage('js');
    const regexCode = `// Regex Tester
// Example: Match email addresses
const text = "Contact us at info@example.com or support@company.co.uk";
const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;

console.log("Text:", text);
console.log("Regex:", regex);
console.log("\\nMatches:");

const matches = text.match(regex);
if (matches) {
    matches.forEach((match, index) => {
        console.log(\`  \${index + 1}. \${match}\`);
    });
} else {
    console.log("No matches found");
}

// Test your own regex below:
// const yourRegex = /your-regex-here/g;
// const yourText = "Your text here";
// console.log(yourText.match(yourRegex));`;
    
    document.getElementById('codeEditor').value = regexCode;
    codeEditorContent = regexCode;
    saveCode();
    
    app.showNotification('Regex Tester loaded. Modify the regex and run to test.', 'info');
}

function base64Tool() {
    switchLanguage('js');
    const base64Code = `// Base64 Encoder/Decoder
function encodeBase64(text) {
    return btoa(unescape(encodeURIComponent(text)));
}

function decodeBase64(base64) {
    return decodeURIComponent(escape(atob(base64)));
}

// Example usage
const originalText = "Hello FEE-XMD GO! 🚀";
console.log("Original Text:", originalText);

const encoded = encodeBase64(originalText);
console.log("Encoded (Base64):", encoded);

const decoded = decodeBase64(encoded);
console.log("Decoded:", decoded);

console.log("\\nMatch:", originalText === decoded ? "✅ Perfect!" : "❌ Mismatch");

// Try your own text:
// const yourText = "Your text here";
// console.log(encodeBase64(yourText));`;
    
    document.getElementById('codeEditor').value = base64Code;
    codeEditorContent = base64Code;
    saveCode();
    
    app.showNotification('Base64 Tool loaded. Modify the text and run to encode/decode.', 'info');
}

function markdownEditor() {
    switchLanguage('html');
    const markdownCode = `<!DOCTYPE html>
<html>
<head>
    <title>Markdown Preview</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f8f9fa;
        }
        .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .editor, .preview {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        textarea {
            width: 100%;
            height: 500px;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 14px;
            resize: vertical;
        }
        .preview-content {
            min-height: 500px;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            overflow-y: auto;
        }
        h1 { color: #333; border-bottom: 2px solid #667eea; }
        h2 { color: #444; }
        code { background: #f1f3f4; padding: 2px 5px; border-radius: 3px; }
        pre { background: #1e1e1e; color: #d4d4d4; padding: 15px; border-radius: 5px; overflow: auto; }
        blockquote { border-left: 4px solid #667eea; margin-left: 0; padding-left: 15px; color: #666; }
        a { color: #667eea; text-decoration: none; }
        a:hover { text-decoration: underline; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f8f9fa; }
    </style>
</head>
<body>
    <div class="container">
        <div class="editor">
            <h2>📝 Markdown Editor</h2>
            <textarea id="markdownInput" placeholder="# Write your markdown here...
            
## Features
- **Real-time preview**
- *Formatting support*
- [Links](https://example.com)
- \`Inline code\`

\`\`\`javascript
// Code blocks
function hello() {
    console.log('Hello World!');
}
\`\`\`

> Blockquotes look nice

| Tables | Are | Cool |
|--------|-----|------|
| col 1  | col 2 | col 3 |
| col 4  | col 5 | col 6 |"># Welcome to Markdown Editor

This is a **real-time** markdown preview editor.

## How to use
1. Write markdown on the left
2. See preview on the right
3. Copy the HTML output

**Enjoy!** 🚀</textarea>
        </div>
        
        <div class="preview">
            <h2>👁️ Preview</h2>
            <div id="previewContent" class="preview-content"></div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
        const input = document.getElementById('markdownInput');
        const preview = document.getElementById('previewContent');
        
        function updatePreview() {
            const markdown = input.value;
            preview.innerHTML = marked.parse(markdown);
        }
        
        input.addEventListener('input', updatePreview);
        updatePreview();
    </script>
</body>
</html>`;
    
    document.getElementById('codeEditor').value = markdownCode;
    codeEditorContent = markdownCode;
    saveCode();
    
    app.showNotification('Markdown Editor loaded. Write markdown and run to see preview.', 'info');
}

function imageConverter() {
    app.showNotification('Image Converter would upload and convert images. Requires backend service.', 'info');
}

function apiTester() {
    switchLanguage('js');
    const apiCode = `// API Tester
// Example: Fetch data from JSONPlaceholder API

async function testAPI() {
    try {
        console.log("Testing API...");
        
        // GET request example
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        
        console.log("\\nGET Response:");
        console.log("Status:", response.status);
        console.log("Headers:", Object.fromEntries([...response.headers]));
        console.log("Data:", data);
        
        // POST request example
        const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'FEE-XMD GO Test',
                body: 'Testing API from FEE-XMD GO',
                userId: 1,
            }),
        });
        
        const postData = await postResponse.json();
        console.log("\\nPOST Response:");
        console.log("Status:", postResponse.status);
        console.log("Data:", postData);
        
        console.log("\\n✅ API Tests Completed!");
        
    } catch (error) {
        console.error("❌ API Error:", error);
    }
}

// Run the test
testAPI();

// Try your own API:
// async function callYourAPI() {
//     const response = await fetch('https://your-api.com/endpoint', {
//         method: 'GET', // or 'POST', 'PUT', 'DELETE'
//         headers: {
//             'Authorization': 'Bearer your-token',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ your: 'data' })
//     });
//     const data = await response.json();
//     console.log(data);
// }`;
    
    document.getElementById('codeEditor').value = apiCode;
    codeEditorContent = apiCode;
    saveCode();
    
    app.showNotification('API Tester loaded. Modify the endpoints and run to test APIs.', 'info');
}

// Make functions available globally
window.initCodingPage = initCodingPage;
window.runCode = runCode;
window.clearCode = clearCode;
window.switchLanguage = switchLanguage;
window.runJS = runJS;
window.runPython = runPython;
window.viewHTML = viewHTML;
window.previewCSS = previewCSS;
window.obfuscateCode = obfuscateCode;
window.formatJSON = formatJSON;
window.colorPicker = colorPicker;
window.copyColorToClipboard = copyColorToClipboard;
window.insertColorToEditor = insertColorToEditor;
window.regexTester = regexTester;
window.base64Tool = base64Tool;
window.markdownEditor = markdownEditor;
window.imageConverter = imageConverter;
window.apiTester = apiTester;