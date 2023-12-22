const boton = document.querySelector("#boton");
const menuResponsive = document.querySelector("#menu-responsive");
const cerrarMenu = document.querySelector("#boton-cerrar-menu");


boton.addEventListener("click",()=>{
    console.log("el boton funciona");
    menuResponsive.classList.toggle("flex");
    menuResponsive.classList.toggle("hidden");

})

cerrarMenu.addEventListener("click",()=>{
    console.log("el boton funciona2");
    menuResponsive.classList.toggle("hidden");
    menuResponsive.classList.toggle("flex");

})