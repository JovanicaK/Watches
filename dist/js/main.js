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
  var init = false;
  var swiper;
  function swiperCard() {
  if (window.innerWidth <= 1025) {
    if (!init) {
      init = true;
      swiper = new Swiper(".swiper-js", {
        direction: "horizontal",
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    }
  } else if (init) {
    swiper.destroy (".swiper-js", {
      direction: 'vertical' ,
    })
  };
    init = false;
      
}
swiperCard();
window.addEventListener("resize", swiperCard);
}

function equalHeight() {
  $('.js-item').matchHeight();
}

activeNavLink();
navigation();
navScroll(768);
slider();
equalHeight();