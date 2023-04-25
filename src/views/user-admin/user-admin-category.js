import { categories } from './categories.js';

const adminContentCategories = document.querySelector('#admin-categories');


const createCategoryList = () => {
  for(let i = 0; i < categories.length; i++){
    adminContentCategories.innerHTML += 
    `
    <div class="category-box">
        <p class="category-name">${categories[i].name}</p>
        <input class="category-edit-input hidden" type="text"/>
        <img class="admin-button category-edit" title="수정" src="../public/images/icon_edit.svg">
        <img class="admin-button hidden category-check" title="확인" src="../public/images/icon_check.svg">
        <img class="admin-button category-delete" title="삭제" src="../public/images/icon_delete.svg">
    </div>
    `
  }
}

const addCategory = () => {
  const categoryAddBtn = document.querySelector('#category-add-button');
  const adminAddCategories = document.querySelector('#admin-add-categories');
  categoryAddBtn.addEventListener('click', () => {
    adminAddCategories.innerHTML ='';
    adminAddCategories.classList.remove('hidden');
    adminAddCategories.innerHTML += `
      <input class="add-page-input" id="add-category-input" type="text" placeholder="추가하실 카테고리명을 입력해주세요."/>
      <img class="admin-button" id="add-category-check" title="확인" src="../public/images/icon_check.svg">
      <img class="admin-button" id="add-category-delete" title="삭제" src="../public/images/icon_delete.svg">
    `;
    const addCategoryCheck = document.querySelector('#add-category-check');
    const addCategoryDelete = document.querySelector('#add-category-delete');


    addCategoryCheck.addEventListener('click', ()=> {
      const addCategoryInput = document.querySelector('#add-category-input')
      ///임시기능///
      adminContentCategories.innerHTML += 
      `
      <div class="category-box">
          <p class="category-name">${addCategoryInput.value}</p>
          <input class="category-edit-input hidden" type="text"/>
          <img class="admin-button category-edit" title="수정" src="../public/images/icon_edit.svg">
          <img class="admin-button hidden category-check" title="확인" src="../public/images/icon_check.svg">
          <img class="admin-button category-delete" title="삭제" src="../public/images/icon_delete.svg">
      </div>
      `
      adminAddCategories.innerHTML ='';
      adminAddCategories.classList.add('hidden');
      /////////////
    })
  
    addCategoryDelete.addEventListener('click', ()=> {
      adminAddCategories.innerHTML ='';
      adminAddCategories.classList.add('hidden');
    })
  })
}

const editCategory = () => {
  const categoryEditBtn = document.querySelectorAll('.category-edit');
  categoryEditBtn.forEach((e)=> {
    e.addEventListener('click', ()=>{
      console.log('hi');
      const categoryBox = e.closest('.category-box');
      const categoryEditInput = categoryBox.querySelector('.category-edit-input');
      const categoryName = categoryBox.querySelector('.category-name');
      const categoryCheckBtn = categoryBox.querySelector('.category-check');
  
      e.classList.add('hidden');
      categoryName.classList.add('hidden');
      categoryEditInput.classList.remove('hidden');
      categoryCheckBtn.classList.remove('hidden');
  
      categoryEditInput.value = categoryName.innerText;
  
      categoryCheckBtn.addEventListener('click',()=>{
        ///임시기능
        categoryName.innerText = categoryEditInput.value;
        ///
  
        e.classList.remove('hidden');
        categoryName.classList.remove('hidden');
        categoryEditInput.classList.add('hidden');
        categoryCheckBtn.classList.add('hidden');
      })
    });
  })
}


const deleteCategory = () => {
  const categoryDeleteBtn = document.querySelectorAll('.category-delete');
  categoryDeleteBtn.forEach((e)=> {
    e.addEventListener('click', ()=>{
      const categoryBox = e.closest('.category-box');
      ///임시기능
      categoryBox.remove();
      ///
    })
  })
}



export { createCategoryList, addCategory, deleteCategory, editCategory };