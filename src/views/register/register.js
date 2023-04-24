import { main } from '../public/js/main.js';
import { checkValid } from './checkValid.js';

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", handleSubmit);
async function handleSubmit(e) {
  e.preventDefault();
  const isAllValid = checkValid();

  if (isAllValid) {
    await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        passwordCheck: passwordCheckInput.value,
        postalCode: postalCodeInput.value,
        address: addressInput.value,
        detailAddress: detailAddressInput.value,
        phone: phoneInput.value,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("서버 오류");
        }
      })
      .then(data => {
        alert(data.message);
        location.replace("/");
      })
      .catch(error => {
        console.error(error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      });
  } else {
    checkValid();
  }
}

main();