"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _expressHandlebars = require("express-handlebars");
var _morgan = _interopRequireDefault(require("morgan"));
var _path = _interopRequireWildcard(require("path"));
var _url = require("url");
var _connect = _interopRequireDefault(require("./config/connect.js"));
var _index = _interopRequireDefault(require("./routers/index.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
var _dirname = (0, _path.dirname)((0, _url.fileURLToPath)(import.meta.url));

// static file
app.use(_express["default"]["static"](_path["default"].join(_dirname, 'public')));
//

app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].json());
app.use((0, _morgan["default"])('dev'));

// template engine
app.engine('hbs', (0, _expressHandlebars.engine)({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', _path["default"].join(_dirname, 'resources/views'));

// routes
(0, _index["default"])(app);
//

// const file = fs.readFileSync('./swagger.yaml', 'utf8');
// const file = fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8');
// const swaggerDocument = YAML.parse(file);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(8080, function () {
  console.log('Nodejs app is running on the port 8080');
  _connect["default"].connect(function (err) {
    if (err) {
      console.log('Database disconnect', err);
    } else {
      console.log('Database connected');
      var seedQuery = "\n    INSERT INTO users (username, email, password) VALUES\n    ('john_doe', 'john@example.com', 'hashed_password_1'),\n    ('jane_doe', 'jane@example.com', 'hashed_password_2');\n  ";
      _connect["default"].query(seedQuery, function (err, results) {
        if (err) {
          console.error('Error executing seed query:', err);
        } else {
          console.log('Seed data inserted successfully:', results);
        }

        // Đóng kết nối sau khi hoàn thành
        _connect["default"].end();
      });
    }
  });
});