module com {
	export module greensock {
		export module plugins {
			export class FilterPlugin extends com.greensock.plugins.TweenPlugin {
				public static VERSION_static_com_greensock_plugins_FilterPlugin:number;
				public static API_static_com_greensock_plugins_FilterPlugin:number;
				protected _remove:boolean = false;
				protected _target:any;
				protected _index:number = 0;
				protected _filter:flash.BitmapFilter;
				protected _type:any;

				public constructor()
				{
					super();
				}

				public onCompleteTween()
				{
					var _loc1_:Array<any> = <any>null;
					var _loc2_:number = flash.checkInt(0);
					if(this._remove)
					{
						_loc1_ = this._target["filters"];
						if(<any>!(flash.As3is(_loc1_[this._index],null,"this._type")))
						{
							_loc2_ = flash.checkInt(_loc1_.length);
							while(_loc2_--)
							{
								if(flash.As3is(_loc1_[_loc2_],null,"this._type"))
								{
									_loc1_.splice(_loc2_,1);
									break;
								}
							}
						}
						else
						{
							_loc1_.splice(this._index,1);
						}
						this._target["filters"] = _loc1_;
					}
				}

				protected initFilter(param1:any,param2:flash.BitmapFilter,param3:Array<any>)
				{
					var _loc5_:string = <any>null;
					var _loc6_:number = flash.checkInt(0);
					var _loc7_:com.greensock.plugins.HexColorsPlugin = <any>null;
					var _loc4_:Array<any> = <any>this._target["filters"];
					var _loc8_:any = <any>flash.As3is(param1,flash.BitmapFilter)?{}:param1;
					this._index = flash.checkInt(-1);
					if(_loc8_["index"] != null)
					{
						this._index = flash.checkInt(_loc8_["index"]);
					}
					else
					{
						_loc6_ = flash.checkInt(_loc4_.length);
						while(_loc6_--)
						{
							if(flash.As3is(_loc4_[_loc6_],null,"this._type"))
							{
								this._index = flash.checkInt(_loc6_);
								break;
							}
						}
					}
					if(this._index == -1 || _loc4_[this._index] == null || _loc8_["addFilter"] == true)
					{
						this._index = flash.checkInt(_loc8_["index"] != null?flash.tranint(_loc8_["index"]):flash.tranint(_loc4_.length));
						_loc4_[this._index] = param2;
						this._target["filters"] = _loc4_;
					}
					this._filter = _loc4_[this._index];
					if(_loc8_["remove"] == true)
					{
						this._remove = true;
						this.onComplete = flash.bind(this.onCompleteTween,this);
					}
					_loc6_ = flash.checkInt(param3.length);
					while(_loc6_--)
					{
						_loc5_ = param3[_loc6_];
						if(_loc5_ in param1 && this._filter[_loc5_] != param1[_loc5_])
						{
							if(_loc5_ == "color" || _loc5_ == "highlightColor" || _loc5_ == "shadowColor")
							{
								_loc7_ = new com.greensock.plugins.HexColorsPlugin();
								_loc7_.initColor(this._filter,_loc5_,this._filter[_loc5_],param1[_loc5_]);
								this._tweens[this._tweens.length] = new com.greensock.core.PropTween(_loc7_,"changeFactor",0,1,_loc5_,false);
							}
							else if(_loc5_ == "quality" || _loc5_ == "inner" || _loc5_ == "knockout" || _loc5_ == "hideObject")
							{
								this._filter[_loc5_] = param1[_loc5_];
							}
							else
							{
								this.addTween(this._filter,_loc5_,this._filter[_loc5_],param1[_loc5_],_loc5_);
							}
						}
					}
				}

				public set changeFactor(param1:number)
				{
					var _loc3_:com.greensock.core.PropTween = <any>null;
					var _loc2_:number = flash.checkInt(this._tweens.length);
					var _loc4_:Array<any> = <any>this._target["filters"];
					while(_loc2_--)
					{
						_loc3_ = this._tweens[_loc2_];
						_loc3_.target[_loc3_.property] = _loc3_.start + _loc3_.change * param1;
					}
					if(<any>!(flash.As3is(_loc4_[this._index],null,"this._type")))
					{
						_loc2_ = flash.checkInt(this._index = flash.checkInt(_loc4_.length));
						while(_loc2_--)
						{
							if(flash.As3is(_loc4_[_loc2_],null,"this._type"))
							{
								this._index = flash.checkInt(_loc2_);
								break;
							}
						}
					}
					_loc4_[this._index] = this._filter;
					this._target["filters"] = _loc4_;
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.FilterPlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.FilterPlugin.VERSION_static_com_greensock_plugins_FilterPlugin = 2.03;
com.greensock.plugins.FilterPlugin.API_static_com_greensock_plugins_FilterPlugin = 1;
flash.extendsClass("com.greensock.plugins.FilterPlugin","com.greensock.plugins.TweenPlugin")
