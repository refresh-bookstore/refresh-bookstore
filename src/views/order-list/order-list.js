import { main } from '/public/js/main.js';

const mypageButton = document.getElementById("mypage-button");
const userGreeting = document.getElementById("user-greeting");

// 주문 조회 버튼 이벤트 리스너
mypageButton.addEventListener("click", handleMypage);

function handleMypage(event) {
  event.preventDefault();
  location.href = "/user-mypage";
}

async function getUserEmail() {
  try {
    const response = await fetch("/userinfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      userGreeting.innerText = `안녕하세요, ${data.name}님\u{1F49A}`;
      console.log(data);
    } else {
      alert("사용자를 찾을 수 없습니다.");
      throw new Error("사용자를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.log(error.message);
  }
}
getUserEmail();

async function loadOrderData() {
  try {
    const response = await fetch("/orders", {
      method: "GET",
      headers: {
        'content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);

    }
  } catch (error) {
    console.log(error.message);
  }
}
loadOrderData();

main();
/* <div class="order">
  <p class="order-date">2023-04-25</p>
  <div class="order-view">
    <div class="order-items-area">
      <div class="order-item">
        <div class="item-img">
          <img src="../public/images/sample_image.jpg">
        </div>
        <div class="item-info">
          <p class="item-title">혼자 공부하는 얄팍한 코딩지식</p>
          <p class="item-author">고현민</p>
          <p class="item-cost">15,800원 X 2권</p>
        </div>
      </div>
      <div class="order-item">
        <div class="item-img">
          <img src="../public/images/sample_image.jpg">
        </div>
        <div class="item-info">
          <p class="item-title">혼자 공부하는 얄팍한 코딩지식</p>
          <p class="item-author">고현민</p>
          <p class="item-cost">15,800원 X 2권</p>
        </div>
      </div>
    </div>
    <div class="order-info">
      <span class="shipping-status">배송 준비 중</span>
      <a class="order-detail" href="/order-detail/${}">주문 상세</a>
    </div>
  </div>
</div> */