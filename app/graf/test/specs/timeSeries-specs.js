/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["components/timeSeries"], function (a) {
    describe("TimeSeries", function () {
        var b, c, d = ["short", "ms"], e = {alias: "test", datapoints: [[1, 2], [null, 3], [10, 4], [8, 5]]};
        describe("when getting flot pairs", function () {
            it("with connected style, should ignore nulls", function () {
                c = new a(e), b = c.getFlotPairs("connected", d), expect(b.length).to.be(3)
            }), it("with null as zero style, should replace nulls with zero", function () {
                c = new a(e), b = c.getFlotPairs("null as zero", d), expect(b.length).to.be(4), expect(b[1][1]).to.be(0)
            }), it("if last is null current should pick next to last", function () {
                c = new a({datapoints: [[10, 1], [null, 2]]}), c.getFlotPairs("null", d), expect(c.stats.current).to.be(10)
            }), it("max value should work for negative values", function () {
                c = new a({datapoints: [[-10, 1], [-4, 2]]}), c.getFlotPairs("null", d), expect(c.stats.max).to.be(-4)
            })
        }), describe("series overrides", function () {
            var b;
            beforeEach(function () {
                b = new a(e)
            }), describe("fill & points", function () {
                beforeEach(function () {
                    b.alias = "test", b.applySeriesOverrides([{alias: "test", fill: 0, points: !0}])
                }), it("should set fill zero, and enable points", function () {
                    expect(b.lines.fill).to.be(.001), expect(b.points.show).to.be(!0)
                })
            }), describe("series option overrides, bars, true & lines false", function () {
                beforeEach(function () {
                    b.alias = "test", b.applySeriesOverrides([{alias: "test", bars: !0, lines: !1}])
                }), it("should disable lines, and enable bars", function () {
                    expect(b.lines.show).to.be(!1), expect(b.bars.show).to.be(!0)
                })
            }), describe("series option overrides, linewidth, stack", function () {
                beforeEach(function () {
                    b.alias = "test", b.applySeriesOverrides([{alias: "test", linewidth: 5, stack: !1}])
                }), it("should disable stack, and set lineWidth", function () {
                    expect(b.stack).to.be(!1), expect(b.lines.lineWidth).to.be(5)
                })
            }), describe("series option overrides, fill below to", function () {
                beforeEach(function () {
                    b.alias = "test", b.applySeriesOverrides([{alias: "test", fillBelowTo: "min"}])
                }), it("should disable line fill and add fillBelowTo", function () {
                    expect(b.fillBelowTo).to.be("min")
                })
            }), describe("series option overrides, pointradius, steppedLine", function () {
                beforeEach(function () {
                    b.alias = "test", b.applySeriesOverrides([{alias: "test", pointradius: 5, steppedLine: !0}])
                }), it("should set pointradius, and set steppedLine", function () {
                    expect(b.points.radius).to.be(5), expect(b.lines.steps).to.be(!0)
                })
            }), describe("override match on regex", function () {
                beforeEach(function () {
                    b.alias = "test_01", b.applySeriesOverrides([{alias: "/.*01/", lines: !1}])
                }), it("should match second series", function () {
                    expect(b.lines.show).to.be(!1)
                })
            }), describe("override series y-axis, and z-index", function () {
                beforeEach(function () {
                    b.alias = "test", b.applySeriesOverrides([{alias: "test", yaxis: 2, zindex: 2}])
                }), it("should set yaxis", function () {
                    expect(b.yaxis).to.be(2)
                }), it("should set zindex", function () {
                    expect(b.zindex).to.be(2)
                })
            })
        })
    })
});