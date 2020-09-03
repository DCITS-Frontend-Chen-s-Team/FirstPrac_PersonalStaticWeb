function ajax(
    options = {
        type: "get", // 数据传输方式
        dataType: "json", // 获取文件类型，非必要
        async: true, // 异步执行
        error: function () { // 若 json 文件获取失败激活此函数
            console.log("error!");
        },
        complete: function () {
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
        // 'data': data,
        'type': options.type,
        'dataType': options.dataType,
        'async': options.async,
        'success': options.success,
        'error': options.error,
        'jsonpCallback': 'jsonp' + (new Date()).valueOf().toString().substr(-4),
        // 'beforeSend': function () {
        //     layer.msg('加载中', { // 通过layer插件来进行提示正在加载
        //         icon: 16,
        //         shade: 0.01
        //     });
        // },
    });
}
