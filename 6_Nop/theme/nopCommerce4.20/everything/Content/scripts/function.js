/*!
 * Global Technologic nopcommerce Themes (http://globaltechnologic.com/nopcommerce-themes.php)
 * Copyright 2017 Global Technologic.
 */
//jQuery to collapse the navbar on scroll
$(document).ready(function () {
    var sticky = $('.masthead').offset().top + ($('.masthead').height());		
    $(window).scroll(function(){
        if($(this).scrollTop()>sticky){
            $('.masthead').addClass('sticky');           
        }
        else{
            $('.masthead').removeClass('sticky'); 
        }
    })
    var Menusticky = $('.headerlinks').offset().top;
    $(window).scroll(function () {
        if ($(this).scrollTop() > Menusticky) {
            $('.headerlinks').addClass('fixed');
        }
        else {
            $('.headerlinks').removeClass('fixed');
        }
    })
    $('.scrollup').fadeOut();
    $(window).scroll(function () {        
        if ($(this).scrollTop() > 50) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });    
    $(".searchbtn").click(function () {
        $(".search-box").toggleClass("search-display");
    });    
    $('footer h3').click(function () {
      $('.showHide-ft').slideUp();
      $(this).next('.showHide-ft').slideToggle();
    });
    $('.side-nav h3').click(function () {
        //$('.showHide-ft').slideUp();
        $(this).parents('.side-nav').find('.showHide-ft').slideToggle();
    });
})
