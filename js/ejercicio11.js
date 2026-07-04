document.addEventListener("DOMContentLoaded", () => {

    const kmInput = document.getElementById("kmInput");
    const millasOutput = document.getElementById("millasOutput");
    const convertBtn = document.getElementById("convertBtn");
    const errorMsg = document.getElementById("errorMsg");

    const FACTOR_CONVERSION = 0.621371;

    function convertirDistancia() {
        const cantidadKm = parseFloat(kmInput.value);

        if (isNaN(cantidadKm) || cantidadKm <= 0) {
            errorMsg.style.display = "block";
            millasOutput.value = "";
            kmInput.style.borderColor = "#ff4d4d";
        } else {
            errorMsg.style.display = "none";
            kmInput.style.borderColor = "#4a2e6b";

            const cantidadMillas = cantidadKm * FACTOR_CONVERSION;

            millasOutput.value = cantidadMillas.toFixed(5);
        }
    }

    convertBtn.addEventListener("click", convertirDistancia);

    kmInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            convertirDistancia();
        }
    });
});
