// Funciones flecha para las operaciones básicas
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => b !== 0 ? a / b : 'Error: División por cero';

/**
 * Función principal para realizar el cálculo de la operación seleccionada.
 * Se expone en el objeto window para que pueda ser invocada desde los atributos onclick del HTML.
 * 
 * @param {string} operacion - Tipo de operación ('suma', 'resta', 'multiplicacion', 'division')
 */
window.calcularOperacion = (operacion) => {
    // Obtener los elementos del DOM
    const numero1Input = document.getElementById('numero1');
    const numero2Input = document.getElementById('numero2');
    const resultadoInput = document.getElementById('resultado');

    // Obtener y limpiar los valores de entrada
    const val1Str = numero1Input.value.trim();
    const val2Str = numero2Input.value.trim();

    // Validar que no estén vacíos y que sean números válidos
    const esNumeroValido = (str) => str !== '' && !isNaN(Number(str));

    if (!esNumeroValido(val1Str) || !esNumeroValido(val2Str)) {
        // Mostrar SweetAlert2 en caso de error de entrada
        Swal.fire({
            icon: 'error',
            title: 'Entrada inválida',
            text: 'Por favor, ingrese valores numéricos válidos en ambos campos.',
            background: '#1a1025',
            color: '#ffffff',
            confirmButtonColor: '#9d4edd',
            customClass: {
                popup: 'swal2-custom-popup'
            }
        });
        
        // Limpiar el resultado en caso de error
        resultadoInput.value = '';
        return;
    }

    // Convertir las cadenas a tipo float
    const num1 = parseFloat(val1Str);
    const num2 = parseFloat(val2Str);
    let resultado;

    // Ejecutar la operación correspondiente
    switch (operacion) {
        case 'suma':
            resultado = sumar(num1, num2);
            break;
        case 'resta':
            resultado = restar(num1, num2);
            break;
        case 'multiplicacion':
            resultado = multiplicar(num1, num2);
            break;
        case 'division':
            resultado = dividir(num1, num2);
            break;
        default:
            resultado = 'Operación no válida';
    }

    // Si el resultado es un mensaje de error por división entre cero, mostrar SweetAlert2 y pintar el error
    if (resultado === 'Error: División por cero') {
        Swal.fire({
            icon: 'warning',
            title: 'Error de división',
            text: 'No es posible dividir un número entre cero.',
            background: '#1a1025',
            color: '#ffffff',
            confirmButtonColor: '#9d4edd',
            customClass: {
                popup: 'swal2-custom-popup'
            }
        });
        resultadoInput.value = resultado;
    } else {
        // Si el resultado es numérico, formatear para evitar exceso de decimales flotantes (ej: 0.1 + 0.2)
        if (typeof resultado === 'number') {
            // Si tiene decimales, limitamos a 4 decimales significativos como máximo
            resultadoInput.value = Number(resultado.toFixed(6));
        } else {
            resultadoInput.value = resultado;
        }
    }
};
