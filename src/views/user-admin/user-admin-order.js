const adminContentOrders = document.querySelector("#admin-orders");

const createOrderList = () => {
  fetch("/orders")
    .then((res) => res.json())
    .then((data) => {
      listingOrders(data);
    })
    .catch((err) => console.log(err));

  const listingOrders = (orders) => {
    adminContentOrders.innerHTML = "";
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    for (let i = 0; i < orders.length; i++) {
      const ordered = new Date(
        new Date(orders[i].createdAt).getTime() + 1000 * 60 * 60 * 9
      )
        .toISOString()
        .slice(0, 10);
      const shippingStatus = ["상품 준비중", "배송중", "배송완료", "주문취소"];
      let statusSelect = "";

      for (let j = 0; j < shippingStatus.length; j++) {
        if (orders[i].shippingStatus === shippingStatus[j]) {
          statusSelect += `<option value="${shippingStatus[j]}" selected>${shippingStatus[j]}</option>`;
        } else {
          statusSelect += `<option value="${shippingStatus[j]}">${shippingStatus[j]}</option>`;
        }
      }

      let orderList = "";
      orders[i].orderList.forEach((book) => {
        orderList += `<br>&emsp;&emsp;&emsp;&emsp;  &lt; ${book.title} &gt; ${book.amount}권`;
      });

      const deliveryRequest = orders[i].deliveryRequest || "요청사항 없음";

      let actionButtonHTML = "";
      if (orders[i].shippingStatus === "주문취소") {
        actionButtonHTML = `<img class="admin-button delete" src="/public/images/icon_delete.svg">`;
      } else {
        actionButtonHTML = `<img class="admin-button edit" src="/public/images/icon_edit.svg">`;
      }

      adminContentOrders.innerHTML += `
          <div class="admin-items ordered-list">
            <div class="order-upper">
              <p class="order-date"> ${ordered} </p>
              <p class="order-id"> ${orders[i].orderId} </p>
              <p class="order-status"> ${orders[i].shippingStatus} </p>
              <select class="hidden" id="orderCategoryInput" name="categories">${statusSelect}</select>
              ${actionButtonHTML}
              <img class="admin-button check hidden" src="/public/images/icon_check.svg">
            </div>
            <div class="order-more-infos">
              <p>주문자 | ${orders[i].recipientName} </p>
              <p>주문자 연락처 | ${orders[i].contact} </p>
              <p>배송주소 | (${orders[i].postalCode}) ${orders[i].address} ${
        orders[i].addressDetail
      } </p>
              <p>요청사항 | ${deliveryRequest} </p>
              <p>주문내역 | ${orderList} </p>
              <p>결제금액 | ${orders[i].totalPrice.toLocaleString()}원 </p>
            </div>
          </div>
        `;

      adminOrderEdit(orders);
      adminOrderDelete(orders);
    }
  };
};

const statusMapping = {
  "상품 준비중": "READY",
  배송중: "SHIPPING",
  배송완료: "DELIVERED",
  주문취소: "CANCELLED",
};

const adminOrderEdit = (orders) => {
  const orderEditBtn = adminContentOrders.querySelectorAll(".edit");
  orderEditBtn.forEach((e) => {
    e.addEventListener("click", () => {
      const orderBox = e.closest(".admin-items");
      const orderIdOnBox = orderBox.querySelector(".order-id").innerText;
      const orderStatusText = orderBox.querySelector(".order-status").innerText;
      const checkBtn = orderBox.querySelector(".check");

      if (orderStatusText === "주문취소") {
        alert("주문취소 상태의 주문은 수정할 수 없습니다.");
        return;
      }

      e.classList.add("hidden");
      checkBtn.classList.remove("hidden");
      const statusSelect = orderBox.querySelector("#orderCategoryInput");
      orderBox.querySelector(".order-status").classList.add("hidden");
      statusSelect.classList.remove("hidden");

      checkBtn.addEventListener("click", () => {
        const selectedStatusInKorean = statusSelect.value;
        const data = {
          shippingStatus: statusMapping[selectedStatusInKorean],
        };
        fetch(`/order/admin/${orderIdOnBox}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.status !== 204) {
              if (res.status === 403) {
                alert("유효하지 않은 접근입니다.");
                location.replace("/");
              } else {
                return res.json().then((errData) => {
                  throw new Error(
                    errData.message || res.statusText || "오류가 발생했습니다."
                  );
                });
              }
            }
            createOrderList();
            alert("주문이 성공적으로 수정되었습니다.");
          })
          .catch((err) => {
            alert("주문을 수정할 수 없습니다.");
          });
      });
    });
  });
};

const adminOrderDelete = (orders) => {
  const orderDeleteBtn = adminContentOrders.querySelectorAll(".delete");
  orderDeleteBtn.forEach((e) => {
    e.addEventListener("click", () => {
      const orderBox = e.closest(".admin-items");
      const orderIdOnBox = orderBox.querySelector(".order-id").innerText;
      const orderStatusText = orderBox.querySelector(".order-status").innerText;

      if (orderStatusText === "주문취소") {
        alert("주문취소 상태의 주문은 삭제할 수 없습니다.");
        return;
      }

      const deleteConfirm = confirm(
        `주문번호 ${orderIdOnBox}를 삭제하시겠습니까?`
      );
      if (deleteConfirm) {
        fetch(`/order/${orderIdOnBox}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.status !== 204) {
              if (res.status === 403) {
                alert("유효하지 않은 접근입니다.");
                location.replace("/");
              } else {
                return res.json().then((errData) => {
                  throw new Error(
                    errData.message || res.statusText || "오류가 발생했습니다."
                  );
                });
              }
            }
            createOrderList();
            alert("주문이 성공적으로 삭제되었습니다.");
          })
          .catch((err) => {
            alert("주문을 삭제할 수 없습니다.");
          });
      }
    });
  });
};

export { createOrderList };
