$(function () {
  ajax({
    url: "head",
    getStr: function (data, str) {
      $.each(data, function(index, dataItem) {
        str += `
        <a href="#">${dataItem}</a>
      `;
      });
      return str;
    },
    selector: "#header_menu_center",
  }),


  // $.ajax({
  //   type: "get",
  //   url: "json/head.json",
  //   dataType: "json",
  //   success: function (data) {
  //     var str = "";
  //     $.each(data, function(index, dataItem) {
  //       str += `
  //       <a href="#">${dataItem}</a>
  //   `;
  //     });
  //     $("#header_menu_center").append(str);
  //   }
  // })

  $.ajax({
    type: "get",
    url: "json/case.json",
    dataType: "json",
    // error: function (data) {alert("wew")},
    success: function (data) {
      var str = "";
      $.each(data, function(index, dataItem) {
        str += `<div class="case_index${dataItem.have_special_class ? ' case_commen' : ''}">
        <div class="index_card_top">
            <img src="./images/${dataItem.img}" alt="" width="270px" height="148px">
            <div class="card_label">
            </div>
        </div>
        <div class="index_card_content">
            <h3 class="card_name">${dataItem.card_name}</h3>
            <div class="card_buttom">
                <div class="card_info">
                    <span>${dataItem.card_info1}</span>
                    <span class="r">${dataItem.card_info2}</span>
                </div>
                <div class="card_price"> ${dataItem.card_price1}
                <span class="down">${dataItem.down ? ' 限时优惠' : ''}</span>
                </div>
            </div>
        </div>
    </div>`;
      });
      $("#case1 .container").append(str);
      $("#case2 .container").append(str);
    }
  })
})












