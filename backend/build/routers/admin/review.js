"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _reviewController = _interopRequireDefault(require("../../app/controllers/reviewController.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// selectByBook
router.get('/selectByProduct/:id', _reviewController["default"].selectReviewWithProduct);
// Update book
router.put('/update/:id', _reviewController["default"].update);
// EIDT
router.get('/edit/:id', _reviewController["default"].edit);
// [DELETE]
router["delete"]('/:id', _reviewController["default"]["delete"]);
// [POST]
router.post('/add', _reviewController["default"].add);
// [GET]
router.get('/', _reviewController["default"].index);
var _default = exports["default"] = router;