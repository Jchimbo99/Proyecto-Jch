document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (localStorage.getItem('session')) {
        // Alerta antes de redirigir si ya hay una sesión activa
        alert("Ya estás logueado. Serás trasladado a la página principal.");
        window.location.href = '/index.html';  
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (validarCredenciales(email, password)) {
            localStorage.setItem('session', JSON.stringify({ email: email }));

            alert("¡Login exitoso! Serás trasladado a la página principal.");
            window.location.href = '/index.html';  
        } else {
            alert('Correo o contraseña incorrectos.');
        }
    });
});

function validarCredenciales(email, password) {
    const usuarios = [
        { email: 'admin@admin.com', password: 'admin' }, 
    ];

    return usuarios.some(usuario => usuario.email === email && usuario.password === password);
}
