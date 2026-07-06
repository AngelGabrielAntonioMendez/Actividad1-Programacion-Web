const TITULO_APLICACION = "Gestor de Tareas Ejercicio 17";
console.log(`[Scope Global] Accediendo a TITULO_APLICACION: "${TITULO_APLICACION}"`);

function crearGestorTareas() {
    let tareas = [];

    function obtenerTareas() {
        const tareasJSON = localStorage.getItem("tareas_ejercicio17");
        try {
            return tareasJSON ? JSON.parse(tareasJSON) : [];
        } catch (error) {
            console.error("Error parseando las tareas de Local Storage:", error);
            return [];
        }
    }

    function guardarTareas(nuevasTareas) {
        localStorage.setItem("tareas_ejercicio17", JSON.stringify(nuevasTareas));
    }

    tareas = obtenerTareas();
    return {
        agregarTarea: function (descripcion) {
            const nuevaTarea = {
                id: Date.now().toString(),
                descripcion: descripcion,
                fecha: new Date().toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            tareas.push(nuevaTarea);
            guardarTareas(tareas);

            console.log(`[Closure - agregarTarea] Tarea agregada: "${descripcion}". Estado de 'tareas' actualizado en Local Storage.`);
            return nuevaTarea;
        },

        eliminarTarea: function (id) {
            tareas = tareas.filter(tarea => tarea.id !== id);
            guardarTareas(tareas);

            console.log(`[Closure - eliminarTarea] Tarea con ID ${id} eliminada. Estado de 'tareas' actualizado en Local Storage.`);
        },

        obtenerTareas: function () {
            tareas = obtenerTareas();
            return tareas;
        }
    };
}

const gestor = crearGestorTareas();

function renderizarTareas() {
    const lista = gestor.obtenerTareas();
    const contenedor = document.getElementById("lista-tareas");
    const contador = document.getElementById("contador-tareas");

    contenedor.innerHTML = "";

    contador.textContent = `${lista.length} ${lista.length === 1 ? 'pendiente' : 'pendientes'}`;

    if (lista.length === 0) {
        contenedor.innerHTML = `
            <div class="empty-state">
                <p>No tienes tareas pendientes. ¡Buen trabajo!</p>
            </div>
        `;
        return;
    }

    lista.forEach(tarea => {
        const item = document.createElement("div");
        item.className = "task-item";
        item.innerHTML = `
            <div class="task-info">
                <span class="task-text">${escaparHTML(tarea.descripcion)}</span>
                <span class="task-date"> ${tarea.fecha}</span>
            </div>
            <button class="btn btn-delete" onclick="confirmarEliminar('${tarea.id}', '${escaparJSString(tarea.descripcion)}')">
                Eliminar
            </button>
        `;
        contenedor.appendChild(item);
    });
}

function agregarNuevaTarea(event) {
    event.preventDefault();

    const input = document.getElementById("nueva-tarea");
    const texto = input.value.trim();

    if (!texto) {
        Swal.fire({
            title: '¡Espera!',
            text: 'La descripción de la tarea no puede estar vacía.',
            icon: 'warning',
            background: '#1a1025',
            color: '#ffffff',
            confirmButtonColor: '#8e54e9',
            customClass: {
                popup: 'swal2-custom-popup'
            }
        });
        return;
    }

    gestor.agregarTarea(texto);

    input.value = "";

    renderizarTareas();

    Swal.fire({
        title: '¡Agregada!',
        text: 'La tarea se ha guardado en Local Storage.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#1a1025',
        color: '#ffffff',
        customClass: {
            popup: 'swal2-custom-popup'
        }
    });
}

function confirmarEliminar(id, descripcion) {
    Swal.fire({
        title: '¿Eliminar tarea?',
        text: `¿Estás seguro de que deseas eliminar la tarea: "${descripcion}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff5858',
        cancelButtonColor: '#4a2e6b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        background: '#1a1025',
        color: '#ffffff',
        customClass: {
            popup: 'swal2-custom-popup'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            gestor.eliminarTarea(id);

            renderizarTareas();

            Swal.fire({
                title: '¡Eliminada!',
                text: 'La tarea ha sido eliminada del Local Storage.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#1a1025',
                color: '#ffffff',
                customClass: {
                    popup: 'swal2-custom-popup'
                }
            });
        }
    });
}

/**
 * Función global: switchTab
 * Controla el cambio de pestañas de explicaciones conceptuales.
 */
function switchTab(tabId) {
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));

    const activeBtn = document.getElementById(`btn-tab-${tabId}`);
    if (activeBtn) activeBtn.classList.add("active");

    const activePanel = document.getElementById(`tab-${tabId}`);
    if (activePanel) activePanel.classList.add("active");
}

// Funciones auxiliares para mitigar inyecciones de HTML/JS
function escaparHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escaparJSString(str) {
    return str
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r');
}

// Inicialización de la página al cargar
document.addEventListener("DOMContentLoaded", () => {
    renderizarTareas();
});
