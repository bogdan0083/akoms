$(document).ready(function() {


    // Эффект перехода от студии cherepkova.ru. 

    var btnTop = $('.js-transition-trigger').offset().top - $('.promo').offset().top + 20;
    var btnLeft = $('.js-transition-trigger').offset().left - $('.promo').offset().left + 125;

    console.log(btnTop);

    $('.front-img').imageTransition({

        // eng: transition container: the main container in which transitions will be shown
        // rus: Обертка для переходов. Нужна для того, чтобы показать переход и ограничить выход эффекта за предел блока
        transitionContainer: $('.promo'),

        // eng: initial position of the image wrapper. Calculated relative to our transtitionContainer
        // rus: Изначальная позиция обертки для нашей картинки. Рассчитывается относительно обертки transitionContainer
        initialY: btnTop,
        initialX: btnLeft,

        // eng: initial width and height of the image wrapper. Can be set as a css string. For example:
        // rus: Изначальная ширина и высота для нашего обертки картинки. Может быть указана как строка с css значением. Например:
        //      initialWidth: '10%',
        //      initialHeight: '300px'
        initialWidth: 0,
        initialHeight: 0,

        // eng: final width and height of the image container after transition. Can be set as a css string. For example:
        // rus: Изначальная ширина и высота для нашего контейнера картинки после перехода. Может быть указана как строка с css значением. Например:
        //      initialWidth: '10%',
        //      initialHeight: '300px'
        finalWidth: 3500,
        finalHeight: 3500,
        // eng: transition duration.
        // rus: Длительность перехода
        transitionDuration: 1,
        transitionDurationBackward: 1
    });

    // some other code

    $('.js-transition-trigger').hover(function(e) {

        $('.front-img').imageTransition('launchToggle');

    });

    $('.nav-trigger').on('click', function(e) {
        e.preventDefault();

        $(this).toggleClass('active');

        $('.mobile-nav').toggleClass('active');
        $('.page-wrapper').toggleClass('active');
    });

    if ($(window).width() > 880) {

        $('.partners-slider .wrapper').slick({
            slidesToShow: 7,
            infinite: true,
            autoplay: true,
            pauseOnHover: false,
            prevArrow: $('.partners-slider .arrow-left'),
            nextArrow: $('.partners-slider .arrow-right'),
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            }]
        });

        $('.articles-slider .wrapper').slick({
            slidesToShow: 3,
            infinite: true,
            autoplay: true,
            pauseOnHover: false,
            prevArrow: $('.articles-slider .arrow-left'),
            nextArrow: $('.articles-slider .arrow-right'),
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2
                }
            }]
        });
    }

    // wow.js

    new WOW({
        mobile: false
    }).init();

    $('.fancybox-modal').fancybox({
        closeBtn: false,
        fitToView: false,
        scrolling: 'visible',
        padding: 0
    });

    $('.fancybox').fancybox();


    // Скрипт для параллакс эффекта при движении мышкой

    if ($(window).width() > 880 && $('.examination').length && $('.features').length) {
        var scrollX;
        var scrollY;

        $('.examination, .features').on('mousemove', function(e) {
            scrollX = e.clientX;
            scrollY = e.clientY;
            var containerW = $(this).outerWidth();
            var containerH = $(this).height();

            $(this).find('.js-parallax-background').css({
                'transform': 'translateX(' + -(((scrollX - containerW / 2) / 1000)) + '%) '
            });

            console.log((scrollX - (containerW / 2)) / 100);
        });
    }
});
