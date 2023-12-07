import { main } from "/public/js/main.js";

const slider = document.querySelector(".slider");
const slides = slider.querySelector(".slides");
const slide = slides.querySelectorAll(".slide");

let currentSlide = 0;
let textStatus = 1;

// slide 5초씩 반복
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
    }
  );

  currentSlide++;
  if (currentSlide === slide.length - 1) {
    currentSlide = 0;
  }
}, 5000);

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

// 해당 카테고리 책 권수
const productCounter = document.querySelector(".product-counter");

// 카테고리 html 생성
const createCategory = (category) => {
  return `<li class="nav-item category">
            <a class="nav-link clicked">${category}</a>
          </li>`;
};

const categoryWrap = document.querySelector(".category-title");

try {
  const response = await fetch("/category", {
    method: "GET",
    headers: {
      "content-Type": "application/json",
    },
  });

  if (response.ok) {
    const categories = await response.json();

    //카테고리 html 추가
    categories.forEach((category) => {
      const categoryEl = createCategory(category.name);
      categoryWrap.innerHTML += categoryEl;
    });
  }
} catch (error) {
  console.log(error.message);
}

const books = document.querySelector(".books");

// 책 html 생성
const createBook = (book) => {
  return `<div class="book">
            <a class="book-link" href="/book-detail/?isbn=${book.isbn}">
              <div class="img-container">
                <img src="${book.image_path}" class="book-img" alt="${
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

try {
  const response = await fetch("/product", {
    method: "GET",
    headers: {
      "content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    const products = data.data;

    // 책 html 추가
    products.forEach((book) => {
      const bookEl = createBook(book);
      books.innerHTML += bookEl;
    });

    const navLinks = document.querySelectorAll(".nav-link");
    let isFirst = true;

    navLinks.forEach((link) => {
      // 페이지가 로드 됐을 때 전체 카테고리로 보여줌
      if (isFirst) {
        link.classList.add("clicked");
        productCounter.textContent = `전체 (${products.length})`;
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
        products.forEach((book) => {
          if (
            book.category.includes(clickedCategory) ||
            clickedCategory === "전체"
          ) {
            findBookListByCategory.push(book);
          }
        });

        // 선택한 카테고리와 수량 표시
        productCounter.textContent = `${clickedCategory} (${findBookListByCategory.length})`;

        if (findBookListByCategory.length === 0) {
          books.classList.add("empty");
          books.innerHTML = `<div></div>
                            <div class="empty-book-list">상품이 없습니다</div>`;
        } else {
          books.classList.remove("empty");
          findBookListByCategory.forEach((book) => {
            const newBook = createBook(book);
            books.innerHTML += newBook;
          });
        }
      });
    });
  }
} catch (error) {
  console.log(error.message);
}

main();
