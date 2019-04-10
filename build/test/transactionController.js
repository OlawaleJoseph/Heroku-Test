"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _account = _interopRequireDefault(require("../models/account"));

var _users = _interopRequireDefault(require("../models/users"));

var _transaction = _interopRequireDefault(require("../models/transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var assert = _chai.default.assert;

_chai.default.use(_chaiHttp.default);

describe("TRANSACTION CONTROLLER", function () {
  var cashierToken, customerToken, adminToken;
  var cashier, customer, admin;
  var newTransaction, account;
  beforeEach(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var client, staff, adminStaff;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client = {
              firstName: "John",
              lastName: "Doe",
              email: "mike@gmail.com",
              type: "client",
              password: "password",
              isAdmin: false
            };
            staff = {
              firstName: "Jane",
              lastName: "Doe",
              email: "jane@gmail.com",
              type: "staff",
              password: "password",
              isAdmin: false
            };
            adminStaff = {
              firstName: "Janet",
              lastName: "Doe",
              email: "janet@gmail.com",
              type: "staff",
              password: "password",
              isAdmin: true
            };
            _context.next = 5;
            return _users.default.createUser(client);

          case 5:
            customer = _context.sent;
            _context.next = 8;
            return _users.default.createUser(staff);

          case 8:
            cashier = _context.sent;
            _context.next = 11;
            return _users.default.createUser(adminStaff);

          case 11:
            admin = _context.sent;
            _context.next = 14;
            return _users.default.generateToken(cashier.email);

          case 14:
            cashierToken = _context.sent;
            _context.next = 17;
            return _users.default.generateToken(customer.email);

          case 17:
            customerToken = _context.sent;
            _context.next = 20;
            return _users.default.generateToken(admin.email);

          case 20:
            adminToken = _context.sent;
            account = _account.default.createAccount({
              amount: 500000,
              type: "current"
            }, customer.id);
            newTransaction = _transaction.default.createTransaction(300000);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  after(function () {
    _users.default.usersDb = [];
    _account.default.accountsDb = [];
    _transaction.default.transactionsDb = [];
  });
  describe("POST/ should create transaction", function () {
    it("Should create a Debit transaction and return a status of 201", function () {
      _chai.default.request(_app.default).post("/api/v1/transactions/".concat(account.accountNumber, "/debit")).set("x-access-token", cashierToken).send({
        amount: 73482.35
      }).end(function (err, res) {
        assert.isObject(res.body, "res.body should be an object");
        assert.hasAllKeys(res.body.data, ["transactionId", "type", "accountNumber", "cashier", "amount", "balance"]);
        assert.equal(res.body.status, 201, "Status should be 201");
      });
    });
    it("Should create a Credit transaction and return a status of 201", function () {
      _chai.default.request(_app.default).post("/api/v1/transactions/".concat(account.accountNumber, "/credit")).set("x-access-token", cashierToken).send({
        amount: 73482.35
      }).end(function (err, res) {
        assert.isObject(res.body, "res.body should be an object");
        assert.hasAllKeys(res.body.data, ["transactionId", "type", "accountNumber", "cashier", "amount", "balance"]);
        assert.equal(res.body.status, 201, "Status should be 201");
      });
    });
  });
  describe("GET/:id Should return a transaction with the given id", function () {
    return [it("Should return status of 200 with the transaction object", function () {
      _chai.default.request(_app.default).get("/api/v1/transactions/".concat(newTransaction.id)).set("x-access-token", adminToken).end(function (err, res) {
        assert.isObject(res.body);
        assert.equal(res.body.status, 200);
      });
    })];
  });
  describe("DELETE/:id Should delete a transaction with the given id", function () {
    return [it("Should return status of 200 ", function () {
      _chai.default.request(_app.default).delete("/api/v1/transactions/".concat(newTransaction.id)).set("x-access-token", adminToken).end(function (err, res) {
        assert.isObject(res.body);
        assert.equal(res.body.status, 200);
      });
    })];
  });
});