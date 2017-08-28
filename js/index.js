(function ($) {
  "use strict";

  // Hide spinner on page loading
  $(window).on('load', function () {
    $('#spinner').animate({
      opacity: 0
    }, 400, function() {
      $('#spinner').css({ display: 'none' });
    });
  });

  // Do the injection of svg images
  SVGInjector(document.querySelectorAll('img.inject-inline'));

  // Init WOW plugin
  if ($('body').data('scroll-animation') === true) {
    new WOW({
      mobile: false
    }).init()
  }

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
  });

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul :not(li.dropdown) a').click(function () {
    $('.navbar-toggle:visible').click();
  });

  // Offset for Main Navigation
  $('#mainNav').affix({
    offset: {
      top: 100
    }
  });

  // Initialize and Configure Scroll Reveal Animation
  window.sr = ScrollReveal();
  sr.reveal('.sr-icons', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 200);
  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  });
  sr.reveal('.sr-contact', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 300);

  // Initialize and Configure Magnific Popup Lightbox Plugin
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

  $('.person-selector>.person').click(function () {
    var that = this;

    $('.single-quote--active').animate({opacity: 0}, 300, function () {
      $('.single-quote--active').removeClass('single-quote--active').css({opacity: 1});
      $('#' + that.id + '-quote').addClass('single-quote--active');
    });

    $('.person--active').animate({width: 45, height: 45}, 300, function () {
      $('.person--active').removeClass('person--active');
    });

    $(that).animate({width: 56, height: 56, 'border-radius': 28}, 300, function () {
      $(that).addClass('person--active');
    });
  });
})(jQuery);
