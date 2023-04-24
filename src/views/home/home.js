import { main } from '../public/js/main.js';

const slider = document.querySelector(".slider");
const slides = slider.querySelector(".slides");
const slide = slides.querySelectorAll(".slide");

// slide 할 image width 구하기
function getImageWidth() {
  const img = new Image();
  
  img.src = "../public/images/img_sample_banner_1.png";
  return img.width;
}

const width = getImageWidth();
let currentSlide = 0;

// slide 5초씩 반복
setInterval(function() {
  let from = - (width * currentSlide);
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
}, 3000);

// 임시 카테고리 데이터
const categoryList = ['웹 개발', '프론트엔드', '백엔드', '모바일 앱 개발', '게임 개발', '알고리즘·자료구조', '데이터베이스'];

// 해당 카테고리 책 권수 
const productCounter = document.querySelector(".product-counter");

// 카테고리 html 생성
const createCategory = (category) => {
  return `<li class="nav-item category">
            <a class="nav-link clicked" href="#">${category}</a>
          </li>`
}

const categoryWrap = document.querySelector(".category");

// 카테고리 html 추가
categoryList.forEach(category => {
  const categoryEl = createCategory(category);
  categoryWrap.innerHTML += categoryEl;
});

const books = document.querySelector(".books");
const bookTitle = document.querySelector(".book-text.title");
const bookCategory = document.querySelector(".book-text.category");
const bookPrice = document.querySelector(".book-text.price");

// 책 html 생성
// href는 예시: /books/${book._id}
const createBook = (book) => {
  return `<div class="book">
            <a class="book-link" href="#">
              <div class="img-container">
                <img src="../public/images/sample_image.jpg" class="book-img" alt="${book.title}"/>
              </div>
              <div class="book-body">
                <div class="book-text title">${book.title}</div>
                <div class="book-text category">${book.category}</div>
                <div class="book-text price">${book.price.toLocaleString()}원</div>
              </div>
            </a>
          </div>`;
};

// 임시 책 데이터
const bookList = [{
  title: "프론트엔드 성능 최적화 가이드",
  category: categoryList[1],
  price: 19800
}, {
  title: "Hello IT 프론트엔드 개발을 시작하려고 해: 입문편",
  category: categoryList[1],
  price: 26550
}, {
  title: "Node.js 백엔드 개발자 되기",
  category: categoryList[2],
  price: 34200
}, {
  title: "백엔드를 위한 Django REST Framework with 파이썬",
  category: categoryList[2],
  price: 16200
}, {
  title: "인사이드 안드로이드 OS",
  category: categoryList[3],
  price: 25200
}, {
  title: "iOS 앱 개발을 위한 Swift 3",
  category: categoryList[3],
  price: 38700
}, {
  title: "유니티 2D 게임 개발",
  category: categoryList[4],
  price: 27000
}, {
  title: "Do it! 첫 알고리즘",
  category: categoryList[5],
  price: 16200
}, {
  title: "누구나 자료 구조와 알고리즘",
  category: categoryList[5],
  price: 29700
}, {
  title: "데이터베이스 개론",
  category: categoryList[6],
  price: 29000
}, {
  title: "제목 길다 길어 엄청 길어 완전 길어 제목 길다 길어 엄청 길어 완전 길어",
  category: categoryList[6],
  price: 29000
}, ];

// 책 html 추가
bookList.forEach(book => {
  const bookEl = createBook(book);
  books.innerHTML += bookEl;
});

// 페이지가 로드되면 실행
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  let isFirst = true;

  navLinks.forEach(link => {
    // 페이지가 로드 됐을 때 전체 카테고리로 보여줌
    if (isFirst) {
      link.classList.add("clicked");
      productCounter.textContent = `전체 (${bookList.length})`;
      isFirst = false;
    } else {
      link.classList.remove("clicked");
    }

    // 카테고리 누르면 해당 카테고리로 선택
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const clickedLink = document.querySelector(".nav-link.clicked");
      if (clickedLink) {
        clickedLink.classList.remove("clicked");
      }
      link.classList.add("clicked");

      // 책 초기화
      books.innerHTML = "";

      const findBookListByCategory = [];
      const clickedCategory = event.target.textContent;

      // 클릭한 카테고리별 책 배열에 담기
      bookList.forEach((book) => {
        if (book.category.includes(clickedCategory) || clickedCategory === "전체") {
          findBookListByCategory.push(book);
        }
      });

      productCounter.textContent = `${clickedCategory} (${findBookListByCategory.length})`;

      if (findBookListByCategory.length === 0) {
        books.classList.add("empty");
        books.innerHTML = `<div></div>
                          <div class="empty-book-list">상품이 없습니다</div>`;
      } else {
        books.classList.remove("empty");
        findBookListByCategory.forEach(book => {
          const newBook = createBook(book);
          books.innerHTML += newBook;
        });
      }
    });
  });
});

main();