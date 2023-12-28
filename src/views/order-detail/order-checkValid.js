const nameInput = document.getElementById("nameInput");
const postalCodeInput = document.getElementById("postalCodeInput");
const addressInput = document.getElementById("addressInput");
const phoneInput = document.getElementById("phoneInput");

function checkValid() {
  const name = nameInput.value;
  const postalCode = postalCodeInput.value;
  const address = addressInput.value;
  const phone = phoneInput.value;

  // 이름 길이 확인
  const isNameValid = name.length >= 2;
  // 주소 검색 여부 확인
  const isAddressValid = postalCode && address;
  // 전화번호 확인 (가운데 - 기호 포함)
  const isPhoneValid = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;

  const inputError = document.getElementById("input-error");

  if (!isNameValid) {
    inputError.style.display = "flex";
    inputError.innerText = "이름은 2글자 이상 입력해주세요";
    nameInput.focus();
    return false;
  } else {
    inputError.style.display = "none";
  }

  if (!isAddressValid) {
    inputError.style.display = "flex";
    inputError.innerText = "주소를 검색해주세요";
    addressInput.focus();
    return false;
  } else {
    inputError.style.display = "none";
  }

  if (!isPhoneValid.test(phone)) {
    inputError.style.display = "flex";
    inputError.innerText = "전화번호 형식이 올바르지 않습니다";
    phoneInput.focus();
    return false;
  } else {
    inputError.style.display = "none";
  }

  return true;
}

export { checkValid };
