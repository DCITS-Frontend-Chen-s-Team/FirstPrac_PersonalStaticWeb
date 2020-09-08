function showTips(spanId) {
//    获得要操作的span标签
    let spanP = document.getElementById(spanId);

}

function checkPhoneNum() {
    //获得用户输入的手机号
    const phoneNumber = document.getElementById("PhoneNum").value;
    //获得要显示的span内容
    const span = document.getElementById("phone1");
    //对手机号或者邮箱进行校验
    //     || 	phoneNumber ==/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    const regP = /(^1[3578]\d{9}$)|(^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$)/;
    const re = new RegExp(regP);
    console.log(re.test(phoneNumber));
    if (re.exec(phoneNumber)) {
        span.innerHTML = "";
    } else {
        span.innerHTML = `<font color='red' size='2'>请输入正确的邮箱或手机号</font>`;

    }
}

function checkPassword() {
    //获得用户输入的密码
    let Password = document.getElementById("password").value;
    //获得要显示的span内容
    let span = document.getElementById("psw")
    //对密码进行校验

    //普通判断
    // if (Password.length > 20) {
    //     span.innerHTML = `<font color='red' size='2'>请输入6-20位密码，区分大小写，不能使用空格！</font>`;
    // } else if (Password.length < 6) {
    //     span.innerHTML = `<font color='red' size='2'>请输入6-20位密码，区分大小写，不能使用空格！</font>`;
    // } else {
    //     span.innerHTML = ``;
    // }


    //正则表达式写法
    const regPs = /^[a-zA-Z0-9_-]{6,20}$/;
    const res = new RegExp(regPs);
    if (res.test(Password)) {
        span.innerHTML = ""
    } else {
        span.innerHTML = `<font color='red' size='2'>请输入6-20位密码，区分大小写，不能使用空格！</font>`;
    }
}

function checkFrom() {
    checkPhoneNum();
    checkPassword();


}


//登陆注册用dom方法实现变色


//获取到id是loginPhoneNum的元素
// let  qqq= document.getElementById("loginPhoneNum");
// alert(qqq);
// qqq.addEventListener('mouseover',function (event){
//     qqq.style.color="red";
//     qqq.style.fontWeight="bolder";
// })
//
//
// let bodyRegistered = document.getElementById("registered");
// bodyRegistered.addEventListener('mouseover',function (event){
//     bodyRegistered.style.color="red";
//     bodyRegistered.style.fontWeight="bolder";
// })


















