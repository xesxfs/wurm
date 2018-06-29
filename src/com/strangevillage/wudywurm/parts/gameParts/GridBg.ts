module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export module gameParts {
					export class GridBg extends flash.Bitmap {
						private _mainBmd:flash.BitmapData;
						private _copyRect:egret.Rectangle;
						private _copyPt:egret.Point;
						private _vecPos:number = 0;

						public constructor()
						{
							super();
							this.x = 0;
							this.y = 0;
							this._copyPt = new egret.Point(0,0);
							this._mainBmd = new flash.BitmapData(com.strangevillage.wudywurm.Config.GAME_W,com.strangevillage.wudywurm.Config.GAME_H,false,0);
							this._mainBmd["lock"]();
							var _loc1_:number = flash.checkInt(0);
							while(_loc1_ < com.strangevillage.wudywurm.Config.actuaLvl.dot("Boundaries").children().length())
							{
								this._vecPos = flash.checkInt(flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Boundaries").dot("tile").dot(_loc1_).dotAlt("y")) * com.strangevillage.wudywurm.helpers.GridHolder.GRID_W + flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Boundaries").dot("tile").dot(_loc1_).dotAlt("x")));
								switch(flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Boundaries").dot("tile").dot(_loc1_).dotAlt("id")))
								{
								case 0 :
									com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this._vecPos] = flash.checkInt(0);
									this._copyRect = new egret.Rectangle(0,0,com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE,com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
									break;
								case 1 :
									com.strangevillage.wudywurm.helpers.GridHolder.gridVec[this._vecPos] = flash.checkInt(-1);
									this._copyRect = new egret.Rectangle(com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE,0,com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE,com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE);
								}
								this._copyPt.x = com.strangevillage.wudywurm.helpers.GridHolder.GRID_X + flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Boundaries").dot("tile").dot(_loc1_).dotAlt("x")) * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE;
								this._copyPt.y = com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y + flash.tranint(com.strangevillage.wudywurm.Config.actuaLvl.dot("Boundaries").dot("tile").dot(_loc1_).dotAlt("y")) * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE;
								this._mainBmd.copyPixels(com.strangevillage.wudywurm.helpers.AssetsHolder.gridBgTiles.bitmapData,this._copyRect,this._copyPt);
								_loc1_++;
							}
							this._mainBmd.draw2(com.strangevillage.wudywurm.helpers.AssetsHolder.BgOverBm);
							this._mainBmd["unlock"]();
							this.bitmapData = this._mainBmd;
							this["smoothing"] = true;
						}

					}
				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.gameParts.GridBg","flash.Bitmap")
