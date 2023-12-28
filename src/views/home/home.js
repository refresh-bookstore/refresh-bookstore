import { main } from "/public/js/main.js";

const slider = document.querySelector(".slider");
const slides = slider.querySelector(".slides");
const slide = slides.querySelectorAll(".slide");
const categoryWrap = document.querySelector(".category-title");
const booksContainer = document.querySelector(".books");
const productCounter = document.querySelector(".product-counter");

let currentSlide = 0;
let textStatus = 1;

// 슬라이드 애니메이션 설정
setInterval(function () {
  let from = -(1024 * currentSlide);
  let to = from - 1024;

  slides.animate(
    {
      marginLeft: [from + "px", to + "px"],
    },
    {
      duration: 1000,
      easing: "ease",
      iterations: 1,
      fill: "both",
    },
  );

  currentSlide++;
  if (currentSlide === slide.length - 1) {
    currentSlide = 0;
  }
}, 5000);

// 텍스트 변경 애니메이션
setInterval(() => {
  const changingText = document.querySelector(".el-slogan");
  changingText.innerHTML = `당신의 { <i><b>마음</b></i> } 을 리프레시하는 서점`;
  if (textStatus === 4) {
    textStatus = 1;
  } else if (textStatus === 1) {
    changingText.innerHTML = `당신의 { <i><b>내일</b></i> } 을 리프레시하는 서점`;
    textStatus += 1;
  } else if (textStatus === 2) {
    changingText.innerHTML = `당신의 { <i><b>작업</b></i> } 을 리프레시하는 서점`;
    textStatus += 1;
  } else if (textStatus === 3) {
    changingText.innerHTML = `당신의 { <i><b>세상</b></i> } 을 리프레시하는 서점`;
    textStatus += 1;
  }
}, 1000);

// 카테고리 HTML 생성
const createCategory = (category) => {
  return `<li class="nav-item category">
            <a class="nav-link" data-category-id="${category.categoryId}">${category.name}</a>
          </li>`;
};

// 책 HTML 생성
const createBook = (book) => {
  return `<div class="book">
            <a class="book-link" href="/book-detail/?isbn=${book.isbn}">
              <div class="img-container">
                <img src="${book.imagePath}" class="book-img" alt="${
                  book.title
                }"/>
              </div>
              <div class="book-body">
                <div class="book-text title">${book.title}</div>
                <div class="book-text category">#${book.category}</div>
                <div class="book-text price">${book.price.toLocaleString()}원</div>
              </div>
            </a>
          </div>`;
};

// 카테고리 선택 시 책 목록을 서버에서 가져오는 함수
function fetchBooksByCategoryId(categoryId, categoryName) {
  fetch(`/products/${categoryId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((fetchedBooks) => {
      booksContainer.innerHTML = "";
      fetchedBooks.forEach((book) => {
        booksContainer.innerHTML += createBook(book);
      });
      productCounter.textContent = `${categoryName} (${fetchedBooks.length})`;
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
    });
}

// 카테고리 정보 가져오기
fetch("/category", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((categories) => {
    categoryWrap.innerHTML = "";
    categories.forEach((category) => {
      categoryWrap.innerHTML += createCategory(category);
    });

    const firstCategory = categories[0];
    fetchBooksByCategoryId(firstCategory.categoryId, firstCategory.name);
    categoryWrap.querySelector(".nav-link").classList.add("clicked");
  })
  .catch((error) => {
    console.error("Error fetching categories:", error);
  });

// 카테고리 클릭 이벤트
categoryWrap.addEventListener("click", (event) => {
  if (event.target.classList.contains("nav-link")) {
    categoryWrap
      .querySelector(".nav-link.clicked")
      ?.classList.remove("clicked");
    event.target.classList.add("clicked");
    const categoryId = event.target.getAttribute("data-category-id");
    const categoryName = event.target.textContent;
    fetchBooksByCategoryId(categoryId, categoryName);
  }
});

main();
