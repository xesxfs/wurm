module com {
	export module greensock {
		export module plugins {
			export class DropShadowFilterPlugin extends com.greensock.plugins.FilterPlugin {
				public static API_static_com_greensock_plugins_DropShadowFilterPlugin:number;
				public static _propNames:Array<any>;

				public constructor()
				{
					super();
					this.propName = "dropShadowFilter";
					this.overwriteProps = ["dropShadowFilter"];
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					this._target = param1;
					this._type = flash.DropShadowFilter;
					this.initFilter(param2,new flash.DropShadowFilter(0,45,0,0,0,0,1,flash.tranint(param2.quality) || 2,param2.inner,param2.knockout,param2.hideObject),com.greensock.plugins.DropShadowFilterPlugin._propNames);
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.DropShadowFilterPlugin.API_static_com_greensock_plugins_DropShadowFilterPlugin = 1;
com.greensock.plugins.DropShadowFilterPlugin._propNames = ["distance","angle","color","alpha","blurX","blurY","strength","quality","inner","knockout","hideObject"];
flash.extendsClass("com.greensock.plugins.DropShadowFilterPlugin","com.greensock.plugins.FilterPlugin")
