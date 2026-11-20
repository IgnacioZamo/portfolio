// Fondo de estrellas del diseño. Se dibuja una sola vez por tamaño (no se anima)
// para no gastar CPU, y se vuelve a dibujar cuando cambia el alto de la página
// (por ejemplo, al cambiar de pestaña en Trayectoria o filtrar proyectos).
const lienzo = document.getElementById("stars");

if (lienzo instanceof HTMLCanvasElement) {
  const ctx = lienzo.getContext("2d");
  let anchoPrevio = 0;
  let altoPrevio = 0;

  function dibujar() {
    const ancho = document.body.clientWidth;
    const alto = document.body.offsetHeight;
    if (!ctx || (ancho === anchoPrevio && alto === altoPrevio)) return;
    anchoPrevio = ancho;
    altoPrevio = alto;
    lienzo.width = ancho;
    lienzo.height = alto;

    // Generador pseudoaleatorio con semilla fija: las estrellas quedan siempre en el mismo lugar
    let semilla = 7;
    const azar = () => (semilla = (semilla * 9301 + 49297) % 233280) / 233280;

    const cantidad = (ancho * alto) / 9000;
    for (let i = 0; i < cantidad; i++) {
      ctx.fillStyle = azar() > 0.85
        ? "rgba(45,212,191,.7)"
        : `rgba(148,163,184,${0.15 + azar() * 0.35})`;
      ctx.beginPath();
      ctx.arc(azar() * ancho, azar() * alto, azar() * 1.2 + 0.3, 0, 7);
      ctx.fill();
    }
  }

  new ResizeObserver(dibujar).observe(document.body);
}
