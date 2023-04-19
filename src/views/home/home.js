const slider = document.querySelector("#slider");
const slides = slider.querySelector(".slides");
const slide = slides.querySelectorAll(".slide");

setInterval(slideImage, 5000);

function getImageWidth() {
  const img = new Image();
  
  img.src = "../../../public/images/img_sample.png";
  return img.width;
}

const width = getImageWidth();
let currentSlide = 0;

function slideImage() {
  let from = -(width * currentSlide);
  let to = from - width;   

  slides.animate({
    marginLeft: [from + "px", to + "px"]
  }, {
    duration: 1000,
    easing: "ease",
    iterations: 1,  
    fill: "both"
  });

  currentSlide++;

  if (currentSlide === (slide.length - 1)) {
    currentSlide = 0;
  }
}