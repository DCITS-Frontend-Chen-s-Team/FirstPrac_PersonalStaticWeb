function ajax(
  options = {
    //调用时，没有传参，使用默认设置
    type: 'get',
    dataType: 'json',
    async: true,
    error: function () {
      console.log("error!");
    },
    complete: function () {
      console.log("complete!");
    },
  }
){
  //数据路径定义
  var url = `json/${options.url}.json`;

  if (options.dataType === 'jsonp') {
    options.dataType = 'jsonp';
  }

  var success = function (data) {
    console.log("json data - success!");
    console.log(url);
    console.log(data);
    var str = ""; 
    str = options.getStr(data, str);
    console.log(str);
    $(options.selector).append(str);
  }

  $.ajax({
    'url':url,
    'type': options.type,
    'dataType': options.dataType,
    'async': options.async,
    'success': success,
    'error': options.error,
    'jsonpCallback': 'jsonp' + (new Date()).valueOf().toString().substr(-4),
  })

  
}