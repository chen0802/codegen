/* global {Procedure}Model */

Ext.define('Worklist.model.core.{Procedure}Model', {

    extend: 'Worklist.model.basemodel.BaseModel',

    alternateClassName: ['{Procedure}Model'],

    requires: [
        'Worklist.model.basemodel.BaseModel',
        'Worklist.model.core.{ProcedureGrid}SummaryModel'
    ],

    fields: [
        {name: 'id', type: 'number'},
        {name: 'description', type: 'string'}
    ],

    hasMany: [{
        model: 'Worklist.model.core.{ProcedureGrid}SummaryModel',
        name: '{procedureGrid}s',
        associationKey: '{procedureGrid}s'
    }],

    validators: {
        description: 'presence'
    },

    constructor: function() {

        this.callParent(arguments);
        this.setPostfixUrl('fhir/{Procedure}/');
    }
});