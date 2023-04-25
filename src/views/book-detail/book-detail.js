

import { main } from '/public/js/main.js';
import { books } from '.books.js';

const likeBtn = document.querySelector('#likeBtn');

const bookTitle = document.querySelectorAll('.bookTitle');
const detailedInfo = document.querySelector('#detailedInfo');
const bookCost = document.querySelector('#bookCost');
const bookCategory = document.querySelector('#category');

const minusBtn = document.querySelector('#minusBtn');
const plusBtn = document.querySelector('#plusBtn');
const amountInput = document.querySelector('#amountInput');
const totalCost = document.querySelector('#totalCost');
const addToCartBtn = document.querySelector('#addToCartBtn');
const purchaseBtn = document.querySelector('#purchaseBtn');

const bookIntroduction = document.querySelector('#bookIntroduction');


//예시데이터
const book = books[0];

//찜하기 버튼

likeBtn.addEventListener('click',()=>{
  likeBtn.src = "/public/images/like_2.svg";
});


//책 정보

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
purchaseBtn.addEventListener('click',()=>{
  localStorage.removeItem('purchase');
  const purchaseItems = {
      title: book.title,
      author: book.author,
      cost: book.cost,
      amount: Number(amountInput.value),
      isbn: book.isbn,
    };
    localStorage.setItem('purchase', JSON.stringify(purchaseItems));
    location.href = '/order-create';
});



//책 소개



bookIntroduction.innerText = book.description;





main();