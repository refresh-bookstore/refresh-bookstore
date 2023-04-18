const likeBtn = document.querySelector('#likeBtn');

const bookTitle = document.querySelectorAll('.bookTitle');
const bookSubtitle = document.querySelector('#bookSubtitle');
const detailedInfo = document.querySelector('#detailedInfo');
const bookCost = document.querySelector('#bookCost');
const bookCategory = document.querySelector('#category');

const minusBtn = document.querySelector('#minusBtn');
const plusBtn = document.querySelector('#plusBtn');
const amountInput = document.querySelector('#amountInput');
const totalCost = document.querySelector('#totalCost');

const bookIntroduction = document.querySelector('#bookIntroduction');


//예시데이터
const book = {
  title: '혼자 공부하는 얄팍한 코딩지식',
  subtitle: '비전공자도 1:1 과외하듯 배우는 IT 지식 입문서',
  author: '고현민',
  publisher: '한빛출판사',
  published: new Date(2022, 4, 25),
  cost: 14800,
  category: '코딩입문서',
  isbn: '1162245557',
  introduction: `혼자 해도 충분합니다! 1:1 과외하듯 배우는 IT 지식 입문서! 이 책은 독학으로 IT 지식을 배우는 입문자가 ‘꼭 필요한 내용을 제대로 학습’할 수 있도록 구성했다. 뭘 모르는지조차 모르는 입문자의 막연한 마음에 십분 공감하여 과외 선생님이 알려주듯 친절하게, 핵심 내용만 콕콕 집어 준다. 1장에서는 IT 업계 용어를 알아보며 개발과 개발자를 이해하고, 2장에서는 개발자가 실제로 사용하는 용어를 배우며 개발자와 소통할 수 있는 발판을 마련해준다. 마지막 3장에서는 여러 가지 개발 용어를 바탕으로 개발자의 길로 들어설 수 있도록 친절하게 알려 준다. '개발이 뭔지 궁금했지만', '개발자와 소통해야 하지만', '개발자가 되고 싶지만'기존 IT 지식서에서는 시원하게 알 수 없었던 진짜 코딩 지식을 [혼공 얄코]에서 만나 보자!`,
};

//찜하기 버튼

likeBtn.addEventListener('click',()=>{
  likeBtn.src = "../../../public/images/like_2.svg";
});


//책 정보

bookCategory.innerText = `#${book.category}`;
bookTitle.forEach((e)=>{
  e.innerText = book.title;
});

bookSubtitle.innerText = book.subtitle;
detailedInfo.innerText = `${book.author} | ${book.publisher} | ${book.published.getFullYear()}`;

//구매 정보
minusBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  if (Number(amountInput.value) <= 1){

  }else{
    amountInput.value -= 1;
    totalCost.innerText = `${(book.cost * amountInput.value).toLocaleString()}원`;
  }
  
});

plusBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  amountInput.value = Number(amountInput.value) + 1;
  totalCost.innerText = `${(book.cost * amountInput.value).toLocaleString()}원`;
});


totalCost.innerText = `${(book.cost * amountInput.value).toLocaleString()}원`;




bookIntroduction.innerText = book.introduction;