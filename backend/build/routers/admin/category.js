"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _categoryController = _interopRequireDefault(require("../../app/controllers/categoryController.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.put('/update/:id', _categoryController["default"].update);
router.get('/edit/:id', _categoryController["default"].edit);
router["delete"]('/:id', _categoryController["default"]["delete"]);
router.post('/add', _categoryController["default"].add);
router.get('/', _categoryController["default"].index);
var _default = exports["default"] = router;