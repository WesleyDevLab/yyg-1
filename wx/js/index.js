//mui初始化
mui.init({
	swipeBack: false,
	statusBarBackground: '#d63049',
	gestureConfig: {
		doubletap: true
	}
}); //设置默认加载页面
var subpages = ['index.index.html', 'new_announce.html', 'discover.html', 'cart.cartlist.html', 'user.html'];
var subpagesName = ['首页', '最新揭晓', '发现', '购物车', '我'];
var subpage_style = {
	top: '0px',
	bottom: '50px'
};
var aniShow = {};

//mui初始化

//创建子页面，首个选项卡页面显示，其它均隐藏；
mui.plusReady(function() {
	//延迟的原因：优先打开启动导航页面，避免资源争夺
	setTimeout(function() {
		//初始化模板
		loadWin(0);
	}, 200);
	tableSwitch();
});



//底部导航切换方法
function tableSwitch() {
	var btnArry = new Array();
	btnArry[0] = true;
	//当前激活选项
	var activeTab = subpages[0];
	//导航点击事件
	mui('.mui-bar-tab').on('tap', 'li', function() {
		var targetTab = this.getAttribute('Address');
		console.log(targetTab+"  "+activeTab)
		if (targetTab == activeTab) {
			return;
		}
		$('.mui-bar-tab i').removeClass("cur");
		$(this).children("a").children("i").addClass("cur");
		//判断是否加载页面
		if (btnArry[$(this).index()]) {
			console.log("已加載");
			showTable();
		} else {
			console.log("未加载");
			plus.nativeUI.showWaiting("加载中...", {
				background: "rgba(0,0,0,0.5)"
			});
			loadWin($(this).index());
			showTable();
			btnArry[$(this).index()] = true;
		}

		//显示目标选项卡
		function showTable() {
			if (mui.os.ios || aniShow[targetTab]) {
				plus.webview.show(targetTab);
			} else {
				var temp = {};
				temp[targetTab] = "true";
				console.log(targetTab)
				mui.extend(aniShow, temp);
				plus.webview.show(targetTab);
			}
			var targetView = plus.webview.getWebviewById(targetTab);
			//隐藏当前;
			plus.webview.hide(activeTab);
			//更改当前活跃的选项卡
			activeTab = targetTab;
			
		}
	});
	//自定义事件，模拟点击“首页选项卡”
	document.addEventListener('gohome', function() {
		var defaultTab = document.getElementById("defaultTab");
		//模拟首页点击
		mui.trigger(defaultTab, 'tap');
		//切换选项卡高亮
		var current = document.querySelector(".tab_b>.nav-item.mui-active");
		if (defaultTab !== current) {
			current.classList.remove('mui-active');
			defaultTab.classList.add('mui-active');
		}
	});
}

function loadWin(index) {
	var self = plus.webview.currentWebview();
	//var sub = plus.webview.create(subpages[index], subpages[index], subpage_style);
	subpage_extras = {
		Address: subpages[index],
		wName: subpagesName[index]
	}
	console.log("ID:"+subpages[index]);
	var sub = plus.webview.create("html/dynamic/IndexHead.html", subpages[index], subpage_style, subpage_extras);
	self.append(sub);
	setTimeout(function() {
		plus.nativeUI.closeWaiting();
	}, 200);
}
function Simulation(id) {
	var domObj = document.getElementById(id);
	//模拟点击
	mui.trigger(domObj, 'tap');
}