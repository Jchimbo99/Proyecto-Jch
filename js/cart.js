
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(event) {
    const producto = event.target.dataset.producto;
    const precio = parseFloat(event.target.dataset.precio);

    carrito.push({ producto, precio });

    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarContadorCarrito();
    actualizarModal();
}

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('cartCount');
    contadorCarrito.textContent = carrito.length;
}

function actualizarModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    cartItems.innerHTML = '';

    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.producto} - $${item.precio.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.precio;
    });

    cartTotal.textContent = total.toFixed(2);
}

function abrirCarrito() {
    const modal = document.getElementById('cartModal');
    modal.classList.remove('hidden');
}

function cerrarCarrito() {
    const modal = document.getElementById('cartModal');
    modal.classList.add('hidden');
}

function finalizarCompra() {
    const session = localStorage.getItem('session');
    
    if (!session) {
        alert("No estás logueado. Serás trasladado a la página de login.");
        window.location.href = 'login.html';
        return;
    }

    alert("Compra finalizada. ¡Gracias por tu compra!");
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    actualizarModal();
    cerrarCarrito();
}


function iniciarSesion() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'usuario' && password === 'contraseña') {
        localStorage.setItem('session', 'usuario_logueado');
        alert("Sesión iniciada. Ahora puedes finalizar tu compra.");
        document.getElementById('loginFormContainer').style.display = 'none';
    } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
}




document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});

document.getElementById('cartIcon').addEventListener('click', abrirCarrito);

document.getElementById('closeCart').addEventListener('click', cerrarCarrito);

actualizarContadorCarrito();
actualizarModal();
