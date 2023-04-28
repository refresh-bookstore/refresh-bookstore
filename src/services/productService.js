const Product = require("../models/Product");
const Category = require("../models/Category");

exports.createProduct = async (
  title,
  author,
  publisher,
  publication_date,
  isbn,
  description,
  price,
  image_path,
  category
) => {
  const post = new Product({
    title: title,
    author: author,
    publisher: publisher,
    publication_date: publication_date,
    isbn: isbn,
    description: description,
    price: price,
    image_path: image_path,
    category: category,
  });

  //ISBN 중복 필터링 :: 중복 시 책 등록 불가
  const isFindisbn = await Product.findOne({ isbn });
  if (isFindisbn) {
    throw {
      status: 400,
      message: "등록된 ISBN입니다.",
    };
  }
  const book = await Product.create(post);
  return book;
};

exports.getProducts = async () => {
  const products = await Product.find({});

  //console.log(products);
  if (products.length === 0) {
    throw {
      status: 400,
      message: "데이터를 찾을 수 없습니다.",
    };
  }

  return products;
};

exports.getProductQuery = async book => {
  const product = await Product.find({ isbn: book });

  if (product.length === 0) {
    throw {
      status: 400,
      message: "데이터를 찾을 수 없습니다.",
    };
  }

  return product;
};

exports.getProduct = async id => {
  const product = await Product.findById(id);
  if (product.length === 0) {
    throw {
      status: 400,
      message: "데이터를 찾을 수 없습니다.",
    };
  }

  return product;
};

exports.getProductCategory = async categoryName => {
  const findCategory = await Category.find({ categoryId: categoryName });
  const products = await Product.find({ category: findCategory[0].name });

  if (products.length === 0) {
    throw {
      status: 400,
      message: "데이터를 찾을 수 없습니다.",
    };
  }
  return products;
};

exports.getProductISBN = async productIsbn => {
  const findCategory = await Product.find({ isbn: productIsbn });
  if (findCategory.length === 0) {
    throw {
      status: 400,
      message: "데이터를 찾을 수 없습니다.",
    };
  }
  return findCategory;
};

exports.searchwordProduct = async keyword => {
  let contents = [];
  if (keyword) {
    console.log(keyword);
    contents = await Product.find({
      $or: [
        { title: { $regex: new RegExp(`${keyword}`, "i") } },
        { author: { $regex: new RegExp(`${keyword}`, "i") } },
      ],
    });
  }
  return contents;
};

exports.updateProduct = async (
  { book },
  {
    title,
    author,
    publisher,
    publication_date,
    isbn,
    description,
    price,
    image_path,
    category,
  }
) => {
  const product = await Product.findOneAndUpdate(
    { isbn: book },
    {
      title,
      author,
      publisher,
      publication_date,
      isbn,
      description,
      price,
      image_path,
      category,
    },
    {
      new: true,
    }
  );

  if (!product) {
    throw {
      status: 400,
      message: "데이터를 찾을 수 없습니다.",
    };
  }

  const isFindisbn = await Product.find({ isbn });
  if (isFindisbn.length > 1) {
    throw {
      status: 400,
      message: "데이터를 찾을 수 없습니다.",
    };
  }
  return product;
};

exports.deleteProduct = async book => {
  const product = await Product.findOneAndDelete({ isbn: book });
  return product;
};

exports.getPrice = async id => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error(401, "데이터를 찾을 수 없습니다.");
  }
  return product.price;
};
