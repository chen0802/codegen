
Ext.define('Worklist.view.{procedure}.Duplicate{Procedure}View', {

    extend: 'Worklist.view.{procedure}.{Procedure}DetailsView',

    requires: [
        'Worklist.view.{procedure}.{Procedure}DetailsView'
    ],

    controller: 'duplicate{procedure}viewcontroller',

    viewModel: {
        type: 'duplicate{procedure}viewmodel'
    }

});


