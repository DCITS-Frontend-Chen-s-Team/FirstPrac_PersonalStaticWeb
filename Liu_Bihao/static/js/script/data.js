$(function () {
    /**
     * 新上好课板块
     */
    ajax({
        url: "course",
        getFinalStr: function (data, str) {
            $.each(data, function (index, dataItem) {
                str += `<a href='#'>
                <div class="course-state">${dataItem.label}</div>
                <div class='img-nav'>
                    <img src="${dataItem.imgUrl}" alt=''>
                </div>
                <div class="course-name">${dataItem.title}</div>
                <div class="card-info">
                    <span class="l">${dataItem.info.level}</span>
                    <span class="l">${dataItem.info.people}</span>
                    <span class="l">${dataItem.info.comments}</span>
                </div>
                <div class="price">
                    <span>${dataItem.price}</span>
                    ${dataItem.countdown ? '<span class="price-tip">限时优惠</span>' : ''}
                </div>
            </a>`;
            });
            return str;
        },
        selector: ".main-course .course-card-list",
    });

    /**
     * 热门课程板块
     */
    $.ajax({
        url: "json/hot-course.json",
        type: "post",
        dataType: "json",
        success: function (data) {
            var str = "";
            $.each(data, function (index, dataItem) {
                str += `<a href='#'>
                <div class='img-nav'>
                    <img src="${dataItem.imgUrl}" alt=''>
                </div>
                <div class="course-name">${dataItem.title}</div>
                <div class="card-info">
                    <span class="l">${dataItem.info.level}</span>
                    <span class="l">${dataItem.info.people}</span>
                    <span class="l">${dataItem.info.comments}</span>
                </div>
                <div class="price">
                    <span>${dataItem.price}</span>
                </div>
            </a>`
            });
            $(".main-hot-course .course-card-list").append(str);
        }
    });

    /**
     * 慕课专栏板块
     */
    $.ajax({
        url: "json/mooc.json",
        type: "post",
        // data: data,
        dataType: "json",
        success: function (data) {
            var str = "";
            $.each(data, function (index, dataItem) {
                str += `<a href="#">
                <div class="left">
                    <img src="${dataItem.imgUrl}" alt="">
                    ${dataItem.try_read ? '<div class="try-read">试读</div>' : ''}
                </div>
                <h4>${dataItem.title}</h4>
                <div class="info">${dataItem.info}</div>
                <div class="teacher"><strong>${dataItem.teacher}</strong> / ${dataItem.position}</div>
                <div class="price">
                    <span class="sale">${dataItem.price.sale}</span>
                    <span class="ori">${dataItem.price.ori}</span>
                      ${dataItem.price.countdown ? '<div class="countdown r" style="clear: both;">' +
                    '<span class="name">限时优惠</span>' +
                    '</div>' : ''}
                </div>
            </a>`
            });
            $(".main-mooc .card-list").append(str);
        }
    });

    /**
     * 轮播图板块
     */
    $.ajax({
        url: "json/menu.json",
        type: "post",
        dataType: "json",
        success: function (data) {
            var subStr = "";
            var subStr_card = "";
            var str = "";

            $.each(data, function (index, dataItem) {
                subStr = "";
                subStr_card = "";

                for (let i = 0; i < dataItem.subMenu.label.length; i++) {
                    subStr += `<span>${dataItem.subMenu.label[i]}</span>`;
                }

                for (let i = 0; i < dataItem.subMenu.course_card.length; i++) {
                    subStr_card += `<div class="item">
                                    <img src="${dataItem.subMenu.course_card[i].imgUrl}" alt="">
                                    <div style="float: left">
                                        <div class="title">${dataItem.subMenu.course_card[i].title}</div>
                                        <div style="clear: left">
                                            <span><strong>${dataItem.subMenu.course_card[i].info.price}</strong></span>
                                            <span>${dataItem.subMenu.course_card[i].info.level}</span>
                                            <span>${dataItem.subMenu.course_card[i].info.people}</span>
                                        </div>
                                    </div>
                                </div>`;
                }

                str += `<li class="sub-Menu">
                        <a href="#">${dataItem.content}</a>
                        <div class="subMenu">
                            <h3 class="title-area">
                                <span class="title">${dataItem.subMenu.title}</span>
                                <span class="des swipe-des">` + subStr + `</span>
                            </h3>
                            <div class="course-card">` + subStr_card + `</div>
                        </div>
                    </li>`;
            });
            $(".main-banner ul").append(str);
        }
    });

    /**
     * 学习路线板块
     */
    $.ajax({
        url: "json/learn-road.json",
        type: "post",
        dataType: "json",
        success: function (data) {
            var str = "";
            $.each(data, function (index, dataItem) {
                str += `<a href="#">
                <img src="${dataItem.imgUrl}" alt="">
                <h4 class="title-name">${dataItem.title}</h4>
                <p class="des">${dataItem.des}</p>
                <div class="info">
                    <span>${dataItem.info.intro}</span>
                    <span style="margin-left: 33px">${dataItem.info.collect}</span>
                </div>
            </a>`;
            });
            $(".main-learn-road .card-list").append(str);
        }
    });
})

/**
 * 学习路线板块顶部标签展示
 * "curr"为被选中状态
 */
$(function () {
    var str_learnRoad_tag_html = "";
    var str_learnRoad_tags = ["热门", "前端", "后端", "移动端", "计算机基础", "大数据", "测试", "人工智能"]
    str_learnRoad_tag_html += `<li class="curr">${str_learnRoad_tags[0]}</li>`
    for (var i = 1; i < str_learnRoad_tags.length; i++) {
        str_learnRoad_tag_html += `<li>${str_learnRoad_tags[i]}</li>`;
    }
    $(".main-learn-road ul").append(str_learnRoad_tag_html);
})
