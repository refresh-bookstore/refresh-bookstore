import { main } from "/public/js/main.js";
import { checkValid } from "./checkValid.js";

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const isAllValid = checkValid();

  if (isAllValid) {
    try {
      const response = await fetch("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
          postalCode: postalCodeInput.value,
          address: addressInput.value,
          detailAddress: detailAddressInput.value,
          phone: phoneInput.value,
        }),
      });
      if (response.status === 204) {
        alert(`회원가입이 완료되었습니다!\n${nameInput.value}님 환영합니다!`);
        location.replace("/login");
      } else {
        throw new Error("이미 가입된 이메일 입니다");
      }
    } catch (error) {
      alert(error.message);
    }
  }
}

main();
