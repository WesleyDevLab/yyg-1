mui.plusReady(function() {
	$('.menu-tab').on('tap', function() {
					if (!$(this).hasClass('active')) {
						$(this).addClass('active');
						$(this).siblings().removeClass('active');
						$('.' + $(this).attr('data-id')).siblings().removeClass('active').end().addClass('active');
						$("#autoLotteryBox1").hide();
						$("#autoLotteryBox2").hide();
						$("#autoLotteryBox" + ($(this).index() + 1)).show();
					}
				});
	loadAuto();
});


				
function loadAuto() {
	console.log(Gobal.server_url + "/mobile/ajax/show_jinri_shoplist")
	mui.getJSON(Gobal.server_url + "/mobile/ajax/show_jinri_shoplist", {}, function(res) {
		console.log(JSON.stringify(res));
		if (res.status == 1) {
			AList(res, 'divTimerItems1'); //解析数据
		} else {
			var html = '<div class="haveNot z-minheight" style="display:block"><s></s><p>抱歉，没有发布限时揭晓商品！</p></div>';
			$("#divTimerItems1,#divTimerItems2").html(html);
			$("#autoLotteryBox2").hide();
		}
	});
}

function flex(obj) {
	$(obj).flexslider({
		slideshow: false,
		animationLoop: true,
		controlType: 1,
		controlPos: 1,
		startAt: 0
	});
}

function TranstTime(data, obj) {
	var c = $(obj);
	var f = c.find("span[name=timerItem]");
	f.each(function() {
		var m = $(this);
		var n = parseInt(m.attr("time"));
		if (n > 0) {
			var l = function() {
				window.location.reload()
			};
			m.countdowntime(n, l)
		}
	});
}

function AList(res, id, man) {
	//限时揭晓
	res.data = res.jinrijx_shoplist;
	res.data.count = res.jinrijx_shoplist.length;
	res.tname = "今日";
	var jinri_shoplist = res.data;
	for (var i in jinri_shoplist) {
		var shop = jinri_shoplist[i];
		//shop['thumb'] = Gobal.image_url + "/" + shop['thumb'];
		shop["shop"] = "";
		var xsjx_time = parseInt(shop['xsjx_time'] + "000")
		shop["xsjx_time"] = xsjx_time;
		shop["time_H"] = new Date(xsjx_time).getHours();
		shop["xsjx"] = (xsjx_time - new Date().getTime()) / 1000;
	};

	var html = template('divNone1', res);
	document.getElementById("divTimerItems1").innerHTML = html;
	TranstTime(res.data, "#autoLotteryBox1");


	res.data = res.show_mingri_shoplist;
	res.data.count = res.show_mingri_shoplist.length;
	res.tname = "明日";
	var jinri_shoplist = res.data;
	for (var i in jinri_shoplist) {
		var shop = jinri_shoplist[i];
		//时间格式转换
		shop["shop"] = "";
		var xsjx_time = parseInt(shop['xsjx_time'] + "000")
		shop["xsjx_time"] = xsjx_time;
		shop["time_H"] = new Date(xsjx_time).getHours();
		shop["xsjx"] = (xsjx_time - new Date().getTime()) / 1000;
	};
	var html = template('divNone1', res);
	document.getElementById("divTimerItems2").innerHTML = html;
	TranstTime(res.data, "#autoLotteryBox2");

	flex("#autoLotteryBox1");
	flex("#autoLotteryBox2");
	setTimeout(function() {
		$("#autoLotteryBox2").hide();
	}, 100);
	jump();
}

function jump() {
	//点击加入购物车
	mui(".u-Btn").on("tap", "#addBtn", function() {
		var id = this.getAttribute("shopID");
		var qishu = this.getAttribute("data-qishu");
		Gobal.AddShoppingCart(id, qishu);
	});
	//点击跳转到购物车
	mui(".u-Btn").on("tap", "#buyBtn", function() {
		var id = $(this).attr("id");
		var qishu = $(this).attr("data-qishu");
		if (Gobal.AddShoppingCart(id, qishu)) {
			//选中购物车页面//
			plus.webview.getWebviewById("H51BFA684").evalJS('Simulation("buyCart")');
			//关闭打开的窗口返回购物车//
			var webview = plus.webview.all();
			for (i in webview) {
				//console.log(webview[i].id)
				if (winName.indexOf(webview[i].id) < 0) {
					ws = plus.webview.getWebviewById(webview[i].id);
					console.log(webview[i].id)
					plus.webview.hide(ws);
					plus.webview.close(ws);
				}
			}
		}
	});
}