mui.plusReady(function() {
	function xmp() {
		mui(".mui-table-view").off();
		mui(".mui-table-view").on("tap", "li", function() {
			var Address = this.getAttribute("id");
			var title=this.getAttribute("title");
			if (Address) {
				mui.openWindow({
					url: "IndexHead.html",
					id: "index.lottery.html",
					extras: {
						Address: Address,
						wType: 'back',
						wName: title
					}
				});
			}
		});
	}
	xmp();
})