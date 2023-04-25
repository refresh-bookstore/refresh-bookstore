const express = require("express");
const router = express.Router();
const { getCategoryList } = require("../controllers/categoryController");
const { getProductList } = require("../controllers/productController");

 router.get("/", (req, res) => {
   res.render("home/home.html");
 });

// 카테고리 목록 조회 - FE 임시 작성
router.get("/category", getCategoryList);

//제품 전체 조회하기 - FE 임시 작성
router.get("/product", getProductList);

module.exports = router;
