class Datos {
    constructor(email, asunto, mensaje) {
        this.email = email;
        this.asunto = asunto;
        this.mensaje = mensaje;

    }
}

class Interface {

    AgregarAlLocalStorage(obj) {
        let localStorageKeyName = 'data';
        let contact = [];
        let dataInLocalStorage = localStorage.getItem(localStorageKeyName);
        if (dataInLocalStorage !== null) {
            contact = JSON.parse(dataInLocalStorage);
        }
        //Agrego lo del formulario al contact
        contact.push(obj);
        //Subo al LS lo que hay en contact con el nombre de data
        localStorage.setItem(localStorageKeyName, JSON.stringify(contact));

        this.LimpiarFormulario();
        this.CargarLocalStorage();
    }
    CargarLocalStorage() {
        //Nombre de la Key en el LS
        let localStorageKeyName = 'data';

        let contact = [];
        let dataInLocalStorage = localStorage.getItem(localStorageKeyName);

        if (dataInLocalStorage !== null) {
            contact = JSON.parse(dataInLocalStorage);
        }

        let gridBody = document.getElementById("datos-list");
        gridBody ? gridBody.innerHTML = '' : gridBody = '';
        //Recorro al array de contactos y los muestro
        contact.forEach(function (x, i) {

            let contenido = document.createElement('div');
            contenido.innerHTML = `
           
                <div class="item">
                    <div>
                        <div>
                            <strong>Email</strong>:${x.email}
                        </div>
                        <div>
                            <strong>Asunto</strong>:${x.asunto}
                        </div>
                        <div>
                            <strong>Mensaje</strong>:${x.mensaje}
                        </div>
                    </div>
                    <div class="content-text">
                        <button class="btn btn-danger btn-xs" id="eliminar" name="eliminar">X</button>
                    </div>
                    
                </div>
            
            `;
            //Anido lo recorrido con el datos-list que ya tengo.
            gridBody ? gridBody.appendChild(contenido) : gridBody = '';
        });
    }
    eliminar(index) {
        let localStorageKeyName = 'data';
        let contact = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName);

        contact = JSON.parse(dataInLocalStorage);

        contact.splice(index, 1);

        localStorage.setItem(localStorageKeyName, JSON.stringify(contact));

        this.CargarLocalStorage();

    }
    Buscar(obj) {
        let localStorageKeyName = 'data';
        let contact = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName);
        contact = JSON.parse(dataInLocalStorage);
        let gridBody = document.getElementById("datos-list");
        gridBody ? gridBody.innerHTML = '' : gridBody = '';
        let divNew = document.createElement('div');
        let cantSearch = 0;
        let cantTotal = contact.length;
        for (let s = 0; s < contact.length; s++) {
            if (contact[s].email == obj) {
                divNew.innerHTML += `
                
                    <div class="item">
                        <div>
                            <div>
                                <strong>Email</strong>:${contact[s].email} 
                            </div>
                            <div>
                                <strong>Asunto</strong>:${contact[s].asunto}
                            </div>
                            <div>  
                                <strong>Mensaje</strong>:${contact[s].mensaje}
                            </div>
                        </div>
                        <div class="content-text">
                            <button class="btn btn-danger btn-xs" id="eliminar" name="eliminar">X</button>
                        </div>
                    </div>`;
                cantSearch++;

            } else if (obj == '') {
                divNew.innerHTML += `
                    <div class="item">
                        <div>
                            <div>
                                <strong>Email</strong>:${contact[s].email} 
                            </div>
                            <div>
                                <strong>Asunto</strong>:${contact[s].asunto}
                            </div>
                            <div>
                                <strong>Mensaje</strong>:${contact[s].mensaje}
                            </div>
                        </div>
                        <div class="content-text">
                            <button class="btn btn-danger btn-xs" id="eliminar" name="eliminar">X</button>
                        </div>
                    </div>`;
            }
            else {
                divNew.innerHTML += '';
            }
        }

        gridBody ? gridBody.appendChild(divNew) : gridBody = '';
        return cantSearch;
    }
    LimpiarFormulario() {

        document.getElementById('datos-formulario').reset();
        this.CargarLocalStorage();
    }

    MostrarMensaje(mensaje, clase) {

        let msj = document.createElement('div');
        msj.className = `alert alert-${clase}`;
        msj.appendChild(document.createTextNode(mensaje));
        let contenedor = document.querySelector('.container');
        let app = document.querySelector('#App');
        contenedor.insertBefore(msj, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 1500);

    }

}
//Eventos DOM
//CARGO SIEMPRE EL LISTADO DE CONTACTOS DEL LS
const interface = new Interface();
interface.CargarLocalStorage();

let subtitulo = document.getElementById('contacto');

if (subtitulo.textContent == "Contacto") {
    document.getElementById('datos-formulario')
        .addEventListener('submit', function (e) {
            let localStorageKeyName = 'data';
            let email = document.getElementById('email').value;
            let asunto = document.getElementById('asunto').value;
            let mensaje = document.getElementById('mensaje').value;
            const datos = new Datos(email, asunto, mensaje);

            const interface = new Interface();

            if (email == '' || asunto == '' || mensaje == '') {
                return interface.MostrarMensaje('Complete los campos por favor', 'danger');
            }
            interface.AgregarAlLocalStorage(datos);
            interface.LimpiarFormulario();
            interface.MostrarMensaje('Agregado correctamente', 'success');
            e.preventDefault();

        });

} else if (subtitulo.textContent == "Lista de Contacto") {
    document.getElementById('buscador').addEventListener('keyup', function (e) {
        let buscador = document.getElementById('buscador').value;
        let cantEncontrado = document.getElementById('cant');

        interface.Buscar(buscador);
        let val = interface.Buscar(buscador);
        cantEncontrado.innerHTML = val;

        e.preventDefault();

    });
    document.getElementById('eliminar').addEventListener('click', function (e) {
        const interface = new Interface();
        interface.eliminar(e.target);
    });

}
