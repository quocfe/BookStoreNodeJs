"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../app/controllers/userController.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// GET ALL USER
router.get('/', _userController["default"].getAllUser);
router.get('/:id', _userController["default"].getUser);
var _default = exports["default"] = router;