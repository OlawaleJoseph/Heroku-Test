"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _users = _interopRequireDefault(require("../models/users"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var assert = _chai.default.assert;
describe('Users Model', function () {
  describe('createUser(obj) should create and save a new user in the usersDb', function () {
    it('should create User Objects',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var client, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              client = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "client"
              };
              _context.next = 3;
              return _users.default.createUser(client);

            case 3:
              user = _context.sent;
              assert.isObject(user, "user is an object");
              assert.include(user, {
                "id": user.id,
                "firstName": "Mike",
                "lastName": "Jordan",
                "email": "bankaadc@gmail.com",
                "password": user.password
              }, "should have all keys");

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it("should be able to create staff Users",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var staff, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
              };
              _context2.next = 3;
              return _users.default.createUser(staff);

            case 3:
              user = _context2.sent;
              assert.isString(user.type, "user.type should be a string");
              assert.equal(user.type, "staff", "user.type should be equl to staff");
              assert.hasAnyKeys(user, "isAdmin", "staff user should have isAdmin property");
              assert.isBoolean(user.isAdmin, "isAdmin should be a boolean");

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it("should be able to create client Users",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var staff, user;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "client",
                isAdmin: false
              };
              _context3.next = 3;
              return _users.default.createUser(staff);

            case 3:
              user = _context3.sent;
              assert.isString(user.type, "user.type should be a string");
              assert.equal(user.type, "client", "user.type should be equl to client");
              assert.doesNotHaveAnyKeys(user, "isAdmin", "client users should not have isAdmin property");

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it("should save the user in usersDb",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var staff, createdStaff, savedUser;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
              };
              _context4.next = 3;
              return _users.default.createUser(staff);

            case 3:
              createdStaff = _context4.sent;
              savedUser = _users.default.usersDb.find(function (user) {
                return user.id == createdStaff.id;
              });
              assert.isNotNull(savedUser, "savedUser should be defined");
              assert.hasAllKeys(savedUser, ["id", "firstName", "lastName", "password", "email", "createdDate", "type", "isAdmin"], "savedUser should be saved and have all the specified keys");

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe("login()", function () {
    it("Should return null for wrong email",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var wrongEmail;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _users.default.login("a", "password");

            case 2:
              wrongEmail = _context5.sent;
              assert.isNull(wrongEmail, "Wrong email should return null");

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it("Should return null for wrong password",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var client, user, wrongPassword;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              client = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "abcde@gmail.com",
                password: "password",
                type: "client"
              };
              _context6.next = 3;
              return _users.default.createUser(client);

            case 3:
              user = _context6.sent;
              _context6.next = 6;
              return _users.default.login(user.email, "a");

            case 6:
              wrongPassword = _context6.sent;
              assert.isNull(wrongPassword, "Wrong email should return null");

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it("Should return user object for users with the right login credentials",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var user, createdUser, client;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              user = {
                firstName: "Moses",
                lastName: "John",
                email: "abc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
              };
              _context7.next = 3;
              return _users.default.createUser(user);

            case 3:
              createdUser = _context7.sent;
              _context7.next = 6;
              return _users.default.login(createdUser.email, "password");

            case 6:
              client = _context7.sent;
              assert.isNotNull(client, "User should not be empty");
              assert.isObject(client, "User should be an Object");

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  });
  describe("ResetPassword(email)", function () {
    it("Should return null for an unregistered user/email",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var user;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _users.default.resetPassword("aaaa@gmail.com");

            case 2:
              user = _context8.sent;
              assert.isNull(user, "User email should be null");

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it("Should call the generateRandomPasssword()", function () {
      assert.call(_users.default.resetPassword, _users.default.generateRandompassword, "ResetPassword should call the generateRandomPassword function");
    });
    it("Should call updateUser()", function () {
      assert.call(_users.default.resetPassword, _users.default.updateUser);
    });
    it("should return an Object containing the random password and the user",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var staff, user, info;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "seun@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
              };
              _context9.next = 3;
              return _users.default.createUser(staff);

            case 3:
              user = _context9.sent;
              _context9.next = 6;
              return _users.default.resetPassword(user.email);

            case 6:
              info = _context9.sent;
              assert.isObject(info, "user should be an object");
              assert.hasAllKeys(info, ["randomPassword", "updatedUser"]);

            case 9:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it("Random password should be string",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var info, password;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _users.default.resetPassword("bankaadc@gmail.com");

            case 2:
              info = _context10.sent;
              password = info.randomPassword;
              assert.isNotEmpty(password, "Password should not be empty");
              assert.isString(password, "password should be string");

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it("Updated user should be an Object",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var staff, client, info, user;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "abc123@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
              };
              _context11.next = 3;
              return _users.default.createUser(staff);

            case 3:
              client = _context11.sent;
              _context11.next = 6;
              return _users.default.resetPassword(client.email);

            case 6:
              info = _context11.sent;
              user = info.updatedUser;
              assert.isObject(user, "user should be an Object");

            case 9:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
  });
  describe("getAUser()", function () {
    it("Should return null for an invalid user id", function () {
      var user = _users.default.getAUser(2);

      assert.isNull(user, "User should be null");
    });
    it("Should return user for a valid user id",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var staff, client, user;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
              };
              _context12.next = 3;
              return _users.default.createUser(staff);

            case 3:
              client = _context12.sent;
              user = _users.default.getAUser(client.email);
              assert.isObject(user, "user should be an object");

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
  describe("GetAllUsers()", function () {
    var user = {
      "id": _users.default.usersDb.length,
      "firstName": "mike",
      "lastName": "jordan",
      "email": "bankaadc@gmail.com",
      "password": "password",
      "type": "staff",
      "isAdmin": "true",
      "createdDate": (0, _moment.default)()
    };

    _users.default.usersDb.push(user);

    var users = _users.default.getAllUsers();

    it("Should return an array", function () {
      assert.isArray(users, "users should be an array");
    });
    it("should return an array containing user objects", function () {
      users.forEach(function (user) {
        assert.isObject(user, "user should be an object");
        assert.hasAnyKeys(user, ["id", "firstName", "lastName", "password", "email", "createdDate", "type", "isAdmin"], "user object should have the required keys");
      });
    });
  });
  describe("UpdateUser()", function () {
    it("Should call getAUser()", function () {
      assert.call(_users.default.updateUser, _users.default.getAUser, "It should call getAUser()");
    });
    it("Should return null if the id is invalid",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      var updatedUser;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return _users.default.updateUser(0, "newPassword");

            case 2:
              updatedUser = _context13.sent;
              assert.isNull(updatedUser, "updatedUser should be null");

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
    it("Should return null if newPassword field is empty",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var updatedUser;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return _users.default.updateUser(1, "");

            case 2:
              updatedUser = _context14.sent;
              assert.isNull(updatedUser, "updatedUser should be null");

            case 4:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it("Should change the the user password",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var client, staff, user, oldPassword, updatedUser, newPassword;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              client = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
              };
              _context15.next = 3;
              return _users.default.createUser(client);

            case 3:
              staff = _context15.sent;
              user = _users.default.getAUser(staff.email);
              oldPassword = user.password;
              _context15.next = 8;
              return _users.default.updateUser(user.email, "newpassword");

            case 8:
              updatedUser = _context15.sent;
              newPassword = updatedUser.password;
              assert.notEqual(oldPassword, newPassword, "Old password should not be equal to newPassword");

            case 11:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    it("Should return an Object",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      var client, user, updatedUser;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              client = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
              };
              _context16.next = 3;
              return _users.default.createUser(client);

            case 3:
              user = _context16.sent;
              _context16.next = 6;
              return _users.default.updateUser(user.email, "newpassword");

            case 6:
              updatedUser = _context16.sent;
              assert.isObject(updatedUser, "updatedUser should be an object");

            case 8:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
  });
  describe("deleteUser()", function () {
    it("should call getAUser", function () {
      assert.call(_users.default.deleteUser, _users.default.getAUser);
    });
    it("Should return null for an invalid id", function () {
      var user = _users.default.deleteUser(99);

      assert.isNull(user, "user should be null for an invalid id");
    });
    it("Should delete the user with the spcified id from the usersDb",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17() {
      var newStaff, staff, deletedUser, deletedId;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              newStaff = {
                "firstName": "Jude",
                "lastName": "John",
                "email": "doe@gmail.com",
                "password": "password",
                "type": "staff",
                "isAdmin": true
              };
              _context17.next = 3;
              return _users.default.createUser(newStaff);

            case 3:
              staff = _context17.sent;
              deletedUser = _users.default.deleteUser(staff.id);
              deletedId = _users.default.getAUser(deletedUser.email);
              assert.isNull(deletedId, "The id ID of the deleted user should not be in the database anymore");

            case 7:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
  });
  describe("generateToken(email)", function () {
    it("should should return null if ID is invalid/ not registered",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee18() {
      var invalidEmail;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return _users.default.generateToken("abc");

            case 2:
              invalidEmail = _context18.sent;
              assert.isNull(invalidEmail, "Invalid Id should be null");

            case 4:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
    it("should generate a token for a valid id",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee19() {
      var staff, user, token;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
              };
              _context19.next = 3;
              return _users.default.createUser(staff);

            case 3:
              user = _context19.sent;
              _context19.next = 6;
              return _users.default.generateToken(user.email);

            case 6:
              token = _context19.sent;
              assert.isNotNull(token, "should not be null");
              assert.isString(token, "token shoud be a string");
              assert.isAbove(token.length, 20, "token should be longer than 20");

            case 10:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
  });
  describe("decodeToken(token)", function () {
    it("should return null if no token is provided", function () {
      var decodedToken = _users.default.decodeToken("");

      assert.isNull(decodedToken, "decodedToken should be null");
    });
    it("Should return undefined for an invalid Token", function () {
      var decodedToken = _users.default.decodeToken("jjlkls");

      assert.isUndefined(decodedToken, "DecodedToken should be undefine for an invalid token");
    });
    it("should return a user object with a valid token",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20() {
      var staff, user, token, userObj;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              staff = {
                firstName: "Mike",
                lastName: "Jordan",
                email: "bankaadc@gmail.com",
                password: "password",
                type: "staff",
                isAdmin: false
              };
              _context20.next = 3;
              return _users.default.createUser(staff);

            case 3:
              user = _context20.sent;
              _context20.next = 6;
              return _users.default.generateToken(user.email);

            case 6:
              token = _context20.sent;
              _context20.next = 9;
              return _users.default.decodeToken(token);

            case 9:
              userObj = _context20.sent;
              assert.isObject(userObj, "userObj should be an object");
              assert.hasAnyKeys(userObj, ["id", "type", "isAdmin", "iat"], "userObj should have all the specified keys");

            case 12:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
  });
  describe("generateRanmPassword()", function () {
    it("should return String", function () {
      var password = _users.default.generateRandompassword();

      assert.isString(password, "password should be string");
    });
  });
});