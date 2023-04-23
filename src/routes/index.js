const express = require("express");
const router = express.Router();

// router.get("/", function (req, res, next) {
//   res.render("/home/home", { title: "Express" });
//

router.get("/", (req, res) => {
  res.render("home/home.html");
});

module.exports = router;
