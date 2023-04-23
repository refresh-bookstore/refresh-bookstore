import { main } from '../public/js/main.js';
import { books } from './books.js';
import { users } from './users.js';

const title = document.querySelector('.title');
const adminBooks = document.querySelector('#list-books');
const adminUsers = document.querySelector('#list-users');
const adminOrders = document.querySelector('#list-orders');
const adminCategories = document.querySelector('#list-categories');

const addBtn = document.querySelector('#add-button');
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
    addBtn.classList.add('active');
    title.innerText = e.innerText;
    


    //////////////////////도서관리///////////////////////
    if(lists.indexOf(e) === 0){
      contents[0].innerHTML = ""; 
      for(let i = 0; i < books.length; i++){
        contents[0].innerHTML += 
        `
        <div class="admin-items">
            <input type="checkbox">
            <div class="item-info">
              <div class="item-more-info">
                <p class="item-name"> ${books[i].title}</p>
                <p class="item-detail"> ${books[i].author} | ${books[i].publisher} | ${books[i].publication_date.getFullYear()} </p>
              </div>
              <p class="item-cost">${books[i].price.toLocaleString()}원</p>
              <span class="admin-buttons">
                <img class="button" src="../public/images/icon_edit.svg">
                <img class="button red" src="../public/images/icon_delete.svg">
              </span> 
            </div>

        `
      }
    }

    //////////////////////회원관리///////////////////////
    if(lists.indexOf(e) === 1){
      contents[1].innerHTML = ""; 
      for(let i = 0; i < users.length; i++){
        contents[1].innerHTML += 
        `
        <div class="admin-items">
          <input type="checkbox">
          <div class="item-info">
            <p class="item-added-date"> ${users[i].registered_date.getFullYear()} / ${users[i].registered_date.getMonth()} / ${users[i].registered_date.getDate()}</p>
            <div class="item-more-info">
              <p class="item-name"> ${users[i].name}</p>
              <p class="item-detail">${users[i].email}</p>
            </div>
            <span class="user-buttons">
              <img class="button set-user-admin" title="관리자 등록" src="../public/images/icon_user_admin.svg">
              <img class="button edit-user" title="회원 정보 수정" src="../public/images/icon_user_edit.svg">
              <img class="button remove-user" title="회원 탈퇴" src="../public/images/icon_user_remove.svg">
            </span>
          </div>
        </div>
        `
      }
    }

    //////////////////////주문관리///////////////////////
    if(lists.indexOf(e) === 2){
      contents[2].innerHTML = ""; 
      for(let i = 0; i < 5; i++){
        contents[2].innerHTML += 
        `
        <div class="admin-items ordered-list">
          <div class="order-upper">
              <input type="checkbox">
              <p class="item-name order"> 230421001 </p>
              <p class="order-status"> 배송중</p>
          </div>
          <div class="order-lower">
            <div class="item-info order">
              <div class="item-more-info order a">
                <p class="item-detail order"> 김토끼</p>
                <p class="item-detail order"> 010-2323-2323</p>
                <p class="item-detail order"> 서울시 양천구 오목로359 사무실</p>
              </div>
              <div class="item-more-info order b">
                <p class="item-detail order"> 혼자 공부하는 얄팍한 코딩 지식 (3)</p>
                <p class="item-detail order"> 코딩 관련 책 이름 하나</p>
                <p class="item-detail order"> 이것도 코딩에 관련된 책</p>
                <p class="item-detail order"> 책 이름은 모르지만 코딩임(2)</p>
              </div>
              <p class="item-cost"> 23,400원</p>
              <span class="admin-buttons">
                <img class="button" title="수정" src="../public/images/icon_edit.svg">
                <img class="button red" title="삭제" src="../public/images/icon_delete.svg">
              </span>
            </div>
          </div>
        </div>
        `
      }
    }

    //////////////////////카테고리관리///////////////////////
    if(lists.indexOf(e) === 3){
      contents[3].innerHTML = ""; 
      for(let i = 0; i < 5; i++){
        contents[3].innerHTML += 
        `
        <div class="category-box">
            <p class="category-name">프론트엔드</p>
            <img class="button red" title="삭제" src="../public/images/icon_delete.svg">
        </div>
        `
      }
    }

  })
})

main();