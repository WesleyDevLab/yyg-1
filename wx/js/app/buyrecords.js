mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var id = self.ShopId;
	var qishu = self.qishu;
	loadItem(id, qishu);
});

function loadItem(id, qishu) {
	console.log(Gobal.server_url + "/mobile/ajax/yungouwu?shopid=" + id + "&shopqishu=" + qishu);
	$.ajax({
		type: "get",
		url: Gobal.server_url + "/mobile/ajax/yungouwu?shopid=" + id + "&shopqishu=" + qishu,
		async: true,
		timeout: 10000,
		dataType: "json",
		success: function(res) {
			console.log(JSON.stringify(res));
			if (res.status != 0) {
				template.helper("time", function(time) {
					console.log(JSON.stringify(new Date(parseInt(time) * 1000).toLocaleString()))
					return new Date(parseInt(time) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").replace("/", "-").replace("/", "-");
				});
				var html = template("buyRecord", res);
				document.getElementById("buyRecordPage").innerHTML = html;
			} else {
				//plus.nativeUI.toast("获取数据失败，请检查网络");
				document.getElementById("buyRecordPage").innerHTML = '<div class="haveNot z-minheight"><s></s><p>暂无抢拍记录！</p></div>';
			}
			plus.nativeUI.closeWaiting();
		},
		error: function(res) {
			//plus.nativeUI.toast("获取数据失败，请检查网络");
			document.getElementById("buyRecordPage").innerHTML = '<div class="haveNot z-minheight"><s></s><p>暂无抢拍记录！</p></div>';
			plus.nativeUI.closeWaiting();
		}
	});
}