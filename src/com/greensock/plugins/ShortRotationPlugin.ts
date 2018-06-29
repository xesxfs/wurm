module com {
	export module greensock {
		export module plugins {
			export class ShortRotationPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_ShortRotationPlugin:number;

				public constructor()
				{
					super();
					this.propName = "shortRotation";
					this.overwriteProps = [];
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					var _loc5_:any = null;
					if(typeof param2 == "number")
					{
						return false;
					}
					var _loc4_:boolean = flash.Boolean(param2.useRadians == true);
					for(_loc5_ in param2)
					{
						if(_loc5_ != "useRadians")
						{
							this.initRotation(param1,_loc5_,param1[_loc5_],typeof param2[_loc5_] == "number"?flash.trannumber(flash.trannumber(param2[_loc5_])):flash.trannumber(param1[_loc5_] + flash.trannumber(param2[_loc5_])),_loc4_);
						}
					}
					return true;
				}

				public initRotation(param1:any,param2:string,param3:number,param4:number,param5:boolean = false)
				{
					var _loc6_:number = <any><any>!<any>!param5?flash.trannumber(Math.PI * 2):flash.trannumber(360);
					var _loc7_:number = (param4 - param3) % _loc6_;
					if(_loc7_ != _loc7_ % (_loc6_ / 2))
					{
						_loc7_ = _loc7_ < 0?flash.trannumber(_loc7_ + _loc6_):flash.trannumber(_loc7_ - _loc6_);
					}
					this.addTween(param1,param2,param3,param3 + _loc7_,param2);
					this.overwriteProps[this.overwriteProps.length] = param2;
				}

			}
		}
	}
}

com.greensock.plugins.ShortRotationPlugin.API_static_com_greensock_plugins_ShortRotationPlugin = 1;
flash.extendsClass("com.greensock.plugins.ShortRotationPlugin","com.greensock.plugins.TweenPlugin")
