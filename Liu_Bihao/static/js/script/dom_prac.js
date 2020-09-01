function changeColorOfRightNav() {
    let rightNavs = document.getElementById("right_nav");
    let rightNavs_spanLists = rightNavs.querySelectorAll("span");

    for (let i = 0; i < rightNavs_spanLists.length; i++) {
        rightNavs_spanLists[i].index = i;
    }

    rightNavs.addEventListener('mouseover', function (event) {
        /* event.target 指事件的目标
         * event.currentTarget 指其事件处理程序当前正在处理事件的那个元素
         */
        let no_ = event.target.index;
        let obj = document.getElementById("right_nav").getElementsByTagName("span")[no_];
        obj.style.color = "lightskyblue";
        obj.style.fontWeight = "bolder";
    }, false);

    rightNavs.addEventListener('mouseout', function (event) {
        let no_ = event.target.index;
        let obj = document.getElementById("right_nav").getElementsByTagName("span")[no_];
        obj.style.color = "black";
        obj.style.fontWeight = "unset";
    }, false);
}

changeColorOfRightNav();
