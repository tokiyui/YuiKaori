$(document).ready(function() {
	$('.ro').rollover();
	
	$(".bk").click(function(e) {
		popup_close();
	});
	
	pagetop_position();
	
	// top
	if($("#top_bg")){
		totalTopImg = $("#top_bg img").length;
		if(totalTopImg > 1){
			window.setInterval(function(){
				topImgChange();
			}, 8000)
		}
	}
	
	$('.info_open').click(function(){
		
		$('.info_open').children('img.btn_open').show();
		$('.info_open').children('img.btn_close').hide();
		
		if($(this).parent().parent().children('.inner').css('display')=='none'){
			//Open
			$('.info_article .inner').slideUp(0);
			$(this).parent().next('div').slideDown('normal', function(){
				if($(this).parent().next('div').has('.jstream-eqPlayer')){
					$(this).delay(500).css({'display':'block'});
					$(this).delay(1000).css({'display':'inline-block'});
				}
			});
			$(this).children('img').eq(0).hide();
			$(this).children('img').eq(1).show();
			var num = $(this).parent().parent().attr("id").split("_")[2];
			var offset =$("#info_article_"+num).offset();
			$('html,body', parent.document).animate({'scrollTop':offset.top}, 300);
			
		}else{
			//Close
			$(this).parent().next('div').slideUp();
		}
	});
	
	
/*
	$('.pulldown').toggle(function () {
		$('ul','.year_select').slideDown();
    }, function() {
		$('ul','.year_select').slideUp();
	});
*/
	$('#year-pulldown').click(function(){
		if($('#year-pulldown').next().css('display')=='block') $('#year-pulldown').next().slideUp();
		else $('#year-pulldown').next().slideDown();
	});
	
	if(document.getElementById("year-pulldown") != null){
		$(document).click(function(ev){
			if ($("#year-pulldown")[0] != ev.target && !$.contains($("#year-pulldown").next()[0], ev.target)) {
				$('#year-pulldown').next().slideUp();
			}

		})
	}
	
	
	if($('#sidebar')){
		var scroll;
		var targetScroll;
		
		var defaultTop = 60;
		$(window).scroll(function(){
		});
		
		window.setInterval(function(){
			scroll = $(document).scrollTop();
			if(scroll != targetScroll){
				
				$("#sidebar").stop();
				if(targetScroll  <  129){
					//$("#sidebar").css({"top": 60+"px"});
					$("#sidebar").animate({"top": "60px"}, 300, "easeOutCubic");
				}else{
					//$("#sidebar").css({"top": ($scroll-60)+"px"});
					$("#sidebar").animate({"top": (targetScroll -60)+"px"}, 300, "easeOutCubic");
				}
				targetScroll = scroll;
			}
		}, 10);
	}
	
	
	//試聴動画用モーダル関連
	$("#modal").css({"opacity":0});
	$(".jstream_modal").css({"opacity":0});
	
	$('.jstream_btn').click(function(){
		if($(this).hasClass('youtube_btn')){
			//youtube の時の動画
			var j_id = $(this).attr('id').split("_");
			var y_id = $("#youtube_"+j_id[2]).attr("yid");
			$("#modal").fadeIn(500);
			$("#youtube_"+j_id[2]).css({'top':(($(window).height()-360)/2)+"px"});
			$("#youtube_"+j_id[2]).html('<iframe width="640" height="360" src="http://www.youtube.com/embed/'+y_id+'" frameborder="0" allowfullscreen></iframe>');
			$("#youtube_"+j_id[2]).show();
		}else{
			//jstreamの時の動画
			$(".jstream_modal").hide();
			var j_id = $(this).attr('id').split("_");
			$("#modal").fadeIn(500);
			$("#jstream_"+j_id[2]).css({'top':(($(window).height()-360)/2)+"px"});
			$("#jstream_"+j_id[2]).show();
		}
		
	});
	$("#modal_bg").click(function(){
		var player_arr = $('#modal>div').not($(this));
		player_arr.each(function(key, value){
			if($(value).css("display")=="block"){
				if($(value).hasClass("youtube_modal")){
					//youtube プレイヤー停止
					$(value).html('');
				}else{
					//jstream プレイヤー停止
					var player_id = $(value).attr("id").split("_")[1];
					player_obj[player_id].accessor.pause()
				}
			}
		});
		modalClose();
	})
	
});

$(window).load(function(){
	//動画用モーダル関連
	$("#modal").hide();
	$(".jstream_modal").hide();
	$("#modal").css({"opacity":1});
	$(".jstream_modal").css({"opacity":1});
	
	//スクロールバー関連
	$(".scroll").mCustomScrollbar({
		scrollInertia: 0,	//スクロール加速度
		mouseWheelPixels: 4,	//スクロール量
		autoHideScrollbar: false,	//マウスオーバーしていないときにスクロールバーを隠すか

		scrollButtons:{
			enable: false,	//ボタンを出すか
			scrollType: "continuous",	//ボタンを押してる間だけ進む
			scrollSpeed: 50,	//ボタンのスクロールスピード
			scrollAmount: 50	//ボタンのスクロール量
			},
		advanced: {
			updateOnContentResize: true,	//自動的にスクロールバーを調整してくれる
			autoScrollOnFocus: true	//フォーカスした場所にスクロールしてくれる
		}
	});
});

// topページ画像変更
var currentTopImg = 1;
var totalTopImg;
function topImgChange(){
	var nextImg = currentTopImg +1;
	if(nextImg > totalTopImg) nextImg = 1;
	
	$("#top_bg #bg_"+currentTopImg).fadeOut(2500, "easeInOutQuad");
	$("#top_bg #bg_"+ nextImg).fadeIn(2500, "easeInOutQuad", function(){
		currentTopImg = nextImg;
	});
}


/*pagetop 位置*/
$(window).bind("scroll", function() {
	pagetop_position();
});

$(window).resize(function(){
	pagetop_position();
});

function pagetop_position(){
	
	scrollHeight = $(document).height();
	scrollPosition = $(window).height() + $(window).scrollTop();
	footHeight = 80;
	
	if ( scrollHeight - scrollPosition  <= footHeight ) {
		$("#pagetop").css({"position":"absolute","bottom": "90px"});
	} else {
		$("#pagetop").css({"position":"fixed","bottom": "10px"});
	}
	
	var w = $(window).width();
	
	if(w>1160){
		$("#pagetop").css({"left": w/2+510});
	}else if(w>1000 && w<1160){
		$("#pagetop").css({"left": w-70});
	}else if(w<1000){
		$("#pagetop").css({"left": 930});
	}
}

function pagetop(){
	$('html,body', parent.document).animate({'scrollTop':0}, 300);
}

function popup_open(){
	$('.bk').show();
	$('.bk').css({'opacity':0});
	$('.bk').fadeTo(500, 0.85);
	
	$('#youtube_area').show();
	$('#youtube_area').css({'opacity':0});
	$('#youtube_area').fadeTo(500, 1);
}

function popup_close(){
	$('.bk').fadeTo(300, 0,function(){
		$('.bk').hide();
	});
	
	$('#youtube_area').fadeTo(300, 0,function(){
		$('#player').html('');
		$('#youtube_area').hide();
	});
}

function youtube_set(id){
	$('#player').html('<iframe width="600" height="338" src="http://www.youtube.com/embed/'+id+'?autoplay=1rel=0" frameborder="0" allowfullscreen></iframe>');
	popup_open();
}


//出演情報リスト
function yui_castinglist_open(id){
	$('#appearance_yui ul.appearance_tab li a').removeClass("current");
	$('#appearance_yui .inner ul').hide();
	
	$('#appearance_yui ul.appearance_tab li.'+id+' a').addClass("current");
	$('#yui_'+id).show();
}


function kaori_castinglist_open(id){
	$('#appearance_kaori ul.appearance_tab li a').removeClass("current");
	$('#appearance_kaori .inner ul').hide();
	
	$('#appearance_kaori ul.appearance_tab li.'+id+' a').addClass("current");
	$('#kaori_'+id).show();
}


//動画閉
function modalClose(){
		$("#modal").fadeOut(300);
		$(".jstream_modal").hide();
}