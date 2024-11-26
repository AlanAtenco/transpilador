// Función para limpiar el input de JavaScript
const limpiar = () => {
    document.getElementById("inputJS").value = "";
}

// Función para generar código en PSInt
const generar = () => {
    const jsCode = document.getElementById("inputJS").value;
    const psintCode = jsToPsint(jsCode);
    document.getElementById("outputPSInt").value = psintCode;
}

// Función para convertir JavaScript a PSInt
const jsToPsint = (jsCode) => {
    let psintCode = jsCode
        // Cambiar declaraciones de variables
        .replace(/let\s+(\w+)\s*=\s*(.*?);/g, "Definir $1 Como Entero\n$1 <- $2")
        .replace(/const\s+(\w+)\s*=\s*(.*?);/g, "Definir $1 Como Entero (constante)\n$1 <- $2")
        .replace(/var\s+(\w+)\s*=\s*(.*?);/g, "Definir $1 Como Entero\n$1 <- $2")
        // Cambiar `console.log` por `Mostrar`
        .replace(/console.log\((.*?)\);/g, "Mostrar $1")
        // Convertir funciones tradicionales
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, "Proceso $1($2)")
        .replace(/\breturn\b/g, "Retornar")
        .replace(/\}/g, "FinProceso")
        // Convertir funciones flecha
        .replace(/const\s+(\w+)\s*=\s*\((.*?)\)\s*=>\s*\{/g, "Proceso $1($2)")
        // Convertir ciclos `for`
        .replace(/for\s*\(\s*let\s+(\w+)\s*=\s*(\d+);\s*\1\s*<=\s*(\d+);\s*\1\+\+\s*\)\s*\{/g, "Para $1 <- $2 Hasta $3 Hacer")
        // Convertir ciclos `while`
        .replace(/\bwhile\s*\((.*?)\)\s*\{/g, "Mientras $1 Hacer")
        // Estructuras condicionales
        .replace(/\bif\s*\((.*?)\)\s*\{/g, "Si $1 Entonces")
        .replace(/\belse if\s*\((.*?)\)\s*\{/g, "Sino Si $1 Entonces")
        .replace(/\belse\b\s*\{/g, "Sino")
        .replace(/\}/g, "FinSi")
        // Operadores
        .replace(/&&/g, "y")
        .replace(/\|\|/g, "o")
        .replace(/===/g, "=")
        .replace(/!==/g, "<>") 
        // Convertir clases
        .replace(/class\s+(\w+)\s*\{/g, "Tipo $1")
        .replace(/constructor\((.*?)\)\s*\{/g, "Proceso Constructor($1)")
        .replace(/this\.(\w+)\s*=\s*(.*?);/g, "mi.$1 <- $2")
        .replace(/\}/g, "FinProceso")
        .replace(/new\s+(\w+)\s*\((.*?)\)/g, "$1($2)")
        // Otros reemplazos básicos
        .replace(/true/g, "verdadero")
        .replace(/false/g, "falso")
        // Eliminar puntos y comas al final
        .replace(/;/g, "");

    return psintCode;
}
