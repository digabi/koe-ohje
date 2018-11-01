var searchIdCounter = 0;

function searchResults(searchTerm, hitsMax) {
  var SEARCH_SELECTOR = "h1, h2, h3, th, td, p, li:not(.toc-list-item, .search-result-item)";
  var SEARCH_RESULT_MAXLENGTH = 60;

  var searchResults = [];

  if (searchTerm == "") {
    return "";
  }

  searchTerm = searchTerm.toLowerCase();

  $(SEARCH_SELECTOR).each(
    function(n) {
      if ($(this).text().toLowerCase().indexOf(searchTerm) > -1) {
        var text = $(this).text();
        if (text.indexOf("\\") > -1) {
          // This is a formula
          //text = "\\("+text+"\\)";
          // Get the block containing the formula in rendered form
          text = $(this).html();
        }
        else if (text.length > SEARCH_RESULT_MAXLENGTH) {
          // Cut long strings
          text = text.substring(0, SEARCH_RESULT_MAXLENGTH-3) + "...";
        }

        var resultPrefix = ""		
		if( $(this).context.tagName=="H2" || $(this).context.tagName=="H3" ){
		  resultPrefix = " \u2261 ";
		}

        if ($(this).attr('id') != undefined) {
          searchResults.push("<li class='search-result-item'>"+resultPrefix+"<a href='#"+$(this).attr('id')+"' class='search-result-link'>"+text+"</a></li>");
        }
        else {
          var parentId = searchSetRandomID($(this));
          searchResults.push("<li class='search-result-item'>"+resultPrefix+"<a href='#"+parentId+"' class='search-result-link'>"+text+"</a></li>");
        }

        if (searchResults.length > hitsMax) {
          // We have reached the number of maximum hits
          return false;
        }
      }
    }
  );

  if (searchResults.length == 0) {
    return "";
  }

  return searchResults.join("");
}

function searchSetRandomID(childNode) {
  var id = "searchResult"+searchIdCounter;

  childNode.attr("id", id);
  searchIdCounter++;

  return id;
}
