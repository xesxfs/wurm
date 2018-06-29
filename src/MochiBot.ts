 class MochiBot extends egret.Sprite {

	public constructor()
	{
		super();
	}

	public static track(param1:egret.Sprite,param2:string):MochiBot
	{
		if(flash.Security["sandboxType"] == "localWithFile")
		{
			return null;
		}
		var _loc3_:MochiBot = new MochiBot();
		param1.addChild(_loc3_);
		flash.Security["allowDomain"]("*");
		flash.Security["allowInsecureDomain"]("*");
		var _loc4_:string = "http://core.mochibot.com/my/core.swf";
		var _loc5_:egret.URLVariables = new egret.URLVariables();
		_loc5_["sb"] = flash.Security["sandboxType"];
		_loc5_["v"] = flash.Capabilities.version;
		_loc5_["swfid"] = param2;
		_loc5_["mv"] = "8";
		_loc5_["fv"] = "9";
		var _loc6_:string = _loc3_.root["loaderInfo"].loaderURL;
		if(_loc6_.indexOf("http") == 0)
		{
			_loc5_["url"] = _loc6_;
		}
		else
		{
			_loc5_["url"] = "local";
		}
		var _loc7_:egret.URLRequest = new egret.URLRequest(_loc4_);
		_loc7_.contentType = "application/x-www-form-urlencoded";
		_loc7_.method = egret.URLRequestMethod.POST;
		_loc7_.data = _loc5_;
		var _loc8_:flash.Loader = new flash.Loader();
		_loc3_.addChild(_loc8_);
		_loc8_.load(_loc7_);
		return _loc3_;
	}

}

flash.extendsClass("MochiBot","egret.Sprite")
