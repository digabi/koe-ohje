function sameHeights(selector) {
	// Loop over given tables
	$(selector).each(function(index) {
		$(this).find("tr").each(function(index) {
			// Look for max row height
			var max_height = 0;
			$(this).children("td").each(function(index) {
				if ($(this).height() > max_height) {
					max_height = $(this).height();
				}
			});
			// Set row height for all elements in this row
			$(this).children("td").each(function(index) {
				$(this).height(max_height);
			});
		})
	});
}

function setSameHeights () {
	// Formula tables
	sameHeights(".formulae");
}

if ('addEventListener' in window) {
	window.addEventListener('resize', function(){
		setSameHeights();
	});
	window.addEventListener('load', function(){
		setSameHeights();
	});
}

// Call setSameHeights() when MathJax typesetting is finished
MathJax.Hub.Register.StartupHook("End",function () {
	console.log("MathJax is ready");
	$('#loading').hide();
});