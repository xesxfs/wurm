module com {
	export module greensock {
		export module plugins {
			export class TweenPlugin extends egret.HashObject {
				public static VERSION:number;
				public static API:number;
				public activeDisable:boolean = false;
				public onInitAllProps:Function;
				protected _tweens:Array<any>;
				public onDisable:Function;
				public propName:string;
				public onEnable:Function;
				public round:boolean = false;
				public priority:number = 0;
				public overwriteProps:Array<any>;
				public onComplete:Function;
				protected _changeFactor:number = 0;

				public constructor()
				{
					super();
					super();
					this._tweens = [];
				}

				public static activate(param1:Array<any>):boolean
				{
					var _loc3_:any = <any>null;
					com.greensock.TweenLite.onPluginEvent = com.greensock.plugins.TweenPlugin.onTweenEvent;
					var _loc2_:number = flash.checkInt(param1.length);
					while(_loc2_--)
					{
						if(param1[_loc2_].hasOwnProperty("API"))
						{
							_loc3_ = new (<any>param1[_loc2_])();
							com.greensock.TweenLite.plugins[_loc3_["propName"]] = param1[_loc2_];
						}
					}
					return true;
				}

				private static onTweenEvent(param1:string,param2:com.greensock.TweenLite):boolean
				{
					var _loc4_:boolean = <any>false;
					var _loc5_:Array<any> = <any>null;
					var _loc6_:number = flash.checkInt(0);
					var _loc3_:com.greensock.core.PropTween = param2.cachedPT1;
					if(param1 == "onInitAllProps")
					{
						_loc5_ = [];
						_loc6_ = flash.checkInt(0);
						while(_loc3_)
						{
							_loc5_[_loc6_++] = _loc3_;
							_loc3_ = _loc3_.nextNode;
						}
						flash.sortOn(_loc5_,"priority",flash.AS3Array.NUMERIC | flash.AS3Array.DESCENDING);
						while(--_loc6_ > -1)
						{
							(<com.greensock.core.PropTween>(_loc5_[_loc6_])).nextNode = _loc5_[_loc6_ + 1];
							(<com.greensock.core.PropTween>(_loc5_[_loc6_])).prevNode = _loc5_[_loc6_ - 1];
						}
						_loc3_ = param2.cachedPT1 = _loc5_[0];
					}
					while(_loc3_)
					{
						if(_loc3_.isPlugin && _loc3_.target[param1])
						{
							if(_loc3_.target["activeDisable"])
							{
								_loc4_ = true;
							}
							_loc3_.target[param1]();
						}
						_loc3_ = _loc3_.nextNode;
					}
					return _loc4_;
				}

				public set changeFactor(param1:number)
				{
					this.updateTweens(param1);
					this._changeFactor = param1;
				}

				protected updateTweens(param1:number)
				{
					var _loc3_:com.greensock.core.PropTween = <any>null;
					var _loc4_:number = <any>NaN;
					var _loc2_:number = flash.checkInt(this._tweens.length);
					if(this.round)
					{
						while(--_loc2_ > -1)
						{
							_loc3_ = this._tweens[_loc2_];
							_loc4_ = _loc3_.start + _loc3_.change * param1;
							if(_loc4_ > 0)
							{
								_loc3_.target[_loc3_.property] = _loc4_ + 0.5 >> 0;
							}
							else
							{
								_loc3_.target[_loc3_.property] = _loc4_ - 0.5 >> 0;
							}
						}
					}
					else
					{
						while(--_loc2_ > -1)
						{
							_loc3_ = this._tweens[_loc2_];
							_loc3_.target[_loc3_.property] = _loc3_.start + _loc3_.change * param1;
						}
					}
				}

				protected addTween(param1:any,param2:string,param3:number,param4:any,param5:string = null)
				{
					var _loc6_:number = <any>NaN;
					if(param4 != null)
					{
						_loc6_ = typeof param4 == "number"?flash.trannumber(flash.trannumber(param4) - param3):flash.trannumber(flash.trannumber(param4));
						if(_loc6_ != 0)
						{
							this._tweens[this._tweens.length] = new com.greensock.core.PropTween(param1,param2,param3,_loc6_,param5 || param2,false);
						}
					}
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					this.addTween(param1,this.propName,param1[this.propName],param2,this.propName);
					return true;
				}

				public get changeFactor():number
				{
					return this._changeFactor;
				}

				public killProps(param1:any)
				{
					var _loc2_:number = flash.checkInt(this.overwriteProps.length);
					while(--_loc2_ > -1)
					{
						if(this.overwriteProps[_loc2_] in param1)
						{
							this.overwriteProps.splice(_loc2_,1);
						}
					}
					_loc2_ = flash.checkInt(this._tweens.length);
					while(--_loc2_ > -1)
					{
						if((<com.greensock.core.PropTween>(this._tweens[_loc2_])).name in param1)
						{
							this._tweens.splice(_loc2_,1);
						}
					}
				}

			}
		}
	}
}

com.greensock.plugins.TweenPlugin.VERSION = 1.4;
com.greensock.plugins.TweenPlugin.API = 1;
