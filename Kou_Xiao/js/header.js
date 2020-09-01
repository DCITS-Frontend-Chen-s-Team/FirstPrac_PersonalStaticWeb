window.addEventListener('load', function () {
  var div = document.querySelector('#head_right_show');
  var a = div.children;
  ergodic();
  
  var li = document.querySelector('#header_menu_center');
  var a = li.children;
  ergodic();

  function ergodic(){
    for (var i = 0; i < a.length; i++) {
      a[i].onmouseover = function () {
        this.style.color = 'red';
      }
      a[i].onmouseout = function () {
        this.style.color = '#6A6A6A';
      }
    }
  }
  
  // console.log(li[0].firstElementChild);
  // for (var i = 0; i < li.length; i++) {
  //   li[i].onmouseover = function (event) {
  //     event.target.querySelector("a").style.color = 'red';
  //   }
  //   li[i].onmouseout = function (event) {
  //     event.target.querySelector("a").style.color = '#6A6A6A';
  //   }
  // }
})