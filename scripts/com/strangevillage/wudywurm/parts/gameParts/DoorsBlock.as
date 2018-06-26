package com.strangevillage.wudywurm.parts.gameParts
{
   import com.greensock.TweenLite;
   import com.greensock.easing.Back;
   import com.greensock.easing.Sine;
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import com.strangevillage.wudywurm.helpers.SoundManager;
   import flash.display.Sprite;
   
   public class DoorsBlock extends Sprite
   {
       
      
      public var wID:int = 0;
      
      public var hID:int = 0;
      
      private var _mainMc:EndDoorsMc;
      
      public var posID:int = 0;
      
      public function DoorsBlock(param1:int, param2:int)
      {
         super();
         this.mouseChildren = false;
         this.mouseEnabled = false;
         this.posID = param2 * GridHolder.GRID_W + param1;
         this.wID = param1;
         this.hID = param2;
         GridHolder.doorsVec.push(this);
         GridHolder.gridVec[this.posID] = 66;
         this.x = this.wID * GridHolder.TILE_SIZE;
         this.y = this.hID * GridHolder.TILE_SIZE;
         this._setMainMc();
         SoundManager.playDoorsShow();
         this._mainMc.x = this._mainMc.y = 24;
         this._mainMc.scaleX = this._mainMc.scaleY = 0;
         TweenLite.to(this._mainMc,0.5,{
            "x":0,
            "y":0,
            "scaleX":1,
            "scaleY":1,
            "ease":Back.easeOut
         });
      }
      
      private function _destroyAnimEnd() : void
      {
         this.removeChild(this._mainMc);
         this._mainMc = null;
         this.parent.removeChild(this);
      }
      
      private function _setMainMc() : void
      {
         this._mainMc = new EndDoorsMc();
         this.addChild(this._mainMc);
      }
      
      public function destroyDoors() : void
      {
         GridHolder.gridVec[this.posID] = 0;
         GridHolder.doorsVec.splice(GridHolder.doorsVec.indexOf(this),1);
         TweenLite.killTweensOf(this._mainMc);
         TweenLite.to(this._mainMc,0.3,{
            "x":24,
            "y":24,
            "scaleX":0,
            "scaleY":0,
            "ease":Sine.easeIn,
            "onComplete":this._destroyAnimEnd
         });
      }
   }
}
