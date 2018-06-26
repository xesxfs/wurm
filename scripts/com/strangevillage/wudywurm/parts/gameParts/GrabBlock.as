package com.strangevillage.wudywurm.parts.gameParts
{
   import com.greensock.TweenLite;
   import com.greensock.easing.Back;
   import com.greensock.easing.Sine;
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import flash.display.Sprite;
   
   public class GrabBlock extends Sprite
   {
       
      
      public var hID:int = 0;
      
      public var clrID:int = 0;
      
      private var _mainMc:GrabBlockMc;
      
      public var posID:int = 0;
      
      public var wID:int = 0;
      
      public function GrabBlock(param1:int, param2:int, param3:Boolean)
      {
         super();
         this.mouseChildren = false;
         this.mouseEnabled = false;
         this.posID = param2 * GridHolder.GRID_W + param1;
         this.wID = param1;
         this.hID = param2;
         this.clrID = GridHolder.getGrabClrID(this.wID,this.hID);
         GridHolder.gridVec[this.posID] = this.clrID;
         GridHolder.grabBlocksVec[this.posID] = this;
         this.x = this.wID * GridHolder.TILE_SIZE;
         this.y = this.hID * GridHolder.TILE_SIZE;
         this._setMainMc();
         if(param3)
         {
            this._mainMc.x = this._mainMc.y = 24;
            this._mainMc.scaleX = this._mainMc.scaleY = 0;
            TweenLite.to(this._mainMc,0.4,{
               "x":0,
               "y":0,
               "scaleX":1,
               "scaleY":1,
               "ease":Back.easeOut
            });
         }
      }
      
      private function _destroyBlock(param1:Boolean) : void
      {
         GridHolder.grabBlocksVec[this.posID] = null;
         TweenLite.killTweensOf(this._mainMc);
         if(param1)
         {
            TweenLite.to(this._mainMc,0.2,{
               "x":24,
               "y":24,
               "scaleX":0,
               "scaleY":0,
               "ease":Sine.easeIn,
               "onComplete":this._destroyAnimEnd
            });
         }
         else
         {
            this._destroyAnimEnd();
         }
      }
      
      public function comboDestroy() : void
      {
         GridHolder.gridVec[this.posID] = 0;
         this._destroyBlock(false);
      }
      
      public function grabDestroy() : void
      {
         this._destroyBlock(true);
      }
      
      private function _destroyAnimEnd() : void
      {
         this.removeChild(this._mainMc);
         this._mainMc = null;
         this.parent.removeChild(this);
      }
      
      public function checkHilite() : void
      {
         if(GridHolder.comboMainVec.indexOf(this.posID) != -1)
         {
            this._mainMc.hltBg.hilite(true);
         }
         else
         {
            this._mainMc.hltBg.hilite(false);
         }
      }
      
      private function _setMainMc() : void
      {
         this._mainMc = new GrabBlockMc();
         this.addChild(this._mainMc);
         this._mainMc.gotoAndStop(this.clrID);
      }
   }
}
