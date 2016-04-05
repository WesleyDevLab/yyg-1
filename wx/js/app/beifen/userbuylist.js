//Base.getScript(Gobal.Skin+"/JS/mobile/UserBuyListFun.js?v=130826");
var parm = 1;
mui.plusReady(function() {
	var self = plus.webview.currentWebview().id;
	console.log(self)
	var user = localStorage.getItem('$uesr');
	if (user) {
		user = JSON.parse(user);
		$("#navBox li").eq(0).addClass("z-sgl-crt");
		UserList(1, user);
		UserList(2, user);
		UserList(3, user);
		navClass()
	} else {
		plus.nativeUI.toast("未登录，重新登录");
	}
});

//z-sgl-crt
//导航分类选择
function navClass() {
	$("#navBox li").on('tap', function() {
		$("#navBox li").removeClass("z-sgl-crt");
		$(this).addClass("z-sgl-crt");
		$("#gdju > li").hide();
		//console.log($("#gdju > li").length)
		$("#gdju > li").eq($(this).index()).show();
	});
}
//调用接口查数据，带条件
function UserList(type, user) {
	mui.post(Gobal.server_url + "/mobile/ajax/flddlist/", {
		uid: user.uid,
		type: type
	}, function(data) {
		console.log(JSON.stringify(data))
		if (data.status == 1) {
			var html = template('user_List', data);
			document.getElementById("Ulists" + type).innerHTML = html;
			var count = data.dingdanlist.length;
			$("#navBox li").eq(type - 1).children("a").children("span").html("(" + count + ")");
			junmp();
			chankanfun();
		} else {
			$("#navBox li").eq(type - 1).children("a").children("span").html("(0)");
			$("#Ulists" + type).html('<div class="haveNot z-minheight"><s></s><p>抱歉，您没有夺宝记录！</p></div>');
		}
	}, 'json');
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

function junmp() {
	mui(".libia").off("tap", "li");
	mui(".libia").on("tap", "li", function() {
		var sid = this.getAttribute("data-sid");
		var qishu = this.getAttribute("data-qishu");
		mui.openWindow({
			url: "IndexHead.html",
			id: "goods" + sid,
			extras: {
				Address: "index.item.html",
				wType: 'goods',
				sid: sid,
				qishu: qishu,
				wName: "商品详情"
			}
		});
	});
}

function chankanfun() {
	mui(".libia").off("tap", ".chakan");
	mui(".libia").on("tap", ".chakan", function() {
		event.stopPropagation();
		var code = this.getAttribute("title") + "\n" + "本次抢拍" + this.getAttribute("num") + "次数" + "\n" + this.getAttribute("code") + "\n";
		alert(code);
	});
}