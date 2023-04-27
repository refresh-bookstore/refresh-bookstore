const adminContentBooks = document.querySelector('#admin-books');


const createBookList = () => {
  fetch('/user-admin/products')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    listingBooks(data.data);
  })
  .catch((err) => console.log(err));

  const listingBooks = (books) => {
    adminContentBooks.innerHTML = `
    <div class="add-books-block">
      <div class="add-books-block-child"> 새로운 책 추가하기 </div>
    </div>
    `; 
    for(let i = 0; i < books.length; i++){
      const published = new Date(books[i].publication_date);
      adminContentBooks.innerHTML += 
      `
      <div class="admin-items">
          <div class="item-info">
            <div class="item-more-info">
              <p class="item-name"> ${books[i].title}</p>
              <p class="item-detail"> ${books[i].author} | ${books[i].publisher} | ${published.getFullYear()} </p>
            </div>
            <p class="item-cost">${books[i].price.toLocaleString()}원</p>
            <span class="admin-buttons">
              <img class="admin-button edit" src="/public/images/icon_edit.svg">
              <img class="admin-button check hidden" src="/public/images/icon_check.svg">
              <img class="admin-button delete" src="/public/images/icon_delete.svg">
            </span> 
          </div>
      `
    }
    adminEditBook(books);
    adminAddBook(books);
    adminDeleteBook(books);
  }
}

const adminEditBook = (books) => {
  const bookEditBtn = adminContentBooks.querySelectorAll('.edit');
  bookEditBtn.forEach((e)=> {
    e.addEventListener('click', ()=>{

      const bookInfoBlock = e.closest('.admin-items');
      const checkBtn = bookInfoBlock.querySelector('.check');

      e.classList.add('hidden');
      checkBtn.classList.remove('hidden');

      const bookTitlePart = bookInfoBlock.querySelector('.item-name');
      const thisBook = books.find((e) =>  e.title === bookTitlePart.innerText );
      const published = new Date(thisBook.publication_date);

      console.log(thisBook);

      fetch('/user-admin/categories')
        .then((res) => res.json())
        .then((data) => {
          bookInfoBlock.style.height = "780px";
          let categoryList = "";
          for(let i = 0; i < data.data.length; i++){
            if(data.data[i].name === thisBook.category){
              categoryList += `<option value="${data.data[i].name}" selected>${data.data[i].name}</option>`
            }else{
              categoryList += `<option value="${data.data[i].name}">${data.data[i].name}</option>`
            }

          }
          setTimeout(()=>{
          bookInfoBlock.innerHTML += `
            <div class="book-more-infos">
              <span> <p>제목</p> <input id="titleInput" type="text" value="${thisBook.title}"/> </span>
              <span> <p>저자</p> <input id="authorInput" type="text" value="${thisBook.author}"/> </span>
              <span> <p>출판사</p> <input id="publisherInput" type="text" value="${thisBook.publisher}"/> </span>
              <span> <p>카테고리</p> <select id="categoryInput" name="categories">${categoryList}</select> </span>
              <span> <p>ISBN</p> <input id="isbnInput" type="text" value="${thisBook.isbn}"/> </span>
              <span> <p>출판일</p> <input type="date" id="dateInput" name="publication_date" value="${published.getFullYear()}-${(published.getMonth()+ 1).toString().padStart(2, '0') }-${published.getDate().toString().padStart(2, '0')}"/> </span>
              <span> <p>가격</p> <input id="priceInput" type="text" value="${thisBook.price}"/> </span>
              <span> <p>책소개</p> <textarea id="descriptionInput""/> ${thisBook.description} </textarea></span>
            </div>
          `
          const checkBtn = bookInfoBlock.querySelector('.check');
          const editBtn = bookInfoBlock.querySelector('.edit');
          const moreInfo = bookInfoBlock.querySelector('.book-more-infos');

          checkBtn.addEventListener('click', ()=> {
            console.log('hi');
            const bookTitle = bookInfoBlock.querySelector('#titleInput');
            const bookAuthor = bookInfoBlock.querySelector('#authorInput');
            const bookPublisher = bookInfoBlock.querySelector('#publisherInput');
            const bookCategory = bookInfoBlock.querySelector('#categoryInput');
            const bookIsbn = bookInfoBlock.querySelector('#isbnInput');
            const bookPublished = bookInfoBlock.querySelector('#dateInput');
            const bookPrice = bookInfoBlock.querySelector('#priceInput');
            const bookDescription = bookInfoBlock.querySelector('#descriptionInput');
  
            const bookData = {
              title: bookTitle.value,
              author: bookAuthor.value,
              publisher: bookPublisher.value,
              category: bookCategory.value,
              isbn: bookIsbn.value,
              publication_date: bookPublished.value,
              price: bookPrice.value,
              description: bookDescription.value,
            }
  
            fetch(`/user-admin/product?book=${thisBook.isbn}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(bookData),
            })
            .then(res => {
              if (!res.ok) {
                throw new Error(res.statusText);
              }
              console.log('책 수정 성공');
              editBtn.classList.remove('hidden');
              checkBtn.classList.add('hidden');
              moreInfo.remove();
              bookInfoBlock.style.height = "60px";
              createBookList();
            })
            .catch(err => {
              console.error('책 수정 실패', err);
            });
            })
          }, 230);
        })
        .catch((err) => console.log(err));
      

        })
  })


}



const adminAddBook = (books) => {
  const bookAddBlock = document.querySelector('.add-books-block');
  const bookAddBtn = document.querySelector('.add-books-block-child');
  bookAddBtn.addEventListener('click', ()=>{

      fetch('/user-admin/categories')
        .then((res) => res.json())
        .then((data) => {
          bookAddBtn.innerText = "클릭하여 책을 추가해주세요."
          bookAddBlock.style.height = "780px";
          let categoryList = "";
          for(let i = 0; i < data.data.length; i++){
            categoryList += `<option value="${data.data[i].name}">${data.data[i].name}</option>`
          }
          setTimeout(()=>{
          bookAddBlock.innerHTML += `
            <div class="book-more-infos">
              <span> <p>제목</p> <input id="titleInput" type="text" placeholder="책 제목을 입력해주세요."/> </span>
              <span> <p>저자</p> <input id="authorInput" type="text" placeholder="저자 이름을 입력해주세요."/> </span>
              <span> <p>출판사</p> <input id="publisherInput" type="text" placeholder="출판사 이름을 입력해주세요."/> </span>
              <span> <p>카테고리</p> <select id="categoryInput" name="categories">${categoryList}</select> </span>
              <span> <p>ISBN</p> <input id="isbnInput" type="text" placeholder="책 ISBN을 입력해주세요."/> </span>
              <span> <p>출판일</p> <input type="date" id="dateInput" name="publication_date"/> </span>
              <span> <p>가격</p> <input id="priceInput" type="text" placeholder="책 가격을 입력해주세요."/> </span>
              <span> <p>책소개</p> <textarea id="descriptionInput" placeholder="책 설명을 입력해주세요."/> </textarea></span>
            </div>
          `
          const bookAddBtn = document.querySelector('.add-books-block-child');
          bookAddBtn.addEventListener('click', ()=> {
            const moreInfo = bookAddBlock.querySelector('.book-more-infos');
            console.log('hi');
            const bookTitle = bookAddBlock.querySelector('#titleInput');
            const bookAuthor = bookAddBlock.querySelector('#authorInput');
            const bookPublisher = bookAddBlock.querySelector('#publisherInput');
            const bookCategory = bookAddBlock.querySelector('#categoryInput');
            const bookIsbn = bookAddBlock.querySelector('#isbnInput');
            const bookPublished = bookAddBlock.querySelector('#dateInput');
            const bookPrice = bookAddBlock.querySelector('#priceInput');
            const bookDescription = bookAddBlock.querySelector('#descriptionInput');
            if(!bookTitle.value || bookAuthor.value || bookPublisher.value || bookIsbn.value || bookPublished.value || bookPrice.value){
              window.alert('정보를 모두 입력해주세요.')
            }else{
              const bookData = {
                title: bookTitle.value,
                author: bookAuthor.value,
                publisher: bookPublisher.value,
                category: bookCategory.value,
                isbn: bookIsbn.value,
                publication_date: bookPublished.value,
                price: bookPrice.value,
                description: bookDescription.value,
                image_path: `https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/${bookIsbn.value}.jpg`,
              }
    
              fetch(`/user-admin/product`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
              })
              .then(res => {
                if (!res.ok) {
                  throw new Error(res.statusText);
                }
                console.log('책 추가 성공');
                moreInfo.remove();
                bookAddBlock.style.height = "30px";
                createBookList();
              })
              .catch(err => {
                console.error('책 추가 실패', err);           
            });
          }
            })
         }, 230);
        })
        .catch((err) => console.log(err));
      })

}


const adminDeleteBook = (books) => {
  const bookDeleteBtn = adminContentBooks.querySelectorAll('.delete');
  bookDeleteBtn.forEach((e)=> {
    e.addEventListener('click', ()=>{

      const bookInfoBlock = e.closest('.admin-items');

      const bookTitlePart = bookInfoBlock.querySelector('.item-name');
      const thisBook = books.find((e) =>  e.title === bookTitlePart.innerText );
      const deleteConfirm = confirm(`<${thisBook.title}> 도서를 삭제하시겠습니까?`);
      if(deleteConfirm){
        fetch(`/user-admin/product?book=${thisBook.isbn}`, {
          method: 'DELETE',
          })
          .then(res => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            console.log('책 삭제 성공');
            createBookList();
          })
          .catch(err => {
                console.error('책 삭제 실패', err);
              });
      }
    })
  }) 
}



export { createBookList };