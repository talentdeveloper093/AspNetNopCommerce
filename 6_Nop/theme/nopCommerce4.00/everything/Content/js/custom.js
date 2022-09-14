/*!
 * Global Technologic nopcommerce Theme v2.0.0 (http://globaltechnologic.com/nopcommerce-themes.php)
 * Copyright 2017 Global Technologic.
 */
//jQuery to collapse the navbar on scroll

jQuery(document).ready(function () {
    jQuery(".searchbtn").click(function () {
    jQuery(".search-box").toggleClass("search-display");
    });
});

$(window).resize(function () {    
    $(".navbar.navbar-inverse").width("100%");
});

$(document).ready(function () {
    $('#exit ').click(function (e) {
        $('.responsive').hide();
        $('.master-wrapper-page').css('margin-top', '0');
        $('.header-links').css('margin-top', '20px');
    });
});

/* Custom Style for Collapse Sidebar Box */
$(document).ready(function () {
    $('.block .title').click(function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }

        var result = { width: e[a + 'Width'], height: e[a + 'Height'] };

        if (result.width < 992) {
            $(this).siblings('.listbox').slideToggle('slow');
            $(this).toggleClass("arrow-up-down");
        }
    });
});


