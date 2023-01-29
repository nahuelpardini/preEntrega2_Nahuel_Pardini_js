const carroCarrito = () => {
    modalContainer.innerHTML = "",
    modalContainer.style.display = "flex";
    const modalHeaderCarrito = document.createElement("div");
    modalHeaderCarrito.className = "modal-header";
    modalHeaderCarrito.innerHTML = `
        <h1 class="modal-header-titulo">Tu Carrito</h1>
    `;
    modalContainer.append(modalHeaderCarrito);

    const modalBoton = document.createElement("h1");
    modalBoton.innerText = "x";
    modalBoton.className = "modal-header-boton";

    modalBoton.addEventListener("click", ()=>{
        modalContainer.style.display = "none";
    });

    modalHeaderCarrito.append(modalBoton);

    carrito.forEach((producto) => {
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "modal-contenido";
        contenidoCarrito.innerHTML = `
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio} U$D</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${producto.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${producto.cantidad * producto.precio}</p>
            <span class="eliminar-producto"> ❌ </span>
        `;

        modalContainer.append(contenidoCarrito);

        let restar = contenidoCarrito.querySelector(".restar");

        restar.addEventListener("click", ()=>{
            if(producto.cantidad !== 1) {
                producto.cantidad--;
            }
            guardarLocal();
            carroCarrito();
        })

        let sumar = contenidoCarrito.querySelector(".sumar");

        sumar.addEventListener("click", ()=>{
            producto.cantidad++;
            guardarLocal();
            carroCarrito();
        })

        let eliminar = contenidoCarrito.querySelector(".eliminar-producto");

        eliminar.addEventListener("click", ()=>{
            eliminarProducto(producto.id);
        });
    });

    const total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad, 0);

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-contenido";
    totalCompra.innerHTML = `Total: ${total} U$D`;
    modalContainer.append(totalCompra);

    const botonComprar = document.createElement("div")
    botonComprar.className = "botonComprar"
    botonComprar.innerHTML = `
    <button class="boton-comprar">FINALIZAR COMPRA</button>
    `;
    modalContainer.append(botonComprar);

    botonComprar.addEventListener("click", ()=>{
        Swal.fire({
            title: 'Desea finalizar su compra?',
            showCancelButton: true,
            confirmButtonText: 'Si',
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Su compra ha sido finalizada!')
            }
            });
    });
};

verCarrito.addEventListener("click", carroCarrito);

const eliminarProducto = (id)=>{
    const encontrarId = carrito.find((producto) => producto.id === id);

    carrito = carrito.filter((carritoId)=>{
        return carritoId !== encontrarId;
    });

    contadorCarrito();
    guardarLocal();
    carroCarrito();
};

const contadorCarrito = ()=>{
    cantidadCompra.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCompra.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

contadorCarrito();