import { main } from '../public/js/main.js';

const mypageButton = document.getElementById("mypage-button");
const userGreeting = document.getElementById("user-greeting");

// 임시 주문 데이터
function generateOrderId() {
  let result = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = chars.length;
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * length));
  }
  return result;
}
// orderDate????
const dummy = {
  orderId: generateOrderId(),
  email: "pooh@pooh.com",
  shippingStatus: "상품 준비중",
  deliveryFee: 0,
  userName: "푸우",
  postalCode: "63309",
  address: "제주특별자치도 제주시 첨단로 242  (영평동)",
  detailAddress: "101-101",
  userPhone: "010-1111-1111",
  orderRequest: "부재 시 경비실에 맡겨주세요",
  itemList: [
    {
      "title": "이것이 자료구조+알고리즘이다 with C 언어",
      "author": "박상현",
      "publisher": "한빛미디어",
      "publication_date": "2022-08-02T15:00:00.000Z",
      "isbn": "9791169210034",
      "description": "자료구조와 알고리즘은 IT 기업의 면접과 코딩 테스트 통과를 위한 필수 역량입니다. 알고리즘을 배워두면 단순히 취업뿐 아니라 더 좋은 개발자가 되는 데 큰 도움이 됩니다. 하지만 자료구조와 알고리즘은 배우기 어려우며 심지어 재미도 없다 보니 많은 개발자가 중도에 학습을 포기합니다. 『이것이 자료구조+알고리즘이다』는 독자가 마지막 페이지까지 읽도록 하는 것에 목표를 두었습니다.\n    처음 배우는 사람의 눈높이에 맞춰 리스트부터 백트래킹까지 자주 사용되는 자료구조와 알고리즘 개념을 위트 넘치는 이야기로 쉽게 설명합니다. 보기만 해도 헉 소리가 나는 복잡한 수식은 최소화하고 이해에 꼭 필요한 수식만 담았습니다. 또한 작동 원리를 단번에 이해할 수 있게 도와주는 다양한 그림과 바로 실행하고 확인할 수 있는 108개 소스 코드를 예제로 제공해 알고리즘의 얼개를 완벽히 이해할 수 있도록 구성했습니다.\n    『이것이 자료구조+알고리즘이다』와 함께 자료구조와 알고리즘의 주요 개념을 포기 없이 끝까지 배워봅시다!",
      "price": 30600,
      "image_path": "../product-images/9791169210034.png",
      "category": "알고리즘·자료구조",
      "categoryId": 5,
      "amount": 2
    },
    {
      "title": "누구나 자료 구조와 알고리즘",
      "author": "제이 웬그로우",
      "publisher": "길벗",
      "publication_date": "2021-11-29T15:00:00.000Z",
      "isbn": "9791165217815",
      "description": "사칙 연산으로 복잡한 알고리즘을 쉽게 이해해보자\n\n    수학 용어와 전문 용어가 아니어도 이해한다\n    이 분야의 책은 대부분 컴퓨터 공학 전공자를 대상으로 쓰였거나 고등학교 수학을 잘 안다고 가정하고 있다. 쉽게 설명했다는 책도 전문 용어로 가득하다. 비전공자나 수학적 기초가 약한 독자는 전문 용어에 두려움을 느끼며 이 주제를 이해할 만큼 자신이 똑똑하지 않다고 느끼며 이 주제를 회피한다. 그러나 자료 구조와 알고리즘은 대부분 상식선에서 이해할 수 있다. 엄밀한 수학적 분석이 아니어도 직관으로 이해할 수 있는 범위에서 상식이 통하는 설명으로 자료 구조와 알고리즘을 이해해보자.\n    \n    프로그래밍의 핵심 스킬을 이해한다\n    자료 구조와 알고리즘은 프로그래밍의 핵심 스킬이다. 더 빠른 코드, 더 효율적인 코드를 작성하려면 반드시 알아야 하는 사고 방식이 자료 구조와 알고리즘에 담겨 있다. 추상적인 개념만 설명하는 대신 실생활에서 마주할 수 있는 상황을 제시하며 자료 구조와 알고리즘을 적용하는 방법을 보여준다. 자료 구조와 알고리즘은 개념만 이해하면 어떤 언어로도 구현할 수 있다는 것도 보여준다. 이 책에서는 자바스크립트, 루비, 파이썬으로 된 예제를 제시한다.\n    \n    자료 구조와 알고리즘을 선택하는 방법을 배운다\n    전공 교재는 자료 구조와 알고리즘을 암기하고 시험만 볼 뿐이다. 입사 면접에서는 어떤 문제를 두고 배열, 연결 리스트, 해시 중에 무엇을 선택해야 하는지, 왜 그게 최적의 방법인지 묻는다. 자료 구조를 선택하는 방법, 선택한 자료 구조가 코드의 성능에 어떤 영향을 미치는지 설명하므로 암기된 단편적인 지식이 아닌 연결된 지식을 가르치고, 입사 면접을 준비할 때도 참고할 수 있게 했다.\n    \n    2판에서 달라진 점\n    코딩 테스트에 출제 빈도가 높은 다이나믹 프로그래밍, 트라이(Trie)에 대한 내용을 추가로 담았다. 재귀를 사용한 재귀적 반복과 속도를 높이는 재귀 알고리즘에 더해 재귀 알고리즘을 작성하는 방법에서는 문제의 유형에 따라 재귀 알고리즘을 작성하는 방법을 장으로 추가하고 자세한 전략을 담았다. 코딩 면접에서 자주 묻는 구현 알고리즘 개선 문제에 대한 항목을 최적화 주제로 보강했고, 각 장에는 더 연습할 수 있는 문제를 추가로 수록했다.",
      "price": 29700,
      "image_path": "../product-images/9791165217815.png",
      "category": "알고리즘·자료구조",
      "categoryId": 5,
      "amount": 5
    }
  ],
  totalPrice: 209700,
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
// async function loadUserData() {
//   try {
//     const response = await fetch("/order-create", {
//       method: "GET",
//       headers: {
//         'content-Type': 'application/json'
//       }
//     });
//     if (response.ok) {
//       const data = await response.json();
//       // 인풋 창에 사용자 정보 불러오기
//       nameInput.value = data.name;
//       phoneNumberInput.value = data.phone;
//       postalCodeInput.value = data.postalCode;
//       addressInput.value = data.address;
//       detailAddressInput.value = data.detailAddress;
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// loadUserData();

main();