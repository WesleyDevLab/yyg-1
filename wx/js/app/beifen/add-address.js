var sheng, shi, xian;
mui.plusReady(function() {
	cityList();
	var y = /[1-9]\d{5}(?!\d)/;
	var m = /^1[34578]\d{9}$/;
	var userInfo = localStorage.getItem("$user") || "";

	$("#addres").on("tap", function() {
		var jiedao = document.getElementById("jiedao").value;
		var yzbm = document.getElementById("yzbm").value;
		var shouhuoren = document.getElementById("shouhuoren").value;
		var mobile = document.getElementById("mobile").value;
		if (jiedao == null || jiedao == "") {
			mui.toast("街道地址不能为空哦");
		} else if (yzbm == null || yzbm == "") {
			mui.toast("邮政编码不能为空哦");
		} else if (!y.test(yzbm)) {
			mui.toast("请输入正确的邮政编码");
			document.getElementById("yzbm").value = "";
		} else if (shouhuoren == null || shouhuoren == "") {
			mui.toast("收货人不能为空哦");
		} else if (mobile == null || mobile == "") {
			mui.toast("手机号码不能为空哦");
		} else if (!m.test(mobile)) {
			mui.toast("请输入合法的手机号码");
			document.getElementById("mobile").value = "";
		} else {
			address(sheng, shi, xian, jiedao, yzbm, shouhuoren, mobile);
		}

	});
	
});
/*添加收货地址*/
function address(sheng, shi, xian, jiedao, yzbm, shouhuoren, mobile) {
	var user = localStorage.getItem("$uesr");
	console.log(user)
	if (user) {
		user = JSON.parse(user);
		mui.post(Gobal.server_url + "/mobile/ajax/addrinsert/", {
			key: user.key,
			uid: user.uid,
			sheng: sheng,
			shi: shi,
			xian: xian,
			jiedao: jiedao,
			youbian: yzbm,
			shouhuoren: shouhuoren,
			mobile: mobile
		}, function(data) {
			if (data.status == 1) {
				console.log("添加收货地址成功：" + JSON.stringify(data))
				plus.webview.getWebviewById("add-address.html").close();
				plus.webview.getWebviewById("indexcontrol-address.html").evalJS("getAddress()");
			} else {
				console.log("添加收货地址失败：" + JSON.stringify(data))
			}
		}, 'json');
		/*清空内容*/
		document.getElementById("cityResult3").innerText = "";
		document.getElementById("jiedao").value = "";
		document.getElementById("yzbm").value = "";
		document.getElementById("shouhuoren").value = "";
		document.getElementById("mobile").value = "";
	}
}

function cityList() {
	var cityPicker3 = new mui.PopPicker({
		layer: 3
	});
	cityPicker3.setData(cityData3);
	var showCityPickerButton = document.getElementById('showCityPicker3');
	var cityResult3 = document.getElementById('cityResult3');
	showCityPickerButton.addEventListener('click', function(event) {
		cityPicker3.show(function(items) {
			sheng = items[0].text;
			shi = items[1].text;
			if (!items[2].text == true) {
				xian = items[2].text = "";
			} else {
				xian = items[2].text;
			}
			cityResult3.innerText = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);
}