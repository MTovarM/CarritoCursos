//Variables
const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#cursos');
const contenedorCarrito = document.querySelector('#lista tbody');
const vaciar = document.querySelector('#vaciar-carrito');
let cursosCarrito = [];

cargarEventListener();

function cargarEventListener() {
    cursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    vaciar.addEventListener('click', () => {
        cursosCarrito = [];
        limpiarHTML();
    });
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        leerCurso(e.target.parentElement.parentElement);
    }
}

function leerCurso(curso) {
    const card = {
        id: curso.querySelector('a').getAttribute('data-id'),
        titulo: curso.querySelector('h4').textContent,
        profesor: curso.querySelector('p').textContent,
        imagen: curso.querySelector('img').src,
        precio: curso.querySelector('.precio .u-pull-right').textContent,
        cantidad: 1
    }

    const existe = cursosCarrito.some(c => c.id === card.id);
    if (existe) {
        const curses = cursosCarrito.map(c => {
            if (c.id === card.id) {
                c.cantidad++;
                return c;
            } else return c;
        });
        cursosCarrito = [...curses];
    }
    else cursosCarrito = [...cursosCarrito, card];
    llenarHTMLCarrito();
}

function llenarHTMLCarrito() {
    limpiarHTML();
    cursosCarrito.forEach( c => {
        const {imagen, titulo, precio, cantidad, id} = c;
        const fila = document.createElement('tr');
        const htitulo = document.createElement('td');
        const himagen = document.createElement('td');
        const src = document.createElement('img');
        const hprecio = document.createElement('td');
        const hcantidad = document.createElement('td');
        const borrar = document.createElement('td');
        const borrarC = document.createElement('a');
        htitulo.textContent = titulo;
        src.src = imagen;
        src.width = 150;
        himagen.appendChild(src);
        hprecio.textContent = precio;
        hcantidad.textContent = cantidad;
        borrarC.textContent = '😥';
        borrarC.classList.add('borrar-curso');
        borrarC.href = '#';
        const att = document.createAttribute('data-id');
        att.value = id;
        borrarC.setAttributeNode(att);
        borrar.appendChild(borrarC);

        fila.appendChild(himagen);
        fila.appendChild(htitulo);
        fila.appendChild(hprecio);
        fila.appendChild(hcantidad);
        fila.appendChild(borrar);
        contenedorCarrito.appendChild(fila);
    });
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) contenedorCarrito.removeChild(contenedorCarrito.firstChild);
}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const id = e.target.getAttribute('data-id');
        cursosCarrito = cursosCarrito.filter(c => c.id !== id);
        llenarHTMLCarrito();
    }
}
