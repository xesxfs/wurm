package com.strangevillage.wudywurm.parts
{
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.base.LevelSelectBtnBase;
   import flash.display.Sprite;
   
   public class LevelsMenu extends Sprite
   {
       
      
      private var _mainMc:LevelsMenuMc;
      
      private var _tempBtn:LevelSelectBtnBase;
      
      public function LevelsMenu()
      {
         super();
         this.visible = false;
         this._mainMc = new LevelsMenuMc();
         this.addChild(this._mainMc);
      }
      
      public function showMenu(param1:Boolean) : void
      {
         var _loc2_:int = 0;
         if(param1)
         {
            _loc2_ = 1;
            while(_loc2_ <= Config.lvlsTotal)
            {
               this._tempBtn = this._mainMc.getChildByName("LvlBtn_" + _loc2_.toString()) as LevelSelectBtnBase;
               if(_loc2_ <= Config.soArr[5])
               {
                  this._tempBtn.lockBtn(false);
               }
               else
               {
                  this._tempBtn.lockBtn(true);
               }
               _loc2_++;
            }
            this.visible = true;
         }
         else
         {
            this.visible = false;
         }
      }
   }
}
