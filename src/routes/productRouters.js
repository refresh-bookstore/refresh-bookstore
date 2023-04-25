const { Router } = require("express");
const {
  createProduct,
  getProductList,
  getProductById,
  getProductQueryById,
  keywordProduct,
  getProductByISBN,
  getProductByCategory,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = Router();

// Admin :: 제품 생성하기
router.post("/user-admin/product", createProduct);

// 제품 전체 조회하기
router.get("/product", getProductList);

// isbn - 제품 조회하기
router.get("/book-detail/:isbn", getProductByISBN);

// [search] keyword로 책 조회하기
router.get("/product/:search", keywordProduct);

// category - 제품 조회하기
router.get("/product/list/:category", getProductByCategory);

// Admin ::제품 전체 조회하기
router.get("/user-admin/products", getProductList);

// Admin :: isbn 제품 조회하기
router.get("/user-admin/product", getProductQueryById);

// Admin :: 제품 수정하기
router.put("/user-admin/product", updateProduct);

// Admin :: 제품 삭제하기
router.delete("/user-admin/product", deleteProduct);

module.exports = router;
