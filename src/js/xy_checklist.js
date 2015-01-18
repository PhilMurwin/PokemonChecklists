var binKey = "xypost";

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
	var xy = GetChecklistData("data/xy_postgame_checklist.json");

	var chkIndex = 0;
	
	for(var t=0; t < xy.xy.length; t++)
	{
		chkIndex++;
		
		var task = xy.xy[t];
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
		var x = Math.floor(12 / splitCols);
		var colDiv = "<div class='col-sm-" + x + "'></div>";
		var targetCol = $(colDiv);
		
		for(var t=0; t < subtasks.length; t++)
		{
			rowCount++;
			chkIndex++;
			
			var subtask = subtasks[t];
			subtask.parentid = id;
			divSubtask = $("<div class='subtask'></div>")
			
			//Build Task checkbox
			var chk = BuildCheckbox(chkIndex, subtask);
			divSubtask.html(chk);
			targetCol.append(divSubtask);
			
			if (rowCount >= maxRowCount)
			{
				divTask.append(targetCol);
				rowCount = 0;
				var targetCol = $(colDiv);
			}
		}
		
		if (rowCount > 0)
		{
			divTask.append(targetCol);
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
	var chk = $("<label class=\"postgame_chkLabel\"" + tooltip + "for='" + id + "'><input class=\"postgame_chk\" type='checkbox' id='" + id + "' " + checked + " />" + formattedText + "</label>");
	
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

function startsWith(str, start)
{	
	return str.slice(0, start.length) == start;
}

function chk_onClick(e)
{
	var id = e.target.id;
	
	markSubtasks(id);
	
	SaveCheckboxState(id);
}

function SaveCheckboxState(id)
{
	var key = binKey + id;
	
	if ( $("#"+id).is(":checked"))
	{
		localStorage.setItem(key, true);
	}
	else
	{
		localStorage.removeItem(key);
	}
}

function markSubtasks(taskid)
{
	if (startsWith(taskid, "task"))
	{
		var taskState = $("#"+taskid).is(":checked");
		var subtasks = $("#"+taskid).closest(".task").find(".subtask");
		
		if (subtasks !== undefined || subtasks !== null)
		{
			for(var s=0; s < subtasks.length; s++)
			{
				var chk = $(subtasks[s]).find(".postgame_chk");
				chk.prop('checked', taskState);
				
				SaveCheckboxState(chk.attr("id"));
			}
		}
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
	var xyKeys = []; // Array to hold the keys
	// Iterate over localStorage and insert the keys that meet the condition into xyKeys
	for (var i = 0; i < localStorage.length; i++)
	{
		if (localStorage.key(i).indexOf(binKey) > -1)
		{
			xyKeys.push(localStorage.key(i));
		}
	}

	// Iterate over xyKeys and remove the items by key
	for (var i = 0; i < xyKeys.length; i++)
	{
		localStorage.removeItem(xyKeys[i]);
	}
	
	// Reload the page
	location.reload(true);
}