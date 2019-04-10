"use strict";

var _express = _interopRequireDefault(require("express"));

<<<<<<< HEAD
=======
require("@babel/polyfill");

>>>>>>> fa2f0f65a6b8a5e38b42d1f5e74d14683e9df901
var _users = _interopRequireDefault(require("./Controllers/users"));

var _account = _interopRequireDefault(require("./Controllers/account"));

var _transaction = _interopRequireDefault(require("./Controllers/transaction"));

var _ValidateToken = _interopRequireDefault(require("./middleware/ValidateToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use('/api/v1/users', _users.default);
app.use('/api/v1/accounts', _ValidateToken.default, _account.default);
app.use('/api/v1/transactions', _ValidateToken.default, _transaction.default);
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("App is istening on Port ".concat(port));
});