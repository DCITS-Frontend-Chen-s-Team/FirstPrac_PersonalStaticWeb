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
        console.log("json data loading success!");
        var str = ""; // 提前声明字符串变量
        str = options.getCurrentStr(data, str);
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