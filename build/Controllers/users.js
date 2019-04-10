"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../models/users"));

var _sendEmail = _interopRequireDefault(require("../helperFunctions/sendEmail"));

var _ValidateToken = _interopRequireDefault(require("../middleware/ValidateToken"));

var _validateUser = require("../middleware/validateUser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

router.post('/auth/signup', _validateUser.validateSignUp,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var user, token, subject, message, mail;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _users.default.createUser(req.body);

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).send('Invalid Input'));

          case 5:
            _context.prev = 5;
            _context.next = 8;
            return _users.default.generateToken(user.email);

          case 8:
            token = _context.sent;
            subject = "Welcome to BANKA";
            message = "Welcome to Banka, Your NO.1 BANK!!!";
            _context.next = 13;
            return (0, _sendEmail.default)(user.email, subject, message);

          case 13:
            mail = _context.sent;
            res.json({
              "status": 201,
              "data": {
                token: token,
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email
              }
            });
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](5);
            console.error(_context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 17]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/auth/login', _validateUser.validateLogin,
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var user, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _users.default.login(req.body.email, req.body.password);

          case 2:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              "status": 400,
              "error": "Invalid email or password"
            }));

          case 7:
            _context2.next = 9;
            return _users.default.generateToken(user.email);

          case 9:
            token = _context2.sent;
            res.status(200).json({
              "status": 200,
              "data": {
                token: token,
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email
              }
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/auth/reset',
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var user, subject, message;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _users.default.resetPassword(req.body.email);

          case 2:
            user = _context3.sent;

            if (user) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              "status": 400,
              "error": "Invalid email"
            }));

          case 7:
            subject = "PASSWORD RESET SUCCESSFUL";
            message = "YOUR NEW PASSWORD IS ".concat(user.randomPassword, ".");
            _context3.prev = 9;
            _context3.next = 12;
            return (0, _sendEmail.default)(req.body.email, subject, message);

          case 12:
            res.status(200).json({
              "status": 200,
              "message": "New Password Sent to your email address"
            });
            _context3.next = 19;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](9);
            console.error(_context3.t0);
            res.status(500).status.json({
              "status": 500,
              "error": "Internal Server Error"
            });

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[9, 15]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/', function (req, res) {
  var users = _users.default.getAllUsers();

  res.status(200).json({
    "status": 200,
    "data": users
  });
});
router.get('/auth/me', _ValidateToken.default, function (req, res) {
  var user = _users.default.getAUser(req.user.email);

  if (!user) {
    return res.status(400).send('Invalid Request');
  }

  res.status(200).json({
    "status": 200,
    "data": user
  });
});
router.patch('/auth/me', _ValidateToken.default, function (req, res) {
  var user = _users.default.updateUser(req.params.email, req.body.password);

  res.status(200).json({
    "status": 200,
    "message": "Password Changed Successfully"
  });
});
router.delete('/auth/:id', _ValidateToken.default, function (req, res) {
  if (req.user.isAdmin) {
    var user = _users.default.deleteUser(req.params.id);

    if (user) {
      return res.status(200).json({
        "status": 200,
        "message": "User deleted successfully"
      });
    } else {
      return res.status(400).json({
        "status": 400,
        "error": "Invalid User ID"
      });
    }
  } else {
    return res.status(403).json({
      "status": 403,
      "error": "Forbidden to see this page"
    });
  }
});
var _default = router;
exports.default = _default;