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
        fix_point = 61,
        fix_margin = "61px";

    if (($(".header").hasClass("header--home") || $(".header").hasClass("header--index")) && ($(window).width() > 750)) {
        fix_point = 490;
        fix_margin = "550px";
    };

    if ( ($(this).scrollTop() > fix_point) && (!is_fixed) ) {
        if ($(".header").hasClass("header--home")) {
            $(".header")
                .addClass("header--index")
                .removeClass("header--home")
                .addClass("header--fixed")
                .fadeIn(500)
        } else {
            $(".header").fadeOut(0).addClass("header--fixed").fadeIn(500);
        };
        $(".layout").css("margin-top", fix_margin);
    };

    if ( ($(this).scrollTop() < fix_point) && (is_fixed) ) {
        if ($(".header").hasClass("header--index")) {
            $(".header")
                .removeClass("header--fixed")
                .addClass("header--home")
                .removeClass("header--index")
                // .fadeIn(500);
        } else {
            $(".header").removeClass("header--fixed");
        };
        $(".layout").css("margin-top","");
    };

});
