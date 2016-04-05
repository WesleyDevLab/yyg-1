mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var data = self.data.shangqihuojiang.content;
	if (data) {
		console.log(data)
		$("#divRecordList").html(data);
		var obj = $("#divRecordList img");
		for (i = 0; i < obj.length; i++) {
			obj.eq(i).css("width","100%");
			//obj.eq(i).attr("src", obj.eq(i).attr("data-src"));
		}
		console.log($("#divRecordList").html())
	} else {
		$("#divRecordList").html('<div class="haveNot z-minheight"><s></s><p>暂无图文详情！</p></div>');
	}
});