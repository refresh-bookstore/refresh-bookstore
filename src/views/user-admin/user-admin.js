//import { dataLists } from './dummy-datas';


const title = document.querySelector('.title');
const lists = [
  adminBooks = document.querySelector('#list-books'),
  adminUsers = document.querySelector('#list-users'),
  adminOrders = document.querySelector('#list-orders'),
  adminCategories = document.querySelector('#list-categories'),
];

const contents = [
  adminContentBooks = document.querySelector('#admin-books'),
  adminContentUsers = document.querySelector('#admin-users'),
  adminContentOrders = document.querySelector('#admin-orders'),
  adminContentCategories = document.querySelector('#admin-categories'),
];



lists.forEach((e)=> {
  e.addEventListener('click', ()=>{
    contents.map((el) => {
      if (contents.indexOf(el) === lists.indexOf(e)) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    })
    title.innerText = e.innerText;

    if(lists.indexOf(e) === 0){
      for(let i = 0; i < dataLists.length; i++){
        const item = document.createElement('div').classList.add('item');
        item.innerHTML=`
        <div class="item-img">
        <img src="../../../public/images/sample_image.jpg">
        </div>
        <div class="item-info">
          <p class="item-name"> 혼자 공부하는 얄팍한 코딩지식</p>
          <p class="item-detail"> 한빛 출판사 | 고현민 | 2022</p>
          <p class="item-cost"> 15,800원</p>
          <span class="item-buttons">
            <button>수정</button>
            <button class="red">삭제</button>
        </span> 
        </div>`
        contents[0].appendChild(item);
      }
    }

  })
})