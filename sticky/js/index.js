define(function(require, exports, module){
    
    var init = function(conf) {

        var isStopTimer = null;
        var offsetTop = $('.content-a').offset().height;

        var tabContentTop = $('.ui-tab-nav').offset().height;
        var orgPaddingTop = parseInt($('.content-b').css('padding-top'));
        $('.content-b').css('padding-top', tabContentTop+orgPaddingTop);
        $('.sticky-wrap').css('margin-bottom', -tabContentTop);

        //置顶效果
        if ($('.sticky-wrap').css("position").indexOf("-webkit-sticky") == -1) {
            $('.page-wrapper').on('touchend', function() {
                clearInterval(isStopTimer);
                isStopTimer = setInterval(function() {
                    document.body.scrollTop >= offsetTop ? $('.page-wrapper').addClass('sticky') : $('.page-wrapper').removeClass('sticky');
                }, 200)

            });

            $('.page-wrapper').on('touchmove', function() {
                document.body.scrollTop >= offsetTop ? $('.page-wrapper').addClass('sticky') : $('.page-wrapper').removeClass('sticky');
            });
        }
    }

    //UA判断
    var ua = navigator.userAgent;
    var REGEXP_IOS = /(iPad|iPhone|iPod).*?/; 
    var iOS = REGEXP_IOS.test(ua);
    
    if (iOS) {
        $('.page-wrapper').addClass('platform-ios');
    }

    exports.init = init;

})