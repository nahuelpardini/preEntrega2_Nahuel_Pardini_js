const contenidoTienda = document.getElementById("contenidoTienda");
const verCarrito = document.getElementById("verCarro");
const modalContainer = document.getElementById("modal-container");
const cantidadCompra = document.getElementById("cantidadCompra");
const botonEnviar = document.getElementById('enviarConsulta');

let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

const pedirPosts = async () => {
    const resp = await fetch("../local.json");
    const data = await resp.json();

    data.forEach((producto) => {
        let contenido = document.createElement("div");
        contenido.className = "card";
        contenido.innerHTML = `
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p class="precio">${producto.precio} U$D</p>
        `;
        
        contenidoTienda.append(contenido);

        let comprar = document.createElement("button");
        comprar.innerText = "COMPRAR";
        comprar.className = "comprar";

        contenido.append(comprar);

        comprar.addEventListener("click", () =>{

            Toastify({
                text: "Se agregó el producto al carrito de compras!",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #736c6c, #020024)",
                }
            }).showToast();
            
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
};

pedirPosts();

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
        Swal.fire({
            icon: 'error',
            title: 'Algo va mal...',
            text: 'Tenés que completar todos los campos para poder envíar tu consulta!',
        });
    } else {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Muchas gracias!',
            text: 'Su consulta fue envíada satisfactoriamente, le responderemos en su correo: '+correo,
        });
    };
});

