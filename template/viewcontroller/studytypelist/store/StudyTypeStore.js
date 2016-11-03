
Ext.define('Worklist.{procedure}.store.{Procedure}Store', {

    extend: 'Ext.data.Store',

    alias: 'store.{procedure}store',

    requires: [
        'Worklist.model.core.{Procedure}SummaryModel'
    ],

    model: 'Worklist.model.core.{Procedure}SummaryModel'

});