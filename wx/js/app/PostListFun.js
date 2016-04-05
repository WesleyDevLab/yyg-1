var shopID = "";
mui.plusReady(function() {
	plus.nativeUI.showWaiting("加载中...");
	var self = plus.webview.currentWebview();
	console.log(JSON.stringify(self))
	var sd_id = self.sd_id;
	loadItem(sd_id);
//	updateSerivces();
});

function loadItem(sd_id) {
	console.log(Gobal.server_url + "/mobile/ajax/shaidanxiagxi/&sd_id=" + sd_id);
	$.ajax({
		type: "get",
		url: Gobal.server_url + "/mobile/ajax/shaidanxiagxi/&sd_id=" + sd_id,
		async: true,
		timeout: 10000,
		dataType: "json",
		success: function(res) {
			console.log(JSON.stringify(res.shaidancontent));
			if (res.status != 0) {
				Item(res, sd_id); //解析数据
			} else {
				plus.nativeUI.toast(res.message);
				document.getElementById("shaidan").innerHTML = '<div id="divNone" class="haveNot z-minheight"><s></s><p>获取数据失败，请检查网络！</p></div>';
			}
			plus.nativeUI.closeWaiting();
		},
		error: function(res) {
			plus.nativeUI.closeWaiting();
			plus.nativeUI.toast("获取数据失败，请检查网络");
			document.getElementById("shaidan").innerHTML = '<div id="divNone" class="haveNot z-minheight"><s></s><p>获取数据失败，请检查网络！</p></div>';
		}
	});
}

function Item(res, sd_id) {
	template.helper("time", function(time) {
		var obj = new Date(parseInt(time) * 1000);
		return obj.getFullYear() + "-" + obj.getMonth() + "-" + obj.getDay() + " " + obj.getHours() + ":" + obj.getMinutes() + ":" + obj.getSeconds();
	});
	template.helper("emHits", function(sd_id) {
		var boole = true;
		var emHits = localStorage.getItem("$emHits");
		console.log(emHits);
		if (emHits) {
			emHits = JSON.parse(emHits);
			for (value in emHits) {
				if (emHits[value] == sd_id) {
					boole = false;
				}
			}
		} else {
			boole = true;
		}
		return boole;
	});
	var html = template("shaidan", res);
	document.getElementById("shaidanBox").innerHTML = html;
	bundEvents(sd_id);
	btnPublish(sd_id);
}

function bundEvents(sd_id) {
	Gobal.skipUserHome(); //添加跳转到个人中心页面
	//显示评论框
	$("#btnComment").click(function() {
		var $uesr = localStorage.getItem("$uesr");
		if ($uesr) {
			$(".m-comment").show();
		} else {
			$.PageDialog.confirm("您还未登录是否登录？", function() {
				mui.openWindow({
					url: 'user.login.html',
					id: 'login.html',
					show: {
						aniShow: 'pop-in',
					},
					extras: {
						Address: "user.login.html",
						wType: 'back',
						winID: plus.webview.currentWebview().id
					}
				});
			}, "")
		}

	});
	//隐藏评论框
	$("#btnCancel").click(function() {
		//		document.getElementById("comment").innerText="";
		$(".m-comment").hide();
	});
	//显示分享列表
	$("#btnShare").click(function() {
		shareHref();
	});
	//显示点赞按钮
	$("#emHits").click(function() {
		var emHits = localStorage.getItem("$emHits");
		if (emHits) {
			emHits = JSON.parse(emHits);
			for (value in emHits) {
				if (emHits[value] == sd_id) {
					return false;
				}
			}
			emHits[sd_id] = sd_id;
			localStorage.setItem("$emHits", JSON.stringify(emHits));
		} else {
			var Hits = {};
			Hits[sd_id] = sd_id;
			localStorage.setItem("$emHits", JSON.stringify(Hits));
		}
		var obj = $(this);
		if (!obj.hasClass("z-btn-moodgray")) {
			$.ajax({
				type: "get",
				url: Gobal.server_url + "/mobile/ajax/zan/&sd_id=" + sd_id,
				async: true,
				timeout: 10000,
				dataType: "json",
				success: function(res) {
					console.log(JSON.stringify(res));
					if (res.status != 0) {
						plus.nativeUI.toast(res.message);
						obj.addClass("z-btn-moodgray").html("<s></s>已羡慕(" + res.dindan + ")");
					}
				},
				error: function(res) {
					plus.nativeUI.toast("点赞失败");
				}
			});
		}
	});
}

function btnPublish(sd_id) {
	$("#btnPublish").on("tap", function() {
		plus.nativeUI.showWaiting("正在提交评论...", {
			background: "rgba(0,0,0,0.4)"
		});
		var count = $("#comment").val().replace(/(^\s+)|(\s+$)/g, "");
		if (count == "") {
			plus.nativeUI.toast("评论内容不能为空！");
			plus.nativeUI.closeWaiting();
			return false;
		}
		var $uesr = JSON.parse(localStorage.getItem("$uesr"));
		console.log(localStorage.getItem("$uesr"));
		console.log(sd_id + "  " + "  " + $uesr.uid + "  " + count)
		$.ajax({
			type: "post",
			url: Gobal.server_url + "/mobile/ajax/shaidancommont",
			data: {
				sdhf_id: sd_id,
				sdhf_userid: $uesr.uid,
				content: count
			},
			async: true,
			timeout: 10000,
			dataType: "json",
			success: function(res) {
				console.log(JSON.stringify(res));
				if (res.status != 0 && res.status != -1) {
					$.ajax({
						type: "get",
						url: Gobal.server_url + "/mobile/ajax/shaidanxiagxi/&sd_id=" + sd_id,
						async: true,
						timeout: 10000,
						dataType: "json",
						success: function(res) {
							console.log(JSON.stringify(res));
							if (res.status != 0) {
								$(".m-comment").hide();//隐藏评论
								$("#comment").val('');//内容赋值为空
								template.helper("time", function(time) {
									var obj = new Date(parseInt(time) * 1000);
									console.log(JSON.stringify(new Date(parseInt(time) * 1000).toLocaleString()))
									return obj.getFullYear() + "-" + obj.getMonth() + "-" + obj.getDay() + " " + obj.getHours() + ":" + obj.get
inutes() + ":" + obj.getSeconds();
								});
								var html = template("comments", res);
								document.getElementById("commentsBox").innerHTML = html;
								Gobal.skipUserHome(); //添加跳转到个人中心页面
							}
						}
					});
				} else {
					if (res.status == -1) {
						plus.nativeUI.toast(res.message);
					} else {
						plus.nativeUI.toast("评论失败");
					}

				}
			},
			error: function(res) {
				plus.nativeUI.toast("评论失败");
			}
		});
		plus.nativeUI.closeWaiting();
	});
}

function refreshWeb() {}