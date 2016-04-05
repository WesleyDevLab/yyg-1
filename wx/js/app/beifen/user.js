mui.plusReady(function() {
	console.log(plus.webview.currentWebview().id)
	suermingx();
	user();
	//plus.nativeUI.closeWaiting();
});

function user() {
	var userInfo = localStorage.getItem("$uesr");
	//plus.nativeUI.toast(userInfo);
	console.log(userInfo)
	if (userInfo) {
		//plus.nativeUI.toast(userInfo.ID);
		refreshWeb();
	} else {
		$("#wLogin").show();
		$("#Login").hide();
		$(".member .left").off();
		$(".member .left").on("click", function() {
			plus.nativeUI.toast("还未登录，请登录。")
		});
		$("#loginbut").on("click", function() {
			mui.openWindow({
				url: 'user.login.html',
				id: 'login.html',
				show: {
					aniShow: 'pop-in',
				},
				extras: {
					Address: "user.login.html",
					wType: 'back',
					wName: '登录',
					winID: plus.webview.currentWebview().id
				}
			});
		})

	}
}
/*显示用户信息*/
function refreshWeb() {
	var user = localStorage.getItem("$uesr");
	if (user) {
		user = JSON.parse(user);
		mui.post(Gobal.server_url + "/mobile/ajax/userxinxi/", {
			key: user.key,
			uid: user.uid
		}, function(data) {
			if (data.status == 1) {
				$("#wLogin").hide();
				$("#Login").show();
				localStorage.setItem("score", data.userxinxi.score);
				localStorage.setItem("money", data.userxinxi.money);
				console.log("用户信息成功：" + JSON.stringify(data))
				var html = template('Login_ok', data);
				document.getElementById("Login").innerHTML = html;
				suermingx();
				Gobal.skipUserHome();
			} else {
				console.log("获取用户信息失败：" + JSON.stringify(data))
				$("#loginbut").off();
				$("#loginbut").on("click", function() {
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
				})
				$(".member .left").off();
				$(".member .left").on("click", function() {
					plus.nativeUI.toast("还未登录，请登录。", {
						duration: "short"
					})
				});
			}
		}, 'json');
	} else {
		$(".member .left").off();
		$(".member .left").on("click", function() {
			plus.nativeUI.toast("还未登录，请登录。", {
				duration: "short"
			})
		});
	}
}

//跳转链接
function suermingx() {
	$(".member .left").off();
	$(".member .left").on("click", function() {
		var Address = this.getAttribute("id");
		var title = this.getAttribute("title");
		if (Address) {
			mui.openWindow({
				url: "IndexHead.html",
				id: "my-order.html",
				aniShow: 'pop-in',
				extras: {
					Address: Address,
					wType: 'back',
					wName: title,
					winID: plus.webview.currentWebview().id
				}
			});
		}
	});
	$("#chongzhi").off();
	$("#chongzhi").on("click", function() {
		mui.openWindow({
			url: "IndexHead.html",
			id: "set.html",
			extras: {
				Address: "user.recharge.php",
				wType: 'back',
				wName: "充值",
				winIDw:"b"
			}
		});
	});
}
//更换头像
function changeHeadImage() {
	var bts = [{
		title: "拍照"
	}, {
		title: "从手机相册中选择"
	}];
	plus.nativeUI.actionSheet({
			title: "请选择文件来源",
			cancel: "取消",
			buttons: bts
		},
		function(e) {
			if (e.index > 0) {
				if (bts[e.index - 1].title == "拍照") {
					getImage();
				} else if (bts[e.index - 1].title == "从手机相册中选择") {
					galleryImg();
				}
			} else {
				//点击取消
			}
		}
	);
}
//拍照
function getImage() {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			var imageURL = entry.toLocalURL();
			printscreenHeadImage(imageURL);
		}, function(e) {
			mui.toast("读取拍照文件错误：" + e.message);
		});
	}, function(e) {}, {
		filename: "_doc/camera/",
		index: 1
	});
}
//相册选取
function galleryImg() {
	// 从相册中选择图片
	plus.gallery.pick(function(path) {
		if (0 != path.indexOf("file://")) {
			path = "file://" + path;
		}
		printscreenHeadImage(path);
	}, function(e) {}, {
		filter: "image"
	});
}

function changeMyHeadImage() {
	plus.nativeUI.showWaiting();
	var stateText = localStorage.getItem('$name') || '';
	state = JSON.parse(stateText);
	UsreKey = state.UsreKey;
	$.ajax({
		type: 'post',
		url: Gobal.server_url + "/mobile/index.php?act=member_index",
		data: {
			key: UsreKey
		},
		dataType: 'json',
		timeout: 10000,
		success: function(result) {
			console.log(JSON.stringify(result));
			localStorage.setItem("$userInfo", JSON.stringify(result));
			$("#imgId").attr("src", result.datas.member_info.avator);
			var member = plus.webview.getWebviewById('html/member/member.html');
			member.evalJS("refreshWeb()");
			plus.nativeUI.closeWaiting();
			return;
		},
		error: function() {
			plus.nativeUI.toast('网络错误');
			plus.nativeUI.closeWaiting();
		}
	});
}

function changeUserName(userName) {
	userNameDivId.innerHTML = userName;
}

function printscreenHeadImage(path) {
	mui.openWindow({
		url: 'change_photo.html',
		id: 'change_photoid',
		show: {
			autoShow: true,
			aniShow: "slide-in-bottom"
		},
		extras: {
			headImageName: path
		}
	})
}
var uploadImgeUrl = "/interface/user/info/photosave.aspx?time=" + (new Date()).valueOf();
// 上传文件
function upload(imageUrl) {
	if (files.length <= 0) {
		mui.toast("没有添加上传文件！");
		return;
	}
	var wt = plus.nativeUI.showWaiting();
	var netWorkingType = plus.networkinfo.getCurrentType();
	if (netWorkingType == 0 || netWorkingType == 1 || netWorkingType == 2) {
		wt.close();
		mui.toast("网络未连接,请设置网络");
	}
	var task = plus.uploader.createUpload(_serverURL + uploadImgeUrl, {
			method: "POST"
		},
		function(t, status) { //上传完成
			var data = JSON.parse(t.responseText);
			if (status == 200 && data.errnumber == 0) {
				imgId.src = imageUrl;
				mui.init({
					beforeback: function() {
						//获得列表界面的webview
						var list = plus.webview.getWebviewById('user/default.html');
						//触发列表界面的自定义事件（getoptions）,从而进行数据刷新
						list.evalJS("changeHeadImage('" + imageUrl + "')");
						//返回true，继续页面关闭逻辑
						return true;
					}
				});
				wt.close();
				plus.nativeUI.toast("修改头像成功", {
					duration: "short"
				});
			} else {
				mui.toast("上传失败");
				wt.close();
			}
		}
	);
	task.addData("token", localStorage.getItem("token"));
	task.addData("userid", localStorage.getItem("userid"));
	for (var i = 0; i < files.length; i++) {
		var f = files[i];
		task.addFile(f.fphoto, {
			key: f.username
		});
	}
	task.start();
}
var profileURL = "/interface/user/info/my.aspx?time=" + (new Date()).valueOf();
//var server = jsfun.getServerURL("/interface/user/info/photosave.aspx");
var files = [];
var imgPath;
mui.init();
if (window.plus) {
	//plusReady();
} else {
	//document.addEventListener('plusready', plusReady, false);
}

function plusReady() {
	if (plus.os.name == 'iOS') {
		myaccount_header.classList.add('ios_only');
		my_myaccount.style.marginTop = "64px";
	}
	getoptions();
}
window.addEventListener('cmh', function(event) {
	//获得事件参数
	mui.back();
	console.log("cmh event");
	var id = event.detail.id;
	console.log(id);
	//根据id向服务器请求新闻详情
});

function getoptions() {
	var params = {};
	params.url = jsfun.getServerURL(profileURL);
	params.cbcall = function(msg, data) {
		if (msg == 1 && data.errnumber == 0) {
			var obj = data.data;
			if (obj.fname == null) {
				var myname = obj.fmobile;
				if (myname == undefined) {
					myname = "";
				}
				userNameDivId.innerHTML = jsfun.CStr(myname);
			} else {
				userNameDivId.innerHTML = jsfun.CStr(obj.fname);
			}
			imgId.onerror = fnerror;
			imgPath = obj.photourl;
			imgId.src = jsfun.getServerURL(obj.photourl);
			localStorage.setItem("loginPhone", obj.mobile);
			localStorage.setItem("username", obj.fname);
			//获得列表界面的webview
			var list = plus.webview.getWebviewById('user/default.html');
			//触发列表界面的自定义事件（getoptions）,从而进行数据刷新
			list.evalJS("changeHeadImage('" + imgPath + "')");
		}
	}
	jsAjax.ajax(params);
}

function fnerror() {
	var obj = document.getElementById(this.id);
	obj.src = "../style/img/user_guest.png";
}