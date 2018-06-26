package com.strangevillage.wudywurm.base
{
   import com.greensock.TweenMax;
   import flash.display.MovieClip;
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.events.MouseEvent;
   
   public class TopMenuBtnBase extends MovieClip
   {
       
      
      private var _hit:Sprite;
      
      public var tHit:MovieClip;
      
      public function TopMenuBtnBase()
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
      
      private function init(param1:Event = null) : void
      {
         removeEventListener(Event.ADDED_TO_STAGE,this.init);
         this._hit = this.getChildByName("tHit") as Sprite;
         this.hitArea = this._hit;
         this._hit.visible = false;
         this.mouseChildren = false;
         this.buttonMode = true;
         this.addEventListener(MouseEvent.ROLL_OVER,this._over,false,0,true);
         this.addEventListener(MouseEvent.ROLL_OUT,this._out,false,0,true);
      }
      
      private function _out(param1:MouseEvent) : void
      {
         TweenMax.to(this,0.2,{"colorTransform":{"exposure":1}});
      }
      
      private function _over(param1:MouseEvent) : void
      {
         TweenMax.to(this,0.2,{"colorTransform":{"exposure":1.1}});
      }
   }
}
