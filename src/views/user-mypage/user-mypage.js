import { main } from '/public/js/main.js';
import { checkValid } from './checkValid.js';

const userGreeting = document.getElementById("user-greeting");
const nameText = document.getElementById("nameText");
const emailText = document.getElementById("emailText");
const passwordInput = document.getElementById("passwordInput");
const postalCodeInput = document.getElementById("postalCodeInput");
const addressInput = document.getElementById("addressInput");
const detailAddressInput = document.getElementById("detailAddressInput");
const phoneInput = document.getElementById("phoneInput");
const orderListButton = document.getElementById("order-list-button");
const submitButton = document.getElementById("submitButton");
const deleteButton = document.getElementById("deleteButton");

// 유저 데이터
const userData = JSON.parse(sessionStorage.getItem("userData"));

// 회원 정보 로드
if (userData) {
  loadUserData(userData);
} else {
  alert("회원 정보가 없습니다.");
  // 홈으로 돌아가기
  location.replace("/");
}

// 주문 조회 버튼 이벤트 리스너
orderListButton.addEventListener("click", handleOrderList);

// 회원 수정 버튼 이벤트 리스너
submitButton.addEventListener("click", updateUser);

// 회원 탈퇴 버튼 이벤트 리스너
deleteButton.addEventListener("click", deleteUser);

function handleOrderList(event) {
  event.preventDefault();

  location.href = "/order-list";
}

function loadUserData(user) {
  userGreeting.innerText = `안녕하세요, ${user.name}님\u{1F49A}`;
  nameText.innerText = user.name;
  emailText.innerText = user.email;
  postalCodeInput.value = user.postalCode;
  addressInput.value = user.address;
  detailAddressInput.value = user.detailAddress;
  phoneInput.value = user.phone;
}

function updateUserData() {
  return {
    name: nameText.innerText,
    email: emailText.innerText,
    password: passwordInput.value,
    postalCode: postalCodeInput.value,
    address: addressInput.value,
    detailAddress: detailAddressInput.value,
    phone: phoneInput.value,
  };
}

function updateUser(event) {
  event.preventDefault();

  const isAllValid = checkValid();

  if (isAllValid && confirm("회원 정보를 수정 하시겠습니까?")) {

    loadUserData(updateUserData());
  } else {
    console.log("수정 취소");
  }
}

function deleteUser(event) {
  event.preventDefault();

  if (confirm("정말 탈퇴하시겠습니까?")) {
    console.log("탈퇴 완료");
  } else {
    console.log("탈퇴 취소");
  }
}

main();