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
