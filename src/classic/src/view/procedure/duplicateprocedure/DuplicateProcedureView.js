
Ext.define('Worklist.view.procedure.DuplicateProcedureView', {

    extend: 'Worklist.view.procedure.ProcedureDetailsView',

    requires: [
        'Worklist.view.procedure.ProcedureDetailsView'
    ],

    controller: 'duplicateprocedureviewcontroller',

    viewModel: {
        type: 'duplicateprocedureviewmodel'
    }

});


