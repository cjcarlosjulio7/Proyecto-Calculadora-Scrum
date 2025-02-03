let display = document.getElementById('display');

function appendToDisplay(value) {
    if (display.value === "Error" || display.value === "Error: División por cero no permitida") {
        return;
    }

    const lastNumber = display.value.split(/[\+\-\*\/]/).pop();
    if (value === '.' && lastNumber.includes('.')) {
        return;
    }

    if (isOperator(value) && isOperator(display.value.slice(-1))) {
        return;
    }

    display.value += value;
}

function clearDisplay() {
    display.value = '';
    display.classList.remove('error');
}

function deleteLast() {
    if (display.value === "Error" || display.value === "Error: División por cero no permitida") {
        return;
    }
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value.replace(/÷/g, '/').replace(/×/g, '*');

        if (expression.includes('/0')) {
            display.value = "Error: División por cero no permitida";
            display.classList.add('error');
            return;
        }

        let result = eval(expression);

        display.value = parseFloat(result.toFixed(10)).toString().replace(/\.?0+$/, "");
        display.classList.remove('error');
    } catch (e) {
        display.value = "Error";
        display.classList.add('error');
    }
}

function isOperator(value) {
    return ['+', '-', '*', '/', '×', '÷'].includes(value);
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (display.value === "Error" || display.value === "Error: División por cero no permitida") {
        return;
    }
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/', '.'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// Modo oscuro con icono dinámico
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    const icon = document.getElementById("dark-mode-icon");
    icon.style.transition = "transform 0.3s ease-in-out";
    icon.style.transform = "rotate(180deg)";
    
    setTimeout(() => {
        icon.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
        icon.style.transform = "rotate(0deg)";
    }, 250);

    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
}

window.onload = () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById("dark-mode-icon").textContent = "☀️";
    }
};

module.exports = {
    appendToDisplay,
    clearDisplay,
    deleteLast,
    calculate,
    isOperator,
    display
};