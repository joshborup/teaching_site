const Course = require("../collections/courses");
const CourseContent = require("../collections/courseContent");
module.exports = {
  adminGetAll: async (req, res, next) => {
    const courses = await Course.find({}).catch(err => console.log(err));
    res.status(200).send(courses);
  },
  adminGetById: async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const course = await Course.findById(id);

    res.status(200).send(course);
  },
  adminPost: (req, res, next) => {
    const { title, description, link, sections, repo_link, image } = req.body;
    const content = new CourseContent({
      sections,
      repo_link
    });

    content.save((err, newCourse) => {
      const course = new Course({
        title,
        description,
        link,
        image,
        content: newCourse._id
      });
      course.save(async err => {
        if (err) {
          res.status(200).send(err);
        } else {
          const courses = await Course.find({})
            .populate({
              path: "content",
              select: ["sections", "repo_link"]
            })
            .catch(err => console.log(err));
          res.status(200).send(courses);
        }
      });
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
