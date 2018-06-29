module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export class LevelCompleteOver extends egret.Sprite {
					private _mainMc:LevelCompleteOverMc;
					private HIDE_Y:number = -505;
					private _hideType:number = 0;

					public constructor()
					{
						super();
						this.visible = false;
						this._mainMc = new LevelCompleteOverMc();
						this.addChild(this._mainMc);
						this._mainMc.lvlCompCont.gotoAndStop(1);
					}

					public showOver()
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playGameComplete();
						this.enableOver(false);
						if(com.strangevillage.wudywurm.Config.actuaLvlID == com.strangevillage.wudywurm.Config.lvlsTotal)
						{
							this._mainMc.lvlCompCont.gotoAndStop(2);
						}
						else
						{
							this._mainMc.lvlCompCont.gotoAndStop(1);
						}
						this.visible = true;
						this.y = this.HIDE_Y;
						com.greensock.TweenLite.to(this,0.6,{"y":0,"ease":com.greensock.easing.Back.easeOut,"onComplete":flash.bind(this._showEnd,this)});
					}

					private _showEnd()
					{
						if(com.strangevillage.wudywurm.Config.actuaLvlID < com.strangevillage.wudywurm.Config.lvlsTotal && com.strangevillage.wudywurm.Config.actuaLvlID == com.strangevillage.wudywurm.Config.soArr[5])
						{
							com.strangevillage.wudywurm.Config.soArr[5] = flash.tranint(com.strangevillage.wudywurm.Config.soArr[5]) + 1;
						}
						com.strangevillage.wudywurm.Config.updateSO();
						this.enableOver(true);
					}

					public hideOver(param1:number)
					{
						param1 = flash.checkInt(param1);
						this._hideType = flash.checkInt(param1);
						this.enableOver(false);
						com.greensock.TweenLite.to(this,0.4,{"y":this.HIDE_Y,"ease":com.greensock.easing.Sine.easeIn,"onComplete":flash.bind(this._hideEnd,this)});
					}

					private _hideEnd()
					{
						this.visible = false;
						if(this._hideType == 1)
						{
							this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.MainEvent("CompleteToNextLvl"));
						}
						else if(this._hideType == 2)
						{
							this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.MainEvent("CompleteToLvlSelect"));
						}
						else if(this._hideType == 3)
						{
							this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.MainEvent("CompleteToMain"));
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

flash.extendsClass("com.strangevillage.wudywurm.parts.LevelCompleteOver","egret.Sprite")
