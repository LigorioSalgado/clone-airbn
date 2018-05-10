'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routers = require('./routers');

var _routers2 = _interopRequireDefault(_routers);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 8000;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

app.use('/api/v1', _routers2.default);

app.get('/', function (req, res) {
    res.send("Hola mundo");
});

app.listen(port, function () {
    //db.sequelize.sync();
    console.log('Server start at port ' + port);
});

exports.default = app;