/**
 * 全局函数，所有页面都需要引入
 */
mui.plusReady(function() {
	//仅支持竖屏显示
	plus.screen.lockOrientation("portrait-primary");
	mui(".subpage").on("tap", "a", function(e) {
		var sub = this.getAttribute("data-sub");
		if (!sub)
			return;
		e.stopPropagation();
		Gobal.openWindow(this);
		return;
	});

});

var back = mui.back;
mui.back = function() {
	var current = plus.webview.currentWebview();
	if (current.mType === 'main') { //模板主页面
		current.hide('auto');
		setTimeout(function() {
			//使用自定义样式，这里禁止修改导航栏标题样式
			//document.getElementById("title").className = 'mui-title mui-fadeout';
			current.children()[0].hide("none");
		}, 200);
	} else if (current.mType === 'sub') {
		if (mui.targets._popover) {
			$(mui.targets._popover).popover('hide');
		} else {
			current.parent().evalJS('mui&&mui.back();');
		}
	} else {
		back();
	}
}

/**
 * 根据url获取id
 * @param {Object} url
 */
Gobal.getWebviewIdByUrl = function(url) {
	//console.log(url)
	var ids = url.split("/"),
		id = ids[ids.length - 1];
	return id;
};

Gobal.openWindow = function(el) {
	var subpage = el.getAttribute("Address"),
		subpageid = Gobal.getWebviewIdByUrl(subpage),
		id = el.getAttribute("data-id"),
		qishu = el.getAttribute("data-qishu");
	console.log(subpage)
	var extras = mui.extend()
		//	mui.openWindow({
		//		url: subpage,
		//		id: subpageid,
		//		show: {
		//			autoShow: false
		//		},
		//		extras: {
		//			tid: id,
		//			wType: 'sub'
		//		}
		//	});
	if (subpage) {
		mui.openWindow({
			url: "IndexHead.html",
			id: subpageid,
			extras: {
				Address: subpage,
				wType: 'goods',
				ShopId: id,
				wName: "商品详情"
			}
		});
	}
};

//网络不正常时显示
Gobal.NetworkError = function() {
	var html = '<div class="common_net_status" style="display:none;margin-top: 50%;margin-bottom: 55%;text-align: center;" id="no-networking"><li class="icon"><a class="iconfont icon-wifi"></a></li><!--2种网络状态--><li>亲，您的手机网络不太顺畅哦～</li><li style="font-size: 14px;">请检查你的手机是否联网</li><li><a class="reload" id="reload-btn">重新加载</a></li></div>';
	return html;
}

//添加到购物车
Gobal.AddShoppingCart = function(codeid, qishu) {
		var bool = true;
		$.ajax({
			type: "get",
			url: Gobal.server_url + '/mobile/ajax/cshopxiangxi/&id=' + codeid,
			async: false,
			dataType: "json",
			success: function(data) {
				if (data.status == 1) {
					console.log(JSON.stringify(data));
					//localStorage.clear()
					if (data.shop.q_user_code == null && data.shop.shenyurenshu > 0) {
						var shoppingCart = localStorage.getItem("$Cart");
						console.log("购物车：" + shoppingCart);
						if (shoppingCart) {
							shoppingCart = JSON.parse(shoppingCart);
							for (value in shoppingCart.shoppingList) {
								console.log(value + "  " + data.shop.id)
								if (value == data.shop.id) {
									addsuccess('已添加过');
									bool = true;
									return true;
								}
							}
							data.shop.num = 1;
							shoppingCart.shopNum = shoppingCart.shopNum + 1;
							shoppingCart.shoppingList[data.shop.id] = data.shop;
							localStorage.setItem("$Cart", JSON.stringify(shoppingCart));
							addsuccess('添加成功');
						} else {
							var shopID = data.shop.id;
							data.shop.num = 1;
							var shopData = data.shop;
							var $Cart = {};
							$Cart.shoppingList = {};
							$Cart.shopNum = 1;
							$Cart.shoppingList[shopID] = shopData;
							localStorage.setItem("$Cart", JSON.stringify($Cart));
							console.log(JSON.stringify($Cart))
							addsuccess('添加成功');
						}
					} else {
						bool = false;
						addsuccess('添加失败,已过期');
					}
				} else if (data.status == 0) {
					bool = false;
					addsuccess('添加失败');
				}
			},
			timeout: 10000,
			error: function() {
				plus.nativeUI.toast("网络超时，请检查网络！");
			}
		});

		function addsuccess(dat) {
			$("#pageDialogBG .Prompt").text("");
			var w = ($(window).width() - 255) / 2,
				h = ($(window).height() - 45) / 2;
			$("#pageDialogBG").css({
				top: h,
				left: w,
				opacity: 0.8
			});
			$("#pageDialogBG").stop().fadeIn(500);
			$("#pageDialogBG .Prompt").append('<s></s>' + dat);
			$("#pageDialogBG").fadeOut(500);
			//更新购物车
			var cartlist = plus.webview.getWebviewById("indexcart.cartlist.html");
			if (cartlist) {
				cartlist.evalJS("refreshWeb()");
			}
		};
		return bool;
	}
	//跳转到个人主页
Gobal.skipUserHome = function() {
	console.log("已调用个人主页方法");
	$("[name='userindex']").off();
	$("[name='userindex']").on("tap", function(e) {
		e.stopPropagation();
		var uid = $(this).attr("userID");
		console.log("uid:" + uid);
		mui.openWindow({
			url: "IndexHead.html",
			id: "user" + uid,
			extras: {
				Address: "index.userindex.html",
				wType: 'back',
				wName: "个人主页",
				userID: uid
			}
		});
	});
};
//定义网站变量
var Base = {
	head: document.getElementsByTagName("head")[0] || document.documentElement,
	Myload: function(B, A) {
		this.done = false;
		B.onload = B.onreadystatechange = function() {
			if (!this.done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
				this.done = true;
				A();
				B.onload = B.onreadystatechange = null;
				if (this.head && B.parentNode) {
					this.head.removeChild(B)
				}
			}
		}
	},
	getScript: function(A, C) {
		var B = function() {};
		if (C != undefined) {
			B = C
		}
		var D = document.createElement("script");
		D.setAttribute("language", "javascript");
		D.setAttribute("type", "text/javascript");
		D.setAttribute("src", A);
		this.head.appendChild(D);
		this.Myload(D, B)
	},
	getStyle: function(A, B) {
		var B = function() {};
		if (callBack != undefined) {
			B = callBack
		}
		var C = document.createElement("link");
		C.setAttribute("type", "text/css");
		C.setAttribute("rel", "stylesheet");
		C.setAttribute("href", A);
		this.head.appendChild(C);
		this.Myload(C, B)
	}
}


var winName = "H51BFA684 cart.cartlist.html index.index.html index.glist.html discover.html user.index.html indexcart.cartlist.html indexindex.index.html indexindex.glist.html indexuser.index.html indexdiscover.html";


// 禁止选择
document.oncontextmenu = function() {
	return false;
};