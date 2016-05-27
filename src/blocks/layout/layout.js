$(document).ready(function(){
    if ($(".layout").hasClass("layout--sidebar-right")) {
        $(".layout__sidebar").css({"padding-top": $(".content__top").height() + 10});
    }
})
