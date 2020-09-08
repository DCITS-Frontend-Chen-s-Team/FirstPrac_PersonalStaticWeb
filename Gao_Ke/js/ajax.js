// 导航栏head头部部分
$(function () {
    $.ajax({
        type: "get",//请求方式
        url: "json/head.json",//地址，就是json文件的请求路径
        dataType: "json",//数据类型可以为 json
        success: function (data) {//返回的参数就是 action里面所有的有get和set方法的参数
            var str = "";
            // data是一个集合,所以需要先遍历
            $.each(data, function (index, dataItem) {
                for (let i = 0; i < dataItem.left.length; i++) {
                    str += `<a href="#" id="menu">${dataItem.left[i]}</a>`;
                }
            });
            $(".head #head-menu li").append(str);
        },
        complete: function () {
            //取得某<div>中的所有<a>元素
            let ul1 = document.getElementById("head-menu");
            let ul1List = ul1.querySelectorAll("a");

            for (let i = 0; i < ul1List.length; i++) {
                ul1List[i].index = i;
            }

            // Dom0级事件处理程序
            ul1.onmouseover = function (event) {
                //target可获得触发事件后返回的元素
                let num = event.target.index;
                ul1List[num].style.color = "red";
                ul1List[num].style.fontWeight = "bolder";
            }
            ul1.onmouseout = function (event) {
                let num = event.target.index;
                ul1List[num].style.color = "black";
                ul1List[num].style.fontWeight = "unset";
            }

        }
    })
})


$(function () {
    $.ajax({
        type: "get",//请求方式
        url: "json/head.json",//地址，就是json文件的请求路径
        dataType: "json",//数据类型可以为 json
        success: function (data) {//返回的参数就是 action里面所有的有get和set方法的参数
            var str = "";
            //data是一个集合,所以需要先遍历
            $.each(data, function (index, dataItem) {
                for (let i = 0; i < dataItem.right.length; i++) {
                    str += `<a href="#" id="menu">${dataItem.right[i]}</a>`;
                }
            });
            $(".head #head-menu1 li").append(str);
        },
        complete: function () {
            //取得某<div>中的所有<a>元素
            let ul1 = document.getElementById("head-menu1");
            let ul1List = ul1.querySelectorAll("a");

            for (let i = 0; i < ul1List.length; i++) {
                ul1List[i].index = i;
                window.ul1List = ul1.querySelectorAll("a");

                for (let i = 0; i < ul1List.length; i++) {
                    ul1List[i].index = i;
                    if(i === 2){
                        ul1List[i].href = "Login.html";
                    }
                    else if(i === 3){
                        ul1List[i].href = "Login.html";
                    }
                }
            }
            //Dom2级事件处理程序 添加事件addEventListener(),移出事件removeEventListener()
            ul1.addEventListener('mouseover', function (event) {
                let num = event.target.index;
                ul1List[num].style.color = "red";
                ul1List[num].style.fontWeight = "bolder";
            }, false);

            ul1.addEventListener('mouseout', function (event) {
                let num = event.target.index;
                ul1List[num].style.color = "black";
                ul1List[num].style.fontWeight = "unset";
            }, false);
        }
    })
})


// 第一部分弹框
$(function () {
    $.ajax({
        type: "get",
        url: "json/div1.json",
        dataType: "json",
        success: function (data) {
            var str = "";
            var course_str;
            var label_str;

            $.each(data, function (index, dataItem) {
                label_str = ""; // 弹出框标签模板字符串
                course_str = ""; // 课程卡片模板字符串

                str += `<div href="#" id="a1">
                    <span>${dataItem.f_item}</span>
                    <div class="dropdown-content">
                      <div class="dc">
                        <div class="dc1">
                          <span><b>${dataItem.c_item.title}</b></span>
                       </div>
                       <div class="xs1">
                         <ul>
                            <li>`;

                for (var i = 0; i < dataItem.c_item.label.length; i++) {
                    label_str += `<a href="#" id="xs11">${dataItem.c_item.label[i]}</a>`;
                }

                str += label_str;
                str += `</li></ul></div></div>`;

                for (var j = 0; j < dataItem.c_item.message.length; j++) {
                    course_str += `<div class="xs2">
                                <div class="xs21">
                                  <div class="xs221">
                                    <img src="${dataItem.c_item.message[j].imgurl}" alt="" id="img21">
                                  </div>
                                  <div class="xs222">
                                    <div class="xsmess21">
                                      <p id="xsmss21">${dataItem.c_item.message[j].title}</p>
                                    </div>
                                    <div class="xsmess22">
                                      <span id="xsmss22">${dataItem.c_item.message[j].show}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>`;
                }

                str += course_str;
                str += `</div></div>`;

            });
            $(".div1 .aa .item").append(str);
        }
    })
})


// 第五部分的head头部
$(function () {
    $.ajax({
        type: "get",//请求方式
        url: "json/div5.json",//地址，就是json文件的请求路径
        dataType: "json",//数据类型可以为 json
        success: function (data) {//返回的参数就是 action里面所有的有get和set方法的参数
            var str = "";
            //data是一个集合,所以需要先遍历

            $.each(data[0].head, function (index, item) {
                str += `<a href="#" class="menu5">${item}</a>`;
            });

            $(".div5 .hh .div5-menu li").append(str);
        },
        complete: function () {
            var ul5 = document.getElementsByClassName("div5-menu")[0];
            var ul5List = ul5.querySelectorAll("a");
            for (var i = 0; i < ul5List.length; i++) {
                ul5List[i].index = i;
            }
            //dom2级调用removeEventListener()方法
            var final = function (event) {
                let num = event.target.index;
                ul5List[num].style.color = "red";
                ul5List[num].style.fontWeight = "lighter"
            }
            ul5.addEventListener("mouseover", final, false);


            var final1 = function (event) {
                let num = event.target.index;
                ul5List[num].style.color = "black";
                ul5List[num].style.fontWeight = "lighter"
            }
            ul5.addEventListener("mouseout", final1, false);


        }
    })
})
//第五部分页面加载   获取全部信息
// $(function () {
//     $.ajax({
//         type: "get",//请求方式
//         url: "json/div5.json",//地址，就是json文件的请求路径
//         dataType: "json",//数据类型可以为 json
//         success: function (data) {//返回的参数就是 action里面所有的有get和set方法的参数
//             var str = "";
//             //data是一个集合,所以需要先遍历
//             $.each(data[0].message, function (index, messageItem) {
//                 str += `<div class="l1"> <a href="#" id="la">
//         <div class="l11">
//           <img src="${messageItem.imgurl}" alt="" id="img5">
//         </div>
//         <div class="l12">
//           <div class="mess1">
//             <h4 id="mss11">${messageItem.title}</h4>
//             <p id="mss12">${messageItem.show}</p>
//           </div>
//           <div class="mess2">
//             <span>${messageItem.level}</span>
//             <span>${messageItem.comments}</span>
//           </div>
//         </div>
//       </a></div>`;
//             });
//
//             $(".div5 .ll").append(str);
//         }
//     })
// })

