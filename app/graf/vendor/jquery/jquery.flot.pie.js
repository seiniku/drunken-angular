/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

!function (a) {
    function b(b) {
        function f(b) {
            x || (x = !0, s = b.getCanvas(), t = a(s).parent(), e = b.getOptions(), b.setData(g(b.getData())))
        }

        function g(b) {
            for (var c = 0, d = 0, f = 0, g = e.series.pie.combine.color, h = [], i = 0; i < b.length; ++i) {
                var j = b[i].data;
                a.isArray(j) && 1 == j.length && (j = j[0]), a.isArray(j) ? j[1] = !isNaN(parseFloat(j[1])) && isFinite(j[1]) ? +j[1] : 0 : j = !isNaN(parseFloat(j)) && isFinite(j) ? [1, +j] : [1, 0], b[i].data = [j]
            }
            for (var i = 0; i < b.length; ++i)c += b[i].data[0][1];
            for (var i = 0; i < b.length; ++i) {
                var j = b[i].data[0][1];
                j / c <= e.series.pie.combine.threshold && (d += j, f++, g || (g = b[i].color))
            }
            for (var i = 0; i < b.length; ++i) {
                var j = b[i].data[0][1];
                (2 > f || j / c > e.series.pie.combine.threshold) && h.push({
                    data: [[1, j]],
                    color: b[i].color,
                    label: b[i].label,
                    angle: j * Math.PI * 2 / c,
                    percent: j / (c / 100)
                })
            }
            return f > 1 && h.push({
                data: [[1, d]],
                color: g,
                label: e.series.pie.combine.label,
                angle: d * Math.PI * 2 / c,
                percent: d / (c / 100)
            }), h
        }

        function h(b, f) {
            function g() {
                y.clearRect(0, 0, k, l), t.children().filter(".pieLabel, .pieLabelBackground").remove()
            }

            function h() {
                var a = e.series.pie.shadow.left, b = e.series.pie.shadow.top, c = 10, d = e.series.pie.shadow.alpha, f = e.series.pie.radius > 1 ? e.series.pie.radius : u * e.series.pie.radius;
                if (!(f >= k / 2 - a || f * e.series.pie.tilt >= l / 2 - b || c >= f)) {
                    y.save(), y.translate(a, b), y.globalAlpha = d, y.fillStyle = "#000", y.translate(v, w), y.scale(1, e.series.pie.tilt);
                    for (var g = 1; c >= g; g++)y.beginPath(), y.arc(0, 0, f, 0, 2 * Math.PI, !1), y.fill(), f -= g;
                    y.restore()
                }
            }

            function j() {
                function b(a, b, c) {
                    0 >= a || isNaN(a) || (c ? y.fillStyle = b : (y.strokeStyle = b, y.lineJoin = "round"), y.beginPath(), Math.abs(a - 2 * Math.PI) > 1e-9 && y.moveTo(0, 0), y.arc(0, 0, f, g, g + a / 2, !1), y.arc(0, 0, f, g + a / 2, g + a, !1), y.closePath(), g += a, c ? y.fill() : y.stroke())
                }

                function c() {
                    function b(b, c, d) {
                        if (0 == b.data[0][1])return !0;
                        var g, h = e.legend.labelFormatter, i = e.series.pie.label.formatter;
                        g = h ? h(b.label, b) : b.label, i && (g = i(g, b));
                        var j = (c + b.angle + c) / 2, m = v + Math.round(Math.cos(j) * f), n = w + Math.round(Math.sin(j) * f) * e.series.pie.tilt, o = "<span class='pieLabel' id='pieLabel" + d + "' style='position:absolute;top:" + n + "px;left:" + m + "px;'>" + g + "</span>";
                        t.append(o);
                        var p = t.children("#pieLabel" + d), q = n - p.height() / 2, r = m - p.width() / 2;
                        if (p.css("top", q), p.css("left", r), 0 - q > 0 || 0 - r > 0 || l - (q + p.height()) < 0 || k - (r + p.width()) < 0)return !1;
                        if (0 != e.series.pie.label.background.opacity) {
                            var s = e.series.pie.label.background.color;
                            null == s && (s = b.color);
                            var u = "top:" + q + "px;left:" + r + "px;";
                            a("<div class='pieLabelBackground' style='position:absolute;width:" + p.width() + "px;height:" + p.height() + "px;" + u + "background-color:" + s + ";'></div>").css("opacity", e.series.pie.label.background.opacity).insertBefore(p)
                        }
                        return !0
                    }

                    for (var c = d, f = e.series.pie.label.radius > 1 ? e.series.pie.label.radius : u * e.series.pie.label.radius, g = 0; g < n.length; ++g) {
                        if (n[g].percent >= 100 * e.series.pie.label.threshold && !b(n[g], c, g))return !1;
                        c += n[g].angle
                    }
                    return !0
                }

                var d = Math.PI * e.series.pie.startAngle, f = e.series.pie.radius > 1 ? e.series.pie.radius : u * e.series.pie.radius;
                y.save(), y.translate(v, w), y.scale(1, e.series.pie.tilt), y.save();
                for (var g = d, h = 0; h < n.length; ++h)n[h].startAngle = g, b(n[h].angle, n[h].color, !0);
                if (y.restore(), e.series.pie.stroke.width > 0) {
                    y.save(), y.lineWidth = e.series.pie.stroke.width, g = d;
                    for (var h = 0; h < n.length; ++h)b(n[h].angle, e.series.pie.stroke.color, !1);
                    y.restore()
                }
                return i(y), y.restore(), e.series.pie.label.show ? c() : !0
            }

            if (t) {
                var k = b.getPlaceholder().width(), l = b.getPlaceholder().height(), m = t.children().filter(".legend").children().width() || 0;
                y = f, x = !1, u = Math.min(k, l / e.series.pie.tilt) / 2, w = l / 2 + e.series.pie.offset.top, v = k / 2, "auto" == e.series.pie.offset.left ? e.legend.position.match("w") ? v += m / 2 : v -= m / 2 : v += e.series.pie.offset.left, u > v ? v = u : v > k - u && (v = k - u);
                var n = b.getData(), o = 0;
                do o > 0 && (u *= d), o += 1, g(), e.series.pie.tilt <= .8 && h(); while (!j() && c > o);
                o >= c && (g(), t.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")), b.setSeries && b.insertLegend && (b.setSeries(n), b.insertLegend())
            }
        }

        function i(a) {
            if (e.series.pie.innerRadius > 0) {
                a.save();
                var b = e.series.pie.innerRadius > 1 ? e.series.pie.innerRadius : u * e.series.pie.innerRadius;
                a.globalCompositeOperation = "destination-out", a.beginPath(), a.fillStyle = e.series.pie.stroke.color, a.arc(0, 0, b, 0, 2 * Math.PI, !1), a.fill(), a.closePath(), a.restore(), a.save(), a.beginPath(), a.strokeStyle = e.series.pie.stroke.color, a.arc(0, 0, b, 0, 2 * Math.PI, !1), a.stroke(), a.closePath(), a.restore()
            }
        }

        function j(a, b) {
            for (var c = !1, d = -1, e = a.length, f = e - 1; ++d < e; f = d)(a[d][1] <= b[1] && b[1] < a[f][1] || a[f][1] <= b[1] && b[1] < a[d][1]) && b[0] < (a[f][0] - a[d][0]) * (b[1] - a[d][1]) / (a[f][1] - a[d][1]) + a[d][0] && (c = !c);
            return c
        }

        function k(a, c) {
            for (var d, e, f = b.getData(), g = b.getOptions(), h = g.series.pie.radius > 1 ? g.series.pie.radius : u * g.series.pie.radius, i = 0; i < f.length; ++i) {
                var k = f[i];
                if (k.pie.show) {
                    if (y.save(), y.beginPath(), y.moveTo(0, 0), y.arc(0, 0, h, k.startAngle, k.startAngle + k.angle / 2, !1), y.arc(0, 0, h, k.startAngle + k.angle / 2, k.startAngle + k.angle, !1), y.closePath(), d = a - v, e = c - w, y.isPointInPath) {
                        if (y.isPointInPath(a - v, c - w))return y.restore(), {
                            datapoint: [k.percent, k.data],
                            dataIndex: 0,
                            series: k,
                            seriesIndex: i
                        }
                    } else {
                        var l = h * Math.cos(k.startAngle), m = h * Math.sin(k.startAngle), n = h * Math.cos(k.startAngle + k.angle / 4), o = h * Math.sin(k.startAngle + k.angle / 4), p = h * Math.cos(k.startAngle + k.angle / 2), q = h * Math.sin(k.startAngle + k.angle / 2), r = h * Math.cos(k.startAngle + k.angle / 1.5), s = h * Math.sin(k.startAngle + k.angle / 1.5), t = h * Math.cos(k.startAngle + k.angle), x = h * Math.sin(k.startAngle + k.angle), z = [[0, 0], [l, m], [n, o], [p, q], [r, s], [t, x]], A = [d, e];
                        if (j(z, A))return y.restore(), {
                            datapoint: [k.percent, k.data],
                            dataIndex: 0,
                            series: k,
                            seriesIndex: i
                        }
                    }
                    y.restore()
                }
            }
            return null
        }

        function l(a) {
            n("plothover", a)
        }

        function m(a) {
            n("plotclick", a)
        }

        function n(a, c) {
            var d = b.offset(), f = parseInt(c.pageX - d.left), g = parseInt(c.pageY - d.top), h = k(f, g);
            if (e.grid.autoHighlight)for (var i = 0; i < z.length; ++i) {
                var j = z[i];
                j.auto != a || h && j.series == h.series || p(j.series)
            }
            h && o(h.series, a);
            var l = {pageX: c.pageX, pageY: c.pageY};
            t.trigger(a, [l, h])
        }

        function o(a, c) {
            var d = q(a);
            -1 == d ? (z.push({series: a, auto: c}), b.triggerRedrawOverlay()) : c || (z[d].auto = !1)
        }

        function p(a) {
            null == a && (z = [], b.triggerRedrawOverlay());
            var c = q(a);
            -1 != c && (z.splice(c, 1), b.triggerRedrawOverlay())
        }

        function q(a) {
            for (var b = 0; b < z.length; ++b) {
                var c = z[b];
                if (c.series == a)return b
            }
            return -1
        }

        function r(a, b) {
            function c(a) {
                a.angle <= 0 || isNaN(a.angle) || (b.fillStyle = "rgba(255, 255, 255, " + d.series.pie.highlight.opacity + ")", b.beginPath(), Math.abs(a.angle - 2 * Math.PI) > 1e-9 && b.moveTo(0, 0), b.arc(0, 0, e, a.startAngle, a.startAngle + a.angle / 2, !1), b.arc(0, 0, e, a.startAngle + a.angle / 2, a.startAngle + a.angle, !1), b.closePath(), b.fill())
            }

            var d = a.getOptions(), e = d.series.pie.radius > 1 ? d.series.pie.radius : u * d.series.pie.radius;
            b.save(), b.translate(v, w), b.scale(1, d.series.pie.tilt);
            for (var f = 0; f < z.length; ++f)c(z[f].series);
            i(b), b.restore()
        }

        var s = null, t = null, u = null, v = null, w = null, x = !1, y = null, z = [];
        b.hooks.processOptions.push(function (a, b) {
            b.series.pie.show && (b.grid.show = !1, "auto" == b.series.pie.label.show && (b.series.pie.label.show = b.legend.show ? !1 : !0), "auto" == b.series.pie.radius && (b.series.pie.radius = b.series.pie.label.show ? .75 : 1), b.series.pie.tilt > 1 ? b.series.pie.tilt = 1 : b.series.pie.tilt < 0 && (b.series.pie.tilt = 0))
        }), b.hooks.bindEvents.push(function (a, b) {
            var c = a.getOptions();
            c.series.pie.show && (c.grid.hoverable && b.unbind("mousemove").mousemove(l), c.grid.clickable && b.unbind("click").click(m))
        }), b.hooks.processDatapoints.push(function (a, b, c, d) {
            var e = a.getOptions();
            e.series.pie.show && f(a, b, c, d)
        }), b.hooks.drawOverlay.push(function (a, b) {
            var c = a.getOptions();
            c.series.pie.show && r(a, b)
        }), b.hooks.draw.push(function (a, b) {
            var c = a.getOptions();
            c.series.pie.show && h(a, b)
        })
    }

    var c = 10, d = .95, e = {
        series: {
            pie: {
                show: !1,
                radius: "auto",
                innerRadius: 0,
                startAngle: 1.5,
                tilt: 1,
                shadow: {left: 5, top: 15, alpha: .02},
                offset: {top: 0, left: "auto"},
                stroke: {color: "#fff", width: 1},
                label: {
                    show: "auto", formatter: function (a, b) {
                        return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + b.color + ";'>" + a + "<br/>" + Math.round(b.percent) + "%</div>"
                    }, radius: 1, background: {color: null, opacity: 0}, threshold: 0
                },
                combine: {threshold: -1, color: null, label: "Other"},
                highlight: {opacity: .5}
            }
        }
    };
    a.plot.plugins.push({init: b, options: e, name: "pie", version: "1.1"})
}(jQuery);