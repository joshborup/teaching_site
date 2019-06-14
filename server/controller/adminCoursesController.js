const Course = require("../collections/courses");
module.exports = {
  adminGetAll: async (req, res, next) => {
    const courses = await Course.find({}).catch(err => console.log(err));
    res.status(200).send(courses);
  },
  adminGetById: async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const course = await Course.findById(id).catch(err => console.log(err));
    res.status(200).send(course);
  },
  adminPost: (req, res, next) => {
    const { title, description, link } = req.body;
    const course = new Course({
      title,
      description,
      link
    });
    course.save(async err => {
      if (err) {
        res.status(200).send(err);
      } else {
        const courses = await Course.find({}).catch(err => console.log(err));
        res.status(200).send(courses);
      }
    });
  },
  adminUpdate: (req, res, next) => {},
  adminDelete: async (req, res, next) => {
    const { id } = req.body;
    const deletedCourse = await Course.findByIdAndDelete(id);
    console.log(deletedCourse);
    const courses = await Course.find({}).catch(err => console.log(err));
    res.status(200).send(courses);
  }
};
