const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const passwordCheckInput = document.getElementById("passwordCheckInput");
const postalCodeInput = document.getElementById("postalCodeInput");
const addressInput = document.getElementById("addressInput");
const detailAddressInput = document.getElementById("detailAddressInput");
const phoneInput = document.getElementById("phoneInput");
const searchButton = document.getElementById("searchAddress");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const isAllValid = checkValid();

  if (isAllValid) {
    fetch("/register", {
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
  }
}

function checkValid() {
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordCheck = passwordCheckInput.value;
  const postalCode = postalCodeInput.value;
  const address = addressInput.value;
  const phone = phoneInput.value;

  // 이름 길이 확인
  const isNameValid = name.length >= 2;
  // 이메일 정규식 확인
  const isEmailValid =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // 비밀번호 확인 (8 ~ 15자, 특수문자, 문자, 숫자 포함)
  const isPasswordValid =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const isPasswordSame = password === passwordCheck;
  // 주소 검색 여부 확인
  const isAddressValid = postalCode && address;
  // 전화번호 확인 (가운데 - 기호 포함)
  const isPhoneValid = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const passwordCheckError = document.getElementById("passwordCheck-error");
  const phoneError = document.getElementById("phone-error");
  const addresError = document.getElementById("address-error");

  if (!isNameValid) {
    nameError.style.display = "flex";
    nameError.innerText = "이름은 2글자 이상 입력해주세요";
    return false;
  } else {
    nameError.style.display = "none";
  }

  if (!isEmailValid.test(email)) {
    emailError.style.display = "flex";
    emailError.innerText = "이메일 형식이 올바르지 않습니다";
    return false;
  } else {
    emailError.style.display = "none";
  }

  if (!isPasswordValid.test(password)) {
    passwordError.style.display = "flex";
    passwordError.innerText = "비밀번호 형식이 올바르지 않습니다";
    return false;
  } else {
    passwordError.style.display = "none";
  }

  if (!isPasswordSame) {
    passwordCheckError.style.display = "flex";
    passwordCheckError.innerText = "비밀번호가 일치하지 않습니다";
    return false;
  } else {
    passwordCheckError.style.display = "none";
  }

  if (!isAddressValid) {
    addresError.style.display = "flex";
    addresError.innerText = "주소를 검색해주세요";
    return false;
  } else {
    addresError.style.display = "none";
  }

  if (!isPhoneValid.test(phone)) {
    phoneError.style.display = "flex";
    phoneError.innerText = "전화번호 형식이 올바르지 않습니다";
    return false;
  } else {
    phoneError.style.display = "none";
  }

  return true;
}
