(function () {
const Tiempo = {
    // fechaNacimiento: string|Date -> edad en años cumplidos
    calcularEdad: (fechaNacimiento) => {
        if (!fechaNacimiento) return 0;

        const hoy = new Date();
        const cumple = new Date(fechaNacimiento);

        let edad = hoy.getFullYear() - cumple.getFullYear();

        const diferenciaMeses = hoy.getMonth() - cumple.getMonth();
        const diferenciaDias = hoy.getDate() - cumple.getDate();

        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && diferenciaDias < 0)) {
            edad--;
        }
        return edad < 0 ? 0 : edad;
    },

    // fecha: string|Date -> texto legible en español, ej. "5 de julio de 2026"
    formatearFecha: (fecha) => {
        if (!fecha) return "";
        const fechaObj = new Date(fecha);
        if (isNaN(fechaObj.getTime())) return "";

        return fechaObj.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC"
        });
    }
};

const Formato = {
    // "juan carlos  perez" -> "Juan Carlos Perez"
    capitalizarPalabras: (texto) => {
        if (!texto || typeof texto !== "string") return "";

        return texto
            .trim()
            .split(/\s+/)
            .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
            .join(" ");
    }
};

const Validador = {
    correo: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    campoVacio: (texto) => {
        return texto === undefined || texto === null || texto.trim().length === 0;
    },
    longitudMinima: (texto, min) => {
        return texto.trim().length >= min;
    },
    password: (pwd) => {
        if (!pwd || pwd.trim().length === 0) return false;

        const tieneLongitud = pwd.length >= 8;
        const tieneMayuscula = /[A-Z]/.test(pwd);
        const tieneMinuscula = /[a-z]/.test(pwd);
        const tieneNumero = /[0-9]/.test(pwd);
        const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

        return tieneLongitud && tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
    },
    soloLetras: (texto) => {
        if (!texto || typeof texto !== "string") return false;
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        return regex.test(texto);
    },
    telefono: (numero) => {
        if (!numero || typeof numero !== "string") return false;
        const regex = /^[0-9]{10}$/;
        return regex.test(numero.trim());
    },
    esMayorDeEdad: (fechaNacimiento) => {
        if (!fechaNacimiento) return false;
        const edadExacta = Tiempo.calcularEdad(fechaNacimiento);
        return edadExacta >= 18;
    },
    analizarPassword: (pwd) => {
        const errores = [];

        if (!pwd || pwd.length < 8) errores.push("Faltan caracteres (mínimo 8).");
        if (!/[A-Z]/.test(pwd || "")) errores.push("Falta una letra mayúscula.");
        if (!/[a-z]/.test(pwd || "")) errores.push("Falta una letra minúscula.");
        if (!/[0-9]/.test(pwd || "")) errores.push("Falta un número.");
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd || "")) errores.push("Falta un caracter especial.");

        return {
            esValida: errores.length === 0,
            detalles: errores
        };
    }
};

const Auth = {
    prepararDatosLogin: (correo, password) => {
        if (!Validador.correo(correo)) {
            throw new Error("El correo no tiene un formato válido.");
        }
        if (!Validador.password(password)) {
            throw new Error("La contraseña debe tener al menos 8 caracteres, incluir mayúsculas y minúsculas, un número y un caracter especial.");
        }
        return {
            email: correo.trim(),
            pwd: password,
            timestamp: new Date().toISOString()
        };
    }
};

window.logicApp = {
    Validador,
    Auth,
    Tiempo,
    Formato
};
})();
