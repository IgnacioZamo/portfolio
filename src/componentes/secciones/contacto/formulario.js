// Formulario de contacto: sin backend. Al enviar, abre el cliente de correo (mailto)
// con los datos cargados y registra el envío en Analytics.

import { registrarEvento } from "@scripts/analitica.js"

const form = document.querySelector("#formulario")
const DESTINATARIO = "ignaciozamo1@gmail.com"

// El formulario solo existe en la home: en otras páginas el script no tiene que fallar
if (form) form.addEventListener('submit', handleSubmit)


function handleSubmit (evento) {
    evento.preventDefault();
    const formu = new FormData(this);
    const asunto = `${formu.get('nombre')} - Telefono de contacto: ${formu.get('telefono')} - ${formu.get('email')}`
    const cuerpo = formu.get('mensaje')
    // generate_lead es el evento recomendado por GA4 para contactos; solo se mide el envío, nunca los datos del formulario
    registrarEvento('generate_lead', { metodo: 'formulario' })
    // encodeURIComponent evita que caracteres como &, # o ? del mensaje corten o rompan el enlace mailto
    window.location.href = `mailto:${DESTINATARIO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
}
