module com {
	export module greensock {
		export module plugins {
			export class ColorTransformPlugin extends com.greensock.plugins.TintPlugin {
				public static API_static_com_greensock_plugins_ColorTransformPlugin:number;

				public constructor()
				{
					super();
					this.propName = "colorTransform";
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					var _loc4_:flash.ColorTransform = <any>null;
					var _loc6_:any = null;
					var _loc7_:number = <any>NaN;
					var _loc5_:flash.ColorTransform = new flash.ColorTransform();
					if(flash.As3is(param1,egret.DisplayObject))
					{
						this._transform = (<egret.DisplayObject>(param1))["transform"];
						_loc4_ = this._transform.colorTransform;
					}
					else if(flash.As3is(param1,flash.ColorTransform))
					{
						_loc4_ = flash.As3As(param1,flash.ColorTransform);
					}
					else
					{
						return false;
					}
					_loc5_.concat(_loc4_);
					for(_loc6_ in param2)
					{
						if(_loc6_ == "tint" || _loc6_ == "color")
						{
							if(param2[_loc6_] != null)
							{
								_loc5_.color = flash.tranint(param2[_loc6_]);
							}
						}
						else if(<any>!(_loc6_ == "tintAmount" || _loc6_ == "exposure" || _loc6_ == "brightness"))
						{
							_loc5_[_loc6_] = param2[_loc6_];
						}
					}
					if(<any>!isNaN(param2.tintAmount))
					{
						_loc7_ = param2.tintAmount / (1 - (_loc5_.redMultiplier + _loc5_.greenMultiplier + _loc5_.blueMultiplier) / 3);
						_loc5_.redOffset = _loc5_.redOffset * _loc7_;
						_loc5_.greenOffset = _loc5_.greenOffset * _loc7_;
						_loc5_.blueOffset = _loc5_.blueOffset * _loc7_;
						_loc5_.redMultiplier = _loc5_.greenMultiplier = _loc5_.blueMultiplier = 1 - param2.tintAmount;
					}
					else if(<any>!isNaN(param2.exposure))
					{
						_loc5_.redOffset = _loc5_.greenOffset = _loc5_.blueOffset = 255 * (param2.exposure - 1);
						_loc5_.redMultiplier = _loc5_.greenMultiplier = _loc5_.blueMultiplier = 1;
					}
					else if(<any>!isNaN(param2.brightness))
					{
						_loc5_.redOffset = _loc5_.greenOffset = _loc5_.blueOffset = Math.max(0,(param2.brightness - 1) * 255);
						_loc5_.redMultiplier = _loc5_.greenMultiplier = _loc5_.blueMultiplier = 1 - Math.abs(param2.brightness - 1);
					}
					this.init(_loc4_,_loc5_);
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.ColorTransformPlugin.API_static_com_greensock_plugins_ColorTransformPlugin = 1;
flash.extendsClass("com.greensock.plugins.ColorTransformPlugin","com.greensock.plugins.TintPlugin")
