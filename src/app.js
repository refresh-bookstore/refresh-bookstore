require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT;
const SERVER_LINK = process.env.SERVER_LINK;

///라우터 가지고오기
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRouters");
const pageRouter = require("./routes/pageRouters");

//미들웨어 가지고 오기
const hashPassword = require("./middlewares/hashPassword");
const sessionMiddleware = require("./middlewares/session");

const app = express();

mongoose.set("strictQuery", false);

mongoose.connect(SERVER_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  뷰 엔진
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// 뷰 폴더 정적 추가
app.use(express.static(path.join(__dirname, "views/home")));

// middleware 추가
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(sessionMiddleware);
// app.use(express.static(path.join(__dirname, "views")));

app.use(
  express.static(path.join(__dirname, "/views"), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".css")) {
        res.set("Content-Type", "text/css");
      }
    },
  })
);

app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", pageRouter);

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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
