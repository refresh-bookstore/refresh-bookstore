const { Router } = require("express");
const Category = require("../models/Category");
const AdminAcess = require("../middlewares/adminAccess");
const router = Router();

router.post('/', async (req, res) => {
  const categoryName = req.body.name;

  //categoryId - auto increase
  const findCategoryId = await Category.find({}).sort({ "categoryId" : -1 });
  const lastNum = findCategoryId[0].categoryId;
  const result = (findCategoryId.length === 0)? 1 : lastNum + 1;

  console.log(result);

  const post = new Category({
    name: categoryName,
    categoryId: result,
  });
  console.log(post);

  try {
    const isCategory = await Category.findOne({ name: categoryName });
    if (isCategory) {
      res.status(401).json({
        message: "이미 존재하는 카테고리입니다.",
      });
      return;
    }
    const result = await post.save();
    res.status(200).json({
      message: "Upload success!",
      data: result,
    });
    } catch(error) {
      res.status(500).json({
        message: "생성 오류입니다.",
      });
    }
});


// 카테고리 목록 조회
router.get('/', async (req, res) => {
  try {
    const result = await Category.find({});
    //res.render("categorydummy.html");
    res.status(200).json({
      message: "Read success!",
      data: result,
    });
  } catch(error) {
    res.status(500).json({
      message: "데이터를 조회할 수 없습니다.",
    });
  }
});


// 카테고리 id로 조회하기
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await Category.findById(id);
    res.status(200).json({
      message: "Detail success!",
      data: result,
    });
  } catch(error) {
    res.status(500).json({
      message: "id를 조회할 수 없습니다.",
    });
  }
});


// 카테고리 수정하기
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;
  try {
    const result = await Category.findOneAndUpdate({_id}, {
      name
    }, {
      // 업데이트 후에 업데이트 된 게시물을 반환할지. 없으면 업데이트 전 게시물을 반환함.
      new: true, 
    });

    console.log(name);
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

// 카테고리 삭제하기
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Category.findByIdAndDelete(id);
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