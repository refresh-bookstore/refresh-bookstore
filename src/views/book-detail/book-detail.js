import { main } from "/public/js/main.js";

const bookImageArea = document.querySelector(".imageArea");
const bookTitle = document.querySelectorAll(".bookTitle");
const detailedInfo = document.querySelector("#detailedInfo");
const bookCategory = document.querySelector("#category");

const minusBtn = document.querySelector("#minusBtn");
const plusBtn = document.querySelector("#plusBtn");
const amountInput = document.querySelector("#amountInput");
const totalCost = document.querySelector("#totalCost");
const addToCartBtn = document.querySelector("#addToCartBtn");
const purchaseBtn = document.querySelector("#purchaseBtn");

const bookInfoIsbn = document.querySelector("#info-isbn");
const bookInfoAuthor = document.querySelector("#info-author");
const bookInfoPublisher = document.querySelector("#info-publisher");
const bookInfoDate = document.querySelector("#info-published");

async function checkLoginStatus() {
  try {
    const response = await fetch("/login/status");
    const text = await response.text();
    return text === "true";
  } catch (error) {
    console.error("로그인 상태 확인 중 오류 발생:", error);
    return false;
  }
}

// 데이터 불러옴
const urlParams = new URLSearchParams(window.location.search);
const isbn = urlParams.get("isbn");
fetch(`/book-detail/${isbn}`)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.data[0]);
    renderBookDetail(data.data[0]);
  })
  .catch((err) => console.error(err));

// 페이지 렌더

const renderBookDetail = (book) => {
  const published = new Date(book.publication_date);

  // 책 정보
  bookImageArea.innerHTML = `<img src="${book.image_path}">`;
  bookCategory.innerText = `#${book.category}`;
  bookTitle.forEach((e) => {
    e.innerText = book.title;
  });

  detailedInfo.innerText = `${book.author} | ${
    book.publisher
  } | ${published.getFullYear()}`;

  // 수량 버튼
  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (Number(amountInput.value) <= 1) {
      amountInput.value = 1;
    } else {
      amountInput.value -= 1;
      totalCost.innerText = `${(
        book.price * amountInput.value
      ).toLocaleString()}원`;
    }
  });

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    amountInput.value = Number(amountInput.value) + 1;
    totalCost.innerText = `${(
      book.price * amountInput.value
    ).toLocaleString()}원`;
  });

  totalCost.innerText = `${(
    book.price * amountInput.value
  ).toLocaleString()}원`;

  amountInput.addEventListener("change", () => {
    let amount = Number(amountInput.value.replace(/[^0-9]/g, ""));
    if (amount === 0) {
      amountInput.value = 1;
    }
    totalCost.innerText = `${(
      book.price * amountInput.value
    ).toLocaleString()}원`;
  });

  // 장바구니 버튼
  addToCartBtn.addEventListener("click", () => {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    if (cartItems === null) cartItems = [];
    const isAlreadyInCart = cartItems.findIndex(
      (item) => item.isbn === book.isbn
    );
    if (isAlreadyInCart !== -1) {
      cartItems[isAlreadyInCart].amount += Number(amountInput.value);
    } else {
      cartItems.push({
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        publication_date: book.publication_date,
        isbn: book.isbn,
        description: book.description,
        price: book.price,
        image_path: book.image_path,
        category: book.category,
        amount: Number(amountInput.value),
      });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));

    const cartCheckout = confirm(
      "장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?"
    );
    if (cartCheckout) {
      location.href = "/cart";
    } else {
      main();
    }
  });

  // 구매 버튼
  purchaseBtn.addEventListener("click", async () => {
    const loggedIn = await checkLoginStatus();
    if (loggedIn) {
      localStorage.removeItem("purchase");
      const purchaseItems = [
        {
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          publication_date: published,
          isbn: book.isbn,
          description: book.description,
          price: book.price,
          image_path: book.image_path,
          category: book.category,
          amount: Number(amountInput.value),
        },
      ];
      localStorage.setItem("purchase", JSON.stringify(purchaseItems));
      location.href = "/order-create";
    } else {
      window.alert("로그인을 해주세요.");
      location.href = "/login";
    }
  });

  // 책 소개 부분
  bookInfoIsbn.innerText = `ISBN | ${book.isbn}`;
  bookInfoAuthor.innerText = `저자 | ${book.author}`;
  bookInfoPublisher.innerText = `출판사 | ${book.publisher}`;
  bookInfoDate.innerText = `발행일 | ${published.getFullYear()}년 ${
    published.getMonth() + 1
  }월 ${published.getDate()}일`;

  bookIntroduction.innerText = book.description;
};

main();
