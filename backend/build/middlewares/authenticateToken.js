"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var authenticateToken = exports.authenticateToken = function authenticateToken(req, res, next) {
  var token = req.headers.token;
  if (token) {
    var accessToken = token.split(' ')[1];
    _jsonwebtoken["default"].verify(accessToken, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
      if (err) return res.status(403).json('token is not valid');
      req.user = user;
      next();
    });
  } else {
    res.status(401).json('You are not authenticated');
  }
};