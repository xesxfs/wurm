package com.strangevillage.wudywurm.base
{
   import com.strangevillage.wudywurm.Config;
   import flash.display.MovieClip;
   import flash.display.Sprite;
   import flash.events.MouseEvent;
   import flash.net.URLRequest;
   import flash.net.navigateToURL;
   
   public class RedirectLogo extends Sprite
   {
       
      
      public var lgHit:MovieClip;
      
      private var _hit:Sprite;
      
      public function RedirectLogo()
      {
         super();
         this.mouseChildren = false;
         this.buttonMode = true;
         this._hit = this.getChildByName("lgHit") as Sprite;
         this.hitArea = this._hit;
         this._hit.visible = false;
         this.addEventListener(MouseEvent.CLICK,this._click,false,0,true);
      }
      
      private function _click(param1:MouseEvent) : void
      {
         navigateToURL(new URLRequest(Config.REDIRECT_URL),Config.REDIRECT_TYPE);
      }
   }
}
