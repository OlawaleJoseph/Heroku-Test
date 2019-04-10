"use strict";

var _hashPassword = _interopRequireDefault(require("../helperFunctions/hashPassword"));

var _chai = _interopRequireDefault(require("chai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai.default.assert;
describe("hashPassword(password) should hash input", function () {
  it("should hash the password", function () {
    var password = "password";
    var hashedPasword = (0, _hashPassword.default)(password);
    assert.notEqual(password, hashedPasword, "Password and hashedPasssword shouldnt be equal");
  });
});