function ajax(
    options = {
        type: "post", // 数据传输方式
        data: {},
        dataType: "json", // 获取文件类型，非必要
        async: true, // 异步执行
        beforeSend: function () {}, // 调用前的回调函数
        success: function () {}, // 成功的回调函数
        error: function () { // 失败的回调函数
            console.log("error!");
        },
        complete: function () { // 完成后的回调函数
            console.log("complete!");
        },
    }
) {
    var url = `json/${options.url}.json`; // json 文件地址

    if (options.dataType === 'jsonp') {
        options.dataType = 'jsonp';
    }

    options.success = function (data) { // 若 json 文件获取成功激活此函数
        console.log("json data - success!");
        var str = ""; // 提前声明字符串变量
        /**
         * 循环遍历 data，得到参数 dataItem（遍历单元，参数名称可自定义）
         * 完成 str 的添加，使用 ES6 模板字符串引用参数，可以实现判断语句
         * eg. ${dataItem.countdown ? '<span class="price-tip">限时优惠</span>' : ''}
         */
        str = options.getFinalStr(data, str);
        // jQuery 选择器定位添加位置，append() 函数在末尾添加，html() 覆盖添加
        $(options.selector).append(str);
    }

    $.ajax({
        'url': url,
        'data': options.data,
        'type': options.type,
        'dataType': options.dataType,
        'async': options.async,
        'beforeSend': options.beforeSend,
        'success': options.success,
        'error': options.error,
        'complete': options.complete,
        'jsonpCallback': 'jsonp' + (new Date()).valueOf().toString().substr(-4),
    });
}
