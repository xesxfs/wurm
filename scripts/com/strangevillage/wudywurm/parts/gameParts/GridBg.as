package com.strangevillage.wudywurm.parts.gameParts
{
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.helpers.AssetsHolder;
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import flash.display.Bitmap;
   import flash.display.BitmapData;
   import flash.geom.Point;
   import flash.geom.Rectangle;
   
   public class GridBg extends Bitmap
   {
       
      
      private var _mainBmd:BitmapData;
      
      private var _copyRect:Rectangle;
      
      private var _copyPt:Point;
      
      private var _vecPos:int = 0;
      
      public function GridBg()
      {
         super();
         this.x = 0;
         this.y = 0;
         this._copyPt = new Point(0,0);
         this._mainBmd = new BitmapData(Config.GAME_W,Config.GAME_H,false,0);
         this._mainBmd.lock();
         var _loc1_:int = 0;
         while(_loc1_ < Config.actuaLvl.Boundaries.children().length())
         {
            this._vecPos = int(Config.actuaLvl.Boundaries.tile[_loc1_].@y) * GridHolder.GRID_W + int(Config.actuaLvl.Boundaries.tile[_loc1_].@x);
            switch(int(Config.actuaLvl.Boundaries.tile[_loc1_].@id))
            {
               case 0:
                  GridHolder.gridVec[this._vecPos] = 0;
                  this._copyRect = new Rectangle(0,0,GridHolder.TILE_SIZE,GridHolder.TILE_SIZE);
                  break;
               case 1:
                  GridHolder.gridVec[this._vecPos] = -1;
                  this._copyRect = new Rectangle(GridHolder.TILE_SIZE,0,GridHolder.TILE_SIZE,GridHolder.TILE_SIZE);
            }
            this._copyPt.x = GridHolder.GRID_X + int(Config.actuaLvl.Boundaries.tile[_loc1_].@x) * GridHolder.TILE_SIZE;
            this._copyPt.y = GridHolder.GRID_Y + int(Config.actuaLvl.Boundaries.tile[_loc1_].@y) * GridHolder.TILE_SIZE;
            this._mainBmd.copyPixels(AssetsHolder.gridBgTiles.bitmapData,this._copyRect,this._copyPt);
            _loc1_++;
         }
         this._mainBmd.draw(AssetsHolder.BgOverBm);
         this._mainBmd.unlock();
         this.bitmapData = this._mainBmd;
         this.smoothing = true;
      }
   }
}
