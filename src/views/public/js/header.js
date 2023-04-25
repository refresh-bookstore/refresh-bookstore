function headerFunc() {
  const searchBtn = document.querySelector('#search-icon');
  const cartBtn = document.querySelector('#cart-icon');
  const userBtn = document.querySelector('#user-icon');
  
  const searchInput = document.querySelector('.header-search-input');
  const searchBox = document.querySelector('.header-search-box');
  
  const logoImage = document.querySelector('.header-logo');

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
  
  //검색창 클릭 이벤트
  
  searchBtn.addEventListener('click', ()=>{
    if(searchBtn.classList.contains('activate')){
        if(searchInput.value){
          
          ///검색기능

        }else{
          searchInput.placeholder = "";
          searchInput.animate(searchInputDisappear,searchInputTiming);
          setTimeout(()=>{
            searchBtn.classList.remove('activate');
            searchInput.classList.remove('activate');
          }, 230)
        }
    }else{
    searchBtn.classList.add('activate');
    searchInput.classList.add('activate');
    searchInput.animate(searchInputAppear,searchInputTiming);
    setTimeout(()=>{
      searchInput.placeholder = "도서명을 검색해주세요.";
    }, 230);
    }
  })
  

  // 로고 클릭 이벤트
  logoImage.addEventListener("click", () => {
    location.href = "/";
  })

  // 장바구니 아이콘 클릭 이벤트
  cartBtn.addEventListener("click", () => {
    location.href = "/cart";
  })

  // 드롭 다운 메뉴 생성
  const dropdownMenu = document.createElement('div');
  dropdownMenu.style.display = "none";
  dropdownMenu.classList.add('header-dropdown-menu');

  const token = sessionStorage.getItem('token');
  if (token) {
    // 로그인한 유저일 때
    dropdownMenu.innerHTML = `
      <ul class="header-menu-ul">
        <li class="header-menu-li" id="menu-mypage">마이페이지</li>
        <li class="header-menu-li" id="menu-logout">로그아웃</li>
      </ul>
    `;

    // 드롭 다운 메뉴 HTML 추가
    userBtn.appendChild(dropdownMenu);

    const mypageBtn = document.querySelector("#menu-mypage");
    const logoutBtn = document.querySelector("#menu-logout");

    // 마이페이지 메뉴 클릭 이벤트
    mypageBtn.addEventListener("click", moveToMypage);

    // 로그아웃 메뉴 클릭 이벤트
    logoutBtn.addEventListener("click", () => {
      alert("다음에 만나요 꼬옥\u{1F49A}");
      
      sessionStorage.removeItem('token');
      location.href = '/';
    })
  } else {
    // 로그인한 유저가 아닐 때
    dropdownMenu.innerHTML = `
      <ul class="header-menu-ul">
        <li class="header-menu-li" id="menu-login">로그인</li>
        <li class="header-menu-li" id="menu-register">회원가입</li>
      </ul>
    `;

    // 드롭 다운 메뉴 HTML 추가
    userBtn.appendChild(dropdownMenu);

    const loginBtn = document.querySelector("#menu-login");
    const registerBtn = document.querySelector("#menu-register");

    // 로그인 메뉴 클릭 이벤트
    loginBtn.addEventListener("click", () => {
      location.href = "/login";
    })

    // 회원가입 메뉴 클릭 이벤트
    registerBtn.addEventListener("click", () => {
      location.href = "/register";
    })
  }

  // 유저 아이콘 클릭 이벤트
  userBtn.addEventListener("click", () => {
    if (dropdownMenu.style.display === "none") {
      dropdownMenu.style.display = "flex";
    } else {
      dropdownMenu.style.display = "none";
    }
  })

  // 마이페이지 메뉴 이동
  async function moveToMypage () {
    try {
      const response = await fetch ("/mypage-menu", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // 데이터를 sessionStorage에 저장
        sessionStorage.setItem("userData", JSON.stringify(data));

        // 마이페이지로 이동
        location.href = "/user-mypage";
      } else {
        alert("사용자를 찾을 수 없습니다.");

        // 토큰 제거
        sessionStorage.removeItem('token');
        location.href = '/';

        throw new Error("사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export { headerFunc };