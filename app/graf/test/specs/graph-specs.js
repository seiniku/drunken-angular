/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["./helpers", "angular", "jquery", "components/timeSeries", "panels/graph/graph"], function (a, b, c, d) {
    describe("grafanaGraph", function () {
        function e(e, f) {
            describe(e, function () {
                var e = {};
                e.setup = function (f) {
                    beforeEach(module(function (b) {
                        b.value("timeSrv", new a.TimeSrvStub)
                    })), beforeEach(inject(function (a, g) {
                        var h = a.$new(), i = b.element("<div style='width:500px' grafana-graph><div>");
                        h.height = "200px", h.panel = {
                            legend: {},
                            grid: {},
                            y_formats: [],
                            seriesOverrides: [],
                            tooltip: {shared: !0}
                        }, h.appEvent = sinon.spy(), h.onAppEvent = sinon.spy(), h.hiddenSeries = {}, h.dashboard = {timezone: "browser"}, h.range = {
                            from: new Date("2014-08-09 10:00:00"),
                            to: new Date("2014-09-09 13:00:00")
                        }, e.data = [], e.data.push(new d({
                            datapoints: [[1, 1], [2, 2]],
                            alias: "series1"
                        })), e.data.push(new d({
                            datapoints: [[1, 1], [2, 2]],
                            alias: "series2"
                        })), f(h, e.data), g(i)(h), h.$digest(), c.plot = e.plotSpy = sinon.spy(), h.$emit("render", e.data), e.plotData = e.plotSpy.getCall(0).args[1], e.plotOptions = e.plotSpy.getCall(0).args[2]
                    }))
                }, f(e)
            })
        }

        beforeEach(module("grafana.directives")), e("simple lines options", function (a) {
            a.setup(function (a) {
                a.panel.lines = !0, a.panel.fill = 5, a.panel.linewidth = 3, a.panel.steppedLine = !0
            }), it("should configure plot with correct options", function () {
                expect(a.plotOptions.series.lines.show).to.be(!0), expect(a.plotOptions.series.lines.fill).to.be(.5), expect(a.plotOptions.series.lines.lineWidth).to.be(3), expect(a.plotOptions.series.lines.steps).to.be(!0)
            })
        }), e("grid thresholds 100, 200", function (a) {
            a.setup(function (a) {
                a.panel.grid = {threshold1: 100, threshold1Color: "#111", threshold2: 200, threshold2Color: "#222"}
            }), it("should add grid markings", function () {
                var b = a.plotOptions.grid.markings;
                expect(b[0].yaxis.from).to.be(100), expect(b[0].yaxis.to).to.be(200), expect(b[0].color).to.be("#111"), expect(b[1].yaxis.from).to.be(200), expect(b[1].yaxis.to).to.be(1 / 0)
            })
        }), e("inverted grid thresholds 200, 100", function (a) {
            a.setup(function (a) {
                a.panel.grid = {threshold1: 200, threshold1Color: "#111", threshold2: 100, threshold2Color: "#222"}
            }), it("should add grid markings", function () {
                var b = a.plotOptions.grid.markings;
                expect(b[0].yaxis.from).to.be(200), expect(b[0].yaxis.to).to.be(100), expect(b[0].color).to.be("#111"), expect(b[1].yaxis.from).to.be(100), expect(b[1].yaxis.to).to.be(-1 / 0)
            })
        }), e("should use timeStep for barWidth", function (a) {
            a.setup(function (a, b) {
                a.panel.bars = !0, b[0] = new d({datapoints: [[1, 10], [2, 20]], alias: "series1"})
            }), it("should set barWidth", function () {
                expect(a.plotOptions.series.bars.barWidth).to.be(10 / 1.5)
            })
        }), e("series option overrides, fill & points", function (a) {
            a.setup(function (a, b) {
                a.panel.lines = !0, a.panel.fill = 5, a.panel.seriesOverrides = [{
                    alias: "test",
                    fill: 0,
                    points: !0
                }], b[1].alias = "test"
            }), it("should match second series and fill zero, and enable points", function () {
                expect(a.plotOptions.series.lines.fill).to.be(.5), expect(a.plotData[1].lines.fill).to.be(.001), expect(a.plotData[1].points.show).to.be(!0)
            })
        }), e("should order series order according to zindex", function (a) {
            a.setup(function (a) {
                a.panel.seriesOverrides = [{alias: "series1", zindex: 2}]
            }), it("should move zindex 2 last", function () {
                expect(a.plotData[0].alias).to.be("series2"), expect(a.plotData[1].alias).to.be("series1")
            })
        }), e("when series is hidden", function (a) {
            a.setup(function (a) {
                a.hiddenSeries = {series2: !0}
            }), it("should remove datapoints and disable stack", function () {
                expect(a.plotData[0].alias).to.be("series1"), expect(a.plotData[1].data.length).to.be(0), expect(a.plotData[1].stack).to.be(!1)
            })
        })
    })
});