// get请求方式
function getRequest(url, eachFunc, add, dataType = "json", async = true) {

    $.ajax({
        type: "get",
        url: url,
        dataType: dataType,
        async: async,
        success: function (data) {
            var str = "";
            str = eachFunc(data);
            $(add).append(str);
        },
        error: function () {
            console.log("error!");
        }
    })
}


