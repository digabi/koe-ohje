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
    function (n) {
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
          text = text.substring(0, SEARCH_RESULT_MAXLENGTH - 3) + "...";
        }

        var resultPrefix = ""
        if ($(this).context.tagName == "H2" || $(this).context.tagName == "H3") {
          resultPrefix = " \u2261 ";
        }

        if ($(this).attr('id') != undefined) {
          searchResults.push("<li class='search-result-item'>" + resultPrefix + "<a href='#" + $(this).attr('id') + "' class='search-result-link'>" + text + "</a></li>");
        }
        else {
          var parentId = searchSetRandomID($(this));
          searchResults.push("<li class='search-result-item'>" + resultPrefix + "<a href='#" + parentId + "' class='search-result-link'>" + text + "</a></li>");
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
  var id = "searchResult" + searchIdCounter;

  childNode.attr("id", id);
  searchIdCounter++;

  return id;
}

function updateSearch () {
  var searchResultHTML = searchResults($("#js-search-input").val(), 20);

  if (searchResultHTML == "") {
    $("#js-search-result-heading").css("display","none");
    $("#js-search-result").html("");
  }
  else {
    $("#js-search-result-heading").css("display","block");
    $("#js-search-result").html("<ul>"+searchResultHTML+"</ul>");

    // Render result set with MathJax
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"js-search-result"]);

    setTimeout(function () {
      $(".search-result-link").off("click");
      $(".search-result-link").click(function(event) {
        if ($("#menu").css("display") == "block") {
          // The menu button is visible -> we're on a narrow window
          $(".js-toc").hide("fast");
        }

        // Scroll to given ID (take account the upper navi) and prevent/revert to default action as needed
        // scrollToElement is defined in tableOfContents.js
        return scrollToElement($(this).get(0).hash);
      });
    });
  }
}


$(document).ready(function() {
  $('#js-search-input').keyup(function(event) {
    updateSearch()
  })
  $('#js-search-input').on('search', function(event) {
    updateSearch()
  })
  $('.tab-menu-option').click(function() {
    $('#js-search-input').val('')
    updateSearch()
  })
})

function scrollToElement(targetID) {
  if (targetID == null || targetID == "") {
    console.log("Could not get targetID for TOC link, reverting to default action");
    return true;
  }

  if ($(targetID).length != 1) {
    console.log("TargetID points to " + $(targetID).length + " elements, reverting to default action");
    return true;
  }

  var bodyRect = document.body.getBoundingClientRect(),
    elemRect = $(targetID).get(0).getBoundingClientRect(),
    offset = elemRect.top - bodyRect.top;

  // Scroll to 50 px above the given ID
  window.scrollTo(0, offset - 50);

  // Prevent default action
  return false;
}

