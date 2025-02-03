let display = document.getElementById('display');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        let expression = display.value.replace(/÷/g, '/').replace(/×/g, '*');
        if (expression.includes('/0')) {
            display.value = "Error: División por cero";
            return;
        }
        let result = eval(expression);
        display.value = result;
    } catch (e) {
        display.value = "Error";
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/', '.'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        appendToDisplay,
        clearDisplay,
        calculate,
        display,
    };
}