
/* global Worklist */

Ext.define('Worklist.view.{procedure}.Duplicate{Procedure}ViewController', {
    extend: 'Worklist.view.{procedure}.New{Procedure}ViewController',

    alias: 'controller.duplicate{procedure}viewcontroller',

    requires: [
        'Worklist.core.mixins.Services',
        'Worklist.ApplicationGlobals',
        'Worklist.view.{procedure}.{Procedure}ViewModel'
    ],

    mixins: [
        'Worklist.core.mixins.Services',
        'Worklist.core.mixins.UiUtilities'
    ]
});
