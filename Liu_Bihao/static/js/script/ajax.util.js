function ajax(
    options = {
        type: "get",
        dataType: "json",
        async: true,
        error: function () {
            console.log("error!");
        },
        complete: function () {
            console.log("complete!");
        },
        // DOMStr: "",
    }
) {
    var url = `json/${options.url}.json`;

    if (options.dataType === 'jsonp') {
        options.dataType = 'jsonp';
    }

    options.success = function (data) {
        console.log("json data - success!");
        var str = ""; // 提前声明字符串变量
        str = options.successFunc(data, str);
        console.log(str);
        // $.each(data, function (index, dataItem) {
        //     str += options.DOMStr;
        // });
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
