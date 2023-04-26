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
        <div class="admin-user-info">
          <p class="admin-user-added-date"> ${registered.getFullYear()} / ${registered.getMonth()} / ${registered.getDate()}</p>
          <div class="admin-info-block">
            <p class="admin-user-name"> ${users[i].name}</p>    
            <p class="admin-user-email">${users[i].email}</p>
          </div>
        </div>
      </div>
      `
    }
  }
}

export { createUserList };