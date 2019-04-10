"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _account = _interopRequireDefault(require("../models/account"));

var _users = _interopRequireDefault(require("../models/users"));

var _ValidateAccount = require("../middleware/ValidateAccount");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();

router.get('/', _ValidateAccount.staffOnly, function (req, res) {
  var accounts = _account.default.getAllAccounts();

  return res.status(200).json({
    "status": 200,
    "data": accounts
  });
});
router.post('/', _ValidateAccount.noMultipleAccounts,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var account, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            account = _account.default.createAccount(req.body, req.user.id);

            if (account) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).send('Invalid Input'));

          case 3:
            ;
            user = _users.default.getAUser(req.user.email);
            res.status(201).json({
              "status": 201,
              "data": {
                "accountNumber": account.accountNumber,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "type": account.type,
                "openingBalance": account.balance
              }
            });

          case 6:
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
router.get('/:accountNumber', _ValidateAccount.viewMyAccount, function (req, res) {
  var account = _account.default.getAccount(req.params.accountNumber);

  if (!account) {
    return res.status(400).send('Invalid Request');
  }

  if (account.owner == req.user.id || req.user.type == "staff") {
    return res.status(200).json({
      "status": 200,
      "data": {
        "id": account.id,
        "accountNumber": account.accountNumber,
        "balance": account.balance,
        "type": account.type,
        "owner": account.owner
      }
    });
  } else {
    return res.status(403).json({
      "status": 403,
      "error": "Forbidden to view this page"
    });
  }
});
router.patch('/:accountNumber', _ValidateAccount.updateStatus, function (req, res) {
  if (req.user.isAdmin) {
    var account = _account.default.updateAccount(req.params.accountNumber, req.body.status);

    res.status(200).json({
      status: 200,
      data: {
        "accountNumber": account.accountNumber,
        "status": account.status,
        "modifiedDate": account.modifiedDate,
        "balance": account.balance,
        "type": account.type
      }
    });
  } else {
    return res.status(403).json({
      "status": 403,
      "error": "Forbidden to view this page"
    });
  }
});
router.delete('/:accountNumber', function (req, res) {
  var account = _account.default.getAccount(req.params.accountNumber);

  if (!account) {
    return res.status(203).json({
      "status": 400,
      "message": "Invalid Account"
    });
  }

  if (req.user.isAdmin) {
    var deletedAccount = _account.default.deleteAccount(account.accountNumber);

    if (deletedAccount) {
      return res.status(200).json({
        "status": 200,
        "message": "Account successfully deleted"
      });
    }
  } else {
    return res.status(403).json({
      "status": 403,
      "error": "Forbidden to view this page"
    });
  }
});
var _default = router;
exports.default = _default;