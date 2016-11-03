/* global Worklist */

Ext.define('Worklist.view.{procedure}.{Procedure}ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.{procedure}viewcontroller',

    requires: [
        'Worklist.{procedure}_strings',
        'Worklist.core.mixins.Services',
        'Worklist.ApplicationGlobals',
        'Worklist.model.core.{Procedure}Model',
        'Worklist.view.{procedure}.{Procedure}ViewModel'
    ],

    mixins: [
        'Worklist.core.mixins.Services',
        'Worklist.core.mixins.UiUtilities'
    ],

    init: function(view) {
        this.localeString = Worklist.{procedure}_strings.strings;
        this.initLocale(view, this.localeString);
        this.initDirtyChangeRoutes('{procedure}');
        this.loadStores(view);
        this.onSaveModel(view);
        this.callParent(arguments);
    },

    initDirtyChangeRoutes: function(dirtyToken) {

        this.initDirtyChange(dirtyToken);

        this.getView().on('dataHasChanged', function() {
            this.setDirtyFlag(true);
        }, this);
    },

    loadStores: function(view) {

        this.loadEnumerationsForComboBoxes();
    },

    getModel: function() {

        return this.getView().getViewModel().get('model');
    },

    reloadAfterSave: function(id) {

        this.redirectTo('{procedure}/' + id, true);
    },

    loadEnumerationsForComboBoxes: function() {

        this.loadEnumerations().then(
            function(record) {
                //this.loadEnumerationStore(record, 'scheduleModality', 'modalityItemId');
            },
            function(message) {
                Worklist.ApplicationGlobals.setAlarm(message);
            },
            null, this
        );
    },

    load{Procedure}Info: function({procedure}Id) {

        var me = this,
            model = Ext.create('Worklist.model.core.{Procedure}Model', {
                id: {procedure}Id
            });

        return new Ext.Promise(function (resolve, reject) {
            model.load({
                scope: me,
                success: function (model) {

                    this.getViewModel().set('model', model);

                    var procedureGrid = this.getComponentByItemId('procedureGrid');
                    procedureGrid.reconfigure(model.procedures());
                    model.procedures().sync();

                    var resourceGrid = this.getComponentByItemId('resourceGrid');
                    resourceGrid.reconfigure(model.resources());
                    model.resources().sync();

                    resolve(model);
                },
                failure: function () {
                    reject('Data request occurs!');
                }
            });
        });
    },

    bindNewModel: function(model) {

        this.getViewModel().set('model', model);

        var procedureGrid = this.getComponentByItemId('procedureGrid');
        procedureGrid.reconfigure(model.procedures());
        model.procedures().sync();

        var resourceGrid = this.getComponentByItemId('resourceGrid');
        resourceGrid.reconfigure(model.resources());
        model.resources().sync();
    },

    onAdd{Procedure}{Grid}: function() {

        var model = this.getModel(),
            window = Ext.create('Worklist.view.{procedure}.Add{Procedure}{Grid}View', {
                parent: this.getView(),
                store: model.{procedure}s()
            });

        window.show();
    },

    onRemove{Procedure}{Grid}: function() {

        this.removeGridSelection('{grid}Grid', '{procedure}{Grid}RemoveButton');
        this.setDirtyFlag(true);
    },

    on{Procedure}{Grid}ItemSelected: function() {

        this.enable{Procedure}{Grid}RemoveButton(true);
        this.enable{Procedure}{Grid}DetailsButton(true);
    },

    enable{Procedure}{Grid}RemoveButton: function(enable) {

        this.enableComponent('{procedure}{Grid}RemoveButton', enable);
    },

    enable{Procedure}{Grid}DetailsButton: function(enable) {

        this.enableComponent('{procedure}{Grid}DetailsButton', enable);
    },

    on{Procedure}{Grid}Details: function() {
    	
    	var id = this.getGridSelectionId('{grid}Grid');
        this.view{Grid}(id);
    },
    
    on{Procedure}{Grid}RowDoubleClick: function (grid, record) {

    	var id = record.get('id');
        this.viewProcedure(id);
    },

    view{Grid}: function(id) {
        if(id) {
            this.redirectTo('{grid}/' + id);
        }
    },

    saveModel: function(phantom) {
        var me = this,
            model = this.getViewModel().get('model');

        if (model.name) {
            model.name = model.name.toString().toUpperCase();
        }

        var validation = model.getValidation(),
            messages;

        model.phantom = phantom;
        if (phantom) {
            model.data.id = -1;
        }

        if (validation.isValid()) {

            model.save({
                success: function () {
                    // Disable Save button and dirty flag as the save has succeeded
                    me.setDirtyFlag(false);

                    // Show a toast upon success
                    if (phantom) {
                        Ext.toast(Worklist.{procedure}_strings.strings.add{Procedure}SucceedMsg + model.id);
                    } else {
                        Ext.toast(Worklist.{procedure}_strings.strings.update{Procedure}SucceedMsg + model.id);
                    }

                    // Redirect the view by loading the new model
                    me.reloadAfterSave(model.id);
                },
                failure: function(message) {
                    Worklist.ApplicationGlobals.setAlarm(message);
                }
            });
        } else {
            messages = model.getValidationErrors();
            Worklist.ApplicationGlobals.setAlarm(messages);
        }
    },

    onSaveModel: function(view) {
        view.on('SaveModel', function() {
            this.saveModel(false);
        }, this);
    }

});