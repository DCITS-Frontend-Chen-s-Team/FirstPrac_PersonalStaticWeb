// get请求方式
function getRequest(url, eachFunc, add, dataType = "json", async = true) {

    $.ajax({
        type: "get",
        url: url,
        dataType: dataType,
        async: async,
        success: function (data) {
            console.log("success");
            var str = "";
            str = eachFunc(data);
            console.log(str);
            $(add).append(str);
            console.log("1");
        },
        error: function () {
            console.log("error!");
        }
    })
}


