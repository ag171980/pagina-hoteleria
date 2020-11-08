/*CODE MENU JS*/
const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
    if (!menuOpen) {
        menuBtn.classList.add("open");
        menuOpen = true;
    } else {
        menuBtn.classList.remove("open");
        menuOpen = false;
    }
});
$(document).ready(function () {
    $(".menu-btn").click(function () {
        $(".desplegable").slideToggle();
    });
});

ScrollReveal().reveal('.primero', { delay: 150, reset: true });
ScrollReveal().reveal('.segundo', { delay: 250, reset: true });
/*CODE SLIDER JS*/
let indice = 1;
muestraSlides(indice);

function avanzaSlide(n) {
    muestraSlides(indice += n);
}
function posicionSlide(n) {
    muestraSlides(indice = n);
}

setInterval(function tiempo() {
    muestraSlides(indice += 1);
}, 5000);

function muestraSlides(n) {
    let i;
    let slides = document.getElementsByClassName('miSlider');
    let barras = document.getElementsByClassName('barra');

    if (n > slides.length) {
        indice = 1;
    }
    if (n < 1) {
        indice = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (j = 0; j < barras.length; j++) {
        barras[j].className = barras[j].className.replace(' active', '');
    }
    slides[indice - 1].style.display = 'block';
    barras[indice - 1].className += ' active';
}
