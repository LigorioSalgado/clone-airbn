'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';

var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

before(function (done) {
    //Before each test we empty the database
    _models.User.sync({ force: true }) // drops table and re-creates it
    .then(function () {
        done(null);
    }).catch(function (error) {
        done(error);
    });
});

describe('/GET view estates', function () {

    it('Deberia traer todos las propiedades', function (done) {

        _chai2.default.request(_server2.default).get('/api/v1/estates/view').end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2);
            done();
        });
    });
});

describe('/POST user', function () {
    it('debe crear un nuevo usuario', function (done) {
        var user = {

            first_name: "Edwin",
            lastname: "salgado",
            email: "edwinfdg111@gmail.com",
            password: "edwin2018",
            phone_number: "55101722112"
        };
        _chai2.default.request(_server2.default).post('/api/v1/users/signup').send(user).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            done();
        });
    });
});