import { main } from '../public/js/main.js';

import { createBookList } from './user-admin-book.js';
import { createUserList } from './user-admin-user.js';
import { createOrderList } from './user-admin-order.js';
import { createCategoryList, addCategory, deleteCategory, editCategory } from './user-admin-category.js';

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
      contents[0].innerHTML = ""; 
        createBookList();
      }

    //////////////////////회원관리///////////////////////
    if(lists.indexOf(e) === 1){
      contents[1].innerHTML = ""; 
      createUserList();
      
    }

    //////////////////////주문관리///////////////////////
    if(lists.indexOf(e) === 2){
      contents[2].innerHTML = ""; 
      createOrderList();
      
    }

    //////////////////////카테고리관리///////////////////////
    if(lists.indexOf(e) === 3){
      contents[3].innerHTML = `
      <img class="add-button" id="category-add-button" src="../public/images/icon_add.svg">
      <div class="add-page hidden" id="admin-add-categories"></div>
      `; 
      createCategoryList();
      addCategory();
      editCategory();
      deleteCategory();
    }
  })
})




//////////////////////추가/수정/삭제 버튼구현///////////////////////

const bookEditBtn = document.querySelectorAll('.book-edit');
const bookDeleteBtn = document.querySelectorAll('.book-delete');
const bookCheckBtn = document.querySelectorAll('.book-check');

const userEditBtn = document.querySelectorAll('.user-edit');
const userDeleteBtn = document.querySelectorAll('.user-delete');
const userCheckBtn = document.querySelectorAll('.user-check');

const orderEditBtn = document.querySelectorAll('.order-edit');
const orderDeleteBtn = document.querySelectorAll('.order-delete');
const orderCheckBtn = document.querySelectorAll('.order-check');



main();