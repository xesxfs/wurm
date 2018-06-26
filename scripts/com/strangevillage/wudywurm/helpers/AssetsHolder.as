package com.strangevillage.wudywurm.helpers
{
   import flash.display.Bitmap;
   import flash.utils.ByteArray;
   
   public class AssetsHolder
   {
      
      public static var BgOverBm:Bitmap;
      
      public static const BgTilesGrid:Class = AssetsHolder_BgTilesGrid;
      
      private static var _lvlsVec:Vector.<XML> = new Vector.<XML>();
      
      private static const LvlFree:Class = AssetsHolder_LvlFree;
      
      public static var gridBgTiles:Bitmap;
      
      private static const Lvl11:Class = AssetsHolder_Lvl11;
      
      private static const Lvl12:Class = AssetsHolder_Lvl12;
      
      private static const Lvl13:Class = AssetsHolder_Lvl13;
      
      private static const Lvl14:Class = AssetsHolder_Lvl14;
      
      private static const Lvl15:Class = AssetsHolder_Lvl15;
      
      private static const Lvl10:Class = AssetsHolder_Lvl10;
      
      private static var _tempBA:ByteArray;
      
      public static const BgOver:Class = AssetsHolder_BgOver;
      
      private static var _freerideLvl:XML;
      
      private static const Lvl1:Class = AssetsHolder_Lvl1;
      
      private static const Lvl2:Class = AssetsHolder_Lvl2;
      
      private static const Lvl3:Class = AssetsHolder_Lvl3;
      
      private static const Lvl4:Class = AssetsHolder_Lvl4;
      
      private static const Lvl5:Class = AssetsHolder_Lvl5;
      
      private static const Lvl6:Class = AssetsHolder_Lvl6;
      
      private static const Lvl7:Class = AssetsHolder_Lvl7;
      
      private static const Lvl8:Class = AssetsHolder_Lvl8;
      
      private static const Lvl9:Class = AssetsHolder_Lvl9;
       
      
      public function AssetsHolder()
      {
         super();
      }
      
      private static function _setLevel(param1:ByteArray) : void
      {
         _lvlsVec.push(new XML(param1.readUTFBytes(param1.length)));
      }
      
      public static function initAssets() : void
      {
         _initTiles();
         _initLevels();
      }
      
      private static function _initLevels() : void
      {
         _setLevel(new Lvl1());
         _setLevel(new Lvl2());
         _setLevel(new Lvl3());
         _setLevel(new Lvl4());
         _setLevel(new Lvl5());
         _setLevel(new Lvl6());
         _setLevel(new Lvl7());
         _setLevel(new Lvl8());
         _setLevel(new Lvl9());
         _setLevel(new Lvl10());
         _setLevel(new Lvl11());
         _setLevel(new Lvl12());
         _setLevel(new Lvl13());
         _setLevel(new Lvl14());
         _setLevel(new Lvl15());
         _tempBA = new LvlFree();
         _freerideLvl = new XML(_tempBA.readUTFBytes(_tempBA.length));
      }
      
      public static function getLevel(param1:int) : XML
      {
         if(param1 == -1)
         {
            return _freerideLvl;
         }
         return _lvlsVec[param1];
      }
      
      private static function _initTiles() : void
      {
         gridBgTiles = new BgTilesGrid();
         BgOverBm = new BgOver();
      }
   }
}
