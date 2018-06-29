module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export class FocusOver extends egret.Sprite {
					private _mainMc:FocusOverMc;
					private _overMc:egret.Sprite;

					public constructor()
					{
						super();
						this.visible = false;
						this.touchChildren = false;
						this.alpha = 0;
						this._setOver();
						this._mainMc = new FocusOverMc();
						this.addChild(this._mainMc);
					}

					private _setOver()
					{
						this._overMc = new egret.Sprite();
						this._overMc.graphics.beginFill(5321260,0.6);
						this._overMc.graphics.drawRect(0,0,com.strangevillage.wudywurm.Config.GAME_W,com.strangevillage.wudywurm.Config.GAME_H);
						this._overMc.graphics.endFill();
						this.addChild(this._overMc);
					}

					public showOver()
					{
						this.visible = true;
						this.alpha = 0;
						com.greensock.TweenLite.to(this,0.2,{"alpha":1});
					}

					public hideOver()
					{
						com.greensock.TweenLite.killTweensOf(this);
						com.greensock.TweenLite.to(this,0.2,{"alpha":0,"onComplete":flash.bind(this._hideEnd,this)});
					}

					private _hideEnd()
					{
						this.visible = false;
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.FocusOver","egret.Sprite")
