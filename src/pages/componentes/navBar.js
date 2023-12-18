const boton = document.querySelector("#boton");
const menu = document.querySelector("#menu-responsive");
const cerrarMenu = document.querySelector("#boton-cerrar-menu");

boton.addEventListener("click",()=>{
    console.log("el boton funciona")
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
})

cerrarMenu.addEventListener("click",()=>{
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
})