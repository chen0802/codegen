
/* global Worklist */

Ext.define('Worklist.view.{procedure}.New{Procedure}ViewController', {
    extend: 'Worklist.view.{procedure}.{Procedure}ViewController',

    alias: 'controller.new{procedure}viewcontroller',

    requires: [
        'Worklist.{procedure}_strings',
        'Worklist.core.mixins.Services',
        'Worklist.ApplicationGlobals',
        'Worklist.view.{procedure}.{Procedure}ViewModel'
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
