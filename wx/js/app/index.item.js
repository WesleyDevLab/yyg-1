var shopID = "";
var sid = "";
mui.plusReady(function() {

	var self = plus.webview.currentWebview();
	plus.nativeUI.showWaiting("加载中...");
	console.log(JSON.stringify(self))
	var id = self.ShopId;
	var qishu = self.qishu;
	sid = self.sid;
	shopID = id;
	console.log(sid + "  " + id + "  " + qishu);
	loadItem(sid, id, qishu);
});


function loadItem(sid, id, qishu) {
	var url = "";
	if (qishu) {
		url = Gobal.server_url + "/mobile/ajax/item1/&sid=" + Number(sid) + "&qishu=" + qishu;
	} else {
		url = Gobal.server_url + "/mobile/ajax/cshopxiangxi/&id=" + id;
	}
	console.log(url);
	$.ajax({
		type: "get",
		url: url,
		async: true,
		timeout: 10000,
		dataType: "json",
		success: function(res) {
			////console.log(JSON.stringify(res));
			///console.log("sid:" + res.shangqihuojiang.sid);
			sid = res.shangqihuojiang.sid;
			if (res.status != 0) {
				Item(res); //解析数据
			} else {
				plus.nativeUI.toast(res.message);
				document.getElementById("Goods").innerHTML = '<div class="common_net_status" style="text-align: center;position: absolute;top:50%;left: 0;width: 100%;margin-top:-60px" id="no-networking"><li class="icon"><a class="iconfont icon-wifi"></a></li><!--2种网络状态--><li>亲，您的手机网络不太顺畅哦～</li><li style="font-size: 14px;">请检查你的手机是否联网</li></div>';
			}
			plus.nativeUI.closeWaiting();
			window.scrollTo(0, 0);
		},
		error: function(res) {
			plus.nativeUI.toast("获取数据失败，请检查网络1");
			document.getElementById("Goods").innerHTML = '<div class="common_net_status" style="text-align: center;position: absolute;top:50%;left: 0;width: 100%;margin-top:-60px" id="no-networking"><li class="icon"><a class="iconfont icon-wifi"></a></li><!--2种网络状态--><li>亲，您的手机网络不太顺畅哦～</li><li style="font-size: 14px;">请检查你的手机是否联网</li></div>';
			plus.nativeUI.closeWaiting();
			window.scrollTo(0, 0);
		}
	});
}

function Item(res) {
	res.shop.now = new Date().getTime();
	template.helper("time", function(time) {
		var d = new Date(parseInt(time) * 1000);
		var s = '';
		s += d.getFullYear() + '-';
		s += (d.getMonth() + 1) + '-';
		s += d.getDate() + ' ';
		s += d.getHours() + ':';
		s += d.getMinutes();
		return s;
	});
	template.helper("periods", function(qishu, current) {
		//console.log(current)
		var qishu = Number(qishu) + 1;
		var current = Number(current) + 1
		var data = {};
		if (current <= 20) {
			for (i = 1; i < current; i++) {
				data["M" + (current - i)] = current - i;
			}
		} else {
			if (qishu == current) {
				for (i = 0; i < 20; i++) {
					data["M" + (current - i)] = current - i;
				}
			} else {
				if (current - qishu > 10 && qishu > 10) {
					var num = qishu + 10;
					for (i = 0; i < 20; i++) {
						data["M" + (num - i)] = num - i;
					}
				} else {
					for (i = 0; i < 20; i++) {
						data["M" + (20 - i)] = 20 - i;
					}
				}
			}
		}
		//console.log(JSON.stringify(data))
		return data;
	});
	template.helper("nextTerm", function(Term) {
		var num = Number(Term) + 1;
		return num;
	});
	var html = template('Goodtems', res);
	document.getElementById("Goods").innerHTML = html;
	//console.log(html);
	$("#sliderBox").off();
	$("#divPeriod").off();
	$("#sliderBox").picslider(); //商品详情图片滚动
	$("#divPeriod").touchslider(); //顶部导航滚动
	term(res.shangqihuojiang.sid); //绑定期数跳转事件
	boundEvent(res); //绑定事件
	Gobal.skipUserHome(); //跳转到个人主页
	var timeFung = function() {
		//alert(res.shop.id)
		mui.getJSON(Gobal.server_url + "/mobile/ajax/GetBarcodernoInfo/"+res.shop.id, {}, function(data) {
			//console.log(JSON.stringify(data))
			$(".limit-time div").html("<span>幸运号码：" + data.q_user_code + "</span>" + '<a class="fr" id="See" data-id="' + data.id + '" data-qishu="' + data.qishu + '">查看计算结果</a>');
			var html = template("jiexiao", data);
			$(".limit-time").before(html);
			$("#See").click(function() {
				var id = $(this).attr("data-id");
				var qishu = $(this).attr("data-qishu");
				mui.openWindow({
					url: "IndexHead.html",
					id: "goodsdesc" + id,
					extras: {
						Address: "index.calResult.html",
						wType: 'back',
						wName: "查看计算结果",
						ShopId: res.shangqihuojiang.shopid,
						qishu: qishu
					}
				});
			});
			Gobal.skipUserHome(); //跳转到个人主页
			//console.log(JSON.stringify(data))
		});
	}
	var timetjx = $(".limit-time[name=timejx]");
	if (timetjx.length > 0) {
		console.log(parseInt(Number(timetjx.attr("time"))))
		indexTime(parseInt(Number(timetjx.attr("time"))), res.shop.id, timeFung);
	}

}

function boundEvent(res) {
	//点击加入购物车
	$(".addBtn").click(function() {
		var id = $(this).attr("id");
		var qishu = $(this).attr("data-qishu");
		Gobal.AddShoppingCart(id, qishu);
	});
	//点击跳转到购物车
	$(".buyBtn").click(function() {
		var id = $(this).attr("id");
		var qishu = $(this).attr("data-qishu");
		if (Gobal.AddShoppingCart(id, qishu)) { //选中购物车页面//
			//更新购物车
			var cartlist = plus.webview.getWebviewById("indexcart.cartlist.html");
			var HbuilderWIN = plus.webview.getWebviewById("H51BFA684");
			if (cartlist) {
				console.log("已加载窗口");
				cartlist.evalJS("refreshWeb()");
			}
			HbuilderWIN.evalJS('Simulation("buyCart")');
			location.href = Gobal.server_url_no + "/wx/html/dynamic/cart.cartlist.html";
		}

	});
	//点击跳转到所有夺宝记录
	$("#Record").click(function() {
		var id = $(this).attr("data-id");
		var qishu = $(this).attr("data-qishu");
		mui.openWindow({
			url: "IndexHead.html",
			id: "buyrecords" + id,
			extras: {
				Address: "buyrecords.html",
				wType: 'back',
				wName: "所有购买记录",
				ShopId: id,
				qishu: qishu
			}
		});
	});
	//点击跳转到往期揭晓
	$("#winRecord").click(function() {
		var id = $(this).attr("data-id");
		var qishu = $(this).attr("data-qishu");
		mui.openWindow({
			url: "IndexHead.html",
			id: "buyrecords" + id,
			extras: {
				Address: "winrecord.html",
				wType: 'back',
				wName: "往期揭晓",
				ShopId: id,
				qishu: qishu
			}
		});
	});
	//点击跳转到晒单评论
	$("#comments").click(function() {
		var id = $(this).attr("data-id");
		var qishu = $(this).attr("data-qishu");
		mui.openWindow({
			url: "IndexHead.html",
			id: "goodspost" + id,
			extras: {
				Address: "index.goodspost.html",
				wType: 'back',
				wName: "晒单评论",
				ShopId: id,
				sid: res.shangqihuojiang.sid,
				qishu: qishu
			}
		});
	});
	//点击跳转到图文详情
	$("#details").click(function() {
		var id = $(this).attr("data-id");
		var qishu = $(this).attr("data-qishu");
		mui.openWindow({
			url: "IndexHead.html",
			id: "goodsdesc" + id,
			extras: {
				Address: "index.goodsdesc.html",
				wType: 'back',
				wName: "图文详情",
				data: res
			}
		});
	});
	//点击跳转到查看计算结果
	$("#See").click(function() {
		var id = $(this).attr("data-id");
		var qishu = $(this).attr("data-qishu");
		mui.openWindow({
			url: "IndexHead.html",
			id: "goodsdesc" + id,
			extras: {
				Address: "index.calResult.html",
				wType: 'back',
				wName: "查看计算结果",
				ShopId: res.shangqihuojiang.shopid,
				qishu: qishu
			}
		});
	});
	//点击跳转到最新商品页
	$("#prevPeriod,#seeDetails").click(function() {
		var qishu = $(this).attr("data-qishu");
		plus.nativeUI.showWaiting("加载中...");
		loadItem(res.shangqihuojiang.sid, "", qishu);
	});
}

function term(sid) {
	$("#divPeriod li").off();
	$("#divPeriod li").click(function() {
		$("#divPeriod li").removeClass("cur");
		$(this).addClass("cur");
		var qishu = $(this).attr("data-qishu");
		console.log(sid + "  " + qishu);
		plus.nativeUI.showWaiting("加载中...")
		loadItem(sid, "", qishu);
	});
}