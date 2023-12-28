const adminContentCategories = document.querySelector("#admin-categories");

const createCategoryList = () => {
  fetch("/category")
    .then((response) => {
      return response.json();
    })
    .then((categories) => {
      listingCategories(categories);
    });

  const listingCategories = (categories) => {
    adminContentCategories.innerHTML = `
      <img class="add-button" id="category-add-button" src="/public/images/icon_add.svg">
      <div class="add-page hidden" id="admin-add-categories"></div>
      `;
    for (let i = 0; i < categories.length; i++) {
      adminContentCategories.innerHTML += `
      <div class="category-box">
          <p class="category-name">${categories[i].name}</p>
          <input class="category-edit-input hidden" type="text"/>
          <img class="admin-button category-edit" title="수정" src="/public/images/icon_edit.svg">
          <img class="admin-button hidden category-check" title="확인" src="/public/images/icon_check.svg">
          <img class="admin-button category-delete" title="삭제" src="/public/images/icon_delete.svg">
      </div>
      `;

      addCategory(categories);
      editCategory(categories);
      deleteCategory(categories);
    }
  };
};

const addCategory = () => {
  const categoryAddBtn = document.querySelector("#category-add-button");
  const adminAddCategories = document.querySelector("#admin-add-categories");

  categoryAddBtn.addEventListener("click", () => {
    adminAddCategories.innerHTML = "";
    adminAddCategories.classList.remove("hidden");
    adminAddCategories.innerHTML += `
      <input class="add-page-input" id="add-category-input" type="text" placeholder="추가하실 카테고리명을 입력해주세요."/>
      <img class="admin-button" id="add-category-check" title="확인" src="/public/images/icon_check.svg">
      <img class="admin-button" id="add-category-delete" title="삭제" src="/public/images/icon_delete.svg">
    `;
    const addCategoryCheck = document.querySelector("#add-category-check");
    const addCategoryDelete = document.querySelector("#add-category-delete");

    addCategoryCheck.addEventListener("click", () => {
      const addCategoryInput = document.querySelector("#add-category-input");

      fetch("/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: addCategoryInput.value,
        }),
      })
        .then((res) => {
          if (res.status !== 204) {
            if (res.status === 403) {
              alert("유효하지 않은 접근입니다.");
              location.replace("/");
            } else {
              return res.json().then((errData) => {
                throw new Error(
                  errData.message || res.statusText || "오류가 발생했습니다.",
                );
              });
            }
          }
          adminAddCategories.innerHTML = "";
          adminAddCategories.classList.add("hidden");
          createCategoryList();
          alert("카테고리가 성공적으로 추가되었습니다.");
        })
        .catch((err) => {
          alert(err.message);
        });
    });

    addCategoryDelete.addEventListener("click", () => {
      adminAddCategories.innerHTML = "";
      adminAddCategories.classList.add("hidden");
    });
  });
};

const editCategory = (categories) => {
  const categoryEditBtn = document.querySelectorAll(".category-edit");

  categoryEditBtn.forEach((e) => {
    e.addEventListener("click", () => {
      const categoryBox = e.closest(".category-box");
      const categoryEditInput = categoryBox.querySelector(
        ".category-edit-input",
      );
      const categoryName = categoryBox.querySelector(".category-name");
      const categoryCheckBtn = categoryBox.querySelector(".category-check");

      e.classList.add("hidden");
      categoryName.classList.add("hidden");
      categoryEditInput.classList.remove("hidden");
      categoryCheckBtn.classList.remove("hidden");

      const thisCategory = categories.find(
        (e) => e.name === categoryName.innerText,
      );

      categoryEditInput.value = categoryName.innerText;
      console.log(thisCategory);

      categoryCheckBtn.addEventListener("click", () => {
        fetch(`/category/${thisCategory.categoryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: categoryEditInput.value,
          }),
        })
          .then((res) => {
            if (res.status !== 204) {
              if (res.status === 403) {
                alert("유효하지 않은 접근입니다.");
                location.replace("/");
              } else {
                return res.json().then((errData) => {
                  throw new Error(
                    errData.message || res.statusText || "오류가 발생했습니다.",
                  );
                });
              }
            }
            e.classList.remove("hidden");
            categoryName.classList.remove("hidden");
            categoryEditInput.classList.add("hidden");
            categoryCheckBtn.classList.add("hidden");
            createCategoryList();
            alert("카테고리가 성공적으로 수정되었습니다.");
          })
          .catch((err) => {
            alert(err.message);
          });
      });
    });
  });
};

const deleteCategory = (categories) => {
  const categoryDeleteBtn = document.querySelectorAll(".category-delete");
  categoryDeleteBtn.forEach((e) => {
    e.addEventListener("click", () => {
      const categoryBox = e.closest(".category-box");
      const categoryName = categoryBox.querySelector(".category-name");
      const thisCategory = categories.find(
        (e) => e.name === categoryName.innerText,
      );

      const categoryIdValue = thisCategory.categoryId;
      const deleteConfirm = window.confirm(
        `<${thisCategory.name}> 카테고리를 삭제하시겠습니까?`,
      );
      if (deleteConfirm) {
        fetch(`/category/${categoryIdValue}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.status !== 204) {
              if (res.status === 403) {
                alert("유효하지 않은 접근입니다.");
                location.replace("/");
              } else {
                return res.json().then((errData) => {
                  throw new Error(
                    errData.message || res.statusText || "오류가 발생했습니다.",
                  );
                });
              }
            }
            categoryBox.remove();
            createCategoryList();
            alert("카테고리가 성공적으로 삭제되었습니다.");
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    });
  });
};

export { createCategoryList };
