import { main } from "/public/js/main.js";
import { logout } from "/public/js/logout.js";

const mypageButton = document.getElementById("mypage-button");
const userGreeting = document.getElementById("user-greeting");
const contentArea = document.querySelector(".content");

// 주문 조회 버튼 이벤트 리스너
mypageButton.addEventListener("click", handleMypage);
function handleMypage(event) {
  event.preventDefault();
  location.href = "/user-mypage";
}

// userGreeting에 이름 띄우기
async function setUserName() {
  try {
    const response = await fetch("/user", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      userGreeting.innerText = `안녕하세요, ${data.name}님\u{1F49A}`;
    } else {
      alert("로그인을 해주세요.");
      logout();
      throw new Error("사용자를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.log(error.message);
  }
}
setUserName();

// 주문내역 불러오기
async function getOrderList() {
  try {
    const response = await fetch("/ordered", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();

      // data 최근 주문순 정렬
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      if (data.length > 0) {
        contentArea.classList.remove("empty");
        data.forEach((orderInfo) => {
          const orderDate = new Date(
            new Date(orderInfo.createdAt).getTime() + 1000 * 60 * 60 * 9
          )
            .toISOString()
            .slice(0, 10);
          const shippingStatus = orderInfo.shippingStatus;
          const orderId = orderInfo.orderId;

          let orderHtml = `<div class="order">
            <p class="order-date">${orderDate}</p>
            <div class="order-view">
            <div class="order-items-area">`;

          for (let i = 0; i < orderInfo.orderList.length; i++) {
            const image_path = orderInfo.orderList[i].product.image_path;
            const title = orderInfo.orderList[i].product.title;
            const author = orderInfo.orderList[i].product.author;
            const price = orderInfo.orderList[i].product.price.toLocaleString();
            const isbn = orderInfo.orderList[i].product.isbn;
            const amount = orderInfo.orderList[i].amount;

            orderHtml += `
              <div class="order-item">
                <div class="item-img">
                  <a href="/book-detail/?isbn=${isbn}"><img src="${image_path}"></a>
                </div>
                <div class="item-info">
                  <p class="item-title"><a href="/book-detail/?isbn=${isbn}">${title}</a></p>
                  <p class="item-author">${author}</p>
                  <p class="item-cost">${price}원 X ${amount}권</p>
                </div>
              </div>`;
          }

          orderHtml += `</div>
              <div class="order-info">
              <span class="shipping-status">${shippingStatus}</span>
              <a class="order-detail" href="/order-detail/?orderId=${orderId}">주문 상세</a>
            </div>
            </div>
          </div>`;

          contentArea.innerHTML += orderHtml;
        });
      } else {
        contentArea.classList.add("empty");
        contentArea.innerHTML += `<div></div>
        <div class="empty-order-list">주문 내역이 없습니다</div>`;
      }
    } else {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.log(error.message);
  }
}
getOrderList();

main();
