const boton = document.querySelector("#boton");
const menuResponsive = document.querySelector("#menu-responsive");
const cerrarMenu = document.querySelector("#boton-cerrar-menu");

const menuLinks = document.querySelectorAll('#menu-responsive div ul li a[href^="#"]');



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

menuLinks.forEach(menulink =>{
    menulink.addEventListener("click",function(){
    menuResponsive.classList.toggle("hidden");
    menuResponsive.classList.toggle("flex");
    })
})

