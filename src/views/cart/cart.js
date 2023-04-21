import { main } from '../../../public/js/main.js';

const bookTitle = document.querySelectorAll('.book-title');
const author = document.querySelectorAll('.author')
const bookPrice = document.querySelectorAll('.book-price');

const minusBtn = document.querySelectorAll('.minusBtn');
// const amountInput = document.querySelectorAll('.amountInput');
const plusBtn = document.querySelectorAll('.plusBtn');

const selectedPrice = document.querySelector('.selectedPrice');
const deliveryFee = document.querySelector('.deliveryFee');
const totalCost = document.querySelector('.totalCost');

//예시데이터
const book = {
  title: '혼자 공부하는 얄팍한 코딩지식',
  subtitle: '비전공자도 1:1 과외하듯 배우는 IT 지식 입문서',
  author: '고현민',
  publisher: '한빛출판사',
  published: new Date(2022, 4, 25),
  cost: 14800,
  category: '코딩입문서',
  isbn: '1162245557',
  introduction: `혼자 해도 충분합니다! 1:1 과외하듯 배우는 IT 지식 입문서! 이 책은 독학으로 IT 지식을 배우는 입문자가 ‘꼭 필요한 내용을 제대로 학습’할 수 있도록 구성했다. 뭘 모르는지조차 모르는 입문자의 막연한 마음에 십분 공감하여 과외 선생님이 알려주듯 친절하게, 핵심 내용만 콕콕 집어 준다. 1장에서는 IT 업계 용어를 알아보며 개발과 개발자를 이해하고, 2장에서는 개발자가 실제로 사용하는 용어를 배우며 개발자와 소통할 수 있는 발판을 마련해준다. 마지막 3장에서는 여러 가지 개발 용어를 바탕으로 개발자의 길로 들어설 수 있도록 친절하게 알려 준다. '개발이 뭔지 궁금했지만', '개발자와 소통해야 하지만', '개발자가 되고 싶지만'기존 IT 지식서에서는 시원하게 알 수 없었던 진짜 코딩 지식을 [혼공 얄코]에서 만나 보자!`,
};

// 책 정보
bookTitle.forEach(e => e.innerText = book.title);
author.forEach(e => e.innerText = book.author);
bookPrice.forEach(e => e.innerText = `${book.cost.toLocaleString()}원`);


// 체크박스 구현

// 상품 체크박스들
const checkboxes = document.querySelectorAll('input[name="buy"]');
// 전체선택 체크박스
const selectAll = document.querySelector('.selectAll > input');

function checkSelectAll()  {
  // 선택된 체크박스
  const checked = document.querySelectorAll('input[name="buy"]:checked');
  if (checkboxes.length === checked.length) {
    selectAll.checked = true;
    console.log(checked.length);
    console.log(selectAll.checked);
  } else selectAll.checked = false;
}
checkboxes.forEach(checkbox => checkbox.addEventListener('click', () => checkSelectAll()));

function checkAll(selectAll) {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
  });
}
selectAll.addEventListener('click', () => checkAll(selectAll));


// 수량 감소 클릭 이벤트
plusBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.previousElementSibling.value = Number(btn.previousElementSibling.value) + 1;
  });
});  
// 수량 감소 클릭 이벤트
minusBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    if (Number(btn.nextElementSibling.value) === 1) {
      btn.nextElementSibling.value = 1;
    } else {
      btn.nextElementSibling.value = Number(btn.nextElementSibling.value) - 1;
    }
  });
});

// 삭제 구현
// 단일 상품 삭제
const deleteBtn = document.querySelectorAll('.deleteBtn');
deleteBtn.forEach(btn => {
  const item = btn.parentElement.parentElement;
  btn.addEventListener('click', () => item.setAttribute('style', 'display: none'));
});

// 선택 삭제
const deleteSelectedBtn = document.querySelector('.deleteSelected');
deleteSelectedBtn.addEventListener('click', () => {
  checkboxes.forEach(box => {
    if (box.checked) box.parentElement.setAttribute('style', 'display: none');
  });
});

// 가격 계산 구현
// 선택 상품 금액 계산(미완성)

// 가격 문자열에서 숫자만 반환하는 함수
function getPriceNumber(str) {
  return Number(str.replace(/,/g, '').slice(0, -1));
}

// 배송비 계산
function setDeliveryFee() {
  if (getPriceNumber(selectedPrice.innerText) >= 50000) {
    deliveryFee.innerText = '0원';
  } else {
    deliveryFee.innerText = '3,000원';
  }
}
setDeliveryFee();

// 총 결제 금액 계산
function setTotalCost() {
  const totalCostNum = getPriceNumber(selectedPrice.innerText) + getPriceNumber(deliveryFee.innerText);
  totalCost.innerText = `${totalCostNum.toLocaleString()}원`;
}
setTotalCost();

// 로컬스토리지 연동
// localStorage.setItem('cart', '"title": "혼공얄코"');
// function getCartFromLocal() {
//   const existsCart = localStorage.getItem('cart');
//   const cartList = existsCart;
//   return JSON.parse(cartList);
// }

main();