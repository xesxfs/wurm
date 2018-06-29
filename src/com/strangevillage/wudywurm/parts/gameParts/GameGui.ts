module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export module gameParts {
					export class GameGui extends egret.Sprite {
						private _doorsDone:boolean = false;
						private _bbScale:number = 0.0;
						private _mainMc:GameGuiMc;
						private _gtScale:number = 0.0;

						public constructor()
						{
							super();
							com.strangevillage.wudywurm.Config.actualGameGui = this;
							this._setMainMc();
							this._setGuiState();
							this.updateCombo();
							this.updateMoves();
							this.updatePoints();
						}

						private _setGuiState()
						{
							if(com.strangevillage.wudywurm.Config.actuaLvlID == 0)
							{
								this._mainMc.gpPt.visible = false;
								this._mainMc.lg1.visible = false;
								this._mainMc.lg2.visible = true;
							}
							else
							{
								this._mainMc.lg1.visible = true;
								this._mainMc.lg2.visible = false;
							}
						}

						public updateCombo()
						{
							this._mainMc.fldCombo.text = com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length.toString();
						}

						public updatePoints()
						{
							this._mainMc.fldTotal.text = this.toString();
							if(com.strangevillage.wudywurm.Config.actuaLvlID != 0)
							{
								if(<any>!this._doorsDone)
								{
									if(com.strangevillage.wudywurm.Config.doorsLimit.value - com.strangevillage.wudywurm.Config.doorsPts.value > 0)
									{
										this._mainMc.gpPt.fldGate.text = String(com.strangevillage.wudywurm.Config.doorsLimit.value - com.strangevillage.wudywurm.Config.doorsPts.value);
									}
									else
									{
										this._mainMc.gpPt.fldGate.text = "0";
									}
									this._gtScale = com.strangevillage.wudywurm.Config.doorsPts.value / com.strangevillage.wudywurm.Config.doorsLimit.value;
									if(this._gtScale > 1)
									{
										this._gtScale = 1;
									}
									if(this._gtScale != this._mainMc.gpPt.gateBar.scaleX)
									{
										com.greensock.TweenLite.killTweensOf(this._mainMc.gpPt.gateBar);
										if(this._gtScale == 0)
										{
											this._mainMc.gpPt.gateBar.scaleX = this._gtScale;
										}
										else
										{
											com.greensock.TweenLite.to(this._mainMc.gpPt.gateBar,0.3,{"scaleX":this._gtScale,"ease":com.greensock.easing.Sine.easeInOut});
										}
									}
								}
								if(com.strangevillage.wudywurm.Config.totalPts.value > com.strangevillage.wudywurm.Config.soArr[3])
								{
									com.strangevillage.wudywurm.Config.soArr[3] = com.strangevillage.wudywurm.Config.totalPts.value;
								}
								this._mainMc.fldBest.text = com.strangevillage.wudywurm.Config.soArr[3];
							}
							else
							{
								if(com.strangevillage.wudywurm.Config.totalPts.value > com.strangevillage.wudywurm.Config.soArr[4])
								{
									com.strangevillage.wudywurm.Config.soArr[4] = com.strangevillage.wudywurm.Config.totalPts.value;
								}
								this._mainMc.fldBest.text = com.strangevillage.wudywurm.Config.soArr[4];
							}
						}

						private _setMainMc()
						{
							this._mainMc = new GameGuiMc();
							this.addChild(this._mainMc);
							this._mainMc.gpPt.gateBar.scaleX = 0;
							this._mainMc.nbPt.nextBlockBar.scaleX = 0;
							this._mainMc.fldBest.text = "0";
						}

						public showDoorsDoneMsg()
						{
							this.updatePoints();
							this._doorsDone = true;
							this._mainMc.gpPt.fldGate.text = "ALL OPEN";
							com.greensock.TweenLite.killTweensOf(this._mainMc.gpPt.gateBar);
							com.greensock.TweenLite.to(this._mainMc.gpPt.gateBar,0.3,{"scaleX":this._gtScale,"ease":com.greensock.easing.Sine.easeInOut});
						}

						public updateMoves()
						{
							if(com.strangevillage.wudywurm.Config.newClrCount.value >= com.strangevillage.wudywurm.Config.newClrLimit.value)
							{
								com.strangevillage.wudywurm.Config.newClrCount.setValue(com.strangevillage.wudywurm.Config.newClrCount.value % com.strangevillage.wudywurm.Config.newClrLimit.value);
								if(com.strangevillage.wudywurm.Config.posClrsVec.length != 0)
								{
									com.strangevillage.wudywurm.Config.addRandomClr();
								}
								else
								{
									console.log("No color add - all used");
								}
							}
							if(com.strangevillage.wudywurm.Config.nextBlock.value >= com.strangevillage.wudywurm.Config.nextBlockLimit.value)
							{
								this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.GameEvent("AddRandomBlock"));
								com.strangevillage.wudywurm.Config.nextBlock.setValue(0);
								com.strangevillage.wudywurm.Config.nextBlDec.addValue(1);
								if(com.strangevillage.wudywurm.Config.nextBlDec.value >= com.strangevillage.wudywurm.Config.nextBlDecLimit.value)
								{
									com.strangevillage.wudywurm.Config.nextBlDec.setValue(0);
									if(com.strangevillage.wudywurm.Config.nextBlockLimit.value > 2)
									{
										com.strangevillage.wudywurm.Config.nextBlockLimit.addValue(-1);
									}
								}
							}
							this._mainMc.fldMoves.text = this.toString();
							this._mainMc.nbPt.fldNextBlock.text = String(com.strangevillage.wudywurm.Config.nextBlockLimit.value - com.strangevillage.wudywurm.Config.nextBlock.value - 1);
							this._bbScale = com.strangevillage.wudywurm.Config.nextBlock.value / (com.strangevillage.wudywurm.Config.nextBlockLimit.value - 1);
							if(this._bbScale > 1)
							{
								this._bbScale = 1;
							}
							if(this._bbScale != this._mainMc.nbPt.nextBlockBar.scaleX)
							{
								com.greensock.TweenLite.killTweensOf(this._mainMc.nbPt.nextBlockBar);
								if(this._bbScale == 0)
								{
									this._mainMc.nbPt.nextBlockBar.scaleX = this._bbScale;
								}
								else
								{
									com.greensock.TweenLite.to(this._mainMc.nbPt.nextBlockBar,0.2,{"scaleX":this._bbScale,"ease":com.greensock.easing.Sine.easeInOut});
								}
							}
						}

					}
				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.gameParts.GameGui","egret.Sprite")
