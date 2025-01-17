function buscarContenido() {
    const input = document.getElementById('busqueda').value.toLowerCase();
    const cards = document.querySelectorAll('.confeccion-card, .holiday-card');

    cards.forEach(card => {
        const texto = card.innerText.toLowerCase();
        if (texto.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
