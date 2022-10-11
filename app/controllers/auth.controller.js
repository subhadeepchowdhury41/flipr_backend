const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const RefreshToken = require("../models/refreshToken.model");

exports.signup = async (req, res) => {
  console.log(req.body);
  res.roles = ["employee"];
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    active: true,
    department: req.body.department,
    joiningDate: req.body.joiningDate,
    role: "employee",
    profession: req.body.profession,
    contactNo: req.body.contactNo,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  await user.save().then((result) => {
    res.status(200).send({result: "User added successfully", user: user});
  }).catch(err => {
    res.status(500).send({result: err.name, message: err.message});
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });
      
      await RefreshToken.createToken(user).then((refreshToken) => {
        res.status(200).send({
          _id: user._id,
          username: user.username,
          email: user.email,
          department: user.department,
          joiningDate: user.joiningDate,
          role: user.role,
          profession: user.profession,
          active: user.active,
          contactNo: user.contactNo,
          accessToken: token,
          refreshToken: refreshToken
        });
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};