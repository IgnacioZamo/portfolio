const form = document.querySelector("#formulario")
const DESTINATARIO = "ignaciozamo1@gmail.com"

form.addEventListener('submit', handleSubmit)


function handleSubmit (evento) {
    evento.preventDefault();
    const formu = new FormData(this);
    const asunto = `${formu.get('nombre')} - Telefono de contacto: ${formu.get('telefono')} - ${formu.get('email')}`
    const cuerpo = formu.get('mensaje')
    // encodeURIComponent evita que caracteres como &, # o ? del mensaje corten o rompan el enlace mailto
    window.location.href = `mailto:${DESTINATARIO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
}