const Course = require("../collections/courses");
const User = require("../collections/user");
module.exports = {
  get: async (req, res, next) => {
    const courses = await Course.find({}).catch(err => console.log(err));
    res.status(200).send(courses);
  },
  getUserCourseById: async (req, res, next) => {
    const { id } = req.params;
    const courses = await Course.findById(id)
      .populate({
        path: "content",
        select: ["sections", "repo_link"]
      })
      .catch(err => console.log(err));
    res.status(200).send(courses);
  },
  put: async (req, res, next) => {
    const { id } = req.params;
    let { star } = req.query;
    console.log(id, star);
    star = JSON.parse(star);
    console.log(typeof star);
    const { _id } = req.session.user;
    const user = await User.findById(_id).catch(err => console.log(err));
    if (star) {
      user.saved_courses.push(id);
    } else {
      let index = user.saved_courses.indexOf(id);
      console.log(index);
      user.saved_courses.splice(index, 1);
      console.log(user);
    }

    user.save(async err => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        const users = await User.findById(_id)
          .select({ username: 1, email: 1, admin: 1 })
          .populate({
            path: "saved_courses",
            select: ["title", "description", "image", "link"]
          })
          .catch(err => console.log(err));
        console.log(users);
        req.session.user.saved_courses = users.saved_courses;
        res.status(200).send(req.session.user);
      }
    });
  },
  post: (req, res, next) => {
    res.status(200).send("put live");
  },
  deleteItem: (req, res, next) => {
    res.status(200).send("deleteItem live");
  }
};
