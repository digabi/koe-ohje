function sameHeights(selector) {
	console.log("sameHeights started");
	// Loop over given tables
	$(selector).each(function(index) {
		$("tr").each(function(index) {
			// Look for max row height
			var max_height = 0;
			$("td").each(function(index) {
				if ($(this).height() > max_height) {
					max_height = $(this).height();
				}
			});
			// Set row height for all elements in this row
			$("td").each(function(index) {
				$(this).height(max_height);
			});
		})
	});
	console.log("sameHeights ended");
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
	setSameHeights();
	$('#loading').hide();
});