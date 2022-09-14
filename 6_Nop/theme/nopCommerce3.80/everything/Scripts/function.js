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
    var Menusticky = $('header').offset().top;
    $(window).scroll(function () {
        if ($(this).scrollTop() > Menusticky) {
            $('header').addClass('fixed');
        }
        else {
            $('header').removeClass('fixed');
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
})
