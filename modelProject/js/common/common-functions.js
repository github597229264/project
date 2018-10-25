/**
 * 公共方法
 */
;(function(){
    //默认参数
  	var _options = {};
  	/**
  	 * 按照参数名获取参数值
  	 * @param {Object} name
  	 */
	function getQueryParam(name) {
		var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return unescape(r[2]);
		} else {
			return null;
		}
	}
    var _plugin_api = {
    	/**
    	 * 按照参数名称，获取获取浏览器地址栏的参数值
    	 * @param {String} paramName = 参数名
    	 * @return {String} paramValue = 参数对应值/"参数化异常"
    	 */
    	getQueryParam:function(paramName){
    		var paramValue = "";
    		if(paramName.length <= 0 || paramName == null || paramName == undefined){
    			paramValue = "参数异常";
    		}else{
    			paramValue = getQueryParam(paramName);	
    		}
    		return paramValue;
    	}
    };
 	//插件的名称
    this.commonFunctions = _plugin_api;
})();
