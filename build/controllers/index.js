"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});


var testApi = function testApi(req, res) {
    res.json({ test: "Hola mundo" });
};

exports.testApi = testApi;