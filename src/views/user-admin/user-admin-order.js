

const adminContentOrders = document.querySelector('#admin-orders');

const createOrderList = () => {
  fetch('/orders')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    listingOrders(data);
  })
  .catch((err) => console.log(err));

  const listingOrders = (orders) => {
    adminContentOrders.innerHTML = ""; 
    for(let i = 0; i < orders.length; i++){
      const ordered = new Date(orders[i].createdAt);
      adminContentOrders.innerHTML += 
      `
      <div class="admin-items ordered-list">
        <div class="order-upper">
          <p class="order-date"> ${ordered.getFullYear()}/${ordered.getMonth()+1}/${ordered.getDate()} ${ordered.getUTCHours()}:${ordered.getMinutes()} </p>
          <p class="order-id"> ${orders[i].orderId} </p>
          <p class="order-status"> ${orders[i].shippingStatus} </p>
        </div>
      </div>
      `
    }

    adminOrderCloserLook(orders)
  }
}


const adminOrderCloserLook = (orders) => {
  const orderInfoBlocks = adminContentOrders.querySelectorAll('.admin-items');
  orderInfoBlocks.forEach((e)=> {
    e.addEventListener('click', ()=>{
      const moreInfo = e.querySelector('.order-more-infos');
      if(moreInfo){
        moreInfo.remove();
        e.style.height = "40px";
      }else{
        const orderIdPart = e.querySelector('.order-id');
        const thisOrder = orders.find((e) =>  e.orderId === orderIdPart.innerText );
        console.log(thisOrder);

        // 제품 정보 불러오기

        fetch('/product')
          .then((res) => res.json())
          .then((data) => {
            console.log(data.data);
            const books = data.data;
            let orderList = '';
            for( let i = 0; i < thisOrder.orderList.length; i++){
              const orderedBook = books.find((e)=> e._id === thisOrder.orderList[i].product).title;
              orderList += `상품: ${orderedBook} 수량: ${thisOrder.orderList[i].amount} <br>`
            }
            console.log(orderList);
            e.style.height = "230px";
            setTimeout(()=>{
            e.innerHTML += `
              <div class="order-more-infos">
               <p>주문자 | ${thisOrder.userName} </p>
               <p>주문자 연락처 | ${thisOrder.userPhone} </p>
               <p>배송주소 | (${thisOrder.postalCode}) ${thisOrder.address} ${thisOrder.detailAddress} </p>
               <p>요청사항 | ${thisOrder.orderRequest} </p>
               <p>주문내역 | ${orderList} </p>
               <p>결제금액 | ${thisOrder.totalPrice.toLocaleString()}원 </p>
              </div>
            `
        }, 230);
            
          })
          .catch((err) => console.log(err));


      }
    })
  })


}



export { createOrderList };