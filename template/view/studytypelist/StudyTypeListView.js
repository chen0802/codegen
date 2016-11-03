
Ext.define('Worklist.view.{procedure}.{Procedure}ListView', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Worklist.view.core.MetaSearchImagingFacilityView',
        'Worklist.view.{procedure}.{Procedure}ListViewController'
    ],

    xtype: '{procedure}listview',

    controller: '{procedure}listviewcontroller',

    scrollable: 'y',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    viewModel: {
        type: '{procedure}listviewmodel'
    },

    margin: '20 0 0 0',

    defaults: {
        margin: '10 0 0 10'
    },

    items: [{
        xtype: 'form',
        title: 'Search',
        layout: 'hbox',
        reference: '{procedure}SearchPanel',

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
                fieldLabel: '{{procedure}ListCode}'
            },
            listeners: [{
                change: 'on{Procedure}SearchChange'
            }]
        }, {
            xtype: 'coretextview',
            inputType: 'search',
            name: 'description',
            labelWidth: 80,
            flex: 2,
            bind: {
                fieldLabel: '{{procedure}Description}'
            },
            listeners: [{
                change: 'on{Procedure}SearchChange'
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
            bind: '{{procedure}Msg}'
        },
        defaults: {
            margin: '10 0 0 0'
        },

        items: [{
            xtype: 'gridpanel',
            itemId: '{procedure}GridItemId',
            reference: '{procedure}ListGrid',
            flex: 8,

            columns: [
                { xtype: 'rownumberer' },
                { text: '{Procedure} Id', dataIndex: 'id', hideable: false, hidden: true },
                { text: 'Code', dataIndex: 'code', align: 'left', flex: 0.5},
                { text: 'Description', dataIndex: 'description', align: 'left', flex: 4, formatter: 'uppercase()'}],

            listeners: {
                select: 'on{Procedure}ItemSelected',
                rowdblclick: 'on{Procedure}RowDoubleClick'
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
                    tooltip: '{new{Procedure}Tooltip}'
                },
                handler: 'onAdd{Procedure}',
                margin: '0 0 0 10',
                name: 'add{procedure}'
            }, {
                xtype: 'button',
                itemId: '{procedure}DetailsButtonItemId',
                iconCls: 'msg-detailsitem',
                iconAlign: 'centre',
                scale: 'small',
                bind: {
                    tooltip: {
                        text: '<div style="text-align:center">{{procedure}DetailsTooltip}</div>',
                        width: '150'
                    }
                },
                handler: 'on{Procedure}Details',
                margin: '5 0 0 10',
                name: '{procedure}details',
                disabled: true
            }, {
                xtype: 'button',
                itemId: '{procedure}DuplicateButtonItemId',
                iconCls: 'msg-duplicateitem',
                iconAlign: 'centre',
                scale: 'small',
                bind: {
                    tooltip: {
                        text: '<div style="text-align:center">{duplicate{Procedure}Tooltip}</div>',
                        width: '150'
                    }
                },
                handler: 'onDuplicate{Procedure}',
                margin: '5 0 0 10',
                name: 'duplicate{procedure}',
                disabled: true
            }, {
                xtype: 'button',
                itemId: '{procedure}RemoveButtonItemId',
                iconCls: 'msg-removeitem',
                iconAlign: 'centre',
                scale: 'small',
                bind: {
                    tooltip: {
                        text: '<div style="text-align:center">{remove{Procedure}Tooltip}</div>',
                        width: '150'
                    }
                },
                handler: 'onRemove{Procedure}',
                margin: '5 0 0 10',
                name: 'remove{procedure}',
                disabled: true
            }]
        }]
    }]
});