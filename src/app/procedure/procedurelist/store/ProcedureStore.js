
Ext.define('Worklist.procedure.store.ProcedureStore', {

    extend: 'Ext.data.Store',

    alias: 'store.procedurestore',

    requires: [
        'Worklist.model.core.ProcedureSummaryModel'
    ],

    model: 'Worklist.model.core.ProcedureSummaryModel'

});