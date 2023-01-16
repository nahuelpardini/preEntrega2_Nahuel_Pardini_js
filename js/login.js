function login() { 
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('contraseña').value;

    if(usuario == '' || password == '') {
        alert('Todos los campos son requeridos');
    } else {
        alert('Iniciaste sesión correctamente!')
        localStorage.usuario = usuario;
        localStorage.password = password;
        window.location.href = 'index.html';
    };
};