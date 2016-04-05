mui.plusReady(function() {
	getGoodsList();
});

/*显示用户信息*/
function getGoodsList() {
	var user = localStorage.getItem("$uesr");
	if (user) {
		user = JSON.parse(user);
		console.log(user.key)
		console.log(user.uid);
		mui.post(Gobal.server_url + "/mobile/ajax/huode/", {
			key: user.key,
			uid: user.uid
		}, function(data) {
			console.log(JSON.stringify(data))
			if (data.status == 1) {
				console.log("获取用户信息成功：" + JSON.stringify(data))
				var html = template('Getgoods', data);
				document.getElementById("divGetGoods").innerHTML = html;
			} else if (data.status == 0) {
				document.getElementById('ulConsumption').style.display = 'block';
				console.log("获取用户信息失败：" + JSON.stringify(data))
			}
		}, 'json');
		mui.post(Gobal.server_url + "/mobile/ajax/useraddr/", {
			key: user.key,
			uid: user.uid
		}, function(data) {
			console.log(JSON.stringify(data));
			var selected = true;
			if (data.status == 1) {
				for (value in data.useraddrs) {
					if (data.useraddrs[value].default == "Y") {
						selected = false;
					}
				}
				if (selected) {
					$(".shouhuodz").show();
				}
			} else {
				$(".shouhuodz").show();
			}
		}, 'json');
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