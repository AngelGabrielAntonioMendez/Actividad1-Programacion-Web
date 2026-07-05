document.addEventListener("DOMContentLoaded", () => {
    const { Validador, Tiempo, Formato, Auth } = window.logicApp;

    const form = document.getElementById("loginForm");
    const nombreInput = document.getElementById("nombreInput");
    const correoInput = document.getElementById("correoInput");
    const telefonoInput = document.getElementById("telefonoInput");
    const passwordInput = document.getElementById("passwordInput");
    const fechaInput = document.getElementById("fechaInput");
    const errorMsg = document.getElementById("errorMsg");

    const modalOverlay = document.getElementById("modalOverlay");
    const modalNombre = document.getElementById("modalNombre");
    const modalEdad = document.getElementById("modalEdad");
    const modalFecha = document.getElementById("modalFecha");
    const modalCorreo = document.getElementById("modalCorreo");
    const modalTelefono = document.getElementById("modalTelefono");
    const cerrarModalBtn = document.getElementById("cerrarModalBtn");
    const irInicioBtn = document.getElementById("irInicioBtn");

    const formTitulo = document.getElementById("formTitulo");
    const mostrarAccesoBtn = document.getElementById("mostrarAccesoBtn");
    const volverRegistroBtn = document.getElementById("volverRegistroBtn");
    const accesoForm = document.getElementById("accesoForm");
    const accesoIdentificador = document.getElementById("accesoIdentificador");
    const accesoPassword = document.getElementById("accesoPassword");
    const accesoErrorMsg = document.getElementById("accesoErrorMsg");

    const inputs = [nombreInput, correoInput, telefonoInput, passwordInput, fechaInput];
    const STORAGE_KEY = "usuariosRegistrados";
    const SESION_KEY = "usuarioActivo";

    let ultimoNombreRegistrado = "";

    const hoy = new Date();
    const fechaLimite = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
    fechaInput.max = fechaLimite.toISOString().split("T")[0];

    function obtenerUsuarios() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    function guardarUsuario(usuario) {
        const usuarios = obtenerUsuarios();
        usuarios.push(usuario);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
    }

    function marcarError(input) {
        input.style.borderColor = "#ff4d4d";
    }

    function limpiarErrores() {
        errorMsg.style.display = "none";
        inputs.forEach(input => input.style.borderColor = "#4a2e6b");
    }

    function mostrarError(mensaje, input) {
        errorMsg.textContent = mensaje;
        errorMsg.style.display = "block";
        if (input) marcarError(input);
    }

    function validarYRegistrar() {
        limpiarErrores();

        const nombre = nombreInput.value.trim();
        const correo = correoInput.value.trim();
        const telefono = telefonoInput.value.trim();
        const password = passwordInput.value;
        const fecha = fechaInput.value;

        if (Validador.campoVacio(nombre) || !Validador.soloLetras(nombre)) {
            mostrarError("Ingresa tu nombre completo (solo letras y espacios).", nombreInput);
            return;
        }

        if (!Validador.correo(correo)) {
            mostrarError("El correo no tiene un formato válido.", correoInput);
            return;
        }

        if (!Validador.telefono(telefono)) {
            mostrarError("El teléfono debe tener exactamente 10 dígitos.", telefonoInput);
            return;
        }

        const analisis = Validador.analizarPassword(password);
        if (!analisis.esValida) {
            mostrarError("Contraseña inválida: " + analisis.detalles.join(" "), passwordInput);
            return;
        }

        if (Validador.campoVacio(fecha)) {
            mostrarError("Selecciona tu fecha de nacimiento.", fechaInput);
            return;
        }

        if (!Validador.esMayorDeEdad(fecha)) {
            mostrarError("Debes ser mayor de edad (18 años o más) para registrarte.", fechaInput);
            return;
        }

        let datosLogin;
        try {
            datosLogin = Auth.prepararDatosLogin(correo, password);
        } catch (error) {
            mostrarError(error.message, null);
            return;
        }

        if (obtenerUsuarios().some(usuario => usuario.correo === correo)) {
            mostrarError("Este correo ya está registrado.", correoInput);
            return;
        }

        const edad = Tiempo.calcularEdad(fecha);
        const fechaFormateada = Tiempo.formatearFecha(fecha);
        const nombreFormateado = Formato.capitalizarPalabras(nombre);
        ultimoNombreRegistrado = nombreFormateado;

        guardarUsuario({
            nombre: nombreFormateado,
            correo: datosLogin.email,
            telefono,
            password: datosLogin.pwd,
            fechaNacimiento: fecha,
            edad,
            registradoEl: datosLogin.timestamp
        });

        modalNombre.textContent = nombreFormateado;
        modalEdad.textContent = `${edad} años`;
        modalFecha.textContent = fechaFormateada;
        modalCorreo.textContent = correo;
        modalTelefono.textContent = telefono;

        modalOverlay.classList.add("activo");
        form.reset();
        inputs.forEach(input => input.style.borderColor = "#4a2e6b");
    }

    function cerrarModal() {
        modalOverlay.classList.remove("activo");
    }

    function irAlInicio(nombre) {
        localStorage.setItem(SESION_KEY, JSON.stringify({ nombre }));
        window.location.href = "inicio.html";
    }

    function mostrarAcceso() {
        form.classList.add("oculto");
        mostrarAccesoBtn.classList.add("oculto");
        accesoForm.classList.remove("oculto");
        formTitulo.textContent = "Iniciar sesión";
    }

    function volverARegistro() {
        accesoForm.classList.add("oculto");
        form.classList.remove("oculto");
        mostrarAccesoBtn.classList.remove("oculto");
        formTitulo.textContent = "Registro de usuario";
    }

    function limpiarErroresAcceso() {
        accesoErrorMsg.style.display = "none";
        accesoIdentificador.style.borderColor = "#4a2e6b";
        accesoPassword.style.borderColor = "#4a2e6b";
    }

    function mostrarErrorAcceso(mensaje, input) {
        accesoErrorMsg.textContent = mensaje;
        accesoErrorMsg.style.display = "block";
        if (input) input.style.borderColor = "#ff4d4d";
    }

    function iniciarSesion() {
        limpiarErroresAcceso();

        const identificador = accesoIdentificador.value.trim();
        const password = accesoPassword.value;

        if (Validador.campoVacio(identificador) || Validador.campoVacio(password)) {
            mostrarErrorAcceso("Ingresa tu correo o teléfono y tu contraseña.", null);
            return;
        }

        if (!Validador.correo(identificador) && !Validador.telefono(identificador)) {
            mostrarErrorAcceso("Ingresa un correo válido o un teléfono de 10 dígitos.", accesoIdentificador);
            return;
        }

        const usuario = obtenerUsuarios().find(u =>
            (u.correo === identificador || u.telefono === identificador) && u.password === password
        );

        if (!usuario) {
            mostrarErrorAcceso("Correo/teléfono o contraseña incorrectos.", accesoPassword);
            return;
        }

        irAlInicio(usuario.nombre);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        validarYRegistrar();
    });

    cerrarModalBtn.addEventListener("click", cerrarModal);

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) cerrarModal();
    });

    irInicioBtn.addEventListener("click", () => irAlInicio(ultimoNombreRegistrado));

    mostrarAccesoBtn.addEventListener("click", mostrarAcceso);
    volverRegistroBtn.addEventListener("click", volverARegistro);

    accesoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        iniciarSesion();
    });
});
