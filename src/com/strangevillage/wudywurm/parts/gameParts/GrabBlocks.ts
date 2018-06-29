module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export module gameParts {
					export class GrabBlocks extends egret.Sprite {
						private _grabBlTempIDs:Array<number>;
						private _tempID:number = 0;
						private _tempPos:number = 0;

						public constructor()
						{
							super();
							var _loc2_:com.strangevillage.wudywurm.parts.gameParts.GrabBlock = <any>null;
							this._grabBlTempIDs = new Array<number>();
							this.x = com.strangevillage.wudywurm.helpers.GridHolder.GRID_X;
							this.y = com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y;
							var _loc1_:number = flash.checkInt(0);
							while(_loc1_ < com.strangevillage.wudywurm.Config.actuaLvl.dot("InitBlocks").children().length())
							{
								this._grabBlTempIDs.push(_loc1_);
								_loc1_++;
							}
							while(this._grabBlTempIDs.length > 0)
							{
								this._tempID = flash.checkInt(this._grabBlTempIDs.splice(Math.round(Math.random() * (this._grabBlTempIDs.length - 1)),1)[0]);
								_loc2_ = new com.strangevillage.wudywurm.parts.gameParts.GrabBlock(flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("InitBlocks").dot("tile").dot(this._tempID).dotAlt("x")),flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("InitBlocks").dot("tile").dot(this._tempID).dotAlt("y")),false);
								this.addChild(_loc2_);
							}
						}

						public addRandomBlock()
						{
							var _loc1_:com.strangevillage.wudywurm.parts.gameParts.GrabBlock = <any>null;
							com.strangevillage.wudywurm.helpers.GridHolder.getEmptyPos();
							if(com.strangevillage.wudywurm.helpers.GridHolder.emptyPosVec.length != 0)
							{
								com.strangevillage.wudywurm.helpers.SoundManager.playBlockCreate();
								this._tempPos = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.emptyPosVec[Math.round(Math.random() * (com.strangevillage.wudywurm.helpers.GridHolder.emptyPosVec.length - 1))]);
								_loc1_ = new com.strangevillage.wudywurm.parts.gameParts.GrabBlock(this._tempPos % com.strangevillage.wudywurm.helpers.GridHolder.GRID_W,Math.floor(this._tempPos / com.strangevillage.wudywurm.helpers.GridHolder.GRID_W),true);
								this.addChild(_loc1_);
							}
						}

						public addDoors()
						{
							com.strangevillage.wudywurm.helpers.GridHolder.getEmptyPos();
							this._tempPos = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.emptyPosVec[Math.round(Math.random() * (com.strangevillage.wudywurm.helpers.GridHolder.emptyPosVec.length - 1))]);
							var _loc1_:com.strangevillage.wudywurm.parts.gameParts.DoorsBlock = new com.strangevillage.wudywurm.parts.gameParts.DoorsBlock(this._tempPos % com.strangevillage.wudywurm.helpers.GridHolder.GRID_W,Math.floor(this._tempPos / com.strangevillage.wudywurm.helpers.GridHolder.GRID_W));
							this.addChild(_loc1_);
							com.strangevillage.wudywurm.Config.effX = _loc1_.x + 24;
							com.strangevillage.wudywurm.Config.effY = _loc1_.y + 24;
							this.stage.dispatchEvent(new com.strangevillage.wudywurm.events.GameEvent("CreateDoorsEff"));
						}

					}
				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.gameParts.GrabBlocks","egret.Sprite")
