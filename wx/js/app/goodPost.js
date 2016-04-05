mui.plusReady(function() {
				var slef = plus.webview.currentWebview();
				console.log(JSON.stringify(slef))
				var sid = slef.sid;
				$.ajax({
					type: "get",
					url: Gobal.server_url + "/mobile/ajax/shopshaidan/&sid=" + sid,
					async: true,
					timeout: 10000,
					dataType: "json",
					success: function(res) {
						console.log(JSON.stringify(res));
						if (res.status != 0) {
							template.helper("time", function(time) {
								var d = new Date(parseInt(time) * 1000);
								var s = '';
								s += d.getFullYear() + '-';
								s += (d.getMonth() + 1) + '-';
								s += d.getDate() + ' ';
								s += d.getHours() + ':';
								s += d.getMinutes();
								console.log(time)
								return s;
							});
							var html = template("comments", res);
							document.getElementById("commentsBox").innerHTML = html;
						} else {
//							plus.nativeUI.toast(res.message);
							document.getElementById("commentsBox").innerHTML = '<div class="haveNot z-minheight"><s></s><p>暂无晒单记录！</p></div>';
						}
						Gobal.skipUserHome(); //跳转到个人主页
						comm();
						plus.nativeUI.closeWaiting();
					},
					error: function(res) {
//						plus.nativeUI.toast("获取数据失败，请检查网络");
						document.getElementById("commentsBox").innerHTML = '<div class="haveNot z-minheight"><s></s><p>暂无晒单记录！</p></div>';
						plus.nativeUI.closeWaiting();
					}
				});
			});

			function comm() {
				$("#commentsBox .cSingleCon2").on("tap", function() {
					var sd_id = $(this).attr("sd_id");
					console.log(sd_id);
					mui.openWindow({
						url: "IndexHead.html",
						id: "detail" + sd_id,
						extras: {
							Address: "index.detail.html",
							wType: 'back',
							wName: "晒单详情",
							sd_id: sd_id
						}
					});
				});
			}