var ActiveTab = {
	tabNames: [],
	classPrefix: null,
	activeTabIndex: -1,
	activeTabInitialise: {},
	activateTabs: function () {
		var self = this;

		$("." + this.classPrefix + "-menu-option").click(function (e) {
			var curname_arr = e.target.parentElement.id.split("-");

			var new_tab = curname_arr[0];
			var new_lang = curname_arr[1];

			// Show new menu entry
			$("#" + self.classPrefix + "-menu #" + new_tab + '-' + new_lang).addClass(self.classPrefix + "-menu-option-active");

			// Hide menu entry and tab content
			for (var i = 0; i < self.tabNames.length; i++) {
				if (new_tab == self.tabNames[i]) {
					self.activeTabIndex = i;
				} else {
					$("#" + self.classPrefix + "-menu #" + self.tabNames[i] + '-' + new_lang).removeClass(self.classPrefix + "-menu-option-active");
					$("#" + self.classPrefix + "-" + self.tabNames[i]).css("display", "none");
				}
			}

			// Show new tab content
			$("#" + self.classPrefix + "-" + self.tabNames[self.activeTabIndex]).css("display", "block");

			// Execute possible tab-specific initialisation function
			if (typeof (self.activeTabInitialise[new_tab]) == "function") {
				console.log("Executing tab-specific initialisation for: " + new_tab);
				self.activeTabInitialise[new_tab]();
			}

			return false;
		});

		// Show default tab content
		$("." + this.classPrefix + "-content.active").css("display", "block");
	}
};
