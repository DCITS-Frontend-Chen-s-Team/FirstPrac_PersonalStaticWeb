window.addEventListener('load',function() {
  var swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop:true,
    // spaceBetween: 30,
    // centeredSlides: true,
    autoplay: {
      delay: 1500,
      stopOnLastSlide: false,
      disableOnInteraction: true,
      // delay: 2500,
      // disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
})