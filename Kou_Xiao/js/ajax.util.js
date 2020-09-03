function ajax(
  options = {
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
) {
  var url = `../json/${options.url}.json`;

  if (options.dataType === 'jsonp') {
    options.dataType = 'jsonp';
  }

  options.scuccess = function (data) {
    console.log("json data - success!");
    var str = ""; 
    str = options.getStr(data, str);
    $(options.selector).append(str);
  }

  $ajax({
    'url':url,
    'type': options.type,
    'dataType': options.dataType,
    'async': options.async,
    'success': options.success,
    'error': options.error,
    'jsonpCallback': 'jsonp' + (new Date()).valueOf().toString().substr(-4),
  })
}