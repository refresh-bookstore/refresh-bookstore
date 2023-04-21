import { main } from '../../../public/js/main.js';
import { checkValid } from './checkValid.js';

const userGreeting = document.getElementById("user-greeting");
const nameInput = document.getElementById("nameInput");
const emailText = document.getElementById("emailText");
const passwordInput = document.getElementById("passwordInput");
const postalCodeInput = document.getElementById("postalCodeInput");
const addressInput = document.getElementById("addressInput");
const detailAddressInput = document.getElementById("detailAddressInput");
const phoneInput = document.getElementById("phoneInput");
const submitButton = document.getElementById("submitButton");
const deleteButton = document.getElementById("deleteButton");

// 임시 유저 데이터
const userData = {
    name: "김토끼",
    email: "elice@hello.com",
    password: "~1234qwer",
    postalCode: "13529",
    address: "경기 성남시 분당구 판교역로 166  (백현동)",
    detailAddress: "123동 456호",
    phone: "010-1234-5678",
};

/**
 * 이름: 수정 가능, db에서 가져와서 nameInput.value 에 미리 띄움
 * 이메일: 수정 불가, 바로 db에서 가져와서 띄움
 * 비밀번호: 수정 가능, 미리 안 띄움, 입력 필수
 * 비밀번호 확인: 미리 안 띄움, 입력 필수
 * 우편주소: 수정 가능, db에서 가져와서 postalCodeInput.value 에 미리 띄움
 * 주소: 수정 가능, db에서 가져와서 addressInput.value 에 미리 띄움
 * 상세주소: 수정 가능, db에서 가져와서 detail...Input.value 에 미리 띄움
 * 전화번호: 수정 가능, db에서 가져와서 phoneInput.value 에 미리 띄움
 */

// 회원 정보 로드
loadUserData(userData);

// 회원 수정 버튼 이벤트 리스너
submitButton.addEventListener("click", updateUser);

// 회원 탈퇴 버튼 이벤트 리스너
deleteButton.addEventListener("click", deleteUser);

function loadUserData(user) {
  userGreeting.innerText = `안녕하세요 ${user.name}님`;
  nameInput.value = user.name;
  emailText.innerText = user.email;
  postalCodeInput.value = user.postalCode;
  addressInput.value = user.address;
  detailAddressInput.value = user.detailAddress;
  phoneInput.value = user.phone;
}

function updateUserData() {
  return {
    name: nameInput.value,
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
    console.log("수정 완료");

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