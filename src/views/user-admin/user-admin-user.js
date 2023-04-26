const adminContentUsers = document.querySelector('#admin-users');


const createUserList = () => {
  fetch('/users')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    listingUsers(data);
  })
  .catch((err) => console.log(err));

  const listingUsers = (users) => {
    for(let i = 0; i < users.length; i++){
      const registered = new Date(users[i].createdAt);
      adminContentUsers.innerHTML += 
      `
      <div class="admin-items">
        <input type="checkbox">
        <div class="item-info">
          <p class="item-added-date"> ${registered.getFullYear()} / ${registered.getMonth()} / ${registered.getDate()}</p>
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
}

export { createUserList };