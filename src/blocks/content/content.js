$(document).ready(function(){
    if ($(".content").hasClass("content--sidebar-right")) {
        $(".content__sidebar").css({"padding-top": $(".main__top").height() + 10});
    }
})
