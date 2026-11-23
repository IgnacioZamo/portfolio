// Formulario de contacto: valida los campos con mensajes claros y envía el mensaje a
// Netlify Forms sin salir de la página. Si el envío falla, ofrece mandarlo desde el
// correo de la persona (mailto) o por WhatsApp, para no perder el contacto.

import { registrarEvento } from "@scripts/analitica.js";

const form = document.querySelector("#formulario");
const DESTINATARIO = "ignaciozamo1@gmail.com";

// Mensajes de error por campo (se muestran debajo de cada uno)
const reglas = {
  nombre: (valor) => (valor.trim() ? "" : "Escribí tu nombre."),
  email: (valor) => {
    if (!valor.trim()) return "Escribí tu correo para poder responderte.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim())
      ? ""
      : "Revisá el correo: parece incompleto (por ejemplo, nombre@gmail.com).";
  },
  mensaje: (valor) => (valor.trim().length >= 10 ? "" : "Contame un poco más sobre lo que necesitás (mínimo 10 caracteres)."),
};

if (form) {
  const zona = form.closest(".form-zona");
  const boton = form.querySelector("[data-enviar]");
  const textoBoton = form.querySelector("[data-enviar-texto]");
  const avisoError = form.querySelector("[data-form-error]");
  const linkMailto = form.querySelector("[data-mailto]");
  const exito = zona.querySelector("[data-form-exito]");
  const exitoNombre = zona.querySelector("[data-exito-nombre]");
  let intentoEnviar = false;

  // Con JS se usan los mensajes propios en lugar de los globos nativos del navegador
  form.noValidate = true;

  function validarCampo(nombre) {
    const campo = form.elements[nombre];
    const mensaje = reglas[nombre](campo.value);
    const error = form.querySelector(`#error-${nombre}`);
    error.textContent = mensaje;
    campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
    return !mensaje;
  }

  // Después del primer intento, cada campo se revalida mientras la persona escribe
  Object.keys(reglas).forEach((nombre) => {
    form.elements[nombre].addEventListener("input", () => { if (intentoEnviar) validarCampo(nombre); });
    form.elements[nombre].addEventListener("blur", () => { if (intentoEnviar) validarCampo(nombre); });
  });

  function armarMailto(datos) {
    const asunto = `${datos.get("nombre")} - Contacto desde el portfolio`;
    const cuerpo = `${datos.get("mensaje")}\n\nNombre: ${datos.get("nombre")}\nCorreo: ${datos.get("email")}\nTeléfono: ${datos.get("telefono") || "-"}`;
    // encodeURIComponent evita que caracteres como &, # o ? corten el enlace
    return `mailto:${DESTINATARIO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  }

  function enviando(activo) {
    boton.disabled = activo;
    textoBoton.textContent = activo ? "Enviando…" : "Enviar mensaje";
  }

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    intentoEnviar = true;
    avisoError.hidden = true;

    const validos = Object.keys(reglas).map(validarCampo);
    if (validos.includes(false)) {
      // Lleva el foco al primer campo con error
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const datos = new FormData(form);
    enviando(true);
    try {
      const respuesta = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(datos).toString(),
      });
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

      registrarEvento("generate_lead", { metodo: "formulario" });
      const nombre = String(datos.get("nombre")).trim().split(" ")[0];
      exitoNombre.textContent = nombre ? `, ${nombre}` : "";
      form.hidden = true;
      exito.hidden = false;
      exito.focus();
      form.reset();
      intentoEnviar = false;
    } catch {
      // Falló el envío (sin conexión o en desarrollo local): se ofrecen otras vías
      linkMailto.href = armarMailto(datos);
      avisoError.hidden = false;
    } finally {
      enviando(false);
    }
  });

  zona.querySelector("[data-otro-mensaje]").addEventListener("click", () => {
    exito.hidden = true;
    form.hidden = false;
    form.elements.nombre.focus();
  });
}
