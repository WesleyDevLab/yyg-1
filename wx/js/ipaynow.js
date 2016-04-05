document.addEventListener( "plusready",  function()
{
    var _BARCODE = 'IPayNow',
		B = window.plus.bridge;
    var ipaynow = 
    {
    	request : function (orderId, payData, successCallback, errorCallback ) 
		{
			var success = typeof successCallback !== 'function' ? null : function(args) 
			{
				successCallback(args);
			},
			fail = typeof errorCallback !== 'function' ? null : function(code) 
			{
				errorCallback(code);
			};
			callbackID = B.callbackId(success, fail);

			return B.exec(_BARCODE, "request", [callbackID, orderId, payData]);
		}
    };
    window.plus.ipaynow = ipaynow;
}, true );