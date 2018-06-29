module com {
	export module strangevillage {
		export module wudywurm {
			export module base {
				export class RedirectLogo extends egret.Sprite {
					public lgHit:egret.SwfMovie;
					private _hit:egret.Sprite;

					public constructor()
					{
						super();
						this.touchChildren = false;
						this["buttonMode"] = true;
						this._hit = flash.As3As(this.getChildByName("lgHit"),egret.Sprite);
						this["hitArea"] = this._hit;
						this._hit.visible = false;
						this.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._click,this),null,false,0);
					}

					private _click(param1:flash.MouseEvent)
					{
						flash.navigateToURL(new egret.URLRequest(com.strangevillage.wudywurm.Config.REDIRECT_URL),com.strangevillage.wudywurm.Config.REDIRECT_TYPE);
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.base.RedirectLogo","egret.Sprite")
