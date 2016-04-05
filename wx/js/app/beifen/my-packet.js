mui.plusReady(function() {
	var user =localStorage.getItem('$uesr');
	getHongbao();
});


//查询用户红包数量
function getHongbao() {
	var user = localStorage.getItem("$uesr");
	if(user){
		user = JSON.parse(user);
		mui.post(Gobal.server_url + "/mobile/ajax/hongbao", {
			uid:user.uid,
			key:user.key,
		}, function(data) {
			console.log(JSON.stringify(data))
			if(data.status==1){
				var html = template('hongbao', data);
				console.log(JSON.stringify(data));
				document.getElementById("hongbaoList").innerHTML = html;
			}else if(data.status==0){
				document.getElementById('ulConsumption').style.display = 'block';
			}
	},'json');
	}
	
}
	template.helper('$Time', function(nS) {
	var d = new Date(parseInt(nS) * 1000);
	var s = '';
	s += d.getFullYear() + '-';
	s += (d.getMonth() + 1) + '-';
	s += d.getDate() + ' ';
	s += d.getHours() + ':';
	s += d.getMinutes();
	return s;
	});

