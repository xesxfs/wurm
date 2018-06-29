module com {
	export module greensock {
		export module plugins {
			export class VisiblePlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_VisiblePlugin:number;
				protected _target:any;
				protected _initVal:boolean = false;
				protected _visible:boolean = false;
				protected _tween:com.greensock.TweenLite;

				public constructor()
				{
					super();
					this.propName = "visible";
					this.overwriteProps = ["visible"];
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					this._target = param1;
					this._tween = param3;
					this._initVal = this._target["visible"];
					this._visible = flash.Boolean(param2);
					return true;
				}

				public set changeFactor(param1:number)
				{
					if(param1 == 1 && (this._tween.cachedDuration == this._tween.cachedTime || this._tween.cachedTime == 0))
					{
						this._target["visible"] = this._visible;
					}
					else
					{
						this._target["visible"] = this._initVal;
					}
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.VisiblePlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.VisiblePlugin.API_static_com_greensock_plugins_VisiblePlugin = 1;
flash.extendsClass("com.greensock.plugins.VisiblePlugin","com.greensock.plugins.TweenPlugin")
