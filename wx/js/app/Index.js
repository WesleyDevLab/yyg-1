/** 
 * 缓存变量说明
 * $index 首页缓存数据
 * 如果本地不存在,则联网下载,保存至本地
 * 变量Catalog定义图片缓存文件夹
 */
var Catalog = '_downloads/image/index/';
mui.plusReady(function() {
	var scroller = document.getElementById("refreshContainer").children[0];
	mui.init({
		pullRefresh: {
			container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
			down: {
				contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
				contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
				contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
				callback: function() {
						if (plus.networkinfo.getCurrentType() == 1) {
							plus.nativeUI.toast("没有连接到网络，请检查网络连接");
							mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
						} else {
							Jump();
							loadData(destryContent, function() {
								mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
							});
						}

					} //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			}
		}
	});
	lianjie();
	//清除数据
	function destryContent() {
		$("#sliderBox").removeData("flexslider");
		$("#autoLotteryBox").removeData("flexslider");
		$("#autoLotteryBox .flex-control-nav").remove();
	}

	//读取网络接口
	function loadData(startFn, endFn) {
		Jump();
		mui.getJSON(Gobal.server_url + "/mobile/ajax/index", {}, function(res) {
			if (startFn)
				startFn();
			localStorage.setItem("$index", JSON.stringify(res)); //存储当前数据
			ProcessingData(res); //解析数据
			//console.log(slides_data.slides[0].src);
			console.log(JSON.stringify(res));
			// callback
			if (endFn)
				endFn();
		});
	}

	function ProcessingData(res) {
		// 焦点图
		var slides = res.slides.listItems;
		var slides_data = {
			slides: slides
		};
		var html = template('slider-tpl', slides_data);
		document.getElementById('sliderBox').innerHTML = html;
		zuixinjiexiao();
		xcJump();
		if ($("#divTimerItems .m-xs-li").length == 1) {
			$("#autoLotteryBox").css({
				"height": "150px"
			});
			$("#divTimerItems .m-xs-li").css({
				"padding-top": "10px"
			})
		} else {
			$("#autoLotteryBox").removeAttr("style");
			$("#divTimerItems .m-xs-li").removeAttr("style");
		}
		// 热门商品
		var shoplistrenqi = res.shoplistrenqi;
		//console.log(shoplistrenqi)
		var recommend_data = {
			"shoplistrenqi": shoplistrenqi
		};
		template.helper("short", function(t) {
			if(t.length > 5){
				return t.substr(0,5) + "...";
			}else{
				return t;
			}
		});
		var html = template('recommend-tpl', recommend_data);
		document.getElementById('ulRecommend').innerHTML = html;
		//console.log(html)
		// 添加事件
		//lazyLoadImage(scroller);//图片懒加载方法
		$("#sliderBox").flexslider();
		$("#autoLotteryBox").flexslider({
			slideshow: false,
			animationLoop: true,
			controlType: 1,
			controlPos: 1,
			startAt: 0
		});
		var c = $("#divTimerItems");
		var f = c.find("div[name=timerItem]");
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
		ShoppingCart(); //添加到购物车
		Gobal.skipUserHome(); //跳转个人主页

		var temp = 0;
		$("#autolottery").on("tap", function() {
			temp++;　　　　
			if (temp == 1) {　　　　　　
				setTimeout(function() {　　
					mui.openWindow({
						url: "IndexHead.html",
						id: "index.glist.html",
						extras: {
							Address: "index.glist.html",
							wType: 'back',
							wName: "限时"
						}
					});
					temp = 0;
				}, 100)　　　　
			}
		});
	}

	//一级栏目跳转
	function Jump() {
		mui(".g-main").off();
		mui(".g-main").on("tap", ".m-tt1", function() {
			var Address = this.getAttribute("id");
			if (Address) {
				if (Address == "lottery") {
					mui.openWindow({
						url: "IndexHead.html",
						id: "Indexlottery",
						extras: {
							Address: "index.lottery.html",
							wType: 'back',
							wName: "最新揭晓"
						}
					});
				} else {
					mui.openWindow({
						url: "IndexHead.html",
						id: "allList",
						aniShow: 'pop-in',
						extras: {
							Address: "classify.html",
							wType: 'back',
							wName: "产品分类",
							winID: plus.webview.currentWebview().id
						}
					});
				}
			}
		});
	}

	//商品详情
	function xcJump() {
		mui("#divLottery").off();
		mui("#divLottery").on("tap", ".carry_div", function() {
			var Address = this.getAttribute("id");
			var qishu = this.getAttribute("data-qishu");
			if (Address) {
				mui.openWindow({
					url: "IndexHead.html",
					id: "index.item" + Address,
					extras: {
						Address: "index.item.html",
						wType: 'back',
						wName: "商品详情",
						ShopId: Address
					}
				});
			}
		});
	}
	//产品分类、晒单分享、常见问题
	function lianjie() {
		mui(".mui-media").off();
		mui(".mui-media").on("tap", "a", function() {
			var Address = this.getAttribute("id");
			var title = this.getAttribute("title");
			if (Address != "index") {
				mui.openWindow({
					url: "IndexHead.html",
					id: "lianjie.html",
					aniShow: 'pop-in',
					extras: {
						Address: Address,
						wType: 'back',
						wName: title
					}
				});
			} else {
				mui.alert("该功能正在开发中...");
			}
		});
	}

	//没有网络时加载
	function noNetwork() {
		if (localStorage.getItem("$index")) {
			console.log("存在缓存数据");
			ProcessingData(JSON.parse(localStorage.getItem("$index")));
		} else {
			$("#ulRecommend,#sliderBox,#divLottery,#divTimerItems").html('<div class="NoData"><span>网络连接失败，请检查网络，重新加载...</span></div>');
		}
	}
	//检查是否连接到网络
	function Check() {
		console.log(plus.networkinfo.getCurrentType())
		if (plus.networkinfo.getCurrentType() == 1) {
			//plus.nativeUI.toast("没有连接到网络，请检查网络连接");
			noNetwork();
		} else {
			plus.io.resolveLocalFileSystemURL(Catalog, function(entry) {
				entry.removeRecursively(function(entry) {
					loadData();
					console.log("删除目录成功");
				}, function(e) {
					console.log(e.message);
				});
			}, function(entry) { //如果目录不存在直接运行加载数据
				console.log(entry.message);
				loadData();
			});
		}
	}

	//添加到购物车
	function ShoppingCart() {
		mui("#ulRecommend").off("tap", ".cart-img");
		mui("#ulRecommend").on("tap", ".cart-img", function(event) {
			event.stopPropagation();
			var codeid = this.getAttribute('codeid');
			var qishu = this.getAttribute('data-qishu');
			Gobal.AddShoppingCart(codeid, qishu);
			console.log("添加到购物车")
		});
	}
	Check(); //检查是否连接到网络

	$("#sliderBox").flexslider();
	$("#autoLotteryBox").flexslider({
		slideshow: false,
		animationLoop: true,
		controlType: 1,
		controlPos: 1,
		startAt: 0
	});

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
});
// 最新揭晓
function zuixinjiexiao() {
	mui.getJSON(Gobal.server_url + "/mobile/ajax/GetStartRaffleAllList", {}, function(data) {
		if (data) {
			console.log(JSON.stringify(data));
			var html = template('lotter-tpl', data);
			document.getElementById("jiexiaoList").innerHTML = html;
			var c = $("#jiexiaoList");
			var f = c.find("[name=timerItem]");
			f.each(function() {
				var m = $(this);
				var n = parseInt(m.attr("seconds"));
				var s = m.attr("id");
				if (n > 0) {
					var l = function() {
						$("#" + s).html("正在计算...");
						kaijiang(s);
					};
					m.StartTimeOut(l, n)
				} else {
					kaijiang(s);
				}
			});

			$("#jiexiaoList .zxjs").on("tap", function() {
				var qishu = $(this).attr("data-qishu");
				var sid = $(this).attr("sid");
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
		}
	});
}

function kaijiang(s) {
	mui.getJSON(Gobal.server_url + "/mobile/ajax/GetBarcodernoInfo/" + s, {}, function(res) {
		$("#" + s).parents(".ries").css({background:'#fff'});
		$("#" + s).css({color:'#000'});
		var user = res.q_user;
		if(user.length > 2){
			user = user.substr(0,2) + "...";
		}
		$("#" + s).html("<div class='t_green'>中奖</div>" + user);
	});
}