const sandboxTitle = document.getElementById('sandbox-title');
const text = sandboxTitle.innerText;
sandboxTitle.innerHTML = '';

text.split('').forEach((letter, index) => {
    const span = document.createElement('span');
    span.innerText = letter;
    span.classList.add('wavy-letter');
    span.style.setProperty('--i', index);
    if (letter === ' ') {
        span.style.marginRight = '0.3em';
    }

    sandboxTitle.appendChild(span);
});

const runButton = document.getElementById('run-code-button');
const codeInput = document.getElementById('code-input');
const codeOutput = document.getElementById('code-output');

function print(message) {
    const line = document.createElement('div');
    line.textContent = '> ' + message;
    line.style.borderBottom = "1px solid #ccc";
    line.style.padding = "2px 0";
    codeOutput.appendChild(line);
}

runButton.addEventListener('click', () => {
    codeOutput.innerHTML = '';
    const code = codeInput.value;

    try {
        const originalLog = console.log;

        console.log = function (...args) {
            const msg = args.map(arg => String(arg)).join(' ');
            print(msg);
            originalLog.apply(console, args);
        };

        const result = eval(code);
        if (result !== undefined) {
            print(result);
        }

        console.log = originalLog;

    } catch (error) {
        const line = document.createElement('div');
        line.textContent = 'Error: ' + error.message;
        line.style.color = 'red';
        codeOutput.appendChild(line);
    }
});