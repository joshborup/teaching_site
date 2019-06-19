module.exports = {
  sessionCheck: (req, res, next) => {
    if (req.session.user) {
      console.log(req.session.user);
      next();
    } else {
      res.statusMessage = "You must first log in";
      res.status(400).redirect("/");
    }
  }
};
