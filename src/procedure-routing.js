	//Add into RoutesControllers 
        'Worklist.view.procedures.{Procedures}ListView',
        'Worklist.view.procedures.New{Procedures}View',
        'Worklist.view.procedures.Duplicate{Procedures}View',

		'procedures': {
            before: 'onBefore',
            action: 'onProcedures'
        },
        'procedure/:id': {
            before: 'onBeforeId',
            action: 'onProcedure'
        },
        'newprocedure': {
            before: 'onBefore',
            action: 'onNewProcedure'
        },
        'dupprocedure/:id': {
            before: 'onBeforeId',
            action: 'onDupProcedure'
        },
		
	//Event Handlers	

    onProcedures: function() {

        this.createView('Worklist.view.procedure.ProcedureListView', Worklist.main_strings.strings.procedure);
    },

    onProcedure: function(id) {
        var me = this,
	        view = me.createView('Worklist.view.procedure.ProcedureDetailsView', Worklist.main_strings.strings.procedure);

        view.getViewModel().loadModel(id, view).then(
            function (record) {
                me.setTitle(Worklist.main_strings.strings.procedure);
            },
            function (errorMsg) {
                Worklist.ApplicationGlobals.setAlarm(errorMsg);
            }
        );
    },

    onNewProcedure: function() {

        var view = this.createView('Worklist.view.procedure.NewProcedureView');
        this.setTitle(Worklist.main_strings.strings.procedure);
        view.getViewModel().createNewModel(view);
    },

    onDupProcedure: function(id) {

        var me = this,
            view = this.createView('Worklist.view.procedure.DuplicateProcedureView');

        view.getViewModel().loadModel(id, view).then(
            function (record) {
                me.setTitle(Worklist.main_strings.strings.procedure);
            },
            function (errorMsg) {
                Worklist.ApplicationGlobals.setAlarm(errorMsg);
            }
        );
    },

	// Add into MainModel routes
	
            procedures: {
                dirtychange: false,
                name: 'procedures'
            },
            procedure: {
                dirtychange: false,
			    name: 'Procedure'
            },
            newprocedure: {
                dirtychange: false,
                name: 'New Procedure'
            },
            dupprocedure: {
                dirtychange: false,
                name: 'Duplicate Procedure'
            },
	// Do not forget to add newly created viewmodel, viewcontroller into app.js then build again
        'Worklist.view.procedure.ProcedureViewModel',
        'Worklist.view.procedure.NewProcedureViewModel',
        //'Worklist.view.procedure.AddProcedureViewModel',
        //'Worklist.view.procedure.AddProcedureViewModel',
        'Worklist.view.procedure.DuplicateProcedureViewModel',	
		
		
        'Worklist.view.procedure.NewProcedureViewController',
        'Worklist.view.procedure.DuplicateProcedureViewController',
        'Worklist.view.procedure.ProcedureViewController',
        'Worklist.view.procedure.ProcedureListViewController',

        //'Worklist.view.procedure.AddStudyTypeProcedureViewController',
        //'Worklist.view.procedure.AddStudyTypeResourceViewController',
		
        'Worklist.procedure.store.ProcedureStore',
		