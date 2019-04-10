"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var assert = _chai.default.assert;

_chai.default.use(_chaiHttp.default);

describe("User Controllers", function () {
  var user;
  var token;
  beforeEach(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var client;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _users.default.usersDb = [];
            client = {
              firstName: "John",
              lastName: "Doe",
              email: "mike@gmail.com",
              type: "staff",
              password: "password",
              isAdmin: true
            };
            _context.next = 4;
            return _users.default.createUser(client);

          case 4:
            user = _context.sent;
            _context.next = 7;
            return _users.default.generateToken(user.email);

          case 7:
            token = _context.sent;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterEach(function () {
    user = "";
    token = "";
  });
  describe("POST/auth/signup", function () {
    this.timeout(10000);
    it("Should create new user", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/signup').send({
        firstName: "John",
        lastName: "Doe",
        email: "bankaadc@gmail.com",
        type: "client",
        password: "password"
      }).end(function (err, res) {
        assert.equal(res.body.status, 201, "Response status should be 201");
        assert.hasAllKeys(res.body, ["status", "data"], "Response body should have status and data keys");
        assert.isObject(res.body.data, "Data should be an object");
        assert.hasAllKeys(res.body.data, ["token", "id", "firstName", "lastName", "email"]);
        done();
      });
    });
    it("Should return status of 400", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/signup').send({
        firstName: "",
        lastName: "Doe",
        email: "bankaadc@gmail.com",
        type: "client",
        password: "password"
      }).end(function (err, res) {
        assert.equal(res.body.status, 400, "Response status should be 400");
        done();
      });
    });
    it("Should return status of 400", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/signup').send({
        firstName: "John",
        lastName: "",
        email: "bankaadc@gmail.com",
        type: "client",
        password: "password"
      }).end(function (err, res) {
        assert.equal(res.body.status, 400, "Response status should be 400");
        done();
      });
    });
    it("Should return status of 400", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/signup').send({
        firstName: "John",
        lastName: "Doe",
        email: "bankaad",
        type: "client",
        password: "password"
      }).end(function (err, res) {
        assert.equal(res.body.status, 400, "Response status should be 400");
        done();
      });
    });
    it("Should return status of 400", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/signup').send({
        firstName: "John",
        lastName: "Doe",
        email: "bankaadc@gmail.com",
        type: "aaa",
        password: "password"
      }).end(function (err, res) {
        assert.equal(res.body.status, 400, "Response status should be 400");
        done();
      });
    });
    it("Should return status of 400", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/signup').send({
        firstName: "John",
        lastName: "Doe",
        email: "bankaadc@gmail.com",
        type: "client",
        password: ""
      }).end(function (err, res) {
        assert.equal(res.body.status, 400, "Response status should be 400");
        done();
      });
    });
  });
  describe("POST/auth/login", function () {
    it("Should login user", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/login').send({
        "email": "mike@gmail.com",
        "password": "password"
      }).end(function (err, res) {
        assert.equal(res.body.status, 200, "Response status should be 200");
        assert.hasAllKeys(res.body, ["status", "data"], "Response body should have status and data keys");
        assert.isObject(res.body.data, "Data should be an object");
        assert.hasAllKeys(res.body.data, ["token", "id", "firstName", "lastName", "email"]);
        done();
      });
    });
    it("Should login user", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/login').send({
        "email": "",
        "password": "password"
      }).end(function (err, res) {
        assert.equal(res.body.status, 400, "Response status should be 400");
        done();
      });
    });
    it("Should login user", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/login').send({
        "email": "dsaaas",
        "password": "password"
      }).end(function (err, res) {
        assert.equal(res.body.status, 400, "Response status should be 400");
        done();
      });
    });
    it("Should login user", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/login').send({
        "email": "mike@gmail.com",
        "password": ""
      }).end(function (err, res) {
        assert.equal(res.body.status, 400, "Response status should be 400");
        done();
      });
    });
  });
  describe("POST/auth/reset", function () {
    this.timeout(10000);
    it("Should reset user  password", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/reset').send({
        "email": "mike@gmail.com"
      }).end(function (err, res) {
        assert.equal(res.body.status, 200, "Response status should be 200");
        assert.hasAllKeys(res.body, ["status", "message"], "Response body should have status and data keys");
        assert.isString(res.body.message, "Data should be a string");
        done();
      });
    });
    it("Should have a 400 status", function (done) {
      _chai.default.request(_app.default).post('/api/v1/users/auth/reset').send({
        "email": "abcde@gmail.com"
      }).end(function (err, res) {
        assert.equal(res.body.status, 400, "Response status should be 400");
        assert.hasAllKeys(res.body, ["status", "error"], "Response body should have status and error");
        assert.isString(res.body.error, "Error should be string");
        done();
      });
    });
  });
  describe("GET/ Should get all users", function () {
    it("Should return an array of users", function () {
      _chai.default.request(_app.default).get('/api/v1/users').end(function (err, res) {
        assert.equal(res.body.status, 200, "Status should be 200");
        assert.isArray(res.body.data, "Data should be an array");
      });
    });
  });
  describe("GET/me Should get a specific user", function () {
    it("Should return a specific user", function () {
      _chai.default.request(_app.default).get('/api/v1/users/auth/me').set("x-access-token", token).end(function (err, res) {
        assert.isObject(res.body, "Response body should be an object");
        assert.equal(res.body.status, 200, "Status should be 200");
        assert.hasAnyDeepKeys(res.body.data, ["id", "firstName", "lastName", "email"]);
      });
    });
    it("Should return an error message for invalid token", function () {
      _chai.default.request(_app.default).get('/api/v1/users/auth/me').set("x-access-token", "abc").end(function (err, res) {
        assert.isObject(res.body, "Response body should be an object");
        assert.equal(res.body.status, 400, "Status should be 400");
        assert.isString(res.body.error, "Error message should be string");
      });
    });
  });
  describe("PATCH/me Should get a specific user", function () {
    it("Should update user's password", function () {
      _chai.default.request(_app.default).patch('/api/v1/users/auth/me').set("x-access-token", token).end(function (err, res) {
        assert.isObject(res.body, "Response body should be an object");
        assert.equal(res.body.status, 200, "Status should be 200");
        assert.isString(res.body.message, "message should be string");
      });
    });
    it("Should return an error message for invalid token", function () {
      _chai.default.request(_app.default).patch('/api/v1/users/auth/me').set("x-access-token", "abc").end(function (err, res) {
        assert.isObject(res.body, "Response body should be an object");
        assert.equal(res.body.status, 400, "Status should be 400");
        assert.isString(res.body.error, "Error message should be string");
      });
    });
  });
  describe("DELETE/:ID to delete a user", function () {
    it("Should have status of 200", function () {
      _chai.default.request(_app.default).delete('/api/v1/users/auth/' + user.id).set("x-access-token", token).end(function (err, res) {
        assert.isNotEmpty(res.body, "res.body shouldn't be empty");
        assert.equal(res.body.status, 200, "Status should be 200");
        assert.isString(res.body.message, "message property should be string");
      });
    });
    it("Should have status of 400 for invalid id", function () {
      _chai.default.request(_app.default).delete('/api/v1/users/auth/' + 0).set("x-access-token", token).end(function (err, res) {
        assert.isNotEmpty(res.body, "res.body shouldn't be empty");
        assert.equal(res.body.status, 400, "Status should be 400");
        assert.isString(res.body.error, "message property should be string");
      });
    });
  });
});