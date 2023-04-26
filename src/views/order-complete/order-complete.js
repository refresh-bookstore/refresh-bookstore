import { main } from '/public/js/main.js';

const orderList = document.querySelector('.orderList');
const home = document.querySelector('.home');

orderList.addEventListener('click', () => {
  location.href = '/order-list';
});
home.addEventListener('click', () => {
  location.href = '/';
})

main();