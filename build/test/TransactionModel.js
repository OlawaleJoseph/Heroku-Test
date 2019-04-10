"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _transaction = _interopRequireDefault(require("../models/transaction"));

var _uuid = _interopRequireDefault(require("uuid"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai.default.assert;
describe("Transaction Model", function () {
  describe("createTransaction() will create new transaction", function () {
    it("returns an object", function () {
      var transaction = _transaction.default.createTransaction("300000");

      assert.isObject(transaction, "Transaction should be an object");
    });
    it("The transaction Object should contain keys id, createdOn, amount", function () {
      var transaction = _transaction.default.createTransaction("300000");

      assert.hasAllKeys(transaction, ["amount", "createdOn", "id", "status"], "Transaction should have keys id, amount and createdOn");
    });
    it("It should save the transaction Object in the database", function () {
      var transaction = _transaction.default.createTransaction("300000");

      assert.include(_transaction.default.transactionsDb, transaction, "Transaction object should be saved in the database");
    });
  });
  describe("getATransaction() should get a the transaction with the given id", function () {
    it("Should return null for ", function () {
      var transaction = _transaction.default.getATransaction();

      assert.isNull(transaction, "Transaction should be null");
    });
    it("Should return null for an invalid transaction id", function () {
      var transaction = _transaction.default.getATransaction();

      assert.isNull(transaction, "Transaction should be null for an invalid id");
    });
    it("Should return an object for a validtransaction id", function () {
      var newTransaction = _transaction.default.createTransaction("30000");

      var transaction = _transaction.default.getATransaction(newTransaction.id);

      assert.isObject(transaction, "transaction should be an object");
      assert.hasAnyKeys(transaction, ["id", "amount", "createdDate", "status"], "Object should have all the specified keys");
    });
  });
  describe("GetAllTransactions() should return an array of all transactions in the database", function () {
    it("Should return an array", function () {
      _transaction.default.createTransaction('20000.89');

      var transactions = _transaction.default.getAllTransactions();

      assert.isArray(transactions, "transactions should be an array");
    });
  });
  describe("deleteTranaction(id) should delete the transaction with the given id from the database", function () {
    Array(4).fill().forEach(function (item) {
      return _transaction.default.createTransaction(20000);
    });
    it("It should delete the transaction with the specified id from the database", function () {
      var transaction = _transaction.default.createTransaction('20000.89');

      _transaction.default.deleteTransaction(transaction.id);

      var deletedTransaction = _transaction.default.getATransaction(transaction.id);

      assert.isNull(deletedTransaction, "It should be null");
    });
  });
});