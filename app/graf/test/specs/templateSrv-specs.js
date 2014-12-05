/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["mocks/dashboard-mock", "lodash", "services/templateSrv"], function (a) {
    describe("templateSrv", function () {
        var b, c;
        beforeEach(module("grafana.services")), beforeEach(module(function () {
            c = a.create()
        })), beforeEach(inject(function (a) {
            b = a
        })), describe("init", function () {
            beforeEach(function () {
                b.init([{name: "test", current: {value: "oogle"}}])
            }), it("should initialize template data", function () {
                var a = b.replace("this.[[test]].filters");
                expect(a).to.be("this.oogle.filters")
            })
        }), describe("can check if variable exists", function () {
            beforeEach(function () {
                b.init([{name: "test", current: {value: "oogle"}}])
            }), it("should return true if exists", function () {
                var a = b.variableExists("$test");
                expect(a).to.be(!0)
            })
        }), describe("can hightlight variables in string", function () {
            beforeEach(function () {
                b.init([{name: "test", current: {value: "oogle"}}])
            }), it("should insert html", function () {
                var a = b.highlightVariablesAsHtml("$test");
                expect(a).to.be('<span class="template-variable">$test</span>')
            }), it("should insert html anywhere in string", function () {
                var a = b.highlightVariablesAsHtml("this $test ok");
                expect(a).to.be('this <span class="template-variable">$test</span> ok')
            }), it("should ignore if variables does not exist", function () {
                var a = b.highlightVariablesAsHtml("this $google ok");
                expect(a).to.be("this $google ok")
            })
        }), describe("when checking if a string contains a variable", function () {
            beforeEach(function () {
                b.init([{name: "test", current: {value: "muuuu"}}]), b.updateTemplateData()
            }), it("should find it with $var syntax", function () {
                var a = b.containsVariable("this.$test.filters", "test");
                expect(a).to.be(!0)
            }), it("should find it with [[var]] syntax", function () {
                var a = b.containsVariable("this.[[test]].filters", "test");
                expect(a).to.be(!0)
            })
        }), describe("updateTemplateData with simple value", function () {
            beforeEach(function () {
                b.init([{name: "test", current: {value: "muuuu"}}]), b.updateTemplateData()
            }), it("should set current value and update template data", function () {
                var a = b.replace("this.[[test]].filters");
                expect(a).to.be("this.muuuu.filters")
            })
        }), describe("replaceWithText", function () {
            beforeEach(function () {
                b.init([{name: "server", current: {value: "{asd,asd2}", text: "All"}}, {
                    name: "period",
                    current: {value: "$__auto_interval", text: "auto"}
                }]), b.setGrafanaVariable("$__auto_interval", "13m"), b.updateTemplateData()
            }), it("should replace with text except for grafanaVariables", function () {
                var a = b.replaceWithText("Server: $server, period: $period");
                expect(a).to.be("Server: All, period: 13m")
            })
        })
    })
});