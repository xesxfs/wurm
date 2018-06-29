module com {
	export module strangevillage {
		export module wudywurm {
			export module base {
				export class TopMenuBtnBase extends egret.SwfMovie {
					private _hit:egret.Sprite;
					public tHit:egret.SwfMovie;

					public constructor()
					{
						super(						var _self__:any = this;
);
						if(this.stage)
						{
							this.init();
						}
						else
						{
							_self__.addEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.init,this),null);
						}
					}

					private init(param1:egret.Event = null)
					{
						var _self__:any = this;
						_self__.removeEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.init,this),null);
						this._hit = flash.As3As(this.getChildByName("tHit"),egret.Sprite);
						this["hitArea"] = this._hit;
						this._hit.visible = false;
						this.touchChildren = false;
						this["buttonMode"] = true;
						this.addEventListener(flash.MouseEvent.ROLL_OVER,flash.bind(this._over,this),null,false,0);
						this.addEventListener(flash.MouseEvent.ROLL_OUT,flash.bind(this._out,this),null,false,0);
					}

					private _out(param1:flash.MouseEvent)
					{
						com.greensock.TweenMax.to_static_com_greensock_TweenMax(this,0.2,{"colorTransform":{"exposure":1}});
					}

					private _over(param1:flash.MouseEvent)
					{
						com.greensock.TweenMax.to_static_com_greensock_TweenMax(this,0.2,{"colorTransform":{"exposure":1.1}});
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.base.TopMenuBtnBase","egret.SwfMovie")
