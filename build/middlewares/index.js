"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticationMiddleware = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticationMiddleware = function authenticationMiddleware(req, res, next) {
    try {
        var token = req.get("Authorization");
        //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxzYWxnYWRvZjEyMzJAZ21haWwuY29tIiwibmFtZSI6IkxpZ29yaW8gRWR3aW4gU2FsZ2FkbyBGbG9yZXMiLCJleHAiOjE1MjQxMDI4ODIsImlhdCI6MTUyNDAxNjQ4Mn0.IzYiTA78Qr-c6USFF7YOa_A4MHe68wKuwprW9yLcQm4
        var p_token = token.split(" ")[1];

        _jsonwebtoken2.default.verify(p_token, "gjasjdkeoSiruwedxnjaUlsnxjascbgvb", function (err, decoded) {
            if (err) {
                res.status(401).json(err);
            } else {
                req.user = decoded;
                next();
            }
        });
    } catch (error) {
        res.json({ message: "No hay token" }).status(400);
    }
};

exports.authenticationMiddleware = authenticationMiddleware;