//登录/注册hover效果
var login_in = document.querySelector('login_in');
var login_form = document.querySelector('login_form');

// login_in.onblur = function() {

// }


//登录/注册切换
var body_login = document.querySelector('.login_body_login');
var body_form = document.querySelector('.login_body_form');

var TurnToLogin = () => {
  // alert('111');
  //通过控制class：wrong中设置的显示属性
  body_login.className = 'login_body_login wrong';
  body_form.className = 'login_body_form';

}

var TurnToRegister = () => {
  // alert('222');
  body_login.className = 'login_body_login';
  body_form.className = 'login_body_form wrong';
}


//登录
//表单验证
var eipt = document.querySelector('.email_ipt');
var eipt_show = document.querySelector('.email_show');
var str;

var pasw = document.querySelector('.search1');
var pas_show = document.querySelector('.pas_show')
var strs;

//邮箱或手机号验证
//用正则函数判断数据格式
function checkemail(str) {
  str=eipt.value;
  //11位数字，以1开头|邮箱
  var re = /^(1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8})|(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;   
  if(re.test(str)){
    // alert('right');
    eipt_show.className = 'email_show';
  }else {
    // alert('worng');
    eipt_show.className = 'email_show wrong';
  }
}

//获取焦点，调用正则函数
eipt.onblur = function() {
  str = eipt.value;
  checkemail(str);
}

//密码验证：请输入6-20位密码，区分大小写，不能使用空格！
function checkpasw(str) {
  var re =/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
  if(re.test(str)){
    // alert('right');
    pas_show.className = 'pas_show';
  }else {
    // alert('worng');
    pas_show.className = 'pas_show wrong';
  }
}

pasw.onblur = function() {
  strs = pasw.value;
  checkpasw(strs);
}


//注册
//表单验证