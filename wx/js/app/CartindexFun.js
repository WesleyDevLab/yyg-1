mui.plusReady(function() {
	console.log(plus.webview.currentWebview())
	console.log("购物车窗口ID：" + plus.webview.currentWebview().id);
	LoadCart();
});

function refreshWeb() {
	console.log("正在刷新购物车...");
	LoadCart(); //加载数据
}

function Addsub() {
	/*商品数量加减的判断与正则表达式*/
	var inputValue = function(val, type) {
		var sum = parseInt(val);
		if (typeof sum === 'number' && sum > 0) {
			switch (type) {
				case 'add':
					sum++;
					break;
				case 'subtraction':
					sum--;
					if (sum <= 0) {
						sum = 1;
					}
					break;
			}
		} else {
			sum = 1;
		}
		return sum;
	};
	$('.a1').on('click', function() {
		var dom = $('input');
		dom.val(inputValue(parseInt(dom.val()), $(this).attr('data-type')));
	});
	$('#txtNum4').on('input', function() {
		var val = $(this).val().replace(/[^1-9]]/g, '');
		$(this).val(val ? val : 1);
	})
}
//加载数据
function LoadCart() {
	var $Cart = localStorage.getItem("$Cart");
	console.log($Cart);
	if ($Cart) {
		$Cart = JSON.parse($Cart);
		template.helper("total", function() {
			var shopjiage = 0;
			for (value in $Cart.shoppingList) {
				shopjiage = shopjiage + $Cart.shoppingList[value].num * Number($Cart.shoppingList[value].yunjiage);
			}
			return shopjiage.toFixed(2);
		});
		var html = template("cartList", $Cart);
		document.getElementById("shopingList").innerHTML = html;
		BindEvent();
		Addsub();
	} else {
		var NoCart = {};
		template.helper("total", function() {});
		var html = template("cartList", NoCart);
		document.getElementById("shopingList").innerHTML = html;
	}

}

//绑定事件
function BindEvent() {
	var a = $("#cartBody");
	var c = $("#divNone");
	var b = function() {
		var o = "";
		var h = $("#divTopMoney");
		var g = $("#divBtmMoney");
		var e = function(t, s, r, q) {
			$.PageDialog.fail(t, s, r, q)
		};
		var n = function(s, r, q) {
			$.PageDialog.confirm(s, r, q)
		};
		if (h.length > 0) {
			h.children("a").click(function() {
				location.href = Gobal.Webpath + "/mobile/cart/pay" //付款页面
			})
		}
		g.children("a").click(function() {
			SubmitSet();
			//location.href = Gobal.Webpath + "/mobile/cart/pay" //付款页面
		});
		var m = function() {
			var q = 0;
			var r = 0;
			$("input:text[name=num]", a).each(function(s) {
				var t = parseInt($(this).val());
				if (!isNaN(t)) {
					r++;
					q += t
				}
			});
			if (r > 0) {
				if (h.length > 0) {
					h.children("span").html(q + ".00")
				}
				g.children("p").html('总共抢拍<span class="orange arial z-user">' + r + '</span>个商品  合计金额：<span class="orange arial">' + q + ".00</span> 元")
			} else {
				g.remove()
			}
		};
		var d = function() {
			var z = $(this);
			var t = z.attr("id");
			var v = t.replace("txtNum", "");
			var q = z.next().next();
			var r = parseInt(z.next().next().next().val());
			var s, y, w = /^[1-9]{1}\d{0,6}$/;
			var u;
			o = t;
			var x = function() {
				if (o != t) {
					return
				}
				s = q.val();
				y = z.val();
				//console.log(z.attr("data-id")+s+"  "+y);
				if (y != "" && s != y) {
					var B = $(window).width();
					var A = (B) / 2 - z.offset().left - 127;
					if (w.test(y)) {
						u = parseInt(y);
						if (u <= r) {
							q.val(y)
						} else {
							u = r;
							e("最多" + u + "人次", z, -75, A);
							z.val(u);
							q.val(u)
						}
						p(u, z);

						j(z, v, u);
						i(z, u, r);
						m()
					} else {
						e("只能输正整数哦", z, -75, A);
						z.val(s)
					}
				} else {
					KeyboardCart(z, y);
				}
				setTimeout(x, 200)
			};
			x()
		};
		var p = function(r, u) {
			var t = u.parent().parent().parent();
			var q = t.find("div.z-Cart-tips");
			if (r > 100) {
				if (q.length == 0) {
					var s = $('<div class="z-Cart-tips">已超过100人次，抢拍存在一定风险，请谨慎参与！</div>');
					t.prepend(s)
				}
			} else {
				q.remove()
			}
		};
		var l = function() {
			var q = $(this);
			if (o == q.attr("id")) {
				o = ""
			}
			if (q.val() == "") {
				q.val(q.next().next().val())
			}
		};
		var j = function(q, t, r) {

			var s = function(w) {
				if (w.code == 1) {
					var v = $(window).width();
					var u = (v) / 2 - q.offset().left - 127;
					e("本期商品已抢拍光了", q, -75, u)
				} else {
					if (w.code == 0) {
						q.parent().prev().html('总共抢拍：<em class="arial">' + r + '</em>人次/<em class="orange arial">￥' + r + ".00</em>")
					}
				}
			};
			//GetJPData(Gobal.Webpath, "ajax", "addShopCart/" + t + "/" + r + "/cart", s)
		};
		var k = function(w, v, obj) {
			var u = v.attr("id");
			var s = u.replace("txtNum", "");
			var r = parseInt(v.next().next().next().val());
			var q = v.next().next();
			var t = parseInt(q.val()) + w;
			if (t > 0 && t <= r) {
				if (changeCart(w, obj)) {
					i(v, t, r);
					q.val(t);
					v.val(t);
					p(t, v);
					j(v, s, t);
					m()
				}
			}
		};
		var i = function(r, t, s) {
			var q = r.prev();
			var u = r.next();
			if (s == 1) {
				q.addClass("z-jiandis");
				u.addClass("z-jiadis")
			} else {
				if (t == 1) {
					q.addClass("z-jiandis");
					u.removeClass("z-jiadis")
				} else {
					if (t == s) {
						q.removeClass("z-jiandis");
						u.addClass("z-jiadis")
					} else {
						q.removeClass("z-jiandis");
						u.removeClass("z-jiadis")
					}
				}
			}
		};
		$("input:text[name=num]", a).each(function(q) {
			var r = $(this);
			r.bind("focus", d).bind("blur", l);
			r.prev().bind("click",
				function() { //减
					k(-1, r, $(this));
				});
			r.next().bind("click",
				function() { //加
					k(1, r, $(this));
				})
		});
		var f = function() {
			var q = $("li", "#cartBody");
			if (q.length < 1) {
				a.parent().remove();
				c.show()
			} else {
				if (q.length < 4) {
					h.remove()
				}
			}
		};
		$("a[name=delLink]", a).each(function(q) {
			$(this).bind("click",
				function() {
					var r = $(this);
					var t = r.attr("cid");
					var shopID = r.attr("id");
					var s = function() {
						var u = function(v) {
							if (v.code == 0) {
								r.parent().parent().parent().remove();
								m();
								f()
							} else {
								e("删除失败，请重试")
							}
						};
						//GetJPData(Gobal.Webpath, "ajax", "delCartItem/" + t, u)
						DeleteCart(shopID);
					};
					n("您确定要删除吗？", s)
				})
		})
	};

	if (a.length > 0) {
		Base.getScript("../../js/app/pageDialog.js", b);
	} else {
		c.show()
	}
}
//更改数据购物车商品信息
function changeCart(type, obj) {
	var $Cart = localStorage.getItem("$Cart");
	if ($Cart) {
		$Cart = JSON.parse($Cart);
		var num = $Cart.shoppingList[obj.attr("id")].num;
		//var shopNum = $Cart.shopNum;
		if (type == 1) {
			$Cart.shoppingList[obj.attr("id")].num = num + 1;
			//$Cart.shopNum = shopNum + 1;
		} else {
			$Cart.shoppingList[obj.attr("id")].num = num - 1;
			//$Cart.shopNum = shopNum - 1;
		}
		$("#shop" + obj.attr("id") + " p.gray9 em").eq(0).html($Cart.num);
		console.log(JSON.stringify($Cart.shoppingList[obj.attr("id")]));
		localStorage.setItem("$Cart", JSON.stringify($Cart));
		return true;
	} else {
		return false;
	}
}
//更改数据购物车商品信息直接输入
function KeyboardCart(obj, num) {
	var $Cart = localStorage.getItem("$Cart");
	if ($Cart) {
		$Cart = JSON.parse($Cart);
		$Cart.shoppingList[obj.attr("data-id")].num = num;
		$("#shop" + obj.attr("data-id") + " p.gray9 em").eq(0).html(num);
		console.log(JSON.stringify($Cart.shoppingList[obj.attr("data-id")]));
		localStorage.setItem("$Cart", JSON.stringify($Cart));
		return true;
	} else {
		return false;
	}
}





function DeleteCart(id) {
	//localStorage.clear()
	var $Cart = localStorage.getItem("$Cart");
	if ($Cart) {
		$Cart = JSON.parse($Cart);
		var shopNum = $Cart.shopNum;
		delete $Cart.shoppingList[id]; //删除JSON数据
		$Cart.shopNum = shopNum - 1;
		console.log($Cart.shopNum)
		if ($Cart.shopNum <= 0) {
			localStorage.removeItem("$Cart");
		} else {
			localStorage.setItem("$Cart", JSON.stringify($Cart));
		}
		LoadCart(); //重新加载数据
		return true;
	} else {
		return false;
	}
}

function SubmitSet() {
	var $uesr = localStorage.getItem("$uesr");
	if ($uesr) {
		var $Cart = JSON.parse(localStorage.getItem("$Cart"));
		for (value in $Cart.shoppingList) {
			console.log($Cart.shoppingList[value].id)
			if ($Cart.shoppingList[value].messges) {
				plus.nativeUI.toast("部分商品已失效，请删除失效商品重新提交！");
				return false;
			}
		}
		var shop = "";
		for (value in $Cart.shoppingList) {
			shop = shop + $Cart.shoppingList[value].id + "&" + $Cart.shoppingList[value].qishu + "&" + $Cart.shoppingList[value].num + "|";
		}
		shop = shop.substring(0, shop.length - 1);
		console.log(shop);
		mui.openWindow({
			url: 'IndexHead.html',
			id: 'cart.payment',
			show: {
				aniShow: 'slide-in-right'
			},
			waiting: {
				title: '提交订单...', //等待对话框上显示的提示内容
			},
			extras: {
				winID: plus.webview.currentWebview().id,
				Address: "cart.payment.php",
				wName: "结算支付",
				wType: "two"
			}
		});
	} else {
		plus.nativeUI.toast("您还未登录，请登录！");
	}
}

function SubmitSetwap() {
	var $uesr = localStorage.getItem("$uesr");
	if ($uesr) {
		var $Cart = JSON.parse(localStorage.getItem("$Cart"));
		for (value in $Cart.shoppingList) {
			console.log($Cart.shoppingList[value].id)
			if ($Cart.shoppingList[value].messges) {
				plus.nativeUI.toast("部分商品已失效，请删除失效商品重新提交！");
				return false;
			}
		}
		var shop = "";
		for (value in $Cart.shoppingList) {
			shop = shop + $Cart.shoppingList[value].id + "-" + $Cart.shoppingList[value].qishu + "-" + $Cart.shoppingList[value].num + "_";
		}
		shop = shop.substring(0, shop.length - 1);
		console.log(shop);
	} else {
		plus.nativeUI.toast("您还未登录，请登录！");
	}
}