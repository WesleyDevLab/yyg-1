var score;
mui.plusReady(function() {
	console.log(plus.webview.currentWebview().id)
	//var self=plus.webview.currentWebview();
	var user =localStorage.getItem('$uesr');
	score=localStorage.getItem("score");
	document.getElementById("jinbiNum").value=score;
	$("#queren").on('tap',function(){
		var mon=$("#querenmima").val();
		var money=parseInt(mon);
		if(money%100==0){
			duihuan(money);
		}else{
			mui.toast("输入的积分不是100的倍数哦！");
			$("#querenmima").val("");
		}
		
	});
	
});

//调用接口查数据，带条件
function duihuan(money) {
	var user = localStorage.getItem("$uesr");
	if(user){
		user = JSON.parse(user);
		console.log(user.uid);
		console.log(user.key);
		mui.post(Gobal.server_url + "/mobile/ajax/goldexchange", {
			uid:user.uid,
			key:user.key,
			money:money
		}, function(data) {
			console.log(JSON.stringify(data))
			if(data.status==1){
				console.log(JSON.stringify(data));
				mui.toast("兑换金币成功");
				plus.webview.getWebviewById("indexuser.index.html").evalJS("refreshWeb()");	
				plus.webview.getWebviewById("indexgold-detail.html").evalJS("refreshWeb()");
				mui.back();
			}else if(data.status==0){
				mui.toast("金币兑换达不到兑换条件");
			}else if(data.status==-1){
				mui.toast("兑换金币额度不足账户余额");
			}
				
	},'json');
				
	}
}
