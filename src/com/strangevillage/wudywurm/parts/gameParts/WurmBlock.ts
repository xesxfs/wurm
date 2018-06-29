module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export module gameParts {
					export class WurmBlock extends egret.Sprite {
						public hID:number = 0;
						private _tempCoHID:number = 0;
						private _posXDiff:number = 0;
						private _hitMc:egret.Sprite;
						private _posYDiff:number = 0;
						private _moveTime:number = 0.0;
						public posShift:number = 0;
						public cMoveVec:Array<number>;
						private _doneAnimSteps:Array<number>;
						public bType:number = 0;
						private _doneTempPos:number = 0;
						public doorsHit:boolean = false;
						public wID:number = 0;
						private _tempCoWID:number = 0;
						private _mainMc:egret.SwfMovie;
						private _headHilite:WmHltAnim;
						public grabID:number = 0;
						public wormID:number = 0;
						public posID:number = 0;
						private _hilitePt:com.strangevillage.wudywurm.base.ItemHiliterBase;
						private _wurmEyes:snakeEyeFill;
						public moving:boolean = false;
						private DONE_TWN_TIME:number = 0.2;

						public constructor(param1:number,param2:number,param3:number,param4:boolean,param5:number)
						{
							super();
							param1 = flash.checkInt(param1);
							param2 = flash.checkInt(param2);
							param3 = flash.checkInt(param3);
							param5 = flash.checkInt(param5);
							this._doneAnimSteps = new Array<number>();
							this.cMoveVec = new Array<number>();
							this.wormID = flash.checkInt(param1);
							this.bType = flash.checkInt(param5);
							this.touchChildren = false;
							if(param4)
							{
								this["buttonMode"] = true;
								this._setHit();
							}
							else
							{
								this.touchEnabled = false;
							}
							this._setMc();
							this.idUp(param2,param3,false);
							this.x = this.wID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE;
							this.y = this.hID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE;
						}

						public nullBlockVecID()
						{
							com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this.posID] = flash.checkInt(0);
						}

						private _moveEnd()
						{
							this.wID = flash.checkInt(this._tempCoWID);
							this.hID = flash.checkInt(this._tempCoHID);
							this.posID = flash.checkInt(this.hID * com.strangevillage.wudywurm.helpers.GridHolder.GRID_W + this.wID);
							com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this.posID] = flash.checkInt(this.bType);
							this.cMoveVec = Array<number>([]);
							this.moving = false;
						}

						public comboDestroy()
						{
							this.nullBlockVecID();
							this._destroyBlock();
						}

						private _playHltAnim()
						{
							this._headHilite.visible = true;
							this._headHilite.gotoAndPlay(2);
						}

						private _startDoneMoveTween()
						{
							this._tempCoHID = flash.checkInt(this._doneAnimSteps.splice(this._doneAnimSteps.length - 1,1)[0]);
							this._tempCoWID = flash.checkInt(this._doneAnimSteps.splice(this._doneAnimSteps.length - 1,1)[0]);
							com.greensock.TweenLite.to(this,this.DONE_TWN_TIME,{"x":this._tempCoWID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE,"y":this._tempCoHID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE,"ease":com.greensock.easing.Linear.easeNone,"onComplete":flash.bind(this._doneTwnEnd,this)});
						}

						public idUp(param1:number,param2:number,param3:boolean)
						{
							param1 = flash.checkInt(param1);
							param2 = flash.checkInt(param2);
							this.posID = flash.checkInt(param2 * com.strangevillage.wudywurm.helpers.GridHolder.GRID_W + param1);
							this.wID = flash.checkInt(param1);
							this.hID = flash.checkInt(param2);
							if(this.bType == 111)
							{
								this._wurmEyes.gotoAndStop(1);
								if(com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this.posID] > 0 && com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this.posID] < 10)
								{
									com.strangevillage.wudywurm.helpers.SoundManager.playGrab();
									this.grabID = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this.posID]);
									this._wurmEyes.gotoAndStop(this.grabID + 1);
									com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec[this.posID].grabDestroy();
								}
								else if(com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this.posID] == 66)
								{
									this.doorsHit = true;
								}
							}
							com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this.posID] = flash.checkInt(this.bType);
							if(param3)
							{
								this._posXDiff = flash.checkInt(this.x - this.wID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								this._posYDiff = flash.checkInt(this.y - this.hID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
							}
						}

						private _combTwnEnd()
						{
							if(this.cMoveVec.length != 0)
							{
								this._startCombMoveTween();
							}
							else
							{
								this._moveEnd();
							}
						}

						private _setMc()
						{
							if(this.bType == 111)
							{
								this._mainMc = new WurmFrontMc();
								this._wurmEyes = flash.As3As(this._mainMc.getChildByName("eyFill"),snakeEyeFill);
								this._wurmEyes.gotoAndStop(1);
								this._headHilite = flash.As3As(this._mainMc.getChildByName("hAnim"),WmHltAnim);
								this._headHilite.gotoAndStop(1);
								this._headHilite.visible = false;
								this._headHilite["addFrameScript"](this._headHilite.totalFrames - 1,flash.bind(this._hltAnimEnd,this));
							}
							else
							{
								this._mainMc = new WurmBodyMc();
								this._mainMc.gotoAndStop(this.bType - 50);
								this._hilitePt = flash.As3As(this._mainMc.getChildByName("hltBg"),com.strangevillage.wudywurm.base.ItemHiliterBase);
							}
							if(this._mainMc != null)
							{
								this.addChild(this._mainMc);
							}
							else
							{
								console.log("Wrong Train Block Type!");
							}
						}

						public doneDestroy()
						{
							var _loc1_:number = flash.checkInt(0);
							this.moving = true;
							this.nullBlockVecID();
							this._doneTempPos = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[this.wormID].indexOf(this));
							if(this._doneTempPos == 0)
							{
								this._doneDestroyEnd();
							}
							else
							{
								_loc1_ = flash.checkInt(0);
								while(_loc1_ < this._doneTempPos)
								{
									this._doneAnimSteps.push(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[this.wormID][_loc1_].wID);
									this._doneAnimSteps.push(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[this.wormID][_loc1_].hID);
									_loc1_++;
								}
								this._startDoneMoveTween();
							}
						}

						private _hltAnimEnd()
						{
							this._headHilite.gotoAndStop(1);
							this._headHilite.visible = false;
						}

						private _destroyBlock()
						{
							this.removeChild(this._mainMc);
							this._mainMc = null;
							this.parent.removeChild(this);
						}

						public playHiliteAnim(param1:boolean = false)
						{
							if(param1)
							{
								com.greensock.TweenLite.to(this._headHilite,0.9,{"onComplete":flash.bind(this._playHltAnim,this)});
							}
							else
							{
								this._playHltAnim();
							}
						}

						public startComboMove(param1:number)
						{
							param1 = flash.checkInt(param1);
							this.posShift = flash.checkInt(0);
							this.moving = true;
							this.nullBlockVecID();
							if(param1 <= 3)
							{
								this._moveTime = 0.15;
							}
							else if(param1 <= 6)
							{
								this._moveTime = 0.1;
							}
							else
							{
								this._moveTime = 0.08;
							}
							this._startCombMoveTween();
						}

						private _doneDestroyEnd()
						{
							com.strangevillage.wudywurm.helpers.SoundManager.playDoorsFall();
							this._destroyBlock();
							this.moving = false;
						}

						public moveUp(param1:number,param2:boolean)
						{
							if(<any>!param2)
							{
								if(this._posXDiff != 0)
								{
									this.x = this.wID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE + this._posXDiff * (1 - param1);
								}
								if(this._posYDiff != 0)
								{
									this.y = this.hID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE + this._posYDiff * (1 - param1);
								}
							}
							else
							{
								this._posXDiff = flash.checkInt(0);
								this._posYDiff = flash.checkInt(0);
								this.x = this.wID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE;
								this.y = this.hID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE;
							}
						}

						private _doneTwnEnd()
						{
							if(this._doneAnimSteps.length != 0)
							{
								this._startDoneMoveTween();
							}
							else
							{
								this._doneDestroyEnd();
							}
						}

						public checkHilite()
						{
							if(this._hilitePt != null)
							{
								if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.indexOf(this.posID) != -1)
								{
									this._hilitePt.hilite(true);
								}
								else
								{
									this._hilitePt.hilite(false);
								}
							}
						}

						private _setHit()
						{
							this._hitMc = new egret.Sprite();
							this._hitMc.graphics.beginFill(0,1);
							this._hitMc.graphics.drawRect(0,0,com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE,com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
							this._hitMc.graphics.endFill();
							this.addChild(this._hitMc);
							this["hitArea"] = this._hitMc;
							this._hitMc.visible = false;
						}

						private _startCombMoveTween()
						{
							this._tempCoWID = flash.checkInt(this.cMoveVec.splice(0,1)[0]);
							this._tempCoHID = flash.checkInt(this.cMoveVec.splice(0,1)[0]);
							com.greensock.TweenLite.to(this,this._moveTime,{"x":this._tempCoWID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE,"y":this._tempCoHID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE,"ease":com.greensock.easing.Linear.easeNone,"onComplete":flash.bind(this._combTwnEnd,this)});
						}

					}
				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.gameParts.WurmBlock","egret.Sprite")
