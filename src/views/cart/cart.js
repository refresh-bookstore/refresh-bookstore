import { main } from '../public/js/main.js';

const cart = document.querySelector('.cart');
// const bookTitle = document.querySelectorAll('.book-title');
// const author = document.querySelectorAll('.author')


const selectedPrice = document.querySelector('.selectedPrice');
const deliveryFee = document.querySelector('.deliveryFee');
const totalCost = document.querySelector('.totalCost');

// 예시 주문데이터
let order = [
  {
    title: '혼자 공부하는 얄팍한 코딩지식',
    subtitle: '비전공자도 1:1 과외하듯 배우는 IT 지식 입문서',
    author: '고현민',
    publisher: '한빛출판사',
    published: new Date(2022, 4, 25),
    cost: 14800,
    category: '코딩입문서',
    isbn: '9791162245552',
    introduction: `혼자 해도 충분합니다! 1:1 과외하듯 배우는 IT 지식 입문서! 이 책은 독학으로 IT 지식을 배우는 입문자가 ‘꼭 필요한 내용을 제대로 학습’할 수 있도록 구성했다. 뭘 모르는지조차 모르는 입문자의 막연한 마음에 십분 공감하여 과외 선생님이 알려주듯 친절하게, 핵심 내용만 콕콕 집어 준다. 1장에서는 IT 업계 용어를 알아보며 개발과 개발자를 이해하고, 2장에서는 개발자가 실제로 사용하는 용어를 배우며 개발자와 소통할 수 있는 발판을 마련해준다. 마지막 3장에서는 여러 가지 개발 용어를 바탕으로 개발자의 길로 들어설 수 있도록 친절하게 알려 준다. '개발이 뭔지 궁금했지만', '개발자와 소통해야 하지만', '개발자가 되고 싶지만'기존 IT 지식서에서는 시원하게 알 수 없었던 진짜 코딩 지식을 [혼공 얄코]에서 만나 보자!`,
    amount: 1
  },
  {
    title: '모던 자바스크립트 Deep Dive',
    subtitle: '자바스크립트의 기본 개념과 동작 원리',
    author: '이웅모',
    publisher: '위키북스',
    published: new Date(2020, 9, 25),
    cost: 45000,
    category: '웹 개발',
    isbn: '9791158392239',
    introduction: `『모던 자바스크립트 Deep Dive』에서는 자바스크립트를 둘러싼 기본 개념을 정확하고 구체적으로 설명하고, 자바스크립트 코드의 동작 원리를 집요하게 파헤친다. 따라서 여러분이 작성한 코드가 컴퓨터 내부에서 어떻게 동작할 것인지 예측하고, 명확히 설명할 수 있도록 돕는다. 또한 최신 자바스크립트 명세를 반영해 안정적이고 효율적인 코드를 작성할 수 있는 기본기를 다지고, 실전에서 쓰이는 모던 자바스크립트 프레임워크나 도구를 완벽하게 이해하고 활용할 수 있게 도와준다.`,
    amount: 1
  }
];
console.log(JSON.stringify(order));
// 로컬스토리지에 데이터 저장
const save = (data) => {
  localStorage.setItem('cart', JSON.stringify(data));
}
save(order);

let bookData = {
  title: '모던 자바스크립트 Deep Dive',
  subtitle: '자바스크립트의 기본 개념과 동작 원리',
  author: '이웅모',
  publisher: '위키북스',
  published: new Date(2020, 9, 25),
  cost: 45000,
  category: '웹 개발',
  isbn: '9791158392239',
  introduction: `『모던 자바스크립트 Deep Dive』에서는 자바스크립트를 둘러싼 기본 개념을 정확하고 구체적으로 설명하고, 자바스크립트 코드의 동작 원리를 집요하게 파헤친다. 따라서 여러분이 작성한 코드가 컴퓨터 내부에서 어떻게 동작할 것인지 예측하고, 명확히 설명할 수 있도록 돕는다. 또한 최신 자바스크립트 명세를 반영해 안정적이고 효율적인 코드를 작성할 수 있는 기본기를 다지고, 실전에서 쓰이는 모던 자바스크립트 프레임워크나 도구를 완벽하게 이해하고 활용할 수 있게 도와준다.`,
  amount: 1
};
order.push(bookData);
save(order);

// 로컬스토리지에서 불러오기
const load = () => {
  const data = localStorage.getItem('cart');
  if (data !== null) {
    console.log(JSON.parse(data));
    return JSON.parse(data);
  } else {
    console.log('hi');
  }
};

load().forEach(order => {
  // imgLink는 isbn.png로 넘길 예정
  const imgLink = '../public/images/sample_image.jpg';
  const title = order.title;
  const author = order.author;
  const amount = Number(order.amount);
  const bookPrice = `${(order.cost * amount).toLocaleString()}원`;

  cart.innerHTML += `<div class="item">
  <input type="checkbox" name="buy" checked="">
  <!-- 책 이미지 -->
  <div class="book-img">
  <a class="book-link" href="#">
  <img src="${imgLink}" class="book-img" alt="bookImg1"/>
  </a>
  </div>
  
  <div class="book-info">
  <a class="book-title" href="#">${title}</a>
  <div class="author">${author}</div>
  </div>
  <!-- 수량 변경 -->
  <div class="amountArea">
  <button class="minusBtn">-</button>
  <input class ="amountInput" value="${amount}">
  <button class="plusBtn">+</button>
  </div>
  <!-- 상품 금액 -->
  <div class="price">
  <p class="price-title">상품 금액</p>
  <div class="book-price">${bookPrice}</div>
  </div>
  
  <!-- 삭제 버튼 -->
  <div class="delete">
  <button class="deleteBtn">삭제</button>
  </div>`;
});

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

const minusBtn = document.querySelectorAll('.minusBtn');
const amountInput = document.querySelectorAll('.amountInput');
const plusBtn = document.querySelectorAll('.plusBtn');

// 수량 증가 클릭 이벤트
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
// 수량 값을 없애면 1로 바뀌도록 함
amountInput.forEach(amount => {
  amount.addEventListener('change', () => {
    if (amount.value === '' || amount.value === undefined) {
      amount.value = 1;
    }
  });
});

// 삭제 구현
// 단일 상품 삭제
const deleteBtn = document.querySelectorAll('.deleteBtn');
deleteBtn.forEach((btn, idx) => {
  const item = btn.parentElement.parentElement;
  btn.addEventListener('click', () => item.setAttribute('style', 'display: none'));
  // btn.addEventListener('click', () => {
  //   item.classList.add(`delete${idx}`);
  //   const targetTitle = document.querySelector(`.delete${idx} .book-title`).innerText;
  //   order = [];

  // });
});

// 선택 삭제
const deleteSelectedBtn = document.querySelector('.deleteSelected');
deleteSelectedBtn.addEventListener('click', () => {
  checkboxes.forEach(box => {
    if (box.checked) box.parentElement.setAttribute('style', 'display: none');
  });
});

// 가격 계산 구현
// 단일 상품 금액 계산(미완성)
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



main();