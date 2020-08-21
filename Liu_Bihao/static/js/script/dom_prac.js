function changeColorOfRightNav() {
    let rightNavs = document.getElementById("right_nav");
    let rightNavs_spanLists = rightNavs.querySelectorAll("span");

    for (let i = 0; i < rightNavs_spanLists.length; i++) {
        rightNavs_spanLists[i].index = i;
    }

    rightNavs.addEventListener('mouseover', function (event) {
        /* event.target 指被执行事件的 DOM 对象
         * event.currentTarget 的区别是：若无监听事件，则向上追溯 DOM 对象
         */
        let no_ = event.target.index;
        let obj = document.getElementById("right_nav").getElementsByTagName("span")[no_];
        obj.style.color = "lightskyblue";
        obj.style.fontWeight = "bolder";
    })

    rightNavs.addEventListener('mouseout', function (event) {
        let no_ = event.target.index;
        let obj = document.getElementById("right_nav").getElementsByTagName("span")[no_];
        obj.style.color = "black";
        obj.style.fontWeight = "unset";
    })
}

