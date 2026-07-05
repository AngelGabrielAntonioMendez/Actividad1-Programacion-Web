document.addEventListener("DOMContentLoaded", () => {
    const bienvenidaTexto = document.getElementById("bienvenidaTexto");
    const salirBtn = document.getElementById("salirBtn");
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    bienvenidaTexto.textContent = usuarioActivo && usuarioActivo.nombre
        ? `Bienvenido, ${usuarioActivo.nombre}`
        : "Bienvenido";

    salirBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "login.html";
    });
});
