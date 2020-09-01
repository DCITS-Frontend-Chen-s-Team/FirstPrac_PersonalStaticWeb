/* swiper 插件轮播图 */
var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal', // 水平/垂直切换选项
    loop: true, // 循环模式选项

    // 自动播放
    autoplay: {
        delay: 1000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },

    // 如果需要分页器
    pagination: {
        clickable: true, // 分页器点击跳转
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 如果需要滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})