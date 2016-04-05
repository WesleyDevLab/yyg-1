/*初始化变量数据*/
var sortType = "sd_time";
/*加载完成执行*/
mui.plusReady(function() {
	loadData("sd_time", "down");
	navFun();
	mui.init({
		pullRefresh: {
			container: "#refreshContainer",
			down: {
				contentdown: "下拉可以刷新",
				contentover: "释放立即刷新",
				contentrefresh: "正在刷新...",
				callback: down
			}
			//			,
			//			up: {
			//				contentrefresh: "正在加载...",
			//				contentnomore: '没有更多数据了',
			//				callback: upFun
			//			}''
		}
	});
});

function down() {
	loadData(sortType, "down");
}

function upFun() {
	loadData(sortType, "up");
}

function navFun() {
	mui("#navBox").on("tap", "div", function() {
		plus.nativeUI.showWaiting("加载中...", {
			background: "rgba(0,0,0,0.4)"
		});
		$("#navBox div").removeClass("z-sgl-crt");
		$(this).addClass("z-sgl-crt");
		var indexNum = $(this).index();
		var type = "sd_time";
		switch (indexNum) {
			case 0:
				type = "sd_time";
				break;
			case 1:
				type = "sd_zhan";
				break;
			case 2:
				type = "sd_ping";
		}
		sortType = type;
		loadData(type,"down");
		$(".cSingleCon").hide();
		$(".cSingleCon").eq(indexNum).show();
	});
}

function loadData(type, mode) {
	$.ajax({
		type: "get",
		url: Gobal.server_url + "/mobile/ajax/maxcomment/?type=" + type,
		async: true,
		dataType: "json",
		success: function(res) {
			console.log(JSON.stringify(res));
			if (res.status == 1) {
				var html = template('lotter-shaidan', res);
				//console.log(html);
				if (mode == "down") {
					document.getElementById(type).innerHTML = html;
				} else {
					$("#" + type).append(html);
				}
			} else {
				document.getElementById(type).innerHTML = "<span style='margin-left:38%'>暂无数据</span>";
			}
			Gobal.skipUserHome();
			bundClick();
			plus.nativeUI.closeWaiting();
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
			mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
		},
		timeout: 10000,
		error: function() {
			plus.nativeUI.closeWaiting();
			document.getElementById(type).innerHTML = "<span style='margin-left:38%'>暂无数据</span>";
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
			mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
		}
	});
}

function bundClick() {
	mui(".cSingleCon2").off();
	mui(".cSingleCon2").on("tap", ".cSingleInfo", function() {
		var sd_id = $(this).attr("sd_id");
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