window.onload = function() {
    let ul1 = document.getElementsByClassName("head-menu1")[0];
    let ul1List = ul1.querySelectorAll(".menu");

    // console.log(ul1List === null);

    for (let i = 0; i < ul1List.length; i++) {
        ul1List[i].index = i;
    }

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
