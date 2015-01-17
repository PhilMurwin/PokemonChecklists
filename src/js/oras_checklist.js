var binKey = "oraspost";

function GetChecklistData(path)
{
	var json = null;
	$.ajax({
		'async': false,
		'global': false,
		'url': path,
		'dataType': "json",
		'success': function(data) {
			json = data;
		}
	});
	
	return json;
}

function Render()
{
	var oras = GetChecklistData("data/oras_postgame_checklist.json");

	var chkIndex = 0;
	
	for(var t=0; t < oras.oras.length; t++)
	{
		chkIndex++;
		
		var task = oras.oras[t];
		var divTask = $("<div class='task'></div>")
		
		var targetID = "#row" + task.row;
		if (task.col !== undefined)
		{
			targetID +=  " > #col" + task.col;
		}
		var targetDiv = $(targetID);
		
		//Build Task checkbox
		var chk = BuildCheckbox(chkIndex, task);
		divTask.html(chk);				
		
		// Check for subtasks
		divTask = RenderSubTasks(divTask, chkIndex, task);
		
		targetDiv.append(divTask);
	}
}

function RenderSubTasks(divTask, chkIndex, task)
{
	var id = task.id;
	
	if (task.subtasks !== undefined)
	{
		var subtasks = task.subtasks;
	
		// Should these subtasks be split into multiple columns?
		var splitCols = 1;
		if (task.splitCol !== undefined)
		{
			splitCols = task.splitCol;			
			subtasks = sortByKey( subtasks, "task" );
		}
		
		var maxRowCount = subtasks.length / splitCols;
		
		var rowCount = 0;
		var targetCol = $("<div class='col-md-x'></div>");
		for(var t=0; t < subtasks.length; t++)
		{
			chkIndex++;
			
			var subtask = subtasks[t];
			subtask.parentid = id;
			divSubtask = $("<div class='subtask'></div>")
			
			//Build Task checkbox
			var chk = BuildCheckbox(chkIndex, subtask);
			divSubtask.html(chk);
			divTask.append(divSubtask);
		}
	}
	
	return divTask;
}

function BuildCheckbox(chkIndex, task)
{
	var id = task.id;
	var parentid = task.parentid;
	
	if (parentid !== undefined)
	{
		id = parentid + id;
	}
	
	var text = task.task;
	var formats = task.formats;
	var tasktip = task.tooltip;
	var tooltip = "";
	
	if (task.tooltip !== undefined)
	{
		tooltip = "title=\"" + tasktip + "\""
	}
	
	var formattedText = text;
	if (formats !== undefined)
	{
		formattedText = FormatText(formattedText, formats);
	}

	var chkValue = Retrieve(id);
	var checked = chkValue !== null && chkValue ? "checked" : "";
	var chk = $("<label class=\"oras_chkLabel\"" + tooltip + "for='" + id + "'><input class=\"oras_chk\" type='checkbox' id='" + id + "' " + checked + " />" + formattedText + "</label>");
	
	return chk;
}

function FormatText(text, formats)
{
	if (formats !== undefined)
	{
		for(f = 0; f < formats.length; f++)
		{
			var all = formats[f].all;
			var word = formats[f].word;
			var format = formats[f].format;
			
			if (word !== undefined && word.length > 0)
			{
				text = text.replace(word,"<span class='" + format + "'>" + word + "</span>");
			}
			else if (all !== undefined && all.length > 0)
			{
				text = "<span class='" + all + "'>" + text + "</span>";
			}
		}
	}
	
	return text;
}

function sortByKey(array, key)
{
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function SaveCheckboxState(e)
{
	var id = e.target.id;
	var key = binKey + id;
	
	if ( e.target.checked )
	{
		localStorage.setItem(key, true);
	}
	else
	{
		localStorage.removeItem(key);
	}
}


function Retrieve(id)
{
	var key = binKey + id;
	return localStorage.getItem( key );
}

function ResetAll()
{
	// Reset all local store keys with binKey
	var orasKeys = []; // Array to hold the keys
	// Iterate over localStorage and insert the keys that meet the condition into orasKeys
	for (var i = 0; i < localStorage.length; i++)
	{
		if (localStorage.key(i).indexOf(binKey) > -1)
		{
			orasKeys.push(localStorage.key(i));
		}
	}

	// Iterate over orasKeys and remove the items by key
	for (var i = 0; i < orasKeys.length; i++)
	{
		localStorage.removeItem(orasKeys[i]);
	}
	
	// Reload the page
	location.reload(true);
}