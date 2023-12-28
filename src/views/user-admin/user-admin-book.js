import { createBookInfoForm, createBookListHTML } from "./html-generators.js";
import { global } from "./globalVariables.js";

const editButtonsMap = new Map();
const adminContentBooks = document.querySelector("#admin-books");

const limitPerPage = 10;
let books = [];

const createBookList = (page = 1, searchTerm = "", isbn = "") => {
  global.currentPage = page;

  fetchBooks(page, limitPerPage, searchTerm, isbn).then(
    ({ books: fetchedBooks, total, totalPages }) => {
      global.currentPage = page;
      books = fetchedBooks;
      adminContentBooks.innerHTML = createBookListHTML(
        books,
        global.currentPage,
        totalPages
      );

      document.querySelectorAll(".book-item").forEach((item) => {
        item.style.animation = "none";
      });

      setTimeout(() => {
        document.querySelectorAll(".book-item").forEach((item) => {
          item.style.animation = "fadeIn 0.5s ease-out";
        });
      }, 50);

      adminAddBook();

      const searchButton = document.querySelector(".search-button");
      if (searchButton) {
        searchButton.removeEventListener("click", searchButtonClickHandler);
        searchButton.addEventListener("click", searchButtonClickHandler);
      }

      setSearchState();

      const searchInput = document.querySelector(".search-input");
      if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
          if (event.key === "Enter") {
            event.preventDefault();
            searchButtonClickHandler();
          }
        });
      }
    }
  );
};

window.changePage = (newPage) => {
  const pageNumber = parseInt(newPage, 10);
  if (!isNaN(pageNumber) && pageNumber > 0) {
    if (pageNumber !== global.currentPage) {
      createBookList(pageNumber, global.searchTerm, global.isbn);
    }
  } else {
    console.error(`유효하지 않은 페이지 번호: ${newPage}`);
  }
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

        const newBookForm = document.querySelector(".new-book-form");
        newBookForm.classList.add("new-book-form");
        bookAddBlock.style.display = "none";
        addNewBook();
      });
    });
  }
};

adminContentBooks.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches(".edit")) {
    handleEditClick(target);
  } else if (target.matches(".delete")) {
    handleDeleteClick(target);
  } else if (target.classList.contains("pagination-btn")) {
    const newPage = parseInt(target.textContent, 10);
    if (!isNaN(newPage) && newPage !== global.currentPage) {
      changePage(newPage);
    }
  }
});

const handleEditClick = (target) => {
  const isbn = target.getAttribute("data-isbn");
  if (!isbn) {
    console.error("ISBN을 찾을 수 없습니다.");
    return;
  }

  closeExistingForms();

  const bookToEdit = books.find((book) => book.isbn === isbn);
  if (!bookToEdit) {
    console.error("해당 책을 찾을 수 없습니다.");
    return;
  }

  fetchCategories().then((categories) => {
    const formHtml = createBookInfoForm(bookToEdit, categories);
    const bookItem = target.closest(".book-item");
    bookItem.insertAdjacentHTML("afterend", formHtml);

    const editBtn = bookItem.querySelector(".edit");
    editButtonsMap.set(bookItem, editBtn);
    editBtn.style.visibility = "hidden";

    const formElement = document.getElementById(`book-form-${bookToEdit.isbn}`);
    formElement.style.display = "block";

    const saveChangesBtn = formElement.querySelector(".form-submit-button");
    saveChangesBtn.addEventListener("click", () => {
      updateBookInfo(formElement, bookToEdit.isbn);
    });
  });
};

const handleDeleteClick = (target) => {
  const isbn = target.getAttribute("data-isbn");
  if (!isbn) {
    console.error("ISBN을 찾을 수 없습니다.");
    return;
  }

  const bookToDelete = books.find((book) => book.isbn === isbn);
  if (!bookToDelete) {
    console.error("해당 책을 찾을 수 없습니다.");
    return;
  }

  if (confirm(`'${bookToDelete.title}' 도서를 삭제하시겠습니까?`)) {
    submitBookData("DELETE", `/product/${bookToDelete.isbn}`)
      .then((res) => {
        if (res.status !== 204) {
          throw new Error(res.statusText);
        }
        alert("삭제가 완료되었습니다.");
        createBookList(global.currentPage);
      })
      .catch((err) => {
        console.error("책 삭제 실패: ", err);
      });
  }
};

const addNewBook = (bookAddBlock) => {
  const addBookSubmitBtn = document.querySelector(".form-submit-button");
  if (addBookSubmitBtn) {
    addBookSubmitBtn.addEventListener("click", () => {
      const newBookForm = document.querySelector(".new-book-form");
      const bookData = getFormDataFromBlock(
        document.querySelector(".new-book-form")
      );

      if (bookData.category === "custom") {
        const customCategoryValue = document.getElementById(
          "customCategoryInput"
        ).value;
        if (customCategoryValue) {
          bookData.category = customCategoryValue;
        } else {
          alert("사용자 정의 카테고리를 입력해주세요.");
          return;
        }
      }

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
          alert("성공적으로 추가되었습니다!");
          createBookList();
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
  delete bookData.isbn;

  submitBookData("PATCH", `/product/${isbn}`, bookData)
    .then((res) => {
      if (res.status !== 204) {
        throw new Error(res.statusText);
      }
      bookInfoBlock.style.display = "none";
      createBookList();
      alert("성공적으로 수정되었습니다!");
    })
    .catch((err) => {
      console.error("책 수정 실패: ", err);
    });
};

const closeExistingForms = () => {
  const openForms = document.querySelectorAll(".book-form, .new-book-form");
  openForms.forEach((form) => {
    form.remove();
  });

  editButtonsMap.forEach((editBtn, bookItem) => {
    editBtn.style.visibility = "visible";
  });
  editButtonsMap.clear();
};

document.addEventListener("click", function (event) {
  if (
    event.target.matches(".form-close-button") ||
    event.target.matches(".form-submit-button")
  ) {
    const form = event.target.closest(".book-more-infos");
    if (form) {
      form.classList.add("fade-out");

      const editBtn = editButtonsMap.get(form.previousElementSibling);
      if (editBtn) {
        editBtn.style.visibility = "visible";
        editButtonsMap.delete(form.previousElementSibling);
      }

      setTimeout(() => {
        form.remove();
        document.querySelector(".add-books-block").style.display = "block";
      }, 500);
    }
  }
});

const fetchBooks = (
  page = 1,
  limit = limitPerPage,
  searchTerm = "",
  isbn = ""
) => {
  let query = `?page=${page}&limit=${limit}`;
  if (searchTerm) query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
  if (isbn) query += `&isbn=${isbn}`;

  return fetch(`/product${query}`)
    .then((res) => res.json())
    .then((response) => {
      return {
        books: response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        total: response.total,
        totalPages: Math.ceil(response.total / limit),
      };
    })
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
    stock: block.querySelector("#stockInput").value,
  };
};

const getSearchCategory = () => {
  const selectElement = document.querySelector(".search-select");
  return selectElement ? selectElement.value : "title";
};

const getSearchTerm = () => {
  const inputElement = document.querySelector(".search-input");
  return inputElement ? inputElement.value.trim() : "";
};

const getSearchISBN = () => {
  const selectElement = document.querySelector(".search-select");
  return selectElement && selectElement.value === "isbn" ? getSearchTerm() : "";
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

const setSearchState = () => {
  const searchInput = document.querySelector(".search-input");
  const searchSelect = document.querySelector(".search-select");

  if (searchInput) {
    searchInput.value = global.searchTerm;
  }
  if (searchSelect) {
    searchSelect.value = global.searchCategory;
  }
};

function searchButtonClickHandler() {
  global.searchTerm = getSearchTerm();
  global.isbn = getSearchISBN();
  global.searchCategory = getSearchCategory();
  createBookList(1, global.searchTerm, global.isbn);
}
export { createBookList };
