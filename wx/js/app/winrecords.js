mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var id = self.ShopId;
	var qishu = self.qishu;
	loadItem(id, qishu);
});

function loadItem(id, qishu) {
	console.log(Gobal.server_url + "/mobile/ajax/winrecored/&shopid=" + id + "&shopqishu=" + qishu);
	plus.nativeUI.showWaiting();
	$.ajax({
		type: "get",
		url: Gobal.server_url + "/mobile/ajax/winrecored/&shopid=" + id + "&shopqishu=" + qishu,
		async: true,
		timeout: 10000,
		dataType: "json",
		success: function(res) {
			if (res.status != 0) {
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
				var html = template("winRecord", res);
				document.getElementById("winRecordPage").innerHTML = html;

				//bindEvents
				$(".go-shop").on("click", function () {
					var id = $(this).attr("data-shopid");
					var sid = $(this).attr("data-sid");
					mui.openWindow({
						url: "IndexHead.html",
						id: "index.item.html" + id,
						extras: {
							Address: "index.item.html",
							wType: 'back',
							wName: "商品详情",
							ShopId: id,
							sid: sid,
							qishu: qishu
						}
					});
				});
				Gobal.skipUserHome();
			} else {
				//plus.nativeUI.toast("获取数据失败，请检查网络");
				document.getElementById("winRecordPage").innerHTML = '<div class="haveNot z-minheight"><s></s><p>暂无往期揭晓！</p></div>';
			}
			plus.nativeUI.closeWaiting();
		},
		error: function(res) {
			//plus.nativeUI.toast("获取数据失败，请检查网络");
			document.getElementById("winRecordPage").innerHTML = '<div class="haveNot z-minheight"><s></s><p>暂无往期揭晓！</p></div>';
			plus.nativeUI.closeWaiting();
		}
	});
}