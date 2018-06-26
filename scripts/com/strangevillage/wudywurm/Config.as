package com.strangevillage.wudywurm
{
   import com.strangevillage.wudywurm.helpers.AssetsHolder;
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import com.strangevillage.wudywurm.parts.gameParts.GameGui;
   import flash.net.SharedObject;
   import mochi.as3.MochiDigits;
   
   public class Config
   {
      
      public static const GAME_W:uint = 760;
      
      public static const GAME_H:uint = 600;
      
      public static const REDIRECT_URL:String = "http://www.nowgamez.com/?utm_source=wudywurm&utm_medium=wudywurm&utm_campaign=wudywurm";
      
      public static const REDIRECT_TYPE:String = "_blank";
      
      public static var actuaLvl:XML;
      
      public static const lvlsTotal:int = 15;
      
      public static var actuaLvlID:int = 1;
      
      private static const CLR_MAX:int = 9;
      
      private static const lvlClrStartLmVec:Vector.<int> = Vector.<int>([4,4,4,4,4,4,4,4,5,5,5,5,5,5,5]);
      
      private static const freeClrStartLm:int = 3;
      
      public static var posClrsVec:Vector.<int> = new Vector.<int>();
      
      public static var lvlClrsVec:Vector.<int> = new Vector.<int>();
      
      private static const lvlNextBlockLimitsVec:Vector.<int> = Vector.<int>([4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]);
      
      private static const freeNextBlockLimit:int = 5;
      
      private static const lvlNewClrLimitsVec:Vector.<int> = Vector.<int>([350,300,250,200,350,300,250,200,350,300,250,200,350,300,250]);
      
      private static const freeNewClrLimit:int = 100;
      
      private static const lvlBlNewDecLimitsVec:Vector.<int> = Vector.<int>([int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE,int.MAX_VALUE]);
      
      private static const lvlDoorsLimitsVec:Vector.<int> = Vector.<int>([14000,16000,18000,20000,11000,12000,14000,15000,7500,8500,9500,10500,6000,7000,9000]);
      
      private static const freeBlNewDecLimit:int = 100;
      
      public static var doorsLimit:MochiDigits = new MochiDigits(0);
      
      public static var doorsPts:MochiDigits = new MochiDigits(0);
      
      public static var totalPts:MochiDigits = new MochiDigits(0);
      
      public static var nextBlockLimit:MochiDigits = new MochiDigits(0);
      
      public static var nextBlock:MochiDigits = new MochiDigits(0);
      
      public static var movesTotal:MochiDigits = new MochiDigits(0);
      
      public static var newClrCount:MochiDigits = new MochiDigits(0);
      
      public static var newClrLimit:MochiDigits = new MochiDigits(0);
      
      public static var nextBlDecLimit:MochiDigits = new MochiDigits(0);
      
      public static var nextBlDec:MochiDigits = new MochiDigits(0);
      
      public static var doResetScore:Boolean = true;
      
      public static var keysVec:Vector.<uint> = new Vector.<uint>();
      
      public static var effX:Number = 0;
      
      public static var effY:Number = 0;
      
      public static var effComboDataVec:Vector.<int> = new Vector.<int>();
      
      public static var actualGameGui:GameGui;
      
      private static var _tempPts:int = 0;
      
      private static var _tempAddRet:Boolean = true;
      
      public static var mainSO:SharedObject;
      
      public static const SO_ID:String = "SgVgWudywurmRg";
      
      public static var soArr:Array = [];
       
      
      public function Config()
      {
         super();
      }
      
      public static function resetConfigVars() : void
      {
         var _loc2_:int = 0;
         var _loc3_:int = 0;
         keysVec = Vector.<uint>([]);
         actuaLvl = AssetsHolder.getLevel(actuaLvlID - 1);
         posClrsVec = Vector.<int>([]);
         lvlClrsVec = Vector.<int>([]);
         var _loc1_:int = 1;
         while(_loc1_ <= CLR_MAX)
         {
            posClrsVec.push(_loc1_);
            _loc1_++;
         }
         if(actuaLvlID == 0)
         {
            _loc2_ = 0;
            while(_loc2_ < freeClrStartLm)
            {
               addRandomClr();
               _loc2_++;
            }
            doorsLimit.setValue(100);
            nextBlockLimit.setValue(freeNextBlockLimit);
            newClrLimit.setValue(freeNewClrLimit);
            nextBlDecLimit.setValue(freeBlNewDecLimit);
         }
         else
         {
            _loc3_ = 0;
            while(_loc3_ < lvlClrStartLmVec[actuaLvlID - 1])
            {
               addRandomClr();
               _loc3_++;
            }
            doorsLimit.setValue(lvlDoorsLimitsVec[actuaLvlID - 1]);
            nextBlockLimit.setValue(lvlNextBlockLimitsVec[actuaLvlID - 1]);
            newClrLimit.setValue(lvlNewClrLimitsVec[actuaLvlID - 1]);
            nextBlDecLimit.setValue(lvlBlNewDecLimitsVec[actuaLvlID - 1]);
         }
         doorsPts.setValue(0);
         nextBlock.setValue(0);
         movesTotal.setValue(0);
         newClrCount.setValue(0);
         nextBlDec.setValue(0);
         if(doResetScore)
         {
            totalPts.setValue(0);
         }
         else
         {
            doResetScore = true;
         }
      }
      
      public static function addRandomClr() : int
      {
         if(posClrsVec.length != 0)
         {
            lvlClrsVec.push(posClrsVec.splice(Math.round(Math.random() * (posClrsVec.length - 1)),1)[0]);
            return lvlClrsVec[lvlClrsVec.length - 1];
         }
         return lvlClrsVec[Math.round(Math.random() * (lvlClrsVec.length - 1))];
      }
      
      public static function addMove() : Boolean
      {
         _tempAddRet = true;
         if(Config.nextBlock.value + 1 >= Config.nextBlockLimit.value)
         {
            GridHolder.getEmptyPos();
            if(GridHolder.emptyPosVec.length == 0)
            {
               _tempAddRet = false;
            }
         }
         if(_tempAddRet)
         {
            nextBlock.addValue(1);
            movesTotal.addValue(1);
            newClrCount.addValue(1);
            actualGameGui.updateMoves();
         }
         return _tempAddRet;
      }
      
      public static function addPts() : void
      {
         if(GridHolder.comboMainVec.length <= 5)
         {
            _tempPts = GridHolder.comboMainVec.length * 100;
         }
         else if(GridHolder.comboMainVec.length <= 10)
         {
            _tempPts = GridHolder.comboMainVec.length * 105;
         }
         else
         {
            _tempPts = GridHolder.comboMainVec.length * 110;
         }
         if(GridHolder.doorsTotal != 0)
         {
            doorsPts.addValue(_tempPts);
         }
         totalPts.addValue(_tempPts);
         actualGameGui.updatePoints();
      }
      
      public static function checkMainSO() : void
      {
         mainSO = SharedObject.getLocal(SO_ID);
         var _loc1_:String = mainSO.data.fldMainSt;
         if(_loc1_ == null)
         {
            soArr = [1,1,1,0,0,1,0];
            updateSO();
         }
         else
         {
            soArr = _loc1_.split(",");
         }
      }
      
      public static function updateSO() : void
      {
         mainSO.data.fldMainSt = soArr.toString();
         mainSO.flush();
      }
   }
}
