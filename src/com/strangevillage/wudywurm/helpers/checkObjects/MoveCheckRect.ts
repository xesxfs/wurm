module com {
	export module strangevillage {
		export module wudywurm {
			export module helpers {
				export module checkObjects {
					export class MoveCheckRect extends egret.HashObject {
						private _tX:number = 0;
						private _tY:number = 0;
						private _dirID:number = 0;
						private _lX:number = 0;
						private _lY:number = 0;

						public constructor(param1:number,param2:number,param3:number)
						{
							super();
							param1 = flash.checkInt(param1);
							param2 = flash.checkInt(param2);
							param3 = flash.checkInt(param3);
							super();
							this._dirID = flash.checkInt(param3);
							switch(param3)
							{
							case 1 :
								this._lX = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_X + param1 * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								this._tX = flash.checkInt(this._lX + com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								this._lY = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y);
								this._tY = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y + param2 * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE + com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								break;
							case 3 :
								this._lX = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_X + param1 * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								this._tX = flash.checkInt(this._lX + com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								this._lY = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y + param2 * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								this._tY = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y + com.strangevillage.wudywurm.helpers.GridHolder.GRID_H * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								break;
							case 2 :
								this._lX = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_X + param1 * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								this._tX = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_X + com.strangevillage.wudywurm.helpers.GridHolder.GRID_W * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								this._lY = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y + param2 * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								this._tY = flash.checkInt(this._lY + com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								break;
							case 4 :
								this._lX = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_X);
								this._tX = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_X + param1 * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE + com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								this._lY = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y + param2 * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								this._tY = flash.checkInt(this._lY + com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
							}
						}

						public getLimits():Array<any>
						{
							return [this._lX,this._tX,this._lY,this._tY];
						}

						public isIn(param1:number,param2:number):number
						{
							param1 = flash.checkInt(param1);
							param2 = flash.checkInt(param2);
							if(param1 > this._lX && param1 < this._tX && param2 > this._lY && param2 < this._tY)
							{
								return this._dirID;
							}
							return 0;
						}

					}
				}
			}
		}
	}
}

