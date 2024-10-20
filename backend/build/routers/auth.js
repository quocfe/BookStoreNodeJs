"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = _interopRequireDefault(require("../app/controllers/authController.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post('/login', _authController["default"].login);
router.post('/register', _authController["default"].register);
router.post('/refreshToken', _authController["default"].requestRefreshToken);
router["delete"]('/logout', _authController["default"].logOut);
var _default = exports["default"] = router;