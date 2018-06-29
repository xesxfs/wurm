module com {
	export module greensock {
		export module plugins {
			export class RoundPropsPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_RoundPropsPlugin:number;
				protected _tween:com.greensock.TweenLite;

				public constructor()
				{
					super();
					this.propName = "roundProps";
					this.overwriteProps = ["roundProps"];
					this.round = true;
					this.priority = flash.checkInt(-1);
					this.onInitAllProps = flash.bind(this._initAllProps,this);
				}

				public add(param1:any,param2:string,param3:number,param4:number)
				{
					this.addTween(param1,param2,param3,param3 + param4,param2);
					this.overwriteProps[this.overwriteProps.length] = param2;
				}

				protected _removePropTween(param1:com.greensock.core.PropTween)
				{
					if(param1.nextNode)
					{
						param1.nextNode.prevNode = param1.prevNode;
					}
					if(param1.prevNode)
					{
						param1.prevNode.nextNode = param1.nextNode;
					}
					else if(this._tween.cachedPT1 == param1)
					{
						this._tween.cachedPT1 = param1.nextNode;
					}
					if(param1.isPlugin && param1.target["onDisable"])
					{
						param1.target["onDisable"]();
					}
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					this._tween = param3;
					this.overwriteProps = this.overwriteProps.concat(flash.As3As(param2,Array));
					return true;
				}

				protected _initAllProps()
				{
					var _loc1_:string = <any>null;
					var _loc2_:any = null;
					var _loc4_:com.greensock.core.PropTween = <any>null;
					var _loc3_:Array<any> = <any>this._tween.vars["roundProps"];
					var _loc5_:number = flash.checkInt(_loc3_.length);
					while(--_loc5_ > -1)
					{
						_loc1_ = _loc3_[_loc5_];
						_loc4_ = this._tween.cachedPT1;
						while(_loc4_)
						{
							if(_loc4_.name == _loc1_)
							{
								if(_loc4_.isPlugin)
								{
									_loc4_.target["round"] = true;
								}
								else
								{
									this.add(_loc4_.target,_loc1_,_loc4_.start,_loc4_.change);
									this._removePropTween(_loc4_);
									this._tween.propTweenLookup[_loc1_] = this._tween.propTweenLookup["roundProps"];
								}
							}
							else if(_loc4_.isPlugin && _loc4_.name == "_MULTIPLE_" && <any>!_loc4_.target["round"])
							{
								_loc2_ = " " + _loc4_.target["overwriteProps"].join(" ") + " ";
								if(_loc2_.indexOf(" " + _loc1_ + " ") != -1)
								{
									_loc4_.target["round"] = true;
								}
							}
							_loc4_ = _loc4_.nextNode;
						}
					}
				}

			}
		}
	}
}

com.greensock.plugins.RoundPropsPlugin.API_static_com_greensock_plugins_RoundPropsPlugin = 1;
flash.extendsClass("com.greensock.plugins.RoundPropsPlugin","com.greensock.plugins.TweenPlugin")
