const contenidoTienda = document.getElementById("contenidoTienda");
const verCarrito = document.getElementById("verCarro");
const modalContainer = document.getElementById("modal-container");
const cantidadCompra = document.getElementById("cantidadCompra");
const botonEnviar = document.getElementById('enviarConsulta');
const iniciarSesion = document.getElementById('boton');


let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

productos.forEach((producto) => {
    let contenido = document.createElement("div");
    contenido.className = "card";
    contenido.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p class="precio">${producto.precio} U$D</p>
    `;

    contenidoTienda.append(contenido);

    let agregarAlCarrito = document.createElement("button");
    agregarAlCarrito.innerText = "Agregar Al Carrito";
    agregarAlCarrito.className = "agregarAlCarrito";

    contenido.append(agregarAlCarrito);

    agregarAlCarrito.addEventListener("click", () =>{

    const repetir = carrito.some((repetirProducto) => repetirProducto.id === producto.id);

    if (repetir) {
        carrito.map((produ) => {
            if(produ.id === producto.id) {
                produ.cantidad++;
            }
        });
    } else {
        carrito.push({
            id: producto.id,
            img: producto.img,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad,
        });
        contadorCarrito();
        guardarLocal();
    }
    });
});

const guardarLocal = ()=>{
    localStorage.setItem("Carrito", JSON.stringify(carrito));
};

botonEnviar.addEventListener("click", (e) => {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let correo = document.getElementById('correo').value;
    let mensaje = document.getElementById('mensaje').value;
    
    
    if (nombre == '' || apellido == '' || correo == '' || mensaje == '') {
        e.preventDefault();
        alert ('Tiene que completar todos los campos para poder gestionar su consulta')
    } else {
        alert('Su consulta fue envíada satisfactoriamente, le responderemos en su correo: '+correo+'.');
    };
});

