const bookAddBtn = document.querySelector('#book-add-button');
const adminAddBooks = document.querySelector('#admin-add-books');
const adminContentBooks = document.querySelector('#admin-books');


const createBookList = () => {
  fetch('/product')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    listingBooks(data.data);
  })
  .catch((err) => console.log(err));

  const listingBooks = (books) => {
    adminAddBooks.classList.add('active');
    bookAddBtn.classList.add('active');
    for(let i = 0; i < books.length; i++){
      const published = new Date(books[i].publication_date);
      adminContentBooks.innerHTML += 
      `
      <div class="admin-items">
          <input type="checkbox">
          <div class="item-info">
            <div class="item-more-info">
              <p class="item-name"> ${books[i].title}</p>
              <p class="item-detail"> ${books[i].author} | ${books[i].publisher} | ${published.getFullYear()} </p>
            </div>
            <p class="item-cost">${books[i].price.toLocaleString()}원</p>
            <span class="admin-buttons">
              <img class="admin-button" src="/public/images/icon_edit.svg">
              <img class="admin-button" src="/public/images/icon_delete.svg">
            </span> 
          </div>
      `
    }
  }
}

export { createBookList };