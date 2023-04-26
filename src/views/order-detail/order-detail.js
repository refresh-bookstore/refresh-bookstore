import { main } from '/public/js/main.js';

const orderData = document.querySelector('.orderDate');
const shippingStatus = document.querySelector('.shippingStatus');

const bookTitle = document.querySelectorAll('.book-title');
const author = document.querySelectorAll('.author')
const bookPrice = document.querySelectorAll('.book-price');

const deliveryFee = document.querySelector('.deliveryFee'); 
const entirePrice = document.querySelector('.entirePrice'); 

const name = document.querySelector('.name'); 
const phoneNumber = document.querySelector('.phoneNumber'); 
const address = document.querySelector('.address'); 
const deliveryRequest = document.querySelector('.deliveryRequest'); 

const modifyButton = document.querySelector('.modifyButton'); 
const cancelButton = document.querySelector('.cancelButton'); 

// 지금 실험해볼 수 있는 로컬스토리지가 카트 뿐이라 카트로 담음
// cart -> purchase로 수정해야 함
const purchaseData = JSON.parse(localStorage.getItem('cart'));
const orderContainer = document.querySelector('.order-container');

// 로컬스토리지에 purchase가 없다면 주문 내역이 없습니다 띄우기
// 혹은 alert만 띄워도 괜찮을듯
if (!purchaseData) {
  orderContainer.classList.add('empty');
  orderContainer.innerHTML = `<div></div>
                <div class="empty-order-list">주문 내역이 없습니다</div>`;
} else {
  orderContainer.classList.remove('empty');
}

// 주문 정보 조회
loadOrder();

// 주문 정보 수정 버튼 이벤트 리스너
modifyButton.addEventListener('click', modifyOrder);

// 주문 취소 버튼 이벤트 리스너
cancelButton.addEventListener('click', cancelOrder);

// 주문 정보 조회
async function loadOrder() {
  
}

// 주문 정보 수정
async function modifyOrder() {

}

// 주문 취소
async function cancelOrder() {

}

main();