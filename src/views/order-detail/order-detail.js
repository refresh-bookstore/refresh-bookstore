import { main } from '/public/js/main.js';
import { order } from './temp.js';

const orderDateArea = document.querySelector('.orderDate');
const shippingStatusArea = document.querySelector('.shippingStatus');

const bookTitle = document.querySelectorAll('.book-title');
const bookAuthor = document.querySelectorAll('.author')
const bookPrice = document.querySelectorAll('.book-price');

const deliveryFeeArea = document.querySelector('.deliveryFee');
const entirePrice = document.querySelector('.entirePrice');
const name = document.querySelector('.name');
const phoneNumber = document.querySelector('.phoneNumber');
const address = document.querySelector('.address');
const deliveryRequest = document.querySelector('.deliveryRequest');

const modifyButton = document.querySelector('.modifyButton');
const cancelButton = document.querySelector('.cancelButton');

// async function loadOrderData() {
//   try {
//     const response = await fetch("/orders", {
//       method: "GET",
//       headers: {
//         // 'content-Type': 'application/json',
//         "authorization": `Bearer ${sessionStorage.getItem("token")}`,
//       }
//     });
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       // nameInput.value = data.name;
//       // phoneNumberInput.value = data.phone;
//       // postalCodeInput.value = data.postalCode;
//       // addressInput.value = data.address;
//       // detailAddressInput.value = data.detailAddress;
//       // email = data.email;
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// loadOrderData();

//orderData 예시
// [{
//   message: "주문이 생성되었습니다",
//   order: {
//     "email": "pooh@pooh.com",
//     "shippingStatus": "상품 준비중",
//     "deliveryFee": 3000,
//     "userName": "푸우",
//     "postalCode": "12345",
//     "address": "주소주소주소",
//     "detailAddress": "상세주소",
//     "userPhone": "010-1111-1111",
//     "orderRequest": "없음",
//     "orderList": [

//     ],
//     "totalPrice": 23000,
//     "_id": "14564567654345766564te",
//     "orderId": "LD86564649",
//     "createdAt": "2023-04-26T11:51:44.358Z",
//     "updatedAt": "2023-04-26T11:51:44.358Z",
//     "__v": 0
//   }
// }]
// {"_id":{"$oid":"64492b59b16bed6db88f0027"},"email":"elice@hello.com","shipingStatus":"상품 준비중","deliveryFee":"3000","userName":"김토끼","postalCode":"13536","address":"경기 성남시 분당구 판교역로10번길 16  (백현동)","detailAddress":"1동","userPhone":"123-3434-5346","orderRequest":"11","orderList":[{"product":{"_id":{"$oid":"6446b858a5a770787eea5b2d"},"title":"빠른 모바일 앱 개발을 위한 React Native 리액트 네이티브 2/E","author":"바니 아이젠먼","publisher":"인사이트","publication_date":"2018-08-07T15:00:00.000Z","isbn":"9788966262250","description":"iOS와 안드로이드에서 동작하는 모바일 앱을 만드는 법을 소개한다. 자바스크립트와 리액트를 활용하여 iOS 및 안드로이드에서 동작하고 진짜 네이티브로 렌더링되는 모바일 애플리케이션을, 기능적인 제약 없이 만들고 배포할 수 있게 도와준다.\n\n카메라와 사용자 위치, 로컬 저장소 등 플랫폼에서 제공하는 기능을 리액트 네이티브에서 사용하는 방법, 인터페이스를 만들고 꾸미는 방법, 모바일 컴포넌트를 사용하는 방법, 디버깅을 위한 도구와 배포하는 방법 등을 예제 코드를 보여주면서 설명하고 있어 단계적으로 배울 수 있다. 서드파티 라이브러리나 자바, 오브젝티브-C 라이브러리를 활용하여 리액트 네이티브를 확장하는 방법도 다루고 있다.","price":{"$numberInt":"24000"},"image_path":"../product-images/9788966262250.png","category":"모바일 앱 개발"},"amount":"3"},{"product":{"_id":{"$oid":"6446b858a5a770787eea5b2e"},"title":"린 모바일 앱 개발","author":"애덤 데니스","publisher":"에이콘출판","publication_date":"2019-05-23T15:00:00.000Z","isbn":"9791161752921","description":"린 스타트업 기법을 모바일 앱 개발에 적용해서 구글 플레이나 앱 스토어에서 돌풍을 일으킬 만한 앱을 좀 더 쉽게 개발할 수 있는 방법을 제시한다. 또한 사업을 전개하는 과정과 기술 노하우를 현명하게 통합하는 방법도 알려준다.\n\n저자가 실제로 만들었던 모바일 앱을 예제로 해 린 기법을 안드로이드 및 iOS에 적용하고, 최소기능제품을 만들고, 비즈니스 모델 캔버스로 아이디어를 검증하며 통계와 댓글로 피드백을 모으고, 비즈니스 요구 사항에 유연하게 대응하며, 전환율을 높여 성공적인 앱을 개발하는 방법을 알아본다.","price":{"$numberInt":"35000"},"image_path":"../product-images/9791161752921.png","category":"모바일 앱 개발"},"amount":"1"}],"totalPrice":"107000","orderId":"LD86564649"}

/*
const shippingStatus = orderData.shippingStatus;
const deliveryFee = orderData.deliveryFee;
const userName = orderData.userName;
const Fulladdress = `(${orderData.postalCode}) ${orderData.address} ${orderData.detailAddress}`;
const userPhone = orderData.userPhone;
const orderRequest = orderData.orderRequest;
const orderDate = orderData.createdAt.slice(0, 10);

for (let i = 0; i < orderData.orderList.length; i++) {
  const isbn = orderData.orderList[i].product.isbn;
  const title = orderData.orderList[i].product.title;
  const author = orderData.orderList[i].product.author;
  const price = orderData.orderList[i].product.price;
  const amount = orderData.orderList[i].amount;

  `<li class="book">
    <div class="book-img">
      <img src="../public/images/${isbn}.png">
    </div>
    <div class="book-info">
      <p class="book-title">${title}</p>
      <p class="author">${author}</p>
      <p class="book-price">${price.toLocaleString()}원 X ${amount}권</p>
    </div>
  </li>`
}
*/


// 주문정보 수정

// 주문 취소 -'주문 배송중'일때만 가능

// 주문 정보 조회
async function loadOrder() {
  // 주문 일, 배송 상태 가져오기

  // 임의로 현재 날짜
  const orderDay = new Date().toLocaleDateString().split('/');
  orderDate.innerText = orderDay;
  shippingStatus.innerText = order[0].shipingStatus;

  // 주문한 책 상품 가져오기

  // 배송비, 총 결제금액 가져오기

}

// 주문 정보 수정
async function modifyOrder() {

}

// 주문 취소
async function cancelOrder() {

}

main();