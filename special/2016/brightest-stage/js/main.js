$(document).ready(function() {
	$('.ro').rollover();
	
	key = getUrlVars();
	if(key == "view_pc"){
		$("head").append("<meta name='viewport' content='width=1100' />");
		
		if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
			$('#btnSP').css({"display":"block"});
		}else {
        	$('#btnSP').css({"display":"none"});
        }
	}else{
		$("head").append("<meta name='viewport' content='width=device-width,user-scalable=no,maximum-scale=1' />");
		$('#btnSP').css({"display":"none"});
	}
});

$(window).load(function(){

});

$(window).on("orientationchange",function(){
	location.reload();
});

// page Topフェードイン・アウト
$(function(){
	$(window).bind("scroll", function() {
	if ($(this).scrollTop() > 100) { 
		$("#pagetop").fadeIn();
	} else {
		$("#pagetop").fadeOut();
	}
	// ドキュメントの高さ
	scrollHeight = $(document).height();
	// ウィンドウの高さ+スクロールした高さ→ 現在のトップからの位置
	scrollPosition = $(window).height() + $(window).scrollTop();
	// フッターの高さ
	footHeight = $("#footer").height();;
	
	// スクロール位置がフッターまで来たら
	if ( scrollHeight - scrollPosition  <= footHeight ) {
		// ページトップリンクをフッターに固定
		$("#pagetop a").css({"position":"absolute","bottom": "20px"});
	} else {
		// ページトップリンクを右下に固定
		$("#pagetop a").css({"position":"fixed","bottom": "20px"});
		}
	});
});


$(function(){
   // #で始まるアンカーをクリックした場合に処理
   $('a[href^=#]').click(function() {
      // スクロールの速度
      var speed = 500; // ミリ秒
      // アンカーの値取得
      var href= $(this).attr("href");
      // 移動先を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      if($(window).width()<769){
      	var position = target.offset().top;
      }else{
	    var position = target.offset().top -100;
      }
      // スムーススクロール
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
});

function getUrlVars(){
	var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    var id = "0";
    if(vars.key){
	    id = vars.key;
    }
            	
    if(id.match(/^[a-zA-Z0-9_]+$/)){
        return id;
    }else{
	    //error
	    return "";
	}
}