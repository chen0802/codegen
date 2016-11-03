Ext.define('Worklist.view.{procedure}.{Procedure}DetailsView', {
    extend: 'Ext.form.Panel',
    requires: ['Worklist.view.{procedure}.{Procedure}ViewController'],
    scrollable: 'y',
    controller: '{procedure}viewcontroller',
    viewModel: {
        type: '{procedure}viewmodel'
    },
    items: [{
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            margin: '10, 0, 10, 10',
            xtype: 'panel',
            title: '{Procedure}',
            collapsible: true,
            defaults: {
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                }
            },
            items: [{
                //line 0
                defaults: {
                    labelAlign: 'top',
                    margin: '10 0 0 10'
                },
                items: [{
                    xtype: 'corecheckboxview',
                    name: 'active',
                    itemId: 'activeItemId',
                    bind: {
                        value: '{model.active}',
                        boxLabel: '{{procedure}Active}'
                    }
                }]
            }, {
                //line 1
                defaults: {
                    labelAlign: 'top',
                    margin: '10 0 0 10'
                },
                flex: 12,
                items: [{
                    xtype: 'coretextview',
                    name: '{procedure}Desc',
                    bind: {
                        value: '{model.description}',
                        fieldLabel: '{{procedure}Description}'
                    },
                    flex: 1
                }]
            }]
        }, {
            xtype: 'panel',
            title: '{Grid}',
            margin: '0, 0, 10, 10',
            collapsible: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 1,
            items: [{
                margin: '10 10 20 0',
                xtype: 'gridpanel',
                itemId: '{grid}Grid',
                flex: 6,
                columns: [{
                    text: 'ID',
                    dataIndex: 'id',
                    hidden: true
                }, {
                    bind: {
                        text: '{{procedure}Details{Grid}GridCode}'
                    },
                    dataIndex: 'procedureCode',
                    align: 'left',
                    flex: 1
                }, {
                    bind: {
                        text: '{{procedure}Details{Grid}GridDescription}'
                    },
                    dataIndex: 'description',
                    align: 'left',
                    flex: 3
                }],
                listeners: {
                    select: 'on{Procedure}{Grid}ItemSelected',
                    rowdblclick: 'on{Procedure}{Grid}RowDoubleClick'
                }
            }, {
                margin: '10 10 20 0',
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
                        tooltip: '{new{Procedure}{Grid}Tooltip}'
                    },
                    handler: 'onAdd{Procedure}{Grid}',
                    margin: '0 0 0 10'
                }, {
                    xtype: 'button',
                    itemId: '{procedure}{Grid}DetailsButton',
                    iconCls: 'msg-detailsitem',
                    iconAlign: 'centre',
                    scale: 'small',
                    bind: {
                        tooltip: {
                            text: '<div style="text-align:center">{{procedure}{Grid}DetailsTooltip}</div>',
                            width: '100'
                        }
                    },
                    handler: 'on{Procedure}{Grid}Details',
                    margin: '5 0 0 10',
                    name: '{procedure}{grid}details',
                    disabled: true
                }, {
                    xtype: 'button',
                    iconCls: 'msg-removeitem',
                    iconAlign: 'centre',
                    scale: 'small',
                    bind: {
                        tooltip: {
                            text: '{remove{Procedure}{Grid}Tooltip}',
                            width: '100'
                        }
                    },
                    handler: 'onRemove{Procedure}{Grid}',
                    itemId: '{procedure}{Grid}RemoveButton',
                    margin: '5 0 0 10',
                    disabled: true
                }]
            }]
        }]
    }]
});
