import { createBookInfoForm, createBookListHTML } from "./html-generators.js";

let books = [];

const getAdminContentBooks = () => document.querySelector("#admin-books");
const adminContentBooks = getAdminContentBooks();

const createBookList = () => {
  fetchBooks().then((fetchedBooks) => {
    books = fetchedBooks;
    adminContentBooks.innerHTML = createBookListHTML(books);
    adminAddBook();
    document.querySelector(".add-books-block").style.display = "block";
  });
};

const adminAddBook = () => {
  const bookAddBlock = document.querySelector(".add-books-block");
  const bookListBlock = document.querySelector(".book-list");
  const bookAddBtn = document.querySelector(".add-books-block-child");

  if (bookAddBtn) {
    bookAddBtn.addEventListener("click", () => {
      closeExistingForms();
      fetchCategories().then((categories) => {
        const formHtml = createBookInfoForm(null, categories);
        bookListBlock.insertAdjacentHTML("beforebegin", formHtml);

        const newBookForm = document.querySelector(".book-more-infos");
        newBookForm.classList.add("new-book-form");
        bookAddBlock.style.display = "none";
        addNewBook(bookAddBlock);
        newBookForm.scrollIntoView({ behavior: "smooth" });
      });
    });
  } else {
    console.error("Add book button not found");
  }
};

adminContentBooks.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    const bookItem = e.target.closest(".book-item");
    if (!bookItem) {
      console.error("책 아이템을 찾을 수 없습니다.");
      return;
    }

    closeExistingForms();
    const thisBook = books.find(
      (book) => book.title === bookItem.querySelector(".book-name").innerText
    );
    if (!thisBook) {
      console.error("해당 책을 찾을 수 없습니다.");
      return;
    }

    fetchCategories().then((categories) => {
      const formHtml = createBookInfoForm(thisBook, categories);
      bookItem.insertAdjacentHTML("afterend", formHtml); // 수정 폼을 적절한 위치에 삽입
      const formElement = document.getElementById(`book-form-${thisBook.isbn}`);
      formElement.style.display = "block"; // 수정 폼을 표시

      const saveChangesBtn = formElement.querySelector(".form-submit-button");
      saveChangesBtn.addEventListener("click", () => {
        updateBookInfo(formElement, thisBook.isbn);
      });

      const editBtn = bookItem.querySelector(".edit");
      editBtn.classList.add("hidden");
      const checkBtn = bookItem.querySelector(".check");
      checkBtn.classList.remove("hidden");
    });
  }

  if (e.target.matches(".delete")) {
    const bookInfoBlock = e.target.closest(".book-item");
    const bookTitlePart = bookInfoBlock.querySelector(".book-name");
    const thisBook = books.find(
      (book) => book.title === bookTitlePart.innerText
    );

    if (confirm(`<'${thisBook.title}'> 도서를 삭제하시겠습니까?`)) {
      submitBookData("DELETE", `/product/${thisBook.isbn}`)
        .then((res) => {
          if (res.status !== 204) {
            throw new Error(res.statusText);
          }
          createBookList();
        })
        .catch((err) => {
          console.error("책 삭제 실패", err);
        });
    }
  }
});

const addNewBook = (bookAddBlock) => {
  const addBookSubmitBtn = document.querySelector(".form-submit-button");
  if (addBookSubmitBtn) {
    addBookSubmitBtn.addEventListener("click", () => {
      // 폼 데이터 수집
      const bookData = getFormDataFromBlock(
        document.querySelector(".new-book-form")
      );

      // 폼 데이터 유효성 검사
      if (!isFormDataValid(bookData)) {
        alert("모든 정보를 올바르게 입력해주세요.");
        return;
      }

      // 책 이미지 경로 설정
      bookData.imagePath = `https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/${bookData.isbn}.jpg`;

      // 서버에 책 정보 추가 요청
      submitBookData("POST", `/product`, bookData)
        .then((res) => {
          if (res.status !== 204) {
            throw new Error(`서버 오류: ${res.statusText}`);
          }
          createBookList(); // 책 목록 새로고침
          alert("책이 성공적으로 추가되었습니다.");
        })
        .catch((err) => {
          console.error("책 추가 실패", err);
          alert("책을 추가하는 데 실패했습니다.");
        });
    });
  } else {
    console.error("책 추가 버튼을 찾을 수 없습니다.");
  }
};

const updateBookInfo = (bookInfoBlock, isbn) => {
  const bookData = getFormDataFromBlock(bookInfoBlock);

  submitBookData("PATCH", `/product/${isbn}`, bookData)
    .then((res) => {
      if (res.status !== 204) {
        throw new Error(res.statusText);
      }
      bookInfoBlock.style.display = "none";
      createBookList();
    })
    .catch((err) => {
      console.error("책 수정 실패", err);
    });
};

const closeExistingForms = () => {
  const openForms = document.querySelectorAll(".book-form, .new-book-form");
  openForms.forEach((form) => {
    form.remove();
  });
};

document.addEventListener("click", function (event) {
  if (event.target.matches(".form-close-button")) {
    closeExistingForms();
    document.querySelector(".add-books-block").style.display = "block";
  }
  if (event.target.matches(".form-submit-button")) {
    closeExistingForms();
    document.querySelector(".add-books-block").style.display = "block";
  }
});

const fetchBooks = () => {
  return fetch("/product")
    .then((res) => res.json())
    .catch((err) => {
      console.error("책 정보를 가져오는데 실패했습니다.", err);
      alert("책 정보를 가져오는 중 문제가 발생했습니다.");
    });
};

const fetchCategories = () => {
  return fetch("/category")
    .then((res) => res.json())
    .catch((err) => {
      console.error("카테고리 정보를 가져오는데 실패했습니다.", err);
      alert("카테고리 정보를 가져오는 중 문제가 발생했습니다.");
    });
};

const getFormDataFromBlock = (block) => {
  return {
    title: block.querySelector("#titleInput").value,
    author: block.querySelector("#authorInput").value,
    publisher: block.querySelector("#publisherInput").value,
    category: block.querySelector("#categoryInput").value,
    isbn: block.querySelector("#isbnInput").value,
    publicationDate: block.querySelector("#dateInput").value,
    price: block.querySelector("#priceInput").value,
    description: block.querySelector("#descriptionInput").value,
  };
};

const isFormDataValid = (bookData) => {
  const requiredFields = [
    "title",
    "author",
    "publisher",
    "isbn",
    "publicationDate",
    "price",
  ];
  const missingFields = requiredFields.filter((field) => !bookData[field]);

  if (missingFields.length > 0) {
    alert(`다음 필드가 누락되었습니다: ${missingFields.join(", ")}`);
    return false;
  }
  return true;
};

const submitBookData = (method, url, bookData) => {
  return fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });
};

export { createBookList };
