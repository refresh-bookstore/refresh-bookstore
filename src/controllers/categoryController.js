const Category = require("../models/Category");
const categoryService = require("../services/categoryService");

exports.createCategory = async (req, res, next) => {
  try {
    const categoryName = req.body.name;
    const result = await categoryService.createCategory(categoryName);

    res.status(200).json({
      message: "Upload success!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "생성 오류입니다.",
    });
  }
};

exports.getCategoryList = async (req, res, next) => {
  try {
    const result = await categoryService.getCategories();
    //res.render("categorydummy.html");
    res.status(200).json({
      message: "Read success!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "데이터를 조회할 수 없습니다.",
    });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await categoryService.getCategory(id);
    res.status(200).json({
      message: "Detail success!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "카테고리를 조회할 수 없습니다.",
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await categoryService.updateCategory(id, name);

    res.status(200).json({
      message: "Update Success!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "업데이트를 실패하였습니다.",
    });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryService.removeCategory(id);

    res.status(200).json({
      message: "Delete Success!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "삭제를 실패하였습니다.",
    });
  }
};
