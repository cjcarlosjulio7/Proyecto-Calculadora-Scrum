const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// Construir ruta absoluta al archivo HTML
const htmlPath = path.resolve(__dirname, "../index.html");
const html = fs.readFileSync(htmlPath, "utf8");

// Simular el DOM
const dom = new JSDOM(html, { runScripts: "dangerously" });
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = dom.window.localStorage;

global.window = dom.window;
global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
};

const script = require("../script.js");

// Desestructurar las funciones correctamente
const { appendToDisplay, clearDisplay, deleteLast, calculate, isOperator, display } = script;

// Pruebas
function runTests() {
    let results = [];

    function assert(expression, description) {
        if (expression) {
            results.push(`✅ ${description}`);
        } else {
            results.push(`❌ ERROR: ${description}`);
        }
    }

    // PRUEBAS
    clearDisplay();
    appendToDisplay("5+3");
    calculate();
    assert(display.value === "8", "Suma de 5 + 3 debe ser 8");

    clearDisplay();
    appendToDisplay("10-4");
    calculate();
    assert(display.value === "6", "Resta de 10 - 4 debe ser 6");

    clearDisplay();
    appendToDisplay("6*7");
    calculate();
    assert(display.value === "42", "Multiplicación de 6 * 7 debe ser 42");

    clearDisplay();
    appendToDisplay("20/4");
    calculate();
    assert(display.value === "5", "División de 20 / 4 debe ser 5");

    clearDisplay();
    appendToDisplay("10/0");
    calculate();
    assert(display.value === "Error: División por cero no permitida", "División por cero debe devolver error");

    // Prueba de deleteLast
    clearDisplay();
    appendToDisplay("123");
    deleteLast();
    assert(display.value === "12", "Eliminar último carácter de 123 debe ser 12");

    // Prueba de isOperator
    assert(isOperator("+"), "El operador '+' debe ser válido");
    assert(isOperator("-"), "El operador '-' debe ser válido");
    assert(!isOperator("a"), "El carácter 'a' no debe ser un operador");

    // Mostrar resultados en la consola
    console.log(results.join("\n"));
}

// Ejecutar pruebas
runTests();
