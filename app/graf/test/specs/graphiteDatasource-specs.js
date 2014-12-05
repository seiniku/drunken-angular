/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["./helpers", "services/graphite/graphiteDatasource"], function (a) {
    describe("graphiteDatasource", function () {
        var b = new a.ServiceTestContext;
        beforeEach(module("grafana.services")), beforeEach(b.providePhase()), beforeEach(b.createService("GraphiteDatasource")), beforeEach(function () {
            b.ds = new b.service({url: [""]})
        }), describe("When querying influxdb with one target using query editor target spec", function () {
            var a, c, d = {
                range: {from: "now-1h", to: "now"},
                targets: [{target: "prod1.count"}, {target: "prod2.count"}],
                maxDataPoints: 500
            }, e = [{target: "prod1.count", datapoints: [[10, 1], [12, 1]]}];
            beforeEach(function () {
                b.$httpBackend.expectPOST("/render", function (a) {
                    return c = a, !0
                }).respond(e), b.ds.query(d).then(function (b) {
                    a = b
                }), b.$httpBackend.flush()
            }), it("should generate the correct query", function () {
                b.$httpBackend.verifyNoOutstandingExpectation()
            }), it("should query correctly", function () {
                var a = c.split("&");
                expect(a).to.contain("target=prod1.count"), expect(a).to.contain("target=prod2.count"), expect(a).to.contain("from=-1h"), expect(a).to.contain("until=now")
            }), it("should exclude undefined params", function () {
                var a = c.split("&");
                expect(a).to.not.contain("cacheTimeout=undefined")
            }), it("should return series list", function () {
                expect(a.data.length).to.be(1), expect(a.data[0].target).to.be("prod1.count")
            })
        }), describe("building graphite params", function () {
            it("should uri escape targets", function () {
                var a = b.ds.buildGraphiteParams({targets: [{target: "prod1.{test,test2}"}, {target: "prod2.count"}]});
                expect(a).to.contain("target=prod1.%7Btest%2Ctest2%7D")
            }), it("should replace target placeholder", function () {
                var a = b.ds.buildGraphiteParams({targets: [{target: "series1"}, {target: "series2"}, {target: "asPercent(#A,#B)"}]});
                expect(a[2]).to.be("target=asPercent(series1%2Cseries2)")
            }), it("should fix wrong minute interval parameters", function () {
                var a = b.ds.buildGraphiteParams({targets: [{target: "summarize(prod.25m.count, '25m', 'sum')"}]});
                expect(a[0]).to.be("target=" + encodeURIComponent("summarize(prod.25m.count, '25min', 'sum')"))
            }), it("should fix wrong month interval parameters", function () {
                var a = b.ds.buildGraphiteParams({targets: [{target: "summarize(prod.5M.count, '5M', 'sum')"}]});
                expect(a[0]).to.be("target=" + encodeURIComponent("summarize(prod.5M.count, '5mon', 'sum')"))
            }), it("should ignore empty targets", function () {
                var a = b.ds.buildGraphiteParams({targets: [{target: "series1"}, {target: ""}]});
                expect(a.length).to.be(2)
            })
        })
    })
});