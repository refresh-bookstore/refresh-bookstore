const categoryService = require("../services/categoryService");

exports.createCategory = async (req, res, next) => {
  try {
    const categoryName = req.body.name;
    const result = await categoryService.createCategory(categoryName);

    res.status(200).json({
      message: "카테고리 생성이 완료되었습니다.",
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "서버 오류가 발생했습니다.",
    });
  }
};

exports.getCategoryList = async (req, res, next) => {
  try {
    const result = await categoryService.getCategories();
    res.status(200).json({
      message: "카테고리를 조회하였습니다.",
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "서버 오류가 발생했습니다.",
    });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await categoryService.getCategory(id);
    res.status(200).json({
      message: "카테고리를 조회합니다.",
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "서버 오류가 발생했습니다.",
    });
  }
};

exports.getCategoryQueryById = async (req, res) => {
  const { id } = req.query;

  try {
    const result = await categoryService.getCategoryQuery(id);
    res.status(200).json({
      message: "카테고리를 조회합니다.",
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "서버 오류가 발생했습니다.",
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { name } = req.body;
    const result = await categoryService.updateCategory(id, name);

    res.status(200).json({
      message: "카테고리를 수정하였습니다.",
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "서버 오류가 발생했습니다.",
    });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await categoryService.removeCategory(id);

    res.status(200).json({
      message: "카테고리를 삭제했습니다.",
      data: result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "서버 오류가 발생했습니다.",
    });
  }
};
