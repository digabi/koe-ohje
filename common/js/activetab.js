function tab_initialise (tab_name) {
    if (tab_name == "tables") {
        setSameHeights();
    }
}

$(document).ready(function(){
    var activeTabIndex = -1;
    var tabNames = ["pika","eri","erim","muut","videos","tables"];

    $(".tab-menu > li").click(function(e){
        var curname_arr = e.target.id.split("-");

        var new_tab = curname_arr[0];
        var new_lang = curname_arr[1];

        for(var i=0;i<tabNames.length;i++) {
            if(new_tab == tabNames[i]) {
                activeTabIndex = i;
            } else {
                $("#"+tabNames[i]+'-'+new_lang).removeClass("active");
                $("#"+tabNames[i]+"-tab").css("display", "none");
            }
        }
        $("#"+tabNames[activeTabIndex]+"-tab").fadeIn();
        $("#"+new_tab+'-'+new_lang).addClass("active");

        tab_initialise(new_tab);

        return false;
    });
    
    $(".tab-menu > li").css('cursor', 'pointer');
});
