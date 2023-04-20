const slider = document.querySelector("#slider");
const slides = slider.querySelector(".slides");
const slide = slides.querySelectorAll(".slide");
const categoryWrap = document.querySelector("#category");

const width = getImageWidth();
let currentSlide = 0;

// slide 5초씩 반복
setInterval(slideImage, 5000);

// slide 할 image width 구하기
function getImageWidth() {
  const img = new Image();
  
  img.src = "../../../public/images/img_sample.png";
  return img.width;
}

// slide animation
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

// 임시 카테고리 데이터
const categoryList = ['웹 개발', '프론트엔드', '백엔드', '모바일 앱 개발', '게임 개발', '알고리즘·자료구조', '데이터베이스'];

// 해당 카테고리 책 권수 
const productCounter = document.getElementById("product-counter");

// 카테고리 html 생성
const createCategory = (category) => {
  return `<li class="nav-item category">
            <a class="nav-link clicked" href="#">${category}</a>
          </li>`
}

// 카테고리 html 추가
categoryList.forEach(category => {
  const categoryEl = createCategory(category);
  categoryWrap.innerHTML += categoryEl;
});

// 페이지가 로드되면 실행
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  let isFirst = true;

  // 카테고리 누르면 해당 카테고리로 선택
  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const clickedLink = document.querySelector(".nav-link.clicked");
      if (clickedLink) {
        clickedLink.classList.remove("clicked");
      }

      link.classList.add("clicked");
      productCounter.textContent = `${event.target.textContent} (0)`;
    });
  });

  // 처음 실행되면 카테고리 중 전체가 선택 됨
  navLinks.forEach((link) => {
    if (isFirst) {
      link.classList.add("clicked");
      productCounter.textContent = `전체 (0)`;
      isFirst = false;
    } else {
      link.classList.remove("clicked");
    }
  });
});