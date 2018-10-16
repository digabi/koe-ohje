var searchIdCounter = 0;

function searchResults(searchTerm, hitsMax) {
  var SEARCH_SELECTOR = "h1, h2, h3, th, td";

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
          text = "\\("+text+"\\)";
        }

        if ($(this).attr('id') != undefined) {
          searchResults.push("<li class='search-result-item'><a href='#"+$(this).attr('id')+"' class='search-result-link'>"+text+"</a></li>");
        }
        else {
          var parentId = searchSetRandomID($(this));
          searchResults.push("<li class='search-result-item'><a href='#"+parentId+"' class='search-result-link'>"+text+"</a></li>");
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

function searchFindParentHeading (childNode) {
  var parentNodeId = undefined;
  var prevNode = childNode;

  do {
    prevNode = prevNode.prev();
    console.log(prevNode);
    console.log("lookup: "+prevNode.prop("tagName"));
    if (prevNode.prop("tagName") == "h3") {
      parentNodeId = prevNode.attr("id");
    }
  } while (parentNodeId === undefined);

  console.log(childNode.text()+' finds parent: '+parentNodeId);

  return parentNodeId;
}
