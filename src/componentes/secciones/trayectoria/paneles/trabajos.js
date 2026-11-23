// Modal de Trabajos: abre el video, la imagen o el embed de YouTube en grande.
// El video se crea recién al abrir, así no se descarga hasta que la persona lo pide.
import { registrarEvento } from "@scripts/analitica.js";

const modal = document.querySelector("#modal-trabajo");

if (modal instanceof HTMLDialogElement) {
  const contenedor = modal.querySelector("[data-modal-media]");
  const titulo = modal.querySelector("[data-modal-titulo]");
  const descripcion = modal.querySelector("[data-modal-descripcion]");

  function crearMedia(boton) {
    const { tipo, src, poster } = boton.dataset;

    // Sin archivo cargado en el JSON: se amplía la portada de la tarjeta
    if (!src) return boton.querySelector(".media-preview").cloneNode(true);

    if (tipo === "imagen") {
      const imagen = document.createElement("img");
      imagen.src = src;
      imagen.alt = boton.dataset.titulo ?? "";
      return imagen;
    }

    if (tipo === "youtube") {
      const iframe = document.createElement("iframe");
      // youtube-nocookie no deja cookies de seguimiento hasta que se reproduce
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(src)}?autoplay=1&rel=0`;
      iframe.title = boton.dataset.titulo ?? "Video";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      return iframe;
    }

    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "metadata";
    if (poster) video.poster = poster;
    return video;
  }

  document.querySelectorAll("[data-trabajo]").forEach((boton) => {
    boton.addEventListener("click", () => {
      contenedor.replaceChildren(crearMedia(boton));
      titulo.textContent = boton.dataset.titulo ?? "";
      descripcion.textContent = boton.dataset.descripcion ?? "";
      modal.showModal();
      registrarEvento("ver_trabajo", { trabajo: boton.dataset.titulo, tipo: boton.dataset.tipo });
    });
  });

  // Vaciar al cerrar detiene el video o el embed
  modal.addEventListener("close", () => contenedor.replaceChildren());

  // Clic en el fondo oscuro (fuera de la caja) cierra el modal
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) modal.close();
  });
}
