// Initialise FlexSlider for Carousels
$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "fade",
        controlNav: false,
        directionNav: true,
        slideshowSpeed: 5000,
        animationSpeed: 600,
        touch: true
        //	start: function(slider) {
        //	$('.slides li img').click(function(event){
        //	event.preventDefault();
        //	slider.flexAnimate(slider.getTarget("next"));
        //	});
        // }
    });
});
