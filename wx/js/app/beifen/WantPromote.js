var shareTitle = "全民抢拍"; //分享名称
var shareUrl = ""; //分享链接
var shareImgUrl = Gobal.server_url_no + "/wx/logo.png"; //分享logo
var shareCount = "全民抢拍，惊喜不断"; //分享内容
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	winId = self.winID;
	var userInfo = localStorage.getItem("$user") || "";
	geterweima();
	fenxiang();
});

/*获取二维码*/
function geterweima() {
	var user = localStorage.getItem("$uesr");
	console.log(user)
	if (user) {
		user = JSON.parse(user);
		mui.post(Gobal.server_url + "/mobile/ajax/dimensional/", {
			key: user.key,
			uid: user.uid
		}, function(data) {
			if (data.status == 1) {
				console.log("获取二维码：" + JSON.stringify(data))
				shareUrl = data.url;
				$(".erweima").attr("src", data.erweima);
			} else {
				console.log("获取二维码失败：" + JSON.stringify(data))
			}
		}, 'json');

	}
}

function fenxiang() {
	sharefun();
	$.ajax({
		type: "post",
		url: Gobal.server_url_no + '/mobile/jsapi/getSign',
		data: {
			url: location.href
		},
		dataType: "json",
		timeout: 10000,
		success: function(result) {
			console.log(JSON.stringify(result))
			wx.config({
				debug: false,
				appId: result.appId,
				timestamp: result.timestamp,
				nonceStr: result.nonceStr,
				signature: result.signature,
				jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'scanQRCode'
				]
			});
			wx.onMenuShareTimeline({ //分享到朋友圈
				title: shareTitle, // 分享标题
				link: shareUrl, // 分享链接
				imgUrl: shareImgUrl, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareAppMessage({//分享给朋友
				title: shareTitle, // 分享标题
				desc: shareCount, // 分享描述
				link: shareUrl, // 分享链接
				imgUrl: shareImgUrl, // 分享图标
				type: 'link', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareQQ({//分享到qq
				title: shareTitle, // 分享标题
				desc: shareCount, // 分享描述
				link: shareUrl, // 分享链接
				imgUrl: shareImgUrl, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareWeibo({//分享到腾讯微博
				title: shareTitle, // 分享标题
				desc: shareCount, // 分享描述
				link: shareUrl, // 分享链接
				imgUrl: shareImgUrl, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
		},
		error: function(xhr, type, errorThrown) {
			console.log()
		}
	});
}

function sharefun() {
	$("#recommended").on('tap', function() {
		is_weixin();
	});
}

function is_weixin() {
	var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight; //兼容IOS，不需要的可以去掉
	var tip = document.getElementById('weixin-tip');
	var close = document.getElementById('close');
	tip.style.height = winHeight + 'px'; //兼容IOS弹窗整屏
	tip.style.display = 'block';
	close.onclick = function() {
		tip.style.display = 'none';
	}
}