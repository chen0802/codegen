
Ext.define('Worklist.view.procedure.NewProcedureViewModel', {
    
    extend: 'Worklist.view.procedure.ProcedureViewModel',

    alias: 'viewmodel.newprocedureviewmodel',

    requires: [
        'Worklist.view.procedure.ProcedureViewModel'
    ],

    createNewModel: function(view) {
        var me = this,
            model = Ext.create('Worklist.model.core.ProcedureModel', {
            id: 0
            });

        me.set('model', model);
        view.getController().bindNewModel(model);
        return me.model;
    }

});