import { main } from '/public/js/main.js';
import { order } from './temp.js';

const orderDate = document.querySelector('.orderDate');
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

const purchaseData = JSON.parse(localStorage.getItem('purchase'));
const orderContainer = document.querySelector('.order-container');

// 로컬스토리지에 purchase가 없다면 주문 내역이 없습니다 띄우기
if (!purchaseData) {
  alert('주문 내역이 없습니다');
}

// 주문 정보 조회
loadOrder();

// 주문 정보 수정 버튼 이벤트 리스너
modifyButton.addEventListener('click', modifyOrder);

// 주문 취소 버튼 이벤트 리스너
cancelButton.addEventListener('click', cancelOrder);

// 주문 정보 조회
async function loadOrder() {
  // 주문 일, 배송 상태 가져오기

  // 임의로 현재 날짜
  const orderDay = new Date().toLocaleDateString().split('/');
  orderDate.innerText = orderDay;
  shippingStatus.innerText = order[0].shipingStatus;

  // 주문한 책 상품 가져오기

  // 배송비, 총 결제금액 가져오기

}

// 주문 정보 수정
async function modifyOrder() {

}

// 주문 취소
async function cancelOrder() {

}

main();