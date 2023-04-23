function headerFunc() {
  const searchBtn = document.querySelector('#search-icon');
  const cartBtn = document.querySelector('#cart-icon');
  const userBtn = document.querySelector('#user-icon');
  
  const searchInput = document.querySelector('.search-input');
  const searchBox = document.querySelector('.search-box');
  
  const logoImage = document.querySelector('.logo');

  //검색창 애니메이션

  const searchInputAppear = [
    { transform: "translate(300px, 0px)" },
    { transform: "translate(0px, 0px)" },
  ];
  
  const searchInputDisappear = [
    { transform: "translate(0px, 0px)" },
    { transform: "translate(300px, 0px)" },
  ];
  
  const searchInputTiming = {
    duration: 250,
    iterations: 1,
  };
  
  //검색창 마우스오버 이벤트
  
  searchBtn.addEventListener('mouseover', ()=>{
    if(searchBtn.classList.contains('activate')){
      searchBtn.addEventListener('click', ()=>{
      })
    }else{
    searchBtn.classList.add('activate');
    searchInput.classList.add('activate');
    searchInput.animate(searchInputAppear,searchInputTiming);
    setTimeout(()=>{
      searchInput.placeholder = "도서명을 검색해주세요.";
    }, 230);
    }
  })
  
  //검색창 마우스아웃 이벤트

  searchInput.addEventListener('mouseout', ()=>{
      searchInput.animate(searchInputDisappear,searchInputTiming);
      searchInput.placeholder = "";
      searchInput.value = "";
      setTimeout(()=>{
        searchBtn.classList.remove('activate');
      
        searchInput.classList.remove('activate');
      }, 230);
  })
  
  
  /* (임시) 파일 이동  */

  // 로고 클릭 이벤트
  logoImage.addEventListener("click", () => {
    location.replace("../home/home.html");
  })

  // 장바구니 아이콘 클릭 이벤트
  cartBtn.addEventListener("click", () => {
    location.replace("../cart/cart.html");
  })

  // 드롬 다운 메뉴 생성
  const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');
    dropdownMenu.innerHTML = `
      <ul class="menu-ul">
        <li class="menu-li" id="menu-mypage">마이페이지</li>
        <li class="menu-li" id="menu-logout">로그아웃</li>
      </ul>
    `;
  
  // 드롭 다운 메뉴 HTML 추가
  userBtn.appendChild(dropdownMenu);

  // 유저 아이콘 클릭 이벤트
  userBtn.addEventListener("click", () => {
    if (dropdownMenu.style.display === "none") {
      dropdownMenu.style.display = "flex";
    } else {
      dropdownMenu.style.display = "none";
    }
  })

  const mypageBtn = document.querySelector("#menu-mypage");
  const logoutBtn = document.querySelector("#menu-logout");

  // 마이페이지 메뉴 클릭 이벤트
  mypageBtn.addEventListener("click", () => {
    location.replace("../user-mypage/user-mypage.html");
  })

  // 로그아웃 메뉴 클릭 이벤트
  logoutBtn.addEventListener("click", () => {
    console.log("로그아웃 성공");
  })

}

export { headerFunc };