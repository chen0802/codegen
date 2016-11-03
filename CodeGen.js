
/* code generation prototype */

function titleCase(str) {  
  str = str.toLowerCase().split(' ');

  for(var i = 0; i < str.length; i++){
    str[i] = str[i].split('');
    str[i][0] = str[i][0].toUpperCase(); 
    str[i] = str[i].join('');
  }
  return str.join(' ');
}

function saveStringToFile(path, str) {
	var fs = require('fs'), 
		mkdirp = require('mkdirp'),
		getDirName = require('path').dirname;

	mkdirp(getDirName(path), function (err) {
		
		fs.writeFile(path, str, function(err) {
			if(err) {
				return console.log(err);
			}

			console.log(path + " was saved!");
		}); 
	});
	
	/*	
	fs.open(path, 'w+', function(err, data) {
		if (err) {
			console.log("ERROR !! " + err);
		} else {
			fs.write(data, output, 0, 'content length', null, function(err) {
				if (err)
					console.log("ERROR !!! " + err);
				fs.close(output, function() {
					console.log('written success');
				})
			});
		}
	});	
		
	*/
}  

var input = "procedure",
    grid = "",
	grid2 = "",
	createModel = false,
    rootPath = 'src/',
    inputCaptilize = titleCase(input),
	gridCaptilize =  grid? titleCase(grid): '',
	grid2Captilize =  grid2? titleCase(grid2): '',
    input = input.toLowerCase(),
	inputs = input + 's',
	newInput = 'new' + input,
	dupInput = 'dup' + input,
	inputsAction = 'on' + inputCaptilize + 's',
	inputAction =  'on' + inputCaptilize,
	newInputAction = 'onNew' + inputCaptilize,
	dupInputAction = 'onDup' + inputCaptilize,
	inputGrid = input + gridCaptilize,
	inputCaptilizeGrid = inputCaptilize + gridCaptilize,
	inputGrid2 = input + grid2Captilize,
	inputCaptilizeGrid2 = inputCaptilize + grid2Captilize;

	/* Routing files */
	fs = require('fs');
	fs.readFile('template/routing.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
		var filename = input+ '-routing.js',
			path = rootPath + filename,
			output = template.replace(/{procedures}/g, inputs).replace(/{onProcedures}/g, inputsAction).
			   replace(/{procedure}/g, input).replace(/{onProcedure}/g, inputAction).
			   replace(/{newprocedure}/g, newInput).replace(/{onNewProcedure}/g, newInputAction).
			   replace(/{dupprocedure}/g, dupInput).replace(/{onDupProcedure}/g, dupInputAction).
			   replace(/{Procedure}/g, inputCaptilize).
			   replace(/{grid}/g, grid).replace(/{Grid}/g, gridCaptilize).
			   replace(/{grid2}/g, grid2).replace(/{Grid2}/g, grid2Captilize);
	  
		saveStringToFile(path, output);	}
	});

	/* locale strings @ locale\en\strings,  locale\fr\strings*/
	fs.readFile('template/locale_strings.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = input+ '_strings.js',
				pathEn = rootPath + 'locale/en/strings/' + filename,
				pathFr = rootPath + 'locale/fr/strings/' + filename,
				output = template.replace(/{procedures}/g, inputs).replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize);
		  
		    if (grid) {

				var fsGrid = require('fs');
					gridStringsTemplate = fsGrid.readFileSync('template/grid_strings.js', 'utf8');
					gridStrings = gridStringsTemplate.replace(/{procedures}/g, inputs).replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
						replace(/{procedureGrid}/g, inputGrid).replace(/{ProcedureGrid}/g, inputCaptilizeGrid);
					
				if (grid2) {
					gridStrings = gridStrings + gridStringsTemplate.replace(/{procedures}/g, inputs).replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
					replace(/{procedureGrid}/g, inputGrid2).replace(/{ProcedureGrid}/g, inputCaptilizeGrid2);
				}
				//replace macro to build
				output = output.replace(/{proceduregridstrings}/g, gridStrings);

				} else {
				output = output.replace(/{proceduregridstrings}/g, '');
			}
			saveStringToFile(pathEn, output);	
			saveStringToFile(pathFr, output);	
		}
	});
	
    /* model @ app\common\core\model */
	if (createModel) {
		fs.readFile('template/summarymodel.js', 'utf8', function (errors, template) {
			if (errors) {
				console.error(errors); 
			} else {
	  
			var filename = inputCaptilize + 'SummaryModel.js',
				path = rootPath + 'app/common/core/model/' + filename,
				output = template.replace(/{procedures}/g, inputs).
				   replace(/{procedure}/g, input).
				   replace(/{newprocedure}/g, newInput).
				   replace(/{dupprocedure}/g, dupInput).
				   replace(/{Procedure}/g, inputCaptilize);
		  
			saveStringToFile(path, output);	}
		});
		
		fs.readFile('template/model.js', 'utf8', function (errors, template) {
			if (errors) {
				console.error(errors); 
			} else {
	  
			var filename = inputCaptilize + 'Model.js',
				path = rootPath + 'app/common/core/model/' + filename,
				output = template.replace(/{procedures}/g, inputs).replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
					replace(/{procedureGrid}/g, inputGrid).replace(/{ProcedureGrid}/g, inputCaptilizeGrid);
		  
			saveStringToFile(path, output);	}
		});
	}

	
	/* view @ src/classic/src/view*/
	fs.readFile('template/view/duplicatestudytype/DuplicateStudyTypeView.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = 'Duplicate' + inputCaptilize + 'View.js',
				path = rootPath + 'classic/src/view/' + input + '/duplicate'  + input + '/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize);
		  
			saveStringToFile(path, output);	
		}
	});

	fs.readFile('template/view/newstudytype/NewStudyTypeView.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = 'New' + inputCaptilize + 'View.js',
				path = rootPath + 'classic/src/view/' + input + '/new'  + input + '/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize);
		  
			saveStringToFile(path, output);	
		}
	});
	
	/* studytypeinfo */
	fs.readFile('template/view/studytypeinfo/StudyTypeDetailsView.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = inputCaptilize + 'DetailsView.js',
				path = rootPath + 'classic/src/view/' + input + '/' + input + 'info/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
					replace(/{grid}/g, grid).replace(/{Grid}/g, gridCaptilize);
		  
			saveStringToFile(path, output);	
		}
	});
	
	if (grid) {
		gridStringsTemplate = fs.readFileSync('template/view/studytypeinfo/AddStudyTypeProcedureView.js', 'utf8');
	  
		var filename = 'New' + inputCaptilize + gridCaptilize + 'View.js',
			path = rootPath + 'classic/src/view/'  + input + '/' + input + 'info/' + filename,
			output = gridStringsTemplate.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
				replace(/{grid}/g, grid).replace(/{Grid}/g, gridCaptilize)
	  
		saveStringToFile(path, output);	

		if (grid2) {

			filename = 'New' + inputCaptilize + grid2Captilize + 'View.js',
				path = rootPath + 'classic/src/view/'  + input + '/new'  + input + 'info/' + filename,
				output = gridStringsTemplate.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
					replace(/{grid}/g, grid2).replace(/{Grid}/g, grid2Captilize)
		  
			saveStringToFile(path, output);	
		}
	}		
	
	fs.readFile('template/view/studytypelist/StudyTypeListView.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = inputCaptilize + 'ListView.js',
				path = rootPath + 'classic/src/view/' + input + '/'  + input + 'list/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize);
		  
			saveStringToFile(path, output);	
		}
	});
	
	
	/* viewcontroller @ src/app*/
	
	/* duplicatestudytype */
	fs.readFile('template/viewcontroller/duplicatestudytype/view/DuplicateStudyTypeViewController.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = 'Duplicate' + inputCaptilize + 'ViewController.js',
				path = rootPath + 'app/' + input + '/duplicate' + input + '/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize);
		  
			saveStringToFile(path, output);	
		}
	});
	fs.readFile('template/viewcontroller/duplicatestudytype/view/DuplicateStudyTypeViewModel.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = 'Duplicate' + inputCaptilize + 'ViewModel.js',
				path = rootPath + 'app/'  + input + '/duplicate' + input + '/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize);
		  
			saveStringToFile(path, output);	
		}
	});
	/* newstudytype */
	fs.readFile('template/viewcontroller/newstudytype/view/NewStudyTypeViewController.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = 'New' + inputCaptilize + 'ViewController.js',
				path = rootPath + 'app/'  + input + '/new' + input + '/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize);
		  
			saveStringToFile(path, output);	
		}
	});
	fs.readFile('template/viewcontroller/newstudytype/view/NewStudyTypeViewModel.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = 'New' + inputCaptilize + 'ViewModel.js',
				path = rootPath + 'app/'  + input + '/new' + input + '/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize);
		  
			saveStringToFile(path, output);	
		}
	});
	if(grid) {
		gridStringsTemplate = fs.readFileSync('template/viewcontroller/newstudytype/view/AddStudyTypeResourceViewController.js', 'utf8');
	  
		var filename = 'Add' + inputCaptilize + gridCaptilize + 'ViewController.js',
			path = rootPath + 'app/'  + input + '/new' + input + '/' + filename,
			output = gridStringsTemplate.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
				replace(/{grid}/g, grid).replace(/{Grid}/g, gridCaptilize)
	  
		saveStringToFile(path, output);	

		if (grid2) {

			filename = 'Add' + inputCaptilize + grid2Captilize + 'ViewController.js',
			path = rootPath + 'app/'  + input + '/new' + input + '/' + filename,
				output = gridStringsTemplate.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
					replace(/{grid}/g, grid2).replace(/{Grid}/g, grid2Captilize)
		  
			saveStringToFile(path, output);	
		}
	}
	if(grid) {
		gridStringsTemplate = fs.readFileSync('template/viewcontroller/newstudytype/view/AddStudyTypeResourceViewModel.js', 'utf8');
	  
		var filename = 'Add' + inputCaptilize + gridCaptilize + 'ViewModel.js',
			path = rootPath + 'app/'  + input + '/new' + input + '/' + filename,
			output = gridStringsTemplate.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
				replace(/{grid}/g, grid).replace(/{Grid}/g, gridCaptilize)
	  
		saveStringToFile(path, output);	

		if (grid2) {

			filename = 'Add' + inputCaptilize + grid2Captilize + 'ViewModel.js',
			path = rootPath + 'app/'  + input + '/new' + input + '/' + filename,
				output = gridStringsTemplate.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
					replace(/{grid}/g, grid2).replace(/{Grid}/g, grid2Captilize);
		  
			saveStringToFile(path, output);	
		}
	}
	/* studytypeinfo */
	fs.readFile('template/viewcontroller/studytypeinfo/view/StudyTypeViewController.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = inputCaptilize + 'ViewController.js',
				path = rootPath + 'app/' + input + '/' + input + 'info/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
					replace(/{grid}/g, grid2).replace(/{Grid}/g, grid2Captilize);
		  
			saveStringToFile(path, output);	
		}
	});	
	fs.readFile('template/viewcontroller/studytypeinfo/view/StudyTypeViewModel.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = inputCaptilize + 'ViewModel.js',
				path = rootPath + 'app/'+ input + '/'  + input + 'info/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize).
					replace(/{grid}/g, grid2).replace(/{Grid}/g, grid2Captilize);
		  
			saveStringToFile(path, output);	
		}
	});	
	/* studytypelist */
	fs.readFile('template/viewcontroller/studytypelist/store/StudyTypeStore.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = inputCaptilize + 'Store.js',
				path = rootPath + 'app/' + input + '/' + input + 'list/store/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize);
		  
			saveStringToFile(path, output);	
		}
	});	
	fs.readFile('template/viewcontroller/studytypelist/view/StudyTypeListViewController.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = inputCaptilize + 'ListViewController.js',
				path = rootPath + 'app/' + input + '/' + input + 'list/view/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize);
		  
			saveStringToFile(path, output);	
		}
	});	
	fs.readFile('template/viewcontroller/studytypelist/view/StudyTypeListViewModel.js', 'utf8', function (errors, template) {
		if (errors) {
			console.error(errors); 
		} else {
  
			var filename = inputCaptilize + 'ListViewModel.js',
				path = rootPath + 'app/' + input + '/' + input + 'list/view/' + filename,
				output = template.replace(/{procedure}/g, input).replace(/{Procedure}/g, inputCaptilize);
		  
			saveStringToFile(path, output);	
		}
	});	
		
	
	
	
	
	
	
	
	
  
