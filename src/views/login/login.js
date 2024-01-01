import { main } from "/public/js/main.js";

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
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      if (response.status === 204) {
        const preLoginUrl = sessionStorage.getItem("preLoginUrl") || "/";
        location.replace(preLoginUrl);
      } else {
        res.json().then((errData) => {
          throw new Error(
            errData.message || res.statusText || "오류가 발생했습니다."
          );
        });
      }
    } catch (error) {
      alert("이메일 또는 비밀번호를 다시 한번 확인해주세요.");
    }
  }
}

// 회원가입으로 이동
function handlerRegister(event) {
  event.preventDefault();

  location.href = "/register";
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
