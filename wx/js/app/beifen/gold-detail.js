var score;
mui.plusReady(function() {
	console.log(plus.webview.currentWebview().id)
		//var self=plus.webview.currentWebview();
	ajaxscore();
	getHead();
	getjinbi();
});

//调用接口查数据，带条件
function getjinbi() {
	var user = localStorage.getItem("$uesr");
	if (user) {
		user = JSON.parse(user);
		console.log(user.uid);
		console.log(user.key);
		mui.post(Gobal.server_url + "/mobile/ajax/jinbi/", {
			uid: user.uid,
			key: user.key,
		}, function(data) {
			console.log(JSON.stringify(data))
			if (data.status == 1) {
				ajaxscore();
				var html = template('jinbimingxi', data);
				console.log(JSON.stringify(data));
				document.getElementById("mingxi").innerHTML = html;
			} else if (data.status == 0) {
				document.getElementById("mingxi").innerHTML = "";
				document.getElementById('ulConsumption').style.display = 'block';
			}
		}, 'json');
	}
}

function ajaxscore() {
	var user = localStorage.getItem("$uesr");
	if (user) {
		user = JSON.parse(user);
		console.log(user.uid);
		console.log(user.key);
		mui.ajax(Gobal.server_url + '/mobile/ajax/userxinxi/', {
			data: {
				key: user.key,
				uid: user.uid
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				if (data.status == 1) {
					var score = data.userxinxi.score;
					$("#jinbishuliang").html(score);
				}

			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log("NO" + JSON.stringify(data))
				console.log(type);
			}
		});
	}

}




/*页面跳转增加头信息*/
function getHead() {
	mui("#jinbi").off();
	mui("#jinbi").on("tap", "button", function() {
		var Address = this.getAttribute("id");
		var title = this.getAttribute("title");
		if (Address) {
			mui.openWindow({
				url: "IndexHead.html",
				id: "jinbiduihuan.html",
				extras: {
					Address: Address,
					wType: 'back',
					wName: title,
					//winID: plus.webview.currentWebview().id
				}
			});
		}
	});
}

function refreshWeb() {
	ajaxscore();
	getHead();
	getjinbi();
}

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