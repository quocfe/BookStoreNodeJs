"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateAdminToken = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var authenticateAdminToken = exports.authenticateAdminToken = function authenticateAdminToken(req, res, next) {
  var token = req.headers.token;
  console.log('token', token);
  if (token) {
    var accessToken = token.split(' ')[1];
    _jsonwebtoken["default"].verify(accessToken, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
      if (err) return res.status(403).json('token is not valid');
      console.log('req.user', user);
      if (user.isAdmin == 'true') {
        next();
      }
    });
  } else {
    res.status(401).json('You are not admin');
  }
};