require("dotenv").config();
const cloudinary = require("cloudinary");
module.exports = {
  sessionCheck: (req, res, next) => {
    if (req.session.user) {
      console.log(req.session.user);
      next();
    } else {
      res.statusMessage = "You must first log in";
      res.status(400).redirect("/");
    }
  },
  adminSessionCheck: (req, res, next) => {
    if (req.session.user.admin) {
      next();
    } else {
      res.statusMessage = "You are not authorized";
      res.status(401).redirect("/");
    }
  },
  signatureForUserImage(req, res) {
    // get a timestamp in seconds which is UNIX format
    const timestamp = Math.round(new Date().getTime() / 1000);

    // cloudinary API secret stored in the .env file
    const api_secret = process.env.CLOUDINARY_SECRET_API;

    // user built in cloudinary api sign request function to  create hashed signature with your api secret and UNIX timestamp
    const signature = cloudinary.utils.api_sign_request(
      { timestamp: timestamp },
      api_secret
    );

    // make a signature object to send to your react app
    const payload = {
      signature: signature,
      timestamp: timestamp
    };
    res.json(payload);
  }
};
