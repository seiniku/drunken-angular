/*! grafana - v1.9.0 - 2014-12-02
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["./helpers", "panels/graph/module"], function (a) {
    describe("GraphCtrl", function () {
        var b = new a.ControllerTestContext;
        beforeEach(module("grafana.services")), beforeEach(module("grafana.panels.graph")), beforeEach(b.providePhase()), beforeEach(b.createControllerPhase("GraphCtrl")), describe("get_data with 2 series", function () {
            beforeEach(function () {
                b.annotationsSrv.getAnnotations = sinon.stub().returns(b.$q.when([])), b.datasource.query = sinon.stub().returns(b.$q.when({
                    data: [{
                        target: "test.cpu1",
                        datapoints: [[1, 10]]
                    }, {target: "test.cpu2", datapoints: [[1, 10]]}]
                })), b.scope.render = sinon.spy(), b.scope.get_data(), b.scope.$digest()
            }), it("should send time series to render", function () {
                var a = b.scope.render.getCall(0).args[0];
                expect(a.length).to.be(2)
            }), describe("get_data failure following success", function () {
                beforeEach(function () {
                    b.datasource.query = sinon.stub().returns(b.$q.reject("Datasource Error")), b.scope.get_data(), b.scope.$digest()
                })
            })
        })
    })
});