/* global ProcedureSummaryModel */

Ext.define('Worklist.view.procedure.ProcedureViewModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.procedureviewmodel',

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

    createNewModel: function() {

        this.set('model', {});
        this.newModel = true;
    },

    loadModel: function (id, view) {
        return view.getController().loadProcedureInfo(id);
    }

});