/** 
 * 缓存变量说明
 * $glist所有商品即将揭晓缓存数据
 * 如果本地不存在,则联网下载,保存至本地
 * 变量Catalog定义图片缓存文件夹
 */
var Catalog = '_downloads/image/glist/';
var winHeight = $(window).height() - 35;
var shopList = true;
//定义全局函数
var num = 10,
	page = 1,
	cateid = 0,
	select = 10,
	count = 0;

//页面加载完成执行
mui.plusReady(function() {
	Check(); //加载商品数据
	mui.init({
		pullRefresh: {
			container: "#refreshContainer",
			down: {
				contentdown: "下拉可以刷新",
				contentover: "释放立即刷新",
				contentrefresh: "正在刷新...",
				callback: down
			},
			up: {
				contentrefresh: "正在加载...",
				contentnomore: '没有更多数据了',
				callback: upFun
			}
		}
	});
	if (mui.os.ios) {
		$(".goodsCon").css("margin-top", "0px");
		$("#refreshContainer").css("margin-top", "0px");
	}
});


//初始加载
function Check() {
	navClass(); //绑定导航事件
	if (plus.networkinfo.getCurrentType() == 1) {
		if (localStorage.getItem("$glist")) {
			var result = JSON.parse(localStorage.getItem("$glist"))
			console.log(JSON.stringify(result))
			var html = template('shopList', result.data);
			$("#goodsListBox").append(html);
			mui("#goodsListBox").on("tap", ".add", function() {
				if (plus.networkinfo.getCurrentType() == 1) {
					plus.nativeUI.toast("网络连接失败");
				} else {
					ShoppingCart();
				}
			});
			plus.nativeUI.closeWaiting();
		}
	} else {
		if (shopList) {
			shopClass(); //加载商品分类
			shopList = false;
		}
		LoadData();
	}
}


//删除缓存文件
function deleFile() {
	plus.io.resolveLocalFileSystemURL(Catalog, function(entry) {
		entry.removeRecursively(function(entry) {
			console.log("Remove Recursively Succeeded");
		}, function(e) {
			console.log(e.message);
		});
	});
}

//下拉刷新
function down() {
	if (plus.networkinfo.getCurrentType() == 1) {
		plus.nativeUI.toast("无网络连接，请检查网络设置");
	} else {
		page = 1;
		mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
		LoadData("down");
	}
	mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
};

//下拉上拉加载
function upFun() {
	if (plus.networkinfo.getCurrentType() == 1) {
		plus.nativeUI.toast("无网络连接，请检查网络设置");
		mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
	} else {
		console.log(num + "  " + cateid + "  " + select + "  " + page)
		LoadData();
	}
}

//加载数据调用
function LoadData(type) {
	console.log(num + "  " + cateid + "  " + select + "  " + page);
	if (page == 1) {
		plus.nativeUI.showWaiting();
	}
	$.ajax({
		type: "post",
		url: Gobal.server_url + '/mobile/ajax/glistajax',
		data: {
			num: num,
			page: page,
			cateid: cateid,
			select: "30"
		},
		dataType: "json",
		timeout: 10000,
		success: function(result) {
			if (result.status == 0) {
				//console.log(JSON.stringify(result))
				var html = template('shopList', result.data);
				count = result.data.pagex;
				if (page > count) {
					mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
					return;
				}
				if (!type) {
					$("#goodsListBox").append(html);
				} else {
					$("#goodsListBox").html(html);
				}
				if (Number(select) == 10 && page == 1) {
					localStorage.setItem("$glist", JSON.stringify(result))
				}
				if ($("#Loading")) {
					$("#Loading").remove();
				}
				if (shopList) {
					shopClass(); //加载商品分类
					shopList = false;
				}
				page = page + 1;
				goodsJump();
				ShoppingCart(); //添加到购物车
				mui('#refreshContainer').pullRefresh().endPullupToRefresh(page >= result.data.pagex);
			} else {
//				plus.nativeUI.toast(result.message);
				if (page > count) {
					mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
					return;
				}
				$("#goodsListBox").html('<div class="NoData" style="min-height:' + winHeight + 'px"></div>');
				mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
			}
			plus.nativeUI.closeWaiting();
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			plus.nativeUI.closeWaiting();
			$("#goodsListBox").html('<div class="NoData" style="min-height:' + winHeight + 'px"><span>数据获取失败，请检查网络连接</span></div>');
			//plus.nativeUI.toast(type);
			//console.log(type);
		}
	});
}


//导航分类选择
function navClass() {
	//即将揭晓,人气,最新,价格	
//	$("#divGoodsNav li").click(function() {
//		$("#goodsListBox").html('<div class="Loading" id="Loading" style="min-height:' + winHeight + 'px"></div>');
//		var l = $(this).index();
//		//$("#divGoodsNav li").removeClass().eq(l).addClass('gtji');
//		var parm = $("#divGoodsNav li").eq(l).attr('order');
//		select = parm;
//		page = 1;
//		console.log(typeof(select));
//		if (plus.networkinfo.getCurrentType() == 1) {
//			//console.log("aaaa");
//			mui('#refreshContainer').pullRefresh().disablePullupToRefresh();
//			winHeight = $(window).height() - 35;
//			$("#goodsListBox").html('<div class="NoData" style="min-height:' + winHeight + 'px"><span>网络连接失败，请检查网络，重新加载...</span></div>');
//		} else {
//			if ($(".goodsList .NoData")) {
//				$(".goodsList .NoData").remove();
//			}
//			$(".goodsList ul").remove();
//			LoadData();
//			mui('#refreshContainer').pullRefresh().refresh(true);
//		}
//	});
}

//商品分类选择
function shopKind() {
	//商品分类
	var dl = $("#divGoodsNav dl"),
		last = $("#divGoodsNav li:last"),
		first = $("#divGoodsNav dd:first");
	$("#divGoodsNav li:last a:first").click(function() {
		if (dl.css("display") == 'none') {
			dl.show();
			last.addClass("gSort");
			first.addClass("sOrange");
		} else {
			dl.hide();
			last.removeClass("gSort");
			first.removeClass("sOrange");
		}
	});
	$("#divGoodsNav  li").click(function() {
		$("#goodsListBox").html('<div class="Loading" id="Loading" style="min-height:' + winHeight + 'px"></div>');
		cateid = $(this).attr('id');
		$("#divGoodsNav  li").removeClass("active")
		$(this).addClass("active");
		console.log(cateid);
		page = 1;
		mui('#refreshContainer').pullRefresh().refresh(true);
		LoadData();
	});
}

//添加到购物车
function ShoppingCart() {
	mui("#goodsListBox").off("tap", ".f-fe");
	mui("#goodsListBox").on("tap", ".f-fe", function(event) {
		event.stopPropagation();
		console.log("添加到购物车")
		var codeid = this.getAttribute('codeid');
		var qishu = this.getAttribute('data-qishu');
		console.log(codeid + "   " + qishu);
		Gobal.AddShoppingCart(codeid, qishu);
	});
}

//加载商品分类
function shopClass() {
	mui.getJSON(Gobal.server_url + '/mobile/ajax/categoryx', function(data) {
		if (data.status == 0) {
			console.log(JSON.stringify(data))
			var html = template('shopClass', data.data);
			//console.log(html)
			$("#divGoodsNav").append(html);
			//navClass(); //绑定导航事件
			shopKind(); //绑定商品分类事件
		} else {
			plus.nativeUI.toast(data.message);
		}
		console.log(JSON.stringify(data))
	});
}


//点击商品跳转
function goodsJump() {
	mui("#goodsListBox").off();
	mui("#goodsListBox").on("tap", ".gtji", function() {
		var id = this.getAttribute("id");
		var qishu = this.getAttribute("data-qishu");
		console.log("商品：" + id)
		mui.openWindow({
			url: "IndexHead.html",
			id: "goods" + id,
			extras: {
				Address: "index.item.html",
				wType: 'goods',
				ShopId: id,
				wName: "商品详情"
			}
		});
	});
}