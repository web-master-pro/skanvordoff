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

