/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

!function (a, b, c) {
    function d(a) {
        var b;
        if (b = a.match(j)) {
            var c = new Date(0), d = 0, f = 0;
            return b[9] && (d = e(b[9] + b[10]), f = e(b[9] + b[11])), c.setUTCFullYear(e(b[1]), e(b[2]) - 1, e(b[3])), c.setUTCHours(e(b[4] || 0) - d, e(b[5] || 0) - f, e(b[6] || 0), e(b[7] || 0)), c
        }
        return a
    }

    function e(a) {
        return parseInt(a, 10)
    }

    function f(a, b, c) {
        var d = "";
        for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b;)a = "0" + a;
        return c && (a = a.substr(a.length - b)), d + a
    }

    function g(a, d, e) {
        function f(a, c, d, e) {
            return b.isFunction(a) ? a : function () {
                return b.isNumber(a) ? [a, c, d, e] : [200, a, c]
            }
        }

        function g(a, f, g, h, j, p, q) {
            function r(a) {
                return b.isString(a) || b.isFunction(a) || a instanceof RegExp ? a : b.toJson(a)
            }

            function s(b) {
                function d() {
                    var c = b.response(a, f, g, j);
                    t.$$respHeaders = c[2], h(o(c[0]), o(c[1]), t.getAllResponseHeaders(), o(c[3] || ""))
                }

                function i() {
                    for (var a = 0, b = m.length; b > a; a++)if (m[a] === d) {
                        m.splice(a, 1), h(-1, c, "");
                        break
                    }
                }

                return !e && p && p.then && p.then(i), d
            }

            var t = new i, u = l[0], v = !1;
            if (u && u.match(a, f)) {
                if (!u.matchData(g))throw new Error("Expected " + u + " with different data\nEXPECTED: " + r(u.data) + "\nGOT:      " + g);
                if (!u.matchHeaders(j))throw new Error("Expected " + u + " with different headers\nEXPECTED: " + r(u.headers) + "\nGOT:      " + r(j));
                if (l.shift(), u.response)return void m.push(s(u));
                v = !0
            }
            for (var w, x = -1; w = k[++x];)if (w.match(a, f, g, j || {})) {
                if (w.response)(e ? e.defer : n)(s(w)); else {
                    if (!w.passThrough)throw new Error("No response defined !");
                    d(a, f, g, h, j, p, q)
                }
                return
            }
            throw new Error(v ? "No response defined !" : "Unexpected request: " + a + " " + f + "\n" + (u ? "Expected " + u : "No more request expected"))
        }

        function j(a) {
            b.forEach(["GET", "DELETE", "JSONP", "HEAD"], function (b) {
                g[a + b] = function (d, e) {
                    return g[a](b, d, c, e)
                }
            }), b.forEach(["PUT", "POST", "PATCH"], function (b) {
                g[a + b] = function (c, d, e) {
                    return g[a](b, c, d, e)
                }
            })
        }

        var k = [], l = [], m = [], n = b.bind(m, m.push), o = b.copy;
        return g.when = function (a, b, d, g) {
            var i = new h(a, b, d, g), j = {
                respond: function (a, b, d, e) {
                    return i.passThrough = c, i.response = f(a, b, d, e), j
                }
            };
            return e && (j.passThrough = function () {
                return i.response = c, i.passThrough = !0, j
            }), k.push(i), j
        }, j("when"), g.expect = function (a, b, c, d) {
            var e = new h(a, b, c, d), g = {
                respond: function (a, b, c, d) {
                    return e.response = f(a, b, c, d), g
                }
            };
            return l.push(e), g
        }, j("expect"), g.flush = function (c, d) {
            if (d !== !1 && a.$digest(), !m.length)throw new Error("No pending request to flush !");
            if (b.isDefined(c) && null !== c)for (; c--;) {
                if (!m.length)throw new Error("No more pending request to flush !");
                m.shift()()
            } else for (; m.length;)m.shift()();
            g.verifyNoOutstandingExpectation(d)
        }, g.verifyNoOutstandingExpectation = function (b) {
            if (b !== !1 && a.$digest(), l.length)throw new Error("Unsatisfied requests: " + l.join(", "))
        }, g.verifyNoOutstandingRequest = function () {
            if (m.length)throw new Error("Unflushed requests: " + m.length)
        }, g.resetExpectations = function () {
            l.length = 0, m.length = 0
        }, g
    }

    function h(a, c, d, e) {
        this.data = d, this.headers = e, this.match = function (c, d, e, f) {
            return a != c ? !1 : this.matchUrl(d) ? b.isDefined(e) && !this.matchData(e) ? !1 : b.isDefined(f) && !this.matchHeaders(f) ? !1 : !0 : !1
        }, this.matchUrl = function (a) {
            return c ? b.isFunction(c.test) ? c.test(a) : b.isFunction(c) ? c(a) : c == a : !0
        }, this.matchHeaders = function (a) {
            return b.isUndefined(e) ? !0 : b.isFunction(e) ? e(a) : b.equals(e, a)
        }, this.matchData = function (a) {
            return b.isUndefined(d) ? !0 : d && b.isFunction(d.test) ? d.test(a) : d && b.isFunction(d) ? d(a) : d && !b.isString(d) ? b.equals(b.fromJson(b.toJson(d)), b.fromJson(a)) : d == a
        }, this.toString = function () {
            return a + " " + c
        }
    }

    function i() {
        i.$$lastInstance = this, this.open = function (a, b, c) {
            this.$$method = a, this.$$url = b, this.$$async = c, this.$$reqHeaders = {}, this.$$respHeaders = {}
        }, this.send = function (a) {
            this.$$data = a
        }, this.setRequestHeader = function (a, b) {
            this.$$reqHeaders[a] = b
        }, this.getResponseHeader = function (a) {
            var d = this.$$respHeaders[a];
            return d ? d : (a = b.lowercase(a), (d = this.$$respHeaders[a]) ? d : (d = c, b.forEach(this.$$respHeaders, function (c, e) {
                d || b.lowercase(e) != a || (d = c)
            }), d))
        }, this.getAllResponseHeaders = function () {
            var a = [];
            return b.forEach(this.$$respHeaders, function (b, c) {
                a.push(c + ": " + b)
            }), a.join("\n")
        }, this.abort = b.noop
    }

    b.mock = {}, b.mock.$BrowserProvider = function () {
        this.$get = function () {
            return new b.mock.$Browser
        }
    }, b.mock.$Browser = function () {
        var a = this;
        this.isMock = !0, a.$$url = "http://server/", a.$$lastUrl = a.$$url, a.pollFns = [], a.$$completeOutstandingRequest = b.noop, a.$$incOutstandingRequestCount = b.noop, a.onUrlChange = function (b) {
            return a.pollFns.push(function () {
                (a.$$lastUrl !== a.$$url || a.$$state !== a.$$lastState) && (a.$$lastUrl = a.$$url, a.$$lastState = a.$$state, b(a.$$url, a.$$state))
            }), b
        }, a.$$checkUrlChange = b.noop, a.cookieHash = {}, a.lastCookieHash = {}, a.deferredFns = [], a.deferredNextId = 0, a.defer = function (b, c) {
            return c = c || 0, a.deferredFns.push({
                time: a.defer.now + c,
                fn: b,
                id: a.deferredNextId
            }), a.deferredFns.sort(function (a, b) {
                return a.time - b.time
            }), a.deferredNextId++
        }, a.defer.now = 0, a.defer.cancel = function (d) {
            var e;
            return b.forEach(a.deferredFns, function (a, b) {
                a.id === d && (e = b)
            }), e !== c ? (a.deferredFns.splice(e, 1), !0) : !1
        }, a.defer.flush = function (c) {
            if (b.isDefined(c))a.defer.now += c; else {
                if (!a.deferredFns.length)throw new Error("No deferred tasks to be flushed");
                a.defer.now = a.deferredFns[a.deferredFns.length - 1].time
            }
            for (; a.deferredFns.length && a.deferredFns[0].time <= a.defer.now;)a.deferredFns.shift().fn()
        }, a.$$baseHref = "/", a.baseHref = function () {
            return this.$$baseHref
        }
    }, b.mock.$Browser.prototype = {
        poll: function () {
            b.forEach(this.pollFns, function (a) {
                a()
            })
        }, addPollFn: function (a) {
            return this.pollFns.push(a), a
        }, url: function (a, c, d) {
            return b.isUndefined(d) && (d = null), a ? (this.$$url = a, this.$$state = b.copy(d), this) : this.$$url
        }, state: function () {
            return this.$$state
        }, cookies: function (a, c) {
            return a ? void(b.isUndefined(c) ? delete this.cookieHash[a] : b.isString(c) && c.length <= 4096 && (this.cookieHash[a] = c)) : (b.equals(this.cookieHash, this.lastCookieHash) || (this.lastCookieHash = b.copy(this.cookieHash), this.cookieHash = b.copy(this.cookieHash)), this.cookieHash)
        }, notifyWhenNoOutstandingRequests: function (a) {
            a()
        }
    }, b.mock.$ExceptionHandlerProvider = function () {
        var a;
        this.mode = function (b) {
            switch (b) {
                case"rethrow":
                    a = function (a) {
                        throw a
                    };
                    break;
                case"log":
                    var c = [];
                    a = function (a) {
                        c.push(1 == arguments.length ? a : [].slice.call(arguments, 0))
                    }, a.errors = c;
                    break;
                default:
                    throw new Error("Unknown mode '" + b + "', only 'log'/'rethrow' modes are allowed!")
            }
        }, this.$get = function () {
            return a
        }, this.mode("rethrow")
    }, b.mock.$LogProvider = function () {
        function a(a, b, c) {
            return a.concat(Array.prototype.slice.call(b, c))
        }

        var c = !0;
        this.debugEnabled = function (a) {
            return b.isDefined(a) ? (c = a, this) : c
        }, this.$get = function () {
            var d = {
                log: function () {
                    d.log.logs.push(a([], arguments, 0))
                }, warn: function () {
                    d.warn.logs.push(a([], arguments, 0))
                }, info: function () {
                    d.info.logs.push(a([], arguments, 0))
                }, error: function () {
                    d.error.logs.push(a([], arguments, 0))
                }, debug: function () {
                    c && d.debug.logs.push(a([], arguments, 0))
                }
            };
            return d.reset = function () {
                d.log.logs = [], d.info.logs = [], d.warn.logs = [], d.error.logs = [], d.debug.logs = []
            }, d.assertEmpty = function () {
                var a = [];
                if (b.forEach(["error", "warn", "info", "log", "debug"], function (c) {
                        b.forEach(d[c].logs, function (d) {
                            b.forEach(d, function (b) {
                                a.push("MOCK $log (" + c + "): " + String(b) + "\n" + (b.stack || ""))
                            })
                        })
                    }), a.length)throw a.unshift("Expected $log to be empty! Either a message was logged unexpectedly, or an expected log message was not checked and removed:"), a.push(""), new Error(a.join("\n---------\n"))
            }, d.reset(), d
        }
    }, b.mock.$IntervalProvider = function () {
        this.$get = ["$browser", "$rootScope", "$q", "$$q", function (a, d, e, f) {
            var g = [], h = 0, i = 0, j = function (j, k, l, m) {
                function n() {
                    if (q.notify(o++), l > 0 && o >= l) {
                        var e;
                        q.resolve(o), b.forEach(g, function (a, b) {
                            a.id === r.$$intervalId && (e = b)
                        }), e !== c && g.splice(e, 1)
                    }
                    p ? a.defer.flush() : d.$apply()
                }

                var o = 0, p = b.isDefined(m) && !m, q = (p ? f : e).defer(), r = q.promise;
                return l = b.isDefined(l) ? l : 0, r.then(null, null, j), r.$$intervalId = h, g.push({
                    nextTime: i + k,
                    delay: k,
                    fn: n,
                    id: h,
                    deferred: q
                }), g.sort(function (a, b) {
                    return a.nextTime - b.nextTime
                }), h++, r
            };
            return j.cancel = function (a) {
                if (!a)return !1;
                var d;
                return b.forEach(g, function (b, c) {
                    b.id === a.$$intervalId && (d = c)
                }), d !== c ? (g[d].deferred.reject("canceled"), g.splice(d, 1), !0) : !1
            }, j.flush = function (a) {
                for (i += a; g.length && g[0].nextTime <= i;) {
                    var b = g[0];
                    b.fn(), b.nextTime += b.delay, g.sort(function (a, b) {
                        return a.nextTime - b.nextTime
                    })
                }
                return a
            }, j
        }]
    };
    var j = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?:\:?(\d\d)(?:\:?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;
    if (b.mock.TzDate = function (a, c) {
            var e = new Date(0);
            if (b.isString(c)) {
                var g = c;
                if (e.origDate = d(c), c = e.origDate.getTime(), isNaN(c))throw{
                    name: "Illegal Argument",
                    message: "Arg '" + g + "' passed into TzDate constructor is not a valid date string"
                }
            } else e.origDate = new Date(c);
            var h = new Date(c).getTimezoneOffset();
            e.offsetDiff = 60 * h * 1e3 - 1e3 * a * 60 * 60, e.date = new Date(c + e.offsetDiff), e.getTime = function () {
                return e.date.getTime() - e.offsetDiff
            }, e.toLocaleDateString = function () {
                return e.date.toLocaleDateString()
            }, e.getFullYear = function () {
                return e.date.getFullYear()
            }, e.getMonth = function () {
                return e.date.getMonth()
            }, e.getDate = function () {
                return e.date.getDate()
            }, e.getHours = function () {
                return e.date.getHours()
            }, e.getMinutes = function () {
                return e.date.getMinutes()
            }, e.getSeconds = function () {
                return e.date.getSeconds()
            }, e.getMilliseconds = function () {
                return e.date.getMilliseconds()
            }, e.getTimezoneOffset = function () {
                return 60 * a
            }, e.getUTCFullYear = function () {
                return e.origDate.getUTCFullYear()
            }, e.getUTCMonth = function () {
                return e.origDate.getUTCMonth()
            }, e.getUTCDate = function () {
                return e.origDate.getUTCDate()
            }, e.getUTCHours = function () {
                return e.origDate.getUTCHours()
            }, e.getUTCMinutes = function () {
                return e.origDate.getUTCMinutes()
            }, e.getUTCSeconds = function () {
                return e.origDate.getUTCSeconds()
            }, e.getUTCMilliseconds = function () {
                return e.origDate.getUTCMilliseconds()
            }, e.getDay = function () {
                return e.date.getDay()
            }, e.toISOString && (e.toISOString = function () {
                return f(e.origDate.getUTCFullYear(), 4) + "-" + f(e.origDate.getUTCMonth() + 1, 2) + "-" + f(e.origDate.getUTCDate(), 2) + "T" + f(e.origDate.getUTCHours(), 2) + ":" + f(e.origDate.getUTCMinutes(), 2) + ":" + f(e.origDate.getUTCSeconds(), 2) + "." + f(e.origDate.getUTCMilliseconds(), 3) + "Z"
            });
            var i = ["getUTCDay", "getYear", "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear", "toDateString", "toGMTString", "toJSON", "toLocaleFormat", "toLocaleString", "toLocaleTimeString", "toSource", "toString", "toTimeString", "toUTCString", "valueOf"];
            return b.forEach(i, function (a) {
                e[a] = function () {
                    throw new Error("Method '" + a + "' is not implemented in the TzDate mock")
                }
            }), e
        }, b.mock.TzDate.prototype = Date.prototype, b.mock.animate = b.module("ngAnimateMock", ["ng"]).config(["$provide", function (a) {
            var c = [];
            a.value("$$animateReflow", function (a) {
                var b = c.length;
                return c.push(a), function () {
                    c.splice(b, 1)
                }
            }), a.decorator("$animate", ["$delegate", "$$asyncCallback", "$timeout", "$browser", function (a, d, e) {
                var f = {
                    queue: [], cancel: a.cancel, enabled: a.enabled, triggerCallbackEvents: function () {
                        d.flush()
                    }, triggerCallbackPromise: function () {
                        e.flush(0)
                    }, triggerCallbacks: function () {
                        this.triggerCallbackEvents(), this.triggerCallbackPromise()
                    }, triggerReflow: function () {
                        b.forEach(c, function (a) {
                            a()
                        }), c = []
                    }
                };
                return b.forEach(["animate", "enter", "leave", "move", "addClass", "removeClass", "setClass"], function (b) {
                    f[b] = function () {
                        return f.queue.push({
                            event: b,
                            element: arguments[0],
                            options: arguments[arguments.length - 1],
                            args: arguments
                        }), a[b].apply(a, arguments)
                    }
                }), f
            }])
        }]), b.mock.dump = function (a) {
            function c(a) {
                var e;
                return b.isElement(a) ? (a = b.element(a), e = b.element("<div></div>"), b.forEach(a, function (a) {
                    e.append(b.element(a).clone())
                }), e = e.html()) : b.isArray(a) ? (e = [], b.forEach(a, function (a) {
                    e.push(c(a))
                }), e = "[ " + e.join(", ") + " ]") : e = b.isObject(a) ? b.isFunction(a.$eval) && b.isFunction(a.$apply) ? d(a) : a instanceof Error ? a.stack || "" + a.name + ": " + a.message : b.toJson(a, !0) : String(a), e
            }

            function d(a, c) {
                c = c || "  ";
                var e = [c + "Scope(" + a.$id + "): {"];
                for (var f in a)Object.prototype.hasOwnProperty.call(a, f) && !f.match(/^(\$|this)/) && e.push("  " + f + ": " + b.toJson(a[f]));
                for (var g = a.$$childHead; g;)e.push(d(g, c + "  ")), g = g.$$nextSibling;
                return e.push("}"), e.join("\n" + c)
            }

            return c(a)
        }, b.mock.$HttpBackendProvider = function () {
            this.$get = ["$rootScope", g]
        }, b.mock.$TimeoutDecorator = ["$delegate", "$browser", function (a, c) {
            function d(a) {
                var c = [];
                return b.forEach(a, function (a) {
                    c.push("{id: " + a.id + ", time: " + a.time + "}")
                }), c.join(", ")
            }

            return a.flush = function (a) {
                c.defer.flush(a)
            }, a.verifyNoPendingTasks = function () {
                if (c.deferredFns.length)throw new Error("Deferred tasks to flush (" + c.deferredFns.length + "): " + d(c.deferredFns))
            }, a
        }], b.mock.$RAFDecorator = ["$delegate", function (a) {
            var b = [], c = function (a) {
                var c = b.length;
                return b.push(a), function () {
                    b.splice(c, 1)
                }
            };
            return c.supported = a.supported, c.flush = function () {
                if (0 === b.length)throw new Error("No rAF callbacks present");
                for (var a = b.length, c = 0; a > c; c++)b[c]();
                b = []
            }, c
        }], b.mock.$AsyncCallbackDecorator = ["$delegate", function () {
            var a = [], c = function (b) {
                a.push(b)
            };
            return c.flush = function () {
                b.forEach(a, function (a) {
                    a()
                }), a = []
            }, c
        }], b.mock.$RootElementProvider = function () {
            this.$get = function () {
                return b.element("<div ng-app></div>")
            }
        }, b.module("ngMock", ["ng"]).provider({
            $browser: b.mock.$BrowserProvider,
            $exceptionHandler: b.mock.$ExceptionHandlerProvider,
            $log: b.mock.$LogProvider,
            $interval: b.mock.$IntervalProvider,
            $httpBackend: b.mock.$HttpBackendProvider,
            $rootElement: b.mock.$RootElementProvider
        }).config(["$provide", function (a) {
            a.decorator("$timeout", b.mock.$TimeoutDecorator), a.decorator("$$rAF", b.mock.$RAFDecorator), a.decorator("$$asyncCallback", b.mock.$AsyncCallbackDecorator), a.decorator("$rootScope", b.mock.$RootScopeDecorator)
        }]), b.module("ngMockE2E", ["ng"]).config(["$provide", function (a) {
            a.decorator("$httpBackend", b.mock.e2e.$httpBackendDecorator)
        }]), b.mock.e2e = {}, b.mock.e2e.$httpBackendDecorator = ["$rootScope", "$delegate", "$browser", g], b.mock.$RootScopeDecorator = function (a) {
            function b() {
                for (var a, b = 0, c = [this.$$childHead]; c.length;)for (a = c.shift(); a;)b += 1, c.push(a.$$childHead), a = a.$$nextSibling;
                return b
            }

            function c() {
                for (var a, b = this.$$watchers ? this.$$watchers.length : 0, c = [this.$$childHead]; c.length;)for (a = c.shift(); a;)b += a.$$watchers ? a.$$watchers.length : 0, c.push(a.$$childHead), a = a.$$nextSibling;
                return b
            }

            var d = Object.getPrototypeOf(a);
            return d.$countChildScopes = b, d.$countWatchers = c, a
        }, a.jasmine || a.mocha) {
        var k = null, l = function () {
            return !!k
        };
        (a.beforeEach || a.setup)(function () {
            k = this
        }), (a.afterEach || a.teardown)(function () {
            var a = k.$injector;
            b.forEach(k.$modules, function (a) {
                a && a.$$hashKey && (a.$$hashKey = c)
            }), k.$injector = null, k.$modules = null, k = null, a && (a.get("$rootElement").off(), a.get("$browser").pollFns.length = 0), b.forEach(b.element.fragments, function (a, c) {
                delete b.element.fragments[c]
            }), i.$$lastInstance = null, b.forEach(b.callbacks, function (a, c) {
                delete b.callbacks[c]
            }), b.callbacks.counter = 0
        }), a.module = b.mock.module = function () {
            function a() {
                if (k.$injector)throw new Error("Injector already created, can not register a module!");
                var a = k.$modules || (k.$modules = []);
                b.forEach(c, function (c) {
                    a.push(b.isObject(c) && !b.isArray(c) ? function (a) {
                        b.forEach(c, function (b, c) {
                            a.value(c, b)
                        })
                    } : c)
                })
            }

            var c = Array.prototype.slice.call(arguments, 0);
            return l() ? a() : a
        };
        var m = function (a, b) {
            this.message = a.message, this.name = a.name, a.line && (this.line = a.line), a.sourceId && (this.sourceId = a.sourceId), a.stack && b && (this.stack = a.stack + "\n" + b.stack), a.stackArray && (this.stackArray = a.stackArray)
        };
        m.prototype.toString = Error.prototype.toString, a.inject = b.mock.inject = function () {
            function a() {
                var a = k.$modules || [], e = !!k.$injectorStrict;
                a.unshift("ngMock"), a.unshift("ng");
                var f = k.$injector;
                f || (e && b.forEach(a, function (a) {
                    "function" == typeof a && b.injector.$$annotate(a)
                }), f = k.$injector = b.injector(a, e), k.$injectorStrict = e);
                for (var g = 0, h = c.length; h > g; g++) {
                    k.$injectorStrict && f.annotate(c[g]);
                    try {
                        f.invoke(c[g] || b.noop, this)
                    } catch (i) {
                        if (i.stack && d)throw new m(i, d);
                        throw i
                    } finally {
                        d = null
                    }
                }
            }

            var c = Array.prototype.slice.call(arguments, 0), d = new Error("Declaration Location");
            return l() ? a.call(k) : a
        }, b.mock.inject.strictDi = function (a) {
            function b() {
                if (a !== k.$injectorStrict) {
                    if (k.$injector)throw new Error("Injector already created, can not modify strict annotations");
                    k.$injectorStrict = a
                }
            }

            return a = arguments.length ? !!a : !0, l() ? b() : b
        }
    }
}(window, window.angular);