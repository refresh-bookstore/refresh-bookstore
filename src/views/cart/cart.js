import { main } from '/public/js/main.js';

// 가격 문자열에서 숫자만 반환하는 함수
function getPriceNumber(str) {
  return Number(str.replace(/,/g, '').slice(0, -1));
}

// 로컬스토리지에 'cart'데이터 저장(테스트)
const saveToCart = (data) => {
  localStorage.setItem('cart', JSON.stringify(data));
}
// 로컬스토리지 'purchase'에 데이터 저장 함수
const saveToPurchase = (data) => {
  localStorage.setItem('purchase', JSON.stringify(data));
}

const cart = document.querySelector('.cart');
const selectedPrice = document.querySelector('.selectedPrice');
const deliveryFee = document.querySelector('.deliveryFee');
const totalCost = document.querySelector('.totalCost');
const orderButton = document.querySelector('.order__button');

// 예시 주문데이터
// const order = [
//   {
//     "title":"프론트엔드 성능 최적화 가이드",
//     "author":"유동균",
//     "publisher":"인사이트",
//     "publication_date":"2022-11-14T15:00:00.000Z",
//     "isbn":"9788966263745",
//     "description":"'웹 성능 최적화'는 프론트엔드 개발자라면 반드시 고민해야 하는 이슈다. 서비스 환경과 상황에 따라 필요한 최적화 포인트가 다르고, 기법도 매우 다양하기에 개발 중인 서비스 특성에 맞게 커스터마이징하는 능력이 중요하다.\n\n  저자는 수많은 기업의 웹 서비스 성능을 컨설팅하고, 삼성 SSAFY, 프로그래머스, 인프런, 스터디파이 등 강의 플랫폼에서 최적화 및 개발 강의를 진행한 경험을 책에 고스란히 녹여 냈다. '성능 최적화' 주제를 효과적으로 배우는 데 이론보다는 실습이 중요함을 강조하며 현장감 있게 구성했다. 이 책은 실생활에서 흔히 개발하는 4가지 실습 사이트를 예제로, 직관적인 최적화 노하우를 전달한다.",
//     "price":22000,
//     "image_path":"../product-images/9788966263745.png",
//     "category":"프론트엔드",
//     "amount":1,
//   }
// ];

// const bookData = {
//   "title":"모던 자바스크립트 Deep Dive ",
//   "author":"이웅모",
//   "publisher":"위키북스",
//   "publication_date":"2020-09-24T15:00:00.000Z",
//   "isbn":"9791158392239",
//   "description":"자바스크립트를 둘러싼 기본 개념을 정확하고 구체적으로 설명하고, 자바스크립트 코드의 동작 원리를 집요하게 파헤친다. 작성한 코드가 컴퓨터 내부에서 어떻게 동작할 것인지 예측하고, 명확히 설명할 수 있도록 돕는다. 또한 최신 자바스크립트 명세를 반영해 안정적이고 효율적인 코드를 작성할 수 있는 기본기를 다지고, 실전에서 쓰이는 모던 자바스크립트 프레임워크나 도구를 완벽하게 이해하고 활용할 수 있게 도와준다.",
//   "price":45000,
//   "image_path":"../product-images/9791158392239.png",
//   "category":"프론트엔드",
//   "amount":1,
// };
// order.push(bookData);
// saveToCart(order);

let data = JSON.parse(localStorage.getItem('cart'));
// 로컬스토리지에서 데이터 불러오기, 체크박스, 수량조절, 삭제버튼 활성화, 가격 출력 자동화
function renderBooks() {
  data = JSON.parse(localStorage.getItem('cart'));
  if (data === null) {
    // 장바구니에 상품이 없습니다
    cart.innerHTML = `<p class="empty-cart">상품이 없습니다.</p>`;
    localStorage.clear();
  } else {
    data.forEach((order, idx) => {
      const image_path = order.image_path;
      const title = order.title;
      const author = order.author;
      const amount = order.amount;
      const bookPrice = `${(order.price * amount).toLocaleString()}원`;
      const isbn = order.isbn;

      cart.innerHTML += 
      `<div class="item">
      <input type="checkbox" name="buy" checked="">
      <!-- 책 이미지 -->
      <div class="book-img">
      <a class="book-link" href="/book-detail/${isbn}">
      <img src="${image_path}" class="book-img" alt="${title}"/>
      </a>
      </div>
      <!-- 책 정보 -->
      <div class="book-info">
      <a class="book-title" href="/book-detail/${isbn}">${title}</a>
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
      <div class="book-price${idx}">${bookPrice}</div>
      </div>
      <!-- 삭제 버튼 -->
      <div class="delete">
      <button class="deleteBtn">삭제</button>
      </div>
      </div>`;
    });
  }
    activateCheckboxes();
    activateAmountBtn();
    activateDeleteBtn();
    setPayList();
}
renderBooks();

// 체크박스 활성화 함수
function activateCheckboxes() {
  const checkboxes = document.querySelectorAll('input[name="buy"]');
  const selectAll = document.querySelector('input[name="checkAll"]');
  
  function checkSelectAll()  {
    const checkedItems = document.querySelectorAll('input[name="buy"]:checked');
    if (checkboxes.length === checkedItems.length) {
      selectAll.checked = true;
    } else selectAll.checked = false;
  }
  
  function checkAll(selectAll) {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    });
  }

  checkboxes.forEach(checkbox => checkbox.addEventListener('click', () => {
    checkSelectAll();
    setPayList();
  }));
  selectAll.addEventListener('click', () => {
    checkAll(selectAll);
    setPayList();
  });
}

// 수량 조절 버튼 활성화 함수
function activateAmountBtn() {
  const minusBtn = document.querySelectorAll('.minusBtn');
  const amountInput = document.querySelectorAll('.amountInput');
  const plusBtn = document.querySelectorAll('.plusBtn');
  
  // 수량 증가 클릭 이벤트
  plusBtn.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      btn.previousElementSibling.value = Number(btn.previousElementSibling.value) + 1;
      data[idx].amount += 1;
      localStorage.removeItem('cart');
      saveToCart(data);
      const bookPrice = document.querySelector(`.book-price${idx}`);
      bookPrice.innerText = `${(data[idx].amount * data[idx].price).toLocaleString()}원`;
      setPayList();
    });
  });  
  // 수량 감소 클릭 이벤트
  minusBtn.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (Number(btn.nextElementSibling.value) === 1) {
        btn.nextElementSibling.value = 1;
      } else {
        btn.nextElementSibling.value = Number(btn.nextElementSibling.value) - 1;
        data[idx].amount -= 1;
        localStorage.removeItem('cart');
        saveToCart(data);
        const bookPrice = document.querySelector(`.book-price${idx}`);
        bookPrice.innerText = `${(data[idx].amount * data[idx].price).toLocaleString()}원`;
      }
      setPayList();
    });
  });
  // 수량 직접 입력시 가격 계산
  // 수량 값을 없애거나 0으로 만들면 1로 바뀌도록 함
  amountInput.forEach((amount, idx) => {
    amount.addEventListener('change', () => {
      if (amount.value <= 1 || amount.value === undefined) {
        amount.value = 1;
      } 
      data[idx].amount = Number(amount.value);
      localStorage.removeItem('cart');
      saveToCart(data);
      const bookPrice = document.querySelector(`.book-price${idx}`);
      bookPrice.innerText = `${(data[idx].amount * data[idx].price).toLocaleString()}원`;
      setPayList();
    });
  });
}

// 단일상품삭제 버튼 활성화 함수
function activateDeleteBtn() {
  const deleteBtn = document.querySelectorAll('.deleteBtn');
  deleteBtn.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      data.splice(idx, 1);
      localStorage.removeItem('cart');
      saveToCart(data);
      renderBooks();
    });
  });
}

// 선택삭제 버튼 활성화 함수
function activateDeleteSelectedBtn() {
  const deleteSelectedBtn = document.querySelector('.deleteSelected');
  deleteSelectedBtn.addEventListener('click', () => {
    let checkedIndex = [];
    const checkboxes = document.querySelectorAll('input[name="buy"]');
    if (checkboxes.length) {
      checkboxes.forEach((box, idx) => {
        if (box.checked) checkedIndex.unshift(idx);
      });
    }
    if (checkedIndex.length) {
      checkedIndex.forEach(indexNum => {
        data.splice(indexNum, 1);
      });
      localStorage.removeItem('cart');
      saveToCart(data);
      cart.innerHTML = '';
      renderBooks();
    }
    activateCheckboxes();
    setPayList();
  });
}
activateDeleteSelectedBtn();

// 금액 리스트 세팅 함수
function setPayList() {
  setSelectedPrice();
  setDeliveryFee();
  setTotalCost();
}

// 선택 상품 금액 계산 함수
function setSelectedPrice() {
  const items = document.querySelectorAll('.item input[type="checkbox"]');
  let bookPriceSum = 0;
  if (items.length) {
    items.forEach((item, idx) => {
      if (item.checked) {
        const price = document.querySelector(`.book-price${idx}`);
        bookPriceSum += getPriceNumber(price.innerText);
      }
    });
    selectedPrice.innerText = `${bookPriceSum.toLocaleString()}원`;
  } else selectedPrice.innerText = '0원';
}


// 배송비 계산 함수
function setDeliveryFee() {
  if (getPriceNumber(selectedPrice.innerText) >= 50000 || selectedPrice.innerText === '0원') {
    deliveryFee.innerText = '0원';
  } else {
    deliveryFee.innerText = '3,000원';
  }
}

// 총 결제 금액 계산 함수
function setTotalCost() {
  const totalCostNum = getPriceNumber(selectedPrice.innerText) + getPriceNumber(deliveryFee.innerText);
  totalCost.innerText = `${totalCostNum.toLocaleString()}원`;
}

orderButton.addEventListener('click', () => {
  saveToPurchase(JSON.parse(localStorage.getItem('cart')));
  localStorage.removeItem('cart');
  location.href = '/order-create/order-create.html'; // (임시)
});

main();