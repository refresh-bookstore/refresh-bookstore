const adminContentUsers = document.querySelector('#admin-users');


const expandTiming = {
  duration: 100,
  iteration: 1,
};

const createUserList = () => {
  fetch('/users')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    listingUsers(data);
  })
  .catch((err) => console.log(err));

  const listingUsers = (users) => {
    adminContentUsers.innerHTML = ""; 
    for(let i = 0; i < users.length; i++){
      const registered = new Date(users[i].createdAt);
      adminContentUsers.innerHTML += 
      `
      <div class="admin-items">
        <div class="admin-user-info">
          <p class="admin-user-added-date"> ${registered.getFullYear()} / ${registered.getMonth() + 1} / ${registered.getDate()}</p>
          <div class="admin-info-block">
            <p class="admin-user-name"> ${users[i].name}</p>    
            <p class="admin-user-email">${users[i].email}</p>
          </div>
        </div>
      </div>
      `

      adminUserCloserLook(users);


    }
  }
}
const adminUserCloserLook = (users) => {
  const userInfoBlocks = adminContentUsers.querySelectorAll('.admin-items');
  userInfoBlocks.forEach((e)=> {
    e.addEventListener('click', ()=>{
      const moreInfo = e.querySelector('.user-more-infos');
      if(moreInfo){
        moreInfo.remove();
        e.style.height = "40px";
      }else{
        const userEmailPart = e.querySelector('.admin-user-email')
        const thisUser = users.find((e) =>  e.email === userEmailPart.innerText );
        console.log(thisUser);
        e.style.height = "130px";
        setTimeout(()=>{
          e.innerHTML += `
            <div class="user-more-infos">
              <p>전화번호 | ${thisUser.phone}</p>
              <p>우편번호 | ${thisUser.postalCode}</p>
              <p>주소 | ${thisUser.address} ${thisUser.detailAddress}</p>
            </div>
            `
        }, 230);
      }
    })
  })


}

export { createUserList };