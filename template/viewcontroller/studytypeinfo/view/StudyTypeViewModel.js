/* global {Procedure}SummaryModel */

Ext.define('Worklist.view.{procedure}.{Procedure}ViewModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.{procedure}viewmodel',

    requires: [
        'Worklist.core.mixins.Services',
        'Worklist.model.core.EnumerationModel',
        'Worklist.model.core.{Procedure}SummaryModel'
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
        return view.getController().load{Procedure}Info(id);
    }

});