const passwordInput = document.getElementById("passwordInput");
const passwordCheckInput = document.getElementById("passwordCheckInput");
const postalCodeInput = document.getElementById("postalCodeInput");
const addressInput = document.getElementById("addressInput");
const phoneInput = document.getElementById("phoneInput");

function checkValid() {
  // 전화번호 자동 하이픈 추가
  phoneInput.value = phoneInput.value.replace(
    /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
    "$1-$2-$3");

  const name = nameInput.value;
  const password = passwordInput.value;
  const passwordCheck = passwordCheckInput.value;
  const phone = phoneInput.value;

  // 비밀번호 확인 (8 ~ 15자, 특수문자, 문자, 숫자 포함)
  const isPasswordValid = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  const isPasswordSame = password === passwordCheck;
  // 전화번호 확인 (가운데 - 기호 포함)
  const isPhoneValid = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;

  const passwordError = document.getElementById("password-error");
  const passwordCheckError = document.getElementById("passwordCheck-error");
  const phoneError = document.getElementById("phone-error");

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

  if (!isPhoneValid.test(phone)) {
    phoneError.style.display = "flex";
    phoneError.innerText = "전화번호 형식이 올바르지 않습니다";
    return false;
  } else {
    phoneError.style.display = "none";
  }
  
  return true;
}

export { checkValid }