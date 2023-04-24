const { Router } = require("express");
const {
  createProduct,
  getProductList,
  getProductById,
  keywordProduct,
  getProductByISBN,
  getProductByCategory,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = Router();

// Admin :: 제품 생성하기
router.post("/product", createProduct);

//제품 전체 조회하기
router.get("/product", getProductList);

//id - 제품 조회하기
//router.get("/product/:_id", getProductById);

//isbn - 제품 조회하기
router.get("/product/:isbn", getProductByISBN);

//[search] keyword로 책 조회하기
router.get("/product/:search", keywordProduct);

//category - 제품 조회하기
router.get("/product/list/:category", getProductByCategory);

//Admin :: 제품 수정하기
router.put("/product/:_id", updateProduct);

//Admin :: 제품 삭제하기
router.delete("/product/:_id", deleteProduct);

module.exports = router;
