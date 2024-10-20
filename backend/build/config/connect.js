"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mysql = _interopRequireDefault(require("mysql2"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var connection = _mysql["default"].createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  port: process.env.PORT
});
var _default = exports["default"] = connection;