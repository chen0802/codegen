
/* global Worklist */

Ext.define('Worklist.view.procedure.NewProcedureViewController', {
    extend: 'Worklist.view.procedure.ProcedureViewController',

    alias: 'controller.newprocedureviewcontroller',

    requires: [
        'Worklist.procedure_strings',
        'Worklist.core.mixins.Services',
        'Worklist.ApplicationGlobals',
        'Worklist.view.procedure.ProcedureViewModel'
    ],

    mixins: [
        'Worklist.core.mixins.Services',
        'Worklist.core.mixins.UiUtilities'
    ],

    onSaveModel: function(view) {
        view.on('SaveModel', function() {
            this.saveModel(true);
        }, this);
    }
});
