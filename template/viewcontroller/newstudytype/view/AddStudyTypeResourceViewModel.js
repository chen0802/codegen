
Ext.define('Worklist.view.{procedure}.Add{Procedure}{Grid}ViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.add{procedure}{grid}viewmodel',

    requires: [
        'Worklist.model.core.{Grid}SummaryModel'
    ],

    links: {
        model: {
            type: 'Worklist.model.core.{Grid}SummaryModel',
            id: 1
        }
    },

    data: {
    }

});