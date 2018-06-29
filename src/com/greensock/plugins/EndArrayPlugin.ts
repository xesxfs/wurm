module com {
	export module greensock {
		export module plugins {
			export class EndArrayPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_EndArrayPlugin:number;
				protected _a:Array<any>;
				protected _info:Array<any>;

				public constructor()
				{
					super();
					this._info = [];
					this.propName = "endArray";
					this.overwriteProps = ["endArray"];
				}

				public init(param1:Array<any>,param2:Array<any>)
				{
					this._a = param1;
					var _loc3_:number = flash.checkInt(param2.length);
					while(_loc3_--)
					{
						if(param1[_loc3_] != param2[_loc3_] && param1[_loc3_] != null)
						{
							this._info[this._info.length] = new ArrayTweenInfo(_loc3_,this._a[_loc3_],param2[_loc3_] - this._a[_loc3_]);
						}
					}
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					if(<any>!(flash.As3is(param1,Array)) || <any>!(flash.As3is(param2,Array)))
					{
						return false;
					}
					this.init(flash.As3As(param1,Array),param2);
					return true;
				}

				public set changeFactor(param1:number)
				{
					var _loc3_:ArrayTweenInfo = <any>null;
					var _loc4_:number = <any>NaN;
					var _loc2_:number = flash.checkInt(this._info.length);
					if(this.round)
					{
						while(_loc2_--)
						{
							_loc3_ = this._info[_loc2_];
							_loc4_ = _loc3_.start + _loc3_.change * param1;
							if(_loc4_ > 0)
							{
								this._a[_loc3_.index] = _loc4_ + 0.5 >> 0;
							}
							else
							{
								this._a[_loc3_.index] = _loc4_ - 0.5 >> 0;
							}
						}
					}
					else
					{
						while(_loc2_--)
						{
							_loc3_ = this._info[_loc2_];
							this._a[_loc3_.index] = _loc3_.start + _loc3_.change * param1;
						}
					}
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.EndArrayPlugin,this, "changeFactor");
		}
	
 			}

			 class ArrayTweenInfo extends egret.HashObject {
				public change:number = NaN;
				public start:number = NaN;
				public index:number = 0;

				public constructor(param1:number,param2:number,param3:number)
				{
					super();
					param1 = flash.checkUint(param1);
					super();
					this.index = flash.checkUint(param1);
					this.start = param2;
					this.change = param3;
				}

			}
		}
	}
}

com.greensock.plugins.EndArrayPlugin.API_static_com_greensock_plugins_EndArrayPlugin = 1;
flash.extendsClass("com.greensock.plugins.EndArrayPlugin","com.greensock.plugins.TweenPlugin")
