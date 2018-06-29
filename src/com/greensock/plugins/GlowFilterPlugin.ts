module com {
	export module greensock {
		export module plugins {
			export class GlowFilterPlugin extends com.greensock.plugins.FilterPlugin {
				public static API_static_com_greensock_plugins_GlowFilterPlugin:number;
				public static _propNames:Array<any>;

				public constructor()
				{
					super();
					this.propName = "glowFilter";
					this.overwriteProps = ["glowFilter"];
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					this._target = param1;
					this._type = flash.GlowFilter;
					this.initFilter(param2,new flash.GlowFilter(16777215,0,0,0,flash.trannumber(param2.strength) || flash.trannumber(1),flash.tranint(param2.quality) || 2,param2.inner,param2.knockout),com.greensock.plugins.GlowFilterPlugin._propNames);
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.GlowFilterPlugin.API_static_com_greensock_plugins_GlowFilterPlugin = 1;
com.greensock.plugins.GlowFilterPlugin._propNames = ["color","alpha","blurX","blurY","strength","quality","inner","knockout"];
flash.extendsClass("com.greensock.plugins.GlowFilterPlugin","com.greensock.plugins.FilterPlugin")
