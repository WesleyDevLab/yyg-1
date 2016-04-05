//定义公共变量
var userMeny = 0;
var Hmoney = 0;
var shopMoney = 0;
var hongbaoid = 0;
mui.plusReady(function() {
	plus.nativeUI.showWaiting();
	console.log(plus.webview.currentWebview().id)
	shopInfor();
	userInfor();

});
//获取用户信息
function userInfor() {
	var $uesr = localStorage.getItem("$uesr");
	if ($uesr) {
		$uesr = JSON.parse($uesr);
		$.ajax({
			type: "post",
			url: Gobal.server_url + "/mobile/ajax/userxinxi",
			data: {
				uid: $uesr.uid,
				key: $uesr.key
			},
			dataType: "json",
			async: true,
			timeout: 10000,
			success: function(res) {
				console.log(JSON.stringify(res));
				if (res.status != 0) {
					redEnvelope();
					template.helper("zongjia", function(value) {
						return shopMoney.toFixed(2);
					});
					var html = template("userInfo", res);
					document.getElementById("userBox").innerHTML = html;
					play();
					bluin();
					console.log(res.userxinxi.money);
					userMeny = res.userxinxi.money;
					if (Number(res.userxinxi.money) > 0) {
						$("#ulPayway li").click(function() {
							var obj = $(this).children("#spPoints");
							if (obj.hasClass("z-pay-mentDis")) {
								obj.removeClass("z-pay-mentDis");
								obj.addClass("z-pay-mentsel");
								Calculation("yue", "add");
							} else {
								obj.addClass("z-pay-mentDis");
								obj.removeClass("z-pay-mentsel");
								Calculation("yue", "Remove");
							}
						});
					}
				} else {
					var self = plus.webview.currentWebview();
					plus.nativeUI.toast("用户未登录，请重新登录！");
					plus.webview.getWebviewById(self.windowID).close();
				}
				plus.nativeUI.closeWaiting();
			},
			error: function() {
				plus.nativeUI.closeWaiting();
			}
		});
	} else {
		console.log("未登录")
	}

}
//获取购物车信息
function shopInfor() {
	var $Cart = localStorage.getItem("$Cart");
	if ($Cart) {
		$Cart = JSON.parse($Cart);
		template.helper("Price", function(value) {
			var shopjiage = $Cart.shoppingList[value].num * Number($Cart.shoppingList[value].yunjiage);
			return shopjiage.toFixed(2);
		});
		template.helper("total", function() {
			var shopjiage = 0;
			for (value in $Cart.shoppingList) {
				shopjiage = shopjiage + $Cart.shoppingList[value].num * Number($Cart.shoppingList[value].yunjiage);
			}
			shopMoney = shopjiage;
			return shopjiage.toFixed(2);
		});

		var html = template("shopInfo", $Cart);
		document.getElementById("shopBody").innerHTML = html;
	} else {
		$("#PlayBox").html('<div id="divNone" class="haveNot z-minheight"><s></s><p>亲，您的购物车中没有商品哦，去选购一些吧。</p></div>');
	}
}

//获取红包信息
function redEnvelope() {
	var $uesr = localStorage.getItem("$uesr");
	if ($uesr) {
		$uesr = JSON.parse($uesr);
		$.ajax({
			type: "post",
			url: Gobal.server_url + "/mobile/ajax/hongbao",
			data: {
				uid: $uesr.uid,
				key: $uesr.key
			},
			dataType: "json",
			async: true,
			timeout: 10000,
			success: function(res) {
				if (res.status != 0) {
					console.log(JSON.stringify(res));
					var html = template("redEnvelope", res);
					document.getElementById("redEnveBox").innerHTML = html;
					if (res.hongbao) {
						$("#Choice").click(function() {
							$(this).toggleClass("no");
							if ($(this).hasClass("no")) {
								$("#redList").show();
							} else {
								$("#redList").hide();
							}
						});
						$("#redList li").click(function() {

							var limit = $(this).attr("limit");
							var money = $(this).attr("money");

							var total = Number($("#mengy").html());
							console.log("money:" + money + "  limit:" + limit + "  total:" + total)
							if (limit <= total) {
								$("#Choice").attr("data-id", $(this).attr("id"));

								$("#Choice strong").html(money + "元红包");
								if (money == 0) {
									$("#Choice strong").html("");
								}
								$("#redList").hide();
								$("#Choice").removeClass("no");
								hongbaoid = $(this).attr("id");
								Hmoney = money;
								Calculation("hongbao");
							} else {
								$.PageDialog.confirm("红包使用条件不满足！需满" + limit + "元使用。", function() {
									$("#redList").hide();
									$("#Choice").removeClass("no");
								});
							}
						});
					}
				} else {
					res.hongbao = [];
					var html = template("redEnvelope", res);
					document.getElementById("redEnveBox").innerHTML = html;
				}

			},
			error: function() {

			}
		});
	} else {
		console.log("未登录")
	}

}


function Calculation(type, exc) {
	if (type == "hongbao") {
		if ($("#spPoints").hasClass("z-pay-mentsel")) {
			var Num = Number($("#mengy").html()) - Hmoney - Number(userMeny);
			if (Num > 0) {
				$("#playMeny").html(Num.toFixed(2));
				$("#playMode").show();
			} else {
				$("#playMode").hide();
			}
		} else {
			var Num = Number($("#mengy").html()) - Hmoney;
			if (Num > 0) {
				$("#playMeny").html(Num.toFixed(2));
				$("#playMode").show();
			} else {
				$("#playMode").hide();
			}
		}
	}
	if (type == "yue") {
		if ($("#spPoints").hasClass("z-pay-mentsel")) {
			var Num = Number($("#mengy").html()) - Hmoney - Number(userMeny);
			if (Num > 0) {
				$("#playMeny").html(Num.toFixed(2));
				$("#playMode").show();
			} else {
				$("#playMode").hide();
			}
		} else {
			var Num = Number($("#mengy").html()) - Hmoney;
			if (Num > 0) {
				$("#playMeny").html(Num.toFixed(2));
				$("#playMode").show();
			} else {
				$("#playMode").hide();
			}
		}
	}
}

function play() {

	$("#playMode .gray9").click(function() {
		if (!$(this).children("i").hasClass("z-bank-Roundsel")) {
			$("#playMode .gray9 i").removeClass("z-bank-Roundsel").addClass("z-bank-Round");
			$(this).children("i").removeClass("z-bank-Round").addClass("z-bank-Roundsel");
			$("#playname").html($(this).attr("name"))
		}
	});

	var $Cart = JSON.parse(localStorage.getItem("$Cart"));
	var shop = "";
	for (value in $Cart.shoppingList) {
		shop = shop + $Cart.shoppingList[value].id + "&" + $Cart.shoppingList[value].qishu + "&" + $Cart.shoppingList[value].num + "|";
	}
	shop = shop.substring(0, shop.length - 1);
	console.log(shop);


	$("#btnPay").on("tap", function() {
		plus.nativeUI.showWaiting("正在提交订单...");
		var typemoeny = "",
			typeenvelope = "",
			typepayment = "",
			hongbaoid = "",
			payByType = "",
			uid = "",
			key = "";
		var $uesr = JSON.parse(localStorage.getItem("$uesr"));
		uid = $uesr.uid;
		key = $uesr.key;
		if (!$(".NoRed")) { //红包
			if ($("#Choice strong").html() != "") {
				typeenvelope = 1;
				hongbaoid = $("#Choice").attr("data-id");
			}
		} else {
			typeenvelope = 0;
			hongbaoid = 0;
		}
		if ($("#spPoints").hasClass("z-pay-mentsel")) { //余额
			typemoeny = 1;
		} else {
			typemoeny = 0;
		}
		if (!$("#playMode").is(":hidden")) { //支付方式
			typepayment = 1;
		} else {
			typepayment = 0;
		}
		console.log("uid:" + uid + " key:" + key + "shop:" + shop + "  typeenvelope:" + typeenvelope + " typemoeny:" + typemoeny + " typepayment:" + typepayment + "  hongbaoid:" + hongbaoid);
		plus.nativeUI.showWaiting();
		$.ajax({
			type: "post",
			url: Gobal.server_url + "/mobile/ajax/userpay/&_=" + new Date().getTime(),
			data: {
				uid: uid,
				key: key,
				shop: shop,
				typeenvelope: typeenvelope,
				typemoeny: typemoeny,
				typepayment: typepayment,
				hongbaoid: hongbaoid
			},
			async: true,
			timeout: 10000,
			dataType: "json",
			success: function(res) {
				console.log(res)
				if (res.status) {
					if (res.status == 1) {
						playSuccess(res.dingdancode);
					}
					if (res.status == 0) {
						plus.nativeUI.toast("支付失败，请重新支付!");
					}
					if (res.status == -1) {
						//alert(JSON.stringify(res))
						plus.nativeUI.toast("部分商品已失效，请删除失效商品重新提交！");
						//plus.webview.getWebviewById("indexcart.cartlist.html").evalJS("refreshWeb()"); //回调购物车
						//更新购物车数据，修改有问题商品
						var $Cart = JSON.parse(localStorage.getItem("$Cart"));
						for (value in res.shoperror) {
							//alert(res.shoperror[value].id);
							//alert(res.shoperror[value].messges);
							$Cart.shoppingList[res.shoperror[value].id].messges = res.shoperror[value].messges;
						}
						//plus.webview.getWebviewById("indexcart.cartlist.html").evalJS("refreshWeb()"); //更新购物车
						plus.webview.getWebviewById("cart.payment").close();
					}
				} else {
					var mhtOrderNo = res.substring(res.indexOf("mhtOrderNo"), res.length);
					mhtOrderNo = mhtOrderNo.substring(mhtOrderNo.indexOf("=") + 1, mhtOrderNo.indexOf("&"));
					//alert("订单号：" + mhtOrderNo);
					//location.href = Gobal.server_url + "/wxpay/index.php?Order=" + mhtOrderNo;
					//var wxPlayData = JSON.parse('{"' + res.replace(/\&/g, '","').replace(/\=/g, '":"') + '"}');
					$.ajax({
						type: "get",
						url: Gobal.server_url_no + "/wxpay/index.php?Order=" + mhtOrderNo + "&openId=" + $openId,
						async: true,
						timeout: 10000,
						dataType: "json",
						success: function(res) {
							//callpay(res, mhtOrderNo);
							wx.chooseWXPay({
								timestamp: res.timeStamp,
								nonceStr: res.nonceStr,
								package: res.package,
								signType: res.signType,
								paySign: res.paySign,
								success: function(res) {
									if(res.errMsg == "chooseWXPay:ok"){
										playSuccess(mhtOrderNo);
									}

								}
							});
						},
						error: function(res) {
							alert(JSON.stringify(res))
						}
					});
				}
				plus.nativeUI.closeWaiting();
			},
			error: function(res) {
				//alert(JSON.stringify(res));
				plus.nativeUI.toast("支付失败");
				plus.nativeUI.closeWaiting();
			}
		});
	});

	function playSuccess(oderID) {
		plus.nativeUI.closeWaiting();
		plus.nativeUI.toast("恭喜支付成功!");
		localStorage.removeItem("$Cart"); //清除购物车
		mui.openWindow({
			url: "IndexHead.html",
			id: "playSuccess",
			extras: {
				Address: "plySuccess.html",
				wType: 'back',
				wName: "支付结果",
				winID: oderID
			}
		});
	}
}

function bluin() {
	$(".rechange").on("tap", function() {
		mui.openWindow({
			url: "IndexHead.html",
			id: "recharge",
			extras: {
				Address: "user.recharge.php",
				wType: 'back',
				wName: "账户充值",
				callBack: true,
				winIDw:"a"
			}
		});
	});
}

function refreshWeb() {
	console.log("正在刷新购物车支付页面...")
	shopInfor();
	userInfor();
}



function jsApiCall(res, oderID) {
	alert(JSON.stringify(res) + "   " + oderID)
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest',
		res,
		function(res) {
			if (res.err_msg == "get_brand_wcpay_request:ok") {
				alert("支付成功");
				playSuccess(oderID);
			}
		}
	);
}

function callpay(res, oderID) {
	if (typeof WeixinJSBridge == "undefined") {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', jsApiCall(res, oderID), false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', jsApiCall(res, oderID));
			document.attachEvent('onWeixinJSBridgeReady', jsApiCall(res, oderID));
		}
	} else {
		jsApiCall(res, oderID);
	}
}