

import { main } from '/public/js/main.js';
import { books } from '/book-detail/books.js';

const likeBtn = document.querySelector('#likeBtn');

const bookImageArea = document.querySelectorAll('.imageArea');
const bookTitle = document.querySelectorAll('.bookTitle');
const detailedInfo = document.querySelector('#detailedInfo');
const bookCategory = document.querySelector('#category');

const minusBtn = document.querySelector('#minusBtn');
const plusBtn = document.querySelector('#plusBtn');
const amountInput = document.querySelector('#amountInput');
const totalCost = document.querySelector('#totalCost');
const addToCartBtn = document.querySelector('#addToCartBtn');
const purchaseBtn = document.querySelector('#purchaseBtn');

const bookInfoIsbn = document.querySelector('#info-isbn');
const bookInfoAuthor = document.querySelector('#info-author');
const bookInfoPublisher = document.querySelector('#info-publisher');
const bookInfoDate = document.querySelector('#info-published');


//예시데이터
const book = books[0];

//찜하기 버튼

likeBtn.addEventListener('click',()=>{
  likeBtn.src = "/public/images/like_2.svg";
});


//책 정보

bookImageArea.innerHTML = `<img src="${book.image_path}">`;
bookCategory.innerText = `#${book.category}`;
bookTitle.forEach((e)=>{
  e.innerText = book.title;
});

detailedInfo.innerText = `${book.author} | ${book.publisher} | ${book.publication_date.getFullYear()}`;



//구매 정보


//////////////////////////// 수량 버튼//////////////////////
minusBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  if (Number(amountInput.value) <= 1){
  }else{
    amountInput.value -= 1;
    totalCost.innerText = `${(book.price * amountInput.value).toLocaleString()}원`;
  }
});

plusBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  amountInput.value = Number(amountInput.value) + 1;
  totalCost.innerText = `${(book.price * amountInput.value).toLocaleString()}원`;
});

totalCost.innerText = `${(book.price * amountInput.value).toLocaleString()}원`;

amountInput.addEventListener('input', ()=>{
  totalCost.innerText = `${(book.price * amountInput.value).toLocaleString()}원`;
});


//////////////////////////// 장바구니 버튼//////////////////////
addToCartBtn.addEventListener('click',()=>{
  let cartItems = JSON.parse(localStorage.getItem('cart'));
  if(cartItems === null) cartItems = [];
  const isAlreadyInCart = cartItems.findIndex(item=> item.isbn === book.isbn);
  if(isAlreadyInCart !== -1){
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
  localStorage.setItem('cart', JSON.stringify(cartItems));

  const cartCheckout = confirm("장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?");
  if(cartCheckout){
    location.href = '/cart';
}
});


//////////////////////////// 구매 버튼//////////////////////
//// 로그인 필요 ////
purchaseBtn.addEventListener('click',()=>{
  const token = sessionStorage.getItem('token');
  if (token) {
    localStorage.removeItem('purchase');
    const purchaseItems = {
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
    };
    localStorage.setItem('purchase', JSON.stringify(purchaseItems));
    location.href = '/order-create';
  } else {
    window.alert('로그인을 해주세요.')
  }
});



//책 소개
bookInfoIsbn.innerText = `ISBN | ${book.isbn}`;
bookInfoAuthor.innerText = `저자 | ${book.author}`;
bookInfoPublisher.innerText = `출판사 | ${book.publisher}`;
bookInfoDate.innerText = `발행일 | ${book.publication_date.getFullYear()}년 ${book.publication_date.getMonth()}월 ${book.publication_date.getDate()}일`;


bookIntroduction.innerText = book.description;


main();