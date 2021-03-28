/// <reference path="../../typings/jquery/jquery.d.ts"/>

var menuObj = menuObj || {};
menuObj.path = "";

function BuildMenu(path)
{
	menuObj.path = path;
	var dataPath = (path != undefined ? "./" + path + "/" : "") + "data/menu.json";
	GetJsonData(dataPath);
}

function GetJsonData(datapath)
{
	$.ajax({
		//'async': false,
		'global': false,
		'url': datapath,
		'dataType': "json",
		'success': function(data) {
			BuildNav(data);
		}
		,'error': function(x, y, err) {
			console.log(err);
		}
	});
}

function BuildNav(data)
{
	var navbar = $("#pkmnNav");
	var dataKey = "menus";

	var menu = BuildMenuItems(data[dataKey], menuObj.path);
	menu = "<ul class='navbar-nav mr-auto'>" + menu + "</ul>";
	navbar.append(menu);
}

function BuildMenuItems(data, path, ingroup)
{
	var menuItems = "";
	
	for(var i=0; i < data.length; i++)
	{
		var menuItem = data[i];
		
		if (menuItem["isgroup"] == 1)
		{
			var groupItems = BuildMenuItems(menuItem["menuitems"], path, true);
			
			var groupItem = "<li class='nav-item dropdown'>" +
				"<a class='nav-link dropdown-toggle' href='#' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>" + menuItem["itemname"] + "</a>" +
				"<div class='dropdown-menu bg-dark'>" +
					groupItems +
				"</div>" +
				"</li>";
			
			menuItems += groupItem;
		}
		else
		{
			var item = "";

			if (menuItem["hidden"] === true)
			{
				continue;
			}

			var linkclass = ingroup ? "dropdown-item nav-link" : "nav-link";

			if (menuItem["itemname"].toLowerCase() === "separator")
			{
				item = "<div role='separator' class='dropdown-divider'></div>";
			}
			else if (menuItem["external"] === undefined)
			{
				var relativePath = path != undefined ? "./" + path + "/" : "";
				item = "<a class='"+linkclass+"' href='" + relativePath + menuItem["link"] + "'>" + menuItem["itemname"] + "</a>";
			}
			// Create External Link, assumed to be in a dropdown
			else
			{
				item = "<a class='"+linkclass+"' href='" + menuItem["link"] + "' target='_blank'>" + menuItem["itemname"] + "</a>";
			}
			menuItems += item;
		}
	}
	
	return menuItems;
}