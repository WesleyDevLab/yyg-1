var shopID = "";
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var uid = self.userID;
	console.log("当前窗口ID：" + self.id);
	loadItem(uid, "divBuyRecord", "yun");
	loadItem(uid, "divGetGoods", "huo");
	loadItem(uid, "divSingle", "shai");
	divMidNav();
});

function loadItem(uid, type, typename) {
	console.log(Gobal.server_url + "/mobile/ajax/ortheruser/&uid=" + uid + "&type=" + typename)
	$.ajax({
		type: "get",
		url: Gobal.server_url + "/mobile/ajax/ortheruser/&uid=" + uid + "&type=" + typename,
		async: true,
		timeout: 10000,
		dataType: "json",
		success: function(res) {
			console.log(typename + ":" + JSON.stringify(res));
			if (type == "divBuyRecord") {
				var html = template("userHome", res);
				console.log(JSON.stringify(res.othertop))
				document.getElementById("userBox").innerHTML = html;
			}
			if (res.status != 0) {
				Item(res, type); //解析数据
			} else {
				//plus.nativeUI.toast(res.message);
				document.getElementById(type).innerHTML = '<div id="divNone" class="haveNot z-minheight"><s></s><p>抱歉，没有近三个月没有记录！</p></div>';
			}
			Gobal.skipUserHome();
		},
		error: function(res) {
			plus.nativeUI.toast("获取数据失败，请检查网络");
			document.getElementById(type).innerHTML = '<div id="divNone" class="haveNot z-minheight"><s></s><p>抱歉，没有近三个月没记录！</p></div>';
		}
	});
}

function Item(res, type) {
	var id = "";
	template.helper("time", function(time) {
		var obj = new Date(parseInt(time) * 1000);
		console.log(JSON.stringify(new Date(parseInt(time) * 1000).toLocaleString()))
		return obj.getFullYear() + "-" + obj.getMonth() + "-" + obj.getDay() + " " + obj.getHours() + ":" + obj.getMinutes() + ":" + obj.getSeconds();
	});
	if (type == "divBuyRecord") {

		id = "mBuyRecord";
	} else if (type == "divGetGoods") {
		id = "mGetGoods";
	} else {
		id = "mSingle";
	}
	var html = template(id, res);
	document.getElementById(type).innerHTML = html;
	boundEvents();
}


function boundEvents() {
	//跳转到商品详情
	$(".mBuyRecord ul").off();
	$(".mBuyRecord ul").click(function() {
		var shopID = $(this).attr("id");
		var qishu = $(this).attr("data-qishu");
		var sid = $(this).attr("data-sid");
		console.log(shopID + " " + qishu);
		mui.openWindow({
			url: "IndexHead.html",
			id: "index.user" + shopID,
			extras: {
				Address: "index.item.html",
				wType: 'back',
				wName: "商品详情",
				ShopId: shopID,
				qishu: qishu,
				sid:sid
			}
		});
	});
	//跳转到晒单详情
	$(".mSingle ul").off();
	$(".mSingle ul").click(function() {
		var sd_id = $(this).attr("sd_id");
		console.log(sd_id);
		mui.openWindow({
			url: "IndexHead.html",
			id: "detail" + sd_id,
			extras: {
				Address: "index.detail.html",
				wType: 'back',
				wName: "晒单详情",
				sd_id: sd_id
			}
		});
	});
}

function divMidNav() {
	var obj = $("#divMidNav .g-snav-lst");
	var listObj = $("div[name='list']");
	obj.click(function() {
		obj.removeClass("mCurr")
		$(this).addClass("mCurr");
		listObj.hide();
		listObj.eq($(this).index()).show();
	});
}