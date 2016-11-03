
Ext.define('Worklist.view.procedure.ProcedureListView', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Worklist.view.core.MetaSearchImagingFacilityView',
        'Worklist.view.procedure.ProcedureListViewController'
    ],

    xtype: 'procedurelistview',

    controller: 'procedurelistviewcontroller',

    scrollable: 'y',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    viewModel: {
        type: 'procedurelistviewmodel'
    },

    margin: '20 0 0 0',

    defaults: {
        margin: '10 0 0 10'
    },

    items: [{
        xtype: 'form',
        title: 'Search',
        layout: 'hbox',
        reference: 'procedureSearchPanel',

        defaults: {
            margin: '10 0 0 10',
            flex: 1
        },

        items: [{
            xtype: 'coretextview',
            inputType: 'search',
            name: 'code',
            labelWidth: 50,
            bind: {
                fieldLabel: '{procedureListCode}'
            },
            listeners: [{
                change: 'onProcedureSearchChange'
            }]
        }, {
            xtype: 'coretextview',
            inputType: 'search',
            name: 'description',
            labelWidth: 80,
            flex: 2,
            bind: {
                fieldLabel: '{procedureDescription}'
            },
            listeners: [{
                change: 'onProcedureSearchChange'
            }]
        }]
    }, {
        xtype: 'panel',
        scrollable: 'y',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        title: {
            bind: '{procedureMsg}'
        },
        defaults: {
            margin: '10 0 0 0'
        },

        items: [{
            xtype: 'gridpanel',
            itemId: 'procedureGridItemId',
            reference: 'procedureListGrid',
            flex: 8,

            columns: [
                { xtype: 'rownumberer' },
                { text: 'Procedure Id', dataIndex: 'id', hideable: false, hidden: true },
                { text: 'Code', dataIndex: 'code', align: 'left', flex: 0.5},
                { text: 'Description', dataIndex: 'description', align: 'left', flex: 4, formatter: 'uppercase()'}],

            listeners: {
                select: 'onProcedureItemSelected',
                rowdblclick: 'onProcedureRowDoubleClick'
            }
        }, {
            //buttons
            width: 35,
            layout: {
                type: 'vbox',
                align: 'top'
            },

            items: [{
                xtype: 'button',
                iconCls: 'msg-additem',
                iconAlign: 'centre',
                scale: 'small',
                bind: {
                    tooltip: '{newProcedureTooltip}'
                },
                handler: 'onAddProcedure',
                margin: '0 0 0 10',
                name: 'addprocedure'
            }, {
                xtype: 'button',
                itemId: 'procedureDetailsButtonItemId',
                iconCls: 'msg-detailsitem',
                iconAlign: 'centre',
                scale: 'small',
                bind: {
                    tooltip: {
                        text: '<div style="text-align:center">{procedureDetailsTooltip}</div>',
                        width: '150'
                    }
                },
                handler: 'onProcedureDetails',
                margin: '5 0 0 10',
                name: 'proceduredetails',
                disabled: true
            }, {
                xtype: 'button',
                itemId: 'procedureDuplicateButtonItemId',
                iconCls: 'msg-duplicateitem',
                iconAlign: 'centre',
                scale: 'small',
                bind: {
                    tooltip: {
                        text: '<div style="text-align:center">{duplicateProcedureTooltip}</div>',
                        width: '150'
                    }
                },
                handler: 'onDuplicateProcedure',
                margin: '5 0 0 10',
                name: 'duplicateprocedure',
                disabled: true
            }, {
                xtype: 'button',
                itemId: 'procedureRemoveButtonItemId',
                iconCls: 'msg-removeitem',
                iconAlign: 'centre',
                scale: 'small',
                bind: {
                    tooltip: {
                        text: '<div style="text-align:center">{removeProcedureTooltip}</div>',
                        width: '150'
                    }
                },
                handler: 'onRemoveProcedure',
                margin: '5 0 0 10',
                name: 'removeprocedure',
                disabled: true
            }]
        }]
    }]
});