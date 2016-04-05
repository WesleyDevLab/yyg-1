var home_share_info = {
	"title": "缤果水果",
	"img_url": "http://bingoimages.oss-cn-shenzhen.aliyuncs.com/logo.jpg?v=2",
	"content": "缤果水果，世界级鲜果，两小时到家。",
	"url": "http://m2.bingofresh.com/v3.6"
};


$(function() {
	console.log(Gobal.server_url + '/mobile/jsapi/getSign/url=' + location.href)
	$.ajax({
		type: "get",
		url: Gobal.server_url_no + '/mobile/jsapi/getSign',
		data {
			url: location.href
		}
		dataType: "json",
		timeout: 10000,
		success: function(result) {
			console.log(JSON.stringify(result))
				//sharefun(result);
		},
		error: function(xhr, type, errorThrown) {

		}
	});
});
//微信分享
function sharefun(result) {
	wx.config({
		debug: false,
		appId: 'wx6e2d5c3be2d95b87',
		timestamp: 1447306481,
		nonceStr: 'TTM3iknSxlF70NiM',
		signature: 'c83dcb9f1e92073e26f7db772aebe6e8f6c78c1b',
		jsApiList: [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'scanQRCode'
		]
	});
	wx.onMenuShareTimeline({
		title: '', // 分享标题
		link: '', // 分享链接
		imgUrl: '', // 分享图标
		success: function() {
			// 用户确认分享后执行的回调函数
		},
		cancel: function() {
			// 用户取消分享后执行的回调函数
		}
	});
}