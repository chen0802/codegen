
/* global Worklist */

Ext.define('Worklist.view.procedure.DuplicateProcedureViewController', {
    extend: 'Worklist.view.procedure.NewProcedureViewController',

    alias: 'controller.duplicateprocedureviewcontroller',

    requires: [
        'Worklist.core.mixins.Services',
        'Worklist.ApplicationGlobals',
        'Worklist.view.procedure.ProcedureViewModel'
    ],

    mixins: [
        'Worklist.core.mixins.Services',
        'Worklist.core.mixins.UiUtilities'
    ]
});
