var element = document.getElementById("nav_item");
var all_li = element.getElementsByTagName("li");
console.log(all_li[0]);

for (var i = 0; i < all_li.length; i++){
    all_li[i].addEventListener("mouseover",function () {
        var all_a = this.getElementsByTagName("a");
        console.log(all_a)
        for (var ele in all_a) {
            all_a[ele].style.color = "black";
        }
    })

    all_li[i].addEventListener("mouseout",function () {
        var all_a = this.getElementsByTagName("a");
        console.log(all_a)
        for (var ele in all_a) {
            all_a[ele].style.color = "#8e8c8c";
        }
    })
}