$(function () {
    /**
     * 新上好课板块
     */
    $.ajax({
        url: "json/course.json", // json 文件地址
        type: "get", // 数据传输方式
        dataType: "json", // 获取文件类型，非必要
        // 若 json 文件获取失败激活此函数
        error: function () {
            console.log("error!"); // 检验函数激活，排除 bug
        },
        // 若 json 文件获取成功激活此函数
        success: function (data) {
            var str = ""; // 提前声明字符串变量
            /* 循环遍历 data，得到参数 dataItem（遍历单元，参数名称可自定义） */
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
            </a>`; // 完成 str 的添加，使用 ES6 模板字符串引用参数，可以实现判断语句
            });
            // jQuery 选择器定位添加位置，append() 函数在末尾添加，html() 覆盖添加
            $(".main-course .course-card-list").append(str);
        }
    });

    $.ajax({
        url: "json/hot-course.json",
        type: "get",
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

    $.ajax({
        url: "json/mooc.json",
        type: "get",
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

    $.ajax({
        url: "json/menu.json",
        type: "get",
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

                console.log(dataItem.subMenu.course_card.length);

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

                str += `<li class="subMenu-2">
                        <a href="#">${dataItem.content}</a>
                        <div class="subMenu">
                            <h3 class="title-area">
                                <span class="title">${dataItem.subMenu.title}</span>
                                <span class="des">` + subStr +
                    `</span>
                            </h3>
                            <div class="course-card">` + subStr_card + `</div>
                        </div>
                    </li>`;
            });
            $(".main-banner ul").append(str);
        }
    });

    $.ajax({
        url: "json/learn-road.json",
        type: "get",
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