module com {
	export module strangevillage {
		export module wudywurm {
			export module base {
				export class LevelSelectBtnBase extends egret.Sprite {
					public fldLvlNum:flash.TextField;
					private _btFill:egret.Sprite;
					public bBg:egret.SwfMovie;
					private _btnBg:egret.Sprite;
					public fldLvlNumShd:flash.TextField;
					private _lvlFldShd:flash.TextField;
					private _lvlFld:flash.TextField;
					public lvlID:number = 0;

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
						this._btnBg = flash.As3As(this.getChildByName("bBg"),egret.Sprite);
						this._btFill = flash.As3As(this._btnBg.getChildByName("btFill"),egret.Sprite);
						this.touchChildren = false;
						this["buttonMode"] = true;
						this.lvlID = flash.checkInt(flash.tranint(this.name.split("_")[1]));
						this._lvlFld = flash.As3As(this.getChildByName("fldLvlNum"),flash.TextField);
						this._lvlFldShd = flash.As3As(this.getChildByName("fldLvlNumShd"),flash.TextField);
						this._lvlFld.text = this.toString();
						this._lvlFldShd.text = this.toString();
						this.addEventListener(flash.MouseEvent.ROLL_OVER,flash.bind(this._over,this),null,false,0);
						this.addEventListener(flash.MouseEvent.ROLL_OUT,flash.bind(this._out,this),null,false,0);
						this.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._click,this),null,false,0);
					}

					public lockBtn(param1:boolean)
					{
						if(param1)
						{
							this.touchEnabled = false;
							this.alpha = 0.4;
						}
						else
						{
							this.touchEnabled = true;
							this.alpha = 1;
						}
					}

					private _over(param1:flash.MouseEvent)
					{
						com.greensock.TweenMax.to_static_com_greensock_TweenMax(this._btFill,0.2,{"colorTransform":{"exposure":1.1}});
					}

					private _click(param1:flash.MouseEvent)
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playClickSnd();
						com.strangevillage.wudywurm.Config.actuaLvlID = flash.checkInt(this.lvlID);
						this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.ButtonEvent("LevelSelect"));
					}

					private _out(param1:flash.MouseEvent)
					{
						com.greensock.TweenMax.to_static_com_greensock_TweenMax(this._btFill,0.2,{"colorTransform":{"exposure":1}});
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.base.LevelSelectBtnBase","egret.Sprite")
