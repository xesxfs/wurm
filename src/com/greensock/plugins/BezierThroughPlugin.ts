module com {
	export module greensock {
		export module plugins {
			export class BezierThroughPlugin extends com.greensock.plugins.BezierPlugin {
				public static API_static_com_greensock_plugins_BezierThroughPlugin:number;

				public constructor()
				{
					super();
					this.propName = "bezierThrough";
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					if(<any>!(flash.As3is(param2,Array)))
					{
						return false;
					}
					this.init(param3,flash.As3As(param2,Array),true);
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.BezierThroughPlugin.API_static_com_greensock_plugins_BezierThroughPlugin = 1;
flash.extendsClass("com.greensock.plugins.BezierThroughPlugin","com.greensock.plugins.BezierPlugin")
