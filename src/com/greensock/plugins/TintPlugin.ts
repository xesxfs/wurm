module com {
	export module greensock {
		export module plugins {
			export class TintPlugin extends com.greensock.plugins.TweenPlugin {
				public static _props:Array<any>;
				public static API_static_com_greensock_plugins_TintPlugin:number;
				protected _transform:flash.Transform;

				public constructor()
				{
					super();
					this.propName = "tint";
					this.overwriteProps = ["tint"];
				}

				public init(param1:flash.ColorTransform,param2:flash.ColorTransform)
				{
					var _loc4_:string = <any>null;
					var _loc3_:number = flash.checkInt(com.greensock.plugins.TintPlugin._props.length);
					var _loc5_:number = flash.checkInt(this._tweens.length);
					while(_loc3_--)
					{
						_loc4_ = com.greensock.plugins.TintPlugin._props[_loc3_];
						if(param1[_loc4_] != param2[_loc4_])
						{
							this._tweens[_loc5_++] = new com.greensock.core.PropTween(param1,_loc4_,param1[_loc4_],param2[_loc4_] - param1[_loc4_],"tint",false);
						}
					}
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					if(<any>!(flash.As3is(param1,egret.DisplayObject)))
					{
						return false;
					}
					var _loc4_:flash.ColorTransform = new flash.ColorTransform();
					if(param2 != null && param3.vars["removeTint"] != true)
					{
						_loc4_.color = flash.tranint(param2);
					}
					this._transform = (<egret.DisplayObject>(param1))["transform"];
					var _loc5_:flash.ColorTransform = this._transform.colorTransform;
					_loc4_.alphaMultiplier = _loc5_.alphaMultiplier;
					_loc4_.alphaOffset = _loc5_.alphaOffset;
					this.init(_loc5_,_loc4_);
					return true;
				}

				public set changeFactor(param1:number)
				{
					var _loc2_:flash.ColorTransform = <any>null;
					var _loc3_:com.greensock.core.PropTween = <any>null;
					var _loc4_:number = flash.checkInt(0);
					if(this._transform)
					{
						_loc2_ = this._transform.colorTransform;
						_loc4_ = flash.checkInt(this._tweens.length);
						while(--_loc4_ > -1)
						{
							_loc3_ = this._tweens[_loc4_];
							_loc2_[_loc3_.property] = _loc3_.start + _loc3_.change * param1;
						}
						this._transform.colorTransform = _loc2_;
					}
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.TintPlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.TintPlugin._props = ["redMultiplier","greenMultiplier","blueMultiplier","alphaMultiplier","redOffset","greenOffset","blueOffset","alphaOffset"];
com.greensock.plugins.TintPlugin.API_static_com_greensock_plugins_TintPlugin = 1;
flash.extendsClass("com.greensock.plugins.TintPlugin","com.greensock.plugins.TweenPlugin")
