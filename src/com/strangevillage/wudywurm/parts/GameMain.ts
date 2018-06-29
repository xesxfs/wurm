module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export class GameMain extends egret.Sprite {
					private _gridBg:com.strangevillage.wudywurm.parts.gameParts.GridBg;
					private _grabBlocks:com.strangevillage.wudywurm.parts.gameParts.GrabBlocks;
					private _wurms:com.strangevillage.wudywurm.parts.gameParts.Wurms;
					private _gameGui:com.strangevillage.wudywurm.parts.gameParts.GameGui;
					private _effLr:com.strangevillage.wudywurm.parts.gameParts.EffectsLayer;
					private _spcDn:boolean = false;
					private _xDn:boolean = false;
					private _headTempVec:Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>;
					private _currHeadIndex:number = 0;
					private _gameEnabled:boolean = true;

					public constructor()
					{
						super(						var _self__:any = this;
);
						this._effLr = new com.strangevillage.wudywurm.parts.gameParts.EffectsLayer();
						this._headTempVec = new Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>();
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
						com.strangevillage.wudywurm.Config.resetConfigVars();
						com.strangevillage.wudywurm.helpers.GridHolder.resetGridVars();
						this._setEvents();
						this._setBg();
						this._setGrabBlocks();
						this._setWurms();
						this._setGameGui();
						this._setEffLr();
					}

					private _setBg()
					{
						this._gridBg = new com.strangevillage.wudywurm.parts.gameParts.GridBg();
						this.addChild(this._gridBg);
					}

					private _setGrabBlocks()
					{
						this._grabBlocks = new com.strangevillage.wudywurm.parts.gameParts.GrabBlocks();
						this.addChild(this._grabBlocks);
					}

					private _setWurms()
					{
						this._wurms = new com.strangevillage.wudywurm.parts.gameParts.Wurms();
						this.addChild(this._wurms);
					}

					private _setGameGui()
					{
						this._gameGui = new com.strangevillage.wudywurm.parts.gameParts.GameGui();
						this.addChild(this._gameGui);
					}

					private _setEffLr()
					{
						this.addChild(this._effLr);
					}

					private _setEvents()
					{
						this.addEventListener(egret.Event.REMOVED_FROM_STAGE,flash.bind(this._removeLsn,this),null,false,0);
						this.stage.addEventListener(com.strangevillage.wudywurm.events.GameEvent.GAME_EVT,flash.bind(this._gameEvt,this),null,false,0);
						this.stage.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this._loop,this),null,false,0);
						this.stage.addEventListener(egret.Event.DEACTIVATE,flash.bind(this._focusLost,this),null,false,0);
						this.stage.addEventListener(flash.KeyboardEvent.KEY_DOWN,flash.bind(this._kDn,this),null,false,0);
						this.stage.addEventListener(flash.KeyboardEvent.KEY_UP,flash.bind(this._kUp,this),null,false,0);
					}

					private _removeLsn(param1:egret.Event)
					{
						this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,flash.bind(this._removeLsn,this),null);
						this.stage.removeEventListener(com.strangevillage.wudywurm.events.GameEvent.GAME_EVT,flash.bind(this._gameEvt,this),null);
						this.stage.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this._loop,this),null);
						this.stage.removeEventListener(egret.Event.DEACTIVATE,flash.bind(this._focusLost,this),null);
						this.stage.removeEventListener(flash.KeyboardEvent.KEY_DOWN,flash.bind(this._kDn,this),null);
						this.stage.removeEventListener(flash.KeyboardEvent.KEY_UP,flash.bind(this._kUp,this),null);
					}

					private _focusLost(param1:egret.Event)
					{
						this.stage.addEventListener(egret.Event.ACTIVATE,flash.bind(this._focusBack,this),null,false,0);
						this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.MainEvent("FocusOverShow"));
						com.strangevillage.wudywurm.Config.keysVec = Array<number>([]);
					}

					private _focusBack(param1:egret.Event)
					{
						this.stage.removeEventListener(egret.Event.ACTIVATE,flash.bind(this._focusBack,this),null);
						this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.MainEvent("FocusOverHide"));
					}

					private _kDn(param1:flash.KeyboardEvent)
					{
						var _loc2_:number = flash.checkInt(0);
						switch(param1.keyCode)
						{
						case 88 :
							if(<any>!this._xDn)
							{
								this._xDn = true;
								if(this._wurms.isKeyEnabled() && this._gameEnabled)
								{
									if(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs.length > 1)
									{
										this._wurms.dragEnd();
										this._headTempVec = Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>([]);
										_loc2_ = flash.checkInt(0);
										while(_loc2_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs.length)
										{
											if(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc2_].length > 0)
											{
												this._headTempVec.push(com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc2_][0]);
											}
											_loc2_++;
										}
										this._currHeadIndex = flash.checkInt(this._headTempVec.indexOf(com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock));
										if(this._currHeadIndex == -1 || this._currHeadIndex == this._headTempVec.length - 1)
										{
											com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock = this._headTempVec[0];
										}
										else
										{
											com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock = this._headTempVec[this._currHeadIndex + 1];
										}
										com.strangevillage.wudywurm.helpers.GridHolder.selectedBlock.playHiliteAnim();
										this._headTempVec = Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>([]);
									}
									else
									{
										com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[0][0].playHiliteAnim();
									}
									com.strangevillage.wudywurm.helpers.SoundManager.playHeadClick();
								}
							}
							break;
						case 32 :
							if(<any>!this._spcDn)
							{
								this._spcDn = true;
								if(this._gameEnabled)
								{
									this._wurms.dragEnd();
								}
							}
							break;
						case 38 :
						case 87 :
							this._addKey(1);
							break;
						case 40 :
						case 83 :
							this._addKey(3);
							break;
						case 39 :
						case 68 :
							this._addKey(2);
							break;
						case 37 :
						case 65 :
							this._addKey(4);
						}
					}

					private _addKey(param1:number)
					{
						param1 = flash.checkUint(param1);
						if(com.strangevillage.wudywurm.Config.keysVec.indexOf(param1) == -1)
						{
							com.strangevillage.wudywurm.Config.keysVec.push(param1);
						}
					}

					private _kUp(param1:flash.KeyboardEvent)
					{
						switch(param1.keyCode)
						{
						case 88 :
							this._xDn = false;
							break;
						case 32 :
							this._spcDn = false;
							break;
						case 38 :
						case 87 :
							this._removeKey(1);
							break;
						case 40 :
						case 83 :
							this._removeKey(3);
							break;
						case 39 :
						case 68 :
							this._removeKey(2);
							break;
						case 37 :
						case 65 :
							this._removeKey(4);
						}
					}

					private _removeKey(param1:number)
					{
						param1 = flash.checkUint(param1);
						if(com.strangevillage.wudywurm.Config.keysVec.indexOf(param1) != -1)
						{
							com.strangevillage.wudywurm.Config.keysVec.splice(com.strangevillage.wudywurm.Config.keysVec.indexOf(param1),1);
						}
					}

					private _gameEvt(param1:com.strangevillage.wudywurm.events.GameEvent)
					{
						switch(param1.eventName)
						{
						case "CreateDoorsEff" :
							this._effLr.doorsShowEff();
							break;
						case "ComboEff" :
							this._effLr.doComboEff();
							break;
						case "AddRandomBlock" :
							this._grabBlocks.addRandomBlock();
							break;
						case "AddDoors" :
							this._grabBlocks.addDoors();
							break;
						case "enableGame" :
							this.enableGame(true);
							break;
						case "disableGame" :
							this.enableGame(false);
						}
					}

					private _loop(param1:egret.Event)
					{
						this._effLr.effLoop();
						if(this._gameEnabled && com.strangevillage.wudywurm.Config.keysVec.length > 0)
						{
							this._wurms.tryKeyMove();
						}
					}

					public enableGame(param1:boolean)
					{
						if(param1)
						{
							this.touchChildren = true;
							this.touchEnabled = true;
							this._gameEnabled = true;
							this.stage["focus"] = this;
						}
						else
						{
							this.touchChildren = false;
							this.touchEnabled = false;
							this._gameEnabled = false;
						}
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.GameMain","egret.Sprite")
