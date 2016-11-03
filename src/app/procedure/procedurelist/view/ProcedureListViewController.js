
/* global Worklist */
Ext.define('Worklist.view.procedure.ProcedureListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.procedurelistviewcontroller',

    requires: [
        'Worklist.core.mixins.Services',
        'Worklist.ApplicationGlobals',
        'Worklist.view.procedure.ProcedureListViewModel'
    ],

    mixins: [
        'Worklist.core.mixins.Services',
        'Worklist.core.mixins.UiUtilities'
    ],

    /**
     * Called when the view is created
     */
    init: function(view) {
        this.localeString = Worklist.procedure_strings.strings;
        this.initLocale(view, this.localeString);
        this.loadEnumerationsForComboboxes();

        this.callParent(arguments);
    },

    loadEnumerationsForComboboxes: function() {
        this.loadEnumerations().then(function(record) {
            this.loadEnumerationStore(record, 'scheduleModality', 'modalityItemId');
        }, function(message) {
            Worklist.ApplicationGlobals.setAlarm(message);
        }, null , this);
    },

    getSearchValues: function() {
        var searchForm = this.lookup('procedureSearchPanel'), fields, params = {};
        fields = searchForm.getForm().getFields();
        fields.each(function(field) {
            if (field.xtype === 'corecheckboxview') {
                params[field.getName()] = field.getValue();
            } else if (field.xtype === 'coremetasearchimagingfacilityview') {
                if (field.valueCollection.items[0]) {
                    params[field.code] = field.valueCollection.items[0].id;
                }
            } else {
                var value;
                if (field.xtype === 'corecomboboxview') {
                    value = field.getSelection();
                } else {
                    value = field.getValue();
                }
                if (value || (Ext.isBoolean(value) && value === true)) {
                    params[field.getName()] = (value.isModel === true) ? value.get('id') : value;
                }
            }
        }, this);
        return (!Ext.Object.isEmpty(params)) ? params : undefined;
    },

    onProcedureSearchChange: function() {
        var search = this.getSearchValues(), searchCriteria;
        if (search) {
            for (var property in search) {
                if (search.hasOwnProperty(property)) {
                    var value = search[property];
                    if (searchCriteria) {
                        searchCriteria = searchCriteria + '&' + property + '=' + value;
                    } else {
                        searchCriteria = property + '=' + value;
                    }
                }
            }
        }
        this.loadProcedures(searchCriteria);
    },

    loadProcedures: function(getStr) {
        //default value
        getStr = this.getPostfix(getStr);
        var url = Worklist.ApplicationGlobals.url_prefix + getStr
          , deferred = new Ext.Deferred();
        this.ajax('GET', url).then(function(record) {
            // Update store after server returns data.
            this.loadProcedure(record);
            deferred.resolve(record);
        }, function() {
            // Remove all existing data if any error
            if (this.procedureStore) {
                this.procedureStore.clearData();
            }
            deferred.reject();
        }, null , this);
        return deferred.promise;
    },

    loadProcedure: function(model) {
        this.procedureStore = Ext.create('Worklist.procedure.store.ProcedureStore', {});
        if (model && model.entry) {
            var record = model.entry;
            if (record) {
                for (var i = 0; i < record.length; i++) {
                    var item = Ext.create('Worklist.model.core.ProcedureSummaryModel', {});
                    this.updateProceduresUI(record[i], item);
                    this.procedureStore.add(item);
                }
                this.procedureStore.commitChanges();
            }
        }
        var procedureGrid = this.getComponentByItemId('procedureGridItemId');
        procedureGrid.reconfigure(this.procedureStore);
    },

    updateProceduresUI: function(serverRecord, uiRecord) {
        uiRecord.set('id', serverRecord.id);
        uiRecord.set('code', serverRecord.procedure);
        uiRecord.set('description', serverRecord.description);
        uiRecord.set('modality', this.getModalityStr(serverRecord.modality));
    },

    getModalityStr: function(modality) {
        if (modality) {
            return modality.join('/');
        }
    },

    getPostfix: function(keyword) {
        if (Ext.isEmpty(keyword)) {
            keyword = 'code=';
        }
        var postfix = 'fhir/procedure?' + keyword;
        return postfix;
    },

    enableProcedureRemoveButton: function(enable) {
        this.enableComponent('procedureRemoveButtonItemId', enable);
    },

    enableProcedureDuplicateButton: function(enable) {
        this.enableComponent('procedureDuplicateButtonItemId', enable);
    },

    enableProcedureDetailsButton: function(enable) {
        this.enableComponent('procedureDetailsButtonItemId', enable);
    },

    onAddProcedure: function() {
        this.redirectTo('newprocedure');
    },

    viewProcedure: function(id) {
        if (id) {
            this.redirectTo('procedure/' + id);
        }
    },

    duplicateProcedure: function(id) {
        if (id) {
            this.redirectTo('dupprocedure/' + id);
        }
    },

    onProcedureRowDoubleClick: function(grid, record) {
        var id = record.get('id');
        this.viewProcedure(id);
    },

    onProcedureDetails: function() {
        var id = this.getGridSelectionId('procedureGridItemId');
        this.viewProcedure(id);
    },

    onDuplicateProcedure: function() {
        var id = this.getGridSelectionId('procedureGridItemId');
        this.duplicateProcedure(id);
    },

    onRemoveProcedure: function() {
        var viewModel = this.getViewModel()
          , selectedProcedure = this.getGridSelectionRecord('procedureGridItemId')
          , procedureCode = selectedProcedure.get('code')
          , procedureId = selectedProcedure.get('id');
        Ext.Msg.show({
            scope: this,
            title: viewModel.get('warning'),
            message: Ext.String.format(Worklist.procedure_strings.strings.deleteProcedureMsg, procedureCode),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            autoScroll: false,
            width: 350,
            height: 140,
            fn: function(btn) {
                // If user clicks on 'Yes' button, delete selected record.
                if (btn === 'yes') {
                    var deferred = new Ext.Deferred();
                    this.ajax('DELETE', Worklist.ApplicationGlobals.url_prefix + 'fhir/procedure/' + procedureId).then(function() {
                        // Remove item in the grid after deleting.
                        this.removeGridSelection('procedureeGridItemId', 'procedureRemoveButtonItemId');
                        deferred.resolve();
                    }, function() {
                        var error = Ext.String.format(Worklist.procedure_strings.strings.failedDeleteProcedureMsg, procedureCode);
                        Worklist.ApplicationGlobals.setAlarm(error);
                        deferred.reject(error);
                    }, null , this);
                    return deferred.promise;
                }
            }
        });
    },

    onProcedureItemSelected: function() {
        this.enableProcedureRemoveButton();
        this.enableProcedureDuplicateButton();
        this.enableProcedureDetailsButton();
    }
});
