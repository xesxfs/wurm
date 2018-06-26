package com.strangevillage.wudywurm.parts
{
   import com.greensock.TweenLite;
   import com.greensock.easing.Back;
   import com.greensock.easing.Sine;
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.events.MainEvent;
   import com.strangevillage.wudywurm.helpers.SoundManager;
   import flash.display.Sprite;
   
   public class LevelCompleteOver extends Sprite
   {
       
      
      private var _mainMc:LevelCompleteOverMc;
      
      private const HIDE_Y:Number = -505;
      
      private var _hideType:int = 0;
      
      public function LevelCompleteOver()
      {
         super();
         this.visible = false;
         this._mainMc = new LevelCompleteOverMc();
         this.addChild(this._mainMc);
         this._mainMc.lvlCompCont.gotoAndStop(1);
      }
      
      public function showOver() : void
      {
         SoundManager.playGameComplete();
         this.enableOver(false);
         if(Config.actuaLvlID == Config.lvlsTotal)
         {
            this._mainMc.lvlCompCont.gotoAndStop(2);
         }
         else
         {
            this._mainMc.lvlCompCont.gotoAndStop(1);
         }
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
         if(Config.actuaLvlID < Config.lvlsTotal && Config.actuaLvlID == Config.soArr[5])
         {
            Config.soArr[5] = int(Config.soArr[5]) + 1;
         }
         Config.updateSO();
         this.enableOver(true);
      }
      
      public function hideOver(param1:int) : void
      {
         this._hideType = param1;
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
         if(this._hideType == 1)
         {
            stage.dispatchEvent(new MainEvent("CompleteToNextLvl"));
         }
         else if(this._hideType == 2)
         {
            stage.dispatchEvent(new MainEvent("CompleteToLvlSelect"));
         }
         else if(this._hideType == 3)
         {
            stage.dispatchEvent(new MainEvent("CompleteToMain"));
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
