
Ext.define('Worklist.{procedure}_strings', {
    statics: {
        strings: {
            // {procedure} list
            delete{Procedure}Msg: 'Are you sure you want to delete {procedure} "{0}" ?',
            failedDelete{Procedure}Msg: 'Could not delete {procedure} "{0}" !',
            update{Procedure}SucceedMsg: 'Successfully updated {procedure} with id:',
            add{Procedure}SucceedMsg: 'Successfully created new {procedure} with id:',

            // {procedure} details
            {procedure}Msg: '{Procedure}',
            new{Procedure}Tooltip: 'New {Procedure}',
            detail{Procedure}Tooltip: '{Procedure} Details',
            duplicate{Procedure}Tooltip: 'Duplicate {Procedure}',
            remove{Procedure}Tooltip: 'Remove {Procedure}',

			{proceduregridstrings}
			
            oKButtonText: 'Ok',
            cancelButtonText: 'Cancel'
            
        }
    }
});

