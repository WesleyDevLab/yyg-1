mui.plusReady(function() {
	console.log(plus.webview.currentWebview().id)
	var self = plus.webview.currentWebview();
	var winId = self.winID;
	$("#btnLogin").on('tap', function() {
		var username = document.getElementById("txtAccount").value;
		var password = document.getElementById("txtPassword").value;
		UserLogin(username, password, winId);
	})

	function mima() {
		mui(".accAndPwd").off();
		mui(".accAndPwd").on("tap", ".wjPwd", function() {
			var Address = this.getAttribute("id");
			var title = this.getAttribute("title");
			if (Address) {
				mui.openWindow({
					url: "IndexHead.html",
					id: "index.register.html",
					extras: {
						Address: Address,
						wType: 'back',
						wName: title
					}
				});
			}
		});
	}
	mima();
});


function UserLogin(username, password, winId) {
	mui.post(Gobal.server_url + "/mobile/ajax/userlogin/", {
		username: username,
		password: password
	}, function(res) {
		if (res.state == 0) {
			res.username = document.getElementById("txtAccount").value;
			console.log(JSON.stringify(res));
			//return false;
			localStorage.setItem("$uesr", JSON.stringify(res));
			//console.log(localStorage.getItem("$uesr"))
			var upWin = plus.webview.getWebviewById(winId);
			if (upWin) {
				upWin.evalJS("refreshWeb()"); /*自定义方法*/
			}
			/*切换页面*/
			var indexuser = plus.webview.getWebviewById("user.html");
			if (indexuser) {
				indexuser.evalJS("refreshWeb()");
			}
			//plus.webview.getWebviewById("html/dynamic/index.glist.html").evalJS("refreshWeb()");
			//plus.webview.getWebviewById("html/dynamic/discover.html").evalJS("refreshWeb()");
			//plus.webview.getWebviewById("html/dynamic/cart.cartlist.html").evalJS("refreshWeb()");
			//plus.webview.getWebviewById("html/dynamic/index.index.html").evalJS("refreshWeb()");
			plus.webview.currentWebview().close(); /*//关闭当前页面*/
		}
		if (res.state == 1 && res.num == -1) {
			plus.nativeUI.toast("用户名或密码错误");
			console.log(JSON.stringify(res));
			document.getElementById("txtAccount").value = "";
			document.getElementById("txtPassword").value = "";
		}
		if (res.state == 1 && res.num == -2) {
			plus.nativeUI.toast("未注册");
		}

	}, 'json')
};