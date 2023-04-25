import { main } from "/public/js/main.js";
import { checkValid } from "./checkValid.js";

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const isAllValid = checkValid();

  if (isAllValid) {
    try {
      const response = await fetch("/register", {
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
      });

      if (response.ok) {
        const data = await response.json();
        
        alert(`${data.message}\n${nameInput.value}님 환영합니다!`);
        location.href = "/login";
      } else {
        throw new Error("회원가입 실패했습니다.");
      }
    } catch (error) {
      console.log(error.message);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  } else {
    checkValid();
  }
}

main();