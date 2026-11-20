// Filtro de la grilla de proyectos (Todos / Proyectos / Práctica / En equipo)
const grupoFiltros = document.querySelector("[data-filtros]");

if (grupoFiltros) {
  const botones = [...grupoFiltros.querySelectorAll("[data-filtro]")];
  const proyectos = [...document.querySelectorAll("[data-categoria]")];
  const estado = document.querySelector("[data-filtro-estado]");
  const movimientoReducido = matchMedia("(prefers-reduced-motion: reduce)");

  function filtrar(valor) {
    botones.forEach((boton) => {
      const activo = boton.dataset.filtro === valor;
      boton.classList.toggle("on", activo);
      boton.setAttribute("aria-pressed", String(activo));
    });

    let visibles = 0;
    proyectos.forEach((proyecto) => {
      const mostrar = valor === "todos" || proyecto.dataset.categoria === valor;
      proyecto.hidden = !mostrar;
      proyecto.classList.remove("entra");
      if (mostrar) {
        visibles++;
        if (!movimientoReducido.matches) {
          void proyecto.offsetWidth;
          proyecto.classList.add("entra");
        }
      }
    });

    // Anuncio para lectores de pantalla: el cambio de la grilla no es visible para ellos
    if (estado) estado.textContent = `Mostrando ${visibles} ${visibles === 1 ? "proyecto" : "proyectos"}`;
  }

  botones.forEach((boton) => {
    boton.addEventListener("click", () => filtrar(boton.dataset.filtro));
  });
}
