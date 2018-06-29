module com {
	export module strangevillage {
		export module wudywurm {
			export module helpers {
				export class SoundManager extends egret.HashObject {
					public static SND_CLICK:any;
					public static _Move3Snd:flash.Sound;
					public static SND_DoorsFall:any;
					public static SND_DoorsShow:any;
					public static _GrabSnd:flash.Sound;
					public static _clickSnd:flash.Sound;
					public static SND_GameComplete:any;
					public static _moveTemp:number;
					public static _Combo3Snd:flash.Sound;
					public static _Move2Snd:flash.Sound;
					public static _DoorsFallSnd:flash.Sound;
					public static SND_Grab:any;
					public static _canPlaySound:boolean;
					public static _musicTrns:flash.SoundTransform;
					public static _sndChnl:flash.SoundChannel;
					public static SND_Combo1:any;
					public static SND_Combo3:any;
					public static _GameCompleteSnd:flash.Sound;
					public static SND_Combo2:any;
					public static _Combo2Snd:flash.Sound;
					public static _HeadClickSnd:flash.Sound;
					public static _Move1Snd:flash.Sound;
					public static SND_BlockCreate:any;
					public static _GameEndSnd:flash.Sound;
					public static _Move4Snd:flash.Sound;
					public static _Combo1Snd:flash.Sound;
					public static SND_Move1:any;
					public static SND_Move3:any;
					public static SND_Move4:any;
					public static _musicLoop:MusicLoop;
					public static SND_HeadClick:any;
					public static SND_GameEnd:any;
					public static _DoorsShowSnd:flash.Sound;
					public static SND_Move2:any;
					public static sfxEnabled:boolean;
					public static _musicChannel:flash.SoundChannel;
					public static _BlockCreateSnd:flash.Sound;

					public constructor()
					{
						super();
						super();
					}

					public static playMoveSnd()
					{
						com.strangevillage.wudywurm.helpers.SoundManager._moveTemp = Math.random();
						if(com.strangevillage.wudywurm.helpers.SoundManager._moveTemp <= 0.25)
						{
							com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._Move1Snd,0.7,20);
						}
						else if(com.strangevillage.wudywurm.helpers.SoundManager._moveTemp <= 0.5)
						{
							com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._Move2Snd,0.7,20);
						}
						else if(com.strangevillage.wudywurm.helpers.SoundManager._moveTemp <= 0.75)
						{
							com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._Move3Snd,0.7,20);
						}
						else
						{
							com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._Move4Snd,0.7,20);
						}
					}

					public static playClickSnd()
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._clickSnd,0.8,20);
					}

					public static playBlockCreate()
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._BlockCreateSnd,0.6,0);
					}

					public static playGameComplete()
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._GameCompleteSnd,1,20);
					}

					public static playGrab()
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._GrabSnd,0.7,20);
					}

					public static playHeadClick()
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._HeadClickSnd,0.8,20);
					}

					public static playGameEnd()
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._GameEndSnd,1,20);
					}

					public static playCombo(param1:number)
					{
						param1 = flash.checkInt(param1);
						if(param1 <= 5)
						{
							com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._Combo1Snd,0.8,20);
							console.log("combo 1");
						}
						else if(param1 <= 10)
						{
							com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._Combo2Snd,0.8,20);
							console.log("combo 2");
						}
						else
						{
							com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._Combo3Snd,0.8,20);
							console.log("combo 3");
						}
					}

					public static stopSound()
					{
						if(com.strangevillage.wudywurm.helpers.SoundManager._sndChnl != null)
						{
							com.strangevillage.wudywurm.helpers.SoundManager._sndChnl.stop();
						}
					}

					public static stopMusic()
					{
						if(com.strangevillage.wudywurm.helpers.SoundManager._musicChannel != null)
						{
							com.strangevillage.wudywurm.helpers.SoundManager._musicTrns.volume = 0;
							com.strangevillage.wudywurm.helpers.SoundManager._musicChannel.soundTransform = com.strangevillage.wudywurm.helpers.SoundManager._musicTrns;
						}
					}

					public static playSound(param1:flash.Sound,param2:number = 1.0,param3:number = 0)
					{
						if(com.strangevillage.wudywurm.helpers.SoundManager.sfxEnabled && com.strangevillage.wudywurm.helpers.SoundManager._canPlaySound)
						{
							com.strangevillage.wudywurm.helpers.SoundManager._sndChnl = param1.play(param3,0,new flash.SoundTransform(param2,0));
						}
					}

					public static playMusic()
					{
						if(com.strangevillage.wudywurm.helpers.SoundManager._canPlaySound)
						{
							if(com.strangevillage.wudywurm.helpers.SoundManager._musicChannel == null)
							{
								com.strangevillage.wudywurm.helpers.SoundManager._musicChannel = com.strangevillage.wudywurm.helpers.SoundManager._musicLoop.play(0,flash.int.MAX_VALUE,com.strangevillage.wudywurm.helpers.SoundManager._musicTrns);
							}
							else
							{
								com.strangevillage.wudywurm.helpers.SoundManager._musicTrns.volume = 0.25;
								com.strangevillage.wudywurm.helpers.SoundManager._musicChannel.soundTransform = com.strangevillage.wudywurm.helpers.SoundManager._musicTrns;
							}
						}
					}

					public static playDoorsFall()
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._DoorsFallSnd,0.6,20);
					}

					public static playDoorsShow()
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playSound(com.strangevillage.wudywurm.helpers.SoundManager._DoorsShowSnd,0.8,20);
					}

				}
			}
		}
	}
}

com.strangevillage.wudywurm.helpers.SoundManager.SND_CLICK = com.strangevillage.wudywurm.helpers.SoundManager_SND_CLICK;
com.strangevillage.wudywurm.helpers.SoundManager._Move3Snd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_Move3();
com.strangevillage.wudywurm.helpers.SoundManager.SND_DoorsFall = com.strangevillage.wudywurm.helpers.SoundManager_SND_DoorsFall;
com.strangevillage.wudywurm.helpers.SoundManager.SND_DoorsShow = com.strangevillage.wudywurm.helpers.SoundManager_SND_DoorsShow;
com.strangevillage.wudywurm.helpers.SoundManager._GrabSnd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_Grab();
com.strangevillage.wudywurm.helpers.SoundManager._clickSnd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_CLICK();
com.strangevillage.wudywurm.helpers.SoundManager.SND_GameComplete = com.strangevillage.wudywurm.helpers.SoundManager_SND_GameComplete;
com.strangevillage.wudywurm.helpers.SoundManager._moveTemp = 0;
com.strangevillage.wudywurm.helpers.SoundManager._Combo3Snd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_Combo3();
com.strangevillage.wudywurm.helpers.SoundManager._Move2Snd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_Move2();
com.strangevillage.wudywurm.helpers.SoundManager._DoorsFallSnd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_DoorsFall();
com.strangevillage.wudywurm.helpers.SoundManager.SND_Grab = com.strangevillage.wudywurm.helpers.SoundManager_SND_Grab;
com.strangevillage.wudywurm.helpers.SoundManager._canPlaySound = flash.Capabilities.hasAudio;
com.strangevillage.wudywurm.helpers.SoundManager._musicTrns = new flash.SoundTransform(0.3);
com.strangevillage.wudywurm.helpers.SoundManager.SND_Combo1 = com.strangevillage.wudywurm.helpers.SoundManager_SND_Combo1;
com.strangevillage.wudywurm.helpers.SoundManager.SND_Combo3 = com.strangevillage.wudywurm.helpers.SoundManager_SND_Combo3;
com.strangevillage.wudywurm.helpers.SoundManager._GameCompleteSnd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_GameComplete();
com.strangevillage.wudywurm.helpers.SoundManager.SND_Combo2 = com.strangevillage.wudywurm.helpers.SoundManager_SND_Combo2;
com.strangevillage.wudywurm.helpers.SoundManager._Combo2Snd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_Combo2();
com.strangevillage.wudywurm.helpers.SoundManager._HeadClickSnd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_HeadClick();
com.strangevillage.wudywurm.helpers.SoundManager._Move1Snd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_Move1();
com.strangevillage.wudywurm.helpers.SoundManager.SND_BlockCreate = com.strangevillage.wudywurm.helpers.SoundManager_SND_BlockCreate;
com.strangevillage.wudywurm.helpers.SoundManager._GameEndSnd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_GameEnd();
com.strangevillage.wudywurm.helpers.SoundManager._Move4Snd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_Move4();
com.strangevillage.wudywurm.helpers.SoundManager._Combo1Snd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_Combo1();
com.strangevillage.wudywurm.helpers.SoundManager.SND_Move1 = com.strangevillage.wudywurm.helpers.SoundManager_SND_Move1;
com.strangevillage.wudywurm.helpers.SoundManager.SND_Move3 = com.strangevillage.wudywurm.helpers.SoundManager_SND_Move3;
com.strangevillage.wudywurm.helpers.SoundManager.SND_Move4 = com.strangevillage.wudywurm.helpers.SoundManager_SND_Move4;
com.strangevillage.wudywurm.helpers.SoundManager._musicLoop = new MusicLoop();
com.strangevillage.wudywurm.helpers.SoundManager.SND_HeadClick = com.strangevillage.wudywurm.helpers.SoundManager_SND_HeadClick;
com.strangevillage.wudywurm.helpers.SoundManager.SND_GameEnd = com.strangevillage.wudywurm.helpers.SoundManager_SND_GameEnd;
com.strangevillage.wudywurm.helpers.SoundManager._DoorsShowSnd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_DoorsShow();
com.strangevillage.wudywurm.helpers.SoundManager.SND_Move2 = com.strangevillage.wudywurm.helpers.SoundManager_SND_Move2;
com.strangevillage.wudywurm.helpers.SoundManager.sfxEnabled = true;
com.strangevillage.wudywurm.helpers.SoundManager._BlockCreateSnd = new com.strangevillage.wudywurm.helpers.SoundManager.SND_BlockCreate();
