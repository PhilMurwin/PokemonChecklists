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

	var col1 = $("#col1");
	var col2 = $("#col2");
	
	var chkIndex = 0;
	
	for(var t=0; t < oras.oras.length; t++)
	{
		chkIndex++;
		
		var task = oras.oras[t];
		var divTask = $("<div class='task'></div>")
		var targetCol = col1;
		
		if (task.col === 2)
		{
			targetCol = col2;					
		}
		
		//Build Task checkbox
		var chk = BuildCheckbox(chkIndex, task);
		divTask.html(chk);				
		
		// Check for subtasks
		divTask = RenderSubTasks(divTask, chkIndex, task);
		
		targetCol.append(divTask);
	}
}

function RenderSubTasks(divTask, chkIndex, task)
{
	var id = task.id;
	
	if (task.subtasks !== undefined)
	{
		for(var t=0; t < task.subtasks.length; t++)
		{
			chkIndex++;
			
			var subtask = task.subtasks[t];
			subtask.parentid = id;
			divSubtask = $("<div class='subtask'></div>")
			
			if (subtask.subcol !== undefined)
			{
				divSubtask.class('subtaskcol');
			}
			
			//Build Task checkbox
			var chk = BuildCheckbox(chkIndex, subtask);
			divSubtask.html(chk);
			divTask.append(divSubtask);
			
			// Check for subtasks
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
	
	var formattedText = text;
	if (formats !== undefined)
	{
		formattedText = FormatText(formattedText, formats);
	}

	var chkValue = Retrieve(id);
	var checked = chkValue !== null && chkValue ? "checked" : "";
	var chk = $("<label for='" + id + "'><input class=\"oras_chk\" type='checkbox' id='" + id + "' " + checked + " />" + formattedText + "</label>");
	
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