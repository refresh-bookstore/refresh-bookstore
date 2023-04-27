import { main } from '/public/js/main.js';

const title = sessionStorage.getItem("search");

// 도서 검색
searchBookByTitle();

const results = document.querySelector(".results");
const resultTitle = document.querySelector(".result-title");

resultTitle.innerText = `'${title}' 검색결과`

// 결과로 나온 책 html 생성
const createBook = (book) => {
  return `<div class="result-view">
              <div class="result-items-area">
                <a class="result-item" href="/book-detail/?isbn=${book.isbn}">
                  <div class="item-img">
                    <img src="${book.image_path}" alt="${book.title}">
                  </div>
                  <div class="item-info">
                    <p class="item-title">${book.title}</p>
                    <p class="item-author">${book.author}</p>
                    <p class="item-cost">${book.price.toLocaleString()}원</p>
                  </div>
                </a>
              </div>
            </div>`;
};

async function searchBookByTitle() {
  try {
    const response = await fetch(`/product/search?keyword=${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const data = await response.json();

    if (response.ok && data.data.length > 0) {
      results.classList.remove("empty");
      console.log(data);

      const products = data.data;

      // 검색 결과 책 html 추가
      products.forEach(book => {
        const bookEl = createBook(book);
        results.innerHTML += bookEl;
      });

    } else if (data.data.length === 0) {
      results.classList.add("empty");
      results.innerHTML = `<div></div>
                        <div class="empty-result-list">검색 결과가 없습니다</div>`;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
}

// 페이지 떠날 때 세션 스토리지 search 삭제
window.onbeforeunload = function() {
  sessionStorage.removeItem('search');
}

main();