import { main } from "/public/js/main.js";

const button = document.getElementById("return-home-button");

// 홈으로 돌아가기
button.addEventListener("click", () => {
  location.href = "/";
});

main();
