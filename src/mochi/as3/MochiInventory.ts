module mochi {
	export module as3 {
		export class MochiInventory extends flash.Proxy {
			public static CONSUMER_KEY:string;
			public static KEY_SALT:string;
			public static READY:string;
			public static WRITTEN:string;
			public static ERROR:string;
			public static IO_ERROR:string;
			public static VALUE_ERROR:string;
			public static NOT_READY:string;
			public static _dispatcher:mochi.as3.MochiEventDispatcher;
			private _timer:egret.Timer;
			private _consumableProperties:any;
			private _syncPending:boolean = false;
			private _outstandingID:number = NaN;
			private _syncID:number = NaN;
			private _names:Array<any>;
			private _storeSync:any;

			public constructor()
			{
				super();
				mochi.as3.MochiCoins.addEventListener(mochi.as3.MochiCoins.ITEM_OWNED,flash.bind(this.itemOwned,this),null);
				mochi.as3.MochiCoins.addEventListener(mochi.as3.MochiCoins.ITEM_NEW,flash.bind(this.newItems,this),null);
				mochi.as3.MochiSocial.addEventListener(mochi.as3.MochiSocial.LOGGED_IN,flash.bind(this.loggedIn,this),null);
				mochi.as3.MochiSocial.addEventListener(mochi.as3.MochiSocial.LOGGED_OUT,flash.bind(this.loggedOut,this),null);
				this._storeSync = new Object();
				this._syncPending = false;
				this._outstandingID = 0;
				this._syncID = 0;
				this._timer = new egret.Timer(1000);
				this._timer.addEventListener(egret.TimerEvent.TIMER,flash.bind(this.sync,this),null);
				this._timer.start();
				if(mochi.as3.MochiSocial.loggedIn)
				{
					this.loggedIn();
				}
				else
				{
					this.loggedOut();
				}
			}

			public static addEventListener(param1:string,param2:Function,thisObject:any)
			{
				mochi.as3.MochiInventory._dispatcher.addEventListener(param1,param2,null);
			}

			public static triggerEvent(param1:string,param2:any)
			{
				mochi.as3.MochiInventory._dispatcher.triggerEvent(param1,param2);
			}

			public static removeEventListener(param1:string,param2:Function,thisObject:any)
			{
				mochi.as3.MochiInventory._dispatcher.removeEventListener(param1,param2,null);
			}

			public release()
			{
				mochi.as3.MochiCoins.removeEventListener(mochi.as3.MochiCoins.ITEM_NEW,flash.bind(this.newItems,this),null);
				mochi.as3.MochiSocial.removeEventListener(mochi.as3.MochiSocial.LOGGED_IN,flash.bind(this.loggedIn,this),null);
				mochi.as3.MochiSocial.removeEventListener(mochi.as3.MochiSocial.LOGGED_OUT,flash.bind(this.loggedOut,this),null);
			}

			private loggedOut(param1:any = null)
			{
				this._consumableProperties = null;
			}

			private loggedIn(param1:any = null)
			{
				mochi.as3.MochiUserData.get(mochi.as3.MochiInventory.CONSUMER_KEY,flash.bind(this.getConsumableBag,this));
			}

			private newItems(param1:any)
			{
				if(<any>!this[param1["id"] + mochi.as3.MochiInventory.KEY_SALT])
				{
					this[param1["id"] + mochi.as3.MochiInventory.KEY_SALT] = 0;
				}
				if(<any>!this[param1["id"]])
				{
					this[param1["id"]] = 0;
				}
				this[param1["id"] + mochi.as3.MochiInventory.KEY_SALT] = this[param1["id"] + mochi.as3.MochiInventory.KEY_SALT] + param1["count"];
				this[param1["id"]] = this[param1["id"]] + param1["count"];
				if(param1["privateProperties"] && param1["privateProperties"].consumable)
				{
					if(<any>!this[param1["privateProperties"].tag])
					{
						this[param1["privateProperties"].tag] = 0;
					}
					this[param1["privateProperties"].tag] = this[param1["privateProperties"].tag] + param1["privateProperties"].inc * param1["count"];
				}
			}

			private itemOwned(param1:any)
			{
				this._storeSync[param1["id"]] = {"properties":param1["properties"],"count":param1["count"]};
			}

			private getConsumableBag(param1:mochi.as3.MochiUserData)
			{
				var _loc2_:any = null;
				var _loc3_:number = <any>NaN;
				if(param1.error)
				{
					mochi.as3.MochiInventory.triggerEvent(mochi.as3.MochiInventory.ERROR,{"type":mochi.as3.MochiInventory.IO_ERROR,"error":param1.error});
					return ;
				}
				this._consumableProperties = {};
				this._names = new Array();
				if(param1.data)
				{
					for(_loc2_ in param1.data)
					{
						this._names.push(_loc2_);
						this._consumableProperties[_loc2_] = new mochi.as3.MochiDigits(param1.data[_loc2_]);
					}
				}
				for(_loc2_ in this._storeSync)
				{
					_loc3_ = this._storeSync[_loc2_].count;
					if(this._consumableProperties[_loc2_ + mochi.as3.MochiInventory.KEY_SALT])
					{
						_loc3_ = _loc3_ - this._consumableProperties[_loc2_ + mochi.as3.MochiInventory.KEY_SALT].value;
					}
					if(_loc3_ != 0)
					{
						this.newItems({"id":_loc2_,"count":_loc3_,"properties":this._storeSync[_loc2_].properties});
					}
				}
				mochi.as3.MochiInventory.triggerEvent(mochi.as3.MochiInventory.READY,{});
			}

			private putConsumableBag(param1:mochi.as3.MochiUserData)
			{
				this._syncPending = false;
				if(param1.error)
				{
					mochi.as3.MochiInventory.triggerEvent(mochi.as3.MochiInventory.ERROR,{"type":mochi.as3.MochiInventory.IO_ERROR,"error":param1.error});
					this._outstandingID = -1;
				}
				mochi.as3.MochiInventory.triggerEvent(mochi.as3.MochiInventory.WRITTEN,{});
			}

			private sync(param1:egret.Event = null)
			{
				var _loc3_:any = null;
				if(this._syncPending || this._syncID == this._outstandingID)
				{
					return ;
				}
				this._outstandingID = this._syncID;
				var _loc2_:any = {};
				for(_loc3_ in this._consumableProperties)
				{
					_loc2_[_loc3_] = (<mochi.as3.MochiDigits>(this._consumableProperties[_loc3_])).value;
				}
				mochi.as3.MochiUserData.put(mochi.as3.MochiInventory.CONSUMER_KEY,_loc2_,flash.bind(this.putConsumableBag,this));
				this._syncPending = true;
			}

			public getProperty(param1:any):any
			{
				if(this._consumableProperties == null)
				{
					mochi.as3.MochiInventory.triggerEvent(mochi.as3.MochiInventory.ERROR,{"type":mochi.as3.MochiInventory.NOT_READY});
					return -1;
				}
				if(this._consumableProperties[param1])
				{
					return (<mochi.as3.MochiDigits>(this._consumableProperties[param1])).value;
				}
				return undefined;
			}

			public deleteProperty(param1:any):boolean
			{
				if(<any>!this._consumableProperties[param1])
				{
					return false;
				}
				this._names.splice(this._names.indexOf(param1),1);
				delete this._consumableProperties[param1];
				return true;
			}

			public hasProperty(param1:any):boolean
			{
				if(this._consumableProperties == null)
				{
					mochi.as3.MochiInventory.triggerEvent(mochi.as3.MochiInventory.ERROR,{"type":mochi.as3.MochiInventory.NOT_READY});
					return false;
				}
				if(this._consumableProperties[param1] == undefined)
				{
					return false;
				}
				return true;
			}

			public setProperty(param1:any,param2:any)
			{
				var _loc3_:mochi.as3.MochiDigits = <any>null;
				if(this._consumableProperties == null)
				{
					mochi.as3.MochiInventory.triggerEvent(mochi.as3.MochiInventory.ERROR,{"type":mochi.as3.MochiInventory.NOT_READY});
					return ;
				}
				if(<any>!(flash.As3is(param2,"number")))
				{
					mochi.as3.MochiInventory.triggerEvent(mochi.as3.MochiInventory.ERROR,{"type":mochi.as3.MochiInventory.VALUE_ERROR,"error":"Invalid type","arg":param2});
					return ;
				}
				if(this._consumableProperties[param1])
				{
					_loc3_ = (<mochi.as3.MochiDigits>(this._consumableProperties[param1]));
					if(_loc3_.value == param2)
					{
						return ;
					}
					_loc3_.value = param2;
				}
				else
				{
					this._names.push(param1);
					this._consumableProperties[param1] = new mochi.as3.MochiDigits(param2);
				}
				this._syncID++;
			}

			public nextNameIndex(param1:number):number
			{
				param1 = flash.checkInt(param1);
				return param1 >= this._names.length?0:flash.tranint(param1 + 1);
			}

			public nextName(param1:number):string
			{
				param1 = flash.checkInt(param1);
				return this._names[param1 - 1];
			}

		}
	}
}

mochi.as3.MochiInventory.CONSUMER_KEY = "MochiConsumables";
mochi.as3.MochiInventory.KEY_SALT = " syncMaint\x01";
mochi.as3.MochiInventory.READY = "InvReady";
mochi.as3.MochiInventory.WRITTEN = "InvWritten";
mochi.as3.MochiInventory.ERROR = "Error";
mochi.as3.MochiInventory.IO_ERROR = "IoError";
mochi.as3.MochiInventory.VALUE_ERROR = "InvValueError";
mochi.as3.MochiInventory.NOT_READY = "InvNotReady";
mochi.as3.MochiInventory._dispatcher = new mochi.as3.MochiEventDispatcher();
flash.extendsClass("mochi.as3.MochiInventory","flash.Proxy")
