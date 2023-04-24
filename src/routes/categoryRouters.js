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
router.post("/", createCategory);

// 카테고리 목록 조회
router.get("/", getCategoryList);

// 카테고리 id로 조회하기
router.get("/:id", getCategoryById);

// Admin :: 카테고리 수정하기
router.put("/:id", updateCategory);

// Admin :: 카테고리 삭제하기
router.delete("/:id", deleteCategory);

module.exports = router;
