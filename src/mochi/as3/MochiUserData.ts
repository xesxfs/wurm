module mochi {
	export module as3 {
		export class MochiUserData extends egret.EventDispatcher {
			public _loader:egret.URLLoader;
			public key:string = null;
			public data:any = null;
			public error:egret.Event = null;
			public operation:string = null;
			public callback:Function = null;

			public constructor(param1:string = "",param2:Function = null)
			{
				super();
				this.key = param1;
				this.callback = param2;
			}

			public static get(param1:string,param2:Function)
			{
				var _loc3_:mochi.as3.MochiUserData = new mochi.as3.MochiUserData(param1,param2);
				_loc3_.getEvent();
			}

			public static put(param1:string,param2:any,param3:Function)
			{
				var _loc4_:mochi.as3.MochiUserData = new mochi.as3.MochiUserData(param1,param3);
				_loc4_.putEvent(param2);
			}

			public serialize(param1:any):flash.ByteArray
			{
				var _loc2_:flash.ByteArray = new flash.ByteArray();
				_loc2_.objectEncoding = flash.checkUint(ObjectEncoding.AMF3);
				_loc2_.writeObject(param1);
				_loc2_.compress();
				return _loc2_;
			}

			public deserialize(param1:flash.ByteArray):any
			{
				param1.objectEncoding = flash.checkUint(ObjectEncoding.AMF3);
				param1.uncompress();
				return param1.readObject();
			}

			public request(param1:string,param2:flash.ByteArray)
			{
				var _operation:string = param1;
				var _data:flash.ByteArray = param2;
				this.operation = _operation;
				var api_url:string = mochi.as3.MochiSocial.getAPIURL();
				var api_token:string = mochi.as3.MochiSocial.getAPIToken();
				if(api_url == null || api_token == null)
				{
					this.errorHandler(new flash.IOErrorEvent(egret.IOErrorEvent.IO_ERROR,false,false,"not logged in"));
					return ;
				}
				this._loader = new egret.URLLoader();
				var args:egret.URLVariables = new egret.URLVariables();
				args["op"] = _operation;
				args["key"] = this.key;
				var req:egret.URLRequest = new egret.URLRequest(mochi.as3.MochiSocial.getAPIURL() + "/" + "MochiUserData?" + this.toString());
				req.method = egret.URLRequestMethod.POST;
				req.contentType = "application/x-mochi-userdata";
				req.requestHeaders = [new flash.URLRequestHeader("x-mochi-services-version",mochi.as3.MochiServices.getVersion()),new flash.URLRequestHeader("x-mochi-api-token",api_token)];
				req.data = _data;
				this._loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
				this._loader.addEventListener(egret.Event.COMPLETE,flash.bind(this.completeHandler,this),null);
				this._loader.addEventListener(egret.IOErrorEvent.IO_ERROR,flash.bind(this.errorHandler,this),null);
				this._loader.addEventListener(flash.SecurityErrorEvent.SECURITY_ERROR,flash.bind(this.securityErrorHandler,this),null);
				try 
				{
					this._loader.load(req);
					return ;
				}
				catch(e)
				{
					this.errorHandler(new flash.IOErrorEvent(egret.IOErrorEvent.IO_ERROR,false,false,"security error: " + e.toString()));
					return ;
				}
			}

			public completeHandler(param1:egret.Event)
			{
				var _self__:any = this;
				var event:egret.Event = param1;
				try 
				{
					if(this._loader.data.length)
					{
						this.data = this.deserialize(this._loader.data);
					}
					else
					{
						this.data = null;
					}
				}
				catch(e)
				{
					this.errorHandler(new flash.IOErrorEvent(egret.IOErrorEvent.IO_ERROR,false,false,"deserialize error: " + e.toString()));
					return ;
				}
				if(this.callback != null)
				{
					this.performCallback();
				}
				else
				{
					_self__.dispatchEvent(event);
				}
				this.close();
			}

			public errorHandler(param1:flash.IOErrorEvent)
			{
				var _self__:any = this;
				this.data = null;
				this.error = param1;
				if(this.callback != null)
				{
					this.performCallback();
				}
				else
				{
					_self__.dispatchEvent(param1);
				}
				this.close();
			}

			public securityErrorHandler(param1:flash.SecurityErrorEvent)
			{
				this.errorHandler(new flash.IOErrorEvent(egret.IOErrorEvent.IO_ERROR,false,false,"security error: " + this.toString()));
			}

			public performCallback()
			{
				try 
				{
					this.callback(this);
					return ;
				}
				catch(e)
				{
					return ;
				}
			}

			public close()
			{
				if(this._loader)
				{
					this._loader.removeEventListener(egret.Event.COMPLETE,flash.bind(this.completeHandler,this),null);
					this._loader.removeEventListener(egret.IOErrorEvent.IO_ERROR,flash.bind(this.errorHandler,this),null);
					this._loader.removeEventListener(flash.SecurityErrorEvent.SECURITY_ERROR,flash.bind(this.securityErrorHandler,this),null);
					this._loader["close"]();
					this._loader = null;
				}
				this.error = null;
				this.callback = null;
			}

			public getEvent()
			{
				this.request("get",this.serialize(null));
			}

			public putEvent(param1:any)
			{
				this.request("put",this.serialize(param1));
			}

			public toString():string
			{
				return "[MochiUserData operation=" + this.operation + " key=\"" + this.key + "\" data=" + this.data + " error=\"" + this.error + "\"]";
			}

		}
	}
}

flash.extendsClass("mochi.as3.MochiUserData","egret.EventDispatcher")
