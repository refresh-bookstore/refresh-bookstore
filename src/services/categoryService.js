const Category = require("../models/Category");

exports.createCategory = async categoryName => {
  //categoryId :: 자동으로 카테고리 index 생성
  const findCategoryId = await Category.find({}).sort({ categoryId: -1 });
  const lastNum = findCategoryId.length > 0 ? findCategoryId[0].categoryId : 0;
  const addNum = lastNum + 1;

  console.log(addNum);
  const post = new Category({
    name: categoryName,
    categoryId: addNum,
  });
  console.log(post);

  const isCategory = await Category.findOne({ name: categoryName });
  if (isCategory) {
    throw { 
      status: 400, 
      message: "이미 존재하는 카테고리입니다." 
    };
    //return;
  }

  const categories = await Category.create(post);
  return categories;
};

exports.getCategories = async () => {
  const categories = await Category.find({});
  if (categories.length === 0) {
    throw { 
      status: 400, 
      message: "카테고리가 존재하지 않습니다." 
    };
  }
  return categories;
};

exports.getCategory = async id => {
  const category = await Category.findById(id);
  if (!category) {
    throw { 
      status: 400, 
      message: "카테고리가 존재하지 않습니다." 
    };
  }
  return category;
};

exports.updateCategory = async (_id, name) => {
  const category = await Category.findOneAndUpdate(
    { _id },
    { name },
    {
      new: true,
    }
  );
  return category;
};

exports.removeCategory = async id => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw { 
      status: 400, 
      message: "삭제할 데이터가 없습니다." 
    };
  }
  return category;
};
