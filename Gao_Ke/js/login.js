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

let zhuCe = document.getElementById("zhuce");
let registerBody = document.getElementsByClassName("main-body")[0];
zhuCe.onclick = function () {
    registerBody.innerHTML = `
                    <div class="body1">
                        <div class="input1" >
                            <input type="text"  id="PhoneNum" placeholder="请输入注册手机号"
                                   onfocus="showTips('phone1')"
                                   onblur="checkPhoneNum()"  onkeyup="checkPhoneNum()">
                            <span id="phone1"></span>
                        </div>
                        <div class="input2">
                            <input type="text" id="password" placeholder="请输入验证码"
                                   onfocus="showTips('psw')"
                                   onblur="checkPassword()"  onkeyup="checkPassword()">
                            <span id="psw"></span>
                        </div>
                    </div>
                    <div class="body2">
                        <label>
                            <input type="checkbox">同意
                        </label>
                        <div class="body-a" style="clear:both">
                            <a href="#">《慕课网注册协议》</a>
                           &
                            <a href="#">《隐私政策》</a>
                        </div>
                    </div>
                    <div class="body3">
                        <input type="button" onclick="checkFrom()" value="注册" >
                    </div>
                    <div class="footer">
                        <div class="fa">
                            <a href="#">其他方式登录:</a>
                        </div>

                    </div>
                `;
}