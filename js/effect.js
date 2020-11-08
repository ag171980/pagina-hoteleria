let email = document.getElementById('email');
let asunto = document.getElementById('asunto');
let mensaje = document.getElementById('mensaje');
let button = document.getElementById('submit');

button.addEventListener('click', function (e) {
    if (email.value != '' && asunto.value != '' && mensaje.value != '') {
        console.log('Todos los campos completos');
    } else {
        console.log('Por favor complete todos los campos.')
    }


    /*if (email.value == '' && asunto.value != '' && mensaje.value != '') {
        console.log('Falta el email');
    } else if(email.value != '' && asunto.value == '' && mensaje.value != ''){
        console.log('Falta el asunto');
    } else if(email.value != '' && asunto.value != '' && mensaje.value == ''){
        console.log('Falta el mensaje');
    } else if(email.value == '' && asunto.value == '' && mensaje.value == ''){
        console.log('Todos los campos incompletos')
    }*/
    
})