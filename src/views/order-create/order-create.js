import { main } from '/public/js/main.js';

// 가격 문자열에서 숫자만 반환하는 함수
function getPriceNumber(str) {
  return Number(str.replace(/,/g, '').slice(0, -1));
}

const orderList = document.querySelector('.orderList');
const booksPrice = document.querySelector('.booksPrice');
const deliveryFee = document.querySelector('.deliveryFee');
const totalCost = document.querySelector('.totalCost');

const userDeliveryInfo =  document.querySelectorAll('.user_delivery_info');
const [ nameInput , phoneNumberInput , postalCodeInput , addressInput , detailAddressInput ] = userDeliveryInfo;
// 사용자 기본정보 출력

async function loadUserData() {
  try {
    const response = await fetch("/order-create", {
      method: "GET",
      headers: {
        'content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      // 인풋 창에 사용자 정보 불러오기
      nameInput.value = data.name;
      phoneNumberInput.value = data.phone;
      postalCodeInput.value = data.postalCode;
      addressInput.value = data.address;
      detailAddressInput.value = data.detailAddress;
    }
  } catch (error) {
    console.log(error.message);
  }
}
loadUserData();

//예시데이터 로컬스토리지 저장
// let order = [
//   {
//     "title":"이펙티브 타입스크립트",
//     "author":"댄 밴더캄",
//     "publisher":"인사이트",
//     "publication_date":"2021-06-08T15:00:00.000Z",
//     "isbn":"9788966263134",
//     "description":"타입스크립트는 타입 정보를 지닌 자바스크립트의 상위 집합으로, 자바스크립트의 골치 아픈 문제점들을 해결해 준다. 이 책은 《이펙티브 C++》와 《이펙티브 자바》의 형식을 차용해 타입스크립트의 동작 원리, 해야 할 것과 하지 말아야 할 것에 대한 구체적인 조언을 62가지 항목으로 나누어 담았다. 각 항목의 조언을 실제로 적용한 예제를 통해 연습하다 보면 타입스크립트를 효율적으로 사용하는 방법을 익힐 수 있다.",
//     "price":25000,
//     "image_path":"../product-images/9788966263134.png",
//     "category":"프론트엔드",
//     "amount":2,
//   }
// ];
// saveToCart(order);

let bookPriceSum = 0;
let purchaseData = JSON.parse(localStorage.getItem('purchase'));
if (purchaseData.length !== 0) {
  purchaseData.forEach((data) => {
    const { title, author, isbn, price, image_path, amount } = data;
  
    orderList.innerHTML +=
      `<div class="item">
      <a class="book-img" href="/book-detail/${isbn}">
        <img src="${image_path}" class="book-img" alt="${title}"/>
      </a>
      <div class="book__title__price">
        <div class="book-title">
          <a class="book-link" href="/book-detail/${isbn}">${title}</a>
          <div class="author">${author}</div>
        </div>
        <div class="amount">총 ${amount}권</div>
        <div class="item-price">${(price * amount).toLocaleString()}원</div>
      </div>
    </div>`;
    bookPriceSum += price * amount;
  });
}

// 배송비 계산
function setDeliveryFee() {
  if (getPriceNumber(booksPrice.innerText) >= 50000) {
    deliveryFee.innerText = '0원';
  } else {
    deliveryFee.innerText = '3,000원';
  }
}
setDeliveryFee();

// 총 결제 금액 계산
function setTotalCost() {
  const totalCostNum = getPriceNumber(booksPrice.innerText) + getPriceNumber(deliveryFee.innerText);
  totalCost.innerText = `${totalCostNum.toLocaleString()}원`;
}
setTotalCost();

//////DB에서 사용자 정보 가져와 출력하기(미완성)

// 요청사항
const customRequestContainer = document.querySelector('.customRequestContainer');
const customRequestInput = document.querySelector(".customRequest");
const requestSelectBox = document.querySelector("#request__Select__Box");

const requestOption = {
  1: "배송 전 연락바랍니다.",
  2: "부재 시 경비실에 맡겨주세요.",
  3: "부재 시 문 앞에 놓아주세요.",
  4: "부재 시 택배함에 넣어주세요.",
  5: "직접 입력",
};

// "직접 입력" 선택 시 input칸 보이게 함
function handleRequestChange(e) {
  const type = e.target.value;

  if (type === "5") {
    customRequestContainer.style.display = "flex";
    customRequestInput.focus();
  } else {
    customRequestContainer.style.display = "none";
  }
}
requestSelectBox.addEventListener("change", handleRequestChange);

// 상품 가격, 배송비, 총 결제 금액 출력
booksPrice.innerText = `${bookPriceSum.toLocaleString()}원`;
if (bookPriceSum >= 50000) {
  deliveryFee.innerText = '0원'
  totalCost.innerText = booksPrice.innerText;
} else {
  deliveryFee.innerText = '3,000원';
  totalCost.innerText = `${(bookPriceSum + 3000).toLocaleString()}원`;
}

async function payBtnClick() {
  if (
    !nameInput.value.trim() ||
    !phoneNumberInput.value ||
    !postalCodeInput.value ||
    !addressInput.value
  ) {
    return alert("배송지 정보를 모두 입력해주세요");
  }
  
  const requestType = requestSelectBox.value;
  let request;
  // 요청사항의 종류에 따라 request 문구가 달라짐
  if (requestType === "0") {
    request = "요청사항 없음.";
  } else if (requestType === "5") {
    request = customRequestInput.value;
  } else {
    request = requestOption[requestType];
  }

  let orderArr = []

  for(let i = 0; i < purchaseData.lenght; i++){
    let ISBN = purchaseData[i].isbn;
    let amount = purchaseData[i].amount;
    orderArr.push({ISBN, amount})
  }

  // let ISBN = purchaseData[0].isbn;
  // let amount = purchaseData[0].amount;

  try {
    const response = await fetch("/order-create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: nameInput.value,
        postalCode: postalCodeInput.value,
        address: addressInput.value,
        detailAddress: detailAddressInput.value,
        userPhone: phoneNumberInput.value,
        orderRequest: request,
        orderList: orderArr, // ISBN, amount
        deliveryFee: getPriceNumber(deliveryFee.innerText),
        totalPrice: getPriceNumber(totalCost.innerText),
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      location.href = "/order-complete";
    } else {
      throw new Error("결제에 실패했습니다.");
    }
  } catch (error) {
    console.log(error.message);
    alert("결제에 실패했습니다. 다시 시도해주세요.");
  }
}


// function payBtnClick() {

  // 기존에 휴대폰번호와 주소가 없다면 주문할 때 배송지와 휴대폰번호로 기존 유저정보 업데이트

//   if (!phoneNumber || !postCode) {
//     // 전화번호
//     if (userPhoneNumber.value !== "") {
//       // 숫자만 매칭
//       const numberCheck = userPhoneNumber.value.split("");
//       let result = [];
//       numberCheck.forEach((number) => {
//         const pattern = /[0-9]/g;
//         result.push(number.match(pattern));
//       });

//       // 숫자가 아닌 다른값이 들어가 있을 경우
//       if (result.includes(null)) {
//         return alert("휴대폰번호를 잘못 입력하셨습니다. 숫자만 입력하세요.");
//       }
//       // 길이가 아닐 경우
//       if (numberCheck.length < 10) {
//         return alert("휴대폰번호를 잘못 입력하셨습니다. 다시 입력해주세요.");
//       }
//     }

//     fetch(`/api/users/${_id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         phoneNumber: `${userPhoneNumber.value}`,
//         postCode: `${userPostCode.value}`,
//         streetAddress: `${userStreetAddress.value}`,
//         extraAddress: `${userExtraAddress.value}`,
//       }),
//     })
//       .then(async (res) => {
//         const json = await res.json();

//         if (res.ok) {
//           return json;
//         }

//         return Promise.reject(json);
//       })
//       .then((userInfoChange) => {})
//       .catch((err) => {
//         alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`);
//       });
//   }

//   fetch(`/api/orders`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       buyer: `${_id}`,
//       productList: `${productAllIdArr}`,
//       countList: `${productAllAmountArr}`,
//       shippingStatus: "배송전",
//       shippingPostCode: `${userPostCode.value}`,
//       shippingStreetAddress: `${userStreetAddress.value}`,
//       shippingExtraAddress: `${userExtraAddress.value}`,
//       shippingRequestMessage: `${request}`,
//       totalAmount: `${convertToNumber(totalPriceHTML.innerHTML)}`,
//       recipientName: `${userName.value}`,
//       recipientPhoneNumber: `${userPhoneNumber.value}`,
//     }),
//   })
//     .then(async (res) => {
//       const json = await res.json();

//       if (res.ok) {
//         return json;
//       }

//       return Promise.reject(json);
//     })
//     .then((data) => {
//       data.productList.forEach((product) => {
//         deleteIndexedDBdata(DATABASE_NAME, version, objectStore, product);
//       });

//       alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
//       window.location.href = "/orders/complete";
//     })
//     .catch((err) => {
//       alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`);
//     });
// }



// 결제하기 버튼 클릭 이벤트
const payBtn = document.querySelector(".paymentButton button");
// 버튼클릭이벤트 함수
// function payBtnClick() {
//   alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
//   localStorage.removeItem('cart');
//   window.location.href = "/order-complete";
// }
payBtn.addEventListener("click", payBtnClick);

// async function handleSubmit(e) {
//   e.preventDefault();
//   const isAllValid = checkValid();

//   if (isAllValid) {
//     await fetch("/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: nameInput.value,
//         email: emailInput.value,
//         password: passwordInput.value,
//         passwordCheck: passwordCheckInput.value,
//         postalCode: postalCodeInput.value,
//         address: addressInput.value,
//         detailAddress: detailAddressInput.value,
//         phone: phoneInput.value,
//       }),
//     })
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("서버 오류");
//         }
//       })
//       .then(data => {
//         alert(data.message);
//         location.replace("/");
//       })
//       .catch(error => {
//         console.error(error);
//         alert("회원가입에 실패했습니다. 다시 시도해주세요.");
//       });
//   } else {
//     checkValid();
//   }
// }

main();