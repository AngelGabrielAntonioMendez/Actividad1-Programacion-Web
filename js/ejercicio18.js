const input = document.getElementById('nuevoElemento');
const botonAgregar = document.getElementById('agregarBtn');
const lista = document.getElementById('lista');
const emptyState = document.getElementById('emptyState');
const contadorElementos = document.getElementById('contadorElementos');

function actualizarEstadoLista() {
    const totalElementos = lista.children.length;

    contadorElementos.textContent = `${totalElementos} elemento${totalElementos !== 1 ? 's' : ''}`;

    if (totalElementos === 0) {
        emptyState.classList.remove('d-none');
    } else {
        emptyState.classList.add('d-none');
    }
}

function agregarElemento() {
    const texto = input.value.trim();
    if (texto !== '') {
        const li = document.createElement('li');
        li.className = 'elemento';

        const spanTexto = document.createElement('span');
        spanTexto.className = 'text-wrap pe-2 fw-medium text-white';
        spanTexto.textContent = texto;
        li.appendChild(spanTexto);

        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'btn-eliminar';
        botonEliminar.innerHTML = '<i class="bi bi-trash3 me-1"></i> Eliminar';

        botonEliminar.addEventListener('click', function () {
            li.classList.add('removing');
            li.addEventListener('animationend', function () {
                li.remove();
                actualizarEstadoLista();
            });
        });

        li.appendChild(botonEliminar);

        lista.appendChild(li);

        input.value = '';
        input.focus();

        actualizarEstadoLista();
    } else {
        alert('Por favor, escribe algo para agregar a la lista.');
    }
}

botonAgregar.addEventListener('click', agregarElemento);

input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        agregarElemento();
    }
});

actualizarEstadoLista();
