import { main } from "/public/js/main.js";

import { createBookList } from "./user-admin-book.js";
import { createUserList } from "./user-admin-user.js";
import { createOrderList } from "./user-admin-order.js";
import { createCategoryList } from "./user-admin-category.js";

const title = document.querySelector(".title");

// DOM 요소 존재 확인
const checkElement = (selector, name) => {
  const element = document.querySelector(selector);
  if (!element) {
    return null;
  }
  return element;
};

const adminBooks = checkElement("#list-books", "Admin Books");
const adminUsers = checkElement("#list-users", "Admin Users");
const adminOrders = checkElement("#list-orders", "Admin Orders");
const adminCategories = checkElement("#list-categories", "Admin Categories");

const adminContentBooks = checkElement("#admin-books", "Admin Content Books");
const adminContentUsers = checkElement("#admin-users", "Admin Content Users");
const adminContentOrders = checkElement(
  "#admin-orders",
  "Admin Content Orders"
);
const adminContentCategories = checkElement(
  "#admin-categories",
  "Admin Content Categories"
);

const lists = [adminBooks, adminUsers, adminOrders, adminCategories];
const contents = [
  adminContentBooks,
  adminContentUsers,
  adminContentOrders,
  adminContentCategories,
];

// 목록별 페이지 구현
lists.forEach((e) => {
  e.addEventListener("click", () => {
    contents.forEach((el, index) => {
      if (index === lists.indexOf(e)) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });

    title.innerText = e.innerText;

    switch (lists.indexOf(e)) {
      case 0:
        createBookList();
        break;
      case 1:
        createUserList();
        break;
      case 2:
        createOrderList();
        break;
      case 3:
        createCategoryList();
        break;
      default:
        alert("Unknown list item clicked");
    }
  });
});

main();
