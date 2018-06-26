package com.strangevillage.wudywurm.base
{
   import com.greensock.TweenMax;
   import com.strangevillage.wudywurm.events.ButtonEvent;
   import com.strangevillage.wudywurm.helpers.SoundManager;
   import flash.display.MovieClip;
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.events.MouseEvent;
   
   public class GameBtnBase extends Sprite
   {
       
      
      private var _btnBg:Sprite;
      
      public var bBg:MovieClip;
      
      private var _btFill:Sprite;
      
      public var doEventDispatch:Boolean = true;
      
      public function GameBtnBase()
      {
         super();
         if(stage)
         {
            this.init();
         }
         else
         {
            addEventListener(Event.ADDED_TO_STAGE,this.init);
         }
      }
      
      private function _click(param1:MouseEvent) : void
      {
         SoundManager.playClickSnd();
         if(this.doEventDispatch)
         {
            stage.dispatchEvent(new ButtonEvent(this.name));
         }
      }
      
      private function _out(param1:MouseEvent) : void
      {
         TweenMax.to(this._btFill,0.2,{"colorTransform":{"exposure":1}});
      }
      
      private function init(param1:Event = null) : void
      {
         removeEventListener(Event.ADDED_TO_STAGE,this.init);
         this._btnBg = this.getChildByName("bBg") as Sprite;
         this._btFill = this._btnBg.getChildByName("btFill") as Sprite;
         this.mouseChildren = false;
         this.buttonMode = true;
         this.addEventListener(MouseEvent.CLICK,this._click,false,0,true);
         this.addEventListener(MouseEvent.ROLL_OVER,this._over,false,0,true);
         this.addEventListener(MouseEvent.ROLL_OUT,this._out,false,0,true);
      }
      
      public function enableBtn(param1:Boolean) : void
      {
         if(param1)
         {
            if(!this.mouseEnabled)
            {
               this.mouseEnabled = true;
               this.alpha = 1;
            }
         }
         else if(this.mouseEnabled)
         {
            this.mouseEnabled = false;
            this.alpha = 0.5;
         }
      }
      
      private function _over(param1:MouseEvent) : void
      {
         TweenMax.to(this._btFill,0.2,{"colorTransform":{"exposure":1.1}});
      }
   }
}
