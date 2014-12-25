/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["angular", "lodash", "kbn", "moment"], function (a, b, c) {
    var d = a.module("grafana.services");
    d.factory("CustomDatasource", ["$q", function (a) {
        function b(a) {
            this.name = a.name, this.supportMetrics = !0, this.url = a.url
        }

        return b.prototype.query = function (b) {
            for (var d = c.parseDate(b.range.from).getTime() / 1e3, e = c.parseDate(b.range.to).getTime() / 1e3, f = [], g = (e - d) / b.maxDataPoints, h = 0; 3 > h; h++) {
                for (var i = 100 * Math.random(), j = d, k = {
                    target: "Series " + h,
                    datapoints: []
                }, l = 0; l < b.maxDataPoints; l++)k.datapoints[l] = [i, j], i += Math.random() - .5, j += g;
                f.push(k)
            }
            return a.when({data: f})
        }, b
    }])
});