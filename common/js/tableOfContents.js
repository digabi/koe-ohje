/*
    Initializes automatically table of contents and displays it left-side
    of the screen if the screen is not too tiny.
*/

function initializeTocBot(language) {
    $('.js-toc-content').find('h3, h4')
        .each(function () {
            var elem = $(this)
            elem.attr('id', formAutomaticIDs(elem.text()))
        })

    var languageToBeIgnored = language === "fi" ? ".sv" : ".fi"
    tocbot.init({
        tocSelector: '.js-toc',
        contentSelector: '.js-toc-content',
        headingSelector: 'h3, h4',
        ignoreSelector: languageToBeIgnored,
        collapseDepth: 6,
        positionFixedSelector: '.js-toc',
        fixedSidebarOffset: 'auto'
    })
}