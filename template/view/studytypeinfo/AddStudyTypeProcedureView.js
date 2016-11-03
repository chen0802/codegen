Ext.define('Worklist.view.{procedure}.Add{Procedure}{Grid}View', {

    extend: 'Ext.window.Window',

    xtype: 'add{procedure}procedureview',

    requires: [
        'Worklist.view.core.ButtonView',
        'Worklist.view.core.TextView'
    ],

    controller: 'add{procedure}{grid}viewcontroller',
    viewModel: {
        type: 'add{procedure}{grid}viewmodel'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    margin: '10 0 0 0',

    height: 250,
    width: 450,

    modal: true,

    bind: {
        title: '{{grid}Title}'
    },

    defaultFocus: '{grid}NameItemId',

    items:[{
        xtype: 'panel',
        margin: '10 0 0 0',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaults: {
            labelWidth: 80,
            margin: '10 20 0 20'
        },
        items: [{
            xtype: 'coremetasearch{grid}codeview',
            itemId: '{grid}NameItemId',
            name: 'model.name',
            code: 'model.id',
            metasearchDescriptionField: 'description',
            metasearchDescription: 'model.description',
            allowBlank : false,
            bind: {
                value: '{valueFormula}',
                fieldLabel: '{Add{Procedure}{grid}Label}'
            }
        },{
            xtype: 'coretextview',
            itemId: '{grid}DescriptionItemId',
            bind: {
                value: '{model.description}',
                fieldLabel: '{Add{Procedure}{Grid}Description}'
            }
        }, {
            xtype: 'panel',
            margin: '10 0 0 0',
            layout: {
                type: 'hbox',
                padding:'5',
                pack:'center',
                align: 'middle'
            },
            items: [{
                xtype: 'buttonview',
                bind: {
                    text: '{oKButtonText}'
                },
                handler: 'onOK'
            }, {
                xtype: 'buttonview',
                margin: '0 0 0 10',
                bind: {
                    text: '{cancelButtonText}'
                },
                handler: 'onCancel'
            }]
        }]
    }]
});

