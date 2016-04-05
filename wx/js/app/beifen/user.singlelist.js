var parm = "Y";
mui.plusReady(function() {
	console.log(plus.webview.currentWebview().id)
		//var self=plus.webview.currentWebview();
	var user = localStorage.getItem('$uesr');
	user = JSON.parse(user);
	console.log(user.key + "\t" + user.uid)
	getshaiDan();
	navClass();
});

//导航分类选择
function navClass() {
	$("#sd li").on('tap', function() {
		plus.nativeUI.showWaiting("正在加载中...");
		$(this).addClass('z-sgl-crt');
		$(this).siblings().removeClass('z-sgl-crt');
		parm = $(this).attr('state');
		getshaiDan();
	});
}

//调用接口查数据，带条件
function getshaiDan() {
	var user = localStorage.getItem("$uesr");
	user = JSON.parse(user);
	console.log(user.uid+" "+user.key+" "+parm)
	if (user) {
		mui.post(Gobal.server_url + "/mobile/ajax/usershaidan/", {
			uid: user.uid,
			key: user.key,
			type: parm
		}, function(data) {
			console.log(JSON.stringify(data));
			if (data) {
				if (parm == "N") {
					data.parm = "N";
				} else {
					data.parm = "Y";
				}
				if (data.status == 1) {
					document.getElementById('ulConsumption').style.display = 'none';
					var html = template('shaidanList', data);
					document.getElementById("shaidanLi").innerHTML = html;
					if (parm == "N") {
						jump();
					}
				} else if (data.status == 0) {
					document.getElementById('ulConsumption').style.display = 'block';
					document.getElementById("shaidanLi").innerHTML = "";
				}
			}
			plus.nativeUI.closeWaiting();
		}, 'json');
	}
}

/*跳转页面，添加头信息*/
function jump() {
	mui(".btns").off();
	mui(".btns").on('tap', 'li', function() {
		var shopid = $(this).attr("data-id");
		var qishu = $(this).attr("data-qishu");
		var sid = $(this).attr("data-sid");
		console.log(shopid + "dfgdfgd" + qishu+" "+sid)
		mui.openWindow({
			url: "IndexHead.html",
			id: "IWantshaidan.html",
			extras: {
				Address: "IWantshaidan.html",
				wType: 'back',
				wName: "我要晒单",
				winID: plus.webview.currentWebview().id,
				sd_shopid: shopid,
				sd_qishu: qishu,
				sid:sid
			}
		});

	})
}
/*时间戳装换成时间格式*/
			template.helper('$Time', function(nS) {
			var d = new Date(parseInt(nS) * 1000);
			var s = '';
			s += d.getFullYear() + '-';
			s += (d.getMonth() + 1) + '-';
			s += d.getDate() + ' ';
			s += d.getHours() + ':';
			s += d.getMinutes();
			return s;
			});