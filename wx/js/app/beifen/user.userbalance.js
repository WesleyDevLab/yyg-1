var type = -1;
mui.plusReady(function() {
	console.log(plus.webview.currentWebview().id)
		//var self=plus.webview.currentWebview();
	money = localStorage.getItem("money");
	$("#yue").html(money);
	var user = localStorage.getItem('$uesr');
	navClass();
	getMingxi();
	czmx();
});

/*连接充值页面*/
$("#chongzhi").on('tap', function() {
		mui.openWindow({
			url: "IndexHead.html",
			id: "set.html",
			extras: {
				Address: "user.recharge.html",
				wType: 'back',
				wName: '充值页面'
			}
		});
	})
	/*消费明细与充值明细的切换*/
function navClass() {
	$("#artic li").on('tap', function() {
		plus.nativeUI.showWaiting("正在加载中...");
		$("#artic li").children("a").removeClass('z-MoneyNav-crt01');
		$(this).children("a").addClass('z-MoneyNav-crt01');
		type = $(this).attr('state');
		console.log(type)
		getMingxi();
	});
}

//调用接口查数据，带条件
function getMingxi() {
	var user = localStorage.getItem("$uesr");
	if (user) {
		user = JSON.parse(user);
		console.log(user.uid + " " + user.key + " " + type);
		mui.post(Gobal.server_url + "/mobile/ajax/userzhanghu/", {
			uid: user.uid,
			key: user.key,
			type: type
		}, function(data) {
			if (data.status == 1) {
				var html = "";
				template('zhmx', data);
				document.getElementById("mingxi").innerHTML = html;
				var moneynum = data.contmoney;
				if (type == -1) {
					$("#xfze").html("(消费总金额：￥" + moneynum + ")");
					html = template('zhmx', data);
				} else {
					$("#czmx").html("(充值总金额：￥" + moneynum + ")");
					html = template('echarge', data);
				}
				document.getElementById("mingxi").innerHTML = html;
			} else if (data.status == 0) {
				var html = '<div id="divNone" class="haveNot z-minheight"><s></s><p>抱歉，暂无明细！</p></div>'
				document.getElementById("mingxi").innerHTML = html;
			}
			plus.nativeUI.closeWaiting();
		}, 'json');
	}
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

function czmx() {
	var user = JSON.parse(localStorage.getItem("$uesr"));
	if (user) {
		console.log(user.uid + " " + user.key + " " + type);
		mui.post(Gobal.server_url + "/mobile/ajax/userzhanghu/", {
			uid: user.uid,
			key: user.key,
			type: 1
		}, function(data) {
			if (data.status == 1) {
				var moneynum = data.contmoney;
				$("#czmx").html("(充值总金额：￥" + moneynum + ")");
			}
		}, 'json');
	}
}