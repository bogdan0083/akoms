$(document).ready(function() {

    if ($('.promo').length) {

        var svgElement = document.querySelector('.promo svg');
        var maskedElement = document.querySelector('#mask-circle');
        var circleFeedback = document.querySelector('#circle-shadow');
        var svgPoint = svgElement.createSVGPoint();

        function cursorPoint(e, svg) {
            svgPoint.x = e.clientX;
            svgPoint.y = e.clientY;
            return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
        }

        function update(svgCoords) {
            maskedElement.setAttribute('cx', svgCoords.x);
            maskedElement.setAttribute('cy', svgCoords.y);
            circleFeedback.setAttribute('cx', svgCoords.x);
            circleFeedback.setAttribute('cy', svgCoords.y);
        }

        document.querySelector('.promo').addEventListener('mousemove', function(e) {
            update(cursorPoint(e, svgElement));
        }, false);

        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
            var touch = e.targetTouches[0];
            if (touch) {
                update(cursorPoint(touch, svgElement));
            }
        }, false);

        var buttonIsClicked = false;

    }
    // some other code

    $('.js-transition-trigger').hover(function(e) {

        anime({
            targets: [maskedElement, circleFeedback],
            r: '100%',
            duration: 1000,
            easing: 'easeOutSine',
            round: false
        });

    }, function(e) {
        anime({
            targets: [maskedElement, circleFeedback],
            r: '8%',
            duration: 1000,
            easing: 'easeOutSine',
            round: false
        })
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
        padding: 0,
        background: 'transparent'
    });

    $('.fancybox').fancybox();


    $('.trigger-down').on('click', function(e) {
        e.preventDefault();

        $('body, html').animate({
            scrollTop: $('.about-section').offset().top
        });
    });

    // DROPDOWN

    $('.login-block-in > a').dropdown();

    // DATEPICKER

    if ($(window).width() > 880) {

        $('[data-date]').datepicker({
            position: 'bottom left',
            autoClose: true
        });

    } else {
        $('[data-date]').each(function() {
            $(this).attr('type', 'date');
        });
    }

    // CABINET EDITABLE TABLE

    $('.editable-trigger').click(function(e) {
        e.preventDefault();

        if ($(this).data('tariff-change')) {
            console.log('hey');
            $('html, body').animate({
                'scrollTop': $('.tariff-change').offset().top
            });

            return;
        }

        var initialText = $(this).data('initial-text');
        var secondaryText = $(this).data('secondary-text');

        var $editableCaption = $(this).parent().find('.editable-caption');
        var $editableField = $(this).parent().find('.editable-field');

        console.log($editableCaption);
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {

            $(this).text(secondaryText);

            $editableCaption.toggleClass('hidden');
            $editableField.toggleClass('active').focus();

        } else {

            $(this).text(initialText);

            $editableCaption.toggleClass('hidden');
            $editableField.toggleClass('active');

            $editableCaption.text( $editableField.val() );
        }
    });

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


    // Добавление ховер эффекта для страницы новостей. Появляется при наведении на кнопку подробнее

    $('.js-article-btn').hover(function() {

        var $parent = $(this).closest('.article');

        $parent.find('.article-heading').addClass('hovered');

    }, function() {

        var $parent = $(this).closest('.article');

        $parent.find('.article-heading').removeClass('hovered');

    });


    // Аккордеон на странице Все услуги

    var $activeAccordeon = null;
    $('.examination-list-inner').on('click', 'li > a', function(e) {
        e.preventDefault();

        if ($(this).hasClass('active')) {
            return;
        }

        if ($activeAccordeon) {
            $activeAccordeon.removeClass('active').next().slideUp();
        }
        $(this).addClass('active').next().slideDown();

        $activeAccordeon = $(this);
    });
});
