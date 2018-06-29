module com {
	export module greensock {
		export module plugins {
			export class VolumePlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_VolumePlugin:number;
				protected _target:any;
				protected _st:flash.SoundTransform;

				public constructor()
				{
					super();
					this.propName = "volume";
					this.overwriteProps = ["volume"];
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					if(isNaN(param2) || param1.hasOwnProperty("volume") || <any>!param1.hasOwnProperty("soundTransform"))
					{
						return false;
					}
					this._target = param1;
					this._st = this._target["soundTransform"];
					this.addTween(this._st,"volume",this._st.volume,param2,"volume");
					return true;
				}

				public set changeFactor(param1:number)
				{
					this.updateTweens(param1);
					this._target["soundTransform"] = this._st;
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.VolumePlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.VolumePlugin.API_static_com_greensock_plugins_VolumePlugin = 1;
flash.extendsClass("com.greensock.plugins.VolumePlugin","com.greensock.plugins.TweenPlugin")
