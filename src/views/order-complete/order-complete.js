import { main } from "/public/js/main.js";
import { logout } from "/public/js/logout.js";

localStorage.removeItem("purchase");

async function checkLoginStatus() {
  try {
    const response = await fetch("/login/status");
    const text = await response.text();
    return text === "true";
  } catch (error) {
    console.error("로그인 상태 확인 중 오류 발생:", error);
    return false;
  }
}

const loggedIn = await checkLoginStatus();
if (!loggedIn) {
  alert("잘못된 접근입니다.");
  logout();
}

const orderList = document.querySelector(".orderList");
const home = document.querySelector(".home");

orderList.addEventListener("click", () => {
  location.href = "/order-list";
});
home.addEventListener("click", () => {
  location.href = "/";
});

main();
