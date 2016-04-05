<?php
require_once(dirname(dirname(dirname(__DIR__))).'/wxpay/lib/JsApiPay.class.php');
require_once(dirname(dirname(dirname(__DIR__))).'/wxpay/lib/jssdk.php');
require_once(dirname(dirname(dirname(__DIR__))).'/wxpay/config/config.ini.php');
$tools = new JsApiPay($wxpay_config);
$openId = $tools->GetOpenid();

$jssdk = new JSSDK($wxpay_config['appid'], $wxpay_config['appsecret']);
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>结算支付 </title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no, maximum-scale=1.0" />
		<link href="../../css/app/comm.css" rel="stylesheet" type="text/css" />
		<link href="../../css/app/cartList.css" rel="stylesheet" type="text/css" />
		<style>
			.mui-waiting{background: url(../../img/slide_loading.gif); background-size: 230px auto; width: 70px;height: 70px;opacity:0.7;position: fixed;top:50%;left:50%;margin-top: -30px;margin-left:-30px;z-index: 222;background-position: -80px -50px;border-radius:10px}
		</style>
		<script>
			var $openId="<?php echo $openId ?>";
		</script>
	</head>

	<body>
		<div id="refreshContainer" class="mui-content">
			<div class="mui-scroll">
				<div id="PlayBox" style="margin-top: 45px;">
					<input name="hidShopMoney" type="hidden" id="hidShopMoney" />
					<input name="hidBalance" type="hidden" id="hidBalance" />
					<input name="hidPoints" type="hidden" id="hidPoints" />
					<input name="shopnum" type="hidden" id="shopnum" />
					<input name="pointsbl" type="hidden" id="pointsbl" />
					<section class="clearfix g-pay-lst" id="shopBody">
						<!--商品信息-->
					</section>
					<!--红包选择-->
					<div id="redEnveBox"></div>
					<section class="clearfix g-Cart" id="userBox">
					</section>
				</div>
			</div>
		</div>
		<script type="text/template" id="shopInfo">
			<ul>
				{{each shoppingList as value i}}
				<li>
					<a addreass="#" class="gray6">(第{{value.qishu}}期){{value.title}}</a>
					<span><em class="orange arial">{{Price(value.id)}}</em>元</span>
				</li>
				{{/each}}
			</ul>
			<p class="g-pay-Total gray9">合计：<span class="orange" id="mengy">{{total()}}</span> 元</p>
		</script>
		<script type="text/template" id="redEnvelope">
			<section class="clearfix g-Cart">
				<article class="clearfix m-round g-pay-ment">
					{{if hongbao.length > 0 }}
					<ul>
						<li class="select-packet" id="Choice"><span>红包选择</span><strong></strong><s class="z-arrow"></s></li>
					</ul>
					{{else}}
					<div class="NoRed">您没有红包</div>
					{{/if}}
				</article>
			</section>
			{{if hongbao.length > 0 }}
			<section class="clearfix g-Cart">
				<article class="clearfix m-round g-pay-ment lis">
					<ul id="redList" style="display: none;">
						{{each hongbao as value i}}
						<li class="price-three" money="{{value.money}}" id="{{value.id}}" limit="{{value.limitmoney}}">
							{{value.money}}元
						</li>
						{{/each}}
						<li class="price-three" money=0 limit=10 value="0">不使用红包</li>
					</ul>
				</article>
			</section>
			{{/if}}

		</script>
		<script type="text/template" id="userInfo">
			<article class="clearfix m-round g-pay-ment">
				<ul id="ulPayway">
					{{if userxinxi.money != 0}}
					<li class="gray6 z-pay-ff z-pay-grayC"><i sel="0" class="z-pay-mentDis" id="spPoints"></i><span>账户余额：{{userxinxi.money}}元</span></li>
					{{else}}
					<li class="gray6 z-pay-ye">
						<a class="rechange">去充值</a>
						<span>您的余额不足（账户余额：0.00元）</span>
					</li>
					{{/if}}
				</ul>
			</article>
			<article id="bankList" class="clearfix mt10 m-round g-pay-ment g-bank-ct">
				<ul id="playMode">
					<li class="gray6">
						<!--<s class="z-arrow"></s>-->选择<strong id="playname">微信支付</strong>支付<span id="playMeny">{{zongjia()}}</span></li>
					<li class="gray9" umb='CMBCHINA' name="微信支付"><i class="z-bank-Roundsel"><s></s></i>微信支付</li>
					<!--<li class="gray9" umb='ICBC' name="银联"><i class="z-bank-Round"><s></s></i>银联支付</li>-->
				</ul>
			</article>
			<div class="g-Total-bt">
				<a id="btnPay" class="orgBtn">确认支付</a>
			</div>
		</script>

		<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js "></script>
		<script>
			/*
			 * 注意：
			 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
			 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
			 * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
			 *
			 * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
			 * 邮箱地址：weixin-open@qq.com
			 * 邮件主题：【微信JS-SDK反馈】具体问题
			 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
			 */
			wx.config({
				debug: false,
				appId: '<?php echo $signPackage["appId"];?>',
				timestamp: <?php echo $signPackage["timestamp"];?>,
				nonceStr: '<?php echo $signPackage["nonceStr"];?>',
				signature: '<?php echo $signPackage["signature"];?>',
				jsApiList: [
					"chooseWXPay"
					]
			});
		</script>


		<script type="text/javascript" src="../../js/config.js"></script>
		<script type="text/javascript" src="../../js/template.js"></script>
		<script type="text/javascript" src="../../js/mui.js"></script>
		<script type="text/javascript" src="../../js/jquery.min.js"></script>
		<script type="text/javascript" src="../../js/mui-weixin.js"></script>

		<script type="text/javascript" src="../../js/global.js"></script>
		<script type="text/javascript" src="../../js/ipaynow.js"></script>
		<script type="text/javascript" src="../../js/app/pageDialog.js"></script>
		<script type="text/javascript" src="../../js/app/PaymentFun.js"></script>
	</body>

</html>