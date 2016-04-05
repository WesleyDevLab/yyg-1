var winId = "";
mui.plusReady(function() {
	console.log(plus.webview.currentWebview().id)
	var self = plus.webview.currentWebview();
	winId = self.winID;
	var userInfo = localStorage.getItem("$user") || "";
	//plus.nativeUI.toast(userInfo);

	function AUp() {
		mui("#ulFun").off();
		mui("#ulFun").on("tap", "li", function() {
			var Address = this.getAttribute("id");
			var title = this.getAttribute("title");
			if (Address) {
				mui.openWindow({
					url: "IndexHead.html",
					id: "set.html",
					extras: {
						Address: Address,
						wType: 'back',
						wName: title
					}
				});
			}
		});
	}
	AUp();
	getuser();
	LoginOut(winId);


});

/*显示用户信息*/
function getuser() {
	var user = localStorage.getItem("$uesr");
	if (user) {
		user = JSON.parse(user);
		mui.post(Gobal.server_url + "/mobile/ajax/userxinxi/", {
			key: user.key,
			uid: user.uid
		}, function(data) {
			if (data.status == 1) {
				var html = template('user_Login', data);
				document.getElementById("user_xinxi").innerHTML = html;
				console.log(html)
				$(".last-li").on('tap', 'a', function() {
					var Address = this.getAttribute("id");
					var title = this.getAttribute("title");
					mui.openWindow({
						url: "IndexHead.html",
						id: "set.html",
						extras: {
							Address: Address,
							wType: 'back',
							wName: title,
							winIDw:"c"
						}
					});
				})
			} else {
				//console.log("获取用户信息失败："+JSON.stringify(data))
			}
		}, 'json');
	}
}

/*退出登录*/
function LoginOut() {
	$("#LogOut").on('click', function() {
		$.PageDialog.confirm("是否退出账户！", function() {
			tuichu();
		}, "")
	});
}
/*清空用户信息*/
function tuichu() {
	localStorage.clear();
	plus.webview.getWebviewById(winId).evalJS("user()");
	plus.webview.getWebviewById("my-order.html").close();

}