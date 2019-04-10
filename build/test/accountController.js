"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _account = _interopRequireDefault(require("../models/account"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var assert = _chai.default.assert;

_chai.default.use(_chaiHttp.default);

describe("Account Controller", function () {
  var token, cashierToken, adminToken;
  var user, cashier, admin;
  var account;
  beforeEach(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var client, adminStaff, staff;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _users.default.usersDb = [];
            _account.default.accountsDb = [];
            client = {
              firstName: "John",
              lastName: "Doe",
              email: "mike@gmail.com",
              type: "client",
              password: "password"
            };
            adminStaff = {
              firstName: "Janet",
              lastName: "Doe",
              email: "admin@gmail.com",
              type: "staff",
              password: "password",
              isAdmin: true
            };
            staff = {
              firstName: "Jane",
              lastName: "Doe",
              email: "cashier@gmail.com",
              type: "staff",
              password: "password",
              isAdmin: false
            };
            _context.next = 7;
            return _users.default.createUser(client);

          case 7:
            user = _context.sent;
            _context.next = 10;
            return _users.default.createUser(staff);

          case 10:
            cashier = _context.sent;
            _context.next = 13;
            return _users.default.createUser(adminStaff);

          case 13:
            admin = _context.sent;
            _context.next = 16;
            return _users.default.generateToken(user.email);

          case 16:
            token = _context.sent;
            _context.next = 19;
            return _users.default.generateToken(cashier.email);

          case 19:
            cashierToken = _context.sent;
            _context.next = 22;
            return _users.default.generateToken(admin.email);

          case 22:
            adminToken = _context.sent;
            account = _account.default.createAccount({
              amount: 50000,
              type: "current"
            }, user.id);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  after(function () {
    user = "";
    token = "";
    account = "";
  });
  describe("GET/ should return all accounts", function () {
    it("Gets all accounts and has status of 200", function () {
      _chai.default.request(_app.default).get('/api/v1/accounts').set('x-access-token', adminToken).end(function (err, res) {
        assert.equal(res.body.status, 200, "Status should be 200");
        assert.isArray(res.body.data, "Data should be an array");
      });
    });
    it("Should return status of 400", function () {
      _chai.default.request(_app.default).get('/api/v1/accounts').set('x-access-token', token).end(function (err, res) {
        assert.equal(res.body.status, 403, "Status should be 403");
      });
    });
  });
  describe("POST/accounts should create accounts",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var client2, user2, token2;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            client2 = {
              firstName: "Dean",
              lastName: "Shaw",
              email: "dean@gmail.com",
              type: "client",
              password: "abcdef"
            };
            _context2.next = 3;
            return _users.default.createUser(client2);

          case 3:
            user2 = _context2.sent;
            _context2.next = 6;
            return _users.default.generateToken(user2.email);

          case 6:
            token2 = _context2.sent;
            it("Should have a status of 200", function () {
              _chai.default.request(_app.default).post('/api/v1/accounts').set('x-access-token', token2).send({
                "amount": 20000,
                "type": "savings"
              }).end(function (err, res) {
                assert.equal(res.body.status, 201, "Status should be 201");
                assert.hasAllKeys(res.body.data, ["accountNumber", "firstName", "lastName", "email", "type", "openingBalance"], "Data should contain account details");
                assert.isNumber(res.body.data.accountNumber, "Account Number Should be a number");
              });
            });
            it("Should have a status of 400", function () {
              _chai.default.request(_app.default).post('/api/v1/accounts').set('x-access-token', token).send({
                "amount": 20000,
                "type": "savings"
              }).end(function (err, res) {
                assert.equal(res.body.status, 400, "Status should be 400");
              });
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  describe("GET/:id Should get an account with the given id", function () {
    it("Should return 200 status with the account object", function () {
      _chai.default.request(_app.default).get('/api/v1/accounts/' + account.accountNumber).set('x-access-token', token).end(function (err, res) {
        assert.equal(res.body.status, 200, "Status should be 200");
        assert.hasAllKeys(res.body.data, ["id", "owner", "accountNumber", "type", "balance"]);
      });
    });
  });
  describe("PATCH/me Should update the account status", function () {
    it("Should return 200 status and update the account", function () {
      _chai.default.request(_app.default).patch('/api/v1/accounts/' + account.accountNumber).set('x-access-token', adminToken).send({
        status: "draft"
      }).end(function (err, res) {
        assert.isObject(res.body.data);
        assert.equal(res.body.data.status, account.status);
      });
    });
    it("Should return 400 for empty status", function () {
      _chai.default.request(_app.default).patch('/api/v1/accounts/' + account.accountNumber).set('x-access-token', adminToken).send({
        status: ""
      }).end(function (err, res) {
        assert.equal(res.body.status, 400, "Status should be 400");
      });
    });
    it("Should return 400 for invalid account number", function () {
      _chai.default.request(_app.default).patch('/api/v1/accounts/7656544787').set('x-access-token', adminToken).send({
        status: ""
      }).end(function (err, res) {
        assert.equal(res.body.status, 400, "Status should be 400");
      });
    });
  });
  describe("DELETE/:accountNumber should delete account", function () {
    it("Should have a status of 200", function () {
      _chai.default.request(_app.default).delete('/api/v1/accounts/' + account.accountNumber).set('x-access-token', adminToken).end(function (err, res) {
        assert.equal(res.body.status, 200, "Status should be 200");
        assert.equal(res.body.message, "Account successfully deleted");
      });
    });
    it("Should have a status of 400", function () {
      _chai.default.request(_app.default).delete('/api/v1/accounts/' + account.accountNumber).set('x-access-token', token).end(function (err, res) {
        assert.equal(res.body.status, 403, "Status should be 400");
      });
    });
  });
});