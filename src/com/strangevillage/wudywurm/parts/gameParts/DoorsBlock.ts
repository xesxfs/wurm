module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export module gameParts {
					export class DoorsBlock extends egret.Sprite {
						public wID:number = 0;
						public hID:number = 0;
						private _mainMc:EndDoorsMc;
						public posID:number = 0;

						public constructor(param1:number,param2:number)
						{
							super();
							param1 = flash.checkInt(param1);
							param2 = flash.checkInt(param2);
							this.touchChildren = false;
							this.touchEnabled = false;
							this.posID = flash.checkInt(param2 * com.strangevillage.wudywurm.helpers.GridHolder.GRID_W + param1);
							this.wID = flash.checkInt(param1);
							this.hID = flash.checkInt(param2);
							com.strangevillage.wudywurm.helpers.GridHolder.doorsVec.push(this);
							com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this.posID] = flash.checkInt(66);
							this.x = this.wID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE;
							this.y = this.hID * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE;
							this._setMainMc();
							com.strangevillage.wudywurm.helpers.SoundManager.playDoorsShow();
							this._mainMc.x = this._mainMc.y = 24;
							this._mainMc.scaleX = this._mainMc.scaleY = 0;
							com.greensock.TweenLite.to(this._mainMc,0.5,{"x":0,"y":0,"scaleX":1,"scaleY":1,"ease":com.greensock.easing.Back.easeOut});
						}

						private _destroyAnimEnd()
						{
							this.removeChild(this._mainMc);
							this._mainMc = null;
							this.parent.removeChild(this);
						}

						private _setMainMc()
						{
							this._mainMc = new EndDoorsMc();
							this.addChild(this._mainMc);
						}

						public destroyDoors()
						{
							com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this.posID] = flash.checkInt(0);
							com.strangevillage.wudywurm.helpers.GridHolder.doorsVec.splice(com.strangevillage.wudywurm.helpers.GridHolder.doorsVec.indexOf(this),1);
							com.greensock.TweenLite.killTweensOf(this._mainMc);
							com.greensock.TweenLite.to(this._mainMc,0.3,{"x":24,"y":24,"scaleX":0,"scaleY":0,"ease":com.greensock.easing.Sine.easeIn,"onComplete":flash.bind(this._destroyAnimEnd,this)});
						}

					}
				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.gameParts.DoorsBlock","egret.Sprite")
