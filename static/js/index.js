var scrollHeight = 0;

$(function() {
	$(window).scroll(function() {

		var scrollNow = $(document).scrollTop();

		// 到顶了
		if (scrollNow < 10) {
			log("succ");
			$("#header").css({
				"background" : "none",
				"top" : "0"
			});
		}

		// 下移
		if (scrollNow > scrollHeight + 10) {
			$("#header").css({

				"top" : "-50px"
			});
			scrollHeight = scrollNow;
		}

		// 上移
		if (scrollNow < scrollHeight - 10 && scrollNow > 10) {
			$("#header").css({
				"background" : "#5bbbee",
				"top" : "0"
			});
			scrollHeight = scrollNow;
		}

	});
});

function log(obj) {

	console.log(obj);

}
