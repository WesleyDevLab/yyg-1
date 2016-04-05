var title,content,imagelist;
mui.plusReady(function() {
		console.log(plus.webview.currentWebview().id)
		var self=plus.webview.currentWebview();
		var user = localStorage.getItem("$uesr");
		user = JSON.parse(user);
	
	$('input[name="sd_shopid"]').val(self.sd_shopid);
	$('input[name="sd_qishu"]').val(self.sd_qishu);
	$('input[name="sd_userid"]').val(user.uid);
	$('input[name="key"]').val(user.key);
	//alert($('input[name="sd_shopid"]').val()+"  & "+$('input[name="sd_qishu"]').val()+"  & "+$('input[name="sd_userid"]').val())
});


