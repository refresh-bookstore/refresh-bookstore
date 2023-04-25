import { main } from '../public/js/main.js';

const mypageButton = document.getElementById("mypage-button");
const userGreeting = document.getElementById("user-greeting");

// 임시 유저 데이터
const userData = {
  name: "김토끼",
  email: "elice@hello.com",
  password: "~1234qwer",
  postalCode: "13529",
  address: "경기 성남시 분당구 판교역로 166  (백현동)",
  detailAddress: "123동 456호",
  phone: "010-1234-5678",
};

// 주문 조회 버튼 이벤트 리스너
mypageButton.addEventListener("click", handleMypage);

function handleMypage(event) {
  event.preventDefault();
  // user-mypage vs mypage
  location.href = "/user-mypage";
}

userGreeting.innerText = `안녕하세요, ${userData.name}님\u{1F49A}`;
// DB에서 어떤 형태로 order list를 불러올지 명세 필요.
// User스키마에 주문내역 항목 추가되어야 함.(Order스키마 populate?)


main();