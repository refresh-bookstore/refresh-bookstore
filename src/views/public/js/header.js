import { logout } from "./logout.js";
import { isFullCart } from "./isFullCart.js";
import { isLoggedIn } from "./isLoggedIn.js";

async function checkLoginStatus() {
  try {
    const response = await fetch("/login/status");
    return response.status === 204;
  } catch (error) {
    console.error("로그인 상태 확인 중 오류 발생:", error);
    return false;
  }
}

async function headerFunc() {
  const searchBtn = document.querySelector("#search-icon");
  const cartBtn = document.querySelector("#cart-icon");
  const userBtn = document.querySelector("#user-icon");

  const searchInput = document.querySelector(".header-search-input");
  const searchBox = document.querySelector(".header-search-box");

  const logoImage = document.querySelector(".header-logo");

  // 검색창 애니메이션
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

  // 검색창 클릭 이벤트
  searchBtn.addEventListener("click", async () => {
    if (searchBtn.classList.contains("activate")) {
      handleSearch();
    } else {
      searchBtn.classList.add("activate");
      searchInput.classList.add("activate");
      searchInput.animate(searchInputAppear, searchInputTiming);
      setTimeout(() => {
        searchInput.placeholder = "도서명을 검색해주세요.";
      }, 230);
    }
  });

  // 검색창 엔터 이벤트
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  const handleSearch = async () => {
    if (searchInput.value) {
      location.href = "/book-search";
      localStorage.setItem("search", searchInput.value);
    } else {
      searchInput.placeholder = "";
      searchInput.animate(searchInputDisappear, searchInputTiming);
      setTimeout(() => {
        searchBtn.classList.remove("activate");
        searchInput.classList.remove("activate");
      }, 230);
    }
  };

  // 로고 클릭 이벤트
  logoImage.addEventListener("click", () => {
    location.href = "/";
  });

  // 장바구니 아이콘 클릭 이벤트
  cartBtn.addEventListener("click", () => {
    location.href = "/cart";
  });

  // 장바구니 아이템 유무에 따라 아이콘 변경
  isFullCart();

  // 로그인 유무에 따라 아이콘 변경
  isLoggedIn();

  // 드롭 다운 메뉴 생성
  const dropdownMenu = document.createElement("div");
  dropdownMenu.style.display = "none";
  dropdownMenu.classList.add("header-dropdown-menu");

  const loggedIn = await checkLoginStatus();
  if (loggedIn) {
    // 로그인한 유저일 때
    dropdownMenu.innerHTML = `
      <ul class="header-menu-ul">
        <div class="li-container mypage">
          <li class="header-menu-li" id="menu-mypage">마이페이지</li>
        </div>
        <div class="li-container logout">
          <li class="header-menu-li" id="menu-logout">로그아웃</li>
        </div>
      </ul>
    `;

    // 드롭 다운 메뉴 HTML 추가
    userBtn.appendChild(dropdownMenu);

    const mypageBtn = document.querySelector(".mypage");
    const logoutBtn = document.querySelector(".logout");

    // 마이페이지 메뉴 클릭 이벤트
    mypageBtn.addEventListener("click", () => {
      location.href = "/user-mypage";
    });

    // 로그아웃 메뉴 클릭 이벤트
    logoutBtn.addEventListener("click", logout);
  } else {
    // 로그인한 유저가 아닐 때
    dropdownMenu.innerHTML = `
      <ul class="header-menu-ul">
        <div class="li-container login">
          <li class="header-menu-li" id="menu-login">로그인</li>
        </div>
        <div class="li-container register">
          <li class="header-menu-li" id="menu-register">회원가입</li>
        </div>
      </ul>
    `;

    // 드롭 다운 메뉴 HTML 추가
    userBtn.appendChild(dropdownMenu);

    const loginBtn = document.querySelector(".login");
    const registerBtn = document.querySelector(".register");

    /**
     * 로그인 페이지로 이동하기 전에 현재 페이지의 URL을 세션 스토리지에 저장합니다.
     * 이렇게 하면 사용자가 로그인한 후 이전 페이지로 쉽게 돌아갈 수 있습니다.
     *
     * sessionStorage.setItem:
     *  - 세션 스토리지에 'preLoginUrl' 키로 현재 페이지의 URL을 저장합니다.
     *  - 세션 스토리지는 탭이 닫히면 정보가 사라지므로, 사용자가 브라우저를 닫았다가
     *    다시 로그인할 경우 이전 페이지로 리디렉션되지 않습니다.
     *
     * location.href:
     *  - 사용자를 로그인 페이지('/login')로 리디렉션합니다.
     *
     * @author Hojun Song
     */
    loginBtn.addEventListener("click", () => {
      sessionStorage.setItem("preLoginUrl", window.location.href);
      location.href = "/login";
    });

    // 회원가입 메뉴 클릭 이벤트
    registerBtn.addEventListener("click", () => {
      location.href = "/register";
    });
  }

  // 유저 아이콘 클릭 이벤트
  userBtn.addEventListener("click", () => {
    if (dropdownMenu.style.display === "none") {
      dropdownMenu.style.display = "flex";
    } else {
      dropdownMenu.style.display = "none";
    }
  });
}

export { headerFunc };
