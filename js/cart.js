let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(event) {
    const producto = event.target.dataset.producto;
    const precio = parseFloat(event.target.dataset.precio);
    const productoExistente = carrito.find(item => item.producto === producto);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ producto, precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    actualizarModal();
}

function aumentarCantidad(event) {
    const producto = event.target.dataset.producto;
    const productoExistente = carrito.find(item => item.producto === producto);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    actualizarModal();
}

function disminuirCantidad(event) {
    const producto = event.target.dataset.producto;
    const productoExistente = carrito.find(item => item.producto === producto);

    if (productoExistente && productoExistente.cantidad > 1) {
        productoExistente.cantidad -= 1;
    } else if (productoExistente && productoExistente.cantidad === 1) {
        carrito = carrito.filter(item => item.producto !== producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    actualizarModal();
}

function eliminarDelCarrito(producto) {
    carrito = carrito.filter(item => item.producto !== producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    actualizarModal();
}

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('cartCount');
    contadorCarrito.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
}

function actualizarModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');  // Clase para estilizar el item
        li.innerHTML = `${item.producto} - $${item.precio.toFixed(2)} x ${item.cantidad}`;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.classList.add('btn-eliminar');  // Clase para el botón de eliminar
        eliminarBtn.onclick = () => eliminarDelCarrito(item.producto);
        li.appendChild(eliminarBtn);
        cartItems.appendChild(li);
        total += item.precio * item.cantidad;
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
    alert("Compra finalizada. ¡Gracias por tu compra!");
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    actualizarModal();
    cerrarCarrito();
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});

document.getElementById('cartIcon').addEventListener('click', abrirCarrito);
document.getElementById('closeCart').addEventListener('click', cerrarCarrito);

actualizarContadorCarrito();
actualizarModal();
