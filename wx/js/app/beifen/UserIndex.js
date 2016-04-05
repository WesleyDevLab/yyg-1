mui.plusReady(function() {
	console.log(plus.webview.currentWebview().id)
	user();
	plus.nativeUI.closeWaiting();
});

function user() {
	var userInfo = localStorage.getItem("$uesr");
	//plus.nativeUI.toast(userInfo);
	console.log(userInfo)
	if (userInfo) {
		//plus.nativeUI.toast(userInfo.ID);
		refreshWeb();
	} else {
		$("#wLogin").show();
		$("#Login").hide();
		$("#setUser li").off();
		$("#setUser li").on("click", function() {
			plus.nativeUI.toast("还未登录，请登录。")
		});
		$(".LongBtn").on("click", function() {
			mui.openWindow({
				url: 'user.login.html',
				id: 'login.html',
				show: {
					aniShow: 'pop-in',
				},
				extras: {
					Address: "user.login.html",
					wType: 'back',
					winID: plus.webview.currentWebview().id
				}
			});
		})

	}
}

/*显示用户信息*/
function refreshWeb() {
	var user = localStorage.getItem("$uesr");
	if (user) {
		user = JSON.parse(user);
		mui.post(Gobal.server_url + "/mobile/ajax/userxinxi/", {
			key: user.key,
			uid: user.uid
		}, function(data) {
			if (data.status == 1) {
				$("#wLogin").hide();
				$("#Login").show();
				localStorage.setItem("score", data.userxinxi.score);
				localStorage.setItem("money", data.userxinxi.money);
				console.log("用户信息成功：" + JSON.stringify(data))
				var html = template('Login_ok', data);
				document.getElementById("Login").innerHTML = html;
				console.log(html)
				suermingx();
				Gobal.skipUserHome();
			} else {
				console.log("获取用户信息失败：" + JSON.stringify(data))
				$(".LongBtn").off();
				$(".LongBtn").on("click", function() {
					mui.openWindow({
						url: 'user.login.html',
						id: 'login.html',
						show: {
							aniShow: 'pop-in',
						},
						extras: {
							Address: "user.login.html",
							wType: 'back',
							winID: plus.webview.currentWebview().id
						}
					});
				})
				$("#setUser li").off();
				$("#setUser li").on("click", function() {
					plus.nativeUI.toast("还未登录，请登录。", {
						duration: "short"
					})
				});
			}
		}, 'json');
	} else {
		$("#setUser li").off();
		$("#setUser li").on("click", function() {
			plus.nativeUI.toast("还未登录，请登录。", {
				duration: "short"
			})
		});
	}
}

function suermingx() {
	$("#setUser li").off();
	$("#setUser li").on("click", function() {
		var Address = this.getAttribute("id");
		var title = this.getAttribute("title");
		if (Address) {
			mui.openWindow({
				url: "IndexHead.html",
				id: "my-order.html",
				aniShow: 'pop-in',
				extras: {
					Address: Address,
					wType: 'back',
					wName: title,
					winID: plus.webview.currentWebview().id
				}
			});
		}
	});
}