document.addEventListener("DOMContentLoaded", () => {

    const numerosInput = document.getElementById("numerosInput");
    const mayorOutput = document.getElementById("mayorOutput");
    const menorOutput = document.getElementById("menorOutput");
    const promedioOutput = document.getElementById("promedioOutput");
    const calcularBtn = document.getElementById("calcularBtn");
    const errorMsg = document.getElementById("errorMsg");

    function calcular() {
        const texto = numerosInput.value.trim();

        mayorOutput.value = "";
        menorOutput.value = "";
        promedioOutput.value = "";

        if (texto === "") {
            errorMsg.style.display = "block";
            numerosInput.style.borderColor = "#ff4d4d";
            return;
        }

        const partes = texto.split(",").map(valor => valor.trim());
        const numeros = partes.map(Number);

        const sonValidos = partes.every(valor => valor !== "") && numeros.every(numero => !isNaN(numero));

        if (!sonValidos) {
            errorMsg.style.display = "block";
            numerosInput.style.borderColor = "#ff4d4d";
            return;
        }

        errorMsg.style.display = "none";
        numerosInput.style.borderColor = "#4a2e6b";

        const mayor = Math.max(...numeros);
        const menor = Math.min(...numeros);
        const suma = numeros.reduce((acumulado, valor) => acumulado + valor, 0);
        const promedio = suma / numeros.length;

        mayorOutput.value = mayor;
        menorOutput.value = menor;
        promedioOutput.value = promedio.toFixed(2);
    }

    calcularBtn.addEventListener("click", calcular);

    numerosInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            calcular();
        }
    });
});
