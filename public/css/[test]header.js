const searchBtn = document.querySelector('#search-icon');
const cartBtn = document.querySelector('#cart-icon');
const userBtn = document.querySelector('#user-icon');



const searchInput = document.querySelector('.search-input');
const searchBox = document.querySelector('.search-box');

let cartItem = [];

const searchInputAppear = [
  { transform: "translate(300px, 0px)" },
  { transform: "translate(0px, 0px)" },
];

const searchInputDisappear = [
  { transform: "translate(0px, 0px)" },
  { transform: "translate(300px, 0px)" },
];

const searchInputTiming = {
  duration: 250,
  iterations: 1,
};

if(cartItem.length > 0) {
  cartBtn.classList.add('full');
};


searchBtn.addEventListener('mouseover', ()=>{
  if(searchBtn.classList.contains('activate')){
    searchBtn.addEventListener('click', ()=>{
    })
  }else{
  searchBtn.classList.add('activate');
  searchInput.classList.add('activate');
  searchInput.animate(searchInputAppear,searchInputTiming);
  setTimeout(()=>{
    searchInput.placeholder = "도서명을 검색해주세요.";
  }, 230);
  }
})

searchInput.addEventListener('mouseout', ()=>{
  searchBtn.addEventListener('mouseover', ()=>{
    return;
  })
    searchInput.animate(searchInputDisappear,searchInputTiming);
    searchInput.placeholder = "";
    searchInput.value = "";
    setTimeout(()=>{
      searchBtn.classList.remove('activate');
      searchInput.classList.remove('activate');
    }, 230);
})




//test
const purchaseBtn = document.querySelector('#purchase-button');

purchaseBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  cartItem.push('hi');
  if(cartItem.length > 0) {
  cartBtn.classList.add('full');
};
})
