const User = require("../collections/user");
const bcrypt = require("bcrypt");

module.exports = {
  registerUser: async (req, res, next) => {
    const { email, username, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    user.save(async err => {
      if (err) {
        res.status(400).send(err);
      } else {
        const authenticatedUser = await User.find({ username })
          .select({ username: 1, email: 1, admin: 1 })
          .populate({
            path: "saved_course",
            select: ["title", "description", "image", "link"]
          });

        req.session.user = authenticatedUser[0];
        res.status(200).send(req.session.user);
      }
    });
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.find({ username }).catch(err =>
      res.status(400).send("incorrect username/password")
    );
    if (user.length) {
      const passwordsMatch = await bcrypt
        .compare(password, user[0].password)
        .catch(err => res.status(400).send("incorrect username/password"));

      if (passwordsMatch) {
        const authenticatedUser = await User.find({ username })
          .select({ username: 1, email: 1, admin: 1 })
          .populate({
            path: "saved_courses",
            select: ["title", "description", "image", "link"]
          })
          .catch(err => res.status(400).send("incorrect username/password"));
        req.session.user = authenticatedUser[0];
        res.status(200).send(req.session.user);
      } else {
        res.status(400).send("incorrect username/password");
      }
    } else {
      res.status(400).send("incorrect username/password");
    }
  },

  userInfo: async (req, res, next) => {
    const { user } = req.session;
    if (user) {
      const { _id } = user;
      const foundUser = await User.findById(_id);
      if (foundUser) {
        req.session.user.admin = user.admin;
        res.status(200).send(req.session.user);
      } else {
        res.status(400).end();
      }
    } else {
      res.end();
    }
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send("logged out");
  }
};
