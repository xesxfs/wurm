module com {
	export module strangevillage {
		export module wudywurm {
			export module helpers {
				export class GridHolder extends egret.HashObject {
					public static _freeIDs:Array<number>;
					public static GRID_H:number;
					public static GRID_X:number;
					public static GRID_Y:number;
					public static _newComboIDsVec:Array<number>;
					public static TILE_SIZE:number;
					public static GRID_W:number;
					public static _chPos:number;
					public static selectedBlock:com.strangevillage.wudywurm.parts.gameParts.WurmBlock;
					public static comboMainVec:Array<number>;
					public static dragBlock:com.strangevillage.wudywurm.parts.gameParts.WurmBlock;
					public static grabBlocksVec:Array<com.strangevillage.wudywurm.parts.gameParts.GrabBlock>;
					public static _longestMove:number;
					public static doorsTotal:number;
					public static _wPosMovRet:boolean;
					public static comboIDsVec:Array<number>;
					public static emptyPosVec:Array<number>;
					public static doorsVec:Array<com.strangevillage.wudywurm.parts.gameParts.DoorsBlock>;
					public static _moveRet:number;
					public static _checkClrTemp:number;
					public static _destroyedWrmBlVec:Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>;
					public static _actualComboIDsVec:Array<number>;
					public static checkRectVec:Array<com.strangevillage.wudywurm.helpers.checkObjects.MoveCheckRect>;
					public static gridVec:Array<number>;
					public static checkIDVec:Array<number>;
					public static wurmsVecs:Array<Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>>;

					public constructor()
					{
						super();
						super();
					}

					public static checkMove(param1:number,param2:number):number
					{
						param1 = flash.checkInt(param1);
						param2 = flash.checkInt(param2);
						com.strangevillage.wudywurm.helpers.GridHolder._moveRet = flash.checkInt(0);
						var _loc3_:number = flash.checkInt(0);
						while(_loc3_ < com.strangevillage.wudywurm.helpers.GridHolder.checkRectVec.length)
						{
							com.strangevillage.wudywurm.helpers.GridHolder._moveRet = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.checkRectVec[_loc3_].isIn(param1,param2));
							if(com.strangevillage.wudywurm.helpers.GridHolder._moveRet != 0)
							{
								break;
							}
							_loc3_++;
						}
						return com.strangevillage.wudywurm.helpers.GridHolder._moveRet;
					}

					public static resetGridVars()
					{
						var _loc2_:number = flash.checkInt(0);
						com.strangevillage.wudywurm.helpers.GridHolder.doorsTotal = flash.checkInt(0);
						com.strangevillage.wudywurm.helpers.GridHolder.doorsVec = Array<com.strangevillage.wudywurm.parts.gameParts.DoorsBlock>([]);
						com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs = new Array<Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>>();
						com.strangevillage.wudywurm.helpers.GridHolder.dragBlock = null;
						com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock = null;
						com.strangevillage.wudywurm.helpers.GridHolder.gridVec = Array<number>([]);
						com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec = Array<com.strangevillage.wudywurm.parts.gameParts.GrabBlock>([]);
						var _loc1_:number = flash.checkInt(0);
						while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.GRID_H)
						{
							_loc2_ = flash.checkInt(0);
							while(_loc2_ < com.strangevillage.wudywurm.helpers.GridHolder.GRID_W)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.gridVec.push(0);
								com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec.push(null);
								_loc2_++;
							}
							_loc1_++;
						}
					}

					private static _removeWurmCombo()
					{
						var _loc2_:number = flash.checkInt(0);
						var _loc3_:number = flash.checkInt(0);
						com.strangevillage.wudywurm.helpers.GridHolder._destroyedWrmBlVec = Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>([]);
						com.strangevillage.wudywurm.helpers.GridHolder._longestMove = flash.checkInt(0);
						var _loc1_:number = flash.checkInt(0);
						while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs.length)
						{
							_loc2_ = flash.checkInt(0);
							while(_loc2_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_].length - 1)
							{
								if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.indexOf(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc2_].posID) != -1)
								{
									_loc3_ = flash.checkInt(_loc2_ + 1);
									while(_loc3_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_].length)
									{
										com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].posShift = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].posShift + 1);
										com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].cMoveVec.push(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_ - com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].posShift].wID);
										com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].cMoveVec.push(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_ - com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].posShift].hID);
										if(com.strangevillage.wudywurm.helpers.GridHolder._longestMove < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].posShift)
										{
											com.strangevillage.wudywurm.helpers.GridHolder._longestMove = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].posShift);
										}
										_loc3_++;
									}
								}
								_loc2_++;
							}
							_loc1_++;
						}
						com.strangevillage.wudywurm.helpers.GridHolder._startWurmComboRemoveMove();
					}

					private static _checkMoveID(param1:number):boolean
					{
						param1 = flash.checkInt(param1);
						if(param1 == 66)
						{
							return true;
						}
						if(param1 >= 0 && param1 < 10)
						{
							return true;
						}
						return false;
					}

					private static _removeGrBlCombo()
					{
						var _loc1_:number = flash.checkInt(0);
						while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec.length)
						{
							if(com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec[_loc1_] != null && com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.indexOf(com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec[_loc1_].posID) != -1)
							{
								com.strangevillage.wudywurm.Config.effComboDataVec.push(Math.round(com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec[_loc1_].x + 24));
								com.strangevillage.wudywurm.Config.effComboDataVec.push(Math.round(com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec[_loc1_].y + 24));
								com.strangevillage.wudywurm.Config.effComboDataVec.push(com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec[_loc1_].clrID);
								com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec[_loc1_].comboDestroy();
							}
							_loc1_++;
						}
					}

					public static getPossibleMoves()
					{
						com.strangevillage.wudywurm.helpers.GridHolder.checkRectVec = Array<com.strangevillage.wudywurm.helpers.checkObjects.MoveCheckRect>([]);
						com.strangevillage.wudywurm.helpers.GridHolder.checkIDVec = Array<number>([]);
						if(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock != null)
						{
							if(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID - 1 >= 0 && com.strangevillage.wudywurm.helpers.GridHolder._checkMoveID(com.strangevillage.wudywurm.helpers.GridHolder.gridVec[(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID - 1) * com.strangevillage.wudywurm.helpers.GridHolder.GRID_W + com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID]))
							{
								com.strangevillage.wudywurm.helpers.GridHolder.checkRectVec.push(new com.strangevillage.wudywurm.helpers.checkObjects.MoveCheckRect(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID,com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID - 1,1));
								com.strangevillage.wudywurm.helpers.GridHolder.checkIDVec.push(1);
							}
							if(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID + 1 < com.strangevillage.wudywurm.helpers.GridHolder.GRID_H && com.strangevillage.wudywurm.helpers.GridHolder._checkMoveID(com.strangevillage.wudywurm.helpers.GridHolder.gridVec[(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID + 1) * com.strangevillage.wudywurm.helpers.GridHolder.GRID_W + com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID]))
							{
								com.strangevillage.wudywurm.helpers.GridHolder.checkRectVec.push(new com.strangevillage.wudywurm.helpers.checkObjects.MoveCheckRect(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID,com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID + 1,3));
								com.strangevillage.wudywurm.helpers.GridHolder.checkIDVec.push(3);
							}
							if(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID - 1 >= 0 && com.strangevillage.wudywurm.helpers.GridHolder._checkMoveID(com.strangevillage.wudywurm.helpers.GridHolder.gridVec[com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID * com.strangevillage.wudywurm.helpers.GridHolder.GRID_W + (com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID - 1)]))
							{
								com.strangevillage.wudywurm.helpers.GridHolder.checkRectVec.push(new com.strangevillage.wudywurm.helpers.checkObjects.MoveCheckRect(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID - 1,com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID,4));
								com.strangevillage.wudywurm.helpers.GridHolder.checkIDVec.push(4);
							}
							if(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID + 1 < com.strangevillage.wudywurm.helpers.GridHolder.GRID_W && com.strangevillage.wudywurm.helpers.GridHolder._checkMoveID(com.strangevillage.wudywurm.helpers.GridHolder.gridVec[com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID * com.strangevillage.wudywurm.helpers.GridHolder.GRID_W + (com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID + 1)]))
							{
								com.strangevillage.wudywurm.helpers.GridHolder.checkRectVec.push(new com.strangevillage.wudywurm.helpers.checkObjects.MoveCheckRect(com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.wID + 1,com.strangevillage.wudywurm.helpers.GridHolder.dragBlock.hID,2));
								com.strangevillage.wudywurm.helpers.GridHolder.checkIDVec.push(2);
							}
						}
					}

					private static _getSameClrBlocks()
					{
						var _loc1_:number = flash.checkInt(0);
						var _loc2_:number = flash.checkInt(0);
						com.strangevillage.wudywurm.helpers.GridHolder._actualComboIDsVec = Array<number>([]);
						var _loc1__key_a;
						for(_loc1__key_a in com.strangevillage.wudywurm.helpers.GridHolder._newComboIDsVec)
						{
							_loc1_ = com.strangevillage.wudywurm.helpers.GridHolder._newComboIDsVec[_loc1__key_a];
							com.strangevillage.wudywurm.helpers.GridHolder._actualComboIDsVec.push(_loc1_);
							com.strangevillage.wudywurm.helpers.GridHolder.comboIDsVec.push(_loc1_);
						}
						com.strangevillage.wudywurm.helpers.GridHolder._newComboIDsVec = Array<number>([]);
						var _loc2__key_a;
						for(_loc2__key_a in com.strangevillage.wudywurm.helpers.GridHolder._actualComboIDsVec)
						{
							_loc2_ = com.strangevillage.wudywurm.helpers.GridHolder._actualComboIDsVec[_loc2__key_a];
							com.strangevillage.wudywurm.helpers.GridHolder._chPos = flash.checkInt(_loc2_ - com.strangevillage.wudywurm.helpers.GridHolder.GRID_W);
							if(com.strangevillage.wudywurm.helpers.GridHolder._chPos >= 0)
							{
								com.strangevillage.wudywurm.helpers.GridHolder._tryComboAdd(com.strangevillage.wudywurm.helpers.GridHolder._chPos);
							}
							com.strangevillage.wudywurm.helpers.GridHolder._chPos = flash.checkInt(_loc2_ + com.strangevillage.wudywurm.helpers.GridHolder.GRID_W);
							if(com.strangevillage.wudywurm.helpers.GridHolder._chPos < com.strangevillage.wudywurm.helpers.GridHolder.gridVec.length)
							{
								com.strangevillage.wudywurm.helpers.GridHolder._tryComboAdd(com.strangevillage.wudywurm.helpers.GridHolder._chPos);
							}
							com.strangevillage.wudywurm.helpers.GridHolder._chPos = flash.checkInt(_loc2_ + 1);
							if(_loc2_ % com.strangevillage.wudywurm.helpers.GridHolder.GRID_W < com.strangevillage.wudywurm.helpers.GridHolder.GRID_W - 1)
							{
								com.strangevillage.wudywurm.helpers.GridHolder._tryComboAdd(com.strangevillage.wudywurm.helpers.GridHolder._chPos);
							}
							com.strangevillage.wudywurm.helpers.GridHolder._chPos = flash.checkInt(_loc2_ - 1);
							if(_loc2_ % com.strangevillage.wudywurm.helpers.GridHolder.GRID_W > 0)
							{
								com.strangevillage.wudywurm.helpers.GridHolder._tryComboAdd(com.strangevillage.wudywurm.helpers.GridHolder._chPos);
							}
						}
						if(com.strangevillage.wudywurm.helpers.GridHolder._newComboIDsVec.length > 0)
						{
							com.strangevillage.wudywurm.helpers.GridHolder._getSameClrBlocks();
						}
					}

					public static getEmptyPos()
					{
						com.strangevillage.wudywurm.helpers.GridHolder.emptyPosVec = Array<number>([]);
						var _loc1_:number = flash.checkInt(0);
						while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.gridVec.length)
						{
							if(com.strangevillage.wudywurm.helpers.GridHolder.gridVec[_loc1_] == 0)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.emptyPosVec.push(_loc1_);
							}
							_loc1_++;
						}
					}

					private static _hiliteGrBlocks()
					{
						var _loc1_:number = flash.checkInt(0);
						while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec.length)
						{
							if(com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec[_loc1_] != null)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec[_loc1_].checkHilite();
							}
							_loc1_++;
						}
					}

					private static _hiliteWurms()
					{
						var _loc2_:number = flash.checkInt(0);
						var _loc1_:number = flash.checkInt(0);
						while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs.length)
						{
							_loc2_ = flash.checkInt(0);
							while(_loc2_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_].length)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc2_].checkHilite();
								_loc2_++;
							}
							_loc1_++;
						}
					}

					private static _tryComboAdd(param1:number)
					{
						param1 = flash.checkInt(param1);
						if(com.strangevillage.wudywurm.helpers.GridHolder.gridVec[param1] % 50 == com.strangevillage.wudywurm.helpers.GridHolder._checkClrTemp && com.strangevillage.wudywurm.helpers.GridHolder.comboIDsVec.indexOf(param1) == -1)
						{
							com.strangevillage.wudywurm.helpers.GridHolder._newComboIDsVec.push(param1);
						}
					}

					public static getCombo(param1:number,param2:number)
					{
						param1 = flash.checkInt(param1);
						param2 = flash.checkInt(param2);
						com.strangevillage.wudywurm.helpers.GridHolder.comboIDsVec = Array<number>([]);
						com.strangevillage.wudywurm.helpers.GridHolder._checkClrTemp = flash.checkInt(param2);
						com.strangevillage.wudywurm.helpers.GridHolder._newComboIDsVec = Array<number>([param1]);
						com.strangevillage.wudywurm.helpers.GridHolder._getSameClrBlocks();
					}

					public static removeDoors(param1:number)
					{
						param1 = flash.checkInt(param1);
						var _loc2_:number = flash.checkInt(0);
						while(_loc2_ < com.strangevillage.wudywurm.helpers.GridHolder.doorsVec.length)
						{
							if(com.strangevillage.wudywurm.helpers.GridHolder.doorsVec[_loc2_].posID == param1)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.doorsVec[_loc2_].destroyDoors();
								break;
							}
							_loc2_++;
						}
					}

					public static getGrabClrID(param1:number,param2:number):number
					{
						param1 = flash.checkInt(param1);
						param2 = flash.checkInt(param2);
						com.strangevillage.wudywurm.helpers.GridHolder._freeIDs = Array<number>([]);
						var _loc3_:number = flash.checkInt(0);
						while(_loc3_ < com.strangevillage.wudywurm.Config.lvlClrsVec.length)
						{
							com.strangevillage.wudywurm.helpers.GridHolder.getCombo(param2 * com.strangevillage.wudywurm.helpers.GridHolder.GRID_W + param1,com.strangevillage.wudywurm.Config.lvlClrsVec[_loc3_]);
							if(com.strangevillage.wudywurm.helpers.GridHolder.comboIDsVec.length < 3)
							{
								com.strangevillage.wudywurm.helpers.GridHolder._freeIDs.push(com.strangevillage.wudywurm.Config.lvlClrsVec[_loc3_]);
							}
							_loc3_++;
						}
						if(com.strangevillage.wudywurm.helpers.GridHolder._freeIDs.length == 0)
						{
							com.strangevillage.wudywurm.helpers.GridHolder._freeIDs.push(com.strangevillage.wudywurm.Config.addRandomClr());
							com.strangevillage.wudywurm.Config.newClrCount.setValue(0);
							console.log("No possible clr without combo -> added new clr: " + com.strangevillage.wudywurm.helpers.GridHolder._freeIDs[0]);
						}
						return com.strangevillage.wudywurm.helpers.GridHolder._freeIDs.splice(Math.round(Math.random() * (com.strangevillage.wudywurm.helpers.GridHolder._freeIDs.length - 1)),1)[0];
					}

					public static checkCombos()
					{
						var _loc2_:number = flash.checkInt(0);
						com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec = Array<number>([]);
						var _loc1_:number = flash.checkInt(0);
						while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.gridVec.length)
						{
							if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.indexOf(_loc1_) == -1 && com.strangevillage.wudywurm.helpers.GridHolder.gridVec[_loc1_] % 50 > 0 && com.strangevillage.wudywurm.helpers.GridHolder.gridVec[_loc1_] % 50 < 10)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.getCombo(_loc1_,com.strangevillage.wudywurm.helpers.GridHolder.gridVec[_loc1_] % 50);
								if(com.strangevillage.wudywurm.helpers.GridHolder.comboIDsVec.length >= 3)
								{
									_loc2_ = flash.checkInt(0);
									while(_loc2_ < com.strangevillage.wudywurm.helpers.GridHolder.comboIDsVec.length)
									{
										if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.indexOf(com.strangevillage.wudywurm.helpers.GridHolder.comboIDsVec[_loc2_]) == -1)
										{
											com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.push(com.strangevillage.wudywurm.helpers.GridHolder.comboIDsVec[_loc2_]);
										}
										_loc2_++;
									}
								}
							}
							_loc1_++;
						}
						com.strangevillage.wudywurm.Config.actualGameGui.updateCombo();
						com.strangevillage.wudywurm.helpers.GridHolder._hiliteGrBlocks();
						com.strangevillage.wudywurm.helpers.GridHolder._hiliteWurms();
					}

					private static _startWurmComboRemoveMove()
					{
						var _loc3_:number = flash.checkInt(0);
						var _loc1_:number = flash.checkInt(0);
						while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs.length)
						{
							_loc3_ = flash.checkInt(0);
							while(_loc3_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_].length)
							{
								if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.indexOf(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].posID) != -1)
								{
									com.strangevillage.wudywurm.Config.effComboDataVec.push(Math.round(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].x + 24));
									com.strangevillage.wudywurm.Config.effComboDataVec.push(Math.round(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].y + 24));
									com.strangevillage.wudywurm.Config.effComboDataVec.push(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].bType - 50);
									com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].comboDestroy();
									com.strangevillage.wudywurm.helpers.GridHolder._destroyedWrmBlVec.push(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_]);
								}
								else if(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].posShift != 0)
								{
									com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][_loc3_].startComboMove(com.strangevillage.wudywurm.helpers.GridHolder._longestMove);
								}
								_loc3_++;
							}
							_loc1_++;
						}
						var _loc2_:number = flash.checkInt(0);
						while(_loc2_ < com.strangevillage.wudywurm.helpers.GridHolder._destroyedWrmBlVec.length)
						{
							com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[com.strangevillage.wudywurm.helpers.GridHolder._destroyedWrmBlVec[_loc2_].wormID].splice(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[com.strangevillage.wudywurm.helpers.GridHolder._destroyedWrmBlVec[_loc2_].wormID].indexOf(com.strangevillage.wudywurm.helpers.GridHolder._destroyedWrmBlVec[_loc2_]),1);
							_loc2_++;
						}
						com.strangevillage.wudywurm.helpers.GridHolder._destroyedWrmBlVec = Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>([]);
					}

					public static removeCombo()
					{
						com.strangevillage.wudywurm.Config.effComboDataVec = Array<number>([]);
						com.strangevillage.wudywurm.helpers.GridHolder._removeGrBlCombo();
						com.strangevillage.wudywurm.helpers.GridHolder._removeWurmCombo();
						com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec = Array<number>([]);
					}

					public static wurmsPosMove():boolean
					{
						com.strangevillage.wudywurm.helpers.GridHolder._wPosMovRet = false;
						var _loc1_:number = flash.checkInt(0);
						while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs.length)
						{
							if(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_].length != 0)
							{
								com.strangevillage.wudywurm.helpers.GridHolder.dragBlock = com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_][0];
								com.strangevillage.wudywurm.helpers.GridHolder.getPossibleMoves();
								if(com.strangevillage.wudywurm.helpers.GridHolder.checkRectVec.length > 0)
								{
									com.strangevillage.wudywurm.helpers.GridHolder._wPosMovRet = true;
									break;
								}
							}
							_loc1_++;
						}
						com.strangevillage.wudywurm.helpers.GridHolder.dragBlock = null;
						return com.strangevillage.wudywurm.helpers.GridHolder._wPosMovRet;
					}

					public static resetCombo()
					{
						com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec = Array<number>([]);
						com.strangevillage.wudywurm.Config.actualGameGui.updateCombo();
						com.strangevillage.wudywurm.helpers.GridHolder._hiliteGrBlocks();
						com.strangevillage.wudywurm.helpers.GridHolder._hiliteWurms();
					}

				}
			}
		}
	}
}

com.strangevillage.wudywurm.helpers.GridHolder._freeIDs = new Array<number>();
com.strangevillage.wudywurm.helpers.GridHolder.GRID_H = 11;
com.strangevillage.wudywurm.helpers.GridHolder.GRID_X = 20;
com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y = 20;
com.strangevillage.wudywurm.helpers.GridHolder._newComboIDsVec = new Array<number>();
com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE = 48;
com.strangevillage.wudywurm.helpers.GridHolder.GRID_W = 15;
com.strangevillage.wudywurm.helpers.GridHolder._chPos = 0;
com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec = new Array<number>();
com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec = new Array<com.strangevillage.wudywurm.parts.gameParts.GrabBlock>();
com.strangevillage.wudywurm.helpers.GridHolder._longestMove = 0;
com.strangevillage.wudywurm.helpers.GridHolder.doorsTotal = 0;
com.strangevillage.wudywurm.helpers.GridHolder._wPosMovRet = false;
com.strangevillage.wudywurm.helpers.GridHolder.comboIDsVec = new Array<number>();
com.strangevillage.wudywurm.helpers.GridHolder.emptyPosVec = new Array<number>();
com.strangevillage.wudywurm.helpers.GridHolder.doorsVec = new Array<com.strangevillage.wudywurm.parts.gameParts.DoorsBlock>();
com.strangevillage.wudywurm.helpers.GridHolder._moveRet = 0;
com.strangevillage.wudywurm.helpers.GridHolder._checkClrTemp = 0;
com.strangevillage.wudywurm.helpers.GridHolder._destroyedWrmBlVec = new Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>();
com.strangevillage.wudywurm.helpers.GridHolder._actualComboIDsVec = new Array<number>();
com.strangevillage.wudywurm.helpers.GridHolder.checkRectVec = new Array<com.strangevillage.wudywurm.helpers.checkObjects.MoveCheckRect>();
com.strangevillage.wudywurm.helpers.GridHolder.gridVec = new Array<number>();
com.strangevillage.wudywurm.helpers.GridHolder.checkIDVec = new Array<number>();
com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs = new Array<Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>>();
