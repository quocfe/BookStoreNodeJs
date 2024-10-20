"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bookController = _interopRequireDefault(require("../../app/controllers/bookController.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// Get isbn
router.get('/isbnExists', _bookController["default"].isbnExists);
// Update book
router.put('/update/:id', _bookController["default"].update);
// Edit
router.get('/edit/:id', _bookController["default"].edit);
// Delete book
router["delete"]('/:id', _bookController["default"]["delete"]);
// Add book
router.post('/add', _bookController["default"].add);
// get one
router.get('/:id', _bookController["default"].selectOne);
// show list book
router.get('/', _bookController["default"].index);
var _default = exports["default"] = router;