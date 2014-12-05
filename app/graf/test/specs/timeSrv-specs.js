/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["mocks/dashboard-mock", "./helpers", "lodash", "services/timeSrv"], function (a, b, c) {
    describe("timeSrv", function () {
        var d, e = new b.ServiceTestContext;
        beforeEach(module("grafana.services")), beforeEach(e.providePhase(["$routeParams"])), beforeEach(e.createService("timeSrv")), beforeEach(function () {
            d = a.create(), e.service.init(d)
        }), describe("timeRange", function () {
            it("should return unparsed when parse is false", function () {
                e.service.setTime({from: "now", to: "now-1h"});
                var a = e.service.timeRange(!1);
                expect(a.from).to.be("now"), expect(a.to).to.be("now-1h")
            }), it("should return parsed when parse is true", function () {
                e.service.setTime({from: "now", to: "now-1h"});
                var a = e.service.timeRange(!0);
                expect(c.isDate(a.from)).to.be(!0), expect(c.isDate(a.to)).to.be(!0)
            })
        }), describe("init time from url", function () {
            it("should handle relative times", function () {
                e.$routeParams.from = "now-2d", e.$routeParams.to = "now", e.service.init(d);
                var a = e.service.timeRange(!1);
                expect(a.from).to.be("now-2d"), expect(a.to).to.be("now")
            }), it("should handle formated dates", function () {
                e.$routeParams.from = "20140410T052010", e.$routeParams.to = "20140520T031022", e.service.init(d);
                var a = e.service.timeRange(!0);
                expect(a.from.getTime()).to.equal(new Date("2014-04-10T05:20:10Z").getTime()), expect(a.to.getTime()).to.equal(new Date("2014-05-20T03:10:22Z").getTime())
            }), it("should handle formated dates without time", function () {
                e.$routeParams.from = "20140410", e.$routeParams.to = "20140520", e.service.init(d);
                var a = e.service.timeRange(!0);
                expect(a.from.getTime()).to.equal(new Date("2014-04-10T00:00:00Z").getTime()), expect(a.to.getTime()).to.equal(new Date("2014-05-20T00:00:00Z").getTime())
            }), it("should handle epochs", function () {
                e.$routeParams.from = "1410337646373", e.$routeParams.to = "1410337665699", e.service.init(d);
                var a = e.service.timeRange(!0);
                expect(a.from.getTime()).to.equal(1410337646373), expect(a.to.getTime()).to.equal(1410337665699)
            })
        }), describe("setTime", function () {
            it("should return disable refresh for absolute times", function () {
                d.refresh = !1, e.service.setTime({from: "2011-01-01", to: "2015-01-01"}), expect(d.refresh).to.be(!1)
            }), it("should restore refresh after relative time range is set", function () {
                d.refresh = "10s", e.service.setTime({
                    from: "2011-01-01",
                    to: "2015-01-01"
                }), expect(d.refresh).to.be(!1), e.service.setTime({
                    from: "2011-01-01",
                    to: "now"
                }), expect(d.refresh).to.be("10s")
            })
        })
    })
});