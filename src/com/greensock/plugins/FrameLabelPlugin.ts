module com {
	export module greensock {
		export module plugins {
			export class FrameLabelPlugin extends com.greensock.plugins.FramePlugin {
				public static API_static_com_greensock_plugins_FrameLabelPlugin:number;

				public constructor()
				{
					super();
					this.propName = "frameLabel";
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					if(flash.As3is(<any>!param3.target,egret.SwfMovie))
					{
						return false;
					}
					this._target = flash.As3As(param1,egret.SwfMovie);
					this.frame = flash.checkInt(this._target.currentFrame);
					var _loc4_:Array<any> = this._target["currentLabels"];
					var _loc5_:string = <any>param2;
					var _loc6_:number = flash.checkInt(this._target.currentFrame);
					var _loc7_:number = flash.checkInt(_loc4_.length);
					while(_loc7_--)
					{
						if(_loc4_[_loc7_].name == _loc5_)
						{
							_loc6_ = flash.checkInt(_loc4_[_loc7_].frame);
							break;
						}
					}
					if(this.frame != _loc6_)
					{
						this.addTween(this,"frame",this.frame,_loc6_,"frame");
					}
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.FrameLabelPlugin.API_static_com_greensock_plugins_FrameLabelPlugin = 1;
flash.extendsClass("com.greensock.plugins.FrameLabelPlugin","com.greensock.plugins.FramePlugin")
