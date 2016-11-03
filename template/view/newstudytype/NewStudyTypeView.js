
Ext.define('Worklist.view.{procedure}.New{Procedure}View', {

    extend: 'Worklist.view.{procedure}.{Procedure}DetailsView',

    requires: [
        'Worklist.view.{procedure}.{Procedure}DetailsView'
    ],

    controller: 'new{procedure}viewcontroller',

    viewModel: {
        type: 'new{procedure}viewmodel'
    }

});


