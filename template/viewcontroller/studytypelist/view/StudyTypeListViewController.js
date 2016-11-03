
/* global Worklist */
Ext.define('Worklist.view.{procedure}.{Procedure}ListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.{procedure}listviewcontroller',

    requires: [
        'Worklist.core.mixins.Services',
        'Worklist.ApplicationGlobals',
        'Worklist.view.{procedure}.{Procedure}ListViewModel'
    ],

    mixins: [
        'Worklist.core.mixins.Services',
        'Worklist.core.mixins.UiUtilities'
    ],

    /**
     * Called when the view is created
     */
    init: function(view) {
        this.localeString = Worklist.{procedure}_strings.strings;
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
        var searchForm = this.lookup('{procedure}SearchPanel'), fields, params = {};
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

    on{Procedure}SearchChange: function() {
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
        this.load{Procedure}s(searchCriteria);
    },

    load{Procedure}s: function(getStr) {
        //default value
        getStr = this.getPostfix(getStr);
        var url = Worklist.ApplicationGlobals.url_prefix + getStr
          , deferred = new Ext.Deferred();
        this.ajax('GET', url).then(function(record) {
            // Update store after server returns data.
            this.load{Procedure}(record);
            deferred.resolve(record);
        }, function() {
            // Remove all existing data if any error
            if (this.{procedure}Store) {
                this.{procedure}Store.clearData();
            }
            deferred.reject();
        }, null , this);
        return deferred.promise;
    },

    load{Procedure}: function(model) {
        this.{procedure}Store = Ext.create('Worklist.{procedure}.store.{Procedure}Store', {});
        if (model && model.entry) {
            var record = model.entry;
            if (record) {
                for (var i = 0; i < record.length; i++) {
                    var item = Ext.create('Worklist.model.core.{Procedure}SummaryModel', {});
                    this.update{Procedure}sUI(record[i], item);
                    this.{procedure}Store.add(item);
                }
                this.{procedure}Store.commitChanges();
            }
        }
        var {procedure}Grid = this.getComponentByItemId('{procedure}GridItemId');
        {procedure}Grid.reconfigure(this.{procedure}Store);
    },

    update{Procedure}sUI: function(serverRecord, uiRecord) {
        uiRecord.set('id', serverRecord.id);
        uiRecord.set('code', serverRecord.{procedure});
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
        var postfix = 'fhir/{procedure}?' + keyword;
        return postfix;
    },

    enable{Procedure}RemoveButton: function(enable) {
        this.enableComponent('{procedure}RemoveButtonItemId', enable);
    },

    enable{Procedure}DuplicateButton: function(enable) {
        this.enableComponent('{procedure}DuplicateButtonItemId', enable);
    },

    enable{Procedure}DetailsButton: function(enable) {
        this.enableComponent('{procedure}DetailsButtonItemId', enable);
    },

    onAdd{Procedure}: function() {
        this.redirectTo('new{procedure}');
    },

    view{Procedure}: function(id) {
        if (id) {
            this.redirectTo('{procedure}/' + id);
        }
    },

    duplicate{Procedure}: function(id) {
        if (id) {
            this.redirectTo('dup{procedure}/' + id);
        }
    },

    on{Procedure}RowDoubleClick: function(grid, record) {
        var id = record.get('id');
        this.view{Procedure}(id);
    },

    on{Procedure}Details: function() {
        var id = this.getGridSelectionId('{procedure}GridItemId');
        this.view{Procedure}(id);
    },

    onDuplicate{Procedure}: function() {
        var id = this.getGridSelectionId('{procedure}GridItemId');
        this.duplicate{Procedure}(id);
    },

    onRemove{Procedure}: function() {
        var viewModel = this.getViewModel()
          , selected{Procedure} = this.getGridSelectionRecord('{procedure}GridItemId')
          , {procedure}Code = selected{Procedure}.get('code')
          , {procedure}Id = selected{Procedure}.get('id');
        Ext.Msg.show({
            scope: this,
            title: viewModel.get('warning'),
            message: Ext.String.format(Worklist.{procedure}_strings.strings.delete{Procedure}Msg, {procedure}Code),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            autoScroll: false,
            width: 350,
            height: 140,
            fn: function(btn) {
                // If user clicks on 'Yes' button, delete selected record.
                if (btn === 'yes') {
                    var deferred = new Ext.Deferred();
                    this.ajax('DELETE', Worklist.ApplicationGlobals.url_prefix + 'fhir/{procedure}/' + {procedure}Id).then(function() {
                        // Remove item in the grid after deleting.
                        this.removeGridSelection('{procedure}eGridItemId', '{procedure}RemoveButtonItemId');
                        deferred.resolve();
                    }, function() {
                        var error = Ext.String.format(Worklist.{procedure}_strings.strings.failedDelete{Procedure}Msg, {procedure}Code);
                        Worklist.ApplicationGlobals.setAlarm(error);
                        deferred.reject(error);
                    }, null , this);
                    return deferred.promise;
                }
            }
        });
    },

    on{Procedure}ItemSelected: function() {
        this.enable{Procedure}RemoveButton();
        this.enable{Procedure}DuplicateButton();
        this.enable{Procedure}DetailsButton();
    }
});
