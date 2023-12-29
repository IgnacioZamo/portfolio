const form = document.querySelector("#formulario")
const mail = document.querySelector("#correo")

form.addEventListener('submit', handleSubmit)


function handleSubmit (evento) {
    evento.preventDefault();
    const formu = new FormData(this);
    mail.setAttribute('href',`mailto:ignaciozamo1@gmail.com?subject=${formu.get('nombre')} - Telefono de contacto: ${formu.get('telefono')} - ${formu.get('email')}&body=${formu.get('mensaje')} ||  `)
    mail.click();
}