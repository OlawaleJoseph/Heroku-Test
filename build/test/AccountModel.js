"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _account = _interopRequireDefault(require("../models/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai.default.assert;
describe("Account Model", function () {
  describe("createAccount(data) should create new account", function () {
    it("Should return an object", function () {
      var newAccountInfo = {
        "type": "savings",
        "amount": 5000.37
      };

      var newAccount = _account.default.createAccount(newAccountInfo);

      assert.isObject(newAccount, "newAccount is an object");
    });
    it("New account should have accountNumber", function () {
      var newAccountInfo = {
        "type": "savings",
        "amount": 5000.37
      };

      var newAccount = _account.default.createAccount(newAccountInfo);

      assert.call(_account.default.createAccount, _account.default.generateAccountNumber, "It should call generateAccountNumber to generate account number for new account");
      assert.hasAnyKeys(newAccount, ["accountNumber"], "new account should have account number");
    });
    it("Should be saved in the database", function () {
      var newAccountInfo = {
        "type": "savings",
        "amount": 5000.37
      };

      var newAccount = _account.default.createAccount(newAccountInfo);

      var searchedAccount = _account.default.accountsDb.find(function (account) {
        return account.accountNumber == newAccount.accountNumber;
      });

      assert.isNotNull(searchedAccount, "Account created should be in the database");
      assert.isObject(searchedAccount, "Account should be an Object");
    });
  });
  describe("getAccount() should return account with the specified account number", function () {
    it("should return null if no account number is given", function () {
      var account = _account.default.getAccount();

      assert.isNull(account, "account should be null for empty account number");
    });
    it("should return null if invalid account number is given", function () {
      var account = _account.default.getAccount(0);

      assert.isNull(account, "account should be null for invalid account number");
    });
    it("Should return account object for a valid account number", function () {
      var newAccountInfo = {
        "type": "current",
        "amount": 5000.37
      };

      var newAccount = _account.default.createAccount(newAccountInfo);

      var id = newAccount.accountNumber;

      var searchedAccount = _account.default.getAccount(id);

      assert.isObject(searchedAccount, "Should be an object");
      assert.hasAnyKeys(searchedAccount, ["accountNumber", "id"], "it should have account number as property");
      assert.equal(searchedAccount.accountNumber, newAccount.accountNumber, "It should return the account with the same account number that is requested");
    });
  });
  describe("getAllAccounts() It should get all accounts in database", function () {
    it("Should return an Array of account objects", function () {
      var accounts = _account.default.getAllAccounts();

      assert.isArray(accounts, "Accounts should be an array");
    });
  });
  describe("updateAccount() It should update the account's status property", function () {
    it("Return null if no account number is given", function () {
      var emptyId = _account.default.updateAccount("", "dormant");

      var invalidID = _account.default.updateAccount(0, "dormant");

      assert.isNull(emptyId);
      assert.isNull(invalidID);
    });
    it("should update the status of the specified account", function () {
      var Info = {
        "type": "current",
        "amount": 5000.37
      };

      var account = _account.default.createAccount(Info);

      var oldStatus = account.status;

      var updatedAccount = _account.default.updateAccount(account.accountNumber, "dormant");

      var newStatus = updatedAccount.status;
      assert.notEqual(oldStatus, newStatus, "The status should be different");
    });
    it("returns the updated account object", function () {
      var info = {
        "type": "current",
        "amount": 5000.37
      };

      var account = _account.default.createAccount(info);

      var updatedAccount = _account.default.updateAccount(account.accountNumber, "dormant");

      assert.isObject(updatedAccount, "updated account should be an object");
    });
  });
  describe("deleteAccount(number) should delete an account with the account number", function () {
    it("should return null for an invalid or no account number", function () {
      var emptyId = _account.default.deleteAccount("", "dormant");

      var invalidID = _account.default.deleteAccount(0, "dormant");

      assert.isNull(emptyId, "No account number should return null");
      assert.isNull(invalidID, "Invalid account number should return null");
    });
    it("It deletes an account with the given account number", function () {
      var info = {
        "type": "current",
        "amount": 5000.37
      };

      var account = _account.default.createAccount(info);

      _account.default.deleteAccount(account.accountNumber);

      var deletedUser = _account.default.getAccount(account.accountNumber);

      assert.isNull(deletedUser);
    });
  });
  describe("generateAccountNumber() will generate account numbers when invoked", function () {
    it("should return a ten digit Integer", function () {
      var accountNumber = _account.default.generateAccountNumber();

      assert.isNumber(accountNumber, "Account number should be an Integer");
      assert.lengthOf(accountNumber.toString(), 10, "Account number should be 10 digits long");
    });
  });
});