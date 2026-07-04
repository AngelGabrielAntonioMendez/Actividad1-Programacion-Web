document.addEventListener("DOMContentLoaded", () => {

    const edadInput = document.getElementById("edadInput");
    const resultadoOutput = document.getElementById("resultadoOutput");
    const verificarBtn = document.getElementById("verificarBtn");
    const errorMsg = document.getElementById("errorMsg");

    const EDAD_MINIMA = 18;

    function verificarEdad() {
        const edad = parseFloat(edadInput.value);

        if (isNaN(edad) || edad < 0) {
            errorMsg.style.display = "block";
            resultadoOutput.value = "";
            edadInput.style.borderColor = "#ff4d4d";
        } else {
            errorMsg.style.display = "none";
            edadInput.style.borderColor = "#4a2e6b";

            resultadoOutput.value = edad >= EDAD_MINIMA ? "Puedes votar" : "No puedes votar";
        }
    }
    verificarBtn.addEventListener("click", verificarEdad);

    edadInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            verificarEdad();
        }
    });
});
