var fontColors = document.getElementById("right_nav");
var list = fontColors.querySelectorAll("span");

for (var j = 0; j < list.length; j++) {
    list[j].index = j;
}

fontColors.addEventListener('mouseover', function (event) {
    /* event.target 指被执行事件的 DOM 对象
     * event.currentTarget 的区别是：若无监听事件，则向上追溯 DOM 对象
     */
    var no_ = event.target.index;
    var obj = document.getElementById("right_nav").getElementsByTagName("span")[no_];
    obj.style.color = "lightskyblue";
    obj.style.fontWeight = "bolder";
})

fontColors.addEventListener('mouseout', function (event) {
    var no_ = event.target.index;
    var obj = document.getElementById("right_nav").getElementsByTagName("span")[no_];
    obj.style.color = "black";
    obj.style.fontWeight = "unset";
})