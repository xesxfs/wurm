package com.strangevillage.wudywurm.base
{
   import flash.display.Sprite;
   
   public class ItemHiliterBase extends Sprite
   {
       
      
      private var _hilited:Boolean = false;
      
      public function ItemHiliterBase()
      {
         super();
         this.mouseChildren = false;
         this.mouseEnabled = false;
         this.visible = false;
      }
      
      public function hilite(param1:Boolean) : void
      {
         if(param1 && !this._hilited)
         {
            this.visible = true;
            this._hilited = true;
         }
         else if(!param1 && this._hilited)
         {
            this.visible = false;
            this._hilited = false;
         }
      }
   }
}
