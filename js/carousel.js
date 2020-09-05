// Selecciona el carousel
const carousel = document.querySelector(".carousel");

// Selecciona boton derecho
const nextButton = document.querySelector(".right-btn");

//  Selecciona boton izquierdo
const previousButton = document.querySelector(".left-btn");


// Selecciona todos los slides del carousel
const slides = [...carousel.children];

// Por si tengo que recalcular el width
// let slideWidth = slides[0].getBoundingClientRect().width;


// Tamaño y posición de slides
function positionSlides(slides) {
  for (let index = 0; index < slides.length; index++) {
    slides[index].style.left = (260 * index) + "px";
  }
}

positionSlides(slides);

// Mover carousel a la izquierda (boton derecho)
nextButton.addEventListener("click", function () {
  const currentSlide = carousel.querySelector(".active");
  const nextSlide = currentSlide.nextElementSibling;

  moveToSlide(carousel, currentSlide, nextSlide);
  hideButton(nextSlide, slides);

});

// Mover carousel a la derecha (boton izquierdo)
previousButton.addEventListener("click", function () {
  const currentSlide = carousel.querySelector(".active");
  const previousSlide = currentSlide.previousElementSibling;

  moveToSlide(carousel, currentSlide, previousSlide);
  hideButton(previousSlide, slides);

});

// Movimiento de los slides
function moveToSlide(carousel, currentSlide, targetSlide) {
  const position = targetSlide.style.left;
  carousel.style.transform = `translateX(-${position})`;
  toggleActive(currentSlide, targetSlide);
}

// Toggle Clase "active"
function toggleActive(current, target) {
  current.classList.remove("active");
  target.classList.add("active");
}

// Esconder los botones
function hideButton(targetSlide, slides) {
  if (targetSlide === slides[0]) {            //Primer slide, boton izquierdo se esconde
    previousButton.classList.add("hide");
    nextButton.classList.remove("hide");
  } else if (targetSlide === slides[slides.length - 1]) {  //Ultimo slide, boton derecho se esconde
    nextButton.classList.add("hide");
    previousButton.classList.remove("hide");
  } else {                                    // En el centro, se muestran ambos botones
    previousButton.classList.remove("hide");
    nextButton.classList.remove("hide");
  }
}

// // Encontrar el index de un item dentro de un array de items
// function findIndex(item, items) {
//   for (let index = 0; index < items.length; index++) {
//     if (item === items[index]) {
//       return index;
//     }
//   }
// }



