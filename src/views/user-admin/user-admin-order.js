

const adminContentOrders = document.querySelector('#admin-orders');

const createOrderList = () => {
  fetch('/orders')
  .then((res) => res.json())
  .then((data) => {
    listingOrders(data);
  })
  .catch((err) => console.log(err));

  const listingOrders = (orders) => {
    adminContentOrders.innerHTML = ""; 
    for(let i = 0; i < orders.length; i++){
      fetch('/product')
      .then((res) => res.json())
      .then((data) => {
        const books = data.data;
        let orderList = '';
        for( let j = 0; j < orders[i].orderList.length; j++){
          const orderedBook = books.find((e)=> e._id === orders[i].orderList[j].product).title;
          orderList += `<br>&emsp;&emsp;&emsp;&emsp;  &lt; ${orderedBook} &gt; ${orders[i].orderList[j].amount}권`
        }
        const ordered = new Date(orders[i].createdAt);
        const shippingStatus = ['상품 준비중', '배송중', '배송완료', '주문취소'];
        let statusSelect = '';
        for(let j = 0; j < shippingStatus.length; j++) {
          if(orders[i].shippingStatus === shippingStatus[j]){
            statusSelect += `<option value="${shippingStatus[j]}" selected>${shippingStatus[j]}</selected>`
          }else{
            statusSelect += `<option value="${shippingStatus[j]}">${shippingStatus[j]}</selected>`
          }
        }
      adminContentOrders.innerHTML += 
        `
        <div class="admin-items ordered-list">
          <div class="order-upper">
            <p class="order-date"> ${ordered.getFullYear()}/${(ordered.getMonth()+1).toString().padStart(2, '0')}/${ordered.getDate().toString().padStart(2, '0')} ${ordered.getUTCHours().toString().padStart(2, '0')}:${ordered.getMinutes().toString().padStart(2, '0')} </p>
            <p class="order-id"> ${orders[i].orderId} </p>
            <p class="order-status"> ${orders[i].shippingStatus} </p>
            <select class="hidden" id="orderCategoryInput" name="categories">${statusSelect}</select>
            <img class="admin-button edit" src="/public/images/icon_edit.svg">
            <img class="admin-button check hidden" src="/public/images/icon_check.svg">
            <img class="admin-button delete" src="/public/images/icon_delete.svg">
          </div>
          <div class="order-more-infos">
          <p>주문자 | ${orders[i].userName} </p>
          <p>주문자 연락처 | ${orders[i].userPhone} </p>
          <p>배송주소 | (${orders[i].postalCode}) ${orders[i].address} ${orders[i].detailAddress} </p>
          <p>요청사항 | ${orders[i].orderRequest} </p>
          <p>주문내역 | ${orderList} </p>
          <p>결제금액 | ${orders[i].totalPrice.toLocaleString()}원 </p>
        </div>
        </div>
        `
        adminOrderEdit(orders);
        adminOrderDelete(orders);
      })
      .catch((err) => console.log(err));
      
    }
  
  }
}

const adminOrderEdit = (orders) => {
  const orderEditBtn = adminContentOrders.querySelectorAll('.edit');
  orderEditBtn.forEach((e)=> {
    e.addEventListener('click', ()=>{
      console.log('hi');
      const orderBox = e.closest('.admin-items');
      const orderIdOnBox = orderBox.querySelector('.order-id').innerText;
      console.log(orderIdOnBox);
      const checkBtn = orderBox.querySelector('.check');
      e.classList.add('hidden');
      checkBtn.classList.remove('hidden');
      const orderStatus = orderBox.querySelector('.order-status');
      const statusSelect = orderBox.querySelector('#orderCategoryInput');
      orderStatus.classList.add('hidden');
      statusSelect.classList.remove('hidden');


      
      checkBtn.addEventListener('click', ()=> {
        const data = {
          shippingStatus: statusSelect.value
        }
        console.log('hi');
        fetch(`/order/admin/${orderIdOnBox}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          console.log('주문상태 수정 성공');
          createOrderList();
        })
        .catch(err => {
          console.error('주문상태 수정 실패', err);
        });

          })
        })
      })
}

const adminOrderDelete = (orders) => {
  const orderDeleteBtn = adminContentOrders.querySelectorAll('.delete');
  orderDeleteBtn.forEach((e)=> {
    e.addEventListener('click', ()=>{
      const orderBox = e.closest('.admin-items');
      const orderIdOnBox = orderBox.querySelector('.order-id').innerText;
      const deleteConfirm = confirm(`주문번호 ${orderIdOnBox}를 삭제하시겠습니까?`);
      if(deleteConfirm){
        fetch(`/order/admin/${orderIdOnBox}`, {
          method: 'DELETE',
          })
          .then(res => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            console.log('주문 삭제 성공');
            createOrderList();
          })
          .catch(err => {
                console.error('주문 삭제 실패', err);
              });
      }
    })
  }) 
}

export { createOrderList };