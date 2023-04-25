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

// 세션스토리지의 유저 데이터
const userData = JSON.parse(sessionStorage.getItem("userData"));

const setUserData = {
  name: userData.name,
  email: userData.email,
  postalCode: userData.postalCode,
  address: userData.address,
  detailAddress: userData.detailAddress,
  phone: userData.phone
}

// 세션스토리지의 유저 정보 삭제
sessionStorage.removeItem("userData");

// 회원 정보 로드
if (setUserData) {
  loadUserData(setUserData);
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

async function updateUser(event) {
  event.preventDefault();

  const isAllValid = checkValid();

  if (isAllValid && confirm("회원 정보를 수정 하시겠습니까?")) {
    try {
      const response = await fetch("/user-mypage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          password: passwordInput.value,
          postalCode: postalCodeInput.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          phone: phoneInput.value
        })
      });

      if (response.ok) {
        loadUserData(updateUserData());
      } else {
        const data = response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      alert("회원 정보 수정을 실패했습니다.");
    }
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