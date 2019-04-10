"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _hashPassword = _interopRequireDefault(require("../helperFunctions/hashPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);

    this.usersDb = [];
  }

  _createClass(User, [{
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(obj) {
        var firstName, lastName, email, password, type, hashedPassword, newUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                firstName = obj.firstName, lastName = obj.lastName, email = obj.email, password = obj.password, type = obj.type;
                _context.next = 3;
                return (0, _hashPassword.default)(password);

              case 3:
                hashedPassword = _context.sent;
                newUser = {
                  id: this.usersDb.length + 1,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: hashedPassword,
                  type: type,
                  createdDate: (0, _moment.default)()
                };

                if (newUser.type == "staff") {
                  newUser.isAdmin = obj.isAdmin;
                }

                this.usersDb.push(newUser);
                return _context.abrupt("return", newUser);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(email, password) {
        var user, verifyPassword;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user = this.usersDb.find(function (client) {
                  return client.email == email;
                });

                if (user) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", null);

              case 3:
                _context2.next = 5;
                return _bcrypt.default.compare(password, user.password);

              case 5:
                verifyPassword = _context2.sent;

                if (!verifyPassword) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", user);

              case 8:
                return _context2.abrupt("return", null);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function login(_x2, _x3) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(email) {
        var user, randomPassword, updatedUser, details;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                user = this.getAUser(email);

                if (user) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", null);

              case 3:
                randomPassword = this.generateRandompassword();
                _context3.next = 6;
                return this.updateUser(user.email, randomPassword);

              case 6:
                updatedUser = _context3.sent;
                details = {
                  randomPassword: randomPassword,
                  updatedUser: updatedUser
                };
                return _context3.abrupt("return", details);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function resetPassword(_x4) {
        return _resetPassword.apply(this, arguments);
      }

      return resetPassword;
    }()
  }, {
    key: "getAUser",
    value: function getAUser(email) {
      var user = this.usersDb.find(function (user) {
        return user.email == email;
      });

      if (!user) {
        return null;
      }

      ;
      return user;
    }
  }, {
    key: "getAllUsers",
    value: function getAllUsers() {
      return this.usersDb;
    }
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(email, newPassword) {
        var user, index, hashedPassword;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                user = this.getAUser(email);

                if (user) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", null);

              case 3:
                index = this.usersDb.indexOf(user);

                if (newPassword) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", null);

              case 6:
                _context4.next = 8;
                return (0, _hashPassword.default)(newPassword);

              case 8:
                hashedPassword = _context4.sent;
                user.password = hashedPassword;
                user.updatedDate = (0, _moment.default)();
                return _context4.abrupt("return", this.usersDb[index]);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateUser(_x5, _x6) {
        return _updateUser.apply(this, arguments);
      }

      return updateUser;
    }()
  }, {
    key: "deleteUser",
    value: function deleteUser(id) {
      if (!id) {
        return null;
      }

      var user = this.usersDb.find(function (client) {
        return client.id == id;
      });

      if (!user) {
        return null;
      }

      var index = this.usersDb.indexOf(user);
      return this.usersDb.splice(index, 1);
    }
  }, {
    key: "generateToken",
    value: function () {
      var _generateToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(email) {
        var user, token;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                user = this.getAUser(email);

                if (user) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return", null);

              case 3:
                _context5.next = 5;
                return _jsonwebtoken.default.sign(user, process.env.secret);

              case 5:
                token = _context5.sent;
                return _context5.abrupt("return", token);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function generateToken(_x7) {
        return _generateToken.apply(this, arguments);
      }

      return generateToken;
    }()
  }, {
    key: "decodeToken",
    value: function decodeToken(token) {
      if (!token) {
        return null;
      }

      try {
        var decodedToken = _jsonwebtoken.default.verify(token, process.env.secret);

        if (decodedToken) {
          return decodedToken;
        }

        ;
      } catch (err) {
        console.log(err);
        return undefined;
      }
    }
  }, {
    key: "generateRandompassword",
    value: function generateRandompassword() {
      var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
      return Array(8).fill(char).map(function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }).join("");
    }
  }]);

  return User;
}();

var _default = new User();

exports.default = _default;