const { Router } = require("express");
const {
  createCategory,
  getCategoryList,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = Router();

// Admin :: 카테고리 생성하기
router.post("/category", createCategory);

// 카테고리 목록 조회
router.get("/category", getCategoryList);

// 카테고리 id로 조회하기
router.get("/category/:id", getCategoryById);

// Admin :: 카테고리 수정하기
router.put("/category/:id", updateCategory);

// Admin :: 카테고리 삭제하기
router.delete("/category/:id", deleteCategory);

module.exports = router;
