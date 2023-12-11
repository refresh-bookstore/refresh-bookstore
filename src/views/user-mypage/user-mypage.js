import { main } from "/public/js/main.js";
import { checkValid } from "./checkValid.js";

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

// 회원 정보 조회
getUserData();

// 주문 조회 버튼 이벤트 리스너
orderListButton.addEventListener("click", handleOrderList);

// 회원 수정 버튼 이벤트 리스너
submitButton.addEventListener("click", updateUser);

// 회원 탈퇴 버튼 이벤트 리스너
deleteButton.addEventListener("click", deleteUser);

function loadUserData(userData) {
  // 회원 정보 로드
  if (userData) {
    userGreeting.innerText = `안녕하세요, ${userData.name}님\u{1F49A}`;
    nameText.innerText = userData.name;
    emailText.innerText = userData.email;
    postalCodeInput.value = userData.postalCode;
    addressInput.value = userData.address;
    detailAddressInput.value = userData.detailAddress;
    phoneInput.value = userData.phone;

    if (
      postalCodeInput.value === "undefined" ||
      addressInput.value === "undefined" ||
      detailAddressInput.value === "undefined"
    ) {
      postalCodeInput.value = "";
      addressInput.value = "";
      detailAddressInput.value = "";
    }

    if (phoneInput.value === "undefined") {
      phoneInput.value = "";
    }
  } else {
    alert("회원 정보가 없습니다.");
    // 홈으로 돌아가기
    location.replace("/");
  }
}

function handleOrderList(event) {
  location.href = "/order-list";
}

// 회원 정보 조회
async function getUserData() {
  try {
    const response = await fetch("/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      loadUserData(data);
    } else {
      return res.json().then((errData) => {
        throw new Error(
          errData.message || res.statusText || "오류가 발생했습니다."
        );
      });
    }
  } catch (err) {
    alert(err.message);
  }
}

async function updateUser(event) {
  const isAllValid = checkValid();

  if (isAllValid && confirm("회원 정보를 수정 하시겠습니까?")) {
    document.querySelector(".user-form-box").action = "/update";
    try {
      const response = await fetch("/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: passwordInput.value,
          postalCode: postalCodeInput.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          phone: phoneInput.value,
        }),
      });
      if (res.status !== 204) {
        if (res.status === 403) {
          alert("유효하지 않은 접근입니다.");
          location.replace("/");
        } else {
          return res.json().then((errData) => {
            throw new Error(
              errData.message || res.statusText || "오류가 발생했습니다."
            );
          });
        }
      }
    } catch (err) {
      alert(err.message);
    }
  } else {
    event.preventDefault();
    checkValid();
  }
}

async function deleteUser(event) {
  event.preventDefault();
  const isAllValid = checkValid();

  if (isAllValid && confirm("정말 탈퇴하시겠습니까?")) {
    document.querySelector(".user-form-box").action = "/user";
    try {
      const response = await fetch("/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailText.innerText,
          password: passwordInput.value,
        }),
      });
      if (response.status === 204) {
        alert(`탈퇴하셨습니다.\n다음에 만나요 꼬옥\u{2764}`);
        localStorage.clear();
        location.replace("/");
        if (res.status === 403) {
          alert("유효하지 않은 접근입니다.");
          location.replace("/");
        } else {
          return res.json().then((errData) => {
            throw new Error(
              errData.message || res.statusText || "오류가 발생했습니다."
            );
          });
        }
      }
    } catch (err) {
      alert(err.message);
    }
  } else {
    checkValid();
    console.log("탈퇴 취소");
  }
}

main();
