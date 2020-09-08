function loadsignin() {
    var background = document.getElementsByClassName("modal-backdrop");
    var signin_interface = document.getElementsByClassName("signin");

    var a = document.getElementsByClassName("rlf-tip-wrap");
    console.log(a);
    // console.log(background);
    //console.log(signin_interface);
    for (var i = 0; i < background.length; i++){
        background[i].style.display = "block";
    }

    for (var i = 0; i < signin_interface.length; i++){
        signin_interface[i].style.display = "block";
    }
}

function exitsign() {
    var background = document.getElementsByClassName("modal-backdrop");
    var signin_interface = document.getElementsByClassName("rl-modal");

    // console.log(background);
    // console.log(signin_interface);
    for (var i = 0; i < background.length; i++){
        background[i].style.display = "none";
    }

    for (var i = 0; i < signin_interface.length; i++){
        signin_interface[i].style.display = "none";
    }

    var error = document.getElementsByClassName("rlf-tip-wrap");
    error[0].innerHTML = "";
    error[1].innerHTML = "";
    var id = document.getElementsByClassName("js-own-name");
    var pwd = document.getElementsByClassName("js-pass-pwd")
    id[0].value = "";
    pwd[0].value = "";
}

function isEmail(str) {
    var emailRegExp = new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")
    return emailRegExp.test(str);
}

function isPhone(str) {
    var phoneRegExp = new RegExp("^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$")
    return phoneRegExp.test(str);
}

function isPassword(str) {
    var passwordRegExp = new RegExp("^[a-zA-Z]\\w{5,19}$")
    return passwordRegExp.test(str);
}

function checkid() {
    var id = document.getElementsByClassName("js-own-name");
    var str = id[0].value;
    var error = document.getElementsByClassName("rlf-tip-wrap");

    if (isEmail(str) || isPhone(str)) {
        error[0].innerHTML = "";
    } else {
        error[0].innerHTML = error[0].dataset.errorHint;
    }
}

function checkpwd() {
    var pwd = document.getElementsByClassName("js-pass-pwd");
    var str = pwd[0].value;
    var error = document.getElementsByClassName("rlf-tip-wrap");

    if (isPassword(str)) {
        error[1].innerHTML = "";
    } else {
        error[1].innerHTML = error[1].dataset.errorHint;
    }
}