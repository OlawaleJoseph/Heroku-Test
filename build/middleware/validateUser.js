"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSignUp = exports.validateLogin = void 0;

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateLogin = function validateLogin(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var emailRegex = /^[a-z0-9\+\-_\.]+@[a-z\d\-.]+\.[a-z]+$/i;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      "status": 400,
      "error": "Invalid Email"
    });
  } else if (!password) {
    return res.status(400).json({
      "status": 400,
      "error": "Password required"
    });
  } else {
    next();
  }
};

exports.validateLogin = validateLogin;

var validateSignUp = function validateSignUp(req, res, next) {
  if (!req.body.firstName || /[^a-zA-z]/.test(req.body.firstName)) {
    return res.status(400).json({
      "status": 400,
      "error": "First name is required"
    });
  } else if (req.body.firstName.length < 3 || req.body.firstName.length > 25) {
    return res.status(400).json({
      "status": 400,
      "error": "First name should be between 3 to 25 characters"
    });
  }

  if (!req.body.lastName || /[^a-zA-z]/.test(req.body.lastName)) {
    return res.status(400).json({
      "status": 400,
      "error": "Last name is required"
    });
  } else if (req.body.lastName.length < 3 || req.body.lastName.length > 25) {
    return res.status(400).json({
      "status": 400,
      "error": "Last name should be between 3 to 25 characters"
    });
  }

  if (!req.body.email) {
    return res.status(400).json({
      "status": 400,
      "error": "email is required"
    });
  } else if (!/^[a-z0-9\+\-_\.]+@[a-z\d\-.]+\.[a-z]+$/i.test(req.body.email)) {
    return res.status(400).json({
      "status": 400,
      "error": "Invalid email"
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      "status": 400,
      "error": "Password is required"
    });
  } else if (req.body.password.length < 6 || req.body.password.length > 25) {
    return res.status(400).json({
      "status": 400,
      "error": "Password should be between 6 to 25 characters"
    });
  }

  if (!req.body.type || /[^a-zA-z]/.test(req.body.type)) {
    return res.status(400).json({
      "status": 400,
      "error": "Type of user is required"
    });
  } else if (req.body.type.toLowerCase() != "staff" && req.body.type.toLowerCase() != "client") {
    return res.status(400).json({
      "status": 400,
      "error": "Invalid user Type"
    });
  } else {
    var user = _users.default.getAUser(req.body.email);

    if (user) {
      return res.status(400).json({
        "status": 400,
        "error": "Email already registered"
      });
    }
  }

  next();
};

exports.validateSignUp = validateSignUp;