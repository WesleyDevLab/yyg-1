<?php
require_once (dirname(dirname(dirname(__DIR__))) . '/wxpay/lib/JsApiPay.class.php');
require_once (dirname(dirname(dirname(__DIR__))) . '/wxpay/lib/jssdk.php');
require_once (dirname(dirname(dirname(__DIR__))) . '/wxpay/config/config.ini.php');
$tools = new JsApiPay($wxpay_config);
$openId = $tools -> GetOpenid();

$jssdk = new JSSDK($wxpay_config['appid'], $wxpay_config['appsecret']);
$signPackage = $jssdk -> GetSignPackage();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>
			帐户充值
		</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no, maximum-scale=1.0" />
		<link href="../../css/app/comm.css" rel="stylesheet" type="text/css" />
		<link href="../../css/app/member.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="../../css/home/index.css" />
		<script>var $openId = "<?php echo $openId ?>";</script>
	</head>
	<body style="background: #f4f4f4;">
		<div class="mui-content">
			<div class="mui-scroll">
				<div class="h5-1yyg-v1" id="loadingPicBlock" style="padding-top: 45px;">
					<div class="g-Total gray9">
						您的当前余额：
						<span class="orange arial" id="money">
						</span>元
					</div>
					<section class="clearfix g-member">
						<div class="g-Recharge">
							<ul id="ulOption">
								<li money="10">
									<a class="z-sel">
										10元
										<s>
										</s>
									</a>
								</li>
								<li money="20">
									<a>
										20元
										<s>
										</s>
									</a>
								</li>
								<li money="30">
									<a>
										30元
										<s>
										</s>
									</a>
								</li>
								<li money="100">
									<a>
										100元
										<s>
										</s>
									</a>
								</li>
								<li money="200">
									<a>
										200元
										<s>
										</s>
									</a>
								</li>
								<li>
									<b>
										<input type="text" class="z-init" placeholder="输入金额" maxlength="8" id="jine"/>
										<s>
										</s>
									</b>
								</li>
							</ul>
						</div>
						<article class="clearfix mt10 m-round g-pay-ment g-bank-ct">
							<ul id="ulBankList">
								<li class="gray6">
									选择网银充值<em class="orange" id="mm">10.00</em>元
								</li>
								<li class="gray9" urm="CMBCHINA-WAP">
									<i class="z-bank-Roundsel">
										<s>
										</s>
									</i>微信支付
								</li>
								<!--<li class="gray9" urm="ICBC-WAP"><i class="z-bank-Round"><s></s></i>银联支付</li>-->
							</ul>
						</article>
						<div class="mt10 f-Recharge-btn">
							<a id="btnSubmit" class="orgBtn">
								确认充值
							</a>
						</div>
					</section>
				</div>
			</div>
		</div>
		<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js "></script>
		<script>
			wx.config({
				debug: false,
				appId: '<?php echo $signPackage["appId"];?>',
				timestamp: <?php echo $signPackage["timestamp"];?>,
				nonceStr: '<?php echo $signPackage["nonceStr"];?>',
				signature: '<?php echo $signPackage["signature"];?>',
				jsApiList: ["chooseWXPay"]
			});
		</script>
		<script type="text/javascript" src="../../js/mui.js"></script>
		<script type="text/javascript" src="../../js/jquery.min.js"></script>
		<script type="text/javascript" src="../../js/config.js"></script>
		<script type="text/javascript" src="../../js/mui-weixin.js"></script>
		<script type="text/javascript" src="../../js/ipaynow.js"></script>
		<script type="text/javascript" src="../../js/app/beifen/recharge.js"></script>
	</body>
</html>