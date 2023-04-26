import { users } from './users.js';

const adminContentUsers = document.querySelector('#admin-users');

const createUserList = () => {
  for(let i = 0; i < users.length; i++){
    adminContentUsers.innerHTML += 
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
          <img class="admin-button edit-user" title="회원 정보 수정" src="/public/images/icon_user_edit.svg">
          <img class="admin-button check-user hidden" title="확인" src="/public/images/icon_check.svg">
          <img class="admin-button delete-user" title="회원 탈퇴" src="/public/images/icon_user_remove.svg">
        </span>
      </div>
    </div>
    `
  }
}

export { createUserList };