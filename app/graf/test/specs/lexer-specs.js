/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["services/graphite/lexer"], function (a) {
    describe("when lexing graphite expression", function () {
        it("should tokenize metric expression", function () {
            var b = new a("metric.test.*.asd.count"), c = b.tokenize();
            expect(c[0].value).to.be("metric"), expect(c[1].value).to.be("."), expect(c[2].type).to.be("identifier"), expect(c[4].type).to.be("identifier"), expect(c[4].pos).to.be(13)
        }), it("should tokenize metric expression with dash", function () {
            var b = new a("metric.test.se1-server-*.asd.count"), c = b.tokenize();
            expect(c[4].type).to.be("identifier"), expect(c[4].value).to.be("se1-server-*")
        }), it("should tokenize metric expression with dash2", function () {
            var b = new a("net.192-168-1-1.192-168-1-9.ping_value.*"), c = b.tokenize();
            expect(c[0].value).to.be("net"), expect(c[2].value).to.be("192-168-1-1")
        }), it("should tokenize metric expression with equal sign", function () {
            var b = new a("apps=test"), c = b.tokenize();
            expect(c[0].value).to.be("apps=test")
        }), it("simple function2", function () {
            var b = new a("offset(test.metric, -100)"), c = b.tokenize();
            expect(c[2].type).to.be("identifier"), expect(c[4].type).to.be("identifier"), expect(c[6].type).to.be("number")
        }), it("should tokenize metric expression with curly braces", function () {
            var b = new a("metric.se1-{first, second}.count"), c = b.tokenize();
            expect(c.length).to.be(10), expect(c[3].type).to.be("{"), expect(c[4].value).to.be("first"), expect(c[5].value).to.be(","), expect(c[6].value).to.be("second")
        }), it("should tokenize metric expression with number segments", function () {
            var b = new a("metric.10.12_10.test"), c = b.tokenize();
            expect(c[0].type).to.be("identifier"), expect(c[2].type).to.be("identifier"), expect(c[2].value).to.be("10"), expect(c[4].value).to.be("12_10"), expect(c[4].type).to.be("identifier")
        }), it("should tokenize func call with numbered metric and number arg", function () {
            var b = new a("scale(metric.10, 15)"), c = b.tokenize();
            expect(c[0].type).to.be("identifier"), expect(c[2].type).to.be("identifier"), expect(c[2].value).to.be("metric"), expect(c[4].value).to.be("10"), expect(c[4].type).to.be("number"), expect(c[6].type).to.be("number")
        }), it("should tokenize metric with template parameter", function () {
            var b = new a("metric.[[server]].test"), c = b.tokenize();
            expect(c[2].type).to.be("identifier"), expect(c[2].value).to.be("[[server]]"), expect(c[4].type).to.be("identifier")
        }), it("should tokenize metric with question mark", function () {
            var b = new a("metric.server_??.test"), c = b.tokenize();
            expect(c[2].type).to.be("identifier"), expect(c[2].value).to.be("server_??"), expect(c[4].type).to.be("identifier")
        }), it("should handle error with unterminated string", function () {
            var b = new a("alias(metric, 'asd)"), c = b.tokenize();
            expect(c[0].value).to.be("alias"), expect(c[1].value).to.be("("), expect(c[2].value).to.be("metric"), expect(c[3].value).to.be(","), expect(c[4].type).to.be("string"), expect(c[4].isUnclosed).to.be(!0), expect(c[4].pos).to.be(20)
        }), it("should handle float parameters", function () {
            var b = new a("alias(metric, 0.002)"), c = b.tokenize();
            expect(c[4].type).to.be("number"), expect(c[4].value).to.be("0.002")
        })
    })
});