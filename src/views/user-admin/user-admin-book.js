import { books } from './books.js';

const bookAddBtn = document.querySelector('#book-add-button');
const adminAddBooks = document.querySelector('#admin-add-books');
const adminContentBooks = document.querySelector('#admin-books');

const createBookList = () => {
  adminAddBooks.classList.add('active');
  bookAddBtn.classList.add('active');
  for(let i = 0; i < books.length; i++){
    adminContentBooks.innerHTML += 
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
            <img class="admin-button" src="../public/images/icon_edit.svg">
            <img class="admin-button" src="../public/images/icon_delete.svg">
          </span> 
        </div>
    `
  }
}

export { createBookList };