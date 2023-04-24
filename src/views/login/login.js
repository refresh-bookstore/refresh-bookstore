import { main } from '../public/js/main.js';

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const submitButton = document.getElementById("submitButton");
const registerButton = document.getElementById("registerButton");

submitButton.addEventListener("click", handlerSubmit);
registerButton.addEventListener("click", handlerRegister);

async function handlerSubmit(event) {
  event.preventDefault();
  
  const isAllValid = checkValid();

  if (isAllValid) {
    console.log("임시 로그인 성공");
    const data = JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value
    });

    sessionStorage.setItem('token', data);
    location.href = '/';
  }

  // 로그인 수정이 완료된 다면 아래 주석 해제
  // if (isAllValid) {
  //   try {
  //     const response = await fetch("/login", {
  //       method: "POST",
  //       headers: {
  //         'content-Type': 'application/json',
  //         Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  //       },
  //       body: JSON.stringify({
  //         email: emailInput.value,
  //         password: passwordInput.value
  //       })
  //     });

  //     if (response.ok) {
  //       const data = await response.json();

  //       sessionStorage.setItem('token', data);
  //       location.href = '/';
  //     } else {
  //       throw new Error('로그인 실패했습니다.');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert("로그인 실패");
  //   }
  // }
}

// 회원가입으로 이동
function handlerRegister(event) {
  event.preventDefault();

  location.href = "/register"
}

function checkValid() {
  const email = emailInput.value;
  const password = passwordInput.value;

  const joinError = document.getElementById("join-error");

  if (!email || !password) {
    joinError.style.display = "flex";
    joinError.innerText = "이메일 또는 비밀번호가 일치하지 않습니다.";
    return false;
  } else {
    joinError.style.display = "none";
  }

  return true;
}

main();