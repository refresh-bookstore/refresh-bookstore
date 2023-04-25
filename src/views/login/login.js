import { main } from '../public/js/main.js';

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const joinError = document.getElementById("join-error");

const submitButton = document.getElementById("submitButton");
const registerButton = document.getElementById("registerButton");

submitButton.addEventListener("click", handlerSubmit);
registerButton.addEventListener("click", handlerRegister);

async function handlerSubmit(event) {
  event.preventDefault();
  
  const isAllValid = checkValid();

  if (isAllValid) {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value
        })
      });

      if (response.ok) {
        const data = await response.json();

        sessionStorage.setItem('token', data.token);
        location.replace("/");
      } else if (response.status === 401 || response.status === 500) {
        // 로그인 서버 오류

        joinError.style.display = "flex";
        joinError.innerText = "이메일 또는 비밀번호가 일치하지 않습니다.";  
      } else {
        throw new Error('로그인 실패했습니다.');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

// 회원가입으로 이동
function handlerRegister(event) {
  event.preventDefault();

  location.href = "/register"
}

function checkValid() {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    joinError.style.display = "flex";
    joinError.innerText = "이메일 또는 비밀번호를 입력해주세요.";
    return false;
  } else {
    joinError.style.display = "none";
  }

  return true;
}

main();