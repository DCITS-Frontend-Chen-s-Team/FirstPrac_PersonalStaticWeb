$(function () {
    $.ajax({
        url: "json/base.json", // json 文件地址
        type: "get", // 数据传输方式
        dataType: "json", // 获取文件类型，非必要
        // 若 json 文件获取失败激活此函数
        error: function () {
            console.log("error!"); // 检验函数激活，排除 bug
        },
        success: function (data) {
            var str = ""; // 提前声明字符串变量
            /* 循环遍历data，得到参数dataItem（遍历单元、参数名称自定义）*/
            $.each(data, function (index, dataItem) {
                str += `<div class="component">
                    <a><img src="${dataItem.imgUrl}"/></a>
                    <a>
                        <h3>${dataItem.title}</h3>
                        <p style="font-size: 14px;">${dataItem.introduce}</p>
                    </a>
                </div>` ;
            });
            $(".main-base .base-content").append(str);
        }
    });


    $.ajax({
        url: "json/improve.json", // json 文件地址
        type: "get", // 数据传输方式
        dataType: "json", // 获取文件类型，非必要
        // 若 json 文件获取失败激活此函数
        error: function () {
            console.log("error!"); // 检验函数激活，排除 bug
        },
        success: function (data) {
            var str = ""; // 提前声明字符串变量
            /* 循环遍历data，得到参数dataItem（遍历单元、参数名称自定义）*/
            $.each(data, function (index, dataItem) {
                str += `<div class="component">
                        <a href="#"><img src="${dataItem.imgUrl}"/></a>
                    </div>` ;
            });
            $(".main-prove .prove-content").append(str);
        }
    });

    $.ajax({
        url: "json/newcourse.json", // json 文件地址
        type: "get", // 数据传输方式
        dataType: "json", // 获取文件类型，非必要
        // 若 json 文件获取失败激活此函数
        error: function () {
            console.log("error!"); // 检验函数激活，排除 bug
        },
        success: function (data) {
            var str = ""; // 提前声明字符串变量
            /* 循环遍历data，得到参数dataItem（遍历单元、参数名称自定义）*/
            $.each(data, function (index, dataItem) {
                str += `<div class="new-course-component">
                    <a href="#"><img src="${dataItem.imgUrl}"/></a>
                    <a href="#" style="font-weight: bold; font-size: 16px">${dataItem.title}</a>
                    <div class="course-message">
                        <span style="float: left;">${dataItem.message.level}</span>
                        <span style="float: left;">${dataItem.message.purchase}</span>
                        <span style="float: right;">${dataItem.message.commit}</span>
                    </div>
                    <div class="price" style="float: left; width: 100%;">
                        ${dataItem.isDiscount ? '<span style="color: red; font-weight: bold;">' + `${dataItem.price}` +'</span>\n ' +
                    '<span style="color: red; background-color: #d0d3d5; font-size: 14px; padding: 0 1px;">限时特惠</span>' : '<span style="color: #545C63;">' + `${dataItem.price}` + '</span>'}
                    </div>
                </div>` ;
            });
            $(".new-course").append(str);
        }
    });

    $.ajax({
        url: "json/studyroute.json", // json 文件地址
        type: "get", // 数据传输方式
        dataType: "json", // 获取文件类型，非必要
        // 若 json 文件获取失败激活此函数
        error: function () {
            console.log("error!"); // 检验函数激活，排除 bug
        },
        success: function (data) {
            var str = ""; // 提前声明字符串变量
            /* 循环遍历data，得到参数dataItem（遍历单元、参数名称自定义）*/
            $.each(data, function (index, dataItem) {
                str += `<div class="study-route-component">
                    <div class="component-img">
                        <img src="${dataItem.imgUrl}">
                    </div>

                    <div class="component-introduce">
                        <div class="component-text">
                            <a>${dataItem.title}</a>
                            <span>${dataItem.introduce}</span>
                        </div>

                        <div class="component-ps">
                            <span>${dataItem.ps.num}</span>
                            <span class="component-ps-favor">${dataItem.ps.favor}</span>
                        </div>
                    </div>
                </div>` ;
            });
            $(".study-container .study-route").append(str);
        }
    });
})