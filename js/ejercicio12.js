document.addEventListener("DOMContentLoaded", () => {
    
    const mxnInput = document.getElementById("mxnInput");
    const usdOutput = document.getElementById("usdOutput");
    const convertBtn = document.getElementById("convertBtn");
    const errorMsg = document.getElementById("errorMsg");

    const TASA_DE_CAMBIO = 0.055;

    function convertirMoneda() {
        const cantidadMXN = parseFloat(mxnInput.value);

        if (isNaN(cantidadMXN) || cantidadMXN <= 0) {
            errorMsg.style.display = "block";
            usdOutput.value = "";
            mxnInput.style.borderColor = "#ff4d4d"; 
        } else {
            errorMsg.style.display = "none";
            mxnInput.style.borderColor = "#4a2e6b";

            const cantidadUSD = cantidadMXN * TASA_DE_CAMBIO;

            usdOutput.value = cantidadUSD.toFixed(2);
        }
    }


    convertBtn.addEventListener("click", convertirMoneda);

    mxnInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            convertirMoneda();
        }
    });
});