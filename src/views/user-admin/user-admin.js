import { main } from '/public/js/main.js';

import { createBookList } from './user-admin-book.js';
import { createUserList } from './user-admin-user.js';
import { createOrderList } from './user-admin-order.js';
import { createCategoryList } from './user-admin-category.js';

const title = document.querySelector('.title');
const adminBooks = document.querySelector('#list-books');
const adminUsers = document.querySelector('#list-users');
const adminOrders = document.querySelector('#list-orders');
const adminCategories = document.querySelector('#list-categories');

const adminContentBooks = document.querySelector('#admin-books');
const adminContentUsers = document.querySelector('#admin-users');
const adminContentOrders = document.querySelector('#admin-orders');
const adminContentCategories = document.querySelector('#admin-categories');

const lists = [
  adminBooks,
  adminUsers,
  adminOrders,
  adminCategories,
];

const contents = [
  adminContentBooks,
  adminContentUsers,
  adminContentOrders,
  adminContentCategories,
];


//////////////////////목록별 페이지 구현///////////////////////
lists.forEach((e)=> {
  e.addEventListener('click', ()=>{
    contents.map((el) => {
      if (contents.indexOf(el) === lists.indexOf(e)) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    })
    title.innerText = e.innerText;
    


    //////////////////////도서관리///////////////////////
    if(lists.indexOf(e) === 0){
        createBookList();
      }

    //////////////////////회원관리///////////////////////
    if(lists.indexOf(e) === 1){
      createUserList();
      
    }

    //////////////////////주문관리///////////////////////
    if(lists.indexOf(e) === 2){
      createOrderList();
      
    }

    //////////////////////카테고리관리///////////////////////
    if(lists.indexOf(e) === 3){
      createCategoryList();
    }
  })
})


main();