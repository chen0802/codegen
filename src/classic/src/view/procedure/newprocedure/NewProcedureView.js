
Ext.define('Worklist.view.procedure.NewProcedureView', {

    extend: 'Worklist.view.procedure.ProcedureDetailsView',

    requires: [
        'Worklist.view.procedure.ProcedureDetailsView'
    ],

    controller: 'newprocedureviewcontroller',

    viewModel: {
        type: 'newprocedureviewmodel'
    }

});


