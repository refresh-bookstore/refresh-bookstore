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

const setUserData = () => {
   return {
    name: userData.name,
    email: userData.email,
    postalCode: userData.postalCode,
    address: userData.address,
    detailAddress: userData.detailAddress,
    phone: userData.phone
  }
}

// 회원 정보 로드
if (userData) {
  loadUserData(setUserData());
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
  const isAllValid = checkValid();

  if (isAllValid && confirm("회원 정보를 수정 하시겠습니까?")) {
    try {
      const response = await fetch("/user-mypage/update", {
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
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);
      location.href = "/";
    }
  }
}

async function deleteUser(event) {
  event.preventDefault();

  if (confirm("정말 탈퇴하시겠습니까?")) {
    try {
      const response = await fetch("/user-mypage/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();
      if (response.ok) {
        alert(`탈퇴하셨습니다.\n함께해서 즐거웠어요.`);
        
        // 세션스토리지 전부 삭제
        sessionStorage.clear();
        
        // 홈 이동
        location.replace("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  } else {
    console.log("탈퇴 취소");
  }
}

main();