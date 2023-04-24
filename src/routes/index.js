const express = require("express");
const router = express.Router();
const { getCategoryList } = require("../controllers/categoryController.js");

// router.get("/", function (req, res, next) {
//   res.render("/home/home", { title: "Express" });
//

router.get("/", (req, res) => {
  res.render("home/home.html");
});

// 카테고리 목록 조회
router.get("/category", getCategoryList);

module.exports = router;
