let loginPattern; // 0为注册，1为登录
let loginFormPattern = 0; // 0为账号密码登录，1为手机验证码登录
var signBody = document.getElementById("signIn"); // 登录卡片整体
var loginStatus = 0; // 登录验证状态，0为未通过，1为通过

/**
 * 登录和注册按钮的事件监听
 * 当用户点击右上角 登录/注册 按钮时，弹出相应的表单卡片
 */
window.onload = function () {
    var register_btn = document.getElementById("register");
    var login_btn = document.getElementById("login");

    register_btn.addEventListener("click", function () {
        loginPattern = 0; // 注册
        login_event();
    }, false);
    login_btn.addEventListener("click", function () {
        loginPattern = 1; // 登录
        login_event();
    }, false);

    lgnCardHeadChange();
    loginCardHide();
}

/** 登录卡片头部标签的选择和事件监听，点击标签时跳转到相应的表单 */ 
var register_label = document.getElementById("registerLabel");
var login_label = document.getElementById("loginLabel");
register_label.onclick = function () {
    loginPattern = 0;
    lgnCardHeadChange();
}
login_label.onclick = function () {
    loginPattern = 1;
    lgnCardHeadChange();
}

/**
 * 登录卡片头部标题的样式的改变
 * （处于登录状态，即登录标签下有红色标记）
 */
function lgnCardHeadChange() {
    if (loginPattern === 0) {
        register_label.className = "active-title"; // active-title 使文字变为红色
        login_label.className = "";
    } else if (loginPattern === 1) {
        login_label.className = "active-title";
        register_label.className = "";
    }
}

/**
 * 注册页表单的切换
 * 覆盖表单 DOM 结构
 */
function signInFormChange() {
    var signInForm = document.getElementById("loginCard_container");
    signInForm.innerHTML = `<div class="rl-modal-body js-modal-body js-registerWrap">
            <form id="signup-form pr">
                <div class="rlf-group pr">
                    <div class="rlf-areacode js-code-btn">+<span>86</span><i class="imv2-arrow1_d"></i></div>
                    <input type="text" maxlength="37" value="" name="email" data-callback="checkusername"
                           data-validate="require-mobile-phone" autocomplete="off" class="ipt ipt-phone"
                           placeholder="请输入注册手机号">
                    <p class="rlf-tip-wrap errorHint color-red" data-error-hint="请输入正确的手机号"></p></div>
                <div class="rlf-group clearfix form-control ">
                    <input type="text" name="verify" class="ipt ipt-verify js-emailverify l"
                           data-validate="require-string" data-callback="checkverity" autocomplete="off"
                           maxlength="4" data-minlength="4" placeholder="请输入验证码">
                    <a href="javascript:void(0)" hidefocus="true" class="verify-img-wrap js-verify-refresh">
                        <img class="verify-img" src="/passport/user/verifycode?t=1599122966777">
                    </a>
                    <a href="javascript:void(0)" hidefocus="true" class="icon-refresh js-verify-refresh"></a>
                    <p class="rlf-tip-wrap errorHint color-red" data-error-hint="验证码错误"></p>
                </div>
                <div class="rlf-group rlf-appendix form-control  clearfix" style="margin-bottom:0">
                    <label for="signup-protocol" class="rlf-autoin l" hidefocus="true">
                        <input type="checkbox" class="auto-cbx" id="signup-protocol">同意
                        <a class="ipt-agreement" target="_blank" href="#">《慕课网注册协议》</a>&amp;
                        <a href="#" class="ipt-agreement" target="_blank">《隐私政策》</a>
                    </label>
                    <p class="rlf-tip-wrap errorHint color-red rlf-tip-globle" id="signup-globle-error"
                       data-error-hint="请同意慕课网注册协议"></p>
                </div>
                <div class="rlf-group clearfix">
                    <input type="submit" href="javascript:void(0)" id="signup-btn" hidefocus="true"
                       class="moco-btn moco-btn-red moco-btn-lg btn-full btn r"> 注册 </input>
                </div>
            </form>
        </div>`;
}

/**
 * 切换登录方式的按钮（“手机验证码登录”，“账号密码登录”）
 */
function loginFormChanger() {
    var loginFormChanger = document.getElementsByClassName("rlf-other")[0];
    loginFormChanger.addEventListener("click", function () {
        loginFormPattern === 0 ? loginFormPattern = 1 : loginFormPattern = 0;
        loginFormChange();
    }, false);
    if (loginFormPattern === 0) {
        loginFormChanger.innerHTML = "手机验证码登录";
    } else if (loginFormPattern === 1) {
        loginFormChanger.innerHTML = "账号密码登录";
    }
}

/**
 * 登录页表单的切换
 * （2种登录方式）覆盖表单 DOM 结构
 */
function loginFormChange() {
    var loginForm = document.getElementById("loginCard_container");
    var htmlStr = "";
    // 账号密码登录
    if (loginFormPattern === 0) { // 账号密码
        htmlStr = `<div class="rl-modal-body js-loginWrap">
    <div class="clearfix">
        <form id="signup-form" autocomplete="off">
            <div class="rlf-group pr">
                <input type="text" onblur="loginFormatAuth()" name="email" data-validate="require-mobile-phone"
                       autocomplete="off" class="ipt ipt-email js-own-name" placeholder="请输入登录手机号/邮箱">
                <p class="data-error-hint"></p>
            </div>
            <div class="rlf-group pr">
                <a href="javascript:void(0)" hidefocus="true" class="proclaim-btn js-proclaim imv2-visibility_off is-pwd"
                   tabindex="-1">
                </a>
                <input type="password" onblur="loginFormatAuth()" name="password" data-validate="require-password"
                       class="ipt ipt-pwd js-loginPassword js-pass-pwd" placeholder="请输入密码" maxlength="20" autocomplete="off">
                <p class="rlf-tip-wrap errorHint color-red "></p>
            </div>
            <div class="rlf-group rlf-appendix form-control  clearfix">
                <label for="auto-signin" class="rlf-autoin l" hidefocus="true">
                    <input type="checkbox" checked="checked" class="auto-cbx" id="auto-signin">7天内自动登录
                </label>
            </div>
            <p class="rlf-tip-globle color-red" id="signin-globle-error"></p>
            <div class="rlf-group clearfix">
                <input type="button" onclick="loginAuth()" value="登录" hidefocus="true" class="moco-btn moco-btn-red moco-btn-lg btn-full xa-login">
            </div>
        </form>
    </div>
</div>
<div class="rl-model-footer">
    <div class="pop-login-sns clearfix">
        <span class="l rlf-other xa-showSignin"></span>
    </div>
    <div class="privacy_tip">登录即同意慕课网
        <a href="#" target="_blank">《隐私政策》</a>
    </div>
    <div class="erweima xa-showQrcode"></div>
</div>`;
        loginForm.innerHTML = htmlStr;
        loginFormChanger();
    }
    // 手机验证码登录
    else if (loginFormPattern === 1) { // 手机验证码
        htmlStr = `<div class="rl-modal-body js-loginWrap">
    <div class="clearfix">
        <form id="signup-form" autocomplete="off">
            <div class="rlf-group pr">
                <div class="rlf-areacode">+86</div>
                <input type="text" value="" maxlength="37" name="phone" data-validate="require-mobile-phone" autocomplete="off"
                       class="ipt ipt-phone" placeholder="短信登录仅限中国大陆用户">
                <p class="rlf-tip-wrap errorHint color-red" data-error-hint="请输入正确的手机号"></p>
            </div>
            <div class="rlf-group pr phoneVerityBox">
                <input type="text" id="js-phoneVerity" data-validate="require-string" data-minlength="4"
                       class="ipt" placeholder="请输入短信验证码" maxlength="4" autocomplete="off">
                <p class="reSend pa active js-phonecode-box"><span class="js-signin-send">获取验证码</span></p>
                <p class="rlf-tip-wrap errorHint color-red" data-error-hint="请输入正确验证码"></p>
            </div>
            <div class="rlf-group rlf-appendix form-control  clearfix">
                <label for="auto-signIn" class="rlf-autoin l" hidefocus="true">
                    <input type="checkbox" checked="checked" class="auto-cbx" id="auto-signin">7天内自动登录</label>
            </div>
            <p class="rlf-tip-globle color-red" id="signin-globle-error"></p>
            <div class="rlf-group clearfix">
                <input type="button" onclick="loginAuth()" value="登录" hidefocus="true"
                       class="moco-btn moco-btn-red moco-btn-lg btn-full xa-phone-login">
            </div>
        </form>
    </div>
</div>
<div class="rl-model-footer">
    <div class="pop-login-sns clearfix">
        <span class="l rlf-other xa-showSignin"></span>
    </div>
    <div class="privacy_tip">登录即同意慕课网
        <a href="#" target="_blank">《隐私政策》</a>
    </div>
    <div class="erweima xa-showQrcode"></div>
</div>`;
        loginForm.innerHTML = htmlStr;
        loginFormChanger();
    }
}

/**
 * 打开登录界面
 * 改变登录卡片样式为可见
 */
function login_event() {
    lgnCardHeadChange();
    if (loginPattern === 0) {
        signBody.style.visibility = "visible";
        signInFormChange();
    } else if (loginPattern === 1) {
        signBody.style.visibility = "visible";
        loginFormChange();
    }
}

/** 静态数据集，类比从数据库引用出的数据 */ 
var userInfos = [
    {
        account: "admin@163.com",
        username: "刘碧豪",
        pwd: "1234"
    },
    {
        account: "user@163.com",
        username: "奥特曼",
        pwd: "1234"
    },
    {
        account: "root@163.com",
        username: "蜘蛛侠",
        pwd: "1234"
    }
];

/**
 * 登录页正则表达验证
 */
function loginFormatAuth() {
    var accountInput = document.getElementsByName("email")[0];
    var pwdInput = document.getElementsByName("password")[0];

    // 账号正则验证
    var accountPattern = new RegExp(/^(1[0-9]{10}$)|(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/);
    var res = accountPattern.test(accountInput.value);
    if (res === false) {
        document.getElementsByClassName("data-error-hint")[0].innerHTML = "请输入正确的邮箱或手机号";
        accountInput.focus();
    } else {
        document.getElementsByClassName("data-error-hint")[0].innerHTML = "";
    }

    // 密码（以字母开头，长度在6~18之间，只能包含字母、数字和下划线）
    // var pwdPattern = new RegExp(/^[a-zA-Z]\w{5,17}$/);
}

/**
 * 登录页账号密码验证
 */
function loginAuth() {
    var accountInput = document.getElementsByName("email")[0].value;
    var pwdInput = document.getElementsByName("password")[0].value;
    var accountExist = 0, loginUser = "";
    for (var userInfo of userInfos) {
        if (accountInput === userInfo.account) {
            accountExist = 1;
            if (pwdInput === userInfo.pwd) {
                loginStatus = 1;
                loginUser = userInfo.username;
            } else {
                alert("Wrong Password!");
            }
            break;
        }
    }
    if (accountExist === 0) {
        alert("Account Not Exist!");
    } else if (loginStatus === 1) { // 登录验证通过
        signBody.style.visibility = "hidden"; // 隐藏登录卡片
        updateUserInfo(loginUser); // 更新顶部栏信息
    }
}

/**
 * 关闭登录页面
 */
function loginCardHide() {
    var close_btn = document.getElementsByClassName("rl-close")[0];
    close_btn.onclick = function () {
        signBody.style.visibility = "hidden";
    }
}

/**
 * 修改顶部栏信息
 * 登录成功后顶部栏显示“欢迎你，{用户名}”
 * @param username
 */
function updateUserInfo(username) {
    var loginWel = document.getElementById("loginWelcome");
    loginWel.innerHTML = `<span>欢迎你，${username}！</span>`;
}
