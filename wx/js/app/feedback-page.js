(function(mui, window, document, undefined) {
	mui.init();
	var get = function(id) {
		return document.getElementById(id);
	};
	var qsa = function(sel) {
		return [].slice.call(document.querySelectorAll(sel));
	};
	var ui = {
		title: get('title'),
		question: get('question'),
		imageList: get('image-list'),
		submit: get('submit')
	};
	ui.clearForm = function() {
		ui.title.value = '';
		ui.question.value = '';
		ui.imageList.innerHTML = '';
		ui.newPlaceholder();
	};
	ui.getFileInputArray = function() {
		return [].slice.call(ui.imageList.querySelectorAll('input[type="file"]'));
	};
	ui.getFileInputIdArray = function() {
		var fileInputArray = ui.getFileInputArray();
		var idArray = [];
		fileInputArray.forEach(function(fileInput) {
			console.log(ui.getFileInputArray())
			console.log(fileInputArray)
			if (fileInput.value != '') {
				idArray.push(fileInput.getAttribute('id'));
			}
		});
		return idArray;
	};
	var imageIndexIdNum = 0;
	ui.newPlaceholder = function() {
		var fileInputArray = ui.getFileInputArray();
		if (fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		}
		imageIndexIdNum++;
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		closeButton.addEventListener('click', function(event) {
			event.stopPropagation();
			event.cancelBubble = true;
			setTimeout(function() {
				ui.imageList.removeChild(placeholder);
			}, 0);
			return false;
		}, false);
		var fileInput = document.createElement('input');
		fileInput.setAttribute('type', 'file');
		fileInput.setAttribute('accept', 'image/*');
		fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
		fileInput.setAttribute('name', 'UpImg[]');
		fileInput.addEventListener('change', function(event) {
			var file = fileInput.files[0];
			console.log(JSON.stringify(fileInput.files))
			if (file) {
				var reader = new FileReader();
				reader.onload = function() {
					//处理 android 4.1 兼容问题
					var base64 = reader.result.split(',')[1];
					var dataUrl = 'data:image/png;base64,' + base64;
					//
					placeholder.style.backgroundImage = 'url(' + dataUrl + ')';
				}
				reader.readAsDataURL(file);
				placeholder.classList.remove('space');
				ui.newPlaceholder();
			}
		}, false);
		placeholder.appendChild(closeButton);
		placeholder.appendChild(fileInput);
		ui.imageList.appendChild(placeholder);
	};
	ui.upload = function() {
		var options = {
			beforeSubmit: function(formData, jqForm, options) {
				console.log(JSON.stringify(formData));
				console.log(jqForm);
				console.log(JSON.stringify(options));
			},
			dataType: "json",
			success: function(data) {
				console.log(JSON.stringify(data));
				if (data.status ) {
					plus.nativeUI.toast("晒单成功");
					mui.openWindow({
						url: "IndexHead.html",
						id: "Success.html",
						extras: {
							Address: "Success.html",
							wName: "晒单成功"
						}
					});
				} else {
					plus.nativeUI.toast(data.message);
				}
			},
			error: function(XmlHttpRequest, textStatus, errorThrown) {
				plus.nativeUI.toast("晒单失败");
				console.log(JSON.stringify(XmlHttpRequest));
				console.log(JSON.stringify(textStatus));
				console.log(JSON.stringify(errorThrown));
			}
		};
		$("#ImgUpload").ajaxForm(options);
	} 
	ui.newPlaceholder();
	ui.upload();

})(mui, window, document, undefined);