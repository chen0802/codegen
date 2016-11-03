
Ext.define('Worklist.view.{procedure}.New{Procedure}ViewModel', {
    
    extend: 'Worklist.view.{procedure}.{Procedure}ViewModel',

    alias: 'viewmodel.new{procedure}viewmodel',

    requires: [
        'Worklist.view.{procedure}.{Procedure}ViewModel'
    ],

    createNewModel: function(view) {
        var me = this,
            model = Ext.create('Worklist.model.core.{Procedure}Model', {
            id: 0
            });

        me.set('model', model);
        view.getController().bindNewModel(model);
        return me.model;
    }

});