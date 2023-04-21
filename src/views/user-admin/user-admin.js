//import { dataLists } from './dummy-datas.js';
import { main } from '../public/js/main.js';



const title = document.querySelector('.title');
const adminBooks = document.querySelector('#list-books');
const adminUsers = document.querySelector('#list-users');
const adminOrders = document.querySelector('#list-orders');
const adminCategories = document.querySelector('#list-categories');

const adminContentBooks = document.querySelector('#admin-books');
const adminContentUsers = document.querySelector('#admin-users');
const adminContentOrders = document.querySelector('#admin-orders');
const adminContentCategories = document.querySelector('#admin-categories');

const lists = [
  adminBooks,
  adminUsers,
  adminOrders,
  adminCategories,
];

const contents = [
  adminContentBooks,
  adminContentUsers,
  adminContentOrders,
  adminContentCategories,
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
        <img src="../public/images/sample_image.jpg">
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

main();