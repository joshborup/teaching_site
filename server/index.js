require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
app.use(express.json());
const mongoose = require("mongoose");
const {
  get,
  post,
  put,
  deleteItem,
  getCourseById
} = require("./controller/userCoursesController");
const {
  login,
  registerUser,
  userInfo,
  logout
} = require("./controller/authController");

const {
  adminGetById,
  adminGetAll
} = require("./controller/adminCoursesController");
const { SERVER_PORT, CONNECTION_STRING_LOCAL, SESSION_SECRET } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 // 2 weeks
    }
  })
);

mongoose
  .connect(CONNECTION_STRING_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(err => console.log(err));

// top level middlewares

// auth

app.post("/api/register", registerUser);
app.post("/api/login", login);
app.get("/api/user", userInfo);
app.get("/api/logout", logout);

// User Course Endpoints
app
  .route("/api/user/course")
  .get(get)
  .post(post);

app
  .route("/api/user/course/:id")
  .put(put)
  .delete(deleteItem);

// Admin Course Endpoints
app.get("/api/courses", get);

app
  .route("/api/admin/course")
  .get(adminGetAll)
  .post(post);

app
  .route("/api/admin/course/:id")
  .get(adminGetById)
  .put(put)
  .delete(deleteItem);

const port = SERVER_PORT;
app.listen(port, () => console.log(`server listening on ${port}`));
