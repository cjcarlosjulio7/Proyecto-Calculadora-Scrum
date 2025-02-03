const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// Construir ruta absoluta al archivo HTML
const htmlPath = path.resolve(__dirname, "../index.html");
const html = fs.readFileSync(htmlPath, "utf8");

// Simular el DOM
const dom = new JSDOM(html, { runScripts: "dangerously" });
global.document = dom.window.document;

// Importar funciones de script.js
const { appendToDisplay, clearDisplay, calculate, display } = require("../script.js");

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
    assert(display.value === "Error: División por cero", "División por cero debe devolver error");

    // Mostrar resultados en la consola
    console.log(results.join("\n"));
}

// Ejecutar pruebas
runTests();
