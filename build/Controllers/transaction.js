"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _transaction = _interopRequireDefault(require("../models/transaction"));

var _account = _interopRequireDefault(require("../models/account"));

var _validateCashier = _interopRequireDefault(require("../middleware/validateCashier"));

var _users = _interopRequireDefault(require("../models/users"));

var _sendEmail = _interopRequireDefault(require("../helperFunctions/sendEmail"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

var router = _express.default.Router();

router.get('/', function (req, res) {
  if (req.user.type.toLowerCase() == "staff") {
    var transactions = _transaction.default.getAllTransactions();

    return res.status(200).json({
      "status": 200,
      "data": transactions
    });
  } else {
    return res.status(403).json({
      "status": 403,
      "error": "Forbidden to view this page"
    });
  }
});
router.post('/:accountNumber/debit', _validateCashier.default,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _data;

    var transaction, account, accountOwner, accountEmail, message, mail;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transaction = _transaction.default.createTransaction(req.body.amount);

            if (transaction) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).send('Invalid Input'));

          case 3:
            ;
            transaction.accountNumber = req.params.accountNumber;
            transaction.type = "Debit";
            account = _account.default.getAccount(transaction.accountNumber);
            transaction.oldBalance = parseFloat(account.balance);
            transaction.newBalance = transaction.oldBalance - parseFloat(transaction.amount);
            account.balance = transaction.newBalance;
            accountOwner = _users.default.usersDb.find(function (user) {
              return user.id == account.owner;
            });
            accountEmail = accountOwner.email;
            message = "\n    Account Number: ".concat(transaction.accountNumber, "\n    Debit\n    Amount: ").concat(transaction.amount, "\n    Balance: ").concat(account.balance, "\n    ");
            _context.next = 15;
            return (0, _sendEmail.default)(accountEmail, "TRANSACTION NOTIFICATION", message);

          case 15:
            mail = _context.sent;

            if (mail) {
              console.log(mail);
            }

            return _context.abrupt("return", res.status(201).json({
              "status": 201,
              "data": (_data = {
                "transactionId": transaction.id,
                "type": transaction.type,
                "accountNumber": Number(transaction.accountNumber),
                "cashier": req.user.id
              }, _defineProperty(_data, "type", "Debit"), _defineProperty(_data, "amount", req.body.amount), _defineProperty(_data, "balance", transaction.newBalance), _data)
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/:accountNumber/credit', _validateCashier.default,
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var transaction, account, accountOwner, accountEmail, message, mail;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            transaction = _transaction.default.createTransaction(req.body.amount);

            if (transaction) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).send('Invalid Input'));

          case 3:
            ;
            transaction.accountNumber = req.params.accountNumber;
            transaction.type = "Credit";
            account = _account.default.getAccount(transaction.accountNumber);
            transaction.oldBalance = parseFloat(account.balance);
            transaction.newBalance = transaction.oldBalance + parseFloat(transaction.amount);
            account.balance = transaction.newBalance;
            accountOwner = _users.default.usersDb.find(function (user) {
              return user.id == account.id;
            });
            accountEmail = accountOwner.email;
            message = "\n    Account Number: ".concat(transaction.accountNumber, "\n    Credit\n    Amount: ").concat(transaction.amount, "\n    Balance: ").concat(account.balance, "\n    ");
            _context2.next = 15;
            return (0, _sendEmail.default)(accountEmail, "TRANSACTION NOTIFICATION", message);

          case 15:
            mail = _context2.sent;

            if (mail) {
              console.log(mail);
            }

            return _context2.abrupt("return", res.status(201).json({
              "status": 201,
              "data": {
                "transactionId": transaction.id,
                "type": transaction.type,
                "accountNumber": transaction.accountNumber,
                "cashier": req.user.id,
                "amount": req.body.amount,
                "balance": transaction.newBalance
              }
            }));

          case 18:
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
router.get('/:id', function (req, res) {
  var transaction = _transaction.default.getATransaction(req.params.id);

  if (!transaction) {
    return res.status(400).json({
      "status": 400,
      "error": "Invalid  Request"
    });
  }

  if (req.user.type == "staff") {
    return res.json({
      "status": 200,
      "data": {
        "id": transaction.id,
        "amount": transaction.amount,
        "type": transaction.type,
        "accountNumber": transaction.accountNumber,
        "newBalance": transaction.newBalance,
        "date": transaction.createdOn
      }
    });
  } else {
    var account = _account.default.getAccount(transaction.accountNumber);

    if (req.user.id == account.owner) {
      res.json({
        "status": 200,
        "data": transaction
      });
    } else {
      res.status(403).json({
        "status": 403,
        "error": "Forbidden to view this page"
      });
    }
  }
});
router.delete('/:id', function (req, res) {
  if (req.user.isAdmin) {
    _transaction.default.deleteTransaction(req.params.id);

    return res.status(200).json({
      "status": 200,
      "message": "Transaction successfully deleted"
    });
  }

  return res.status(403).json({
    "status": 403,
    "error": "Not allowed"
  });
});
var _default = router;
exports.default = _default;