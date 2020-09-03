function ajax(
    options ={
        // options = options || {};  //调用函数时如果options没有指定，就给它赋值{},一个空的Object
        // options.type = (options.type || "GET").toUpperCase();/// 请求格式GET、POST，默认为GET
        // options.dataType = options.dataType || "json";    //响应数据格式，默认json

        options : this.options || {},//调用函数时如果options没有指定，就给它赋值{},一个空的Object,默认值
        type:(this.options.type || "GET").toUpperCase(),// 请求格式GET、POST，默认为GET
        dataType : this.options.dataType || "json",//响应数据格式，默认json
        error: function () {
            console.log("error!");
        },
        complete: function () {
            console.log("complete!");
        },
    }
) {
    var url = `../Json/${options.url}.json`;

    if (options.dataType === 'jsonp') {
        options.dataType = 'jsonp';
    }

    options.success = function (data) {
        console.log("json data - success!");
        console.log(url);
        console.log(data);
        var str = ""; // 提前声明字符串变量
        str = options.successFunc(data, str);
        console.log(str);
        $(options.selector).append(str);
    }

    $.ajax({
        'url': url,
        'type': options.type,
        'dataType': options.dataType,
        'async': options.async,
        'success': options.success,
        'error': options.error,
        'jsonpCallback': 'jsonp' + (new Date()).valueOf().toString().substr(-4),

    });


}