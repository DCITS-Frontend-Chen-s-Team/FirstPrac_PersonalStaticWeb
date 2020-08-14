$(function () {
  $.ajax({
    type: "get",//请求方式
    url: "json/head1.json",//地址，就是json文件的请求路径
    dataType: "json",//数据类型可以为 json 
    success: function (data) {//返回的参数就是 action里面所有的有get和set方法的参数
      var str = "";
      //data是一个集合,所以需要先遍历
      $.each(data, function (index, dataItem) {
        str += `<li>
        <a href="#" class="menu">${dataItem.li1}</a>
        <a href="#" class="menu">${dataItem.li2}</a>
        <a href="#" class="menu">${dataItem.li3}</a>
        <a href="#" class="menu">${dataItem.li4}</a>
        <a href="#" class="menu">${dataItem.li5}</a>
        <a href="#" class="menu">${dataItem.li6}</a>
      </li>`
      });
      $(".head .head-menu").append(str);
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
        str += `<a href="#" class="menu">${dataItem.li11}</a>
        <a href="#" class="menu">${dataItem.li12}</a>
        <a href="#" class="menu">${dataItem.li13}</a>
        /
        <a href="#" class="menu">${dataItem.li14}</a>`
      });
      $(".head .head-menu1").append(str);
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