module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export class GiveUpOver extends egret.Sprite {
					private _mainMc:GiveUpOverMc;
					private _yesClicked:boolean = false;
					private HIDE_Y:number = -490;

					public constructor()
					{
						super();
						this.visible = false;
						this._mainMc = new GiveUpOverMc();
						this.addChild(this._mainMc);
						this._mainMc.GiveYesBtn.doEventDispatch = false;
						this._mainMc.GiveNoBtn.doEventDispatch = false;
						this._mainMc.GiveYesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._yesClick,this),null,false,0);
						this._mainMc.GiveNoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._noClick,this),null,false,0);
					}

					private _yesClick(param1:flash.MouseEvent)
					{
						this._yesClicked = true;
						this.hideGiveUp();
					}

					private _noClick(param1:flash.MouseEvent)
					{
						this._yesClicked = false;
						this.hideGiveUp();
					}

					public showGiveUp()
					{
						this.enableOver(false);
						this.visible = true;
						this.y = this.HIDE_Y;
						com.greensock.TweenLite.to(this,0.6,{"y":0,"ease":com.greensock.easing.Back.easeOut,"onComplete":flash.bind(this._showEnd,this)});
					}

					private _showEnd()
					{
						com.strangevillage.wudywurm.Config.updateSO();
						this.enableOver(true);
					}

					public hideGiveUp()
					{
						this.enableOver(false);
						com.greensock.TweenLite.to(this,0.4,{"y":this.HIDE_Y,"ease":com.greensock.easing.Sine.easeIn,"onComplete":flash.bind(this._hideEnd,this)});
					}

					private _hideEnd()
					{
						this.visible = false;
						if(this._yesClicked)
						{
							this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.MainEvent("GiveUp"));
						}
						else
						{
							this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.GameEvent("enableGame"));
						}
					}

					public enableOver(param1:boolean)
					{
						if(param1)
						{
							this.touchChildren = true;
							this.touchEnabled = true;
						}
						else
						{
							this.touchChildren = false;
							this.touchEnabled = false;
						}
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.GiveUpOver","egret.Sprite")
