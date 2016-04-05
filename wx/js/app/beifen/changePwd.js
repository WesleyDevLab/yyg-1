var oldpwd, newpwd,newpass,winId ="";
			mui.plusReady(function() {
				var self = plus.webview.currentWebview();
				var winId = self.winID;
				var user = localStorage.getItem("$uesr");
				console.log(plus.webview.currentWebview().id)
				$("#updatepwd").on('tap', function() {
					oldpwd = document.getElementById("oldpwd").value;
					newpwd = document.getElementById("newpwd").value;
					newpass = document.getElementById("newpass").value;
					if(oldpwd==null || oldpwd==""){
						mui.toast("旧密码不能为空");
					}else if(newpwd==null || newpwd==""){
						mui.toast("新密码不能为空");
					}else if(newpass==null || newpass==""){
						mui.toast("确认密码不能为空");
					}else if(newpwd==newpass){
						changPwd();
					}else{
						plus.nativeUI.toast("输入的新密码与确认密码不一致");
					}
					
				})
			});

			function changPwd() {
				var user = localStorage.getItem("$uesr");
				console.log(user);
				if (user) {
					user = JSON.parse(user);
					console.log(user.key);
					console.log(user.uid);
					mui.post(Gobal.server_url + "/mobile/ajax/updatepwd/", {
						key: user.key,
						uid: user.uid,
						oldpassword:oldpwd,
						password: newpwd
					}, function(data) {
						if (data.status == 1) {
							  plus.nativeUI.toast("修改密码成功");
							  plus.webview.getWebviewById("set.html").close();
							 
						} else {
							plus.nativeUI.toast("修改密码失败");
						}
					}, 'json');
						document.getElementById("oldpwd").value="";
						document.getElementById("newpwd").value="";
					 	document.getElementById("newpass").value="";
				}
			}