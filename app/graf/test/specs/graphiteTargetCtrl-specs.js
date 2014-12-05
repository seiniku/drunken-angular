/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["./helpers", "services/graphite/gfunc", "controllers/graphiteTarget"], function (a, b) {
    describe("GraphiteTargetCtrl", function () {
        var c = new a.ControllerTestContext;
        beforeEach(module("grafana.controllers")), beforeEach(c.providePhase()), beforeEach(c.createControllerPhase("GraphiteTargetCtrl")), beforeEach(function () {
            c.scope.target = {target: "aliasByNode(scaleToSeconds(test.prod.*,1),2)"}, c.scope.datasource = c.datasource, c.scope.datasource.metricFindQuery = sinon.stub().returns(c.$q.when([]))
        }), describe("init", function () {
            beforeEach(function () {
                c.scope.init(), c.scope.$digest()
            }), it("should validate metric key exists", function () {
                expect(c.scope.datasource.metricFindQuery.getCall(0).args[0]).to.be("test.prod.*")
            }), it("should delete last segment if no metrics are found", function () {
                expect(c.scope.segments[2].value).to.be("select metric")
            }), it("should parse expression and build function model", function () {
                expect(c.scope.functions.length).to.be(2)
            })
        }), describe("when adding function", function () {
            beforeEach(function () {
                c.scope.target.target = "test.prod.*.count", c.scope.datasource.metricFindQuery.returns(c.$q.when([{expandable: !1}])), c.scope.init(), c.scope.$digest(), c.scope.$parent = {get_data: sinon.spy()}, c.scope.addFunction(b.getFuncDef("aliasByNode"))
            }), it("should add function with correct node number", function () {
                expect(c.scope.functions[0].params[0]).to.be(2)
            }), it("should update target", function () {
                expect(c.scope.target.target).to.be("aliasByNode(test.prod.*.count, 2)")
            }), it("should call get_data", function () {
                expect(c.scope.$parent.get_data.called).to.be(!0)
            })
        }), describe("when adding function before any metric segment", function () {
            beforeEach(function () {
                c.scope.target.target = "", c.scope.datasource.metricFindQuery.returns(c.$q.when([{expandable: !0}])), c.scope.init(), c.scope.$digest(), c.scope.$parent = {get_data: sinon.spy()}, c.scope.addFunction(b.getFuncDef("asPercent"))
            }), it("should add function and remove select metric link", function () {
                expect(c.scope.segments.length).to.be(0)
            })
        }), describe("when initalizing target without metric expression and only function", function () {
            beforeEach(function () {
                c.scope.target.target = "asPercent(#A, #B)", c.scope.datasource.metricFindQuery.returns(c.$q.when([])), c.scope.init(), c.scope.$digest(), c.scope.$parent = {get_data: sinon.spy()}
            }), it("should not add select metric segment", function () {
                expect(c.scope.segments.length).to.be(0)
            }), it("should add both series refs as params", function () {
                expect(c.scope.functions[0].params.length).to.be(2)
            })
        }), describe("when initializing a target with single param func using variable", function () {
            beforeEach(function () {
                c.scope.target.target = "movingAverage(prod.count, $var)", c.scope.datasource.metricFindQuery.returns(c.$q.when([])), c.scope.init(), c.scope.$digest(), c.scope.$parent = {get_data: sinon.spy()}
            }), it("should add 2 segments", function () {
                expect(c.scope.segments.length).to.be(2)
            }), it("should add function param", function () {
                expect(c.scope.functions[0].params.length).to.be(1)
            })
        }), describe("when initalizing target without metric expression and function with series-ref", function () {
            beforeEach(function () {
                c.scope.target.target = "asPercent(metric.node.count, #A)", c.scope.datasource.metricFindQuery.returns(c.$q.when([])), c.scope.init(), c.scope.$digest(), c.scope.$parent = {get_data: sinon.spy()}
            }), it("should add segments", function () {
                expect(c.scope.segments.length).to.be(3)
            }), it("should have correct func params", function () {
                expect(c.scope.functions[0].params.length).to.be(1)
            })
        }), describe("targetChanged", function () {
            beforeEach(function () {
                c.scope.datasource.metricFindQuery.returns(c.$q.when([{expandable: !1}])), c.scope.init(), c.scope.$digest(), c.scope.$parent = {get_data: sinon.spy()}, c.scope.target.target = "", c.scope.targetChanged()
            }), it("should rebuld target after expression model", function () {
                expect(c.scope.target.target).to.be("aliasByNode(scaleToSeconds(test.prod.*, 1), 2)")
            }), it("should call get_data", function () {
                expect(c.scope.$parent.get_data.called).to.be(!0)
            })
        })
    })
});