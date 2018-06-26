package com.strangevillage.wudywurm.parts
{
   import com.greensock.TweenLite;
   import com.greensock.easing.Back;
   import com.greensock.easing.Sine;
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.helpers.SoundManager;
   import flash.display.Sprite;
   import flash.events.MouseEvent;
   
   public class TopMenu extends Sprite
   {
       
      
      private var _mainMc:TopMenuMc;
      
      private const HIDE_Y:Number = -600;
      
      private var _overShown:Boolean = false;
      
      public function TopMenu()
      {
         super();
         this._mainMc = new TopMenuMc();
         this.addChild(this._mainMc);
         this._initSfx();
         this._initMusic();
         this._mainMc.helpMc.visible = false;
         this._mainMc.helpMc.y = this.HIDE_Y;
         this._mainMc.helpMc.anm1.gotoAndStop(1);
         this._mainMc.helpMc.anm2.gotoAndStop(1);
         this._mainMc.topHelpBtn.doEventDispatch = false;
         this._mainMc.topHelpBtn.addEventListener(MouseEvent.CLICK,this._helpSwitchClick,false,0,true);
         this._mainMc.helpMc.HelpOkBtn.doEventDispatch = false;
         this._mainMc.helpMc.HelpOkBtn.addEventListener(MouseEvent.CLICK,this._okOverClick,false,0,true);
         this._mainMc.topSfxBtn.addEventListener(MouseEvent.CLICK,this._sfxSwitch,false,0,true);
         this._mainMc.topMusicBtn.addEventListener(MouseEvent.CLICK,this._musicSwitch,false,0,true);
      }
      
      private function _helpSwitchClick(param1:MouseEvent) : void
      {
         SoundManager.playClickSnd();
         if(this._overShown)
         {
            this.showHelpOver(false);
         }
         else
         {
            this.showHelpOver(true);
         }
      }
      
      private function _okOverClick(param1:MouseEvent) : void
      {
         this.showHelpOver(false);
      }
      
      private function _initSfx() : void
      {
         if(Config.soArr[1] == 1)
         {
            this._mainMc.topSfxBtn.gotoAndStop(1);
            SoundManager.sfxEnabled = true;
         }
         else
         {
            this._mainMc.topSfxBtn.gotoAndStop(2);
            SoundManager.sfxEnabled = false;
         }
      }
      
      private function _sfxSwitch(param1:MouseEvent) : void
      {
         if(this._mainMc.topSfxBtn.currentFrame == 1)
         {
            Config.soArr[1] = 0;
            this._mainMc.topSfxBtn.gotoAndStop(2);
            SoundManager.sfxEnabled = false;
         }
         else
         {
            Config.soArr[1] = 1;
            this._mainMc.topSfxBtn.gotoAndStop(1);
            SoundManager.sfxEnabled = true;
            SoundManager.playClickSnd();
         }
         Config.updateSO();
      }
      
      private function _initMusic() : void
      {
         if(Config.soArr[2] == 1)
         {
            this._mainMc.topMusicBtn.gotoAndStop(1);
            SoundManager.playMusic();
         }
         else
         {
            this._mainMc.topMusicBtn.gotoAndStop(2);
         }
      }
      
      private function _musicSwitch(param1:MouseEvent) : void
      {
         SoundManager.playClickSnd();
         if(this._mainMc.topMusicBtn.currentFrame == 1)
         {
            Config.soArr[2] = 0;
            this._mainMc.topMusicBtn.gotoAndStop(2);
            SoundManager.stopMusic();
         }
         else
         {
            Config.soArr[2] = 1;
            this._mainMc.topMusicBtn.gotoAndStop(1);
            SoundManager.playMusic();
         }
         Config.updateSO();
      }
      
      public function showHelpOver(param1:Boolean) : void
      {
         TweenLite.killTweensOf(this._mainMc.helpMc);
         this._mainMc.helpMc.mouseChildren = false;
         this._mainMc.helpMc.mouseEnabled = false;
         if(param1)
         {
            this._overShown = true;
            this._mainMc.helpMc.visible = true;
            TweenLite.to(this._mainMc.helpMc,0.6,{
               "y":0,
               "ease":Back.easeOut,
               "onComplete":this._showEnd
            });
         }
         else
         {
            this._overShown = false;
            TweenLite.to(this._mainMc.helpMc,0.4,{
               "y":this.HIDE_Y,
               "ease":Sine.easeIn,
               "onComplete":this._hideEnd
            });
         }
      }
      
      private function _showEnd() : void
      {
         this._mainMc.helpMc.mouseChildren = true;
         this._mainMc.helpMc.mouseEnabled = true;
         this._mainMc.helpMc.anm1.gotoAndPlay(2);
         this._mainMc.helpMc.anm2.gotoAndPlay(2);
      }
      
      private function _hideEnd() : void
      {
         this._mainMc.helpMc.visible = false;
         this._mainMc.helpMc.anm1.gotoAndStop(1);
         this._mainMc.helpMc.anm2.gotoAndStop(1);
      }
   }
}
