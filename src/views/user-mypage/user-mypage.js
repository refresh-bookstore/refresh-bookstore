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

// 유저 정보 조회
loadUserData();

// 주문 조회 버튼 이벤트 리스너
orderListButton.addEventListener("click", handleOrderList);

// 회원 수정 버튼 이벤트 리스너
submitButton.addEventListener("click", updateUser);

// 회원 탈퇴 버튼 이벤트 리스너
deleteButton.addEventListener("click", deleteUser);

function loadUserData() {
  // 세션스토리지의 유저 데이터
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  // 회원 정보 로드
  if (userData) {
    userGreeting.innerText = `안녕하세요, ${userData.name}님\u{1F49A}`;
    nameText.innerText = userData.name;
    emailText.innerText = userData.email;
    postalCodeInput.value = userData.postalCode;
    addressInput.value = userData.address;
    detailAddressInput.value = userData.detailAddress;
    phoneInput.value = userData.phone;

  } else {
    alert("회원 정보가 없습니다.");
    // 홈으로 돌아가기
    location.replace("/");
  }
}

function handleOrderList(event) {
  event.preventDefault();

  location.href = "/order-list";
}

async function updateUser(event) {
  const isAllValid = checkValid();

  if (isAllValid && confirm("회원 정보를 수정 하시겠습니까?")) {
    try {
      const response = await fetch("/update", {
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

      console.log(response)

      if (response.ok) {
        const updated = JSON.stringify({
          name: nameText.innerText,
          email: emailText.innerText,
          postalCode: postalCodeInput.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          phone: phoneInput.value
        });

        sessionStorage.removeItem("userData");
        sessionStorage.setItem("userData", updated);

        //location.href = "/user-mypage";
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      
      //location.href = "/user-mypage";
    }
  }
}

async function deleteUser(event) {
  event.preventDefault();

  if (confirm("정말 탈퇴하시겠습니까?")) {
    try {
      const response = await fetch("/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();
      if (response.ok) {
        alert(`탈퇴하셨습니다.\n함께해서 즐거웠어요.\u{2764}`);
        
        // 스토리지 전부 삭제
        sessionStorage.clear();
        localStorage.clear();
        
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