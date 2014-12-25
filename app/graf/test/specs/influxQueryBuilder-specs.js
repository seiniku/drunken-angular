/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["services/influxdb/influxQueryBuilder"], function (a) {
    describe("InfluxQueryBuilder", function () {
        describe("series with conditon and group by", function () {
            var b = new a({
                series: "google.test",
                column: "value",
                "function": "mean",
                condition: "code=1",
                groupby_field: "code"
            }), c = b.build();
            it("should generate correct query", function () {
                expect(c).to.be('select code, mean(value) from "google.test" where $timeFilter and code=1 group by time($interval), code order asc')
            }), it("should expose groupByFiled", function () {
                expect(b.groupByField).to.be("code")
            })
        }), describe("series with fill and minimum group by time", function () {
            var b = new a({series: "google.test", column: "value", "function": "mean", fill: "0"}), c = b.build();
            it("should generate correct query", function () {
                expect(c).to.be('select mean(value) from "google.test" where $timeFilter group by time($interval) fill(0) order asc')
            })
        }), describe("merge function detection", function () {
            it("should not quote wrap regex merged series", function () {
                var b = new a({series: "merge(/^google.test/)", column: "value", "function": "mean"}), c = b.build();
                expect(c).to.be("select mean(value) from merge(/^google.test/) where $timeFilter group by time($interval) order asc")
            }), it('should quote wrap series names that start with "merge"', function () {
                var b = new a({series: "merge.google.test", column: "value", "function": "mean"}), c = b.build();
                expect(c).to.be('select mean(value) from "merge.google.test" where $timeFilter group by time($interval) order asc')
            })
        })
    })
});