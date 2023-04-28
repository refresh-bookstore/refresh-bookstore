const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const passwordCheckInput = document.getElementById("passwordCheckInput");
const postalCodeInput = document.getElementById("postalCodeInput");
const addressInput = document.getElementById("addressInput");
const phoneInput = document.getElementById("phoneInput");

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
  const isEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // 비밀번호 확인 (8 ~ 15자, 특수문자, 문자, 숫자 포함)
  const isPasswordValid = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
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

  if (!isNameValid && name.length > 0) {
    nameError.style.display = "flex";
    nameError.innerText = "이름은 2글자 이상 입력해주세요";
    nameInput.focus();
    return false;
  } else {
    nameError.style.display = "none";
  }

  if (!isEmailValid.test(email) && email.length > 0) {
    emailError.style.display = "flex";
    emailError.innerText = "이메일 형식이 올바르지 않습니다";
    emailInput.focus();
    return false;
  } else {
    emailError.style.display = "none";
  }

  if (!isPasswordValid.test(password) && password.length > 0) {
    passwordError.style.display = "flex";
    passwordError.innerText = "비밀번호 형식(8 ~ 15자, 특수문자, 문자, 숫자 포함)이 올바르지 않습니다";
    passwordInput.focus();
    return false;
  } else {
    passwordError.style.display = "none";
  }

  if (!isPasswordSame && passwordCheck.length > 0) {
    passwordCheckError.style.display = "flex";
    passwordCheckError.innerText = "비밀번호가 일치하지 않습니다";
    passwordCheckInput.focus();
    return false;
  } else {
    passwordCheckError.style.display = "none";
  }

  if (!isAddressValid && postalCode > 0) {
    addresError.style.display = "flex";
    addresError.innerText = "주소를 검색해주세요";
    addressInput.focus();
    return false;
  } else {
    addresError.style.display = "none";
  }

  if (!isPhoneValid.test(phone) && phone.length > 0) {
    phoneError.style.display = "flex";
    phoneError.innerText = "전화번호 형식이 올바르지 않습니다";
    phoneInput.focus();
    return false;
  } else {
    phoneError.style.display = "none";
  }

  if (!name || !email || !password || !passwordCheck || !postalCode || !address || !phone) {
    const isNull = [];

    if (!name) { isNull.push("이름"); }
    if (!email) { isNull.push("이메일"); }
    if (!password) { isNull.push("비밀번호"); }
    if (!passwordCheck) { isNull.push("비밀번호 확인"); }
    if (!postalCode) { isNull.push("우편번호"); }
    if (!address) { isNull.push("주소"); }
    if (!phone) { isNull.push("전화번호"); }

    alert(`${isNull.join(", ")}을(를) 입력해주세요. \u{1F913}`);
    return false;
  }
  
  return true;
}

export { checkValid }