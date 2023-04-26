const adminContentCategories = document.querySelector('#admin-categories');

const createCategoryList = () => {
  fetch('/user-admin/categories')
  .then((res) => res.json())
  .then((data) => {
    listingCategories(data.data);
  })
  .catch((err) => console.log(err));

  const listingCategories = (categories) => {
    adminContentCategories.innerHTML = `
      <img class="add-button" id="category-add-button" src="/public/images/icon_add.svg">
      <div class="add-page hidden" id="admin-add-categories"></div>
      `; 
    for(let i = 0; i < categories.length; i++){
      adminContentCategories.innerHTML += 
      `
      <div class="category-box">
          <p class="category-name">${categories[i].name}</p>
          <input class="category-edit-input hidden" type="text"/>
          <img class="admin-button category-edit" title="수정" src="/public/images/icon_edit.svg">
          <img class="admin-button hidden category-check" title="확인" src="/public/images/icon_check.svg">
          <img class="admin-button category-delete" title="삭제" src="/public/images/icon_delete.svg">
      </div>
      `

      addCategory(categories);
      editCategory(categories);
      deleteCategory(categories);
    }
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
      <img class="admin-button" id="add-category-check" title="확인" src="/public/images/icon_check.svg">
      <img class="admin-button" id="add-category-delete" title="삭제" src="/public/images/icon_delete.svg">
    `;
    const addCategoryCheck = document.querySelector('#add-category-check');
    const addCategoryDelete = document.querySelector('#add-category-delete');


    addCategoryCheck.addEventListener('click', ()=> {
      const addCategoryInput = document.querySelector('#add-category-input')

      fetch('/user-admin/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: addCategoryInput.value,
          categoryId: 1, // 카테고리 아이디가 어떻게 되는건지 몰라서 일단 1
        }),
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        console.log('카테고리 추가 성공');
        adminAddCategories.innerHTML ='';
        adminAddCategories.classList.add('hidden');
        createCategoryList();
      })
      .catch(err => {
        console.error('카테고리 추가 실패', err);
      });



    })
  
    addCategoryDelete.addEventListener('click', ()=> {
      adminAddCategories.innerHTML ='';
      adminAddCategories.classList.add('hidden');
    })
  })
}

const editCategory = (categories) => {
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

      const thisCategory = categories.find((e) => e.name === categoryName.innerText)
  
      categoryEditInput.value = categoryName.innerText;
      console.log(thisCategory);

      categoryCheckBtn.addEventListener('click',()=>{

        const categoryIdValue = thisCategory._id;
        const data = {
          name: categoryEditInput.value,
          categoryId: thisCategory.categoryId,
        };

        fetch(`/user-admin/category?id=${categoryIdValue}`, {
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
          console.log('카테고리 수정 성공');
          e.classList.remove('hidden');
          categoryName.classList.remove('hidden');
          categoryEditInput.classList.add('hidden');
          categoryCheckBtn.classList.add('hidden');
          createCategoryList();
        })
        .catch(err => {
          console.error('카테고리 수정 실패', err);
        });
  

      })
    });
  })
}


const deleteCategory = (categories) => {
  const categoryDeleteBtn = document.querySelectorAll('.category-delete');
  categoryDeleteBtn.forEach((e)=> {
    e.addEventListener('click', ()=>{
      const categoryBox = e.closest('.category-box');
      const categoryName = categoryBox.querySelector('.category-name');
      const thisCategory = categories.find((e) => e.name === categoryName.innerText)
      console.log(thisCategory);
      const categoryIdValue = thisCategory._id;
      fetch(`/user-admin/category?id=${categoryIdValue}`, {
        method: 'DELETE',
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        console.log('카테고리 삭제 성공');
        categoryBox.remove();
        createCategoryList();
      })
      .catch(err => {
        console.error('카테고리 삭제 실패', err);
      });

    })
  })
}









export { createCategoryList };