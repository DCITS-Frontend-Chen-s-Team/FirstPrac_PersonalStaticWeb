(function(mui, tool) {
	tool.fdiso_24 = "09900900009099999999999999999000000000000000000000000000112131122232000888899999";
	//var sysInfo = app.storage.getOutSysInfo() || {};
	tool.fdiso_41 = "10116911"; //10116911
	tool.fdiso_7_new = "14"; //新渠道号，新增的接口：开卡和建立客户信息  以及新增柜员签到及凭证类交易
	tool.fdiso_7_old = "12"; //老渠道号，之前已经存在的接口用这个渠道号
	tool.leftAdd0 = function(data, length) {
		//a = 1526, 8leng
		var len = length - data.length;
		var str = "";
		for(var i = 0; i < len; i++) {
			str += "0";
		}
		return str + data;
	}
	tool.rightAddSpace = function(data, length) {
		//a = 1526, 8leng
		var len = length - data.length;
		var str = "";
		for(var i = 0; i < len; i++) {
			str += " ";
		}
		return str + data;
	}
	/**
	 * 关闭所有页面回到首页,指定不需要关闭的页面id放入数组传递过来
	 * designationPages new Array()
	 */
	tool.closeAllBusinessWebView = function(designationPages) {
		var donotCloseWebview = { //不关闭的页面值为stay,关闭的值为close
			"default": "stay",
			"default-sub": "stay",
			"system": "stay",
			"product": "stay",
			"reserve": "stay",
			"queue": "stay",
			"customerCenter": "stay",
			"resDetail": "stay",
			"debit_home": "stay",
			"debit_home-sub": "stay",
			"reserve_business": "stay",
			"reserve_business-sub": "stay",
			"index": "stay",
			"service": "stay",
			"videoService": "stay",
			"microLoan": "stay",
			"managementCenter": "stay"
		};
		if(designationPages){
			for(var i = 0; i < designationPages.length; i++){
				donotCloseWebview[designationPages[i]] = "stay";
			}
		}
		var launchWebview = plus.webview.getLaunchWebview();
		var currentWv = plus.webview.currentWebview();
		//当前页面需要特殊处理，需要延迟关闭，关太快会 造成白屏
		donotCloseWebview[currentWv.id] = "stay";
		donotCloseWebview[launchWebview.id] = "stay";
		var webViews = plus.webview.all();
		for(var index in webViews) {
			var webView = webViews[index];
			if(donotCloseWebview[webView.id] == "stay") {
				continue;
			} else {
				webView.close();
			}
		}
		setTimeout(function() {
			currentWv.close();
		}, 200);
	};
	tool.isEmpty = function(value) {
		if(value === undefined || value == null || value === '' || value.length === 0) {
			return true;
		}
		return false;
	};

	/**
	 * 获得下拉列表选中的值
	 * @param {Object} emId
	 */
	tool.getSelectValue = function(selectObj) {
		var selectValue = [];
		var options = selectObj.options;
		var tempSelect = options[options.selectedIndex];
		var text = tempSelect.text;
		var value = tempSelect.value;
		if(!value || text === '请选择') {
			return null;
		}
		selectValue.push(value, text);
		return selectValue;
	};

	/**
	 * 统一与后台服务通信的Ajax方法
	 * @param {Object} serviceCode 服务码
	 * @param {Object} dataValue 输入数据
	 * @param {Object} scallback ajax调用成功时的回调函数
	 * @param {Object} ecallback ajax调用失败时的回调函数
	 */
	tool.ajaxService = function(serviceCode, dataValue, scallback, ecallback, timeout) {
		app.ajax.getJSONData({
			service: serviceCode,
			data: dataValue,
			timeout: timeout,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if(ecallback) {
					ecallback(XMLHttpRequest, textStatus, errorThrown);
				}
			},
			success: function(res) {
				if(scallback) {
					scallback(res);
				}
			}
		});
	};

	/**
	 * 关闭指定的页面
	 * @param {Object} pages webviewId数组
	 */
	tool.closeBeforePages = function(pages) {
		for(var index in pages) {
			var page = plus.webview.getWebviewById(pages[index]);
			if(page) {
				page.close("none");
			}
		}
	};
	
	/**
	 * 隐藏指定的页面
	 * @param {Object} pages webviewId数组
	 */
	tool.closePages = function(pages) {
		for(var index in pages) {
			var page = plus.webview.getWebviewById(pages[index]);
			if(page) {
				page.hide();
			}
		}
	};
	/**
	 * 根据指定的页面ID显示页面
	 * @param {Object} pageId
	 */
	tool.showPage = function(pageId) {
		var page = plus.webview.getWebviewById(pageId);
		if(page) {
			page.show();
			mui.fire(page, "initpage");
		}
	};
	/**
	 *
	 * @param {Object} img
	 * @param {Object} drawAreaObj
	 */
	var encodeToBase64 = function(img, drawAreaObj) {
		var canvas = document.createElement("canvas");
		canvas.width = drawAreaObj.width;
		canvas.height = drawAreaObj.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, drawAreaObj.width, drawAreaObj.height);
		var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
		var dataURL = canvas.toDataURL("image/" + ext);
		return dataURL;
	};

	tool.getBase64Image = function(path, drawAreaObj, callback) {
		if(AppTools.isEmpty(path)) {
			console.log('getBase64Image method’s path param cannot be empty!');
			return;
		}
		if(AppTools.isEmpty(drawAreaObj)) {
			console.log('getBase64Image method’s drawAreaObj param cannot be empty!');
			return;
		}
		if(!callback) {
			console.log('getBase64Image method’s callback param cannot be empty!');
			return;
		}
		var image = new Image();
		image.src = path;
		image.onload = function() {
			var base64Img = encodeToBase64(image, drawAreaObj);
			callback(base64Img);
		};
	};

	/**
	 * 判断用户是否有某个资源的权限,此用户没有任何权限信息，则不做
	 * @param {Object} resourceid
	 */
	tool.hasPrivByResourceId = function(resourceid) {
		var rigghtlist = app.storage.getUserDatas().RIGHT_LIST;
		//有权限校验权限，没有则直接不校验
		if(rigghtlist) {
			for(var i = 0; i < rigghtlist.length; i++) {
				if(rigghtlist[i].RESOURCEID == resourceid) {
					return true;
				}
			}
		}
		return false;
	}
	/*
	 * 上传图片文件
	 */
	tool.createUpload = function(fileArray, ind, callback, erroback) {
		var ur = app.storage.getFileUploadUrl();
		var task = plus.uploader.createUpload(ur, {
				method: "POST",
				blocksize: 204800,
				priority: 100
			},
			function(t, status) {
				// 上传完成
				if(status == 200) {
					if(callback) {
						callback();
					}
				} else {
					if(erroback) {
						erroback();
					}
				}
			}
		);
		task.setRequestHeader('dir', ind);
		for(var index in fileArray) {
			var str = '';
			if(fileArray[index] != null && fileArray[index] != undefined && fileArray[index] != '') {
				str = fileArray[index].toString();
			}
			task.addFile(fileArray[index], {
				key: str.substr(str.lastIndexOf('/') + 1)
			});
		}
		task.start();
	}
	/**
	 * 获得当前页面
	 * @param {Object} pageId 页面ID
	 */
	var getWebView = function(pageId) {
		var cws = null;
		if(pageId != null || pageId !== undefined) {
			cws = plus.webview.getWebviewById(pageId);
		} else {
			cws = plus.webview.currentWebview();
		}
		return cws;
	};

	/** 
	 * 显示蒙板
	 * @param {Object} pageId 需要显示蒙板的页面ID
	 */
	tool.showMask = function(pageId, opacity) {
		opacity = opacity || 0.3;
		var cws = getWebView(pageId);
		cws.setStyle({
			mask: 'rgba(0,0,0,' + opacity + ')'
		});
		return cws;
	};

	/** 
	 * 隐藏蒙板
	 * @param {Object} pageId 需要隐藏蒙板的页面ID
	 */
	tool.hiddenMask = function(pageId) {
		var cws = getWebView(pageId);
		cws.setStyle({
			mask: "none"
		});
		return cws;
	};

	/**
	 *  打开弹出串口
	 * @param {Object} pageId 页面ID
	 * @param {Object} url 页面URL
	 * @param {Object} ptop 弹出窗口距离顶部的高度
	 * @param {Object} pleft 弹出窗口距离左侧的弹出窗口
	 * @param {Object} pwidth 弹出窗口的宽度
	 * @param {Object} pheight 弹出窗口的高度
	 */
	tool.openPopWindow = function(pageId, url, ptop, pleft, pwidth, pheight, extra) {
		var popW = plus.webview.getWebviewById(pageId);
		if(popW === undefined || popW == null) {
			popW = plus.webview.create(url, pageId, {
				top: ptop,
				left: pleft,
				width: pwidth,
				height: pheight,
				background: "transparent",
				opacity: "1"
			}, extra);
		}
		popW.show();
		//调用initpage方法
		mui.fire(popW, "initpage");
		return popW;
	};

	/**
	 * 关闭弹出窗口
	 * @param {Object} pageId 页面ID
	 */
	tool.closePopWindow = function(pageId) {
		var cws = getWebView(pageId);
		cws.hide();
	};

	/**
	 * 格式化金额
	 * @param {Object} num 金额
	 * @param {Object} precision 精度
	 */
	tool.formatMoney = function(num, precision, flag) {
		if(AppTools.isEmpty(num)) {
			num = '0.00';
		}
		num = num.toString().replace(/\$|\,/g, '');
		if(isNaN(num)) {
			num = "0.00";
		}
		// 数字符号标识
		var sign = (num == (num = Math.abs(num)));
		var cents = '00';
		if(precision !== undefined && precision != null && precision !== '') {
			precision = parseInt(precision);
			var zeroStr = '';
			for(var n = 0; n < precision; n++) {
				zeroStr = zeroStr + '0';
			}
			zeroStr = '1' + zeroStr;
			precision = parseInt(zeroStr);
			num = Math.round(num * precision);
			cents = num % precision;
			num = Math.floor(num / precision).toString();
		}
		if(cents === 0 || cents === '0') {
			cents = '00';
		}
		if(!flag) {
			for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
				num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
			}
		}
		return(((sign) ? '' : '-') + num + '.' + cents);
	};

	/**
	 * 校验身份证有效性
	 * @param {Object} num 待校验号码
	 * @param {Object} tipId 显示提示信息的Dom Id
	 */
	tool.isValidOfId = function(num, tipId) {
		if(num === undefined || num == null || num === '' || num.length === 0) {
			document.getElementById(tipId).innerText = '身份证号码不能为空';
			return false;
		}
		num = num.toString();
		if(num.length === 18) {
			var valid = num.match('^[0-9]{17}[0-9xX]$');
			if(!valid) {
				document.getElementById(tipId).innerText = '身份证号码只能为数字，且末尾可以为x或X';
				return false;
			}
			return true;
		}
		document.getElementById(tipId).innerText = '身份证号码长度只能为18位';
		return false;
	};

	/**
	 * 校验银行卡号/账号有效性
	 * @param {Object} num 待校验号码
	 * @param {Object} tipId 显示提示信息的Dom Id
	 */
	tool.isValidOfCard = function(num, tipId) {
		if(num === undefined || num == null || num === '' || num.length === 0) {
			document.getElementById(tipId).innerText = '卡号/账号不能为空';
			return false;
		}
		num = num.toString();
		if(num.length < 12 || num.length > 19) {
			document.getElementById(tipId).innerText = '卡号/账号长度只能为12~19位数字';
			return false;
		}
		var valid = num.match('^[0-9]{12}[0-9]*$');
		if(!valid) {
			document.getElementById(tipId).innerText = '卡号/账号只能为数字';
			return false;
		}
		return true;
	};

	/**
	 * 手机号码校验
	 * @param {Object} num 待校验号码
	 * @param {Object} tipId 显示提示信息的Dom Id
	 */
	tool.isValidOfTel = function(num, tipId) {
		if(num == undefined || num == null || num == '' || num.length == 0) {
			if(tipId) {
				document.getElementById(tipId).innerText = '手机号码不能为空';
			} else {
				AppTools.toast('手机号码不能为空');
			}
			return false;
		}
		num = num.toString();
		if(num.length == 11) {
			var valid = num.match('^1[0-9]{9}[0-9]$');
			if(!valid) {
				if(tipId) {
					document.getElementById(tipId).innerText = '手机号码只能为1开头的11位有效数字';
				} else {
					AppTools.toast('手机号码只能为1开头的11位有效数字');
				}

				return false;
			}
			return true;
		}
		if(tipId) {
			document.getElementById(tipId).innerText = '手机号码只能为1开头的11位有效数字';
		} else {
			AppTools.toast('手机号码只能为1开头的11位有效数字');
		}
		return false;
	};

	/**
	 * 返回动作监听
	 * @param {Object} pageId
	 */
	tool.backMaskListener = function(pageId, callBack) {
		var old_back = mui.back;
		mui.back = function() {
			AppTools.hiddenMask(pageId);
			if(callBack) {
				callBack();
			}
			//执行mui封装好的窗口关闭逻辑；
			old_back();
		};
	};

	/**
	 *  重新加载数据
	 * @param {Object} callBack
	 */
	tool.reloadData = function(callBack, tip) {
		tip = tip || '数据加载失败，请检查网络后重试';
		plus.nativeUI.confirm(tip, function(e) {
			if(e.index === 0) {
				callBack();
			}
		}, '', ['重新加载', '取消']);
	};

	/**
	 * 自动消失提示框
	 * @param {Object} msg
	 * @param {Object} pos
	 */
	tool.toast = function(msg, pos) {
		msg = msg || '';
		pos = pos || 'bottom';
		plus.nativeUI.toast(msg, {
			verticalAlign: pos
		});
	};

	/**
	 * 显示错误信息
	 * @param {Object} parentId 父节点
	 * @param {Object} msg 需要显示的错误信息
	 * @param {Object} pos 距离顶部的位置
	 * @param {Object} title 标题信息
	 * @param {Object} showBtn 是否显示Button 按钮
	 * @param {Object} btnId 按钮ID
	 */
	tool.showError = function(parentId, msg, pos, title, showBtn, btnId, callFun) {
		if(AppTools.isEmpty(parentId)) {
			return;
		}
		var winDiv = document.createElement('div');
		winDiv.classList.add('error-window');
		if(!AppTools.isEmpty(title)) {
			var titleDiv = document.createElement('div');
			titleDiv.classList.add('error-title');
			titleDiv.innerHTML = title;
			winDiv.appendChild(titleDiv);
		}
		var contentDiv = document.createElement('div');
		contentDiv.classList.add('error-content');
		var spanObj = document.createElement('span');
		spanObj.innerText = msg;
		contentDiv.appendChild(spanObj);
		if(showBtn) {
			var btn = document.createElement('button');
			btn.id = btnId;
			btn.classList.add('mui-btn');
			btn.innerHTML = '重新加载';
			contentDiv.appendChild(btn);
		}
		winDiv.appendChild(contentDiv);
		var parent = document.getElementById(parentId);
		parent.innerHTML = '';
		setTimeout(function() {
			parent.appendChild(winDiv);
			if(!AppTools.isEmpty(pos)) {
				winDiv.style.paddingTop = pos[0];
				if(pos.length == 2) {
					winDiv.style.paddingLeft = pos[1];
				} else if(pos.length == 3) {
					winDiv.style.paddingLeft = pos[1];
					winDiv.style.marginTop = pos[2];
				} else if(pos.length == 4) {
					winDiv.style.paddingLeft = pos[1];
					winDiv.style.marginTop = pos[2];
					winDiv.style.marginLeft = pos[3];
				}
			}
			if(showBtn && callFun) {
				document.getElementById(btnId).addEventListener('tap', function() {
					callFun();
				});
			}
		}, 200);
	};

	// 计数器默认启动时间
	var DEFAULT_TIME = 10;
	// 正在表达式
	var REGEXP = new RegExp('time');
	/**
	 * 计时器对象
	 * @param {Object} timerOut 超时时间
	 * @param {Object} callback 计时停止回调函数
	 * @param {Object} id 显示信息的divID
	 * @param {Object} tip 提示信息
	 */
	var Timer = function(timerOut, callback, id, tip) {
		this._timer_count = timerOut;
		this._tip = tip;
		this._msgId = id;
		this._callback = callback;
		this._stopFlag = false;
	};
	Timer.prototype.start = function() {
		setTimer(this);
	};

	/**
	 * 设置并启动倒计时器
	 * @param {Object} timer 到计时器对象
	 */
	var setTimer = function(timer) {
		var stopFlag = timer._stopFlag;
		var timerOut = timer._timer_count;
		var callBack = timer._callback;
		var id = timer._msgId;
		var tip = timer._tip || '';
		if(stopFlag) {
			return;
		}
		if(timerOut <= 0) {
			clearTimeout();
			document.getElementById(id).innerHTML = '';
			timer = null;
			if(callBack) {
				callBack();
			}
			return;
		} else {
			var timeText = timerOut;
			if(tip && REGEXP.test(tip)) {
				timeText = tip.replace('time', timerOut);
			}
			document.getElementById(id).innerHTML = timeText;
			timerOut--;
			timer._timer_count = timerOut;
		}
		setTimeout(function() {
			setTimer(timer);
		}, 1000);
	};

	/**
	 * 启动计时器对象
	 * @param {Object} id 显示信息的divID
	 * @param {Object} timerOut 超时时间
	 * @param {Object} callback 计时停止回调函数
	 * @param {Object} tip 提示信息
	 */
	tool.startTimer = function(id, timerOut, callback, tip) {
		var timer = new Timer(timerOut || DEFAULT_TIME, callback, id, tip);
		timer.start();
		return timer;
	};

	/**
	 * 停止计时器
	 * @param {Object} timer 计时器对象
	 */
	tool.stopTimer = function(timer) {
		if(timer && !timer._stopFlag) {
			timer._stopFlag = true;
			setTimer(timer);
		}
	};

	/**
	 * 重新启动计时器
	 * @param {Object} timer 计时器对象
	 */
	tool.restartTimer = function(timer) {
		if(timer && timer._stopFlag) {
			timer._stopFlag = false;
			timer._timer_count += 1;
			setTimer(timer);
		}
	};
	/**
	 * 清除计时器
	 * @param {Object} timer 计时器对象
	 */
	tool.clearTimer = function(timer) {
		if(timer) {
			timer._timer_count = 0;
			timer._stopFlag = false;
			setTimer(timer);
		}
		return null;
	};

	/**
	 * 克隆对象副本
	 * @param {Object} p 需要拷贝的父对象
	 * @param {Object} c 子对象，可为空
	 */
	tool.cloneObj = function(p, c) {
		return deepCopy(p, c);
	};
	/**
	 *  克隆对象的深拷贝方法
	 * @param {Object} p 需要拷贝的父对象
	 * @param {Object} c 子对象，可为空
	 */
	var deepCopy = function(p, c) {
		c = c || ((p.constructor === Array) ? [] : {});
		for(var i in p) {
			if(typeof p[i] === 'object') {
				c[i] = (p[i].constructor === Array) ? [] : {};
				deepCopy(p[i], c[i]);
			} else if(typeof p[i] === 'function') {
				c[i] = p[i];
			} else {
				c[i] = p[i];
			}
		}
		return c;
	};
	var loadding = null;
	/**
	 *	打开等待框
	 * @param {Object} msg
	 */
	tool.loadding = function(msg, obj) {
		if(msg == null || msg === undefined || msg === '') {
			msg = "正在加载数据，请稍等...";
		}
		var padLock = (obj != null && obj != undefined) ? obj.padLock || 'false' : 'false';
		var back = (obj != null && obj != undefined) ? obj.back || 'none' : 'none';
		loadding = plus.nativeUI.showWaiting(msg, {
			padlock: padLock,
			back: back
		});
	};
	/**
	 * 关闭等待框
	 */
	tool.closeLoadding = function() {
		if(loadding != null && loadding !== undefined) {
			loadding.close();
			loadding = null;
		}
	};

	var myDate = null;

	/**
	 * 显示日期时间空间
	 * @param {Object} domId
	 * @param {Object} showDefault
	 */
	tool.showDatetime = function(domId, showDefault) {
		document.getElementById(domId).addEventListener('click', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			// 获取上一次设置的值
			if(showDefault) {
				options.value = this.value || '';
			} else {
				options.value = '';
			}
			var dateInput = this;
			/*
			 * 首次显示时实例化组件
			 * 示例为了简洁，将 options 放在了按钮的 dom 上
			 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
			 */

			if(myDate == null) {
				myDate = new mui.DtPicker(options);
			}
			if(!myDate.isShow()) {
				myDate.show(function(rs) {
					dateInput.value = rs.text;
					myDate.dispose();
					myDate = null;
				});
			}
		});
	};

	tool.hiddenTimePop = function() {
		if(myDate != null) {
			myDate.dispose();
			myDate = null;
		}
	};

	/**
	 * 获得格式化的日期数据
	 * @param {Object} fmt 正则表达式　非必输项
	 * @param {Object} orgDate　日期，非必输项
	 */
	tool.getFormatData = function(fmt, orgDate) {
		var myDate = new Date();
		if(orgDate) {
			myDate = orgDate;
		}
		var fmtRegx = 'yyyy-MM-dd hh:mm:ss';
		if(fmt) {
			fmtRegx = fmt;
		}
		return myDate.Format(fmtRegx);
	};

	/**
	 * 获得date1 和 date2的时间差
	 * @param {Object} date1
	 * @param {Object} date2
	 */
	tool.dateDiff = function(date1, date2) {
		var day = 24 * 60 * 60 * 1000;
		try {
			var dateArr = date1.split("-");
			var checkDate = new Date();
			checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
			var checkTime = checkDate.getTime();
			var dateArr2 = date2.split("-");
			var checkDate2 = new Date();
			checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
			var checkTime2 = checkDate2.getTime();
			var cha = (checkTime - checkTime2) / day;
			return cha;
		} catch(e) {
			return false;
		}
	}

	/**
	 * 时间增加函数，用来处理时间数据加上一个数据的处理逻辑
	 * @param {Object} strInterval  时间标识符
	 * @param {Object} Number 增加数
	 */
	Date.prototype.DateAdd = function(strInterval, Number) {
		var dtTmp = this;
		switch(strInterval) {
			case 's':
				return new Date(Date.parse(dtTmp) + (1000 * Number));
			case 'n':
				return new Date(Date.parse(dtTmp) + (60000 * Number));
			case 'h':
				return new Date(Date.parse(dtTmp) + (3600000 * Number));
			case 'd':
				return new Date(Date.parse(dtTmp) + (86400000 * Number));
			case 'w':
				return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
			case 'q':
				return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
			case 'm':
				return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
			case 'y':
				return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
		}
	};

	/**
	 * 日期格式化
	 * @param {Object} fmt 格式化表达式
	 */
	Date.prototype.Format = function(fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	};

	/**
	 * 从对象中取得属性名
	 * @param {Object} obj 取得属性值对象
	 * @param {Object} index 对象下标
	 */
	tool.getPropertyName = function(obj, index) {
		var i = 0;
		var propertyName = "";
		for(var x in obj) {
			if(i == index) {
				propertyName = x;
				break;
			} else {
				i++;
			}
		}
		return propertyName;
	}
	/**
	 * 从对象中取得属性名
	 * @param {Object} obj 取得属性值对象
	 * @param {Object} index 对象下标
	 */
	tool.getPropertyValue = function(obj, index) {
		var i = 0;
		var propertyValue = "";
		for(var x in obj) {
			if(i == index) {
				propertyValue = obj[x];
				break;
			} else {
				i++;
			}
		}
		return propertyValue;
	}
	/**
	 * 调用IMate更新密钥并获取密码
	 */
	tool.inputPinblock = function(cardNo, callback) {
		tool.getPinblockWithCardNo(cardNo, callback);
		//		var sysInfo = app.storage.getOutSysInfo();
		//		var workKey = sysInfo.WORK_KEY || "";
		//		if(workKey != '') {
		//			//IMate更新密钥
		//			tool.IMateUpdateWorkKey(workKey, function(code, info) {
		//				if(code) {
		//					//输入密码
		//					tool.getPinblockWithCardNo(cardNo, callback);
		//				} else {
		//					callback(false, info);
		//				}
		//			});
		//		} else {
		//			//更新密钥服务
		//			app.start.updateWorkKeyRequest(function(code, data) {
		//				if(code) {
		//					tool.inputPinblock(cardNo, callback);
		//				} else {
		//					callback(false, data);
		//				}
		//			});
		//		}
	}
	/**
	 * IMate更新工作秘钥
	 * @param {Object} key
	 * @param {Object} callback
	 */
	tool.IMateUpdateWorkKey = function(key, callback) {
		plus.matedevice.openBluetooth(function(msg) {
			//蓝牙没有打开
			if(msg != '0') {
				callback(false, msg || "蓝牙连接失败，请检查移动背夹设备是否配对！");
			} else {
				setTimeout(
					function() {
						var obj = {
							keyType: "1",
							newKey: key
						};
						plus.matedevice.write(9, function(result) {
							var jsonobject = JSON.parse(result);
							if(jsonobject.resultcode == 0) {
								callback(true);
							} else {
								callback(false, jsonobject.resultinfo || "密钥更新失败！");
							}
						}, function(result) {
							var jsonobject = JSON.parse(result);
							callback(false, jsonobject.resultinfo || "密钥更新失败！");
						}, JSON.stringify(obj));
					}, 2000
				);
			}
		});
	}
	/**
	 * 调用IMate获取密码
	 * @param {Object} cardNo
	 * @param {Object} callback
	 */
	tool.getPinblockWithCardNo = function(cardNo, callback) {
		plus.matedevice.openBluetooth(function(msg) {
			//蓝牙没有打开
			if(msg != '0') {
				callback(false, msg || "蓝牙连接失败，请检查移动背夹设备是否配对！");
			} else {
				mui.toast("请在背夹设备上输入密码");
				setTimeout(
					function() {
						var keyType = 0;
						var inObj = {};
						inObj.cardNo = cardNo;
						inObj.keyType = keyType;
						plus.matedevice.read(9, function(result) {
							plus.nativeUI.closeWaiting();
							var jsonobject = JSON.parse(result);
							if(jsonobject.resultcode == 0) {
								callback(true, jsonobject.pinBlock);
							} else {
								callback(false, jsonobject.resultinfo || "获取密码失败！");
							}
						}, function(result) {
							plus.nativeUI.closeWaiting();
							var jsonobject = JSON.parse(result);
							callback(false, jsonobject.resultinfo || "获取密码失败！");
						}, inObj);
					}, 2000
				);
			}
		});
	}
	/**
	 * 增加input框监听方法
	 * @param {Object} id     input框ID
	 * @param {Object} focus  获得焦点回调
	 * @param {Object} keyup  正在输入回调
	 * @param {Object} blur   失去焦点回调
	 */
	tool.inputListener = function(id, focus, keyup, blur) {
		$('#' + id).on({
			focus: function() {
				if(focus) {
					focus();
				}
			},
			keyup: function() {
				if(keyup) {
					keyup();
				}
			},
			blur: function() {
				if(blur) {
					blur();
				}
			}
		});
	};
	/**
	 * 增加input标签输入纯数字校验监听
	 * @param {Object} id       input框id
	 * @param {Object} maxLen   最大长度
	 */
	tool.addNumberListener = function(id, maxLen) {
		$('#' + id).on({
			keyup: function(event) {
				var e = event || window.event;
				if(event.keyCode != 8) {
					if(this.value.length == 0) {
						this.value = this.dataset.checkCache || "";
					} else {
						var z = this.value.replace(/[^0-9]*/g, ""); //清除数字以外字符 
						this.value = z.slice(0, Number(maxLen));
					}
				}
				this.dataset.checkCache = this.value;
			}
		});
	}
	/**
	 * 增加input标签输入纯中文校验监听
	 * @param {Object} id       input框id
	 * @param {Object} maxLen   最大长度
	 */
	tool.addChineseListener = function(id, maxLen) {
		$('#' + id).on({
			keyup: function(event) {
				var e = event || window.event;
				if(event.keyCode != 8) {
					if(this.value.length == 0) {
						this.value = this.dataset.checkCache || "";
					} else {
						var z = this.value.replace(/[^\u4E00-\u9FA5]/g, ''); //清除中文以外字符 
						this.value = z.slice(0, Number(maxLen));
					}
				}
				this.dataset.checkCache = this.value;
			}
		});
	}
	/**
	 * 增加input标签输入数字与字母校验监听
	 * @param {Object} id       input框id
	 * @param {Object} maxLen   最大长度
	 */
	tool.addNumberAndLetterListener = function(id, maxLen) {
		$('#' + id).on({
			keyup: function(event) {
				var e = event || window.event;
				if(event.keyCode != 8) {
					if(this.value.length == 0) {
						this.value = this.dataset.checkCache || "";
					} else {
						var z = this.value.replace(/[\W]/g, ""); //清除数字/字母以外字符 
						this.value = stripscript(z.slice(0, Number(maxLen)));
					}
				}
				this.dataset.checkCache = this.value;
			}
		});
	}
	/**
	 * 增加input标签输入金额校验监听
	 * @param {Object} id       input框id
	 * @param {Object} max      最大值
	 */
	tool.addAmountListener = function(id, max) {
		$('#' + id).on({
			keyup: function(event) {
				var e = event || window.event;
				if(event.keyCode != 8) {
					if(this.value.length == 0) {
						this.value = this.dataset.checkCache || "";
					} else {
						this.value = this.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
						this.value = this.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
						this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
						this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
						if(this.value.indexOf(".") < 0 && this.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
							this.value = parseFloat(this.value);
						}
						var z = "";
						var x = "";
						if(this.value.indexOf('.') >= 0) {
							var arr = this.value.split('.');
							z = arr[0];
							x = "." + arr[1];
						} else {
							z = this.value;
						}
						//最大值控制
						if(Number(max) >= Number(z + x)) {
							this.value = z + x;
						} else {
							this.value = this.dataset.checkCache || "";
						}
					}
				}
				this.dataset.checkCache = this.value;
			},
			blur: function() {
				this.value = tool.formatMoney(this.value, 2, true);
				this.dataset.checkCache = this.value;
			}
		});
	};

	function stripscript(s) {
		var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥_……&*（）——|{}【】‘；：”“'。，、？]")
		var rs = "";
		for(var i = 0; i < s.length; i++) {
			rs = rs + s.substr(i, 1).replace(pattern, '');
		}
		return rs;
	}

	/**
	 * 动态创建元素
	 * @param {Object} tag 标签名
	 * @param {Object} attrObj 属性对象
	 * @param {Object} innnerhtml 内部文本
	 */
	tool.createElement = function(tag, attrObj, innnerhtml) {
		var ele = document.createElement(tag);
		for(var i in attrObj) {
			ele.setAttribute(i, attrObj[i]);
		}
		ele.innerHTML = innnerhtml || '';
		return ele;
	}
	/**
	 * 重写confirm方法
	 * @param {Object} msg 提示信息
	 * @param {Object} title 提示标题
	 * @param {Object} btnArray 按钮数组
	 * @param {Object} callback 回调函数
	 */
	tool.confirm = function(msg, title, btnArray, callback) {
		var init_back = mui.back;
		mui.back = function() {
			return false;
		}
		var prompt_overlay = tool.createElement("div", {
			"class": "prompt_overlay"
		});
		document.body.insertAdjacentElement('beforeEnd', prompt_overlay);

		var prompt_box_wrap = tool.createElement("div", {
			"class": "prompt_box_wrap"
		});
		var prompt_box = tool.createElement("div", {
			"class": "prompt_box"
		});
		var prompt_title = tool.createElement("div", {
			"class": "prompt_title"
		}, title);
		if(!title) {
			prompt_title.setAttribute("class", "prompt_title hidden");
		}
		var prompt_content = tool.createElement("div", {
			"class": "prompt_content"
		}, msg);
		var prompt_btn_wrap = tool.createElement("div", {
			"class": "prompt_btn_wrap"
		});
		var prompt_btn_left = tool.createElement("div", {
			"class": "prompt_btn_left"
		}, btnArray[0]);
		var prompt_btn_right = tool.createElement("div", {
			"class": "prompt_btn_right"
		}, btnArray[1]);
		prompt_btn_wrap.insertAdjacentElement('beforeEnd', prompt_btn_left);
		prompt_btn_wrap.insertAdjacentElement('beforeEnd', prompt_btn_right);

		prompt_box.insertAdjacentElement('beforeEnd', prompt_title);
		prompt_box.insertAdjacentElement('beforeEnd', prompt_content);
		prompt_box.insertAdjacentElement('beforeEnd', prompt_btn_wrap);
		prompt_box_wrap.insertAdjacentElement('beforeEnd', prompt_box);

		prompt_overlay.insertAdjacentElement('beforeBegin', prompt_box_wrap);
		prompt_btn_left.addEventListener('click', function() {
			mui.back = init_back;
			prompt_box_wrap.remove();
			prompt_overlay.remove();
			if(typeof callback == 'function') callback({
				index: 0
			});
		});
		prompt_btn_right.addEventListener('click', function() {
			mui.back = init_back;
			prompt_box_wrap.remove();
			prompt_overlay.remove();
			if(typeof callback == 'function') callback({
				index: 1
			});
		});
	}
	/**
	 * 金额输入框监听/可在input标签的onInput属性中配置监听
	 * @param {Object} id     inputID
	 * @param {Object} maxLen 小数点前最大长度
	 */
	tool.amountOninput = function(id, maxLen) {
		var reg = /^[0-9]*$/;
		var e = document.getElementById(id);
		var eValue = e.value;
		if(eValue.indexOf('.') >= 0) {
			var vArr = eValue.split('.');
			var z = vArr[0];
			var x = vArr[1];
			if(vArr.length > 2) {
				eValue = z + "." + x;
			}
			if(z.length >= 2 && z.substring(0, 1) == "0") {
				if(z.substring(1, 2) != ".") {
					z = "0";
					eValue = z + "." + x;
				}
			}
			if(z.length == 0) {
				eValue = "";
			}
			if(z.length > maxLen) {
				z = z.slice(0, maxLen);
				eValue = z + "." + x;
			}
			if(x.length > 2) {
				x = x.slice(0, 2);
				eValue = z + "." + x;
			}
			if(!reg.test(z) || !reg.test(x)) {
				eValue = "";
			}
			e.value = eValue;
		} else {
			var len = eValue.length;
			if(len == 0) {
				e.value = "";
			} else if(eValue.length >= 2 && eValue.substring(0, 1) == "0") {
				if(eValue.substring(1, 2) != ".") {
					e.value = "0";
				}
			} else if(!reg.test(e.value)) {
				e.value = "";
			} else if(e.value.length > maxLen) {
				e.value = e.value.slice(0, maxLen);
			}
		}
	}

	/**
	 * 计算字符串长度(包含汉字)
	 * str 字符串的值
	 */
	tool.checkStrLength = function(str) {
		var strlen = 0;
		for(var i = 0; i < str.length; i++) {
			if(str.charCodeAt(i) > 255) { //如果是汉字，则字符串长度加2　
				strlen += 2;
			}
			else {
				strlen++;
			}
		}
		return strlen;
	}

	/**
	 * 补空格方法
	 * oriValue 原值
	 * num 需要补全的位数
	 */
	tool.getEnoughBit = function(oriValue, num) {
		var len = oriValue.length;
		if(len >= num) {
			return oriValue;
		} else {
			var disBit = parseInt(num - len);
			for(var i = 0; i < disBit; i++) {
				oriValue += " ";
			}
			return oriValue;
		}
	}

	/**
	 * 中旅现场增加缩放比例
	 */
	tool.ajustScreen = function() {
		//增加PAD尺度适应
		//真机联调
		var h = window.screen.height;
		var w = window.screen.width;
		//打包调试
		// var h = window.screen.height / window.devicePixelRatio;
		// var w = window.screen.width / window.devicePixelRatio;
		var temp;
		//出现横屏
		if(h > w) {
			temp = h;
			h = w;
			w = temp;
		}
		var zm = h / 800;
		var sc = w / (1.6 * h);
		document.querySelector("body").setAttribute("style", "zoom:" + zm + ";transform:scaleX(" + sc + ")");

	}
	/**
	 * 重写alert方法
	 * @param {Object} msg 提示信息
	 * @param {Object} title 提示标题
	 * @param {Object} btn 按钮
	 * @param {Object} callback 回调函数
	 */
	tool.alert = function(msg, title, btn, callback) {
		var init_back = mui.back;
		mui.back = function() {
			return false;
		}
		var prompt_overlay = tool.createElement("div", {
			"class": "prompt_overlay"
		});
		document.body.insertAdjacentElement('beforeEnd', prompt_overlay);

		var prompt_box_wrap = tool.createElement("div", {
			"class": "prompt_box_wrap"
		});
		var prompt_box = tool.createElement("div", {
			"class": "prompt_box"
		});
		var prompt_title = tool.createElement("div", {
			"class": "prompt_title"
		}, title);
		if(!title) {
			prompt_title.setAttribute("class", "prompt_title hidden");
		}
		var prompt_content = tool.createElement("div", {
			"class": "prompt_content"
		}, msg);
		var prompt_btn_wrap = tool.createElement("div", {
			"class": "prompt_btn_wrap"
		});
		var prompt_btn_single = tool.createElement("div", {
			"class": "prompt_btn_single"
		}, btn || '确定');
		prompt_btn_wrap.insertAdjacentElement('beforeEnd', prompt_btn_single);

		prompt_box.insertAdjacentElement('beforeEnd', prompt_title);
		prompt_box.insertAdjacentElement('beforeEnd', prompt_content);
		prompt_box.insertAdjacentElement('beforeEnd', prompt_btn_wrap);
		prompt_box_wrap.insertAdjacentElement('beforeEnd', prompt_box);

		prompt_overlay.insertAdjacentElement('beforeBegin', prompt_box_wrap);
		prompt_btn_single.addEventListener('click', function() {
			mui.back = init_back;
			prompt_box_wrap.remove();
			prompt_overlay.remove();
			if(typeof callback == 'function') callback();
		});
	}

	/**
	 * 增加input是否为空的监听事件
	 * @param {Object} callback
	 */
	tool.addInputDataListener = function(callback) {
		var check = "";
		mui("input").each(function() {
			if(!this.value || this.value.trim() == "") {
				var label = this.previousElementSibling;
				mui.toast(label.innerText + "不允许为空");
				check = false;
				return false;
			} else {
				check = true;
			}
		});
		if(check == true) {
			callback();
		}
	}
    tool.intToChinese = function(str){
		str = str + '';
	    var len = str.length - 1;
		var idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
		var num = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
		return str.replace(/([1-9]|0+)/g, function($, $1, idx, full) {
			console.log("$:"+$ +"--------"+ "$1:"+$1 +"--------"+ "idx:"+idx  +"--------"+ "full:"+full);
			var pos = 0;
			if($1[0] != '0') {
				pos = len - idx;
				if(idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
					return idxs[len - idx];
				}
				return num[$1[0]] + idxs[len - idx];
			} else {
				var left = len - idx;
				var right = len - idx + $1.length;
				if(Math.floor(right / 4) - Math.floor(left / 4) > 0) {
					pos = left - left % 4;
				}
				if(pos) {
					return idxs[pos] + num[$1[0]];
				} else if(idx + $1.length >= len) {
					return '';
				} else {
					return num[$1[0]]
				}
			}
		});
	}
	mui.old_confirm = mui.confirm;
	mui.confirm = tool.confirm;
	mui.old_alert = mui.alert;
	mui.alert = tool.alert;
})(mui, window.AppTools = {});