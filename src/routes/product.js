const { Router } = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");
const AdminAcess = require("../middlewares/adminAccess");
const router = Router();

router.post("/", async(req, res) => {
  const { title, author, publisher, publication_date, 
    isbn, description, price, image_path, category } = req.body;
  
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
  
  try{
    //이미 등록된 도서는 추가할 수 없습니다.
    const isFindisbn = await Product.findOne({ isbn });
    if(isFindisbn){
      throw new Error("이미 등록된 도서입니다.");
    }

    const result = await Product.create(post);
    res.status(200).json({
      message: "Upload success!",
      data: result,
    });

  } catch(error) {
    res.status(500).json({
      message: "생성 오류입니다.",
    })
  }  

});

router.get("/", async(req, res) => {
  try{
    const result = await Product.find({});

    //res.render("productdummy");
    res.status(200).json({
      message: "Upload success!",
      data: result,
    });
  } catch(error){
    res.status(500).json({
      message:"데이터를 조회할 수 없습니다.",
    });
  }
});

//id로 상품 조회하기
router.get("/:_id", async(req, res) => {
  const id = req.params._id;  

  try{
    const result = await Product.findById(id);

    if (result.length === 0){
      res.status(401).json({
        message: "데이터를 찾을 수 없습니다.",
      });
      return;
    }

    res.status(200).json({
      message:"Detail success!",
      data: result,
    })
  } catch(error){
    res.status(500).json({
      message:"데이터를 조회할 수 없습니다.",
    });
  }
});

//카테고리 아이디로 조회하기
router.get("/list/:category", async(req, res) => {
  const categoryName = req.params.category;

  try {
    const findCategory = await Category.find({categoryId : categoryName});
    const products = await Product.find({category : findCategory[0].name});
    
    if(findCategory.length === 0){
      res.status(401).json({
        message: "데이터를 찾을 수 없습니다.",
      });
      return;
    }
    res.json(products);

  } catch(error){
    res.status(500).json({
      message:"데이터를 조회할 수 없습니다.",
    });
  }
});


router.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  const { title, author, publisher, publication_date, isbn, description,
    price, image_path, category} = req.body;
  try {
    const result = await Product.findOneAndUpdate({_id}, {
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

    console.log(result);
    res.status(200).json({
      message: "Update Success!",
      data: result,
    });
  } catch(error) {
    res.status(500).json({
      message: "업데이트를 실패하였습니다.",
    });
  } 
});


// delete
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await Product.findByIdAndDelete(_id);
    res.status(200).json({
      message: "Delete Success!",
      data: result,
    });
  } catch(error) {
    res.status(500).json({
      message: "삭제를 실패하였습니다.",
    });
  }
});


module.exports = router;