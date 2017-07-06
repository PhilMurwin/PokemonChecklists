/// <reference path="../../typings/jquery/jquery.d.ts"/>

function GetJsonData(path)
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
		,'error': function(x, y, err) {
			console.log(err);
		}
	});
	
	return json;
}

function BuildMenu(path)
{
	var navbar = $("#navbar");
	
	var dataKey = "menus";
	var dataPath = (path != undefined ? "./" + path + "/" : "") + "data/menu.json";
	var data = GetJsonData(dataPath);
	
	var menu = BuildMenuItems(data[dataKey], path);
	menu = "<ul class='nav navbar-nav'>" + menu + "</ul>";
	navbar.append(menu);
	//console.log(menu);
}

function BuildMenuItems(data, path)
{
	var menuItems = "";
	
	for(var i=0; i < data.length; i++)
	{
		var menuItem = data[i];
		
		if (menuItem["isgroup"] == 1)
		{
			var groupItems = BuildMenuItems(menuItem["menuitems"], path);
			
			var groupItem = "<li class='dropdown'>" +
				"<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>" + menuItem["itemname"] + "<span class='caret'></span></a>" +
				"<ul class='dropdown-menu'>" +
					groupItems +
				"</ul>" +
				"</li>";
			
			menuItems += groupItem;
		}
		else
		{
			var item = "";

			if (menuItem["external"] === undefined)
			{
				var relativePath = path != undefined ? "./" + path + "/" : "";
				item = "<li><a href='" + relativePath + menuItem["link"] + "'>" + menuItem["itemname"] + "</a></li>";
			}
			else
			{
				item = "<li><a href='" + menuItem["link"] + "' target='_blank'>" + menuItem["itemname"] + "</a></li>";
			}
			menuItems += item;
		}
	}
	
	return menuItems;
}