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
                    <a href="#" style="font-weight: bold; font-size: 1.3rem">${dataItem.title}</a>
                    <div class="course-message">
                        <span style="float: left;">${dataItem.message.level}</span>
                        <span style="float: left;">${dataItem.message.purchase}</span>
                        <span style="float: right;">${dataItem.message.commit}</span>
                    </div>
                    <div class="price" style="float: left; width: 100%;">
                        ${dataItem.isDiscount ? '<span style="color: red; font-weight: bold;">' + `${dataItem.price}` +'</span>\n ' +
                    '<span style="color: red; background-color: #d0d3d5; font-size: 1.2rem; padding: 0 1px;">限时特惠</span>' : '<span style="color: #545C63;">' + `${dataItem.price}` + '</span>'}
                    </div>
                </div>` ;
            });
            $(".new-course .new-course-base").append(str);
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

    $.ajax({
        url: "json/hotcourse.json", // json 文件地址
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
                str += `<div class="hot-course-component">
                    <a href="#"><img src="${dataItem.imgUrl}"></a>
                    <a href="#" style="font-weight: bold">${dataItem.title}</a>
                    <div class="course-message">
                        <span style="float: left;">${dataItem.message.level}</span>
                        <span style="float: left;">${dataItem.message.purchase}</span>
                        <span style="float: right;">${dataItem.message.commit}</span>
                    </div>
                    <div class="price" style="float: left; width: 100%;">
                        ${dataItem.isDiscount ? '<span style="color: red; font-weight: bold;">' + `${dataItem.price}` +'</span>\n ' +
                    '<span style="color: red; background-color: #d0d3d5; font-size: 1.2rem; padding: 0 1px;">限时特惠</span>' : '<span style="color: #545C63;">' + `${dataItem.price}` + '</span>'}
                    </div>
                </div>` ;
            });
            $(".hot-course .hot-course-base").append(str);
        }
    });

    $.ajax({
        url: "json/mooccolumn.json", // json 文件地址
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
                str += `<div class="mooc-column-component" id="mooc_component">
                    <div class="component-img">
                        <img src="${dataItem.imgUrl}">
                        <span>${dataItem.type}</span>
                    </div>

                    <div class="component-introduce">
                        <h4>${dataItem.title}</h4>
                        <div class="component-introduce-purchase">
                            <p>${dataItem.purchase}</p>
                        </div>
                        <div class="component-introduce-author">
                            <span><b>${dataItem.author.name}</b> / ${dataItem.author.job}</span>
                        </div>
                        <div class="component-introduce-price">
                            <span class="price-new"><b>${dataItem.price.new}</b></span>
                            ${dataItem.isDiscount ? '<span class="price-old"><s>' + `${dataItem.price.old}` + '</s></span>' : ''}
                            ${dataItem.isDiscount ? '<span class="price-tip">限时优惠</span>' : ''}
                        </div>
                    </div>
                </div>` ;
            });
            $(".column-container .mooc-column").append(str);
        }
    });
})