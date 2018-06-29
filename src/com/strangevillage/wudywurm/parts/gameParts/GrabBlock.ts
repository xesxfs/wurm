module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export module gameParts {
					export class GrabBlock extends egret.Sprite {
						public hID:number = 0;
						public clrID:number = 0;
						private _mainMc:GrabBlockMc;
						public posID:number = 0;
						public wID:number = 0;

						public constructor(param1:number,param2:number,param3:boolean)
						{
							super();
							param1 = flash.checkInt(param1);
							param2 = flash.checkInt(param2);
							this.touchChildren = false;
							this.touchEnabled = false;
							this.posID = flash.checkInt(param2 * com.strangevillage.wudywurm.helpers.GridHolder.GRID_W + param1);
							this.wID = flash.checkInt(param1);
							this.hID = flash.checkInt(param2);
							this.clrID = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.getGrabClrID(this.wID,this.hID));
							com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this.posID] = flash.checkInt(this.clrID);
							com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec[this.posID] = this;
							this.x = this.wID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE;
							this.y = this.hID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE;
							this._setMainMc();
							if(param3)
							{
								this._mainMc.x = this._mainMc.y = 24;
								this._mainMc.scaleX = this._mainMc.scaleY = 0;
								com.greensock.TweenLite.to(this._mainMc,0.4,{"x":0,"y":0,"scaleX":1,"scaleY":1,"ease":com.greensock.easing.Back.easeOut});
							}
						}

						private _destroyBlock(param1:boolean)
						{
							com.strangevillage.wudywurm.helpers.GridHolder.grabBlocksVec[this.posID] = null;
							com.greensock.TweenLite.killTweensOf(this._mainMc);
							if(param1)
							{
								com.greensock.TweenLite.to(this._mainMc,0.2,{"x":24,"y":24,"scaleX":0,"scaleY":0,"ease":com.greensock.easing.Sine.easeIn,"onComplete":flash.bind(this._destroyAnimEnd,this)});
							}
							else
							{
								this._destroyAnimEnd();
							}
						}

						public comboDestroy()
						{
							com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this.posID] = flash.checkInt(0);
							this._destroyBlock(false);
						}

						public grabDestroy()
						{
							this._destroyBlock(true);
						}

						private _destroyAnimEnd()
						{
							this.removeChild(this._mainMc);
							this._mainMc = null;
							this.parent.removeChild(this);
						}

						public checkHilite()
						{
							if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.indexOf(this.posID) != -1)
							{
								this._mainMc.hltBg.hilite(true);
							}
							else
							{
								this._mainMc.hltBg.hilite(false);
							}
						}

						private _setMainMc()
						{
							this._mainMc = new GrabBlockMc();
							this.addChild(this._mainMc);
							this._mainMc.gotoAndStop(this.clrID);
						}

					}
				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.gameParts.GrabBlock","egret.Sprite")
