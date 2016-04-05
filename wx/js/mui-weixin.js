/**
 * Created by hzp on 16/1/11.
 *
 * 以来jquery
 */



(function(mui, plus) {

	mui.getJSON = $.getJSON;
	mui.back = function() {
		history.back();
	};

	mui.openWindow = function(url, id, options, extras) {
		if (typeof url === 'object') {
			var parameter = localStorage.getItem("parameter");
			if (parameter) {
				parameter = JSON.parse(parameter);
				parameter[url.extras.Address] = url.extras;
				localStorage.setItem("parameter", JSON.stringify(parameter));
			} else {
				parameter = {};
				parameter[url.extras.Address] = url.extras;
				localStorage.setItem("parameter", JSON.stringify(parameter));
			}
			options = url;
			url = options.url;
			id = options.id || url;
		} else {
			if (typeof id === 'object') {
				options = id;
				id = url;
			} else {
				id = id || url;
			}
		}
		options = options || {};
		var params = options.params || {};
		var extras = options.extras || extras || {};
		plus.webview.create(url, id, params, extras);
	};

	var storage = {
		getItem: function(key) {
			localStorage.getItem(key);
		}
	};

	plus.storage = plus.storage || storage;


	var webview = {
		pages: {},
		cw: {},
		currentWebview: function() {
			console.log(location.pathname)
			var pathnamesplit = location.pathname.split("/");
			var address = pathnamesplit[pathnamesplit.length - 1];
			var parameter = JSON.parse(localStorage.getItem("parameter"));
			if (!parameter) {
				parameter = {};
				parameter[address] = {};
			} else {
				if (!parameter[address]) {
					parameter[address] = {};
				}
			}
			parameter[address].id = address;

			parameter[address].close = function() {
				history.back();
			}
			parameter[address].evalJS = function() {}
			return parameter[address];
		},
		create: function(url, id, params, extras) {
			webview.cw.id = id;
			webview.cw.Address = extras.Address;
			webview.cw.wName = extras.wName;
			webview.cw.wType = extras.wType;

			webview.pages[extras.Address] = {
				id: webview.cw.id,
				Address: webview.cw.Address,
				wName: webview.cw.wName,
				wType: webview.cw.wType,
			};
			var pageExtras = localStorage.getItem("pageExtras") || {};
			if (!$.isEmptyObject(pageExtras)) {
				pageExtras = JSON.parse(pageExtras);
			}
			pageExtras[extras.Address] = {
				id: webview.cw.id,
				Address: webview.cw.Address,
				wName: webview.cw.wName,
				wType: webview.cw.wType,
			};
			localStorage.setItem("pageExtras", JSON.stringify(pageExtras));
			url = "/wx/html/dynamic/" + extras.Address+"?time="+new Date().getTime();
			location.href = url;
		},
		show: function(id) {
			if (webview.pages[id]) {
				var html = webview.pages[id].html;
				webview.cw = $.extend(webview.pages[id], {});
				$("#content").html(html);
			}
		},
		hide: function(id) {

		},
		getWebviewById: function() {
			return {
				close: function() {
					history.back();
				},
				evalJS: function() {

				}
			}
		}
	};

	plus.webview = plus.webview || webview;


	var nativeUI = {
		waiting: null,
		msg: null,
		getWaiting: function() {
			if (!this.waiting) {
				this.waiting = $("<div>", {
					class: "mui-waiting"
				}).appendTo('body');
			}
			return this.waiting;
		},
		getMsg: function() {
			if (!this.msg) {
				this.msg = $("<div>", {
					class: "mui-msg"
				}).appendTo('body');
			}
			return this.msg;
		},
		closeWaiting: function() {
			var w = this.getWaiting();
			w.hide();
		},
		showWaiting: function() {
			var w = this.getWaiting();
			w.show();
		},
		toast: function(t) {
			var m = this.getMsg();
			m.html(t);
			setTimeout(function() {
				m.fadeOut();
			}, 300);
			m.fadeIn();
		}
	};

	plus.nativeUI = plus.nativeUI || nativeUI;

	var key = document;
	plus.key = plus.key || key;

	var screen = {
		lockOrientation: function(t) {

		}
	};
	plus.screen = plus.screen || screen;

	var networkinfo = {
		getCurrentType: function() {
			return 0;
		}
	};
	plus.networkinfo = plus.networkinfo || networkinfo;

	var io = {
		resolveLocalFileSystemURL: function(Catalog, callback) {
			callback && callback({
				removeRecursively: function(cb) {
					cb && cb();
				}
			});
		},
		convertLocalFileSystemURL: function() {

		}
	};
	plus.io = plus.io || io;

	var downloader = {
		createDownload: function() {
			return {
				start: function() {

				}
			}
		}
	};
	plus.downloader = plus.downloader || downloader;

	var net = {
		XMLHttpRequest: window.XMLHttpRequest
	};
	plus.net = plus.net || net;
	//  plus.nativeUI.toast=function(){
	//  	$("body").append('<div class="loadingBox"></div>');
	//  }
	var getHeader = function(callback) {
		var header = localStorage.getItem("header");
		if (!header) {
			$.get("/wx/html/header.html", function(html) {
				localStorage.setItem("header", html);
				callback(html);
			});
		} else {
			callback(header);
		}
	};
	var getFooter = function(callback) {
		var header = localStorage.getItem("footer");
		if (!header) {
			$.get("/wx/html/footer.html", function(html) {
				localStorage.setItem("footer", html);
				callback(html);
			});
		} else {
			callback(header);
		}
	};
	var initHeaderAndFooter = function(pageExtras) {

		var pathnamesplit = location.pathname.split("/");
		address = pathnamesplit[pathnamesplit.length - 1];

		var extras = pageExtras[address];
		// 头部
		getHeader(function(header) {
			$("body").prepend(header);

			if (extras.wType) {
				$(".z-HReturn").show();
				$(".header").append("<h2>" + extras.wName + "</h2>");

			} else {
				$(".z-HReturn").hide();
				if (extras.Address != "index.index.html") {
					$(".header").append("<h2>" + extras.wName + "</h2>");
					$(".fl").hide();
				} else {
					$(".header").append("<h2>全民抢拍</h2>");
				}
			}
			if(address == "user.html"){
				$('.m-settings').show();
			}else{
				$('.m-settings').hide();
			}
			// bindEvents
			$(".z-HReturn").on("click", function(e) {
				history.back();
			});
			$(".m-settings").on("click", function(e) {
				mui.openWindow({
					url: "IndexHead.html",
					id: "settings",
					extras: {
						Address: "settings.html",
						wType: 'back',
						wName: "设置",
					}
				});
			});
		});

		if (extras.wType) {
			return;
		}
		getFooter(function(footer) {
			$("body").append(footer);
			//导航点击事件
			mui('.mui-bar-tab').on('tap', 'li', function() {
				var Address = this.getAttribute('Address');
				var wName = this.getAttribute('title');
				var e = {
					Address: Address,
					wName: wName
				};
				mui.openWindow(Address, Address, {}, e);
			});

			// 切换状态栏
			$(".footerdi").find(".nav-item i").removeClass("cur");
			$(".footerdi").find(".nav-item span").removeClass("cur");
			$(".footerdi").find("[Address='" + extras.Address + "']").find(".nav-item i").addClass("cur");
			$(".footerdi").find("[Address='" + extras.Address + "']").find(".nav-item span").addClass("cur");
		});

	};
	// 真正执行的函数在这里，上面全是重定义mui方法
	if (!window.plus) {
		window.plus = plus;
	}
	// 根据localStorage 生成头部和底部
	var pageExtras = localStorage.getItem("pageExtras");
	if (pageExtras) {
		initHeaderAndFooter(JSON.parse(pageExtras));
	}
})(mui, window.plus || {});