function indexTime(time, id, fun) {
	//	var time = resolveTime(time);
	//		var sss=$("#jiexiaoList .zxjs").length;
	//		var Secondsaa="";
	//		var SecondsId="";
	//		for (var i=0;i<sss;i++) {
	//			Secondsaa=$("#jiexiaoList .zxjs").eq(i).attr("seconds");
	//			SecondsId=$("#jiexiaoList .zxjs").eq(i).attr("id");
	//			setTimeout("countdown2("+Secondsaa+","+SecondsId+")",1000*i);
	//			
	//		}
	countdown2(time, id, fun);
}

function LatestTime() {

}

function resolveTime(time) { //判断时间是否开启倒计时
	var CurrentDate = Date.parse(new Date());
	var shopDate = parseInt(time) * 1000;
	console.log(CurrentDate + "  " + shopDate)
	if (CurrentDate - shopDate > 0) {
		var time = transdate(CurrentDate, shopDate);
		console.log(JSON.stringify(time));
		return time;
	}
}

function transdate(CurrentDate, shopDate) { //返回倒计时分钟数和秒数
	var CurrentDate = new Date(CurrentDate);
	var shopDate = new Date(shopDate);
	console.log(CurrentDate.getMinutes());
	var time = {};
	time.minutes = CurrentDate.getMinutes() - shopDate.getMinutes();
	time.seconds = CurrentDate.getSeconds() - shopDate.getSeconds();
	return time;
}

function countdown(timex) {
	var Second = Number(timex.seconds);
	var Minutes = Number(timex.minutes);
	var Millisecond = 10;
	this.id = "obj_" + new Date().getTime();
	eval(this.id + "=this");
	setTimeout(this.id + ".timea()", 100);
	this.timea = function() {
		if (Millisecond <= 1) {
			Millisecond = 10;
			if (Second <= 1) {
				Minutes = Minutes - 1;
				if (Minutes < 0) {
					Second = 0;
					Millisecond = 0;
					return
				} else {
					Second = 60;
				}
			} else {
				Second--;
			}
		} else {
			Millisecond--;
		}
		console.log(Minutes + ":" + Second + " " + Millisecond);
		setTimeout(this.id + ".timea()", 100);
	}
}

function countdown2(timex, id, fun) {
	var Second = timex - parseInt(timex / 60) * 60;
	var MinutesSecond = Second;
	var Minutes =parseInt(timex / 60);
	if(Second <=0){
		Minutes--;
	}
	var Millisecond = 99;
	var obj = $("#lotter-time-" + id).children("em");
	console.log(timex + " " + Second + " " + Minutes + " " + Millisecond + " " + id);
	this.id = "obj_" + new Date().getTime();
	eval(this.id + "=this");
	this.Minutes = function() {
		if (Minutes > 0) {
			setTimeout(this.id + ".Minutes()", 1000 * MinutesSecond);
			(Minutes < 10) ? obj.eq(0).html("0" + Minutes): obj.eq(0).html(Minutes);
			Minutes--;
		} else {
			if (Minutes <= 0) {
				obj.eq(0).html("0" + Minutes);
				Minutes=-1;
			}
		}
	}
	this.Second = function() {
		if (Second > 0) {
			Second--;
			if (Second < 10) {
				obj.eq(1).html("0" + Second);
			} else {
				obj.eq(1).html(Second);
			}
			setTimeout(this.id + ".Second()", 1000);
		} else {
			if (Minutes > -1) {
				MinutesSecond = 60;
				Second = 60;
				setTimeout(this.id + ".Second()", 1000);
			} else {
				Second = 0;
				obj.eq(1).html("00");
			}
		}
	}

	this.Millisecond = function() {
		(Millisecond < 10) ? obj.eq(2).html("0" + Millisecond): obj.eq(2).html(Millisecond);
		console.log(Minutes+"  "+Second)
		if (Minutes < 0 && Second <= 1) {
			obj.eq(2).html("00");
			$("#lotter-time-" + id).html("正在揭晓...");
			fun();
			return
		}
		if (Millisecond < 1) {
			Millisecond = 99
		} else {
			Millisecond--;
		}
		setTimeout(this.id + ".Millisecond()", 10);
	}
	this.Second();
	this.Millisecond();
	this.Minutes();

}