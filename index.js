function InitializeHome()
{
	var btns = $("button.card-collapse");

	// Find all the collapse btns
	for(var i=0; i < btns.length; i++)
	{
		var btn = btns[i];

		// Add click event to collapse btn
		$(btn).on("click", function(e) {
			collapse_onClick(e);
		});
	}
}

function collapse_onClick(e)
{
	var link = e.currentTarget;
	var panelID = link.getAttribute("href");

	// This event fires before "in" has been removed
	// so if it has "in" it's about to be removed and the panel hidden
	if($(panelID).hasClass('collapse show'))
	{
		// About to hide
		SetCollapseState(link, true);
	}
	else
	{
		// About to show
		SetCollapseState(link, false);
	}
}

function SetCollapseState(link, isCollapsed)
{
	var ctrl = $(link).children("i");

	if (isCollapsed)
	{
		ctrl.removeClass("fa-chevron-up").addClass("fa-chevron-down");
	}
	else
	{
		ctrl.removeClass("fa-chevron-down").addClass("fa-chevron-up");
	}
}
