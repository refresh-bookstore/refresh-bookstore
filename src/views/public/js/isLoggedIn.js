// 로그인 유무에 따라 이미지 변경
function isLoggedIn() {
  const token = localStorage.getItem('token');
  const headerUser = document.querySelector('.header-user');

  if (token) {
    headerUser.classList.add('login');
  } else {
    headerUser.classList.remove('login');
  }
}

export { isLoggedIn };