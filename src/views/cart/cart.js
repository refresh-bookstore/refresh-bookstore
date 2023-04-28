import { main } from '/public/js/main.js';
import { isFullCart } from '/public/js/isFullCart.js';

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

// 로컬스토리지에서 데이터 불러오기, 체크박스, 수량조절, 삭제버튼 활성화, 가격 출력 자동화
function renderBooks() {
  const data = JSON.parse(localStorage.getItem('cart'));
  if (!data || data.length === 0) {
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
    window.addEventListener('popstate', isFullCart);
    main();
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
      const data = JSON.parse(localStorage.getItem('cart'));
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
        const data = JSON.parse(localStorage.getItem('cart'));
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
      if (amount.value <= 1 || amount.value === undefined || typeof(amount.value) !== 'number') {
        amount.value = 1;
      } 
      const data = JSON.parse(localStorage.getItem('cart'));
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
      const data = JSON.parse(localStorage.getItem('cart'));
      data.splice(idx, 1);
      localStorage.removeItem('cart');
      cart.innerHTML = '';
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
      const data = JSON.parse(localStorage.getItem('cart'));
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
    window.addEventListener('popstate', isFullCart);
    main();
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

// 구매하기 버튼
orderButton.addEventListener('click', () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    saveToPurchase(JSON.parse(localStorage.getItem('cart')));
    localStorage.removeItem('cart');
    location.replace('/order-create');
  } else {
    window.alert('로그인을 해주세요.');
    location.href = '/login';
  }
});

main();