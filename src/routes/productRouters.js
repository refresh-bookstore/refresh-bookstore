const { Router } = require("express");
const {
  createProduct,
  getProductList,
  getProductById,
  getProductByISBN,
  getProductByCategory,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = Router();

// Admin :: 제품 생성하기
router.post("/", createProduct);

// 제품 조회하기
router.get("/", getProductList);

//id로 제품 조회하기
router.get("/:_id", getProductById);

//isbn 제품 조회하기
router.get("/book_detail/:isbn", getProductByISBN);

//카테고리 아이디로 조회하기
router.get("/list/:category", getProductByCategory);

//Admin :: 제품 수정하기
router.put("/:_id", updateProduct);

//Admin :: 제품 삭제하기
router.delete("/:_id", deleteProduct);

module.exports = router;
