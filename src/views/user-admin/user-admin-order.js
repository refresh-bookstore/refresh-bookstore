

const adminContentOrders = document.querySelector('#admin-orders');

const createOrderList = () => {
  for(let i = 0; i < 5; i++){
    adminContentOrders.innerHTML += 
    `
    <div class="admin-items ordered-list">
      <div class="order-upper">
          <input type="checkbox">
          <p class="item-name order"> 230421001 </p>
          <p class="order-status"> 배송중</p>
      </div>
      <div class="order-lower">
        <div class="item-info order">
          <div class="item-more-info order a">
            <p class="item-detail order"> 김토끼</p>
            <p class="item-detail order"> 010-2323-2323</p>
            <p class="item-detail order"> 서울시 양천구 오목로359 사무실</p>
          </div>
          <div class="item-more-info order b">
            <p class="item-detail order"> 혼자 공부하는 얄팍한 코딩 지식 (3)</p>
            <p class="item-detail order"> 코딩 관련 책 이름 하나</p>
            <p class="item-detail order"> 이것도 코딩에 관련된 책</p>
            <p class="item-detail order"> 책 이름은 모르지만 코딩임(2)</p>
          </div>
          <p class="item-cost"> 23,400원</p>
          <span class="admin-buttons">
            <img class="admin-button order-edit" title="수정" src="/public/images/icon_edit.svg">
            <img class="admin-button order-check hidden" title="확인" src="/public/images/icon_check.svg">
            <img class="admin-button order-delete" title="삭제" src="/public/images/icon_delete.svg">
          </span>
        </div>
      </div>
    </div>
    `
  }
}

export { createOrderList };