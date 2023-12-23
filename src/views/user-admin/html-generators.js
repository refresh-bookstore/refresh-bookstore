const createBookInfoForm = (book, categories) => {
  let categoryList = "";

  if (categories.length > 0) {
    categoryList = categories
      .map((category) => {
        const isSelected = book && category.name === book.category;
        return `<option value="${category.name}" ${
          isSelected ? "selected" : ""
        }>${category.name}</option>`;
      })
      .join("");
  }

  categoryList += '<option value="custom">카테고리 직접 입력</option>';

  const stockValue = book ? book.stock : "";

  const isbnInputHtml = book
    ? `<input class="book-input" id="isbnInput" type="text" value="${book.isbn}" placeholder="책 ISBN을 입력해주세요." readonly/>`
    : `<input class="book-input" id="isbnInput" type="text" placeholder="책 ISBN을 입력해주세요."/>`;

  const formHtml = `
    <div class="book-more-infos ${book ? "book-form" : "new-book-form"}" id="${
    book ? `book-form-${book.isbn}` : "new-book-form"
  }">
      <span>
        <p>제목</p>
        <input class="book-input" id="titleInput" type="text" value="${
          book ? book.title : ""
        }" placeholder="책 제목을 입력해주세요."/>
      </span>
      <span>
        <p>저자</p>
        <input class="book-input" id="authorInput" type="text" value="${
          book ? book.author : ""
        }" placeholder="저자 이름을 입력해주세요."/>
      </span>
      <span>
        <p>출판사</p>
        <input class="book-input" id="publisherInput" type="text" value="${
          book ? book.publisher : ""
        }" placeholder="출판사 이름을 입력해주세요."/>
      </span>
      <span>
        <p>카테고리</p>
        <select class="book-input" id="categoryInput" name="categories">
          ${categoryList}
        </select>
        <input type="text" id="customCategoryInput" class="book-input" style="display:none;" placeholder="카테고리 이름 입력">
      </span>
      <span>
        <p>ISBN</p>
        ${isbnInputHtml}
      </span>
      <span>
        <p>출판일</p>
        <input class="book-input" type="date" id="dateInput" value="${
          book ? formatDate(book.publicationDate) : ""
        }" name="publicationDate"/>
      </span>
      <span>
        <p>가격</p>
        <input class="book-input" id="priceInput" type="text" value="${
          book ? book.price : ""
        }" placeholder="책 가격을 입력해주세요."/>
      </span>
      <span>
        <p>책소개</p>
        <textarea class="book-input" id="descriptionInput" placeholder="책 설명을 입력해주세요.">${
          book ? book.description : ""
        }</textarea>
      </span>
      <span>
        <p>재고</p>
        <input class="book-input" id="stockInput" type="number" value="${stockValue}" placeholder="재고 수량을 입력해주세요."/>
      </span>
      <div class="button-container">
      <button class="form-close-button">닫기</button>
      <button class="form-submit-button">등록</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const categorySelectElement = document.querySelector("#categoryInput");
    if (categorySelectElement) {
      categorySelectElement.addEventListener("change", (event) => {
        toggleCustomCategoryInput(event.target);
      });

      if (categories.length === 0) {
        categorySelectElement.value = "custom";
        toggleCustomCategoryInput(categorySelectElement);
      }
    }
  }, 0);

  return formHtml;
};

const createBookListHTML = (books) => {
  let html = `
    <div class="add-books-block">
      <div class="add-books-block-child">새로운 책 추가하기</div>
    </div>
    <div class="book-list">`;

  books.forEach((book) => {
    html += `
      <div class="book-item">
        <div class="book-item-info">
          <div class="book-more-infos">
            <p class="book-name">${book.title}</p>
            <p class="book-detail">${book.author} | ${
      book.publisher
    } | ${formatDate(book.publicationDate)}</p>
          </div>
          <p class="book-cost">${book.price.toLocaleString()}원</p>
          <span class="book-buttons">
            <img class="book-button edit" src="/public/images/icon_edit.svg">
            <img class="book-button delete" src="/public/images/icon_delete.svg">
          </span>
        </div>
      </div>`;
  });

  html += `</div>`;

  return html;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

function toggleCustomCategoryInput(selectElement) {
  const customCategoryInput = document.getElementById("customCategoryInput");

  if (!customCategoryInput) {
    return;
  }

  customCategoryInput.style.display =
    selectElement.value === "custom" ? "block" : "none";
}

export { createBookInfoForm, createBookListHTML };
