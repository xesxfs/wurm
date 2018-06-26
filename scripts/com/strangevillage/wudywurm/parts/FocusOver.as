package com.strangevillage.wudywurm.parts
{
   import com.greensock.TweenLite;
   import com.strangevillage.wudywurm.Config;
   import flash.display.Sprite;
   
   public class FocusOver extends Sprite
   {
       
      
      private var _mainMc:FocusOverMc;
      
      private var _overMc:Sprite;
      
      public function FocusOver()
      {
         super();
         this.visible = false;
         this.mouseChildren = false;
         this.alpha = 0;
         this._setOver();
         this._mainMc = new FocusOverMc();
         this.addChild(this._mainMc);
      }
      
      private function _setOver() : void
      {
         this._overMc = new Sprite();
         this._overMc.graphics.beginFill(5321260,0.6);
         this._overMc.graphics.drawRect(0,0,Config.GAME_W,Config.GAME_H);
         this._overMc.graphics.endFill();
         this.addChild(this._overMc);
      }
      
      public function showOver() : void
      {
         this.visible = true;
         this.alpha = 0;
         TweenLite.to(this,0.2,{"alpha":1});
      }
      
      public function hideOver() : void
      {
         TweenLite.killTweensOf(this);
         TweenLite.to(this,0.2,{
            "alpha":0,
            "onComplete":this._hideEnd
         });
      }
      
      private function _hideEnd() : void
      {
         this.visible = false;
      }
   }
}
