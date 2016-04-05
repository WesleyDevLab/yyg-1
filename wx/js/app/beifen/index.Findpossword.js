var shouji, yanzhengma, mima, querenmima;
mui.plusReady(function() {
	console.log(plus.webview.currentWebview().id)
	var z = /[1-9]\d{3}(?!\d)/; //短信验证码，必须是纯数字
	var m = /^1[34578]\d{9}$/; //手机验证码
	//var userInfo = localStorage.getItem("$user") || "";

	document.getElementById('findPass').addEventListener('tap', function() {
		shouji = document.getElementById("shouji").value;
		yanzhengma = document.getElementById("yanzhengma").value;
		mima = document.getElementById("mima").value;
		querenmima = document.getElementById("querenmima").value;
		console.log(shouji)
		if (shouji == null || shouji == "") {
			$("#yue").prop('disabled', true);
			plus.nativeUI.toast("手机号码不能为空哦");
		} else if (!m.test(shouji)) {
			plus.nativeUI.toast("请输入合法的手机号码");
		} else if (yanzhengma == null || yanzhengma == "") {
			plus.nativeUI.toast("验证码不能为空哦");
		} else if (!z.test(yanzhengma)) {
			plus.nativeUI.toast("请输入正确的验证码");
		} else if (mima == null || mima == "") {
			plus.nativeUI.toast("收密码不能为空哦");
		} else if (querenmima == null || querenmima == "") {
			plus.nativeUI.toast("手机号码不能为空哦");
		} else if (mima != querenmima) {
			plus.nativeUI.toast("密码与确认密码输入不一致哦");
		} else {
			RetrievePassword(shouji, yanzhengma, mima);
		}
	});

	yan();

});
//倒计时120秒
var wait = 120; //时间
function time() {
	if (wait == 0) {
		wait = 120;
		$('#yan').html("重新获取验证码").removeClass("readonly");
		yan();
	} else {
		//document.getElementById("yan").style='';
		$(".yan").off();
		$("#yan").addClass("readonly");
		//$("#yan").css("border", "1px solid #cccccc");
		$('#yan').html(wait + "秒后可重新获取");
		wait--;
		setTimeout("time()", 1000);
	}
}
/*获取验证码*/
function yanzm(shouji) {
	var Boolean = true;
	mui.post(Gobal.server_url + "/mobile/ajax/retrieve_pwd/", {
		mobile: shouji
	}, function(res) {
		if (res.status == 1) {
			console.log("获取验证码成功：" + JSON.stringify(res))
		} else if (res.status == 0) {
			console.log("获取验证码失败：" + JSON.stringify(res))
			plus.nativeUI.toast(res.message);
			Boolean = false;
		} else if (res.status == -1) {
			plus.nativeUI.toast(res.message);
			Boolean = false;
			console.log("已注册：" + JSON.stringify(res))
		}
	}, 'json');
	return Boolean;
}


/*注册*/
function RetrievePassword(shouji, yanzhengma, mima) {
	mui.post(Gobal.server_url + "/mobile/ajax/Retrieve_password/", {
		mobile: shouji,
		password: mima,
		yanzhengma: yanzhengma
	}, function(ures) {
		if (ures.status == 1) {
			var UpWinId = plus.webview.currentWebview().windowID;
			console.log(UpWinId);
			localStorage.setItem("$uesr", JSON.stringify(ures));
			var userInfo = localStorage.getItem("$uesr");
			console.log(userInfo.key);
			plus.webview.getWebviewById(UpWinId).close();
			plus.webview.getWebviewById("login.html").close();
			plus.webview.getWebviewById("indexuser.index.html").evalJS("refreshWeb()");
			console.log("注册成功：" + JSON.stringify(ures))
		} else if (ures.status == 0) {
			console.log("验证码或手机号码有误：" + JSON.stringify(ures))
		}
	}, 'json');

}

function yan() {
	$(".yan").on('click', function() {
		shouji = document.getElementById("shouji").value;
		if (shouji == null || shouji == "") {
			$("#yue").prop('disabled', true);
			plus.nativeUI.toast("手机号码不能为空哦");
			return;
		}
		shouji = document.getElementById("shouji").value;
		if (yanzm(shouji)) {
			time();
		}
	})
}