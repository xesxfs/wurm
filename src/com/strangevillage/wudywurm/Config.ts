module com {
	export module strangevillage {
		export module wudywurm {
			export class Config extends egret.HashObject {
				public static GAME_W:number;
				public static GAME_H:number;
				public static REDIRECT_URL:string;
				public static REDIRECT_TYPE:string;
				public static actuaLvl:flash.XML;
				public static lvlsTotal:number;
				public static actuaLvlID:number;
				public static CLR_MAX:number;
				public static lvlClrStartLmVec:Array<number>;
				public static freeClrStartLm:number;
				public static posClrsVec:Array<number>;
				public static lvlClrsVec:Array<number>;
				public static lvlNextBlockLimitsVec:Array<number>;
				public static freeNextBlockLimit:number;
				public static lvlNewClrLimitsVec:Array<number>;
				public static freeNewClrLimit:number;
				public static lvlBlNewDecLimitsVec:Array<number>;
				public static lvlDoorsLimitsVec:Array<number>;
				public static freeBlNewDecLimit:number;
				public static doorsLimit:mochi.as3.MochiDigits;
				public static doorsPts:mochi.as3.MochiDigits;
				public static totalPts:mochi.as3.MochiDigits;
				public static nextBlockLimit:mochi.as3.MochiDigits;
				public static nextBlock:mochi.as3.MochiDigits;
				public static movesTotal:mochi.as3.MochiDigits;
				public static newClrCount:mochi.as3.MochiDigits;
				public static newClrLimit:mochi.as3.MochiDigits;
				public static nextBlDecLimit:mochi.as3.MochiDigits;
				public static nextBlDec:mochi.as3.MochiDigits;
				public static doResetScore:boolean;
				public static keysVec:Array<number>;
				public static effX:number;
				public static effY:number;
				public static effComboDataVec:Array<number>;
				public static actualGameGui:com.strangevillage.wudywurm.parts.gameParts.GameGui;
				public static _tempPts:number;
				public static _tempAddRet:boolean;
				public static mainSO:flash.SharedObject;
				public static SO_ID:string;
				public static soArr:Array<any>;

				public constructor()
				{
					super();
					super();
				}

				public static resetConfigVars()
				{
					var _loc2_:number = flash.checkInt(0);
					var _loc3_:number = flash.checkInt(0);
					com.strangevillage.wudywurm.Config.keysVec = Array<number>([]);
					com.strangevillage.wudywurm.Config.actuaLvl = com.strangevillage.wudywurm.helpers.AssetsHolder.getLevel(com.strangevillage.wudywurm.Config.actuaLvlID - 1);
					com.strangevillage.wudywurm.Config.posClrsVec = Array<number>([]);
					com.strangevillage.wudywurm.Config.lvlClrsVec = Array<number>([]);
					var _loc1_:number = flash.checkInt(1);
					while(_loc1_ <= com.strangevillage.wudywurm.Config.CLR_MAX)
					{
						com.strangevillage.wudywurm.Config.posClrsVec.push(_loc1_);
						_loc1_++;
					}
					if(com.strangevillage.wudywurm.Config.actuaLvlID == 0)
					{
						_loc2_ = flash.checkInt(0);
						while(_loc2_ < com.strangevillage.wudywurm.Config.freeClrStartLm)
						{
							com.strangevillage.wudywurm.Config.addRandomClr();
							_loc2_++;
						}
						com.strangevillage.wudywurm.Config.doorsLimit.setValue(100);
						com.strangevillage.wudywurm.Config.nextBlockLimit.setValue(com.strangevillage.wudywurm.Config.freeNextBlockLimit);
						com.strangevillage.wudywurm.Config.newClrLimit.setValue(com.strangevillage.wudywurm.Config.freeNewClrLimit);
						com.strangevillage.wudywurm.Config.nextBlDecLimit.setValue(com.strangevillage.wudywurm.Config.freeBlNewDecLimit);
					}
					else
					{
						_loc3_ = flash.checkInt(0);
						while(_loc3_ < com.strangevillage.wudywurm.Config.lvlClrStartLmVec[com.strangevillage.wudywurm.Config.actuaLvlID - 1])
						{
							com.strangevillage.wudywurm.Config.addRandomClr();
							_loc3_++;
						}
						com.strangevillage.wudywurm.Config.doorsLimit.setValue(com.strangevillage.wudywurm.Config.lvlDoorsLimitsVec[com.strangevillage.wudywurm.Config.actuaLvlID - 1]);
						com.strangevillage.wudywurm.Config.nextBlockLimit.setValue(com.strangevillage.wudywurm.Config.lvlNextBlockLimitsVec[com.strangevillage.wudywurm.Config.actuaLvlID - 1]);
						com.strangevillage.wudywurm.Config.newClrLimit.setValue(com.strangevillage.wudywurm.Config.lvlNewClrLimitsVec[com.strangevillage.wudywurm.Config.actuaLvlID - 1]);
						com.strangevillage.wudywurm.Config.nextBlDecLimit.setValue(com.strangevillage.wudywurm.Config.lvlBlNewDecLimitsVec[com.strangevillage.wudywurm.Config.actuaLvlID - 1]);
					}
					com.strangevillage.wudywurm.Config.doorsPts.setValue(0);
					com.strangevillage.wudywurm.Config.nextBlock.setValue(0);
					com.strangevillage.wudywurm.Config.movesTotal.setValue(0);
					com.strangevillage.wudywurm.Config.newClrCount.setValue(0);
					com.strangevillage.wudywurm.Config.nextBlDec.setValue(0);
					if(com.strangevillage.wudywurm.Config.doResetScore)
					{
						com.strangevillage.wudywurm.Config.totalPts.setValue(0);
					}
					else
					{
						com.strangevillage.wudywurm.Config.doResetScore = true;
					}
				}

				public static addRandomClr():number
				{
					if(com.strangevillage.wudywurm.Config.posClrsVec.length != 0)
					{
						com.strangevillage.wudywurm.Config.lvlClrsVec.push(com.strangevillage.wudywurm.Config.posClrsVec.splice(Math.round(Math.random() * (com.strangevillage.wudywurm.Config.posClrsVec.length - 1)),1)[0]);
						return com.strangevillage.wudywurm.Config.lvlClrsVec[com.strangevillage.wudywurm.Config.lvlClrsVec.length - 1];
					}
					return com.strangevillage.wudywurm.Config.lvlClrsVec[Math.round(Math.random() * (com.strangevillage.wudywurm.Config.lvlClrsVec.length - 1))];
				}

				public static addMove():boolean
				{
					com.strangevillage.wudywurm.Config._tempAddRet = true;
					if(com.strangevillage.wudywurm.Config.nextBlock.value + 1 >= com.strangevillage.wudywurm.Config.nextBlockLimit.value)
					{
						com.strangevillage.wudywurm.helpers.GridHolder.getEmptyPos();
						if(com.strangevillage.wudywurm.helpers.GridHolder.emptyPosVec.length == 0)
						{
							com.strangevillage.wudywurm.Config._tempAddRet = false;
						}
					}
					if(com.strangevillage.wudywurm.Config._tempAddRet)
					{
						com.strangevillage.wudywurm.Config.nextBlock.addValue(1);
						com.strangevillage.wudywurm.Config.movesTotal.addValue(1);
						com.strangevillage.wudywurm.Config.newClrCount.addValue(1);
						com.strangevillage.wudywurm.Config.actualGameGui.updateMoves();
					}
					return com.strangevillage.wudywurm.Config._tempAddRet;
				}

				public static addPts()
				{
					if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length <= 5)
					{
						com.strangevillage.wudywurm.Config._tempPts = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length * 100);
					}
					else if(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length <= 10)
					{
						com.strangevillage.wudywurm.Config._tempPts = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length * 105);
					}
					else
					{
						com.strangevillage.wudywurm.Config._tempPts = flash.checkInt(com.strangevillage.wudywurm.helpers.GridHolder.comboMainVec.length * 110);
					}
					if(com.strangevillage.wudywurm.helpers.GridHolder.doorsTotal != 0)
					{
						com.strangevillage.wudywurm.Config.doorsPts.addValue(com.strangevillage.wudywurm.Config._tempPts);
					}
					com.strangevillage.wudywurm.Config.totalPts.addValue(com.strangevillage.wudywurm.Config._tempPts);
					com.strangevillage.wudywurm.Config.actualGameGui.updatePoints();
				}

				public static checkMainSO()
				{
					com.strangevillage.wudywurm.Config.mainSO = flash.SharedObject.getLocal(com.strangevillage.wudywurm.Config.SO_ID);
					var _loc1_:string = <any>com.strangevillage.wudywurm.Config.mainSO.data["fldMainSt"];
					if(_loc1_ == null)
					{
						com.strangevillage.wudywurm.Config.soArr = [1,1,1,0,0,1,0];
						com.strangevillage.wudywurm.Config.updateSO();
					}
					else
					{
						com.strangevillage.wudywurm.Config.soArr = _loc1_.split(",");
					}
				}

				public static updateSO()
				{
					com.strangevillage.wudywurm.Config.mainSO.data["fldMainSt"] = com.strangevillage.wudywurm.Config.soArr.toString();
					com.strangevillage.wudywurm.Config.mainSO.flush();
				}

			}
		}
	}
}

com.strangevillage.wudywurm.Config.GAME_W = 760;
com.strangevillage.wudywurm.Config.GAME_H = 600;
com.strangevillage.wudywurm.Config.REDIRECT_URL = "http://www.nowgamez.com/?utm_source=wudywurm&utm_medium=wudywurm&utm_campaign=wudywurm";
com.strangevillage.wudywurm.Config.REDIRECT_TYPE = "_blank";
com.strangevillage.wudywurm.Config.lvlsTotal = 15;
com.strangevillage.wudywurm.Config.actuaLvlID = 1;
com.strangevillage.wudywurm.Config.CLR_MAX = 9;
com.strangevillage.wudywurm.Config.lvlClrStartLmVec = Array<number>([4,4,4,4,4,4,4,4,5,5,5,5,5,5,5]);
com.strangevillage.wudywurm.Config.freeClrStartLm = 3;
com.strangevillage.wudywurm.Config.posClrsVec = new Array<number>();
com.strangevillage.wudywurm.Config.lvlClrsVec = new Array<number>();
com.strangevillage.wudywurm.Config.lvlNextBlockLimitsVec = Array<number>([4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]);
com.strangevillage.wudywurm.Config.freeNextBlockLimit = 5;
com.strangevillage.wudywurm.Config.lvlNewClrLimitsVec = Array<number>([350,300,250,200,350,300,250,200,350,300,250,200,350,300,250]);
com.strangevillage.wudywurm.Config.freeNewClrLimit = 100;
com.strangevillage.wudywurm.Config.lvlBlNewDecLimitsVec = Array<number>([flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE,flash.int.MAX_VALUE]);
com.strangevillage.wudywurm.Config.lvlDoorsLimitsVec = Array<number>([14000,16000,18000,20000,11000,12000,14000,15000,7500,8500,9500,10500,6000,7000,9000]);
com.strangevillage.wudywurm.Config.freeBlNewDecLimit = 100;
com.strangevillage.wudywurm.Config.doorsLimit = new mochi.as3.MochiDigits(0);
com.strangevillage.wudywurm.Config.doorsPts = new mochi.as3.MochiDigits(0);
com.strangevillage.wudywurm.Config.totalPts = new mochi.as3.MochiDigits(0);
com.strangevillage.wudywurm.Config.nextBlockLimit = new mochi.as3.MochiDigits(0);
com.strangevillage.wudywurm.Config.nextBlock = new mochi.as3.MochiDigits(0);
com.strangevillage.wudywurm.Config.movesTotal = new mochi.as3.MochiDigits(0);
com.strangevillage.wudywurm.Config.newClrCount = new mochi.as3.MochiDigits(0);
com.strangevillage.wudywurm.Config.newClrLimit = new mochi.as3.MochiDigits(0);
com.strangevillage.wudywurm.Config.nextBlDecLimit = new mochi.as3.MochiDigits(0);
com.strangevillage.wudywurm.Config.nextBlDec = new mochi.as3.MochiDigits(0);
com.strangevillage.wudywurm.Config.doResetScore = true;
com.strangevillage.wudywurm.Config.keysVec = new Array<number>();
com.strangevillage.wudywurm.Config.effX = 0;
com.strangevillage.wudywurm.Config.effY = 0;
com.strangevillage.wudywurm.Config.effComboDataVec = new Array<number>();
com.strangevillage.wudywurm.Config._tempPts = 0;
com.strangevillage.wudywurm.Config._tempAddRet = true;
com.strangevillage.wudywurm.Config.SO_ID = "SgVgWudywurmRg";
com.strangevillage.wudywurm.Config.soArr = [];
