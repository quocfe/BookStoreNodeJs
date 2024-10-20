"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _authenticateToken = require("./../middlewares/authenticateToken.js");
var _books = _interopRequireDefault(require("./admin/books.js"));
var _category = _interopRequireDefault(require("./admin/category.js"));
var _review = _interopRequireDefault(require("./admin/review.js"));
var _auth = _interopRequireDefault(require("./auth.js"));
var _books2 = _interopRequireDefault(require("./books.js"));
var _category2 = _interopRequireDefault(require("./category.js"));
var _review2 = _interopRequireDefault(require("./review.js"));
var _user = _interopRequireDefault(require("./user.js"));
var _comments = _interopRequireDefault(require("./comments.js"));
var _authenticateAdminToken = require("../middlewares/authenticateAdminToken.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function routes(app) {
  // admin routes
  app.use('/v1/api/admin/book', _authenticateAdminToken.authenticateAdminToken, _books["default"]);
  app.use('/v1/api/admin/category', _authenticateAdminToken.authenticateAdminToken, _category["default"]);
  app.use('/v1/api/admin/review', _authenticateAdminToken.authenticateAdminToken, _review["default"]);

  // client routes
  app.use('/v1/api/auth', _auth["default"]);
  app.use('/v1/api/user', _user["default"]);
  app.use('/v1/api/comment', _authenticateToken.authenticateToken, _comments["default"]);
  app.use('/v1/api/review', _authenticateToken.authenticateToken, _review2["default"]);
  app.use('/v1/api/category', _authenticateToken.authenticateToken, _category2["default"]);
  app.use('/v1/api/book', _authenticateToken.authenticateToken, _books2["default"]);
}
var _default = exports["default"] = routes;