// Funciones flecha para las operaciones básicas
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => b !== 0 ? a / b : 'Error: División por cero';

/**

 * @param {string} operacion - Tipo de operación ('suma', 'resta', 'multiplicacion', 'division')
 */
window.calcularOperacion = (operacion) => {
    const numero1Input = document.getElementById('numero1');
    const numero2Input = document.getElementById('numero2');
    const resultadoInput = document.getElementById('resultado');

    const val1Str = numero1Input.value.trim();
    const val2Str = numero2Input.value.trim();

    const esNumeroValido = (str) => str !== '' && !isNaN(Number(str));

    if (!esNumeroValido(val1Str) || !esNumeroValido(val2Str)) {
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
        
        resultadoInput.value = '';
        return;
    }

    const num1 = parseFloat(val1Str);
    const num2 = parseFloat(val2Str);
    let resultado;

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
        if (typeof resultado === 'number') {
            resultadoInput.value = Number(resultado.toFixed(6));
        } else {
            resultadoInput.value = resultado;
        }
    }
};
