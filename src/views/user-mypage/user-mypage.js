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

// 회원 정보 조회
getUserData();

// 주문 조회 버튼 이벤트 리스너
orderListButton.addEventListener("click", handleOrderList);

// 회원 수정 버튼 이벤트 리스너
submitButton.addEventListener("click", updateUser);

// 회원 탈퇴 버튼 이벤트 리스너
deleteButton.addEventListener("click", deleteUser);

// 페이지를 떠날 때 세션 스토리지의 userData 삭제
window.addEventListener("beforeunload", function() {
  sessionStorage.removeItem("userData");
});

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

    if (postalCodeInput.value === "undefined" ||
      addressInput.value === "undefined" ||
      detailAddressInput.value === "undefined") {
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
  event.preventDefault();

  location.href = "/order-list";
}

// 회원 정보 조회
async function getUserData () {
  try {
    const response = await fetch ("/userinfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      loadUserData(data);
    } else {
      alert("사용자를 찾을 수 없습니다.");

      throw new Error("사용자를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function updateUser(event) {
  const isAllValid = checkValid();

  if (isAllValid && confirm("회원 정보를 수정 하시겠습니까?")) {
    document.querySelector('.user-form-box').action = '/update';
    try {
      const response = await fetch("/update", {
        method: "POST",
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

      if (response.ok) {
        const updated = JSON.stringify({
          name: nameText.innerText,
          email: emailText.innerText,
          password: passwordInput.value,
          postalCode: postalCodeInput.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          phone: phoneInput.value,
        });

        sessionStorage.removeItem("userData");
        sessionStorage.setItem("userData", updated);

        alert("회원정보가 수정되었습니다.");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
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
    document.querySelector('.user-form-box').action = '/user';
    try {
      const response = await fetch("/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailText.innerText
        })
      });

      const data = await response.json();
      console.log(data)
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
    checkValid();
    console.log("탈퇴 취소");
  }
}

main();