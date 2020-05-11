/*
    Initializes automatically table of contents and displays it left-side
    of the screen if the screen is not too tiny.
*/

function loseScandics(s) {
  if (!loseScandics.translate_re) loseScandics.translate_re = /[öäüåÖÄÜÅ]/g;
  var translate = {
    "ä": "a", "ö": "o", "ü": "u", "å": "a",
    "Ä": "A", "Ö": "O", "Ü": "U", "Å": "A"
  };
  return (s.replace(loseScandics.translate_re, function (match) {
    return translate[match];
  }));
}

function formAutomaticIDs(text) {
  return loseScandics(text)
    .trim()
    .toLowerCase()
    .replace(/[\s\(\)]/g, '-')
}

function initializeTocBot() {
  $('.js-toc-content').find('h2, h3')
    .each(function () {
      var elem = $(this)
      elem.attr('id', formAutomaticIDs(elem.text()))
    })

  tocbot.init({
    tocSelector: '.js-toc-result',
    contentSelector: '.js-toc-content',
    headingSelector: 'h2, h3',
    collapseDepth: 6,
    positionFixedSelector: '.js-toc',
    fixedSidebarOffset: 'auto',
    headingsOffset: 50
  })

  // Toggle toc menu (#menu button is show on narrow displays)
  $("#menu").off("click");
  $("#menu").click(function () {
    $(".js-toc").toggle("fast");
    setTocLinkClick();
  });

  $(".js-toc-content").off("click");
  $(".js-toc-content").click(function () {
    console.log("js-toc-content clicked");
    if ($("#menu").css('display') == 'block') {
      $(".js-toc").hide("fast");
    }
  });

  // Close toc menu when tab is changed on narrow displays
  $(".tab-menu-option").click(function () {
    if ($("#menu").css('display') == 'block') {
      $(".js-toc").hide("fast");
    }
  });

  // Always show on wide displays
  $(window).resize(function () {
    showTocBasedOnWidth();
  });

  showTocBasedOnWidth();

  // Handle toc links here instead of default behaviour
  setTocLinkClick();
}

function showTocBasedOnWidth() {
  if ($(window).width() > 1024) {
    $(".js-toc").show();
    $(".js-toc").css('top', $("#tab-menu").height());
    setTocLinkClick();
  }
  else {
    // Hide TOC only if search input does not have focus
    var searchInput = document.getElementById("js-search-input");

    if (document.activeElement !== searchInput) {
      $(".js-toc").hide();
      $(".js-toc").css('top', $("#tab-menu").height());
    }
  }
}

function setTocLinkClick() {
  $("a.toc-link").off("click");

  $("a.toc-link").click(function (event) {
    if ($("#menu").css('display') == 'block') {
      $(".js-toc").hide("fast");
    }

    // Scroll to given ID (take account the upper navi) and prevent/revert to default action as needed
    return scrollToElement(event.target.hash);
  });
}

function getTocLinkId(linkURI) {
  // Return ID (anchor) part of the URL
  if (linkURI.indexOf("#") < 0) {
    return null;
  }

  return linkURI.substring(linkURI.indexOf("#"));
}

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
