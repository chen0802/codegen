	//Add into RoutesControllers 
        'Worklist.view.{procedures}.{Procedures}ListView',
        'Worklist.view.{procedures}.New{Procedures}View',
        'Worklist.view.{procedures}.Duplicate{Procedures}View',

		'{procedures}': {
            before: 'onBefore',
            action: '{onProcedures}'
        },
        '{procedure}/:id': {
            before: 'onBeforeId',
            action: '{onProcedure}'
        },
        '{newprocedure}': {
            before: 'onBefore',
            action: '{onNewProcedure}'
        },
        '{dupprocedure}/:id': {
            before: 'onBeforeId',
            action: '{onDupProcedure}'
        },
		
	//Event Handlers	

    {onProcedures}: function() {

        this.createView('Worklist.view.{procedure}.{Procedure}ListView', Worklist.main_strings.strings.{procedure});
    },

    {onProcedure}: function(id) {
        var me = this,
	        view = me.createView('Worklist.view.{procedure}.{Procedure}DetailsView', Worklist.main_strings.strings.{procedure});

        view.getViewModel().loadModel(id, view).then(
            function (record) {
                me.setTitle(Worklist.main_strings.strings.{procedure});
            },
            function (errorMsg) {
                Worklist.ApplicationGlobals.setAlarm(errorMsg);
            }
        );
    },

    {onNewProcedure}: function() {

        var view = this.createView('Worklist.view.{procedure}.New{Procedure}View');
        this.setTitle(Worklist.main_strings.strings.{procedure});
        view.getViewModel().createNewModel(view);
    },

    {onDupProcedure}: function(id) {

        var me = this,
            view = this.createView('Worklist.view.{procedure}.Duplicate{Procedure}View');

        view.getViewModel().loadModel(id, view).then(
            function (record) {
                me.setTitle(Worklist.main_strings.strings.{procedure});
            },
            function (errorMsg) {
                Worklist.ApplicationGlobals.setAlarm(errorMsg);
            }
        );
    },

	// Add into MainModel routes
	
            {procedures}: {
                dirtychange: false,
                name: '{procedures}'
            },
            {procedure}: {
                dirtychange: false,
			    name: '{Procedure}'
            },
            {newprocedure}: {
                dirtychange: false,
                name: 'New {Procedure}'
            },
            {dupprocedure}: {
                dirtychange: false,
                name: 'Duplicate {Procedure}'
            },
	// Do not forget to add newly created viewmodel, viewcontroller into app.js then build again
        'Worklist.view.{procedure}.{Procedure}ViewModel',
        'Worklist.view.{procedure}.New{Procedure}ViewModel',
        //'Worklist.view.{procedure}.Add{Procedure}{Grid}ViewModel',
        //'Worklist.view.{procedure}.Add{Procedure}{Grid2}ViewModel',
        'Worklist.view.{procedure}.Duplicate{Procedure}ViewModel',	
		
		
        'Worklist.view.{procedure}.New{Procedure}ViewController',
        'Worklist.view.{procedure}.Duplicate{Procedure}ViewController',
        'Worklist.view.{procedure}.{Procedure}ViewController',
        'Worklist.view.{procedure}.{Procedure}ListViewController',

        //'Worklist.view.{procedure}.AddStudyTypeProcedureViewController',
        //'Worklist.view.{procedure}.AddStudyTypeResourceViewController',
		
        'Worklist.{procedure}.store.{Procedure}Store',
		