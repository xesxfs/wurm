package com.strangevillage.wudywurm.helpers.checkObjects
{
   import com.strangevillage.wudywurm.helpers.GridHolder;
   
   public class MoveCheckRect
   {
       
      
      private var _tX:int = 0;
      
      private var _tY:int = 0;
      
      private var _dirID:int = 0;
      
      private var _lX:int = 0;
      
      private var _lY:int = 0;
      
      public function MoveCheckRect(param1:int, param2:int, param3:int)
      {
         super();
         this._dirID = param3;
         switch(param3)
         {
            case 1:
               this._lX = GridHolder.GRID_X + param1 * GridHolder.TILE_SIZE;
               this._tX = this._lX + GridHolder.TILE_SIZE;
               this._lY = GridHolder.GRID_Y;
               this._tY = GridHolder.GRID_Y + param2 * GridHolder.TILE_SIZE + GridHolder.TILE_SIZE;
               break;
            case 3:
               this._lX = GridHolder.GRID_X + param1 * GridHolder.TILE_SIZE;
               this._tX = this._lX + GridHolder.TILE_SIZE;
               this._lY = GridHolder.GRID_Y + param2 * GridHolder.TILE_SIZE;
               this._tY = GridHolder.GRID_Y + GridHolder.GRID_H * GridHolder.TILE_SIZE;
               break;
            case 2:
               this._lX = GridHolder.GRID_X + param1 * GridHolder.TILE_SIZE;
               this._tX = GridHolder.GRID_X + GridHolder.GRID_W * GridHolder.TILE_SIZE;
               this._lY = GridHolder.GRID_Y + param2 * GridHolder.TILE_SIZE;
               this._tY = this._lY + GridHolder.TILE_SIZE;
               break;
            case 4:
               this._lX = GridHolder.GRID_X;
               this._tX = GridHolder.GRID_X + param1 * GridHolder.TILE_SIZE + GridHolder.TILE_SIZE;
               this._lY = GridHolder.GRID_Y + param2 * GridHolder.TILE_SIZE;
               this._tY = this._lY + GridHolder.TILE_SIZE;
         }
      }
      
      public function getLimits() : Array
      {
         return [this._lX,this._tX,this._lY,this._tY];
      }
      
      public function isIn(param1:int, param2:int) : int
      {
         if(param1 > this._lX && param1 < this._tX && param2 > this._lY && param2 < this._tY)
         {
            return this._dirID;
         }
         return 0;
      }
   }
}
