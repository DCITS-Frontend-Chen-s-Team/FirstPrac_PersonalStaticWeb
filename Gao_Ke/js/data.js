var eachFunc = function (data) {
    var str = "";
    $.each(data[0].message, function (index, messageItem) {
        str += `<div class="l1"> <a href="#" id="la">
        <div class="l11">
          <img src="${messageItem.imgurl}" alt="" id="img5">
        </div>
        <div class="l12">
          <div class="mess1">
            <h4 id="mss11">${messageItem.title}</h4>
            <p id="mss12">${messageItem.show}</p>
          </div>
          <div class="mess2">
            <span>${messageItem.level}</span>
            <span>${messageItem.comments}</span>
          </div>
        </div>
      </a></div>`;
    });
    return str;
}

getRequest("json/div5.json", eachFunc, ".div5 .ll");