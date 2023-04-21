import { main } from '../../../public/js/main.js';
import { checkValid } from './checkValid.js';

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  const isAllValid = checkValid();

  if (isAllValid) {
    console.log('회원가입 성공');
    location.replace('../home/home.html');
  } else {
    checkValid();
  }
}

main();