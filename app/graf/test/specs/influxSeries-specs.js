/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["services/influxdb/influxSeries"], function (a) {
    describe("when generating timeseries from influxdb response", function () {
        describe("given two series", function () {
            var b = new a({
                seriesList: [{
                    columns: ["time", "mean", "sequence_number"],
                    name: "prod.server1.cpu",
                    points: [[1402596e3, 10, 1], [1402596001, 12, 2]]
                }, {
                    columns: ["time", "mean", "sequence_number"],
                    name: "prod.server2.cpu",
                    points: [[1402596e3, 15, 1], [1402596001, 16, 2]]
                }]
            }), c = b.getTimeSeries();
            it("should generate two time series", function () {
                expect(c.length).to.be(2), expect(c[0].target).to.be("prod.server1.cpu.mean"), expect(c[0].datapoints[0][0]).to.be(10), expect(c[0].datapoints[0][1]).to.be(1402596e3), expect(c[0].datapoints[1][0]).to.be(12), expect(c[0].datapoints[1][1]).to.be(1402596001), expect(c[1].target).to.be("prod.server2.cpu.mean"), expect(c[1].datapoints[0][0]).to.be(15), expect(c[1].datapoints[0][1]).to.be(1402596e3), expect(c[1].datapoints[1][0]).to.be(16), expect(c[1].datapoints[1][1]).to.be(1402596001)
            })
        }), describe("given an alias format", function () {
            var b = new a({
                seriesList: [{
                    columns: ["time", "mean", "sequence_number"],
                    name: "prod.server1.cpu",
                    points: [[1402596e3, 10, 1], [1402596001, 12, 2]]
                }], alias: "$s.testing"
            }), c = b.getTimeSeries();
            it("should generate correct series name", function () {
                expect(c[0].target).to.be("prod.server1.cpu.testing")
            })
        }), describe("given an alias format with segment numbers", function () {
            var b = new a({
                seriesList: [{
                    columns: ["time", "mean", "sequence_number"],
                    name: "prod.server1.cpu",
                    points: [[1402596e3, 10, 1], [1402596001, 12, 2]]
                }], alias: "$1.mean"
            }), c = b.getTimeSeries();
            it("should generate correct series name", function () {
                expect(c[0].target).to.be("server1.mean")
            })
        }), describe("given an alias format with group by field", function () {
            var b = new a({
                seriesList: [{
                    columns: ["time", "mean", "host"],
                    name: "prod.cpu",
                    points: [[1402596e3, 10, "A"]]
                }], groupByField: "host", alias: "$g.$1"
            }), c = b.getTimeSeries();
            it("should generate correct series name", function () {
                expect(c[0].target).to.be("A.cpu")
            })
        }), describe("given group by column", function () {
            var b = new a({
                seriesList: [{
                    columns: ["time", "mean", "host"],
                    name: "prod.cpu",
                    points: [[1402596e3, 10, "A"], [1402596001, 11, "A"], [1402596e3, 5, "B"], [1402596001, 6, "B"]]
                }], groupByField: "host"
            }), c = b.getTimeSeries();
            it("should generate two time series", function () {
                expect(c.length).to.be(2), expect(c[0].target).to.be("prod.cpu.A"), expect(c[0].datapoints[0][0]).to.be(10), expect(c[0].datapoints[0][1]).to.be(1402596e3), expect(c[0].datapoints[1][0]).to.be(11), expect(c[0].datapoints[1][1]).to.be(1402596001), expect(c[1].target).to.be("prod.cpu.B"), expect(c[1].datapoints[0][0]).to.be(5), expect(c[1].datapoints[0][1]).to.be(1402596e3), expect(c[1].datapoints[1][0]).to.be(6), expect(c[1].datapoints[1][1]).to.be(1402596001)
            })
        })
    }), describe("when creating annotations from influxdb response", function () {
        describe("given column mapping for all columns", function () {
            var b = new a({
                seriesList: [{
                    columns: ["time", "text", "sequence_number", "title", "tags"],
                    name: "events1",
                    points: [[1402596e6, "some text", 1, "Hello", "B"], [1402596001e3, "asd", 2, "Hello2", "B"]]
                }], annotation: {query: "select", titleColumn: "title", tagsColumn: "tags", textColumn: "text"}
            }), c = b.getAnnotations();
            it(" should generate 2 annnotations ", function () {
                expect(c.length).to.be(2), expect(c[0].annotation.query).to.be("select"), expect(c[0].title).to.be("Hello"), expect(c[0].time).to.be(1402596e6), expect(c[0].tags).to.be("B"), expect(c[0].text).to.be("some text")
            })
        }), describe("given no column mapping", function () {
            var b = new a({
                seriesList: [{
                    columns: ["time", "text", "sequence_number"],
                    name: "events1",
                    points: [[1402596e6, "some text", 1]]
                }], annotation: {query: "select"}
            }), c = b.getAnnotations();
            it("should generate 1 annnotation", function () {
                expect(c.length).to.be(1), expect(c[0].title).to.be("some text"), expect(c[0].time).to.be(1402596e6), expect(c[0].tags).to.be(void 0), expect(c[0].text).to.be(void 0)
            })
        })
    })
});