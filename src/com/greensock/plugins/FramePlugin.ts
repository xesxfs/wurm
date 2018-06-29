module com {
	export module greensock {
		export module plugins {
			export class FramePlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_FramePlugin:number;
				protected _target:egret.SwfMovie;
				public frame:number = 0;

				public constructor()
				{
					super();
					this.propName = "frame";
					this.overwriteProps = ["frame","frameLabel"];
					this.round = true;
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					if(<any>!(flash.As3is(param1,egret.SwfMovie)) || isNaN(param2))
					{
						return false;
					}
					this._target = flash.As3As(param1,egret.SwfMovie);
					this.frame = flash.checkInt(this._target.currentFrame);
					this.addTween(this,"frame",this.frame,param2,"frame");
					return true;
				}

				public set changeFactor(param1:number)
				{
					this.updateTweens(param1);
					this._target.gotoAndStop(this.frame);
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.FramePlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.FramePlugin.API_static_com_greensock_plugins_FramePlugin = 1;
flash.extendsClass("com.greensock.plugins.FramePlugin","com.greensock.plugins.TweenPlugin")
