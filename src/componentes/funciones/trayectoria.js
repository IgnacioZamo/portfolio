// Pestañas de Trayectoria: patrón ARIA "tabs" con activación automática
// (flechas, Inicio y Fin mueven el foco y abren la pestaña).
import { registrarEvento } from "./analitica.js";

const listaTabs = document.querySelector("[data-tabs]");

if (listaTabs) {
  const tabs = [...listaTabs.querySelectorAll('[role="tab"]')];
  const indicador = listaTabs.querySelector(".tab-ink");
  const movimientoReducido = matchMedia("(prefers-reduced-motion: reduce)");

  function moverIndicador(tab, animar = true) {
    if (!indicador || !tab) return;
    // Sin animación al cargar, para que el indicador no "viaje" desde la izquierda
    if (!animar) indicador.style.transition = "none";
    indicador.style.width = `${tab.offsetWidth}px`;
    indicador.style.transform = `translateX(${tab.offsetLeft}px)`;
    if (!animar) {
      void indicador.offsetWidth;
      indicador.style.transition = "";
    }
  }

  function abrirTab(tab, { animar = true, enfocar = false } = {}) {
    tabs.forEach((actual) => {
      const activa = actual === tab;
      actual.classList.toggle("on", activa);
      actual.setAttribute("aria-selected", String(activa));
      actual.tabIndex = activa ? 0 : -1;

      const panel = document.getElementById(actual.getAttribute("aria-controls"));
      if (!panel) return;
      panel.hidden = !activa;
      panel.classList.remove("enter");
      if (activa && animar && !movimientoReducido.matches) {
        // Forzar reflow reinicia la animación aunque se vuelva a la misma pestaña
        void panel.offsetWidth;
        panel.classList.add("enter");
      }
    });
    moverIndicador(tab, animar);
    if (enfocar) tab.focus();
    // Solo se mide cuando la persona cambia de pestaña (no la apertura inicial)
    if (animar) registrarEvento("ver_pestana_trayectoria", { pestana: tab.dataset.tab });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => abrirTab(tab));
    tab.addEventListener("keydown", (evento) => {
      const total = tabs.length;
      const destinos = {
        ArrowRight: (i + 1) % total,
        ArrowLeft: (i - 1 + total) % total,
        Home: 0,
        End: total - 1,
      };
      if (!(evento.key in destinos)) return;
      evento.preventDefault();
      abrirTab(tabs[destinos[evento.key]], { enfocar: true });
    });
  });

  // ?tab=skills abre una pestaña concreta (útil para compartir un enlace directo)
  const pedida = new URLSearchParams(location.search).get("tab");
  const inicial = tabs.find((tab) => tab.dataset.tab === pedida) ?? tabs[0];
  abrirTab(inicial, { animar: false });

  // Recalcula el indicador si cambia el ancho (resize, carga de fuentes)
  const tabActiva = () => tabs.find((tab) => tab.getAttribute("aria-selected") === "true");
  new ResizeObserver(() => moverIndicador(tabActiva(), false)).observe(listaTabs);
  document.fonts?.ready.then(() => moverIndicador(tabActiva(), false));
}
