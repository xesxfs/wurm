module com {
	export module greensock {
		export module plugins {
			export class AutoAlphaPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_AutoAlphaPlugin:number;
				protected _target:any;
				protected _ignoreVisible:boolean = false;

				public constructor()
				{
					super();
					this.propName = "autoAlpha";
					this.overwriteProps = ["alpha","visible"];
				}

				public killProps(param1:any)
				{
					super.killProps(param1);
					this._ignoreVisible = flash.Boolean("visible" in param1);
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					this._target = param1;
					this.addTween(param1,"alpha",param1["alpha"],param2,"alpha");
					return true;
				}

				public set changeFactor(param1:number)
				{
					this.updateTweens(param1);
					if(<any>!this._ignoreVisible)
					{
						this._target["visible"] = flash.Boolean(this._target["alpha"] != 0);
					}
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.AutoAlphaPlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.AutoAlphaPlugin.API_static_com_greensock_plugins_AutoAlphaPlugin = 1;
flash.extendsClass("com.greensock.plugins.AutoAlphaPlugin","com.greensock.plugins.TweenPlugin")
