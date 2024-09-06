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

$(function(){
	windowWidth = $('#container').width();
	
	if(windowWidth > 736) {
		$(window).bind("scroll", function() {
			if ($(this).scrollTop() > 100) { 
				$("#pagetop").fadeIn();
			} else {
				$("#pagetop").fadeOut();
			}
			
			scrollHeight = $(document).height();
			scrollPosition = $(window).height() + $(window).scrollTop();
			footHeight = $("#footer").height();;
	
			if ( scrollHeight - scrollPosition  <= footHeight ) {
				$("#pagetop a").css({"position":"absolute","bottom": "20px"});
			} else {
				$("#pagetop a").css({"position":"fixed","bottom": "20px"});
			}
		});
	}
	
	
   // #で始まるアンカーをクリックした場合に処理
   //$('a[href^=#]').click(function() {
   $('#nav ul li a').click(function() {
      // スクロールの速度
      var speed = 500; // ミリ秒
      // アンカーの値取得
      var href= $(this).attr("href");
      // 移動先を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top;
      
      // スムーススクロール
      $('body,html').animate(
      	{scrollTop:position},
      	{duration: speed,
      	 easing: 'swing'
      	});
      $('#menu_btn').toggleClass('open');
      $('#nav').toggleClass('visible');
      return false;
   });
   
   $('a.scroll').click(function() {
      // スクロールの速度
      var speed = 500; // ミリ秒
      // アンカーの値取得
      var href= $(this).attr("href");
      // 移動先を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top;
      
      // スムーススクロール
      $('body,html').animate(
      	{scrollTop:position},
      	{duration: speed,
      	 easing: 'swing'
      	});
      return false;
   });
   
   $('#menu_btn').click(function(){
	   /*$('#nav').slideToggle();*/
	   $(this).toggleClass('open');
	   $('#nav').toggleClass('visible');
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