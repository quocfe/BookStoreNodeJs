"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _commentsController = _interopRequireDefault(require("./../app/controllers/commentsController.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.put('/update/:id', _commentsController["default"].update);
router.get('/product/:id', _commentsController["default"].selectByIdProduct);
router.get('/edit/:id', _commentsController["default"].edit);
router["delete"]('/:id', _commentsController["default"]["delete"]);
router.post('/add', _commentsController["default"].add);
router.get('/', _commentsController["default"].getAll);
var _default = exports["default"] = router;