import { main } from '/public/js/main.js';
import { logout } from '/public/js/logout.js';

const token = sessionStorage.getItem('token');
if (!token) {
  alert("잘못된 접근입니다.");
  logout();
}

const orderList = document.querySelector('.orderList');
const home = document.querySelector('.home');

orderList.addEventListener('click', () => {
  location.href = '/order-list';
});
home.addEventListener('click', () => {
  location.href = '/';
})

main();