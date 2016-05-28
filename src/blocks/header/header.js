$(document).ready(function(){

    $(".header__search-toggle").on("click", function(){
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(".header").removeClass("header--expanded");
        } else {
            $(this).addClass("active");
            $(".header").addClass("header--expanded");
        };
    });
})

$(window).scroll(function() {

    var is_fixed = $(".header").hasClass("header--fixed"),
        fix_point1 = 0,
        fix_point2 = 0,
        fix_margin = "61px";

    if (($(".header").hasClass("header--home") || $(".header").hasClass("header--index")) && ($(window).width() > 750)) {
        fix_point1 = 600;
        fix_point2 = 489;
        fix_margin = "550px";
    };

    if ( ($(this).scrollTop() > fix_point1) && (!is_fixed) ) {
        if ($(".header").hasClass("header--home")) {
            $(".header")
                .fadeOut(0)
                .addClass("header--index")
                .removeClass("header--home")
                .addClass("header--fixed")
                .fadeIn(1000);
        } else {
            $(".header")
                // .fadeOut(0)
                .addClass("header--fixed")
                // .fadeIn(1000);
        };
        $(".content").css("margin-top", fix_margin);
    };

    if ( ($(this).scrollTop() < fix_point2) && (is_fixed) ) {
        if ($(".header").hasClass("header--index")) {
            $(".header")
                .removeClass("header--fixed")
                .addClass("header--home")
                .removeClass("header--index")
        } else {
            $(".header")
                .removeClass("header--fixed");
        };
        $(".content").css("margin-top","");
    };

});
