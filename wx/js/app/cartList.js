mui.plusReady(function() {
		CartList();
});
function CartList() {
	mui.getJSON(Gobal.server_url + "/mobile/ajax/cartlist", function(res) {
		CList(res); 
		
	});
}
function CList(res) {
	var html = template('cartList', res);
	document.getElementById('cartBody').innerHTML = html;
	//console.log(html)
}



