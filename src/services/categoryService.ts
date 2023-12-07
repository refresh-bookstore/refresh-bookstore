import Category from "../models/Category";

export class CategoryService {
  async createCategory(categoryName: string) {
    const findCategoryId = await Category.find({}).sort({ categoryId: -1 });
    console.log("findCategoryId:", findCategoryId); // 추가된 로그
    const lastNum =
      findCategoryId.length > 0 ? findCategoryId[0].categoryId : 0;
    console.log("Next Category ID:", lastNum + 1); // 추가된 로그
    const post = new Category({
      name: categoryName,
      categoryId: lastNum + 1,
    });
    console.log("New category object:", post); // 추가된 로그

    const isCategory = await Category.findOne({ name: categoryName });
    if (isCategory) {
      throw {
        status: 400,
        message: "이미 존재하는 카테고리입니다.",
      };
    }

    const categories = await Category.create(post);
    return categories;
  }

  async getCategories() {
    const categories = await Category.find({});
    if (categories.length === 0) {
      throw {
        status: 400,
        message: "카테고리가 존재하지 않습니다.",
      };
    }
    return categories;
  }

  async getCategory(id: string) {
    const category = await Category.findById(id);
    if (!category) {
      throw {
        status: 400,
        message: "카테고리가 존재하지 않습니다.",
      };
    }
    return category;
  }

  async updateCategory(_id: string, name: string) {
    const category = await Category.findOneAndUpdate(
      { _id },
      { name },
      {
        new: true,
      }
    );
    return category;
  }

  async removeCategory(id: string) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw {
        status: 400,
        message: "삭제할 데이터가 없습니다.",
      };
    }
    return category;
  }
}
