$(document).ready(function(){
    var activeTabIndex = -1;
    var tabNames = ["pika","eri","erim","muut"];

    $(".tab-menu > li").click(function(e){
        for(var i=0;i<tabNames.length;i++) {
            if(e.target.id == tabNames[i]) {
                activeTabIndex = i;
            } else {
                $("#"+tabNames[i]).removeClass("active");
                $("#"+tabNames[i]+"-tab").css("display", "none");
            }
        }
        $("#"+tabNames[activeTabIndex]+"-tab").fadeIn();
        $("#"+tabNames[activeTabIndex]).addClass("active");
        return false;
    });
});