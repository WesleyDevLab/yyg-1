mui.plusReady(function() {
	console.log(plus.webview.currentWebview().id)
	var self = plus.webview.currentWebview();
	winId = self.winID;
	var userInfo = localStorage.getItem("$user") || "";
	//plus.nativeUI.toast(userInfo);

	function MyhBao() {
		mui("#myHongbao").off();
		mui("#myHongbao").on("tap", "li", function() {
			var Address = this.getAttribute("id");
			var title = this.getAttribute("title");
			if (Address) {
				mui.openWindow({
					url: "IndexHead.html",
					id: "hongbao.html",
					extras: {
						Address: Address,
						wType: 'back',
						wName: title
					}
				});
			}
		});
	}
	MyhBao();
});