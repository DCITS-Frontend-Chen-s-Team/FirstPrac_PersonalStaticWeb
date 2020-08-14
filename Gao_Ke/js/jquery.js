// 导航栏head头部部分
$(function () {
  $.ajax({
    type: "get",//请求方式
    url: "json/head1.json",//地址，就是json文件的请求路径
    dataType: "json",//数据类型可以为 json 
    success: function (data) {//返回的参数就是 action里面所有的有get和set方法的参数
      var str = "";
      //data是一个集合,所以需要先遍历
      $.each(data, function (index, dataItem) {
        str += `
        <a href="#" class="menu">${dataItem.li}</a>
      `
      }); 
      $(".head .head-menu li").append(str);
    }
  })
})
$(function () {
  $.ajax({
    type: "get",//请求方式
    url: "json/head2.json",//地址，就是json文件的请求路径
    dataType: "json",//数据类型可以为 json 
    success: function (data) {//返回的参数就是 action里面所有的有get和set方法的参数
      var str = "";
      //data是一个集合,所以需要先遍历
      $.each(data, function (index, dataItem) {
        str += `<a href="#" class="menu">${dataItem.a1}</a>`
      });
      $(".head .head-menu1 li").append(str);
    }
  })
})


// 第五部分的head头部
$(function () {
  $.ajax({
    type: "get",//请求方式
    url: "json/div5.head.json",//地址，就是json文件的请求路径
    dataType: "json",//数据类型可以为 json 
    success: function (data) {//返回的参数就是 action里面所有的有get和set方法的参数
      var str = "";
      //data是一个集合,所以需要先遍历
      $.each(data, function (index, dataItem) {
        str += `
        <a href="#" class="menu5">${dataItem.li5}</a>
      `
      }); 
      $(".div5 .hh .div5-menu li").append(str);
    }
  })
})
//页面加载   获取全部信息
$(function () {
  $.ajax({
    type: "get",//请求方式
    url: "json/item.json",//地址，就是json文件的请求路径
    dataType: "json",//数据类型可以为 json 
    success: function (data) {//返回的参数就是 action里面所有的有get和set方法的参数
      var str = "";
      //data是一个集合,所以需要先遍历
      $.each(data, function (index, dataItem) {
        str += `<div class="l1"> <a href="#" id="la">
        <div class="l11">
          <img src="${dataItem.imgurl}" alt="" id="img5">
        </div>
        <div class="l12">
          <div class="mess1">
            <h4 id="mss11">${dataItem.title}</h4>
            <p id="mss12">${dataItem.show}</p>
          </div>
          <div class="mess2">
            <span>${dataItem.level}</span>
            <span>${dataItem.comments}</span>
          </div>
        </div>
      </a></div>`
      });
      $(".div5 .ll").append(str);
    }
  })
})