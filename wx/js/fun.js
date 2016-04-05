function loadImgFun(c, target) {
	target = target || window;
	var b = $("#loadingPicBlock");
	if (b.length > 0) {
		var i = "data-src";
		Gobal.LoadImg = b.find("img[" + i + "]");
		var a = function() {
			return $(target).scrollTop()
		};
		var e = function() {
			return $(target).height() + a() + 50
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
		var g = function(e) {
			d = a();
			if (d - f > 50) {
				f = d;
				h()
			}
		};
		if (c == 0) {
			$(target).bind("scroll", g)
		}
		g()
	}
}

function lazyLoadImage(element) {
	var b = $("#loadingPicBlock");
	if (b.length > 0) {
		var i = "data-src";
		Gobal.LoadImg = b.find("img[" + i + "]");
		console.log(Gobal.LoadImg)
		var a = function(e) {
			if(e &&e.detail){
				return -e.detail.lastY;
			}else{
				return 0;
			}
		};
		var h = function() {
			Gobal.LoadImg.each(function(j) {
				var t = $(this).offset().top,
					h = $(window).height();
				if (h - t > -20) {
					var k = $(this).attr(i);
					if (k) {
						$(this).attr("src", k).removeAttr(i).show()
					}
				}
			});
		};
		Gobal.d = 0;
		Gobal.f = -100;
		var g = function(e) {
			Gobal.d = a(e);
			if (Gobal.d - Gobal.f > 50) {
				Gobal.f = Gobal.d;
				setTimeout(function(){
					h();
				},200);// 延迟下，可能不能获取到元素的正确位置
			}
		};
		if (!mui.bindScroll) {
			element.addEventListener("scroll", g);
			mui.bindScroll = true;
		}
//		g();
	}
}