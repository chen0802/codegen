/* global Worklist */

Ext.define('Worklist.view.procedure.ProcedureViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.procedureviewcontroller',

    requires: [
        'Worklist.procedure_strings',
        'Worklist.core.mixins.Services',
        'Worklist.ApplicationGlobals',
        'Worklist.model.core.ProcedureModel',
        'Worklist.view.procedure.ProcedureViewModel'
    ],

    mixins: [
        'Worklist.core.mixins.Services',
        'Worklist.core.mixins.UiUtilities'
    ],

    init: function(view) {
        this.localeString = Worklist.procedure_strings.strings;
        this.initLocale(view, this.localeString);
        this.initDirtyChangeRoutes('procedure');
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

        this.redirectTo('procedure/' + id, true);
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

    loadProcedureInfo: function(procedureId) {

        var me = this,
            model = Ext.create('Worklist.model.core.ProcedureModel', {
                id: procedureId
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

    onAddProcedure: function() {

        var model = this.getModel(),
            window = Ext.create('Worklist.view.procedure.AddProcedureView', {
                parent: this.getView(),
                store: model.procedures()
            });

        window.show();
    },

    onRemoveProcedure: function() {

        this.removeGridSelection('Grid', 'procedureRemoveButton');
        this.setDirtyFlag(true);
    },

    onProcedureItemSelected: function() {

        this.enableProcedureRemoveButton(true);
        this.enableProcedureDetailsButton(true);
    },

    enableProcedureRemoveButton: function(enable) {

        this.enableComponent('procedureRemoveButton', enable);
    },

    enableProcedureDetailsButton: function(enable) {

        this.enableComponent('procedureDetailsButton', enable);
    },

    onProcedureDetails: function() {
    	
    	var id = this.getGridSelectionId('Grid');
        this.view(id);
    },
    
    onProcedureRowDoubleClick: function (grid, record) {

    	var id = record.get('id');
        this.viewProcedure(id);
    },

    view: function(id) {
        if(id) {
            this.redirectTo('/' + id);
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
                        Ext.toast(Worklist.procedure_strings.strings.addProcedureSucceedMsg + model.id);
                    } else {
                        Ext.toast(Worklist.procedure_strings.strings.updateProcedureSucceedMsg + model.id);
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