$(document).ready(function() {

    $(".js-scrollto").click(function () {
        elementClick = $(this).attr("href")
        destination = $(elementClick).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1700);
        return false;
    });

    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        $('html').addClass('safari');
    };

    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        $("html").addClass("macos");
    } else {
        $("html").addClass("pc");
    };

    if (navigator.userAgent.search("MSIE") >= 0) {
        $('html').addClass('ie');
    };

    $("img, a").on("dragstart", function(event) { event.preventDefault(); });

});



$('.browsehappy').click(function() {
    $(this).slideUp();
});

$(document).ready(function(){
    if ($(".content").hasClass("content--sidebar-right")) {
        $(".content__sidebar").css({"padding-top": $(".main__top").height() + 10});
    }
})

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
                .addClass("header--fixed");
        };
        $(".content").css("margin-top", fix_margin);
    };

    if ( ($(this).scrollTop() < fix_point2) && (is_fixed) ) {
        if ($(".header").hasClass("header--index")) {
            $(".header")
                .removeClass("header--fixed")
                .addClass("header--home")
                .removeClass("header--index");
        } else {
            $(".header")
                .removeClass("header--fixed");
        };
        $(".content").css("margin-top","");
    };

});

$(document).ready(function() {

    jQuery.fn.redraw = function() {
        return this.hide(0,function() {$(this).show(0);});
    };

    function arrangeColumns(delay) {

        if ($(".main--two-columns").length == 0) {
            return;
        };

        var container = $(".main__main"),
            items = $(".main__main .card, .main__main .advert");

        if ($(window).width() < 750) {
            container.css({
                "position": "",
                "min-height": ""
            });
            items.css({
                "position": "",
                "width": "",
                "top": "",
                "left": "",
                "right": ""
            });
            return;
        };

        var gutter = 10,
            contWidth = container.width(),
            itemWidth = (contWidth - gutter) / 2,
            bottom1 = 0,
            bottom2 = 0,
            q = items.length;


        container.css({
            "position": "relative"
        });
        items.css({
            "width": itemWidth,
            "position": "absolute"
        });

        for(var i=0; i < q; i++){
            var item = items.eq(i);

            item.redraw();

            if (bottom1 > bottom2) {
                item.css({
                    "display": "block",
                    "right": 0,
                    "left": "",
                    "top": bottom2
                });
                var b2 = bottom2 + item.height() + gutter;
                console.log(i + " - right, top: " + bottom2 + ", height: " + item.height() + ", bottom: " + b2 );
                bottom2 = bottom2 + item.height() + gutter;
            } else {
                item.css({
                    "position": "absolute",
                    "left": 0,
                    "right": "",
                    "top": bottom1
                });

                var b1 = bottom1 + item.height() + gutter;
                console.log(i + " - left, top: " + bottom1 + ", height: " + item.height() + ", bottom: " + b1);
                bottom1 = bottom1 + item.height() + gutter;
            };
            container.css({"min-height": Math.max(bottom1, bottom2)});
        };

    };

    var resizeTimer;
    $(window).on('resize load', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            arrangeColumns();
      }, 500);
    });

    // if ($(".main--two-columns").length > 0) {
    //     $('.main__main').packery({
    //         itemSelector: '.main__main .card, .main__main .advert',
    //         gutter: 10
    //     });
    // };

});


$(document).ready(function(){
    $(".words__button").click(function(){
        var list = $(".words__list");
        if (list.hasClass("expanded")) {
            list.removeClass("expanded");
            $(".words__button-show").fadeIn();
            $(".words__button-hide").fadeOut();

        } else {
            list.addClass("expanded");
            $(".words__button-show").fadeOut();
            $(".words__button-hide").fadeIn();
        };
    });
});
