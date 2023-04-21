import { main } from '../../../public/js/main.js';

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const submitButton = document.getElementById("submitButton");
const registerButton = document.getElementById("registerButton");

submitButton.addEventListener("click", handlerSubmit);
registerButton.addEventListener("click", handlerRegister);

function handlerSubmit(event) {
  event.preventDefault();
  
  const isAllValid = checkValid();

  if (isAllValid) {
    console.log('로그인 성공');
  }
}

function handlerRegister(event) {
  event.preventDefault();
  console.log('회원가입 페이지로 이동');
}

function checkValid() {
  const email = emailInput.value;
  const password = passwordInput.value;

  const joinError = document.getElementById("join-error");

  if (!email || !password) {
    joinError.style.display = "flex";
    joinError.innerText = "이메일 또는 비밀번호가 일치하지 않습니다.";
    return false;
  } else if (email.length >= 1 && password.length >= 1) {
    // 로그인 가능한 임시 조건
    joinError.style.display = "none";
  }

  return true;
}

main();