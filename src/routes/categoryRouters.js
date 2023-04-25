const { Router } = require("express");
const {
  createCategory,
  getCategoryList,
  getCategoryById,
  getCategoryQueryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = Router();

// Admin :: 카테고리 생성하기
router.post("/user-admin/category", createCategory);

// 카테고리 목록 조회
router.get("/category", getCategoryList);

// 카테고리 id로 조회하기
router.get("/category/:id", getCategoryById);

// Admin :: 카테고리 목록 조회
router.get("/user-admin/categories", getCategoryList);

// Admin :: 카테고리 id 조회
router.get("/user-admin/category", getCategoryQueryById);

// Admin :: 카테고리 수정하기
router.put("/user-admin/category", updateCategory);

// Admin :: 카테고리 삭제하기
router.delete("/user-admin/category", deleteCategory);

module.exports = router;
