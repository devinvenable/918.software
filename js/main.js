$( document ).ready(function() {
    // Function to trigger the animation
    const triggerAnimation = () => {
        if (!$('.div-918').hasClass('shrink_logo')) {
            $('.div-918').addClass('shrink_logo');
            $('.div-nine').addClass('hoverme');
            
            if (!$('.div-buttons').hasClass('enlarge_me')) {
                $('.div-buttons').addClass('enlarge_me');
            }

            if (!$('.one').hasClass('one_image')) {
                $('.one').addClass('one_image');
            }
            if (!$('.nine').hasClass('one_image')) {
                $('.nine').addClass('one_image');
            }
        }
    };

    // Start animation after a delay to match typing effect
    setTimeout(triggerAnimation, 2000);

    // Keep the click handler as backup
    $(document).on('click', '.div-buttons', triggerAnimation);

    $(document).on('click', '.div-nine div', function() {
        if ($('.div-nine').hasClass('enlarge_me')) {
            console.log('enlarged');
            $('.div-block-14').addClass('testing');
        }
    });
});