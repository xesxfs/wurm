module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export class EndOver extends egret.Sprite {
					private _mainMc:EndOverMc;
					private _hideType:number = 0;
					private HIDE_Y:number = -460;

					public constructor()
					{
						super();
						this.visible = false;
						this._mainMc = new EndOverMc();
						this.addChild(this._mainMc);
						this._mainMc.endTitleMc.gotoAndStop(1);
						this._mainMc.sTh1.gotoAndStop(1);
						this._mainMc.sTh2.gotoAndStop(1);
						this._mainMc.sTh1["buttonMode"] = true;
						this._mainMc.sTh2["buttonMode"] = true;
						this._mainMc.EndAgainBtn.doEventDispatch = false;
						this._mainMc.EndMainBtn.doEventDispatch = false;
						this._mainMc.EndAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._againClick,this),null,false,0);
						this._mainMc.EndMainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._mainMenuClick,this),null,false,0);
						this._mainMc.sTh1.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._thumbClick,this),null,false,0);
						this._mainMc.sTh2.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._thumbClick,this),null,false,0);
						this._mainMc.EndHighBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._highClick,this),null,false,0);
						this._mainMc.EndSubmitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._submitClick,this),null,false,0);
					}

					private _againClick(param1:flash.MouseEvent)
					{
						this._hideType = flash.checkInt(1);
						this.hideOver();
					}

					private _mainMenuClick(param1:flash.MouseEvent)
					{
						this._hideType = flash.checkInt(2);
						this.hideOver();
					}

					private _thumbClick(param1:flash.MouseEvent)
					{
						flash.navigateToURL(new egret.URLRequest(com.strangevillage.wudywurm.Config.REDIRECT_URL),com.strangevillage.wudywurm.Config.REDIRECT_TYPE);
					}

					private _highClick(param1:flash.MouseEvent)
					{
						if(com.strangevillage.wudywurm.Config.actuaLvlID == 0)
						{
							this._showFreeride();
						}
						else
						{
							this._showChamber();
						}
					}

					private _showChamber()
					{
						var o:any = {"n":[2,10,3,10,10,0,12,3,7,13,15,3,10,10,11,6],"f":function (param1:number,param2:string):string
{
	if(param2.length == 16)
	{
		return param2;
	}
	return this["f"](param1 + 1,param2 + this["n"][param1].toString(16));
}};
						var boardID:string = <any>o["f"](0,"");
						mochi.as3.MochiScores.showLeaderboard({"boardID":boardID});
					}

					private _showFreeride()
					{
						var o:any = {"n":[0,0,12,7,12,2,12,7,10,6,1,1,15,2,1,13],"f":function (param1:number,param2:string):string
{
	if(param2.length == 16)
	{
		return param2;
	}
	return this["f"](param1 + 1,param2 + this["n"][param1].toString(16));
}};
						var boardID:string = <any>o["f"](0,"");
						mochi.as3.MochiScores.showLeaderboard({"boardID":boardID});
					}

					private _submitClick(param1:flash.MouseEvent)
					{
						if(com.strangevillage.wudywurm.Config.actuaLvlID == 0)
						{
							this._submitFreeride();
						}
						else
						{
							this._submitChamber();
						}
					}

					private _submitChamber()
					{
						var o:any = {"n":[2,10,3,10,10,0,12,3,7,13,15,3,10,10,11,6],"f":function (param1:number,param2:string):string
{
	if(param2.length == 16)
	{
		return param2;
	}
	return this["f"](param1 + 1,param2 + this["n"][param1].toString(16));
}};
						var boardID:string = <any>o["f"](0,"");
						mochi.as3.MochiScores.showLeaderboard({"boardID":boardID,"score":com.strangevillage.wudywurm.Config.totalPts.value});
					}

					private _submitFreeride()
					{
						var o:any = {"n":[0,0,12,7,12,2,12,7,10,6,1,1,15,2,1,13],"f":function (param1:number,param2:string):string
{
	if(param2.length == 16)
	{
		return param2;
	}
	return this["f"](param1 + 1,param2 + this["n"][param1].toString(16));
}};
						var boardID:string = <any>o["f"](0,"");
						mochi.as3.MochiScores.showLeaderboard({"boardID":boardID,"score":com.strangevillage.wudywurm.Config.totalPts.value});
					}

					public showOver(param1:number)
					{
						param1 = flash.checkInt(param1);
						com.strangevillage.wudywurm.helpers.SoundManager.playGameEnd();
						this._mainMc.sTh1.gotoAndStop(1 + Math.round(Math.random() * 6));
						this._mainMc.sTh2.gotoAndStop(8 + Math.round(Math.random() * 7));
						this.enableOver(false);
						this._mainMc.endTitleMc.gotoAndStop(param1);
						this.visible = true;
						this.y = this.HIDE_Y;
						com.greensock.TweenLite.to(this,0.6,{"y":0,"ease":com.greensock.easing.Back.easeOut,"onComplete":flash.bind(this._showEnd,this)});
					}

					private _showEnd()
					{
						com.strangevillage.wudywurm.Config.updateSO();
						this.enableOver(true);
					}

					public hideOver()
					{
						this.enableOver(false);
						com.greensock.TweenLite.to(this,0.4,{"y":this.HIDE_Y,"ease":com.greensock.easing.Sine.easeIn,"onComplete":flash.bind(this._hideEnd,this)});
					}

					private _hideEnd()
					{
						this.visible = false;
						if(this._hideType == 1)
						{
							this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.MainEvent("PlayAgain"));
						}
						else if(this._hideType == 2)
						{
							this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.MainEvent("EndToMain"));
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

flash.extendsClass("com.strangevillage.wudywurm.parts.EndOver","egret.Sprite")
