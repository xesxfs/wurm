package com.strangevillage.wudywurm.helpers
{
   import flash.media.Sound;
   import flash.media.SoundChannel;
   import flash.media.SoundTransform;
   import flash.system.Capabilities;
   
   public class SoundManager
   {
      
      private static const SND_CLICK:Class = SoundManager_SND_CLICK;
      
      private static var _Move3Snd:Sound = new SND_Move3();
      
      private static const SND_DoorsFall:Class = SoundManager_SND_DoorsFall;
      
      private static const SND_DoorsShow:Class = SoundManager_SND_DoorsShow;
      
      private static var _GrabSnd:Sound = new SND_Grab();
      
      private static var _clickSnd:Sound = new SND_CLICK();
      
      private static const SND_GameComplete:Class = SoundManager_SND_GameComplete;
      
      private static var _moveTemp:Number = 0;
      
      private static var _Combo3Snd:Sound = new SND_Combo3();
      
      private static var _Move2Snd:Sound = new SND_Move2();
      
      private static var _DoorsFallSnd:Sound = new SND_DoorsFall();
      
      private static const SND_Grab:Class = SoundManager_SND_Grab;
      
      private static var _canPlaySound:Boolean = Capabilities.hasAudio;
      
      private static var _musicTrns:SoundTransform = new SoundTransform(0.3);
      
      private static var _sndChnl:SoundChannel;
      
      private static const SND_Combo1:Class = SoundManager_SND_Combo1;
      
      private static const SND_Combo3:Class = SoundManager_SND_Combo3;
      
      private static var _GameCompleteSnd:Sound = new SND_GameComplete();
      
      private static const SND_Combo2:Class = SoundManager_SND_Combo2;
      
      private static var _Combo2Snd:Sound = new SND_Combo2();
      
      private static var _HeadClickSnd:Sound = new SND_HeadClick();
      
      private static var _Move1Snd:Sound = new SND_Move1();
      
      private static const SND_BlockCreate:Class = SoundManager_SND_BlockCreate;
      
      private static var _GameEndSnd:Sound = new SND_GameEnd();
      
      private static var _Move4Snd:Sound = new SND_Move4();
      
      private static var _Combo1Snd:Sound = new SND_Combo1();
      
      private static const SND_Move1:Class = SoundManager_SND_Move1;
      
      private static const SND_Move3:Class = SoundManager_SND_Move3;
      
      private static const SND_Move4:Class = SoundManager_SND_Move4;
      
      private static var _musicLoop:MusicLoop = new MusicLoop();
      
      private static const SND_HeadClick:Class = SoundManager_SND_HeadClick;
      
      private static const SND_GameEnd:Class = SoundManager_SND_GameEnd;
      
      private static var _DoorsShowSnd:Sound = new SND_DoorsShow();
      
      private static const SND_Move2:Class = SoundManager_SND_Move2;
      
      public static var sfxEnabled:Boolean = true;
      
      private static var _musicChannel:SoundChannel;
      
      private static var _BlockCreateSnd:Sound = new SND_BlockCreate();
       
      
      public function SoundManager()
      {
         super();
      }
      
      public static function playMoveSnd() : void
      {
         _moveTemp = Math.random();
         if(_moveTemp <= 0.25)
         {
            playSound(_Move1Snd,0.7,20);
         }
         else if(_moveTemp <= 0.5)
         {
            playSound(_Move2Snd,0.7,20);
         }
         else if(_moveTemp <= 0.75)
         {
            playSound(_Move3Snd,0.7,20);
         }
         else
         {
            playSound(_Move4Snd,0.7,20);
         }
      }
      
      public static function playClickSnd() : void
      {
         playSound(_clickSnd,0.8,20);
      }
      
      public static function playBlockCreate() : void
      {
         playSound(_BlockCreateSnd,0.6,0);
      }
      
      public static function playGameComplete() : void
      {
         playSound(_GameCompleteSnd,1,20);
      }
      
      public static function playGrab() : void
      {
         playSound(_GrabSnd,0.7,20);
      }
      
      public static function playHeadClick() : void
      {
         playSound(_HeadClickSnd,0.8,20);
      }
      
      public static function playGameEnd() : void
      {
         playSound(_GameEndSnd,1,20);
      }
      
      public static function playCombo(param1:int) : void
      {
         if(param1 <= 5)
         {
            playSound(_Combo1Snd,0.8,20);
            trace("combo 1");
         }
         else if(param1 <= 10)
         {
            playSound(_Combo2Snd,0.8,20);
            trace("combo 2");
         }
         else
         {
            playSound(_Combo3Snd,0.8,20);
            trace("combo 3");
         }
      }
      
      public static function stopSound() : void
      {
         if(_sndChnl != null)
         {
            _sndChnl.stop();
         }
      }
      
      public static function stopMusic() : void
      {
         if(_musicChannel != null)
         {
            _musicTrns.volume = 0;
            _musicChannel.soundTransform = _musicTrns;
         }
      }
      
      public static function playSound(param1:Sound, param2:Number = 1.0, param3:int = 0) : void
      {
         if(sfxEnabled && _canPlaySound)
         {
            _sndChnl = param1.play(param3,0,new SoundTransform(param2,0));
         }
      }
      
      public static function playMusic() : void
      {
         if(_canPlaySound)
         {
            if(_musicChannel == null)
            {
               _musicChannel = _musicLoop.play(0,int.MAX_VALUE,_musicTrns);
            }
            else
            {
               _musicTrns.volume = 0.25;
               _musicChannel.soundTransform = _musicTrns;
            }
         }
      }
      
      public static function playDoorsFall() : void
      {
         playSound(_DoorsFallSnd,0.6,20);
      }
      
      public static function playDoorsShow() : void
      {
         playSound(_DoorsShowSnd,0.8,20);
      }
   }
}
