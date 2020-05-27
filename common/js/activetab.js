var ActiveTab = {
  tabNames: [],
  classPrefix: null,
  activeTabIndex: -1,
  activeTabInitialise: {},
  activateTabs: function() {
    var self = this

    $('.' + this.classPrefix + '-menu-option').click(function(e) {
      var curname_arr = e.target.parentElement.id.split('-')

      var new_tab = curname_arr[0]
      var new_lang = curname_arr[1]

      // Show new menu entry
      $('#' + self.classPrefix + '-menu #' + new_tab + '-' + new_lang).addClass(
        self.classPrefix + '-menu-option-active'
      )

      // Hide menu entry and tab content
      for (var i = 0; i < self.tabNames.length; i++) {
        if (new_tab == self.tabNames[i]) {
          self.activeTabIndex = i
        } else {
          $('#' + self.classPrefix + '-menu #' + self.tabNames[i] + '-' + new_lang).removeClass(
            self.classPrefix + '-menu-option-active'
          )
          $('#' + self.classPrefix + '-' + self.tabNames[i]).css('display', 'none')
        }
      }

      // Show new tab content
      $('#' + self.classPrefix + '-' + self.tabNames[self.activeTabIndex]).css('display', 'block')

      // Execute possible tab-specific initialisation function
      if (typeof self.activeTabInitialise[new_tab] == 'function') {
        console.log('Executing tab-specific initialisation for: ' + new_tab)
        self.activeTabInitialise[new_tab]()
      }

      return false
    })

    // Show default tab content
    $('.' + this.classPrefix + '-content.active').css('display', 'block')
  }
}

function changePageTo(subject, allTabNames, funcExecuteAfter) {
  setTimeout(function() {
    if ($('#tab-' + subject).children().length === 0) {
      $('#loading').show()

      $.each(allTabNames, function(thisTabIndex, thisTabName) {
        $('#tab-' + thisTabName).empty()
      })
      $('#tab-' + subject).load('tab-' + subject + '.html', function() {
        window.legacyIntegration.initializeLanguage()
        window.legacyIntegration.initializeCopyToClipboard()
        window.legacyIntegration.applyTablesorter(subject)
        if (subject === 'geography') {
          window.legacyIntegration.initializeGeographyTab()
        }

        initializeTocBot()

        if (typeof funcExecuteAfter == 'function') {
          funcExecuteAfter()
        }

        $('#loading').fadeOut(300)
      })
    }
  }, 200)
}

$(document).ready(function() {
  var defaultPage = 'abitti'

  // Initialise ActiveTab navigation
  var main_tabs = Object.create(ActiveTab)
  main_tabs.classPrefix = 'tab'
  main_tabs.tabNames = ['abitti', 'math', 'physics', 'chemistry', 'spanish', 'french', 'german', 'sami', 'geography']

  // Default init
  changePageTo(defaultPage, main_tabs.tabNames)

  // Execute special initialisation when "tables" tab is activated
  main_tabs.activeTabInitialise = {
    abitti: function() {
      changePageTo('abitti', main_tabs.tabNames)
    },
    math: function() {
      changePageTo('math', main_tabs.tabNames)
    },
    physics: function() {
      changePageTo('physics', main_tabs.tabNames)
    },
    chemistry: function() {
      changePageTo('chemistry', main_tabs.tabNames)
    },
    spanish: function() {
      changePageTo('spanish', main_tabs.tabNames)
    },
    french: function() {
      changePageTo('french', main_tabs.tabNames)
    },
    german: function() {
      changePageTo('german', main_tabs.tabNames)
    },
    sami: function() {
      changePageTo('sami', main_tabs.tabNames)
    },
    geography: function() {
      changePageTo('geography', main_tabs.tabNames)
    }
  }

  main_tabs.activateTabs()
})
