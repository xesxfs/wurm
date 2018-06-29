module com {
	export module strangevillage {
		export module wudywurm {
			export module helpers {
				export class AssetsHolder extends egret.HashObject {
					public static BgOverBm:flash.Bitmap;
					public static BgTilesGrid:any;
					public static _lvlsVec:Array<flash.XML>;
					public static LvlFree:any;
					public static gridBgTiles:flash.Bitmap;
					public static Lvl11:any;
					public static Lvl12:any;
					public static Lvl13:any;
					public static Lvl14:any;
					public static Lvl15:any;
					public static Lvl10:any;
					public static _tempBA:flash.ByteArray;
					public static BgOver:any;
					public static _freerideLvl:flash.XML;
					public static Lvl1:any;
					public static Lvl2:any;
					public static Lvl3:any;
					public static Lvl4:any;
					public static Lvl5:any;
					public static Lvl6:any;
					public static Lvl7:any;
					public static Lvl8:any;
					public static Lvl9:any;

					public constructor()
					{
						super();
						super();
					}

					private static _setLevel(param1:flash.ByteArray)
					{
						com.strangevillage.wudywurm.helpers.AssetsHolder._lvlsVec.push(new flash.XML(param1.readUTFBytes(param1.length)));
					}

					public static initAssets()
					{
						com.strangevillage.wudywurm.helpers.AssetsHolder._initTiles();
						com.strangevillage.wudywurm.helpers.AssetsHolder._initLevels();
					}

					private static _initLevels()
					{
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl1());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl2());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl3());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl4());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl5());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl6());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl7());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl8());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl9());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl10());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl11());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl12());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl13());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl14());
						com.strangevillage.wudywurm.helpers.AssetsHolder._setLevel(new com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl15());
						com.strangevillage.wudywurm.helpers.AssetsHolder._tempBA = new com.strangevillage.wudywurm.helpers.AssetsHolder.LvlFree();
						com.strangevillage.wudywurm.helpers.AssetsHolder._freerideLvl = new flash.XML(com.strangevillage.wudywurm.helpers.AssetsHolder._tempBA.readUTFBytes(com.strangevillage.wudywurm.helpers.AssetsHolder._tempBA.length));
					}

					public static getLevel(param1:number):flash.XML
					{
						param1 = flash.checkInt(param1);
						if(param1 == -1)
						{
							return com.strangevillage.wudywurm.helpers.AssetsHolder._freerideLvl;
						}
						return com.strangevillage.wudywurm.helpers.AssetsHolder._lvlsVec[param1];
					}

					private static _initTiles()
					{
						com.strangevillage.wudywurm.helpers.AssetsHolder.gridBgTiles = new com.strangevillage.wudywurm.helpers.AssetsHolder.BgTilesGrid();
						com.strangevillage.wudywurm.helpers.AssetsHolder.BgOverBm = new com.strangevillage.wudywurm.helpers.AssetsHolder.BgOver();
					}

				}
			}
		}
	}
}

com.strangevillage.wudywurm.helpers.AssetsHolder.BgTilesGrid = com.strangevillage.wudywurm.helpers.AssetsHolder_BgTilesGrid;
com.strangevillage.wudywurm.helpers.AssetsHolder._lvlsVec = new Array<flash.XML>();
com.strangevillage.wudywurm.helpers.AssetsHolder.LvlFree = com.strangevillage.wudywurm.helpers.AssetsHolder_LvlFree;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl11 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl11;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl12 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl12;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl13 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl13;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl14 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl14;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl15 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl15;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl10 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl10;
com.strangevillage.wudywurm.helpers.AssetsHolder.BgOver = com.strangevillage.wudywurm.helpers.AssetsHolder_BgOver;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl1 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl1;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl2 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl2;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl3 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl3;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl4 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl4;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl5 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl5;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl6 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl6;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl7 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl7;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl8 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl8;
com.strangevillage.wudywurm.helpers.AssetsHolder.Lvl9 = com.strangevillage.wudywurm.helpers.AssetsHolder_Lvl9;
