module com {
	export module strangevillage {
		export module wudywurm {
			export module base {
				export class GameBtnBase extends egret.Sprite {
					private _btnBg:egret.Sprite;
					public bBg:egret.SwfMovie;
					private _btFill:egret.Sprite;
					public doEventDispatch:boolean = true;

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

					private _click(param1:flash.MouseEvent)
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playClickSnd();
						if(this.doEventDispatch)
						{
							this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.ButtonEvent(this.name));
						}
					}

					private _out(param1:flash.MouseEvent)
					{
						com.greensock.TweenMax.to_static_com_greensock_TweenMax(this._btFill,0.2,{"colorTransform":{"exposure":1}});
					}

					private init(param1:egret.Event = null)
					{
						var _self__:any = this;
						_self__.removeEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.init,this),null);
						this._btnBg = flash.As3As(this.getChildByName("bBg"),egret.Sprite);
						this._btFill = flash.As3As(this._btnBg.getChildByName("btFill"),egret.Sprite);
						this.touchChildren = false;
						this["buttonMode"] = true;
						this.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._click,this),null,false,0);
						this.addEventListener(flash.MouseEvent.ROLL_OVER,flash.bind(this._over,this),null,false,0);
						this.addEventListener(flash.MouseEvent.ROLL_OUT,flash.bind(this._out,this),null,false,0);
					}

					public enableBtn(param1:boolean)
					{
						if(param1)
						{
							if(<any>!this.touchEnabled)
							{
								this.touchEnabled = true;
								this.alpha = 1;
							}
						}
						else if(this.touchEnabled)
						{
							this.touchEnabled = false;
							this.alpha = 0.5;
						}
					}

					private _over(param1:flash.MouseEvent)
					{
						com.greensock.TweenMax.to_static_com_greensock_TweenMax(this._btFill,0.2,{"colorTransform":{"exposure":1.1}});
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.base.GameBtnBase","egret.Sprite")
