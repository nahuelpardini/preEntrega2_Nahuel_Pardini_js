const botonLogin = document.getElementById('boton');

botonLogin.addEventListener("click", ()=>{
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('contraseña').value;
    if(usuario == '' || password == '') {
        Swal.fire({
            icon: 'error',
            title: 'Algo va mal...',
            text: 'Tenés que completar todos los campos!',
        })
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido!',
            text: 'A Rock Store '+usuario,
        });
        setTimeout(() =>{
            localStorage.usuario = usuario;
            localStorage.password = password;
            window.location.href = './pages/main.html';
        }, 900);
    };
});