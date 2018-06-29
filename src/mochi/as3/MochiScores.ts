module mochi {
	export module as3 {
		export class MochiScores extends egret.HashObject {
			public static onCloseHandler:any;
			public static onErrorHandler:any;
			public static boardID:string;

			public constructor()
			{
				super();
				super();
			}

			public static onClose(param1:any = null)
			{
				if(param1 && param1["error"] == true && mochi.as3.MochiScores.onErrorHandler)
				{
					if(param1["errorCode"] == null)
					{
						param1["errorCode"] = "IOError";
					}
					mochi.as3.MochiScores.onErrorHandler;
					mochi.as3.MochiServices.doClose();
					return ;
				}
				mochi.as3.MochiScores.onCloseHandler;
				mochi.as3.MochiServices.doClose();
			}

			public static setBoardID(param1:string)
			{
				mochi.as3.MochiServices.warnID(param1,true);
				mochi.as3.MochiScores.boardID = param1;
				mochi.as3.MochiServices.send("scores_setBoardID",{"boardID":param1});
			}

			public static showLeaderboard(param1:any = null)
			{
				var n:number = <any>NaN;
				var options:any = param1;
				if(options != null)
				{
					delete options["clip"];
					mochi.as3.MochiServices.setContainer();
					mochi.as3.MochiServices.bringToTop();
					if(options["name"] != null)
					{
						if(flash.As3is(options["name"],flash.TextField))
						{
							if(options["name"].text.length > 0)
							{
								options["name"] = options["name"].text;
							}
						}
					}
					if(options["score"] != null)
					{
						if(flash.As3is(options["score"],flash.TextField))
						{
							if(options["score"].text.length > 0)
							{
								options["score"] = options["score"].text;
							}
						}
						else if(flash.As3is(options["score"],mochi.as3.MochiDigits))
						{
							options["score"] = options["score"].value;
						}
						n = flash.trannumber(options["score"]);
						if(<any>!isNaN(n))
						{
							if(<any>!(n == Number.NEGATIVE_INFINITY || n == Number.POSITIVE_INFINITY))
							{
								if(Math.floor(n) != n)
									{}
								options["score"] = n;
							}
						}
					}
					if(options["onDisplay"] != null)
					{
						options["onDisplay"]();
					}
					else if(mochi.as3.MochiServices.clip != null)
					{
						if(flash.As3is(mochi.as3.MochiServices.clip,egret.SwfMovie))
						{
							mochi.as3.MochiServices.clip["stop"]();
						}
					}
				}
				else
				{
					options = {};
					if(flash.As3is(mochi.as3.MochiServices.clip,egret.SwfMovie))
					{
						mochi.as3.MochiServices.clip["stop"]();
					}
				}
				if(options["onClose"] != null)
				{
					mochi.as3.MochiScores.onCloseHandler = options["onClose"];
				}
				else
				{
					mochi.as3.MochiScores.onCloseHandler = function ()
					{
						if(flash.As3is(mochi.as3.MochiServices.clip,egret.SwfMovie))
						{
							mochi.as3.MochiServices.clip["play"]();
						}
					};
				}
				if(options["onError"] != null)
				{
					mochi.as3.MochiScores.onErrorHandler = options["onError"];
				}
				else
				{
					mochi.as3.MochiScores.onErrorHandler = null;
				}
				if(options["boardID"] == null)
				{
					if(mochi.as3.MochiScores.boardID != null)
					{
						options["boardID"] = mochi.as3.MochiScores.boardID;
					}
				}
				mochi.as3.MochiServices.warnID(options["boardID"],true);
				mochi.as3.MochiServices.send("scores_showLeaderboard",{"options":options},null,mochi.as3.MochiScores.onClose);
			}

			public static closeLeaderboard()
			{
				mochi.as3.MochiServices.send("scores_closeLeaderboard");
			}

			public static getPlayerInfo(param1:any,param2:any = null)
			{
				mochi.as3.MochiServices.send("scores_getPlayerInfo",null,param1,param2);
			}

			public static submit(param1:number,param2:string,param3:any = null,param4:any = null)
			{
				param1 = flash.trannumber(param1);
				if(<any>!isNaN(param1))
				{
					if(<any>!(param1 == Number.NEGATIVE_INFINITY || param1 == Number.POSITIVE_INFINITY))
					{
						if(Math.floor(param1) != param1)
							{}
						param1 = flash.trannumber(param1);
					}
				}
				mochi.as3.MochiServices.send("scores_submit",{"score":param1,"name":param2},param3,param4);
			}

			public static requestList(param1:any,param2:any = null)
			{
				mochi.as3.MochiServices.send("scores_requestList",null,param1,param2);
			}

			public static scoresArrayToObjects(param1:any):any
			{
				var _loc3_:number = <any>NaN;
				var _loc4_:number = <any>NaN;
				var _loc5_:any = <any>null;
				var _loc6_:any = <any>null;
				var _loc7_:any = null;
				var _loc8_:any = null;
				var _loc2_:any = {};
				for(_loc7_ in param1)
				{
					if(typeof param1[_loc7_] == "object")
					{
						if(param1[_loc7_].cols != null && param1[_loc7_].rows != null)
						{
							_loc2_[_loc7_] = [];
							_loc5_ = param1[_loc7_];
							_loc4_ = 0;
							while(_loc4_ < _loc5_["rows"].length)
							{
								_loc6_ = {};
								_loc3_ = 0;
								while(_loc3_ < _loc5_["cols"].length)
								{
									_loc6_[_loc5_["cols"][_loc3_]] = _loc5_["rows"][_loc4_][_loc3_];
									_loc3_++;
								}
								_loc2_[_loc7_].push(_loc6_);
								_loc4_++;
							}
						}
						else
						{
							_loc2_[_loc7_] = {};
							for(_loc8_ in param1[_loc7_])
							{
								_loc2_[_loc7_][_loc8_] = param1[_loc7_][_loc8_];
							}
						}
					}
					else
					{
						_loc2_[_loc7_] = param1[_loc7_];
					}
				}
				return _loc2_;
			}

		}
	}
}

