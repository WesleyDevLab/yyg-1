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

function galleryImg() {
	// 从相册中选择图片
	plus.gallery.pick(function(path) {
		if (0 != path.indexOf("file://")) {
			path = "file://" + path;
		}
		//						if(plus.os.name == 'iOS') {
		printscreenHeadImage(path);
		//						} else {
		//							files.push({
		//								fphoto: path,
		//								username: "swdnjk"
		//							});
		//							upload(path);
		//						}
	}, function(e) {}, {
		filter: "image"
	});
}


function getImage() {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			var imageURL = entry.toLocalURL();
			//						if(plus.os.name == 'iOS') {
			printscreenHeadImage(imageURL);
			//						} else {
			//							files.push({
			//								fphoto: p,
			//								username: "swdnjk"
			//							});
			//							upload(imageURL);
			//						}
		}, function(e) {
			mui.toast("读取拍照文件错误：" + e.message);
		});
	}, function(e) {}, {
		filename: "_doc/camera/",
		index: 1
	});
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



mui(".m-member-nav").on("click", "#modifyHeadImg", function() {
	changeHeadImage();
});