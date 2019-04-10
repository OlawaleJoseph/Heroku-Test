"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStatus = exports.viewMyAccount = exports.staffOnly = exports.noMultipleAccounts = void 0;

var _account = _interopRequireDefault(require("../models/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noMultipleAccounts = function noMultipleAccounts(req, res, next) {
  var ownsAccount = _account.default.accountsDb.find(function (acc) {
    return acc.owner == req.user.id;
  });

  if (ownsAccount) {
    return res.status(400).json({
      "status": 400,
      "error": "User already has an account"
    });
  } else {
    next();
  }

  ;
};

exports.noMultipleAccounts = noMultipleAccounts;

var staffOnly = function staffOnly(req, res, next) {
  if (req.user.type.toLowerCase() == "staff") {
    next();
  } else {
    return res.status(403).json({
      "status": 403,
      "error": "Forbidden to see this page"
    });
  }

  ;
};

exports.staffOnly = staffOnly;

var viewMyAccount = function viewMyAccount(req, res, next) {
  if (req.user.type.toLowerCase() == "staff") {
    next();
  } else {
    var myAccount = _account.default.accountsDb.find(function (acc) {
      return acc.owner == req.user.id;
    });

    if (!myAccount) {
      return res.status(401).json({
        "status": 401,
        "error": "You are not authorized to view this page"
      });
    }

    ;

    if (myAccount.accountNumber != req.params.accountNumber) {
      return res.status(401).json({
        "status": 401,
        "errror": "You are not authorized to view this page2"
      });
    } else {
      next();
    }

    ;
  }

  ;
};

exports.viewMyAccount = viewMyAccount;

var updateStatus = function updateStatus(req, res, next) {
  if (!req.body.status) {
    return res.status(400).json({
      "status": 400,
      "error": "Bad Request"
    });
  }

  ;

  var account = _account.default.accountsDb.find(function (acc) {
    return acc.accountNumber == req.params.accountNumber;
  });

  if (!account) {
    return res.status(400).json({
      "status": 400,
      "error": "Bad Request. Invalid account number"
    });
  }

  ;
  next();
};

exports.updateStatus = updateStatus;