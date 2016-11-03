
/* global Worklist */

Ext.define('Worklist.view.{procedure}.Add{Procedure}{Grid}ViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.add{procedure}{grid}viewcontroller',

    requires: [
        'Worklist.view.{procedure}.Add{Procedure}{Grid}View',
        'Worklist.core.mixins.Services'
    ],

    mixins: [
        'Worklist.core.mixins.Services'
    ],

    init: function(view) {

        // Set the model into the view model, create a new model if there isn't one already, set the flag when the model is new
        this.initModel();

        this.callParent(arguments);

    },

    onKeyPress: function() {
    },

    initModel: function() {

        var model = this.getViewModel().getData().model,
            viewModel = this.getViewModel();

        viewModel.set('model', model);
    },

    getModel: function() {

        return this.getViewModel().model;
    },

    getParent: function() {

        return this.getView().config.parent;
    },

    getParentModel: function() {

        return this.getView().parent.getViewModel().getData().model;
    },

    getAdditionalCriteria: function() {
        var additionalCriteria,
            facilityId,
            modality;

        facilityId = this.getViewModel().getData().model.get('facilityId');

        if (facilityId) {
            //facility is the first level filter, must be there
            additionalCriteria = 'facilityId=' + facilityId;

            modality = this.getParentModel().modality;
            if (modality) {
                additionalCriteria = additionalCriteria + '&modality=' + modality;
            }
        }

        if (additionalCriteria) {
            return additionalCriteria;
        }
    },

    onOK: function() {

        var model = this.getViewModel().getData().model,
            id = model.getData().id;

        if (Ext.isNumber(id)) {

            var parentModel = this.getParentModel();

            parentModel.{grid}s().add({id: model.data.id, name: model.data.name});

            model.commit();

            // Enable Save button and dirty flag, as data has been modified
            this.getParent().fireEvent('dataHasChanged');

            this.getView().destroy();
        }
    },

    onCancel: function() {

        this.getView().destroy();
    }

});