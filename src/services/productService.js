const Product = require("../models/Product");
const Category = require("../models/Category");

exports.createProduct = async (title, author, publisher, publication_date, isbn, description, price, image_path, category) => {
  
  const post = new Product({
    title: title,
    author : author,
    publisher : publisher,
    publication_date : publication_date,
    isbn : isbn,
    description : description,
    price : price,
    image_path : image_path,
    category : category,
  });

  console.log(post);

  //ISBN 중복 필터링 :: 중복 시 책 등록 불가
  const isFindisbn = await Product.findOne({ isbn });
  if(isFindisbn){
    throw new Error(error.message);
  }
  const book = await Product.create(post);
  return book;
}

exports.getProducts = async () => {
  const products = await Product.find({});
  return products;
}

exports.getProduct = async (id) => {
  const product = await Product.findById(id);
  if (product.length === 0){
    throw new Error(401, "데이터를 찾을 수 없습니다.");
  }

  return product;
}

exports.getProductCategory = async (categoryName) => {
  const findCategory = await Category.find({categoryId : categoryName});
  const products = await Product.find({category : findCategory[0].name});

  if(products.length === 0){
    throw new Error(401, "데이터를 찾을 수 없습니다.");
  }
  return products;
}

exports.getProductISBN = async (productIsbn) => {
  const findCategory = await Product.find({ isbn : productIsbn });
  if(findCategory.length === 0){
    throw new Error(401, "데이터를 찾을 수 없습니다.");
  }

  return findCategory;
}

exports.updateProduct = async ({_id}, {title, author, publisher, publication_date, isbn, 
  description, price, image_path, category}) => {
  
  const product = await Product.findOneAndUpdate({_id}, {
    title,
    author,
    publisher,
    publication_date,
    isbn,
    description,
    price,
    image_path,
    category,
  }, {
    new: true, 
  });
  
  if(!product){
    throw new Error(401, "데이터를 찾을 수 없습니다.");
  }

const isFindisbn = await Product.find({ isbn });
  if(isFindisbn.length > 1){
    throw new Error(401, "이미 등록된 도서입니다.");
  }
  return product;
}

exports.deleteProduct = async(_id) => {
  const product = await Product.findByIdAndDelete(_id);
  return product;
}