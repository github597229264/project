/**
 * 配置文件
 */
;(function(){
    //默认参数
  	var _options = {
 	    origin:"",//域名
 	    appId:'',
 	    htmlOrigin:'',//网页服务器地址
 	    imgOrigin:''//图片服务器地址
 	};
 	//识别运行环境中的是正式/测试服务器
 	function discernOrigin(){
		// 主机地址的获取
		var origin_href = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
		//请求地址
		if(window.location.host.indexOf('teststatic') > -1) {
			_options.origin = "https://test1.mouchina.com"; //测试
			_options.appId = "wxe2faf1f42fa296f7";
			_options.htmlOrigin = "https://teststatic.mouchina.com";
		} else {
			_options.origin = "https://gw3.mouchina.com"; //正式
			_options.appId = "wx04c4311f0bc5f53f";
			_options.htmlOrigin = "https://static.mouchina.com";
		}
 	};
 	discernOrigin();
    var _plugin_api = {
    	origin:_options.origin,
    	htmlOrigin:_options.htmlOrigin,
    	imgOrigin:_options.imgOrigin,
    	appId:_options.appId
    };
 	//插件的名称
    this.commonConfig = _plugin_api;
})();
