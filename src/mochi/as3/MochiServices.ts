module mochi {
	export module as3 {
		export class MochiServices extends egret.HashObject {
			public static CONNECTED:string;
			public static _id:string;
			public static _container:any;
			public static _clip:egret.SwfMovie;
			public static _loader:flash.Loader;
			public static _timer:egret.Timer;
			public static _preserved:any;
			public static _servURL:string;
			public static _services:string;
			public static _mochiLC:string;
			public static _swfVersion:string;
			public static _listenChannelName:string;
			public static _sendChannel:flash.LocalConnection;
			public static _sendChannelName:string;
			public static _connecting:boolean;
			public static _connected:boolean;
			public static netup:boolean;
			public static netupAttempted:boolean;
			public static onError:any;
			public static widget:boolean;
			public static _mochiLocalConnection:egret.SwfMovie;
			public static _queue:Array<any>;
			public static _nextCallbackID:number = NaN;
			public static _callbacks:any;
			public static _dispatcher:mochi.as3.MochiEventDispatcher;

			public constructor()
			{
				super();
				super();
			}

			public static get id():string
			{
				return mochi.as3.MochiServices._id;
			}

			public static get clip():any
			{
				return mochi.as3.MochiServices._container;
			}

			public static get childClip():any
			{
				return mochi.as3.MochiServices._clip;
			}

			public static getVersion():string
			{
				return "4.0 as3";
			}

			public static allowDomains(param1:string):string
			{
				var _loc2_:string = <any>null;
				if(flash.Security["sandboxType"] != "application")
				{
					flash.Security["allowDomain"]("*");
					flash.Security["allowInsecureDomain"]("*");
				}
				if(param1.indexOf("http://") != -1)
				{
					_loc2_ = param1.split("/")[2].split(":")[0];
					if(flash.Security["sandboxType"] != "application")
					{
						flash.Security["allowDomain"](_loc2_);
						flash.Security["allowInsecureDomain"](_loc2_);
					}
				}
				return _loc2_;
			}

			public static isNetworkAvailable():boolean
			{
				return flash.Security["sandboxType"] != "localWithFile";
			}

			public static set comChannelName(param1:string)
			{
				if(param1 != null)
				{
					if(param1.length > 3)
					{
						mochi.as3.MochiServices._sendChannelName = param1 + "_fromgame";
						mochi.as3.MochiServices.initComChannels();
					}
				}
			}

			public static get connected():boolean
			{
				return mochi.as3.MochiServices._connected;
			}

			public static warnID(param1:string,param2:boolean)
			{
				param1 = param1.toLowerCase();
				if(param1.length != 16)
				{
					return ;
				}
				if(param1 == "1e113c7239048b3f")
				{
					if(<any>!param2)
						{}
					return ;
				}
				if(param1 == "84993a1de4031cd8")
				{
					if(<any>!param2)
						{}
					return ;
				}
				var _loc3_:number = <any>0;
				loop0:
				while(true)
				{
					if(_loc3_ >= param1.length)
					{
						return ;
					}
					switch(param1.charAt(_loc3_))
					{
					case "0" :
					case "1" :
					case "2" :
					case "3" :
					case "4" :
					case "5" :
					case "6" :
					case "7" :
					case "8" :
					case "9" :
					case "a" :
					case "b" :
					case "c" :
					case "d" :
					case "e" :
					case "f" :
						_loc3_++;
						continue;
					default :
						break loop0;
					}
				}
			}

			public static connect(param1:string,param2:any,param3:any = null)
			{
				var id:string = param1;
				var clip:any = param2;
				var onError:any = param3;
				mochi.as3.MochiServices.warnID(id,false);
				if(onError != null)
				{
					mochi.as3.MochiServices.onError = onError;
				}
				else if(mochi.as3.MochiServices.onError == null)
				{
					mochi.as3.MochiServices.onError = function (param1:string)
					{
					};
				}
				if(flash.As3is(clip,egret.DisplayObject))
				{
					if(clip["stage"] == null)
						{}
					if(<any>!mochi.as3.MochiServices._connected && mochi.as3.MochiServices._clip == null)
					{
						mochi.as3.MochiServices._connecting = true;
						mochi.as3.MochiServices.init(id,clip);
					}
				}
			}

			public static disconnect()
			{
				if(mochi.as3.MochiServices._connected || mochi.as3.MochiServices._connecting)
				{
					if(mochi.as3.MochiServices._clip != null)
					{
						if(mochi.as3.MochiServices._clip.parent != null)
						{
							if(flash.As3is(mochi.as3.MochiServices._clip.parent,egret.Sprite))
							{
								(<egret.Sprite>(mochi.as3.MochiServices._clip.parent)).removeChild(mochi.as3.MochiServices._clip);
								mochi.as3.MochiServices._clip = null;
							}
						}
					}
					mochi.as3.MochiServices._connecting = mochi.as3.MochiServices._connected = false;
					mochi.as3.MochiServices.flush(true);
					try 
					{
						mochi.as3.MochiServices._mochiLocalConnection["close"]();
					}
					catch(error)
					{}
				}
				if(mochi.as3.MochiServices._timer != null)
				{
					try 
					{
						mochi.as3.MochiServices._timer.stop();
						mochi.as3.MochiServices._timer.removeEventListener(egret.TimerEvent.TIMER,mochi.as3.MochiServices.connectWait,null);
						mochi.as3.MochiServices._timer = null;
						return ;
					}
					catch(error)
					{
						return ;
					}
				}
			}

			public static stayOnTop()
			{
				mochi.as3.MochiServices._container["addEventListener"](egret.Event.ENTER_FRAME,mochi.as3.MochiServices.bringToTop,false,0,true);
				if(mochi.as3.MochiServices._clip != null)
				{
					mochi.as3.MochiServices._clip.visible = true;
				}
			}

			public static doClose()
			{
				mochi.as3.MochiServices._container["removeEventListener"](egret.Event.ENTER_FRAME,mochi.as3.MochiServices.bringToTop);
			}

			public static bringToTop(param1:egret.Event = null)
			{
				var e:egret.Event = param1;
				if(mochi.as3.MochiServices.clip != null && mochi.as3.MochiServices.childClip != null)
				{
					try 
					{
						if(mochi.as3.MochiServices.clip["numChildren"] > 1)
						{
							mochi.as3.MochiServices.clip["setChildIndex"](mochi.as3.MochiServices.childClip,mochi.as3.MochiServices.clip["numChildren"] - 1);
						}
						return ;
					}
					catch(errorObject)
					{
						mochi.as3.MochiServices._container["removeEventListener"](egret.Event.ENTER_FRAME,mochi.as3.MochiServices.bringToTop);
						return ;
					}
				}
			}

			private static init(param1:string,param2:any)
			{
				mochi.as3.MochiServices._id = param1;
				if(param2 != null)
				{
					mochi.as3.MochiServices._container = param2;
					mochi.as3.MochiServices.loadCommunicator(param1,mochi.as3.MochiServices._container);
				}
			}

			public static setContainer(param1:any = null,param2:boolean = true)
			{
				if(mochi.as3.MochiServices._clip.parent)
				{
					mochi.as3.MochiServices._clip.parent.removeChild(mochi.as3.MochiServices._clip);
				}
				if(param1 != null)
				{
					if(flash.As3is(param1,egret.DisplayObjectContainer))
					{
						mochi.as3.MochiServices._container = param1;
					}
				}
				if(param2)
				{
					if(flash.As3is(mochi.as3.MochiServices._container,egret.DisplayObjectContainer))
					{
						(<egret.DisplayObjectContainer>(mochi.as3.MochiServices._container)).addChild(mochi.as3.MochiServices._clip);
					}
				}
			}

			private static loadCommunicator(param1:string,param2:any):egret.SwfMovie
			{
				if(mochi.as3.MochiServices._clip != null)
				{
					return mochi.as3.MochiServices._clip;
				}
				if(<any>!mochi.as3.MochiServices.isNetworkAvailable())
				{
					mochi.as3.MochiServices.onError;
					return null;
				}
				if(mochi.as3.MochiServices.urlOptions(param2)["servURL"])
				{
					mochi.as3.MochiServices._servURL = mochi.as3.MochiServices.urlOptions(param2)["servURL"];
				}
				var _loc3_:string = mochi.as3.MochiServices._servURL + mochi.as3.MochiServices._services;
				if(mochi.as3.MochiServices.urlOptions(param2)["servicesURL"])
				{
					_loc3_ = mochi.as3.MochiServices.urlOptions(param2)["servicesURL"];
				}
				mochi.as3.MochiServices._listenChannelName = mochi.as3.MochiServices._listenChannelName + (Math.floor(new flash.As3Date().time) + "_" + Math.floor(Math.random() * 99999));
				mochi.as3.MochiServices.allowDomains(_loc3_);
				mochi.as3.MochiServices._clip = new egret.SwfMovie();
				mochi.as3.MochiServices.loadLCBridge(mochi.as3.MochiServices._clip);
				mochi.as3.MochiServices._loader = new flash.Loader();
				mochi.as3.MochiServices._loader.contentLoaderInfo.addEventListener(egret.Event.COMPLETE,mochi.as3.MochiServices.detach,null);
				mochi.as3.MochiServices._loader.contentLoaderInfo.addEventListener(egret.IOErrorEvent.IO_ERROR,mochi.as3.MochiServices.detach,null);
				mochi.as3.MochiServices._loader.contentLoaderInfo.addEventListener(egret.IOErrorEvent.IO_ERROR,mochi.as3.MochiServices.loadError,null);
				var _loc4_:egret.URLRequest = new egret.URLRequest(_loc3_);
				var _loc5_:egret.URLVariables = new egret.URLVariables();
				_loc5_["listenLC"] = mochi.as3.MochiServices._listenChannelName;
				_loc5_["mochiad_options"] = param2["loaderInfo"].parameters.mochiad_options;
				_loc5_["api_version"] = mochi.as3.MochiServices.getVersion();
				if(mochi.as3.MochiServices.widget)
				{
					_loc5_["widget"] = true;
				}
				_loc4_.data = _loc5_;
				mochi.as3.MochiServices._loader.load(_loc4_);
				mochi.as3.MochiServices._clip.addChild(mochi.as3.MochiServices._loader);
				mochi.as3.MochiServices._sendChannel = new flash.LocalConnection();
				mochi.as3.MochiServices._queue = [];
				mochi.as3.MochiServices._nextCallbackID = 0;
				mochi.as3.MochiServices._callbacks = {};
				mochi.as3.MochiServices._timer = new egret.Timer(10000,1);
				mochi.as3.MochiServices._timer.addEventListener(egret.TimerEvent.TIMER,mochi.as3.MochiServices.connectWait,null);
				mochi.as3.MochiServices._timer.start();
				return mochi.as3.MochiServices._clip;
			}

			private static detach(param1:egret.Event)
			{
				var _loc2_:flash.LoaderInfo = (<flash.LoaderInfo>(param1.target));
				_loc2_.removeEventListener(egret.Event.COMPLETE,mochi.as3.MochiServices.detach,null);
				_loc2_.removeEventListener(egret.IOErrorEvent.IO_ERROR,mochi.as3.MochiServices.detach,null);
				_loc2_.removeEventListener(egret.Event.COMPLETE,mochi.as3.MochiServices.loadLCBridgeComplete,null);
				_loc2_.removeEventListener(egret.IOErrorEvent.IO_ERROR,mochi.as3.MochiServices.loadError,null);
			}

			private static loadLCBridge(param1:any)
			{
				var _loc2_:flash.Loader = new flash.Loader();
				var _loc3_:string = mochi.as3.MochiServices._servURL + mochi.as3.MochiServices._mochiLC;
				var _loc4_:egret.URLRequest = new egret.URLRequest(_loc3_);
				_loc2_.contentLoaderInfo.addEventListener(egret.Event.COMPLETE,mochi.as3.MochiServices.detach,null);
				_loc2_.contentLoaderInfo.addEventListener(egret.IOErrorEvent.IO_ERROR,mochi.as3.MochiServices.detach,null);
				_loc2_.contentLoaderInfo.addEventListener(egret.Event.COMPLETE,mochi.as3.MochiServices.loadLCBridgeComplete,null);
				_loc2_.contentLoaderInfo.addEventListener(egret.IOErrorEvent.IO_ERROR,mochi.as3.MochiServices.loadError,null);
				_loc2_.load(_loc4_);
				param1["addChild"](_loc2_);
			}

			private static loadLCBridgeComplete(param1:egret.Event)
			{
				var _loc2_:flash.Loader = (<flash.LoaderInfo>(param1.target)).loader;
				mochi.as3.MochiServices._mochiLocalConnection = (<egret.SwfMovie>(_loc2_.content));
				mochi.as3.MochiServices.listen();
			}

			private static loadError(param1:any)
			{
				mochi.as3.MochiServices._clip["_mochiad_ctr_failed"] = true;
				mochi.as3.MochiServices.disconnect();
				mochi.as3.MochiServices.onError;
			}

			public static connectWait(param1:egret.TimerEvent)
			{
				if(<any>!mochi.as3.MochiServices._connected)
				{
					mochi.as3.MochiServices._clip["_mochiad_ctr_failed"] = true;
					mochi.as3.MochiServices.disconnect();
					mochi.as3.MochiServices.onError;
				}
				else
				{
					mochi.as3.MochiServices._timer.stop();
					mochi.as3.MochiServices._timer.removeEventListener(egret.TimerEvent.TIMER,mochi.as3.MochiServices.connectWait,null);
					mochi.as3.MochiServices._timer = null;
				}
			}

			private static listen()
			{
				mochi.as3.MochiServices._mochiLocalConnection["connect"](mochi.as3.MochiServices._listenChannelName);
				mochi.as3.MochiServices._clip["handshake"] = function (param1:any)
				{
					mochi.as3.MochiServices.comChannelName = param1["newChannel"];
				};
			}

			private static initComChannels()
			{
				if(<any>!mochi.as3.MochiServices._connected)
				{
					mochi.as3.MochiServices._connecting = false;
					mochi.as3.MochiServices._connected = true;
					mochi.as3.MochiServices._mochiLocalConnection["send"](mochi.as3.MochiServices._sendChannelName,"onReceive",{"methodName":"handshakeDone"});
					mochi.as3.MochiServices._mochiLocalConnection["send"](mochi.as3.MochiServices._sendChannelName,"onReceive",{"methodName":"registerGame","preserved":mochi.as3.MochiServices._preserved,"id":mochi.as3.MochiServices._id,"version":mochi.as3.MochiServices.getVersion(),"parentURL":mochi.as3.MochiServices._container["loaderInfo"].loaderURL});
					mochi.as3.MochiServices._clip["onReceive"] = mochi.as3.MochiServices.onReceive;
					mochi.as3.MochiServices._clip["onEvent"] = mochi.as3.MochiServices.onEvent;
					mochi.as3.MochiServices._clip["onError"] = function ()
					{
						mochi.as3.MochiServices.onError;
					};
					while(mochi.as3.MochiServices._queue.length > 0)
					{
						mochi.as3.MochiServices._mochiLocalConnection["send"](mochi.as3.MochiServices._sendChannelName,"onReceive",mochi.as3.MochiServices._queue.shift());
					}
				}
			}

			private static onReceive(param1:any)
			{
				var pkg:any = param1;
				var cb:string = <any>pkg["callbackID"];
				var cblst:any = <any>mochi.as3.MochiServices._callbacks[cb];
				if(<any>!cblst)
				{
					return ;
				}
				var method:any = cblst["callbackMethod"];
				var methodName:string = "";
				var obj:any = <any>cblst["callbackObject"];
				if(obj && typeof method == "string")
				{
					methodName = method;
					if(obj[method] != null)
					{
						method = obj[method];
					}
				}
				if(method != undefined)
				{
					try 
					{
						method.apply(obj,pkg["args"]);
					}
					catch(error)
					{}
				}
				else if(obj != null)
				{
					try 
					{
						obj;
					}
					catch(error)
					{}
				}
				delete mochi.as3.MochiServices._callbacks[cb];
			}

			private static onEvent(param1:any)
			{
				var _loc2_:string = <any>param1["target"];
				var _loc3_:string = <any>param1["event"];
				switch(_loc2_)
				{
				case "services" :
					mochi.as3.MochiServices.triggerEvent(param1["event"],param1["args"]);
					break;
				case "events" :
					mochi.as3.MochiEvents.triggerEvent(param1["event"],param1["args"]);
					break;
				case "coins" :
					mochi.as3.MochiCoins.triggerEvent(param1["event"],param1["args"]);
					break;
				case "social" :
					mochi.as3.MochiSocial.triggerEvent(param1["event"],param1["args"]);
				}
			}

			private static flush(param1:boolean)
			{
				var _loc2_:any = <any>null;
				var _loc3_:any = <any>null;
				if(mochi.as3.MochiServices._clip && mochi.as3.MochiServices._queue)
				{
					while(mochi.as3.MochiServices._queue.length > 0)
					{
						_loc2_ = mochi.as3.MochiServices._queue.shift();
						_loc3_ = null;
						if(_loc2_ != null)
						{
							if(_loc2_["callbackID"] != null)
							{
								_loc3_ = mochi.as3.MochiServices._callbacks[_loc2_["callbackID"]];
							}
							delete mochi.as3.MochiServices._callbacks[_loc2_["callbackID"]];
							if(param1 && _loc3_ != null)
							{
								mochi.as3.MochiServices.handleError(_loc2_["args"],_loc3_["callbackObject"],_loc3_["callbackMethod"]);
							}
						}
					}
				}
			}

			private static handleError(param1:any,param2:any,param3:any)
			{
				if(param1 != null)
				{
					if(param1["onError"] != null)
					{
						param1["onError"]("NotConnected");
					}
					if(param1["options"] != null && param1["options"].onError != null)
					{
						param1["options"].onError("NotConnected");
					}
				}
				if(param3 != null)
				{
					param1 = {};
					param1["error"] = true;
					param1["errorCode"] = "NotConnected";
					if(param2 != null && flash.As3is(param3,"string"))
					{
						try 
						{
							param2[param3](param1);
						}
						catch(error)
						{}
					}
					else if(param3 != null)
					{
						try 
						{
							param3["apply"](param1);
							return ;
						}
						catch(error)
						{
							return ;
						}
					}
				}
			}

			public static send(param1:string,param2:any = null,param3:any = null,param4:any = null)
			{
				if(mochi.as3.MochiServices._connected)
				{
					mochi.as3.MochiServices._mochiLocalConnection["send"](mochi.as3.MochiServices._sendChannelName,"onReceive",{"methodName":param1,"args":param2,"callbackID":mochi.as3.MochiServices._nextCallbackID});
				}
				else
				{
					if(mochi.as3.MochiServices._clip == null || <any>!mochi.as3.MochiServices._connecting)
					{
						mochi.as3.MochiServices.handleError(param2,param3,param4);
						mochi.as3.MochiServices.flush(true);
						return ;
					}
					mochi.as3.MochiServices._queue.push({"methodName":param1,"args":param2,"callbackID":mochi.as3.MochiServices._nextCallbackID});
				}
				if(mochi.as3.MochiServices._clip != null)
				{
					if(mochi.as3.MochiServices._callbacks != null)
					{
						mochi.as3.MochiServices._callbacks[mochi.as3.MochiServices._nextCallbackID] = {"callbackObject":param3,"callbackMethod":param4};
						mochi.as3.MochiServices._nextCallbackID++;
					}
				}
			}

			private static urlOptions(param1:any):any
			{
				var _loc3_:string = <any>null;
				var _loc4_:Array<any> = <any>null;
				var _loc5_:number = <any>NaN;
				var _loc6_:Array<any> = <any>null;
				var _loc2_:any = {};
				if(param1["stage"])
				{
					_loc3_ = param1["stage"].loaderInfo.parameters.mochiad_options;
				}
				else
				{
					_loc3_ = param1["loaderInfo"].parameters.mochiad_options;
				}
				if(_loc3_)
				{
					_loc4_ = _loc3_.split("&");
					_loc5_ = 0;
					while(_loc5_ < _loc4_.length)
					{
						_loc6_ = _loc4_[_loc5_].split("=");
						_loc2_[unescape(_loc6_[0])] = unescape(_loc6_[1]);
						_loc5_++;
					}
				}
				return _loc2_;
			}

			public static addLinkEvent(param1:string,param2:string,param3:egret.DisplayObjectContainer,param4:Function = null)
			{
				var _arguments__ = [];
				for(var _arguments__key in arguments)
				{
					_arguments__ = arguments[_arguments__key];
				}
				var avm1Click:egret.DisplayObject = <any>null;
				var x:string = <any>null;
				var req:egret.URLRequest = <any>null;
				var loader:flash.Loader = <any>null;
				var setURL:Function = <any>null;
				var err:Function = <any>null;
				var complete:Function = <any>null;
				var url:string = param1;
				var burl:string = param2;
				var btn:egret.DisplayObjectContainer = param3;
				var onClick:Function = param4;
				var vars:any = new Object();
				vars["mav"] = mochi.as3.MochiServices.getVersion();
				vars["swfv"] = "9";
				vars["swfurl"] = btn["loaderInfo"].loaderURL;
				vars["fv"] = flash.Capabilities.version;
				vars["os"] = flash.Capabilities.os;
				vars["lang"] = flash.Capabilities.language;
				vars["scres"] = flash.Capabilities.screenResolutionX + "x" + flash.Capabilities.screenResolutionY;
				var s:string = "?";
				var i:number = <any>0;
				for(x in vars)
				{
					if(i != 0)
					{
						s = s + "&";
					}
					i++;
					s = s + x + "=" + escape(vars[x]);
				}
				req = new egret.URLRequest("http://link.mochiads.com/linkping.swf");
				loader = new flash.Loader();
				setURL = function (param1:string)
				{
					if(avm1Click)
					{
						btn.removeChild(avm1Click);
					}
					avm1Click = mochi.as3.MochiServices.clickMovie(param1,onClick);
					var _loc2_:egret.Rectangle = flash.getBounds(btn,btn);
					btn.addChild(avm1Click);
					avm1Click.x = _loc2_.x;
					avm1Click.y = _loc2_.y;
					avm1Click.scaleX = 0.01 * _loc2_.width;
					avm1Click.scaleY = 0.01 * _loc2_.height;
				};
				err = function (param1:any)
				{
					mochi.as3.MochiServices.netup = false;
					param1["target"].removeEventListener(param1["type"],_arguments__["callee"]);
					setURL(burl);
				};
				complete = function (param1:any)
				{
					param1["target"].removeEventListener(param1["type"],_arguments__["callee"]);
				};
				if(mochi.as3.MochiServices.netup)
				{
					setURL(url + s);
				}
				else
				{
					setURL(burl);
				}
				if(<any>!(mochi.as3.MochiServices.netupAttempted || mochi.as3.MochiServices._connected))
				{
					mochi.as3.MochiServices.netupAttempted = true;
					loader.contentLoaderInfo.addEventListener(egret.IOErrorEvent.IO_ERROR,err,null);
					loader.contentLoaderInfo.addEventListener(egret.Event.COMPLETE,complete,null);
					loader.load(req);
				}
			}

			private static clickMovie(param1:string,param2:Function):egret.SwfMovie
			{
				var _loc4_:number = flash.checkInt(0);
				var _loc14_:flash.Loader = <any>null;
				var _loc3_:Array<any> = [150,21,0,7,1,0,0,0,0,98,116,110,0,7,2,0,0,0,0,116,104,105,115,0,28,150,22,0,0,99,114,101,97,116,101,69,109,112,116,121,77,111,118,105,101,67,108,105,112,0,82,135,1,0,0,23,150,13,0,4,0,0,111,110,82,101,108,101,97,115,101,0,142,8,0,0,0,0,2,42,0,114,0,150,17,0,0,32,0,7,1,0,0,0,8,0,0,115,112,108,105,116,0,82,135,1,0,1,23,150,7,0,4,1,7,0,0,0,0,78,150,8,0,0,95,98,108,97,110,107,0,154,1,0,0,150,7,0,0,99,108,105,99,107,0,150,7,0,4,1,7,1,0,0,0,78,150,27,0,7,2,0,0,0,7,0,0,0,0,0,76,111,99,97,108,67,111,110,110,101,99,116,105,111,110,0,64,150,6,0,0,115,101,110,100,0,82,79,150,15,0,4,0,0,95,97,108,112,104,97,0,7,0,0,0,0,79,150,23,0,7,255,0,255,0,7,1,0,0,0,4,0,0,98,101,103,105,110,70,105,108,108,0,82,23,150,25,0,7,0,0,0,0,7,0,0,0,0,7,2,0,0,0,4,0,0,109,111,118,101,84,111,0,82,23,150,25,0,7,100,0,0,0,7,0,0,0,0,7,2,0,0,0,4,0,0,108,105,110,101,84,111,0,82,23,150,25,0,7,100,0,0,0,7,100,0,0,0,7,2,0,0,0,4,0,0,108,105,110,101,84,111,0,82,23,150,25,0,7,0,0,0,0,7,100,0,0,0,7,2,0,0,0,4,0,0,108,105,110,101,84,111,0,82,23,150,25,0,7,0,0,0,0,7,0,0,0,0,7,2,0,0,0,4,0,0,108,105,110,101,84,111,0,82,23,150,16,0,7,0,0,0,0,4,0,0,101,110,100,70,105,108,108,0,82,23];
				var _loc5_:Array<any> = [104,0,31,64,0,7,208,0,0,12,1,0,67,2,255,255,255,63,3];
				var _loc6_:Array<any> = [0,64,0,0,0];
				var _loc7_:egret.SwfMovie = new egret.SwfMovie();
				var _loc8_:flash.LocalConnection = new flash.LocalConnection();
				var _loc9_:string = "_click_" + Math.floor(Math.random() * 999999) + "_" + Math.floor(new flash.As3Date().time);
				_loc8_ = new flash.LocalConnection();
				_loc7_["lc"] = _loc8_;
				_loc7_["click"] = param2;
				_loc8_.client = _loc7_;
				_loc8_["connect"](_loc9_);
				var _loc10_:flash.ByteArray = new flash.ByteArray();
				var _loc11_:flash.ByteArray = new flash.ByteArray();
				_loc11_.endian = flash.Endian.LITTLE_ENDIAN;
				_loc11_.writeShort(1);
				_loc11_.writeUTFBytes(param1 + " " + _loc9_);
				_loc11_.writeByte(0);
				var _loc12_:number = flash.checkUint(_loc3_.length + _loc11_.length + 4);
				var _loc13_:number = flash.checkUint(_loc12_ + 35);
				_loc10_.endian = flash.Endian.LITTLE_ENDIAN;
				_loc10_.writeUTFBytes("FWS");
				_loc10_.writeByte(8);
				_loc10_.writeUnsignedInt(_loc13_);
				var _loc4__key_a;
				for(_loc4__key_a in _loc5_)
				{
					_loc4_ = _loc5_[_loc4__key_a];
					_loc10_.writeByte(_loc4_);
				}
				_loc10_.writeUnsignedInt(_loc12_);
				_loc10_.writeByte(136);
				_loc10_.writeShort(_loc11_.length);
				_loc10_.writeBytes(_loc11_);
				var _loc4__key_a;
				for(_loc4__key_a in _loc3_)
				{
					_loc4_ = _loc3_[_loc4__key_a];
					_loc10_.writeByte(_loc4_);
				}
				var _loc4__key_a;
				for(_loc4__key_a in _loc6_)
				{
					_loc4_ = _loc6_[_loc4__key_a];
					_loc10_.writeByte(_loc4_);
				}
				_loc14_ = new flash.Loader();
				_loc14_["loadBytes"](_loc10_);
				_loc7_.addChild(_loc14_);
				return _loc7_;
			}

			public static addEventListener(param1:string,param2:Function,thisObject:any)
			{
				mochi.as3.MochiServices._dispatcher.addEventListener(param1,param2,null);
			}

			public static triggerEvent(param1:string,param2:any)
			{
				mochi.as3.MochiServices._dispatcher.triggerEvent(param1,param2);
			}

			public static removeEventListener(param1:string,param2:Function,thisObject:any)
			{
				mochi.as3.MochiServices._dispatcher.removeEventListener(param1,param2,null);
			}

		}
	}
}

mochi.as3.MochiServices.CONNECTED = "onConnected";
mochi.as3.MochiServices._servURL = "http://www.mochiads.com/static/lib/services/";
mochi.as3.MochiServices._services = "services.swf";
mochi.as3.MochiServices._mochiLC = "MochiLC.swf";
mochi.as3.MochiServices._listenChannelName = "__ms_";
mochi.as3.MochiServices._connecting = false;
mochi.as3.MochiServices._connected = false;
mochi.as3.MochiServices.netup = true;
mochi.as3.MochiServices.netupAttempted = false;
mochi.as3.MochiServices.widget = false;
mochi.as3.MochiServices._dispatcher = new mochi.as3.MochiEventDispatcher();
