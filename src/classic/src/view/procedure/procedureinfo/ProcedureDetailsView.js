Ext.define('Worklist.view.procedure.ProcedureDetailsView', {
    extend: 'Ext.form.Panel',
    requires: ['Worklist.view.procedure.ProcedureViewController'],
    scrollable: 'y',
    controller: 'procedureviewcontroller',
    viewModel: {
        type: 'procedureviewmodel'
    },
    items: [{
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            margin: '10, 0, 10, 10',
            xtype: 'panel',
            title: 'Procedure',
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
                        boxLabel: '{procedureActive}'
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
                    name: 'procedureDesc',
                    bind: {
                        value: '{model.description}',
                        fieldLabel: '{procedureDescription}'
                    },
                    flex: 1
                }]
            }]
        }, {
            xtype: 'panel',
            title: '',
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
                itemId: 'Grid',
                flex: 6,
                columns: [{
                    text: 'ID',
                    dataIndex: 'id',
                    hidden: true
                }, {
                    bind: {
                        text: '{procedureDetailsGridCode}'
                    },
                    dataIndex: 'procedureCode',
                    align: 'left',
                    flex: 1
                }, {
                    bind: {
                        text: '{procedureDetailsGridDescription}'
                    },
                    dataIndex: 'description',
                    align: 'left',
                    flex: 3
                }],
                listeners: {
                    select: 'onProcedureItemSelected',
                    rowdblclick: 'onProcedureRowDoubleClick'
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
                        tooltip: '{newProcedureTooltip}'
                    },
                    handler: 'onAddProcedure',
                    margin: '0 0 0 10'
                }, {
                    xtype: 'button',
                    itemId: 'procedureDetailsButton',
                    iconCls: 'msg-detailsitem',
                    iconAlign: 'centre',
                    scale: 'small',
                    bind: {
                        tooltip: {
                            text: '<div style="text-align:center">{procedureDetailsTooltip}</div>',
                            width: '100'
                        }
                    },
                    handler: 'onProcedureDetails',
                    margin: '5 0 0 10',
                    name: 'proceduredetails',
                    disabled: true
                }, {
                    xtype: 'button',
                    iconCls: 'msg-removeitem',
                    iconAlign: 'centre',
                    scale: 'small',
                    bind: {
                        tooltip: {
                            text: '{removeProcedureTooltip}',
                            width: '100'
                        }
                    },
                    handler: 'onRemoveProcedure',
                    itemId: 'procedureRemoveButton',
                    margin: '5 0 0 10',
                    disabled: true
                }]
            }]
        }]
    }]
});
