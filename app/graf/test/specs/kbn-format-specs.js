/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["kbn"], function (a) {
    function b(b, c, d, e, f) {
        describe("value format: " + b, function () {
            it("should translate " + c + " as " + f, function () {
                var g = e - Math.floor(Math.log(d) / Math.LN10), h = a.valueFormats[b](c, e, g);
                expect(h).to.be(f)
            })
        })
    }

    b("ms", .0024, 5e-4, 4, "0.0024 ms"), b("ms", 100, 1, 0, "100 ms"), b("ms", 1250, 10, 0, "1.25 s"), b("ms", 1250, 300, 0, "1.3 s"), b("ms", 65150, 1e4, 0, "1.1 min"), b("ms", 6515e3, 15e5, 0, "1.8 hour"), b("ms", 6515e5, 15e7, 0, "8 day"), b("none", 2.75e-10, 0, 10, "3e-10"), b("none", 0, 0, 2, "0"), b("ns", 25, 1, 0, "25 ns"), b("ns", 2558, 50, 0, "2.56 µs"), describe("calculateInterval", function () {
        it("1h 100 resultion", function () {
            var b = {from: a.parseDate("now-1h"), to: a.parseDate("now")}, c = a.calculateInterval(b, 100, null);
            expect(c).to.be("30s")
        }), it("10m 1600 resolution", function () {
            var b = {from: a.parseDate("now-10m"), to: a.parseDate("now")}, c = a.calculateInterval(b, 1600, null);
            expect(c).to.be("0.1s")
        }), it("fixed user interval", function () {
            var b = {from: a.parseDate("now-10m"), to: a.parseDate("now")}, c = a.calculateInterval(b, 1600, "10s");
            expect(c).to.be("10s")
        }), it("short time range and user low limit", function () {
            var b = {from: a.parseDate("now-10m"), to: a.parseDate("now")}, c = a.calculateInterval(b, 1600, ">10s");
            expect(c).to.be("10s")
        }), it("large time range and user low limit", function () {
            var b = {from: a.parseDate("now-14d"), to: a.parseDate("now")}, c = a.calculateInterval(b, 1e3, ">10s");
            expect(c).to.be("30m")
        })
    })
});