var menu_flg = 0;

$(function(){
	$('.pageTop').hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.pageTop').fadeIn();
		} else {
			$('.pageTop').fadeOut();
		}
	});

	// scroll body to 0px on click
	$('.pageTop a').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	//$("body").append('<div id="cover"></div>');
	$(".spHeader .menu a").click(function(){
		if(menu_flg==0){
			$(".spInner,#cover").show();
			menu_flg=1;
		}else if(menu_flg==1){
			$(".spInner,#cover").hide();
			menu_flg=0;
		}
		return false;
	});
	$(".spInner .close").click(function(){
		$(".spInner,#cover").hide();
		menu_flg=0;
		return false;
	});
	
	$(".spHeader .btn a").click(function(){
		$(this).toggleClass("open");
		$(".spHeader .btnBox").toggle();
		return false;
	});
	$(".spHeader .btnBox .closeImg a").click(function(){
		$(".spHeader .btn a").removeClass("open");
		$(".spHeader .btnBox").hide();
		return false;
	});
});

function pcmode(type,elm){
	if(type == 'pc'){
		$('body').addClass('pcmode');$('body').removeClass('spmode');
	}else{
		$('body').removeClass('pcmode');
	}
	$(elm).addClass('on').siblings().removeClass('on');
}

function spmode(type,elm){
	if(type == 'sp'){
		$('body').addClass('spmode');$('body').removeClass('pcmode');
	}else{
		$('body').removeClass('spmode');
	}
	$(elm).addClass('on').siblings().removeClass('on');
}