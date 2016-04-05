/*
 * jsfun JavaScript Library v1.3.2
 * Copyright 2012 - 2015 wuxincai and other contributors
 * Released under the MIT license
 * createdate: 2012-06-19
 * updatedate: 2015-07-03
 */
(function js_fun() {
	window.jsfun = {
		config: {
			qiniuURL: "http://media.m.yirenpc.com",
            serverURL: "http://app.m.yirenpc.com",
//			serverURL: "http://58.129.171.152",
			isJsonP: false
		},

		//element operator 
		addOption: function(obj, val, txt) {
			obj.add(new Option(txt, val));
		},
		addOptions: function(obj, vobj) {
			for (var i in vobj) obj.options.add(new Option(vobj[i], i)); /*vobj {} or []*/
		},
		displayOnOff: function(obj) {
			obj.style.display = ((obj.style.display == "block") ? "none" : "block");
		},
		getRadioValue: function(o) {
			for (var i = 0, n = o.length; i < n; i++) {
				if (o[i].checked) {
					return o[i].value;
				}
			}
		},
		insertAdjacentElement: function(element, where, parsedNode) {
			where = where.toLowerCase();
			switch (where) {
				case "beforebegin":
					element.parentNode.insertBefore(parsedNode, this);
					break;
				case "afterbegin":
					element.insertBefore(parsedNode, this.firstChild);
					break;
				case "beforeend":
					element.appendChild(parsedNode);
					break;
				case "afterend":
					if (this.nextSibling) {
						element.parentNode.insertBefore(parsedNode, this.nextSibling);
					} else {
						element.parentNode.appendChild(parsedNode);
					}
					break;
				default:
					break;
			}
		},
		setRadioValue: function(o, val) {
			for (var i = 0, n = o.length; i < n; i++) {
				if (o[i].value == val) {
					o[i].checked = true;
					break;
				}
			}
		},
		getcdata: function(txt) {
			var reg = /<\[\[(.*)\]\]>/;
			if (reg.test(txt)) {
				var match = reg.exec(txt);
				return match[1];
			}
			return "";
		},
		setLoc: function(obj, url) {
			obj.location.replace(url);
		},
		getServerURL: function(imgurl) {
			if (imgurl == null) return null;
			if (imgurl.indexOf("://") > 3) return imgurl;
			return (_serverURL + imgurl);
		},
		getQiNiuURL: function(imgurl) {
			if (imgurl == null) return null;
			if (imgurl.indexOf("://") > 3) return imgurl;
			return (jsfun.config.qiniuURL + imgurl);
		},
		displayinfo: function(ctrl, message, isclear) {
			if (isclear == true) ctrl.innerHTML = "";
			ctrl.innerHTML += (this.time() + " " + message + "<br/>");
		},

		//array function
		array2Object: function(array) {
			var key, obj = {};
			for (var i = 0, n = array.length; i < n; i++) {
				key = jsfun.CStr(array[i]);
				if (key.length > 0) {
					obj[key] = key;
				}
			}
			return obj;
		},
		arrayIndex: function(array, val) {
			if (Array.isArray) {
				return array.indexOf(val);
			}
			for (var i = 0, n = array.length; i < n; i++) {
				if (val == array[i]) {
					return i;
				}
			}
			return -1;
		},
		arrayTrim: function(array) {
			var arr2 = [];
			for (var i = 0, n = array.length; i < n; i++) {
				var key = jsfun.CStr(array[i]);
				if (key.length > 0) {
					arr2.push(key);
				}
			}
			return arr2;
		},
		convertToArray: function(nodes) {
			var array = null;
			try {
				array = Array.prototype.slice.call(nodes, 0);
			} catch (ex) {
				array = [];
				for (var i = 0, n = nodes.length; i < n; i++) {
					array.push(nodes[i]);
				}
			}
			return array;
		},
		getArrayIndex: function(arr, val) {
			for (var i = 0, n = arr.length; i < n; i++) {
				if (arr[i] == val) {
					return i;
				}
			}
			return -1;
		},
		getVBArray: function(a) {
			return (new VBArray(a)).toArray();
		},
		isArray: function(v) {
			if (Array.isArray) return Array.isArray(v);
			return (typeof(v) == "object" && v.length != null);
		},
		str2Array: function(szstr, sdeli) {
			var s2 = jsfun.CStr(szstr);
			if (s2.length > 0) {
				var c2 = (sdeli == null ? "," : sdeli);
				var arr = szstr.split(c2);
				return jsfun.arrayTrim(arr);
			}
		},
		string2Array: function(szstr, rowdeli, coldeli) {
			var s2 = jsfun.CStr(szstr);
			if (s2.length == 0) return [];
			if (rowdeli == null) {
				rowdeli = ";";
			}
			if (coldeli == null) {
				coldeli = ",";
			}
			var arr1 = s2.split(rowdeli),
				arr2 = [];
			for (var str, i = 0, n = arr1.length; i < n; i++) {
				str = jsfun.CStr(arr1[i]);
				if (str.length > 0) {
					arr2[arr2.length] = str.split(coldeli);
				}
			}
			return arr2;
		},
		objectKeys2Array: function(obj) {
			var arr = [];
			for (key in obj) arr.push(key);
			return arr;
		},

		//event 
		catchEventElement: function() {
			var o, evt = window.event;
			if ((o = evt.srcElement) || (o = evt.target)) {
				return o;
			}
			return arguments[0].target; /*var obj = (_browsername == "FF" ? arguments[0].target : window.event.srcElement);*/
		},
		catchEventKeyCode: function() {
			var keycode, evt = window.event;
			if (keycode = evt.keyCode) {
				return keycode;
			}
			return arguments[0].target.keyCode; /*(_browsername == "FF" ? arguments[0].target.keyCode : window.event.keyCode)*/
		},
		catchEventKeyCode2: function() {
			var keycode, evt = window.event;
			if (keycode = evt.keyCode) {
				return keycode;
			}
			return evt.target.keyCode; /*(_browsername == "FF" ? arguments[0].target.keyCode : window.event.keyCode)*/
		},
		elementClick: function(obj) {
			switch (_browsername) {
				case "IE":
					obj.click();
					break;
				default:
					var event = document.createEvent("MouseEvents");
					event.initEvent("click", true, true);
					obj.dispatchEvent(event);
					break;
			}
		},
		getAbsoluteCoordinate: function(obj) {
			var left = obj.offsetLeft,
				top = obj.offsetTop,
				o = obj.offsetParent;
			while (o) {
				left += o.offsetLeft;
				top += o.offsetTop;
				o = o.offsetParent;
			}
			return {
				"left": left,
				"top": top
			};
		},
		currentXY: function() {
			var e = window.event;
			var x = e.clientX,
				y = e.clientY;
			return {
				x: x,
				y: y
			};
		},
		cancelBubble: function() {
			if (window.event.stopPropagation) window.event.stopPropagation();
			else window.event.cancelBubble = true;
		},
		addFavorite: function(surl, sname) {
			if (_browsername == "IE") {
				window.external.addFavorite(surl, sname);
			} else if (window.sidebar) {
				window.sidebar.addPanel(sname, surl, "");
			}
		},
		getSlideAngle: function(dx, dy) {
			return Math.atan2(dy, dx) * 180 / Math.PI;
		},
		getSlideDirection: function(startX, startY, endX, endY) {
			//根据起点和终点返回方向 1：向上1，2：向下3，3：向左4，4：向右2,0：未滑动
			var dy = startY - endY;
			var dx = endX - startX;
			var result = 0;
			if (Math.abs(dx) + Math.abs(dy) < 10) {
				//如果滑动距离太短
				return result;
			}
			var angle = this.getSlideAngle(dx, dy);
			if (angle >= -45 && angle < 45) {
				result = 2;
			} else if (angle >= 45 && angle < 135) {
				result = 1;
			} else if (angle >= -135 && angle < -45) {
				result = 3;
			} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
				result = 4;
			}
			return result;
		},

		//datatype convert
		CBool: function(val) {
			if (val == null || val == 0) return false;
			var v2 = jsfun.CStr(val);
			if (v2.length == 0) return false;
			v2 = v2.toLowerCase();
			if (v2 == "false") return false;
			if (v2 == "true") return true;

			var reg = /^d+$/;
			if (reg.test(v2)) {
				var f = jsfun.CDbl(v2);
				if (f == 0) return false;
				return true;
			}
			return true;
		},
		CDate: function(s) {
			if (s == null) return null;
			var s2 = jsfun.CStr(s);
			if (s2.length == 0) return null;
			var d = s2.replace(/[-\']/g, "/");
			return new Date(d);
		},
		CDateEx: function(s) {
			if (s == null) return new Date(1970, 1, 1);
			var s2 = jsfun.CStr(s);
			if (s2.length == 0) return new Date(1970, 1, 1);
			var d = s2.replace(/[-\']/g, "/");
			return new Date(d);
		},
		CStr: function(s) {
			if (s == null || s.length == 0) {
				return '';
			}
			return String(s).replace(/(^\s+)|(\s+$)/g, "");
		},
		CLng: function(s) {
			var f = parseFloat(s);
			return ((isNaN(f)) ? 0 : Math.round(f));
		},
		CDbl: function(s) {
			var f = parseFloat(s);
			return ((isNaN(f)) ? 0 : Math.round(f * 1000000) / 1000000);
		},
		Round: function(s, n) {
			var v = new Number(s);
			if (isNaN(v)) return 0;
			var prec = (n == null ? 0 : n);
			return parseFloat(v.toFixed(prec));
		},
		fraction: function(s) {
			var f = parseFloat(s);
			if (isNaN(f) || f == 0) return 0;
			var i = Math.floor(f);
			return Math.round((f - i) * 1000000) / 1000000;
		},

		//date function
		dateDiff: function(dtype, date1, date2) {
			var d1, d2;
			if (date1 == date2) return 0;
			if (typeof(date1) == "string") d1 = jsfun.CDate(date1);
			else {
				if (date1 == null) d1 = new Date(0);
				else d1 = new Date(date1);
			}
			if (typeof(date2) == "string") d2 = jsfun.CDate(date2);
			else {
				if (date2 == null) d2 = new Date(0);
				else d2 = new Date(date2);
			}
			switch (dtype) {
				case "y":
					var y1 = d1.getFullYear(),
						y2 = d2.getFullYear();
					count = Math.abs(y1 - y2);
					break;
				case "m":
					var y1 = d1.getFullYear(),
						y2 = d2.getFullYear();
					var m1 = d1.getMonth(),
						m2 = d2.getMonth();
					count = Math.abs((y1 - y2) * 12 + (m1 - m2));
					break;
				default:
					var dt1 = d1.getTime(),
						dt2 = d2.getTime();
					//                  count = Math.abs(dt1 - dt2);
					count = dt1 - dt2;
					switch (dtype) {
						case "d":
							count = parseInt(count / 1000 / 60 / 60 / 24);
							break;
						case "h":
							count = parseInt(count / 1000 / 60 / 60);
							break;
						case "n":
							count = parseInt(count / 1000 / 60);
							break;
						case "s":
							count = parseInt(count / 1000);
							break;
					}
			}
			return count;
		},
		dateToStr: function(date) {
			if (date == null) {
				return "";
			}
			var d = new Date(date);
			var vars = (d.getFullYear()) + "/" + (d.getMonth() + 1) + "-" + d.getDate(),
				h = d.getHours(),
				n = d.getMinutes();
			s = d.getSeconds();
			if (h > 0 || n > 0 || s > 0) {
				vars += " " + h + ":" + n + ":" + s;
			}
			return vars;
		},
		getDateStr: function(d) {
			if (d == null) {
				d = new Date();
			} else {
				d = new Date(d);
			}
			return (d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate());
		},
		getDateTimeStr: function(d) {
			if (d == null) {
				d = new Date()
			} else d = new Date(d);
			var sdate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
			var h = d.getHours();
			var m = d.getMinutes();
			var s = d.getSeconds();
			if (h + m + s > 0) sdate += " " + h + ":" + m + ":" + s;
			return sdate;
		},
		time: function(d) {
			if (d == null) d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
			var s = d.getSeconds();
			return h + ":" + m + ":" + s;
		},
		now: function() {
			return this.getDateTimeStr();
		},
		today: function() {
			return this.getDateStr();
		},
		tomorrow: function() {
			var d = new Date();
			d.setDate(d.getDate() + 1);
			return this.getDateStr(d);
		},
		monthbegin: function() {
			var d = new Date();
			d.setDate(1);
			return this.getDateStr(d);
		},
		monthend: function() {
			var d = new Date();
			d.setMonth(d.getMonth() + 1);
			d.setDate(0);
			return this.getDateStr(d);
		},

		//dom operator
		firstChild: function(pnode, chdtag) {
			var node = pnode.firstChild;
			while (node && node.tagName != chdtag) {
				node = node.nextSibling;
			}
			return node;
		},
		lastChild: function(pnode, chdtag) {
			var node = pnode.lastChild;
			while (node && node.tagName != chdtag) {
				node = node.previousSibling;
			}
			return node;
		},
		nextSibling: function(node, tag) {
			var node2 = node.nextSibling;
			while (node2 && node2.tagName != tag) {
				node2 = node2.nextSibling;
			}
			return node2;
		},
		previousSibling: function(node, tag) {
			var node2 = node.previousSibling;
			while (node2 && node2.tagName != tag) {
				node2 = node2.previousSibling;
			}
			return node2;
		},
		isChild: function(parentObj, childObj) {
			var chdobj = childObj;
			while (chdobj && chdobj.tagName != "BODY") {
				if (chdobj == parentObj) {
					return true
				};
				chdobj = chdobj.parentElement;
			};
			return false;
		},
		firstParent: function(node, tag) {
			//第一个父节点，包括本身
			var node2 = node;
			while (node2 && node2.tagName != "BODY") {
				if (node2.tagName == tag) return node2;
				node2 = node2.parentElement;
			}
		},
		firstParent2: function(node, tag) {
			//第一个父节点，不包括本身
			if (node == null) return null;
			var node2 = node.parentElement;
			while (node2 && node2.tagName != "BODY") {
				if (node2.tagName == tag) return node2;
				node2 = node2.parentElement;
			}
		},
		//common function
		copyToClipboard: function(strdata) {
			clipboardData.setData("Text", strdata);
			alert("已经复制到剪贴板。");
		},
		getKey: function() {
			var key = "";
			for (var i = 0, n = arguments.length; i < n; i++) {
				if (i > 0) key += "_";
				key += arguments[i].toString();
			}
			return key;
		},
		getPrice: function(q, a) {
			q = jsfun.CDbl(q);
			a = jsfun.CDbl(a);
			return ((q == 0) ? 0 : (a / q));
		},
		HTMLEncode: function(str) {
			if (str == null || str.length == 0) {
				return "";
			}
			var s = str.replace(/&/g, "&amp;");
			s = s.replace(/</g, "&lt;");
			s = s.replace(/>/g, "&gt;");
			s = s.replace(/ /g, "&nbsp;");
			s = s.replace(/\'/g, "&apos;");
			s = s.replace(/\"/g, "&quot;");
			return s;
		},
		HTMLDecode: function(str) {
			if (str == null || str.length == 0) {
				return "";
			}
			var s = str.replace(/&amp;/g, "&");
			s = s.replace(/&lt;/g, "<");
			s = s.replace(/&gt;/g, ">");
			s = s.replace(/&nbsp;/g, " ");
			s = s.replace(/&apos;/g, "\'");
			s = s.replace(/&quot;/g, "\"");
			return s;
		},
		isnum: function(s2) {
			return /^[0-9]*$/.test(s2);
		},
		isNumber: function(num) {
			return num === 0 + num;
		},
		getUrlPath: function(url) {
			var i = url.lastIndexOf("/");
			return url.substr(0, i + 1);
		},
		trim: function(vstr) {
			if (vstr == null || vstr == '') {
				return '';
			}
			return String(vstr).replace(/(^\s+)|(\s+$)/g, "");
		},

		//object function
		dupSimpleObject: function(obj) {
			var obj2 = {};
			for (var i in obj) {
				obj2[i] = obj[i];
			}
			return obj2;
		},
		getAttributesObject: function(attrs) {
			if (attrs == null) return null;
			var obj = {};
			for (var i = 0, n = attrs.length; i < n; i++) {
				obj[attrs[i].name] = attrs[i].value;
			}
			return obj;
		},
		isEmptyObject: function(obj) {
			for (var i in obj) {
				return false;
			}
			return true;
		},
		objectEqual: function(obj1, obj2) {
			for (var key in obj1) {
				if (obj1[key] !== obj2[key]) {
					return false;
				}
			}
			for (var key in obj2) {
				if (obj1[key] !== obj2[key]) {
					return false;
				}
			}
			return true;
		},
		str2Object: function(szstr, sdeli) {
			var s = jsfun.CStr(szstr);
			if (s.length) {
				if (sdeli == null) sdeli = "~";
				var arr = s.split(sdeli);
				return jsfun.array2Object(arr);
			}
		},
		str2Object2: function(szstr, sdeli) {
			var obj = {},
				s = szstr.replace(/\s+/, "");
			var key, arr = s.split(sdeli);
			for (var i in arr) {
				key = arr[i];
				if (key.length > 0) obj[key] = 1;
			}
			return obj;
		},
		string2Object: function(szstr, rowdeli, coldeli) {
			var s2 = jsfun.CStr(szstr);
			if (s2.length == 0) return {};
			if (rowdeli == null) {
				rowdeli = String.fromCharCode(2);
			}
			if (coldeli == null) {
				coldeli = String.fromCharCode(1);
			}
			var arr = s2.split(rowdeli),
				obj = {},
				rowstr, keycode, a;
			for (var i = 0, n = arr.length; i < n; i++) {
				rowstr = jsfun.CStr(arr[i]);
				if (rowstr.length > 0) {
					a = rowstr.split(coldeli);
					if (a.length == 2) {
						keycode = jsfun.CStr(a[0]);
						if (keycode.length > 0) {
							obj[keycode] = jsfun.CStr(a[1]);
						}
					}
				}
			}
			return obj;
		},
		getObjectDataString: function(data, rowdeli, coldeli) {
			if (rowdeli == null) {
				rowdeli = "&";
			}
			if (coldeli == null) {
				coldeli = "=";
			}
			var i, nc = 0,
				varstr = "";
			for (var i in data) {
				varstr += ((nc++ == 0) ? "" : rowdeli) + i + coldeli + data[i];
			}
			return varstr;
		},
		getObjectLength: function(obj) {
			var length = 0,
				i;
			for (i in obj) length++;
			return length;
		},

		getfieldstr: function(fname) {
			var len = fname.length;
			if (len <= 2) {
				return fname;
			}
			if (fname.charAt(0) == '[' && fname.charAt(len - 1) == ']') {
				return fname.substr(1, len - 2);
			}
			return fname;
		},
		xmlFieldEncode: function(fcode) {
			if (fcode == null) {
				return "";
			}
			return fcode.replace(/_x/g, "_x005F_x");
		},
		xml2Data: function(xmlRecs, fields) {
			//将数据集 xmlRecs转化为行数组
			if (xmlRecs) {
				var data = [];
				if (fields == null) {
					for (var i = 0, n = xmlRecs.length; i < n; i++) {
						data[i] = jsfun.getAttributesObject(xmlRecs[i].attributes)
					}
					return data;
				}

				var flen = fields.length;
				for (var i = 0, n = xmlRecs.length; i < n; i++) {
					var rowdata = {};
					for (var j = 0; j < flen; j++) {
						var fname = fields[j];
						if (fname) {
							fname = jsfun.getfieldstr(fname);
							var fval = xmlRecs[i].getAttribute(fname)
							if (fval) {
								rowdata[fname] = fval;
							}
						}
					}
					data[i] = rowdata;
				}
				return data;
			}
		},
		alert: function(str2) {
			var style, div = document.getElementById("div_moblie_alert");
			if (div == null) {
				div = document.createElement("div");
				div.id = "div_moblie_alert";
				document.body.appendChild(div);
				div.style.cssText = "display:none;position:absolute,border:1px solid red;"
			}
			div.innerHTML = "";
			style = div.style;
			style.display = "block";
			style.width = "200px";
			style.padding = "20px 20px 10px 20px";
			style.backgroundColor = "white";
			style.border = "1px solid red";
			style.zindex = 1;
			var node = document.createElement("div");
			node.innerHTML = str2;
			div.appendChild(node);
			var btn = document.createElement("input");
			btn.type = "button";
			btn.value = "OK";
			btn.style.marginLeft = "80px";
			btn.onclick = function() {
				div.style.display = "none";
			}
			div.appendChild(btn);
		},

		//cookie
		getCookie: function(name) {
			var cookie = document.cookie;
			if (cookie.length > 0) {
				var isok = false,
					i1, n = name.length;
				if (cookie.substr(0, n + 1) == (name + "=")) {
					i1 = n + 1;
					isok = true;
				} else {
					i1 = cookie.indexOf("; " + name + "=")
					if (i1 > 1) {
						i1 = i1 + n + 3;
						isok = true;
					}
				}
				if (isok) {
					var i2 = cookie.indexOf(";", i1);
					if (i2 == -1) i2 = cookie.length;
					return unescape(cookie.substring(i1, i2));
				}
			}
			return "";
		},
		setCookie: function(name, value, expiredays) {
			var s2 = "",
				n = this.CLng(expiredays);
			if (n != 0) {
				var edate = new Date();
				edate.setDate(edate.getDate() + n);
				s2 = ";expires=" + edate.toGMTString();
			}
			document.cookie = name + "=" + escape(value) + s2;
		},
		hasPrivilege: function(key, val) {
			var objPri = getSessionStorage("privileges");
			if (objPri) {
				var v = this.CLng(objPri[key]);
				if (v & val == val) return 1;
			}
			return 0;
		},
		processReturnMessage: function(msg) {
			var flag = msg.substr(0, 2);
			if (flag == "0,") {
				var txt = msg.substr(2);
				if (txt.indexOf("登录") >= 0) {
					var win = self;
					while (win != parent) {
						win = parent;
					}
					win.location = "/";
				}
				return false;
			}
			return true;
		},

		//judge html5
		isHtml5: function() {
			if (window.applicationCache || Worker || navigator.geolocation) return true;
			return ('required' in document.createElement('input'));
		},
		getDistance: function(longt1, lat1, longt2, lat2) {
			//return kilometers
			var PI = Math.PI;
			var R = 6371.229;
			var x, y, distance;
			x = (longt2 - longt1) * PI * R * Math.cos(((lat1 + lat2) / 2) * PI / 180) / 180;
			y = (lat2 - lat1) * PI * R / 180;
			return this.Round(Math.sqrt(x * x + y * y), 1);
		},

		//location
		pathname: function(url) {
			var url2 = url.toLowerCase();
			var i = url2.indexOf("://");
			if (i == -1) i = 0;
			else i = i + 3;
			i = url2.indexOf("/", i);
			var j = url2.indexOf(".aspx", i + 1);
			if (j == -1) return "";
			return url2.substr(i, j - i + 5);
		},
		pagePath: function(url) {
			var i = url.lastIndexOf("/");
			return url.substr(0, i + 1);
		},
		absPagePath: function(pathname, currentpath) {
			pathname = jsfun.trim(pathname);
			if (pathname.substring(0, 1) == "/") return location.protocol + location.host + pathname;
			var pname = currentpath;
			var arr = pathname.split("/");
			var p = -1,
				k = 0;
			for (var i = 0, n = arr.length; i < n; i++) {
				var path = arr[i];
				switch (path) {
					case ".":
						break;
					case "..":
						k = pname.lastIndexOf("/", pname.length - 2);
						if (k <= 8) throw (new error(6));
						pname = pname.substr(0, k + 1);
						break;
					default:
						p = i;
						break;
				}
				if (p >= 0) break;
			}
			if (p > 0) arr.splice(0, 1);
			return pname + arr.join("/");
		},

		//encrypt
		md5: function(s) {
			return (new js_encrypt_md5().b32(s));
		}
	}
})();
if (String.prototype.trim == null) String.prototype.trim = function() {
	return this.replace(/(^\s+)|(\s+$)/g, "");
}

function keydownDoEvent(o, strEvent, keycode) {
	var kcode = keycode || window.event.keyCode;
	if (keycode == 13) {
		var ev = strEvent.toLowerCase();
		switch (ev) {
			case "click":
				o.click();
				break;
			case "select":
				o.select();
				break;
			case "change":
				o.change();
				break;
			default:
				o.focus();
				break;
		}
	}
};

function isInElement(x, y, objElement) {
	if (objElement == null) return true;
	var box = objElement.getBoundingClientRect();
	if ((x < box.left || x > box.right) || (y < box.top || y > box.bottom)) {
		return false;
	}
	return true;
}

//var _serverURL = "http://58.129.171.137";
//var _serverURL = "http://58.129.171.150";
//var _serverURL = "http://58.129.171.166";
var _serverURL = jsfun.config.serverURL;
var _request = {},
	_openurl, _caller, _openeddocs = {},
	_parameter, _cbfun, _session, _cache;

function cbfunction(msg, parameter) {
	var brtn = true;
	try {
		switch (msg) {
			case 'start':
				break;
			case 'end':
				break;
			case 'select':
				break;
			default:
				break;
		}
	} catch (ex) {
		brtn = false;
	}
	return brtn;
}

function docRegister() {
	function getHtmlRequest() {
		//取得_request对象和entityCode
		var querystr = location.search.substr(1);
		try {
			_request = jsfun.string2Object(decodeURI(querystr), '&', '=');
		} catch (ex) {
			_request = {};
		}
	}

	function initPageVars() {
		_caller = null;
		var _mod;
		if (parent == this) {
			if (typeof(dialogArguments) == "object") {
				if (typeof(dialogArguments.caller) == "object") {
					_mod = dialogArguments;
					_caller = dialogArguments.caller;
				}
			} else {
				_caller = window.opener;
				if (!_caller) {
					_caller = parent;
				}
			}
		} else {
			_caller = parent;
		}

		if (_caller) {
			if (typeof(_caller._session) == "object") {
				_session = _caller._session;
				_cache = _caller._cache;
				var url = document.URL;
				if (!_mod) {
					_mod = _caller._openeddocs[url];
				}
				if (_mod) {
					_openurl = _mod.openurl;
					_cbfun = _mod.cbfun;
					_parameter = _mod.parameter;
				} else {
					_cbfun = _caller.cbfunction;
					_parameter = _caller._parameter;
					if (_parameter == null) _parameter = {};
				}
				window.onunload = docUnload;
				if (_cbfun) modCall('start', 0);
			} else { /*ignore; first call;*/ }
		}
	}

	function initGlobalVars() {
		_parameter = {};
		_cache = {};
		_session = {};
	}
	getHtmlRequest();
	initPageVars();
	if (_session == null) initGlobalVars();
}
if (window.JSON == null) {
	JSON = function() {
		var m = {
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"': '\\"',
				'\\': '\\\\'
			},
			s = {
				'boolean': function(x) {
					return String(x);
				},
				number: function(x) {
					return isFinite(x) ? String(x) : 'null';
				},
				string: function(x) {
					if (/["\\\x00-\x1f]/.test(x)) {
						x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
							var c = m[b];
							if (c) {
								return c;
							}
							c = b.charCodeAt();
							return '\\u00' +
								Math.floor(c / 16).toString(16) +
								(c % 16).toString(16);
						});
					}
					return '"' + x + '"';
				},
				object: function(x) {
					if (x) {
						var a = [],
							b, f, i, l, v;
						if (x instanceof Array) {
							a[0] = '[';
							l = x.length;
							for (i = 0; i < l; i += 1) {
								v = x[i];
								f = s[typeof v];
								if (f) {
									v = f(v);
									if (typeof v == 'string') {
										if (b) {
											a[a.length] = ',';
										}
										a[a.length] = v;
										b = true;
									}
								}
							}
							a[a.length] = ']';
						} else if (x instanceof Object) {
							a[0] = '{';
							for (i in x) {
								v = x[i];
								f = s[typeof v];
								if (f) {
									v = f(v);
									if (typeof v == 'string') {
										if (b) {
											a[a.length] = ',';
										}
										a.push(s.string(i), ':', v);
										b = true;
									}
								}
							}
							a[a.length] = '}';
						} else {
							return;
						}
						return a.join('');
					}
					return 'null';
				}
			};
		return {
			stringify: function(v) {
				var f = s[typeof v];
				if (f) {
					v = f(v);
					if (typeof v == 'string') {
						return v;
					}
				}
				return null;
			},
			parse: function(text) {
				try {
					return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
							text.replace(/"(\\.|[^"\\])*"/g, ''))) &&
						eval('(' + text + ')');
				} catch (e) {
					return false;
				}
			}
		}
	}();
}

function docUnload() {
	if (typeof(_caller) == 'object') {
		modCall('end', 0);
	}
}

function modCall(msg, parameter) {
	if (_cbfun) {
		try {
			_cbfun(msg, parameter);
		} catch (e) {}
	}
}

function createWindow(openurl, doc, sfeatures) {
	var hwid;
	if (sfeatures)
		hwid = window.open(openurl, doc, sfeatures);
	else {
		//sfeatures = "left=280, top=150, width=800, height=650, toolbar =no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no";
		//hwid = window.open(openurl, doc, sfeatures);
		hwid = window.open(openurl, "_blank");
	}
	return hwid;
}

function openHtmlWindow(docname, openurl, parameter, cbfun, sfeatures) {
	var opendoc;
	var url = openurl;
	if (url.substr(0, 1) != "/") {
		url = jsfun.getUrlPath(location.href) + openurl;
	} else {
		url = location.protocol + "//" + location.host + openurl;
	}
	var url = encodeURI(url);
	var mod = {
		openurl: url,
		parameter: parameter,
		cbfun: cbfun
	};
	_openeddocs[url] = mod;
	if (typeof(docname) == "object") {
		opendoc = docname;
		if (opendoc.location) {
			opendoc.location.replace(url);
		} else opendoc.contentWindow.location.replace(url);
	} else {
		opendoc = createWindow(url, docname, sfeatures);
	}
	return opendoc;

}

function docModalDialog(openurl, parameter, cbfun, sfeatures) {
	var vArguments = {
		openurl: openurl,
		parameter: parameter,
		cbfun: cbfun,
		caller: window
	};
	var url = "";
	if (openurl.substr(0, 1) == "/") {
		url = location.protocol + "//" + location.host + openurl;
	} else {
		url = location.protocol + "//" + location.host + location.pathname + openurl;
	}
	_openeddocs[url] = vArguments;
	if (sfeatures == null) {
		sfeatures = "dialogWidth:900px;dialogHeight:680px;scroll:yes;resizable:yes;help:no;status:no;scrollbars:true";
	}
	var win = window.showModalDialog(openurl, vArguments, sfeatures);
	return win;
}

function docModelessDialog(openurl, parameter, cbfun, sfeatures) {
	var vArguments = {
		openurl: openurl,
		parameter: parameter,
		cbfun: cbfun,
		caller: window
	};
	var url = location.protocol + "//" + location.host + openurl;
	_openeddocs[url] = vArguments;
	if (sfeatures == null) {
		sfeatures = "dialogWidth:900px;dialogHeight:680px;scroll:yes;resizable:yes;help:no;status:no;scrollbars:true";
	}
	var win = window.showModelessDialog(openurl, vArguments, sfeatures);
	return win;
}

function doc_ModalDialog_Timer() {}

function _docModalDialog_Timer() {
	doc_ModalDialog_Timer();
	if (_caller) _caller._doc_ModalDialog_Timer();
}

function jsOverDomainCallback(data) {
	var action = data.action;
	var o = jsAjax.params(action);
	if (o) o.cbcall(1, data);
}
var _jsbrowser = new function jsBrowser() {
	var _me = this,
		_xhrobj, _url, _browser, _winXHR, _returnText, XHR;
	strContentType = "application/x-www-form-urlencoded";
	var _namespaces = {
		"soap": "http://schemas.xmlsoap.org/soap/envelope/",
		"xsd": "http://www.w3.org/2001/XMLSchema",
		"xsi": "http://www.w3.org/2001/XMLSchema-instance"
	}

	function cbCall(rata, result) {
		if (result == 1) {
			return (1);
		} else {
			return (0);
		}
	}
	this.namespace = function() {
		return _namespaces;
	}
	this.url = function(url) {
		if (url == undefined) return _url;
		_url = url;
	}
	this.encode = function(str) {
		if (str == null || str.length == 0) {
			return "";
		}
		var s = str.replace(/&/g, "&amp;");
		s = s.replace(/</g, "&lt;");
		s = s.replace(/>/g, "&gt;");
		s = s.replace(/ /g, "&nbsp;");
		s = s.replace(/\'/g, "&#39;");
		s = s.replace(/\"/g, "&quot;");
		return s;
	}
	this.decode = function(str) {
		if (str == null || str.length == 0) {
			return "";
		}
		var s = str.replace(/&amp;/g, "&");
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&nbsp;/g, " ");
		s = s.replace(/&#39;/g, "\'");
		s = s.replace(/&quot;/g, "\"");
		return s;
	}
	this.createXHR = function() {
		var XHR;
		_winXHR = (_browser.browser == "IE" ? false : true);
		if (window.XMLHttpRequest) {
			XHR = new window.XMLHttpRequest();
		} else {
			if (_xhrobj != null) {
				XHR = new ActiveXObject(_xhrobj);
			} else {
				try {
					XHR = new ActiveXObject("Microsoft.XMLHTTP");
					_xhrobj = "Microsoft.XMLHTTP";
				} catch (e) {
					try {
						XHR = new ActiveXObiect("Msxml2.XMLHTTP");
						_xhrobj = "Msxml2.XMLHTTP";
					} catch (e) {
						alert("IE不支持XMLHTTP!")
					}
				}
			}
		}
		return XHR;
	}
	this.http = function(smethod, url, sdata, cbfun, charset) {
		function httpXmlComplete() {
			if (XHR.readyState == 4) {
				_returnText = ((_winXHR) ? XHR.response : XHR.responseText);
				var result = ((XHR.status == 200) ? 1 : 0);
				if (cbfun) cbfun(_returnText, result);
			}
		}
		var smethod;
		var async = (cbfun ? true : false);
		if (sdata == null || sdata.length == 0) {
			sdata = "time=" + (new Date()).valueOf();
		}
		if (smethod == null || smethod == "") smethod = "Get";
		var XHR = _me.createXHR()
		XHR.onreadystatechange = httpXmlComplete;
		XHR.open(smethod, url, async);
		XHR.setRequestHeader("Content-Type", strContentType);
		if (_winXHR) {
			XHR.overrideMimeType("text/html;charset=" + (charset ? charset : "utf-8"));
		}
		XHR.send(sdata);
		if (cbfun == null) return _returnText;
	}
	this.soap = function(url, action, sdata, cbfun, charset) {
		function httpXmlComplete() {
			if (XHR.readyState == 4) {
				_returnText = ((_winXHR) ? XHR.response : XHR.responseText);
				var result = ((XHR.status == 200) ? 1 : 0);
				if (cbfun) cbfun(_returnText, result);
			}
		}

		var async = (cbfun ? true : false);
		var XHR = _me.createXHR()
		XHR.onreadystatechange = httpXmlComplete;
		XHR.open("Post", url, async);
		XHR.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		//XHR.setRequestHeader("SOAPAction", action);
		if (_winXHR) {
			XHR.overrideMimeType("text/html;charset=" + (charset ? charset : "utf-8"));
		}
		XHR.send(sdata);
		if (cbfun == null) return _returnText;

	}
	this.getTagText = function(tagName) {
		var tag1 = "<" + tagName + ">";
		var i1 = _returnText.indexOf(tag1);
		if (i1 > 0) {
			i1 += tag1.length;
			var i2 = _returnText.indexOf("</" + tagName + ">", i1);
			if (i2 > i1) return _returnText.substring(i1, i2);
		}
		return "";
	}
	this.browser = function() {
		function uaMatch(ua) {
			var match;
			if (match = /(msie\s|trident.*rv:)([\w.]+)/.exec(ua)) {
				return {
					browser: "IE",
					name: match[1],
					version: match[2] || "0"
				};
			}
			if (match = /(firefox)\/([\w.]+)/.exec(ua)) {
				return {
					browser: "FF",
					name: match[1],
					version: match[2] || "0"
				};
			}

			if (match = /(chrome)\/([\w.]+)/.exec(ua)) {
				return {
					browser: "GG",
					name: match[1],
					version: match[2] || "0"
				};
			}

			if (match = /version\/([\w.]+).*(safari)/.exec(ua)) {
				return {
					browser: "AP",
					name: match[2],
					version: match[1] || "0"
				};
			}

			if (match = /(opera).+version\/([\w.]+)/.exec(ua)) {
				return {
					browser: "OP",
					name: match[1],
					version: match[2] || "0"
				};
			}
			return {
				browser: "unknown",
				name: "unknown",
				version: "0"
			};
		}
		if (_browser) return _browser;

		if (navigator) {
			var ug = navigator.userAgent;
			if (ug) ug = ug.toLowerCase();
			_browser = uaMatch(ug);
		} else _browser = {};
		return _browser;
	}
	this.ispc = function() {
		var os = ["Android", "iPhone", "Windows Phone", "iPod", "BlackBerry", "MeeGo", "SymbianOS"];
		var info = navigator.userAgent;
		var len = os.length;
		for (var i = 0; i < len; i++) {
			var osname = os[i];
			var k = info.indexOf(osname);
			if (k > 0) {
				return {
					"ispc": false,
					"name": osname
				};
			}
		}
		return {
			ispc: true
		};
	}
	this.jsonp = function(params) {
		//params {url:url, data:data, cbcall:cbcall}
		if (params == null) return;
		if (typeof(params) != "object") return;

		var url = jsfun.CStr(params.url);
		if (url.length == 0) return;
		url = url.toLowerCase();
		if (params.data == null) params.data = {};
		var data = params.data
		var token = jsfun.CStr(localStorage.getItem("token"));
		var userid = jsfun.CLng(localStorage.getItem("userid"));
		if (userid > 0 && token.length > 8) {
			data.userid = userid;
			data.token = token;
		}
		data.jsonpCallback = "jsOverDomainCallback";
		var i = url.indexOf(".aspx?");
		var j = url.lastIndexOf("&", i);
		var sdata = jsfun.getObjectDataString(data);
		if (i > 7 && j == -1) {
			url += "&" + sdata;
		} else {
			url += "?" + sdata;
		}
		var script = document.createElement("script");
		script.src = url;
		document.body.appendChild(script);
	}
}
var _browsername = _jsbrowser.browser().browser;

var _jsdom = new function() {
	var _dom, _node, _nodes;
	this.getDom = function() {
		return _dom;
	}
	this.setDom = function(dom) {
		_dom = dom;
	}
	this.getNode = function() {
		return _nbode;
	}
	this.setNode = function(node) {
		return _nbode = node;
	}
	this.getNodes = function() {
		return _nbode;
	}
	this.setNodes = function(nodes) {
		return _nbode = nodes;
	}
	this.createDom = function(xml) {
		var isloaded;
		switch (_browsername) {
			case "IE":
				_dom = new ActiveXObject("Microsoft.XMLDOM");
				_dom.async = false;
				xml = jsfun.CStr(xml);
				if (xml.length > 7) {
					isloaded = _dom.loadXML(xml);
					if (!isloaded) {
						var e = _dom.parseError;
						var msg = "line:" + e.line + "\r\npos:" + e.linepos + "\r\nreason:" + e.reason;
						alert(msg);
					}
				}
				break;
			case "FF":
				if (xml != null) {
					var parser = new DOMParser();
					_dom = parser.parseFromString(xml, 'application/xml'); //application/xml,application/xhtml+xml,text/xml
				} else {
					_dom = document.implementation.createDocument("", "root", null);
				}
				break;
			case "GG":
			case "AP":
				if (xml != null) {
					var parser = new DOMParser();
					_dom = parser.parseFromString(xml, 'application/xml');
				} else {
					_dom = document.implementation.createDocument("", "root", null);
				}
				break;
			default:
				break;
		}
		return _dom;
	}
	this.selectNodes = function(expression, context, namespaces) {
		_dom = context;
		if (context == null) {
			return null;
		}

		var doc = ((context.nodeType && context.nodeType != 9) ? context.ownerDocument : context); //context.nodeType==9 
		if (typeof doc.evaluate != "undefined") {
			var nsresolver = null;
			if (namespaces instanceof Object) {
				nsresolver = function(prefix) {
					return namespaces[prefix];
				};
			}
			var result = doc.evaluate(expression, context, nsresolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var nodes = new Array();
			if (result != null) {
				for (var i = 0, len = result.snapshotLength; i < len; i++) {
					nodes.push(result.snapshotItem(i));
				}
			}
			_nodes = nodes;
			return nodes;
		} else if (typeof context.selectNodes != "undefined") {
			if (namespaces instanceof Object) {
				var ns = "";
				for (var prefix in namespaces) {
					if (namespaces.hasOwnProperty(prefix)) {
						ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
					}
				}
				doc.setProperty("SelectionNamespaces", ns);
			}
			_nodes = context.selectNodes(expression);
			return _nodes;
		} else {
			throw new Error("不支持XPath！");
		}
	}
	this.selectSingleNode = function(expression, context, namespaces) {
		if (context == null) return null;
		_dom = context;
		var doc = (context.nodeType != 9 ? context.ownerDocument : context);
		if (typeof doc.evaluate != "undefined") {
			var nsresolver = null;
			if (namespaces instanceof Object) {
				nsresolver = function(prefix) {
					return namespaces[prefix];
				}
			}
			var result = doc.evaluate(expression, context, nsresolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			_node = (result != null ? result.singleNodeValue : null);
			return _node;
		} else if (typeof context.selectSingleNode != "undefined") {
			if (namespaces instanceof Object) {
				var ns = "";
				for (var prefix in namespaces) {
					if (namespaces[prefix] != null) {
						ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
					}
				}
				doc.setProperty("SelectionNamespaces", ns);
			}
			_node = context.selectSingleNode(expression);
			return _node;
		} else {
			throw new Error("不支持XPath！");
		}
	}
	this.xml = function(dom) {
		if (dom == null) {
			dom = _dom;
			if (dom == null) {
				return null;
			}
		}
		switch (_browsername) {
			case "IE":
				return dom.xml;
				break;
			case "FF":
			case "GG":
			case "AP":
			default:
				return (new XMLSerializer()).serializeToString(dom);
				break;
		}
	}
	this.nodeValue = function(node) {
		if (node == null) {
			node = _node;
			if (node == null) {
				return null;
			}
		}
		if (_browsername == "IE") return node.text;
		return node.textContent;
	}
	this.attributeObject = function(attrs) {
		var attr, obj = {};
		for (var i = 0, n = attrs.length; i < n; i++) {
			attr = attrs[i];
			obj[attr.name] = attr.value;
		}
		return obj;
	}
}

function js_my_slide(divid) {
	/*滑动控件与轮播控件
	   divid: render div's id;
	options 
	    options.images 图片数组;
	    options.urls url数组;
	    options.interval 时间间隔; 最小值为1000
	    options.clickstop 点击停留时间;
	    option.direct 方向 2：向右 4向左;
	    createdate: 2015-3-12 updatedate: 2015-07-03
	*/
	var _me = this;
	var _div = divid;
	var _options = {
		images: [],
		urls: [],
		interval: 2500,
		clickstop: 5000,
		direct: 4
	};
	var images = _options.images;
	var count = 0,
		iindex = 0,
		qindex = 0,
		hindex = 0;
	var nextCarouselTime = 0,
		nextInterval = 0; //下次轮播时间
	var inputs = [];
	var isdrawed = false,
		isclicked = false,
		isMoving = false;
	var startX = -1,
		startY = -1;
	var sliderHeight = 0,
		sliderWidth = 0,
		movedWidth = 0;
	var touchBox1div, touchBoxdiv, touchBox2div, touchBox1, touchBox, touchBox2;

	function setradio() {
		for (var i = 0; i < count; i++) {
			inputs[i].checked = (i == iindex ? true : false);
		}
	}

	function tohref() {
		var surl = _options.urls[iindex];
		if (surl) location = surl;
	}

	function inputclick() {
		nextCarouselTime = (new Date()).getTime();
		var obj = (_browsername == "FF" ? arguments[0].target : window.event.srcElement);
		iindex = obj.value;
		setImgSrc(0);
		setradio();
		nextInterval = _options.clickstop;
		getNextCarouselTime(nextInterval);
	}

	function getNextCarouselTime(interval) {
		nextCarouselTime = (new Date()).setMilliseconds(interval);
	}
	this.options = function(opts) {
		if (opts) {
			for (var i in _options) {
				if (opts[i]) _options[i] = opts[i];
			}
		}
		images = _options.images; //图片数组
		count = images.length; //图片数量
		iindex = 0; //当前位置
		qindex = count - 1; //前一个位置
		hindex = 1; //后一个位置
		if (_options.interval < 1000) _options.interval = 1000;
		if (_options.clickstop < _options.interval) _options.clickstop = _options.interval;
		if (_options.direct != 2) _options.direct = 4;
		nextInterval = _options.interval;
		return _options;
	}
	this.fresh = function() {
		if ((new Date()).getTime() >= nextCarouselTime) {
			if (count > 1) {
				setImgSrc(_options.direct);
				nextInterval = _options.interval;
			}
		}
		getNextCarouselTime(nextInterval);
		setTimeout(_me.fresh, nextInterval);
	}

	function getNextIndex(pindex, direct) {
		var i = pindex;
		switch (direct) {
			case 4: //slide left
				if (pindex >= count - 1) i = 0;
				else i = pindex + 1;
				break;
			case 2: //slide right
				if (pindex <= 0) i = count - 1;
				else i = pindex - 1;
				break;
			default:
				break;
		}
		return i;
	}

	function setImgSrc(direct) {
		if (direct == null) direct = 0;
		switch (direct) {
			case 2: //slide right
				hindex = iindex;
				iindex = getNextIndex(iindex, 2);
				qindex = getNextIndex(iindex, 2);
				break;
			case 4: // slide left
				qindex = iindex;
				iindex = getNextIndex(iindex, 4);
				hindex = getNextIndex(iindex, 4);
				break;
			default:
				break;
		}
		var swidth = sliderWidth + "px";
		if (qindex != touchBox1.imageIndex) {
			touchBox1.src = images[qindex];
			touchBox1div.style.width = swidth;
			touchBox1.imageIndex = qindex;
		}
		touchBox1div.style.marginLeft = "-" + swidth;
		if (iindex != touchBox.imageIndex) {
			touchBox.src = images[iindex];
			touchBoxdiv.style.width = swidth;
			touchBox.imageIndex = iindex;
		}
		touchBoxdiv.style.marginLeft = "0px";

		if (hindex != touchBox2.imageIndex) {
			touchBox2.src = images[hindex];
			touchBox2div.style.width = swidth;
			touchBox2.imageIndex = hindex;
		}
		touchBoxdiv.style.marginRight = "0px";
		setradio();
	}
	this.slidering = function() {
		//自动滑动图片
		var i = 0;
		switch (_options.direct) {
			case 2: //向右 
				i = jsfun.CLng(touchBox1div.style.marginLeft) + 40;
				if (i + 40 >= 0) {
					i = sliderWidth;
					touchBox1div.style.marginLeft = i + "px";
					setImgSrc(_options.direct);
					isMoving = false;
				} else {
					touchBox1div.style.marginLeft = i + "px";
				}
				break;
			case 4: //向左 
				i = jsfun.CLng(touchBoxdiv.style.marginLeft) - 40;
				if (i + sliderWidth - 40 <= 0) {
					i = -sliderWidth;
					touchBoxdiv.style.marginLeft = i + "px";
					setImgSrc(_options.direct);
					isMoving = false;
				} else {
					touchBoxdiv.style.marginLeft = i + "px";
				}
				break;
			default:
				isMoving = false;
				break;
		}
		if (isMoving) setTimeout(_me.slidering, 50);
	}

	function setinfo() {
		sliderWidth = touchBox1div.offsetWidth;
		sliderHeight = touchBoxdiv.offsetHeight;
		movedWidth = (sliderHeight / 2 - 50);
		swidth = sliderWidth + "px";
		setImgSrc();
	}

	function addLister() {
		_div.addEventListener("touchstart", function(ev) {
			var touch = ev.touches[0]
			startX = Number(touch.pageX);
			startY = Number(touch.pageY);
		}, false);

		_div.addEventListener("touchmove", function(ev) {
			var touch = event.touches[0];
			var endX = Number(touch.pageX);
			var endY = Number(touch.pageY);
			var deltaX;
			_options.direct = jsfun.getSlideDirection(startX, startY, endX, endY);
			isMoving = true;
			_me.slidering();
			nextInterval = _options.clickstop;
			getNextCarouselTime(nextInterval);
		}, false);

		_div.addEventListener("touchend", function(ev) {
			nextInterval = _options.interval;
			getNextCarouselTime(nextInterval);
		}, false);

	}
	this.draw = function() {
		getNextCarouselTime();
		isdrawed = false;
		_div.style.whiteSpace = "nowrap";
		_div.style.overflow = "hidden";
		//_div.innerHTML ='<div id="touchBox1div" style="" ><img id="touchBox1" src="ontouch/5.jpg" style="width: 100%; height: 100%;"></div><div id="touchBoxdiv" style="display:inline-block;width:100%;height:100%;" ><img id="touchBox" src="ontouch/1.jpg" style="width: 100%; height: 100%;"></div><div id="touchBox2div"  style="display:inline-block;width:100%;height:100%;" ><img id="touchBox2" src="ontouch/2.jpg" style="width: 100%; height: 100%;"></div>';
		touchBox1div = document.createElement("div");
		touchBox1div.style.cssText = "display:inline-block;width:100%;height:100%;";
		touchBoxdiv = document.createElement("div");
		touchBoxdiv.onclick = tohref;
		touchBoxdiv.style.cssText = "display:inline-block;width:100%;height:100%;";
		touchBox2div = document.createElement("div");
		touchBox2div.style.cssText = "display:inline-block;width:100%;height:100%;";
		touchBox1 = document.createElement("img");
		touchBox1.style.cssText = "width:100%;height:100%;";
		touchBox = document.createElement("img");
		touchBox.style.cssText = "width:100%;height:100%;";
		touchBox2 = document.createElement("img");
		touchBox2.style.cssText = "width:100%;height:100%;";
		touchBox1div.appendChild(touchBox1);
		touchBoxdiv.appendChild(touchBox);
		touchBox2div.appendChild(touchBox2);

		var qindex = getNextIndex(iindex, 2);
		var hindex = getNextIndex(iindex, 4);
		touchBox.src = images[iindex];
		touchBox1.src = images[qindex];
		touchBox.src = images[hindex];
		if (iindex < 0 || iindex > 4) alert(iindex);

		_div.appendChild(touchBox1div);
		_div.appendChild(touchBoxdiv);
		_div.appendChild(touchBox2div);

		var div = document.createElement("div");
		inputs = [];
		for (var i = 0; i < count; i++) {
			var input = document.createElement("input");
			input.type = "radio";
			input.value = i;
			input.onclick = inputclick;
			input.style.zIndex = 1;
			div.appendChild(input);
			inputs.push(input);
		}
		_div.appendChild(div);
		_div.style.zIndex = 1;
		var style = div.style;
		div.style.marginTop = "-30px";
		div.style.width = touchBoxdiv.offsetWidth + "px";
		div.style.textAlign = "center";
		div.style.zIndex = 100;

		addLister();
		setinfo();
		isdrawed = true;
		_me.fresh();
	}
}

function js_my_switch(divid) {
	//开关按钮
	var options = {}; //{cssText:cssText, value: 1/0}
	var pdiv = divid;
	var _div, _me = this;
	var startX = 0;
	startY = 0
	var movedWidth = 2,
		pLeftMargin = 0;
	var width = 0,
		height = 0,
		canmovelength = 0;

	function fndblclick() {
		if (options.value == 1) options.value = 0;
		else options.value = 1;
		_me.fresh();
	}

	function oponstart(ev) {
		ev.stopPropagation();
		startX = ev.touches[0].pageX;
		startY = ev.touches[0].pageY;
		pLeftMargin = jsfun.CLng(_div.style.leftMargin);
	}

	function oponmove(ev) {
		ev.stopPropagation();
		var touch = event.touches[0];
		var endX = touch.pageX;
		var endY = touch.pageY;
		var deltaX, transform;
		var direction = jsfun.getSlideDirection(startX, startY, endX, endY);
		var p = 0;
		switch (direction) {
			case 4: //向左
				deltaX = endX - startX;
				p = pLeftMargin + deltaX;
				if (p < 1) p = 1;
				_div.style.marginLeft = (p) + "px";
				break;
			case 2: //向右
				deltaX = endX - startX;
				p = pLeftMargin + deltaX;
				if (p > canmovelength) p = canmovelength;
				_div.style.marginLeft = (p) + "px";
				break;
			default:
				break;
		}
	}

	function oponend(ev) {
		ev.stopPropagation();
		var endX = ev.changedTouches[0].pageX;
		var endY = ev.changedTouches[0].pageY;
		var direction = jsfun.getSlideDirection(startX, startY, endX, endY);
		var deltaX = endX - startX;
		switch (direction) {
			case 0: //没滑动
				break;
			case 1: //向上
				break;
			case 2: //向右
				if (deltaX < -movedWidth || deltaX > movedWidth) {
					options.value = 1;
					_me.slide();
				}
				break;
			case 3: //向下
				break;
			case 4: //向左
				if (deltaX < -movedWidth || deltaX > movedWidth) {
					options.value = 0;
					_me.slide();
				}
				break;
			default:
				break;
		}
	}

	this.options = function(opts) {
		if (opts) {
			options = opts;
		} else {
			return options;
		}
	}
	this.ctrl = function() {
		return _div;
	}
	this.value = function(val) {
		if (typeof(0) == "number") {
			options.value = ((val) ? 1 : 0);
		} else {
			return options.value;
		}
	}
	this.draw = function() {
		_div = document.createElement("div");
		pdiv.appendChild(_div);
		if (options.cssText) _div.style.cssText = options.cssText;
		var style = _div.style;
		var pstyle = pdiv.style;
		var pwidth, pheight;

		width = jsfun.CLng(style.width) - 10;
		height = jsfun.CLng(style.height);
		pwidth = jsfun.CLng(pstyle.width) - 10;
		pheight = jsfun.CLng(pstyle.height)

		if (pwidth == 0) {
			pwidth = pdiv.offsetWidth;
			pstyle.width = pwidth + "px";
		}
		if (pheight == 0) {
			pheight = pdiv.offsetHeight;
			pstyle.height = pheight + "px";
		}

		if (width < 16) width = 28;
		if (height < 16) height = 28;
		if (width < height) height = width;
		else width = height;
		if (pwidth < width * 2) {
			pwidth = width * 2;
			pstyle.width = pwidth + "px";
		}
		if (pheight < height) {
			pheight = height;
			pstyle.height = pheight + "px";
		}
		style.borderRadius = (height / 2) + "px";
		pstyle.borderRadius = (pheight / 2) + "px";
		canmovelength = pwidth - width - 1;
		_div.addEventListener('touchstart', oponstart, false);
		_div.addEventListener('touchend', oponend, false);
		_div.addEventListener("touchmove", oponmove, false);
		_div.ondblclick = fndblclick;
		this.fresh();
	}
	this.slide = function() {
		var div = _div;
		var val = options.value;
		var i = jsfun.CLng(div.style.marginLeft);
		var val = options.value;
		if (val == 1) {
			i = i + 2;
			if (i >= canmovelength) {
				div.style.marginLeft = (canmovelength) + "px";
				return;
			}
		} else {
			i = i - 2;
			if (i <= 0) {
				div.style.marginLeft = "0px";
				return;
			}
		}
		div.style.marginLeft = i + "px";
		setTimeout(_me.slide, 50);
	}

	this.fresh = function() {
		if (options.value) {
			_div.style.marginLeft = canmovelength + "px";
		} else {
			_div.style.marginLeft = "1px";
		}
	}
}

function js_encrypt_md5() {
	var hexcase = 0;
	var b64pad = "";
	var chrsz = 8;
	this.b32 = function(s) {
		s = String(s);
		return binl2hex(core_md5(str2binl(s), s.length * chrsz));
	}
	this.b64 = function(s) {
		s = String(s);
		return binl2b64(core_md5(str2binl(s), s.length * chrsz));
	}

	function core_md5(x, len) {
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;

		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;

		for (var i = 0; i < x.length; i += 16) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
			d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
			b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
			d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
			c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
			d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
			d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
			a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
			d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
			c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
			b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
			d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
			c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
			d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
			c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
			a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
			d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
			c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
			b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
			a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
			d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
			b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
			d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
			c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
			d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
			a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
			d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
			b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
			a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
			d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
			c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
			d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
			d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
			a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
			d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
			b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return Array(a, b, c, d);
	}

	function md5_cmn(q, a, b, x, s, t) {
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}

	function md5_ff(a, b, c, d, x, s, t) {
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}

	function md5_gg(a, b, c, d, x, s, t) {
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}

	function md5_hh(a, b, c, d, x, s, t) {
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function md5_ii(a, b, c, d, x, s, t) {
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	function safe_add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}

	function bit_rol(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt));
	}

	function str2binl(str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < str.length * chrsz; i += chrsz)
			bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
		return bin;
	}

	function binl2hex(binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
				hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
		}
		return str;
	}

	function binl2b64(binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i += 3) {
			var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
				else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
			}
		}
		return str;
	}
}
var jsFirstPage = new function() {
	var currentpath = jsfun.pagePath(location.href);
	currentpath = jsfun.absPagePath("/../../images", currentpath) + "/";

	var darkenImages = ["icon01.png", "icon02.png", "icon03.png", "icon04.png"];
	var hlightImages = ["icon01_.png", "icon02_.png", "icon03_.png", "icon04_.png"];
	var labelImages = ["icon01_.png", "icon02.png", "icon03.png", "icon04.png"];

	function getNameIndex(lname) {
		if (typeof(lname) == "number") return lname;
		lname = lname.toLowerCase();
		var val = 0;
		switch (lname) {
			case "sy":
				val = 0;
				break;
			case "yiren":
				val = 1;
				break;
			case "order":
				val = 2;
				break;
			case "my":
				val = 3;
				break;
			default:
				val = 0;
				break;
		}
		return val;
	}

	function getIndexID(iindex) {
		var idval = "";
		switch (iindex) {
			case 0:
				idval = "label_yirenpc_sy";
				break;
			case 1:
				idval = "label_yirenpc_yiren";
				break;
			case 2:
				idval = "label_yirenpc_order";
				break;
			case 3:
				idval = "label_yirenpc_user";
				break;
			default:
				idval = "label_yirenpc_sy";
				break;
		}
		return document.getElementById(idval);
	}

	function getCtrlID(lname) {
		var i = lname;
		if (typeof(i) == "string") i = getNameIndex(lname);
		return getIndexID(lname);
	}

	function setImages(iindex) {
		var images = darkenImages.slice();
		images[iindex] = hlightImages[iindex];
		for (var j = 0; j < 4; j++) {
			if (images[j] != labelImages[j]) {
				var obj = getIndexID(j);
				obj.src = currentpath + images[j];
				labelImages[j] = images[j];
			}
		}
	}

	this.highlight = function(labelname) {
		var i = getNameIndex(labelname);
		setImages(i);
	}
	this.clicked = function(labelname) {
		var i = getNameIndex(labelname);
		var o = getIndexID(i);
		var o2 = jsfun.firstParent(o, "A");
		location = o2.href;
	}
	this.show = function() {
		var o = document.getElementById("label_yirenpc_label");
		o.style.display = "block";
	}
	this.hidden = function() {
		var o = document.getElementById("label_yirenpc_label");
		o.style.display = "none";

	}
}
var jsAjax = new function() {
	//version :"1.0.5"; createdate: 2015-3-15 updatedate: 2015-4-11
	var loginURL = _serverURL + "/interface/user/login/login.aspx";
	var randomURL = _serverURL + "/interface/common/random.aspx";

	var jsAjaxMUI = new function() {
		var _me = this;
		this.ajax = function(params) {
			if (params == null) return;
			if (typeof(params) != "object") return;
			if (params.data == null) {
				params.data = {}
			};
			var d = params.data;
			var userid = jsfun.CLng(localStorage.getItem("userid"));
			var token = jsfun.CStr(localStorage.getItem("token"));
			if (userid > 0 && token.length > 8) {
				d.userid = userid;
				d.token = token;
			}
			var dtype = "json";
			if (params.dataType && params.dataType != "json") dtype = "text";
			mui.ajax(params.url, {
				data: d,
				dataType: dtype,
				type: 'post',
				timeout: 10000,
				success: function(data) {
					if (params.cbcall) params.cbcall(1, data);
				},
				error: function(xhr, type, errorThrown) {
					if (params.cbcall) params.cbcall(0, type, xhr);
				}
			});
		}
		this.login = function(params, ismd5) {
			//params {"data":{"username":username, "password":password}, "cbcall":cbcall}
			function getrandom() {
				var p = {};
				p.url = randomURL + "?time=" + time,
					p.data = {
						"info": 1
					};
				p.cbcall = function(msg, data) {
					if (msg == 1) {
						fnLogin(data.random);
					}
				}
				_me.ajax(p);
			}

			function fnLogin(random) {
				var d = params.data;
				var password;
				if (ismd5) {
					password = d.password;
				} else {
					password = jsfun.md5(d.password);
				}
				password = jsfun.md5(random + password);
				var d2 = {
					"username": d.username,
					"password": password
				};
				var url = loginURL + "?time=" + time;

				mui.ajax(url, {
					data: d2,
					dataType: 'json',
					type: 'post',
					timeout: 10000,
					success: function(data) {
						localStorage.setItem("userid", data.userid);
						localStorage.setItem("token", data.token);
						if (params.cbcall) params.cbcall(1, data);
					},
					error: function(xhr, type, errorThrown) {
						if (params.cbcall) params.cbcall(0, type, xhr);
					}
				});
			}

			function fnLogin2() {
				var userid = jsfun.CLng(localStorage.getItem("userid"));
				var token = jsfun.CStr(localStorage.getItem("token"));
				if (userid <= 0 || token.length <= 8) {
					if (params.cbcall) {
						var data = {
							"errnumber": 10001,
							"message": "现在不能用这种方式登录。"
						};
						if (params.cbcall) params.cbcall(0, data);
						return;
					}
				}
				var d2 = {
					"userid": userid,
					"token": token
				};
				var url = loginURL + "?time=" + time;

				mui.ajax(url, {
					data: d2,
					dataType: 'json',
					type: 'post',
					timeout: 10000,
					success: function(data) {
						localStorage.setItem("userid", data.userid);
						localStorage.setItem("token", data.token);
						if (params.cbcall) params.cbcall(1, data);
					},
					error: function(xhr, type, errorThrown) {
						if (params.cbcall) params.cbcall(0, type, xhr);
					}
				});
			}

			//main
			if (params == null) params = {};
			if (params.data == null) params.data = {};
			var time = (new Date()).valueOf();;
			if (params.data.username)
				getrandom();
			else
				fnLogin2();
		}
	}
	var jsAjaxPC = new function() {
		var _params = {};
		var _me = this;
		this.ajax = function(params) {
			if (params == null || params.url == null) return;
			var action = jsfun.pathname(params.url);
			_params[action] = params;
			_jsbrowser.jsonp(params);
		}
		this.login = function(params, ismd5) {
			//params {"data":{"username":username, "password":password}, "cbcall":cbcall}
			if (params == null) params = {};
			if (params.data == null) params.data = {};
			var time = (new Date()).valueOf();
			var isJsonp = jsfun.config.isJsonP;

			function getrandom() {
				var p = {};
				p.url = randomURL + "?time=" + time,
					p.data = {
						"info": 1
					};
				p.cbcall = function(msg, data) {
					if (msg == 1) {
						fnLogin(data.random);
					} else {
						if (params.cbcall) params.cbcall(msg, data);
					}
				}
				_me.ajax(p);
			}

			function fnLogin(random) {
				var d = params.data;
				var password;
				if (ismd5) {
					password = d.password;
				} else {
					password = jsfun.md5(jsfun.CStr(d.password));
				}
				if (!isJsonp) password = jsfun.md5(random + password);
				d.password = password;
				var p = {};
				p.url = loginURL + "?time=" + time;
				p.data = {
					"username": d.username,
					"password": password
				};
				p.cbcall = function(msg, data) {
					if (msg == 1) {
						localStorage.setItem("userid", data.userid);
						localStorage.setItem("token", data.token);
					}
					if (params.cbcall) params.cbcall(msg, data);
				}
				_me.ajax(p);
			}

			function fnLogin2() {
				var d = params.data;
				var userid = jsfun.CLng(localStorage.getItem("userid"));
				var token = jsfun.CStr(localStorage.getItem("token"));
				if (userid <= 0 || token.length <= 8) {
					if (params.cbcall) {
						var data = {
							"errnumber": 10001,
							"message": "现在不能用这种方式登录。"
						};
						if (params.cbcall) params.cbcall(0, data);
						return;
					}
				}
				var d2 = {
					"userid": userid,
					"token": token
				};
				var url = loginURL + "?time=" + time;
				var p = {};
				p.url = loginURL + "?time=" + time;
				p.data = d2;
				p.cbcall = function(msg, data) {
					if (msg == 1) {
						localStorage.setItem("userid", data.userid);
						localStorage.setItem("token", data.token);
					}
					if (params.cbcall) params.cbcall(msg, data);
				}
				_me.ajax(p);
			}

			if (!params.data.username) {
				fnLogin2();
			} else {
				if (isJsonp) {
					fnLogin();
				} else {
					getrandom();
				}
			}
		}
		this.params = function(action) {
			return _params[action];
		}
	}

	this.ajax = function(params) {
		if (window.plus) jsAjaxMUI.ajax(params);
		else jsAjaxPC.ajax(params);
	}

	this.login = function(params) {
		if (window.plus) jsAjaxMUI.login(params);
		else jsAjaxPC.login(params);
	}

	this.params = function(action) {
		return jsAjaxPC.params(action);
	}
}
var yirenPerformPlan = new function() {
	var _initplan = (new Array(49)).join("1");
	var initArray = _initplan.split("");
	this.planChars = initArray;
	this.plan = function(strplan) {
		var o = {}; //0可订时间，1不可订时间
		if (strplan == null || strplan.length != 48) {
			return o;
		}
		var arr;
		if (strplan == null || strplan.length != 48) {
			arr = initArray;
		} else {
			arr = strplan.split("");
		}
		var key = 0;
		for (var i = 8; i < 32; i++) {
			key = 6 + Math.floor(i / 2);
			if (i % 2 == 0) key = key + ":00";
			else key = key + ":30";
			if (arr[i] == 0) {
				if (arr[i - 2] < 2 && arr[i - 1] < 2 && arr[i + 1] < 2 && arr[i + 2] < 2) o[key] = 0;
				else o[key] = 1;
			} else {
				o[key] = 1;
			}
		}
		return o;
	}
}