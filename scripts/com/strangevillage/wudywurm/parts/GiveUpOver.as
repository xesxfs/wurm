package com.strangevillage.wudywurm.parts
{
   import com.greensock.TweenLite;
   import com.greensock.easing.Back;
   import com.greensock.easing.Sine;
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.events.GameEvent;
   import com.strangevillage.wudywurm.events.MainEvent;
   import flash.display.Sprite;
   import flash.events.MouseEvent;
   
   public class GiveUpOver extends Sprite
   {
       
      
      private var _mainMc:GiveUpOverMc;
      
      private var _yesClicked:Boolean = false;
      
      private const HIDE_Y:Number = -490;
      
      public function GiveUpOver()
      {
         super();
         this.visible = false;
         this._mainMc = new GiveUpOverMc();
         this.addChild(this._mainMc);
         this._mainMc.GiveYesBtn.doEventDispatch = false;
         this._mainMc.GiveNoBtn.doEventDispatch = false;
         this._mainMc.GiveYesBtn.addEventListener(MouseEvent.CLICK,this._yesClick,false,0,true);
         this._mainMc.GiveNoBtn.addEventListener(MouseEvent.CLICK,this._noClick,false,0,true);
      }
      
      private function _yesClick(param1:MouseEvent) : void
      {
         this._yesClicked = true;
         this.hideGiveUp();
      }
      
      private function _noClick(param1:MouseEvent) : void
      {
         this._yesClicked = false;
         this.hideGiveUp();
      }
      
      public function showGiveUp() : void
      {
         this.enableOver(false);
         this.visible = true;
         this.y = this.HIDE_Y;
         TweenLite.to(this,0.6,{
            "y":0,
            "ease":Back.easeOut,
            "onComplete":this._showEnd
         });
      }
      
      private function _showEnd() : void
      {
         Config.updateSO();
         this.enableOver(true);
      }
      
      public function hideGiveUp() : void
      {
         this.enableOver(false);
         TweenLite.to(this,0.4,{
            "y":this.HIDE_Y,
            "ease":Sine.easeIn,
            "onComplete":this._hideEnd
         });
      }
      
      private function _hideEnd() : void
      {
         this.visible = false;
         if(this._yesClicked)
         {
            stage.dispatchEvent(new MainEvent("GiveUp"));
         }
         else
         {
            stage.dispatchEvent(new GameEvent("enableGame"));
         }
      }
      
      public function enableOver(param1:Boolean) : void
      {
         if(param1)
         {
            this.mouseChildren = true;
            this.mouseEnabled = true;
         }
         else
         {
            this.mouseChildren = false;
            this.mouseEnabled = false;
         }
      }
   }
}
