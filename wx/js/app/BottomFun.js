var Gobal = new Object();

function GetJPData(d, c, a, b) {
	$.getJSON(d + "/JPData?action=" + c + "&" + a + "&fun=?", b)
}

function loadImgFun(c) {
	var b = $("#loadingPicBlock");
	if (b.length > 0) {
		var i = "src2";
		Gobal.LoadImg = b.find("img[" + i + "]");
		var a = function() {
			return $(window).scrollTop()
		};
		var e = function() {
			return $(window).height() + a() + 50
		};
		var h = function() {
			Gobal.LoadImg.each(function(j) {
				if ($(this).offset().top <= e()) {
					var k = $(this).attr(i);
					if (k) {
						$(this).attr("src", k).removeAttr(i).show()
					}
				}
			})
		};
		var d = 0;
		var f = -100;
		var g = function() {
			d = a();
			if (d - f > 50) {
				f = d;
				h()
			}
		};
		if (c == 0) {
			$(window).bind("scroll", g)
		}
		g()
	}
}
String.prototype.trim = function() {
	return this.replace(/(\s*$)|(^\s*)/g, "")
};
String.prototype.trims = function() {
	return this.replace(/\s/g, "")
};
var addNumToCartFun = null;
(function() {
	Gobal.Skin = "http://mskin.1yyg.com";
	Gobal.LoadImg = null;
	Gobal.LoadHtml = '<div class="loadImg">正在加载</div>';
	Gobal.LoadPic = Gobal.Skin + "/images/loading.gif?v=130820";
	Gobal.NoneHtml = '<div class="haveNot z-minheight"><s></s><p>暂无记录</p></div>';
	Gobal.NoneHtmlEx = function(i) {
		return '<div class="haveNot z-minheight"><s></s><p>' + i + "<br>请使用电脑访问www.1yyg.com查看更多</p></div>"
	};
	Gobal.LookForPC = '<div class="g-suggest clearfix">请使用电脑访问www.1yyg.com查看更多</div>';
	Gobal.ErrorHtml = function(i) {
		return '<div class="haveNot z-minheight"><s></s><p>抱歉，加载失败，请重试[' + i + "]</p></div>"
	};
	Gobal.unlink = "javascript:void(0);";
	$("#tBtnReturn").click(function() {
		history.go(-1);
		return false
	});
	var e = "https://passport.1yyg.com";
	loadImgFun(0);
	var b = $("#fLoginInfo");
	GetJPData("http://m.1yyg.com", "getUInfo", "", function(j) {
		var i = '<span><a href="/">首页</a><b></b></span><span><a href="/about2.html">关于我们</a><b></b></span>';
		if (j.code == 0) {
			i = i + '<span><a href="/member/" class="Member">' + j.username + '</a><a href="/passport/logout.html" class="Exit">退出</a></span>'
		} else {
			i = i + '<span><a href="/passport/login.html?forward=rego">登录</a><b></b></span><span><a href="/passport/register.html?forward=rego">注册</a></span>'
		}
		b.html(i)
	});
	var d = $("#btnCart");
	if (d.length > 0) {
		GetJPData("http://m.1yyg.com", "cartnum", "", function(i) {
			if (i.code == 0 && i.num > 0) {
				d.html("<em>" + i.num + "</em>")
			}
		})
	}
	addNumToCartFun = function(i) {
		d.html("<em>" + i + "</em>")
	};
	var g = function(j) {
		var i = new Date();
		j.attr("src", j.attr("data") + "?v=" + GetVerNum()).removeAttr("id").removeAttr("data")
	};
	var h = $("#pageJS", "head");
	if (h.length > 0) {
		g(h)
	} else {
		h = $("#pageJS", "body");
		if (h.length > 0) {
			g(h)
		}
	}
	var c = $("#btnTop");
	if ($(window).scrollTop() == 0) {
		c.hide()
	}
	c.css("zIndex", "99").click(function() {
		$("body,html").animate({
			scrollTop: 0
		}, 0)
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > 0) {
			c.show()
		} else {
			c.hide()
		}
	});
	var f = function(j, k, l) {
		var i = new Date();
		i.setTime(i.getTime() + l * 60 * 1000);
		document.cookie = j + "=" + escape(k) + (l == 0 ? "" : ";expires=" + i.toGMTString())
	};
	document.addEventListener("WeixinJSBridgeReady", function a() {
		f("_Terminal", "weixin", 0);
		WeixinJSBridge.call("hideToolbar")
	})
})();