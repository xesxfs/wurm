module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export module gameParts {
					export class Wurms extends egret.Sprite {
						private _wurmsNum:number = 0;
						private _wurmsLengthVec:Array<number>;
						private _tempL:number = 0;
						private _tempPosX:number = 0;
						private _tempPosY:number = 0;
						private _moving:boolean = false;
						private _dragAcite:boolean = false;
						private _moveDir:number = 0;
						private _dragEnded:boolean = false;
						private _moveTween:com.greensock.TweenMax;
						private MOVE_TIME:number = 0.2;
						private _selMoveVec:Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>;
						private _addSkippedMove:boolean = false;
						private _isKeyMove:boolean = false;
						private _moveCheckTemp:boolean = false;
						private _grabRetType:number = 0;
						private _wurmsDestroyed:number = 0;
						private _desWurmID:number = 0;
						private _lineLr:com.strangevillage.wudywurm.parts.gameParts.WurmsLines;

						public constructor()
						{
							super();
							this._wurmsLengthVec = new Array<number>();
							this._selMoveVec = new Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>();
							this.x = com.strangevillage.wudywurm.helpers.GridHolder.GRID_X;
							this.y = com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y;
							this._getWurmsNum();
							this._getWurmsLength();
							this._setLinesLr();
							this._setWurms();
							this._lineLr.drawLines();
							com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock = com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[0][0];
							com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock.playHiliteAnim(true);
						}

						private _getWurmsNum()
						{
							this._wurmsNum = flash.checkInt(0);
							var _loc1_:number = flash.checkInt(0);
							while(_loc1_ < com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").children().length())
							{
								if(this._wurmsNum < flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").dot("WormPart").dot(_loc1_).dotAlt("wID")))
								{
									this._wurmsNum = flash.checkInt(flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").dot("WormPart").dot(_loc1_).dotAlt("wID")));
								}
								_loc1_++;
							}
							com.strangevillage.wudywurm.helpers.GridHolder.doorsTotal = flash.checkInt(this._wurmsNum);
							var _loc2_:number = flash.checkInt(0);
							while(_loc2_ < this._wurmsNum)
							{
								this._wurmsLengthVec.push(0);
								com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs.push(new Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>());
								_loc2_++;
							}
						}

						private _getWurmsLength()
						{
							var _loc1_:number = flash.checkInt(0);
							while(_loc1_ < com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").children().length())
							{
								if(this._wurmsLengthVec[flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").dot("WormPart").dot(_loc1_).dotAlt("wID")) - 1] < flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").dot("WormPart").dot(_loc1_).dotAlt("posID")))
								{
									this._wurmsLengthVec[flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").dot("WormPart").dot(_loc1_).dotAlt("wID")) - 1] = flash.checkInt(flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").dot("WormPart").dot(_loc1_).dotAlt("posID")));
								}
								_loc1_++;
							}
						}

						private _setWurms()
						{
							var _loc2_:number = flash.checkInt(0);
							var _loc3_:number = flash.checkInt(0);
							var _loc4_:com.strangevillage.wudywurm.parts.gameParts.WurmBlock = <any>null;
							var _loc5_:com.strangevillage.wudywurm.parts.gameParts.WurmBlock = <any>null;
							var _loc1_:number = flash.checkInt(0);
							while(_loc1_ < this._wurmsNum)
							{
								_loc2_ = flash.checkInt(1);
								while(_loc2_ <= this._wurmsLengthVec[_loc1_])
								{
									_loc3_ = flash.checkInt(0);
									while(_loc3_ < com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").children().length())
									{
										if(flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").dot("WormPart").dot(_loc3_).dotAlt("wID")) == _loc1_ + 1 && flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").dot("WormPart").dot(_loc3_).dotAlt("posID")) == _loc2_)
										{
											this._tempPosX = flash.checkInt(flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").dot("WormPart").dot(_loc3_).dotAlt("x")) / com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
											this._tempPosY = flash.checkInt(flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Worms").dot("WormPart").dot(_loc3_).dotAlt("y")) / com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
											if(_loc2_ == 1)
											{
												_loc4_ = new com.strangevillage.wudywurm.parts.gameParts.WurmBlock(_loc1_,this._tempPosX,this._tempPosY,true,111);
												this.addChild(_loc4_);
												com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_].push(_loc4_);
												_loc4_.addEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this._startPartDrag,this),null,false,0);
											}
											else
											{
												_loc5_ = new com.strangevillage.wudywurm.parts.gameParts.WurmBlock(_loc1_,this._tempPosX,this._tempPosY,false,50 + com.strangevillage.wudywurm.helpers.GridHolder.getGrabClrID(this._tempPosX,this._tempPosY));
												this.addChild(_loc5_);
												com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_].push(_loc5_);
											}
											break;
										}
										_loc3_++;
									}
									_loc2_++;
								}
								_loc1_++;
							}
						}

						private _startPartDrag(param1:flash.MouseEvent)
						{
							if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length > 0)
							{
								this.dragEnd();
							}
							else
							{
								com.strangevillage.wudywurm.helpers.SoundManager.playHeadClick();
								this._dragAcite = true;
								com.strangevillage.wudywurm.helpers.GridHolder.dragBlock = flash.As3As(param1.target,com.strangevillage.wudywurm.parts.gameParts.WurmBlock);
								com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock = com.strangevillage.wudywurm.helpers.GridHolder.dragBlock;
								com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.playHiliteAnim();
								this._dragEnded = false;
								com.strangevillage.wudywurm.helpers.GridHolder.getPossibleMoves();
								this.stage.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this._dragCheck,this),null,false,0);
								this.stage.addEventListener(egret.TouchEvent.TOUCH_END,flash.bind(this.dragEnd,this),null,false,0);
								this.stage.addEventListener(egret.Event.DEACTIVATE,flash.bind(this._focusLost,this),null,false,0);
							}
						}

						public tryKeyMove()
						{
							if(this.isKeyEnabled() && com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock != null)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.dragBlock = com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock;
								this._dragEnded = false;
								com.strangevillage.wudywurm.helpers.GridHolder.getPossibleMoves();
								if(com.strangevillage.wudywurm.helpers.GridHolder.checkIDVec.indexOf(com.strangevillage.wudywurm.Config.keysVec[com.strangevillage.wudywurm.Config.keysVec.length - 1]) != -1)
								{
									this._moveDir = flash.checkInt(com.strangevillage.wudywurm.Config.keysVec[com.strangevillage.wudywurm.Config.keysVec.length - 1]);
									this._doMove(true);
								}
							}
						}

						public isKeyEnabled():boolean
						{
							if(<any>!this._moving && <any>!this._dragAcite)
							{
								return true;
							}
							return false;
						}

						private _dragCheck(param1:egret.Event)
						{
							if(<any>!this._moving)
							{
								this._moveDir = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.checkMove(this.stage["mouseX"],this.stage["mouseY"]));
								if(this._moveDir != 0)
								{
									this._doMove(false);
								}
							}
						}

						private _focusLost(param1:egret.Event)
						{
							this.dragEnd();
						}

						public dragEnd(param1:flash.MouseEvent = null)
						{
							this.removeDragEvents();
							if(<any>!this._moving)
							{
								this._makeCombo();
							}
							else
							{
								this._dragEnded = true;
							}
						}

						public removeDragEvents()
						{
							if(this._dragAcite)
							{
								this._dragAcite = false;
								this.stage.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this._dragCheck,this),null);
								this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,flash.bind(this.dragEnd,this),null);
								this.stage.removeEventListener(egret.Event.DEACTIVATE,flash.bind(this._focusLost,this),null);
							}
						}

						private _doMove(param1:boolean)
						{
							var _loc2_:number = flash.checkInt(0);
							com.strangevillage.wudywurm.helpers.SoundManager.playMoveSnd();
							this._isKeyMove = param1;
							this._moving = true;
							this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.GameEvent("disableGame"));
							this._selMoveVec = com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wormID];
							this._tryGrab(this._selMoveVec[0]);
							if(this._grabRetType != 1)
							{
								this._selMoveVec[this._selMoveVec.length - 1].nullBlockVecID();
								_loc2_ = flash.checkInt(this._selMoveVec.length - 1);
								while(_loc2_ > 0)
								{
									this._selMoveVec[_loc2_].idUp(this._selMoveVec[_loc2_ - 1].wID,this._selMoveVec[_loc2_ - 1].hID,true);
									_loc2_--;
								}
							}
							switch(this._moveDir)
							{
							case 1 :
								com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.idUp(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID,com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID - 1,false);
								break;
							case 3 :
								com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.idUp(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID,com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID + 1,false);
								break;
							case 2 :
								com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.idUp(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID + 1,com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID,false);
								break;
							case 4 :
								com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.idUp(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID - 1,com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID,false);
							}
							this._moveTween = new com.greensock.TweenMax(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock,this.MOVE_TIME,{"x":com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE,"y":com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE,"ease":com.greensock.easing.Linear.easeInOut,"onUpdate":flash.bind(this._moveUp,this),"onComplete":flash.bind(this._moveEnd,this)});
						}

						private _moveUp(param1:boolean = false)
						{
							var _loc2_:com.strangevillage.wudywurm.parts.gameParts.WurmBlock = <any>null;
							var _loc2__key_a;
							for(_loc2__key_a in this._selMoveVec)
							{
								_loc2_ = this._selMoveVec[_loc2__key_a];
								if(_loc2_ != com.strangevillage.wudywurm.helpers.GridHolder.dragBlock)
								{
									_loc2_.moveUp(this._moveTween.totalProgress,param1);
								}
							}
							this._lineLr.drawLines();
						}

						private _moveEnd()
						{
							this._moveUp(true);
							this._moving = false;
							if(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.doorsHit)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.resetCombo();
								this.removeDragEvents();
								this._destroyWurm(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wormID);
							}
							else
							{
								this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.GameEvent("enableGame"));
								if(com.strangevillage.wudywurm.Config.addMove())
								{
									com.strangevillage.wudywurm.helpers.GridHolder.getPossibleMoves();
									com.strangevillage.wudywurm.helpers.GridHolder.checkCombos();
									if(this._dragEnded)
									{
										this._makeCombo();
									}
									else if(this._isKeyMove && com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length == 0)
									{
										this._nextMoveCheck();
									}
								}
								else
								{
									this.removeDragEvents();
									com.strangevillage.wudywurm.helpers.GridHolder.checkCombos();
									if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length > 0)
									{
										this._addSkippedMove = true;
										this._makeCombo();
									}
									else
									{
										this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.MainEvent("EndNoSpace"));
									}
								}
							}
						}

						private _makeCombo()
						{
							if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length > 0)
							{
								com.strangevillage.wudywurm.helpers.SoundManager.playCombo(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length);
								com.strangevillage.wudywurm.Config.addPts();
								com.strangevillage.wudywurm.helpers.GridHolder.removeCombo();
								this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.GameEvent("ComboEff"));
								this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.GameEvent("disableGame"));
								this._comboMoveStart();
							}
							else
							{
								this._nextMoveCheck();
							}
						}

						private _comboMoveStart()
						{
							this._lineLr.drawLines();
							this.stage.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this._comboMoveCheck,this),null,false,0);
						}

						private _comboMoveCheck(param1:egret.Event)
						{
							var _loc3_:number = flash.checkInt(0);
							this._lineLr.drawLines();
							this._moveCheckTemp = false;
							var _loc2_:number = flash.checkInt(0);
							while(_loc2_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs.length)
							{
								_loc3_ = flash.checkInt(0);
								while(_loc3_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc2_].length)
								{
									if(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc2_][_loc3_].moving)
									{
										this._moveCheckTemp = true;
										break;
									}
									_loc3_++;
								}
								_loc2_++;
							}
							if(<any>!this._moveCheckTemp)
							{
								this._comboMoveEnd();
							}
						}

						private _comboMoveEnd()
						{
							this.stage.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this._comboMoveCheck,this),null);
							if(com.strangevillage.wudywurm.Config.actuaLvlID != 0 && com.strangevillage.wudywurm.helpers.GridHolder.doorsTotal != 0 && com.strangevillage.wudywurm.Config.doorsPts.value >= com.strangevillage.wudywurm.Config.doorsLimit.value)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.doorsTotal--;
								this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.GameEvent("AddDoors"));
								if(com.strangevillage.wudywurm.helpers.GridHolder.doorsTotal != 0)
								{
									com.strangevillage.wudywurm.Config.doorsPts.setValue(0);
									com.strangevillage.wudywurm.Config.actualGameGui.updatePoints();
								}
								else
								{
									com.strangevillage.wudywurm.Config.doorsPts.setValue(com.strangevillage.wudywurm.Config.doorsLimit.value);
									com.strangevillage.wudywurm.Config.actualGameGui.showDoorsDoneMsg();
								}
							}
							com.strangevillage.wudywurm.helpers.GridHolder.checkCombos();
							if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length == 0)
							{
								this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.GameEvent("enableGame"));
								if(this._addSkippedMove)
								{
									this._addSkippedMove = false;
									com.strangevillage.wudywurm.Config.addMove();
								}
								this._nextMoveCheck();
							}
							else
							{
								com.greensock.TweenLite.to(this,0.6,{"onComplete":flash.bind(this._makeCombo,this)});
							}
						}

						private _nextMoveCheck():boolean
						{
							if(<any>!com.strangevillage.wudywurm.helpers.GridHolder.wurmsPosMove())
							{
								this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.MainEvent("EndNoMove"));
								return true;
							}
							return false;
						}

						private _tryGrab(param1:com.strangevillage.wudywurm.parts.gameParts.WurmBlock)
						{
							if(param1.grabID != 0)
							{
								this._grabRetType = flash.checkInt(1);
								this._createGrabBlock(param1.wID,param1.hID,param1.grabID);
								param1.grabID = flash.checkInt(0);
							}
							else
							{
								this._grabRetType = flash.checkInt(0);
							}
						}

						private _createGrabBlock(param1:number,param2:number,param3:number)
						{
							param1 = flash.checkInt(param1);
							param2 = flash.checkInt(param2);
							param3 = flash.checkInt(param3);
							var _loc4_:com.strangevillage.wudywurm.parts.gameParts.WurmBlock = new com.strangevillage.wudywurm.parts.gameParts.WurmBlock(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wormID,param1,param2,false,50 + param3);
							this.addChildAt(_loc4_,1);
							com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wormID].splice(1,0,_loc4_);
						}

						private _destroyWurm(param1:number)
						{
							param1 = flash.checkInt(param1);
							this._desWurmID = flash.checkInt(param1);
							this._wurmsDestroyed++;
							var _loc2_:number = flash.checkInt(0);
							while(_loc2_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[param1].length)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[param1][_loc2_].doneDestroy();
								_loc2_++;
							}
							this._lineLr.drawLines();
							this.stage.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this._doneDestroyMoveCheck,this),null,false,0);
						}

						private _doneDestroyMoveCheck(param1:egret.Event)
						{
							this._lineLr.drawLines();
							this._moveCheckTemp = false;
							var _loc2_:number = flash.checkInt(0);
							while(_loc2_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[this._desWurmID].length)
							{
								if(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[this._desWurmID][_loc2_].moving)
								{
									this._moveCheckTemp = true;
									break;
								}
								_loc2_++;
							}
							if(<any>!this._moveCheckTemp)
							{
								this._wurmDestroyEnd();
							}
						}

						private _wurmDestroyEnd()
						{
							var _loc1_:number = flash.checkInt(0);
							this.stage.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this._doneDestroyMoveCheck,this),null);
							while(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[this._desWurmID].length > 0)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[this._desWurmID].splice(0,1);
							}
							com.strangevillage.wudywurm.helpers.GridHolder.removeDoors(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.posID);
							if(this._wurmsDestroyed == com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs.length)
							{
								this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.MainEvent("LevelComplete"));
							}
							else
							{
								_loc1_ = flash.checkInt(0);
								while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs.length)
								{
									if(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_].length > 0)
									{
										com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock = com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][0];
										com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock.playHiliteAnim();
										com.strangevillage.wudywurm.helpers.SoundManager.playHeadClick();
										this.stage["focus"] = this;
										break;
									}
									_loc1_++;
								}
								this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.GameEvent("enableGame"));
								com.strangevillage.wudywurm.Config.addMove();
								this._nextMoveCheck();
							}
						}

						private _setLinesLr()
						{
							this._lineLr = new com.strangevillage.wudywurm.parts.gameParts.WurmsLines();
							this.addChild(this._lineLr);
						}

					}
				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.gameParts.Wurms","egret.Sprite")
