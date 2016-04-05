var id;
mui.plusReady(function() {
	//console.log(plus.webview.currentWebview().id) 
	var userInfo = localStorage.getItem("$user") || "";
	//plus.nativeUI.toast(userInfo);
	function Address() {
		mui(".serr").on("tap", "button", function() {
			if (Address) {
				mui.openWindow({
					url: "IndexHead.html",
					id: "add-address.html",
					extras: {
						Address: "add-address.html",
						wType: 'back',
						wName: "添加地址"
					}
				});
			}
		});
	}
	Address();
	getAddress();
});

/*获取用户收货地址信息*/
function getAddress() {
	var user = localStorage.getItem("$uesr");
	if (user) {
		user = JSON.parse(user);
		console.log(user.key)
		console.log(user.uid);
		mui.post(Gobal.server_url + "/mobile/ajax/useraddr/", {
			key: user.key,
			uid: user.uid
		}, function(data) {
			if (data.status == 1) {
				document.getElementById('address').style.display = 'block';
				document.getElementById('ulConsumption').style.display = 'none';
				console.log("用户信息成功：" + JSON.stringify(data))
				var html = template('getaddress', data);
				document.getElementById("address").innerHTML = html;
				setredio();
				/*删除按钮注册点击事件*/
				$(".deletebtn").off();
				$(".deletebtn").on('tap', function() {
					var dataId=$(this).attr("data-id");
					$.PageDialog.confirm("是否删除该收货地址！", function() {
						deleAddress(dataId);
					}, "")
				});
			} else {
				document.getElementById('address').style.display = 'none';
				document.getElementById('ulConsumption').style.display = 'block';
				//console.log("获取用户信息失败：" + JSON.stringify(data));
			}
		}, 'json');
	}
}

/*删除收货地址*/
function deleAddress(id) {
	var user = localStorage.getItem("$uesr");
	if (user) {
		user = JSON.parse(user);
		console.log(user.key)
		mui.post(Gobal.server_url + "/mobile/ajax/deladdr/", {
			key: user.key,
			id: id
		}, function(data) {
			//console.log(obj.attr("data-id"))
			if (data.status == 1) {
				plus.nativeUI.toast("删除地址成功")
				getAddress();
			} else {
				plus.nativeUI.toast("删除地址失败")
				console.log("删除地址失败");
			}
		}, 'json');
	}
}
/*选中默认地址*/
function setredio() {
	$(".nichname .mui-radio").on('tap', function() {
		SetDefault($(this).attr("data-id"));
	});
}

/*设置默认地址*/
function SetDefault(id) {
	var user = localStorage.getItem("$uesr");
	if (user) {
		user = JSON.parse(user);
		console.log(user.key + "  " + user.uid + "  " + id);
		mui.post(Gobal.server_url + "/mobile/ajax/addrdefault/", {
			key: user.key,
			uid: user.uid,
			default: "Y",
			id: id
		}, function(data) {
			console.log(JSON.stringify(data));
			if (data.status == 1) {
				console.log("设置成功：");
			} else {
				console.log("设置失败：");
			}
		}, 'json');
	}
}

