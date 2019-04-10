"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var validateCashier = function validateCashier(req, res, next) {
  if (req.user.type == 'staff' && !req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({
      "status": 403,
      "error": "You are Forbidden to view this page"
    });
  }
};

var _default = validateCashier;
exports.default = _default;