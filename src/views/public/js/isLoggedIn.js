// 로그인 유무에 따라 이미지 변경
async function isLoggedIn() {
  const headerUser = document.querySelector(".header-user");

  try {
    const response = await fetch("/login/status");
    const text = await response.text();
    const isLoggedIn = text === "true";

    if (isLoggedIn) {
      headerUser.classList.add("login");
    } else {
      headerUser.classList.remove("login");
    }
  } catch (error) {
    console.error("로그인 상태 확인 중 오류 발생:", error);
    headerUser.classList.remove("login");
  }
}

export { isLoggedIn };
