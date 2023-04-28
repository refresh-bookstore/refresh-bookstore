import { main } from '/public/js/main.js';
import { checkValid } from "./order-checkValid.js";
import { logout } from '/public/js/logout.js';

const orderListButton = document.querySelector('.order-list-button');
const orderIdArea = document.querySelector('.orderId');
const orderDateArea = document.querySelector('.orderDate');
const shippingStatusArea = document.querySelector('.shippingStatus');

const booksArea = document.querySelector('.books');

const deliveryFeeArea = document.querySelector('.deliveryFee');
const totalPriceArea = document.querySelector('.entirePrice');
const name = document.querySelector('.name');
const phoneNumber = document.querySelector('.phoneNumber');
const searchAddressBtn = document.querySelector('.search-address');
const postalCodeInput = document.querySelector('.postalCode');
const addressInput = document.querySelector('.address');
const detailAddressInput = document.querySelector('.detailAddress');
const deliveryRequest = document.querySelector('.deliveryRequest');

const modifyCompleteButton = document.querySelector('.modifyCompleteButton');
const modifyButton = document.querySelector('.modifyButton');
const cancelButton = document.querySelector('.cancelButton');

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

orderListButton.addEventListener('click', () => {
  location.href = '/order-list';
})

async function loadOrderDetail() {
  try {
    const response = await fetch(`/order-detail/${orderId}`, {
      method: "GET",
      headers: {
        'content-Type': 'application/json',
      }
    });
    if (response.ok) {
      const data = await response.json();

      const deliveryFee = data[0].deliveryFee.toLocaleString();
      const totalPrice = data[0].totalPrice.toLocaleString();
      const userName = data[0].userName;
      const userPhone = data[0].userPhone;
      const postalCode = data[0].postalCode;
      const address = data[0].address;
      const detailAddress = data[0].detailAddress;
      const orderRequest = data[0].orderRequest;
      const orderDate = new Date(new Date(data[0].createdAt).getTime() + (1000 * 60 * 60 * 9)).toISOString().slice(0, 10);

      // 주문 번호
      orderIdArea.innerText = orderId;
      // 주문 날짜
      orderDateArea.innerText = orderDate;
      // 배송 상태
      if (data[0].shippingStatus === '상품 준비중') {
        document.querySelector('#state0').style = 'color: var(--color-black); font-size: 20px; font-weight: 700';
      } else if (data[0].shippingStatus === '배송중') {
        document.querySelector('#state1').style = 'color: var(--color-black); font-size: 20px; font-weight: 700';
        modifyButton.style.display = 'none';
        cancelButton.style.display = 'none';
      } else if (data[0].shippingStatus === '배송완료') {
        document.querySelector('#state2').style = 'color: var(--color-black); font-size: 20px; font-weight: 700';
        modifyButton.style.display = 'none';
        cancelButton.style.display = 'none';
      } else {
        document.querySelectorAll('.shippingStatus > span').forEach(e => e.style.display = 'none');
        shippingStatusArea.innerText = '주문취소';
        modifyButton.style.display = 'none';
        cancelButton.style.display = 'none';
        shippingStatusArea.style = 'color: var(--color-red); font-size: 20px; font-weight: 700';
      }
      
      // 책 정보
      data[0].orderList.forEach(book => {
        const isbn = book.product.isbn;
        const image_path = book.product.image_path;
        const title = book.product.title;
        const author = book.product.author;
        const amount = book.amount;
        const price = book.product.price.toLocaleString();
        booksArea.innerHTML += `<li class="book">
                    <div class="book-img">
                      <a href="/book-detail/?isbn=${isbn}"><img src="${image_path}"></a>
                    </div>
                    <div class="book-info">
                      <p class="book-title"><a class="book-link" href="/book-detail/?isbn=${isbn}">${title}</a></p>
                      <p class="author">${author}</p>
                      <p class="book-price">${price}원 X ${amount}권</p>
                    </div>
                </li>`;

        // 가격 정보
        deliveryFeeArea.innerText = `${deliveryFee}원`;
        totalPriceArea.innerText = `${totalPrice}원`;

        // 받는사람 정보
        name.value = userName;
        phoneNumber.value = userPhone;
        postalCodeInput.value = postalCode;
        addressInput.value = address;
        detailAddressInput.value = detailAddress;
        deliveryRequest.value = orderRequest;

      });
    } else {
      alert("로그인을 해주세요.");
      logout();
      throw new Error("사용자를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.log(error.message);
  }
}
loadOrderDetail();


// 주문정보 수정
modifyButton.addEventListener('click', activateModify);
function activateModify() {
  modifyButton.style.display = 'none';
  modifyCompleteButton.style.display = 'block';
  modifyCompleteButton.style.backgroundColor = 'var(--color-point)';
  modifyCompleteButton.style.border = 'none';
  searchAddressBtn.style.display = 'block';
  document.querySelectorAll('input').forEach(e => e.readOnly = false);
}
modifyCompleteButton.addEventListener('click', completeModify);
function completeModify() {
  if (checkValid()) {
    modifyCompleteButton.style.display = 'none';
    modifyButton.style.display = 'block';
    searchAddressBtn.style.display = 'none';
    document.querySelectorAll('input').forEach(e => e.readOnly = true);
  }
  modifyOrder();
}

async function modifyOrder() {
  const isAllValid = checkValid();
  if (isAllValid) {
    try {
      const response = await fetch(`${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: name.value,
          userPhone: phoneNumber.value,
          postalCode: postalCodeInput.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          orderRequest: deliveryRequest.value,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
      } else {
        alert("사용자를 찾을 수 없습니다.");
        throw new Error("사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

// 주문 취소
cancelButton.addEventListener('click', cancelOrder);

async function cancelOrder() {
  try {
    const response = await fetch(`${orderId}/cancel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingStatus: "주문취소",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      alert('주문이 취소되었습니다.');
      location.href = '/order-list';
    } else {
      alert("사용자를 찾을 수 없습니다.");
      throw new Error("사용자를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.log(error.message);
  }
}

main();