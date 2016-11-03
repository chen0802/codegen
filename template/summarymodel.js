/* global {Procedure}SummaryModel */

Ext.define('Worklist.model.core.{Procedure}SummaryModel', {

    extend: 'Worklist.model.basemodel.BaseModel',

    alternateClassName: ['{Procedure}SummaryModel'],

    requires: [
        'Worklist.model.basemodel.BaseModel'
    ],

    proxy: {
        type: 'memory'
    },
    
    fields: [
        {name: 'id', type: 'number'},
        {name: 'code', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});