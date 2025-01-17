// Función para validar los campos del formulario
function validarFormulario(event) {
    // Prevenir el envío del formulario hasta que validemos
    event.preventDefault();

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Limpiar los mensajes de error anteriores
    document.getElementById('errorNombre').classList.add('hidden');
    document.getElementById('errorEmail').classList.add('hidden');
    document.getElementById('errorTelefono').classList.add('hidden');
    document.getElementById('errorMensaje').classList.add('hidden');

    // Verificar si los campos están vacíos
    let validado = true;

    if (!nombre) {
        document.getElementById('errorNombre').classList.remove('hidden');
        validado = false;
    }

    if (!email) {
        document.getElementById('errorEmail').classList.remove('hidden');
        validado = false;
    }

    if (!telefono) {
        document.getElementById('errorTelefono').classList.remove('hidden');
        validado = false;
    }

    if (!mensaje) {
        document.getElementById('errorMensaje').classList.remove('hidden');
        validado = false;
    }

    // Si todos los campos están llenos, enviar el formulario
    if (validado) {
        alert("Formulario enviado correctamente.");
        // Redirigir a la página de agradecimiento (bienvenido.html)
        window.location.href = "/bienvenido.html";
    }
}

// Añadir el evento de validación al formulario
document.querySelector('form').addEventListener('submit', validarFormulario);
