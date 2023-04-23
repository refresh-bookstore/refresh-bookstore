require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRouters");

const hashPassword = require("./middlewares/hashPassword");
const sessionMiddleware = require("./middlewares/session");

const app = express();

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://ksoup3434:u6KlMbiDKNEgwr2Z@cluster0.4gp8bj5.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//  뷰 엔진
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// 뷰 폴더 정적 추가
app.use(express.static(path.join(__dirname, "views")));

// middleware 추가
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(sessionMiddleware);

app.use(
  express.static(path.join(__dirname, "/public"), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".css")) {
        res.set("Content-Type", "text/css");
      }
    },
  })
);

app.use("/", indexRouter);
app.use("/", usersRouter);
//app.use("/mypage", checkSession, mypageRouter);
app.use("/login", loginRouter);
app.use("/register", usersRouter);
app.use("/mypage", checkSession, mypageRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/product/list", productRouter);
app.use("/product/products", productRouter);

// 404 에러 핸들링
app.use(function (req, res, next) {
  next(createError(404));
});

// 에러 핸들링
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// hashPassword, authenticate 미들웨어 사용
app.use(hashPassword);

// 라우팅 추가

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
