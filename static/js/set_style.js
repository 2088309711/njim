$(function() {

	// 关闭颜色面板
	$('#color-panel-bg,#close-color-panel,#close-color-panel-button').click(
			closeColorPanel);

	// 选取颜色
	$("#color-box .item").click(function() {
		var color = $(this).attr("sel_color");
		$("#main-color-input").val(color);
		closeColorPanel();
		updateIconColor();
	});

	$("#default-style").click(function() {
		$("input[name='iconStyle']").get(0).checked = true;
		$("#main-color-input").val("00cab7");
		updateIconColor();
	});

	// 打开颜色面板
	$('#main-color-show').click(function() {
		$("#color-panel-bg").fadeIn();
	})

	// 关闭提示
	$('#close-tips').click(function() {
		$('#tips').addClass('hidden');
	});

})

// 关闭颜色面板
function closeColorPanel() {
	$('#color-panel-bg').fadeOut();
}

// 修改显示颜色
function updateIconColor() {
	var mainColor = $("#main-color-input").val();
	if (mainColor.length == 3 || mainColor.length == 6) {
		$("#main-color-show").css("background-color", "#" + mainColor);
	}
}

function showAlert(text) {
	$('#alert-text').text(text);
	$('#alert').removeClass('hidden');
}

function hideAlert() {
	$('#alert-text').text('');
	$('#alert').addClass('hidden');
}

function ckForm() {

	// 检查风格 iconStyle
	var iconStyle = $("input:radio[name='iconStyle']:checked").val();
	if (!iconStyle) {
		showAlert("请选择图标风格");
		return false;
	} else {
		hideAlert();
	}

	// 检查主题色
	var mainColor = $("#main-color-input").val();
	if (mainColor.length != 3 && mainColor.length != 6) {
		showAlert("请选取或正确输入主题色");
		return false;
	} else {
		hideAlert();
	}

	return true;

}
