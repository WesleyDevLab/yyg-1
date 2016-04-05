mui.plusReady(function() {
	plus.nativeUI.showWaiting("加载中...");
	var scroller = document.getElementById("refreshzuixin").children[0];
	mui.init({
		pullRefresh: {
			container: "#refreshzuixin", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
			down: {
				contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
				contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
				contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
				callback: function() {
						if (plus.networkinfo.getCurrentType() == 1) {
							plus.nativeUI.toast("没有连接到网络，请检查网络连接");
							mui('#refreshzuixin').pullRefresh().endPulldownToRefresh();
						} else {
							zuixinjiexiao();
						}

					} //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			}

		}
	});
	zuixinjiexiao();
	xaingqing();
});

function zuixinjiexiao() {
	mui.getJSON(Gobal.server_url + "/mobile/ajax/GetStartRaffleAllList", {}, function(data) {
		if (data) {
			// 获取时间
			/*var jinri_shoplist = res.laterylist;
			console.log(JSON.stringify(res.laterylist))
			//console.log(JSON.stringify(jinri_shoplist.xsjx_time))
			for (var i in jinri_shoplist) {
				var shop = jinri_shoplist[i];
				shop["shop"] = "";
				var xsjx_time = parseInt(shop['xsjx_time'] + "000")
				shop["xsjx_time"] = xsjx_time;
				shop["time_H"] = new Date(xsjx_time).getHours();
				shop["xsjx"] = (xsjx_time - new Date().getTime()) / 1000;
			};
			var jinri_data = {
				jinri_shoplist: jinri_shoplist,
				now: new Date().getTime()
			};*/
			console.log(JSON.stringify(data));
			var html = template('jiexiao', data);
			document.getElementById('divjiexiao').innerHTML = html;
			//console.log(html);
			$("#jiexiaoList .zxjs").on("click", function() {
				var qishu = $(this).attr("data-qishu");
				var sid = $(this).attr("data-sid");
				var id = $(this).attr("id");
				mui.openWindow({
					url: "IndexHead.html",
					id: "index.item" + sid,
					extras: {
						Address: "index.item.html",
						wType: 'back',
						wName: "商品详情",
						id: id,
						sid: sid,
						qishu: qishu
					}
				});
			});
		} else {
			document.getElementById("reve").style.display = 'block';
		}

		mui('#refreshzuixin').pullRefresh().endPulldownToRefresh();

		var c = $("#divjiexiao");
		var f = c.find("span[name=timerItem]");
		f.each(function() {
			var m = $(this);
			var n = parseInt(m.attr("time"));
			var s = m.attr("id");
			if (n > 0) {
				var l = function() {
					m.parent().prev(".top").hide();
					m.html("正在计算...");
					kaijiang(s, m);
				};
				m.StartTimeOut(l,n);
				//m.countdowntime(n, l)
			} else {
				kaijiang(s, m);
			}
		});
		plus.nativeUI.closeWaiting();
	});
}

//商品详情
function xaingqing() {
	mui("#divjiexiao").off();
	mui("#divjiexiao").on("tap", ".left", function() {
		var Address = this.getAttribute("id");
		var sid = this.getAttribute("data-sid");
		var qishu = this.getAttribute("data-qishu");
		console.log(sid + "  " + Address + "  " + qishu);
		if (Address) {
			mui.openWindow({
				url: "IndexHead.html",
				id: "index.item" + Address,
				extras: {
					Address: "index.item.html",
					wType: 'back',
					wName: "商品详情",
					ShopId: Address,
					sid: sid,
					qishu: qishu
				}
			});
		}
	});
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

function refreshWeb() {
	zuixinjiexiao();
}

function kaijiang(s, m) {
	console.log(Gobal.server_url + "/mobile/ajax/GetBarcodernoInfo/" + s)
	mui.getJSON(Gobal.server_url + "/mobile/ajax/GetBarcodernoInfo/" + s, {}, function(res) {
		console.log(JSON.stringify(res))
			//m.html("恭喜<span>" + res.q_user + "<span>获得");
		m.parents(".timerItem").html('<dl><dd><span>获奖用户：</span><strong>' + res.q_user + '</strong></dd><dd><span>幸运号码：</span><strong>' + res.q_user_code + '</strong></dd><dd><span>参与次数：</span><strong>' + res.gonumber + '</strong></dd><dd><span>揭晓时间：</span><strong>' + res.q_end_time + '</strong></dd></dl>');
	});
}