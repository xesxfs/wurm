package com.strangevillage.wudywurm.parts
{
   import flash.display.Sprite;
   
   public class MainMenu extends Sprite
   {
       
      
      private var _mainMc:MainMenuMc;
      
      public function MainMenu()
      {
         super();
         this._mainMc = new MainMenuMc();
         this.addChild(this._mainMc);
      }
      
      public function showMenu(param1:Boolean) : void
      {
         if(param1)
         {
            this.visible = true;
         }
         else
         {
            this.visible = false;
         }
      }
   }
}
