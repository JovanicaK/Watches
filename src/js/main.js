function activeNavLink() {
  var $link = $('.nav__link');
  var active = 'nav__link--active';
  

  $link.on('click',function () {
    var $this = $(this);
    $link.removeClass(active);
    $this.addClass(active);
  })
}


function navigation() {
  var $toggle = $('.toggle');
  var $nav = $('.nav');
  
  $toggle.on('click', function () {
    $nav.slideToggle();
  })
}

function navScroll(wSize) {
  var windowSize = wSize;
  var $nav = $('.nav');
  
  $(window).on('scroll', function() {
    if ($(this).width()<windowSize) {
      $nav.removeAttr('style');
    }
  })
}

function slider() {
    var config = {
        // Optional parameters
        loop: true,

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    }
    var swiper = new Swiper('.js-swiper', config);
}

function equalHeight() {
    $('.js-title').matchHeight();
}

function dropdown() {
    $('select').selectric();
}

activeNavLink();
navigation();
navScroll(768);
equalHeight();
dropdown();
// slider();