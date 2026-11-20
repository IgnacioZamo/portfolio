// Eventos de Google Analytics.
// gtag vive dentro del worker de Partytown; en la página existe una versión que reenvía
// las llamadas (ver "forward" en astro.config.mjs). En desarrollo GA no se carga y
// registrarEvento no hace nada.
export function registrarEvento(nombre, parametros = {}) {
  if (!import.meta.env.PROD || typeof window.gtag !== "function") return;
  window.gtag("event", nombre, parametros);
}

// Cualquier elemento con data-evento="nombre" envía ese evento al hacer clic.
// Los atributos data-evento-* se convierten en parámetros:
//   data-evento-ubicacion="header"  →  { ubicacion: "header" }
export function escucharClics() {
  document.addEventListener("click", (evento) => {
    const elemento = evento.target instanceof Element ? evento.target.closest("[data-evento]") : null;
    if (!elemento) return;

    const parametros = {};
    for (const [clave, valor] of Object.entries(elemento.dataset)) {
      if (clave === "evento" || !clave.startsWith("evento")) continue;
      const nombre = clave.slice("evento".length);
      parametros[nombre.charAt(0).toLowerCase() + nombre.slice(1)] = valor;
    }
    registrarEvento(elemento.dataset.evento, parametros);
  });
}
