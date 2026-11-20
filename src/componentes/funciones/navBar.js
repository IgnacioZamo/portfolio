const boton = document.querySelector("#boton");
const menuResponsive = document.querySelector("#menu-responsive");

function abrirMenu(abierto) {
  menuResponsive.hidden = !abierto;
  boton.setAttribute("aria-expanded", String(abierto));
  boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
}

if (boton && menuResponsive) {
  boton.addEventListener("click", () => abrirMenu(menuResponsive.hidden));

  // Al elegir una sección, el menú se cierra para no tapar el contenido
  menuResponsive.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => abrirMenu(false));
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !menuResponsive.hidden) {
      abrirMenu(false);
      boton.focus();
    }
  });

  document.addEventListener("click", (evento) => {
    const fuera = !menuResponsive.contains(evento.target) && !boton.contains(evento.target);
    if (!menuResponsive.hidden && fuera) abrirMenu(false);
  });

  // Si se agranda la ventana a desktop con el menú abierto, se resetea el estado
  matchMedia("(min-width: 1025px)").addEventListener("change", (evento) => {
    if (evento.matches) abrirMenu(false);
  });
}

// Resalta en el menú la sección que se está viendo. Solo aplica a los enlaces que
// apuntan a secciones de esta misma página: en /trayectoria el activo lo fija el servidor.
const normalizar = (ruta) => ruta.replace(/\/$/, "") || "/";
const enlacesNav = [...document.querySelectorAll("[data-nav-link]")].filter((enlace) => {
  const destino = new URL(enlace.href);
  return destino.hash && normalizar(destino.pathname) === normalizar(location.pathname);
});
const secciones = [...new Set(enlacesNav.map((enlace) => new URL(enlace.href).hash))]
  .map((hash) => document.querySelector(hash))
  .filter(Boolean);

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    const id = `#${entrada.target.id}`;
    enlacesNav.forEach((enlace) => {
      const activo = new URL(enlace.href).hash === id;
      enlace.classList.toggle("active", activo);
      if (activo) enlace.setAttribute("aria-current", "true");
      else enlace.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-45% 0px -50% 0px" });

secciones.forEach((seccion) => observador.observe(seccion));
