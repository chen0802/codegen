/* global ProcedureSummaryModel */

Ext.define('Worklist.view.procedure.ProcedureListViewModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.procedurelistviewmodel',

    requires: [
        'Worklist.core.mixins.Services',
        'Worklist.model.core.EnumerationModel',
        'Worklist.model.core.ProcedureSummaryModel'
    ],

    mixins: [
        'Worklist.core.mixins.Services'
    ],

    data: {
        dirtyData: false
    },

    setModel: function(model) {

        this.set('model', model);

        this.getView().fireEvent('ModelIsLoaded', model);
    },

    createModel: function() {

        var model = ProcedureSummaryModel.create();
        return model;
    }

});