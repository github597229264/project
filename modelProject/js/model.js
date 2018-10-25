$(document).ready(function() {
	var Top = "<img src='./images/zhiding.png' class='back_top' />";
	$(".back-to-top").append(Top);
	/*
	 * 监听  window  的滚动事件
	 */
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		var backToTop = $(".back-to-top");
		if(scrollTop > 100) {
			backToTop.fadeIn(1000);
		} else {
			backToTop.fadeOut(1000);
		}
	});
	/*
	 * 监听  “返回顶部按钮”  的点击事件
	 */
	$(".back-to-top").click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
	$("img.lazy").lazyload({effect: "fadeIn",threshold: 150});//图片懒加载
	/**
	 * 监听 问题列表  的点击事件 解决点击事件和滑动事件冲突的问题
	 */
	$("ul li section").tap(function(){
		var answerList = $("ul li").children(".answer");
		var iconShang = $("ul li").find(".nnfd-jiantoushang");
		var curriconSpan = $(this).find(".iconfont");
		var currAnswer = $(this).next(".answer");
		if(currAnswer.css("display") == "block"){
			answerList.hide();
			currAnswer.hide();
			curriconSpan.removeClass("nnfd-jiantoushang").addClass("nnfd-jiantouxia");
		}else{
			answerList.hide();
			currAnswer.show();
			iconShang.removeClass("nnfd-jiantoushang").addClass("nnfd-jiantouxia");
			curriconSpan.removeClass("nnfd-jiantouxia").addClass("nnfd-jiantoushang");
		}
	});
	/**
	 * 监听 返回 按钮的点击事件
	 */
	$(".agentBack").on("click",function(){
		var appMethodObj = {
			iosMethod:"callBack",//调用ios方法名
			callAndroid:function(str){ //android执行方法 （传入参数字符串）
				window.moumou.callBack(str);
			},
			methodInfo:{
				name:"back", //方法字段  必传参数
				value:"gobackApp" // 方法对应内容   必传参数
			},
			params:[
				{
					param:"type", //android或者ios方法执行类型 ：  type = 1 执行一般页面返回   type = 2 执行支付的返回
					value :1
				}
			]
		};
		JAA_Plugin.runAppMethod(appMethodObj);
	})
});
