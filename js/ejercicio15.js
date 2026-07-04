document.addEventListener("DOMContentLoaded", () => {

    const nombreInput = document.getElementById("nombreInput");
    const calificacionInput = document.getElementById("calificacionInput");
    const agregarBtn = document.getElementById("agregarBtn");
    const listaEstudiantes = document.getElementById("listaEstudiantes");
    const errorMsg = document.getElementById("errorMsg");

    const calcularBtn = document.getElementById("calcularBtn");
    const promedioOutput = document.getElementById("promedioOutput");
    const masAltaOutput = document.getElementById("masAltaOutput");
    const masBajaOutput = document.getElementById("masBajaOutput");

    let estudiantes = [];

    function renderizarLista() {
        listaEstudiantes.innerHTML = "";

        if (estudiantes.length === 0) {
            listaEstudiantes.innerHTML = '<li class="sin-estudiantes">Sin estudiantes agregados</li>';
            return;
        }

        estudiantes.forEach(estudiante => {
            const item = document.createElement("li");
            item.innerHTML = `<span>${estudiante.nombre}</span><span>${estudiante.calificacion}</span>`;
            listaEstudiantes.appendChild(item);
        });
    }

    function agregarEstudiante() {
        const nombre = nombreInput.value.trim();
        const calificacion = parseFloat(calificacionInput.value);

        if (nombre === "" || isNaN(calificacion)) {
            errorMsg.style.display = "block";
            nombreInput.style.borderColor = "#ff4d4d";
            calificacionInput.style.borderColor = "#ff4d4d";
            return;
        }

        errorMsg.style.display = "none";
        nombreInput.style.borderColor = "#4a2e6b";
        calificacionInput.style.borderColor = "#4a2e6b";

        estudiantes.push({ nombre, calificacion });
        renderizarLista();

        nombreInput.value = "";
        calificacionInput.value = "";
        nombreInput.focus();
    }

    function calcularResultados() {
        promedioOutput.value = "";
        masAltaOutput.value = "";
        masBajaOutput.value = "";

        if (estudiantes.length === 0) {
            errorMsg.style.display = "block";
            return;
        }

        errorMsg.style.display = "none";

        const calificaciones = estudiantes.map(estudiante => estudiante.calificacion);

        const suma = estudiantes.reduce((total, estudiante) => total + estudiante.calificacion, 0);
        const promedio = suma / estudiantes.length;

        const calificacionMaxima = Math.max(...calificaciones);
        const calificacionMinima = Math.min(...calificaciones);

        const estudianteMasAlto = estudiantes.find(estudiante => estudiante.calificacion === calificacionMaxima);
        const estudianteMasBajo = estudiantes.find(estudiante => estudiante.calificacion === calificacionMinima);

        promedioOutput.value = promedio.toFixed(2);
        masAltaOutput.value = estudianteMasAlto.nombre;
        masBajaOutput.value = estudianteMasBajo.nombre;
    }

    agregarBtn.addEventListener("click", agregarEstudiante);
    calcularBtn.addEventListener("click", calcularResultados);

    calificacionInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            agregarEstudiante();
        }
    });
});
