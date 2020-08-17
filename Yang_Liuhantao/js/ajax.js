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
})