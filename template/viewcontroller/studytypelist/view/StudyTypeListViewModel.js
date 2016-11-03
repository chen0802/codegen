/* global {Procedure}SummaryModel */

Ext.define('Worklist.view.{procedure}.{Procedure}ListViewModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.{procedure}listviewmodel',

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

    setModel: function(model) {

        this.set('model', model);

        this.getView().fireEvent('ModelIsLoaded', model);
    },

    createModel: function() {

        var model = {Procedure}SummaryModel.create();
        return model;
    }

});