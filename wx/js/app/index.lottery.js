mui.plusReady(function() {
	plus.nativeUI.showWaiting();
	mui.init({
		pullRefresh: {
			container: "#refreshContainer",
			down: {
				contentdown: "下拉可以刷新",
				contentover: "释放立即刷新",
				contentrefresh: "正在刷新...",
				callback: function() {
						if (plus.networkinfo.getCurrentType() == 1) {
							plus.nativeUI.toast("没有连接到网络，请检查网络连接");
							mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
						} else {
							ZxjxList(function() {
								mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
							});
						}

					} 
			}
		}
	});
	ZxjxList();
});

function ZxjxList(endFn) {
	mui.getJSON(Gobal.server_url + "/mobile/ajax/laterylist", function(res) {
		ZList(res);
		console.log(JSON.stringify(res));
		if (endFn)
			endFn();
	});
}

function ZList(res) {
	// 最新揭晓加载
	var html = template('lotter-zuixin', res);
	document.getElementById('divLottery2').innerHTML = html;
	Gobal.skipUserHome();
	mui("#divLottery2").on("tap", "ul", function() {
		var id = this.getAttribute("id");
		var qishu = "";
		if (id) {
			mui.openWindow({
				url: "IndexHead.html",
				id: "index.item" + id,
				extras: {
					Address: "index.item.html",
					wType: 'back',
					wName: "商品详情",
					ShopId: id,
					qishu: qishu
				}
			});
		}
	});
	plus.nativeUI.closeWaiting();
	//console.log(html)
}
//转换时间格式
template.helper('dateFormat', function(data, format) {
	var d = new Date(parseInt(data) * 1000);
	var s = '';
	s += d.getFullYear() + '-';
	s += (d.getMonth() + 1) + '-';
	s += d.getDate() + ' ';
	s += d.getHours() + ':';
	s += d.getMinutes();
	return s;
});