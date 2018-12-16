var bannerAutoClick;

$(function() {
	document.getElementById('banner') && bannerLoad();
})

function bannerLoad() {
	var list = $('#banner li');

	list.eq(0).addClass('on');

	true && document.getElementById('video').play();

	$('#banner').click(function() {
		bannerAutoClick && clearTimeout(bannerAutoClick);

		var on = $('#banner li.on').index();

		((on += 1) > list.length - 1) && (on = 0);

		if (on === 0) {
			$('.video').addClass('low');
			document.getElementById('video').playbackRate = 0.6;
		} else {
			$('.video').removeClass('low');
			document.getElementById('video').playbackRate = 1;
		}

		list.removeClass('on').eq(on).addClass('on');

		setBannerTime();
	});

	setBannerTime();
}

function setBannerTime() {
	bannerAutoClick = setTimeout(function() {
		$('#banner').click();
	}, 6000);
}