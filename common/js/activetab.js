var ActiveTab = {
	tabNames : [],
	classPrefix : null,
	activeTabIndex : -1,
	activeTabInitialise : {},
	activateTabs : function () {
		var self = this;
		
		$("."+this.classPrefix+"-menu > li").click(function(e){
			var curname_arr = e.target.id.split("-");

			var new_tab = curname_arr[0];
			var new_lang = curname_arr[1];

			for(var i=0; i < self.tabNames.length; i++) {
				if(new_tab == self.tabNames[i]) {
					self.activeTabIndex = i;
				} else {
					$("#"+self.tabNames[i]+'-'+new_lang).removeClass("active");
					$("#"+self.classPrefix+"-"+self.tabNames[i]).css("display", "none");
				}
			}
			$("#"+self.classPrefix+"-"+self.tabNames[self.activeTabIndex]).fadeIn();
			$("#"+new_tab+'-'+new_lang).addClass("active");

			// Execute possible tab-specific initialisation function
			if (typeof(self.activeTabInitialise[new_tab]) == "function") {
				console.log("Executing tab-specific initialisation for: "+new_tab);
				self.activeTabInitialise[new_tab]();
			}

			return false;
		});
		
		$("."+self.classPrefix+"-menu > li").css('cursor', 'pointer');
	}
};
