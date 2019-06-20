require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
app.use(express.json());
const mongoose = require("mongoose");
const {
  sessionCheck,
  adminSessionCheck,
  signatureForUserImage
} = require("./middlewares/middlewares");
const {
  get,
  post,
  put,
  deleteItem,
  getUserCourseById,
  updateUserImage
} = require("./controller/userCoursesController");
const {
  login,
  registerUser,
  userInfo,
  logout
} = require("./controller/authController");

const {
  adminGetById,
  adminGetAll,
  adminPost,
  adminDelete
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
app.get("/api/user/course", get);
app.get("/api/courses", get);
app.use(sessionCheck);
app.get("/api/logout", logout);
app.get("/api/courses/:id", getUserCourseById);
app.get("/api/user-image-signing", signatureForUserImage);
app.put("/api/imageupdate", updateUserImage);
// User Course Endpoints

app.post("/api/user/course", post);

app
  .route("/api/user/course/:id")
  .put(put)
  .delete(deleteItem);

// Admin Course Endpoints
app.use(adminSessionCheck);
app
  .route("/api/admin/course")
  .get(adminGetAll)
  .post(adminPost);

app
  .route("/api/admin/course/:id")

  .put(put)
  .delete(adminDelete);

const port = SERVER_PORT;
app.listen(port, () => console.log(`server listening on ${port}`));
