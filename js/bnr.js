

// Between the breakpoints of 768 and 992, make sure the slideshow and block beside it
// are the same height
function slideHeight() {
    if(Modernizr.mq('screen and (min-width:768px) and (max-width:1024px)')) {
        var newHeight = $('#homeSlideShow').css("height");
        $('#yellowBox').css('height', newHeight);
    } else {
        $('#yellowBox').css('height', 'auto');
    }
}

window.onorientationchange = function() {
    slideHeight();
};

$(document).ready(function() {

    slideHeight();

    $('.link-sammich').click(function() {
        $('.nav-drawer').toggleClass('open closed');
        return false;
    });



    // Things to do on window resize
    $(window).resize(function() {
        slideHeight();
        homeColumnSetup(); // has to be called on resize to keep columns from getting cut off or wonky
    });


});