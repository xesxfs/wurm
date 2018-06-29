module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export class TopMenu extends egret.Sprite {
					private _mainMc:TopMenuMc;
					private HIDE_Y:number = -600;
					private _overShown:boolean = false;

					public constructor()
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
						this._mainMc.topHelpBtn["doEventDispatch"] = false;
						this._mainMc.topHelpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._helpSwitchClick,this),null,false,0);
						this._mainMc.helpMc.HelpOkBtn.doEventDispatch = false;
						this._mainMc.helpMc.HelpOkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._okOverClick,this),null,false,0);
						this._mainMc.topSfxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._sfxSwitch,this),null,false,0);
						this._mainMc.topMusicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._musicSwitch,this),null,false,0);
					}

					private _helpSwitchClick(param1:flash.MouseEvent)
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playClickSnd();
						if(this._overShown)
						{
							this.showHelpOver(false);
						}
						else
						{
							this.showHelpOver(true);
						}
					}

					private _okOverClick(param1:flash.MouseEvent)
					{
						this.showHelpOver(false);
					}

					private _initSfx()
					{
						if(com.strangevillage.wudywurm.Config.soArr[1] == 1)
						{
							this._mainMc.topSfxBtn.gotoAndStop(1);
							com.strangevillage.wudywurm.helpers.SoundManager.sfxEnabled = true;
						}
						else
						{
							this._mainMc.topSfxBtn.gotoAndStop(2);
							com.strangevillage.wudywurm.helpers.SoundManager.sfxEnabled = false;
						}
					}

					private _sfxSwitch(param1:flash.MouseEvent)
					{
						if(this._mainMc.topSfxBtn.currentFrame == 1)
						{
							com.strangevillage.wudywurm.Config.soArr[1] = 0;
							this._mainMc.topSfxBtn.gotoAndStop(2);
							com.strangevillage.wudywurm.helpers.SoundManager.sfxEnabled = false;
						}
						else
						{
							com.strangevillage.wudywurm.Config.soArr[1] = 1;
							this._mainMc.topSfxBtn.gotoAndStop(1);
							com.strangevillage.wudywurm.helpers.SoundManager.sfxEnabled = true;
							com.strangevillage.wudywurm.helpers.SoundManager.playClickSnd();
						}
						com.strangevillage.wudywurm.Config.updateSO();
					}

					private _initMusic()
					{
						if(com.strangevillage.wudywurm.Config.soArr[2] == 1)
						{
							this._mainMc.topMusicBtn.gotoAndStop(1);
							com.strangevillage.wudywurm.helpers.SoundManager.playMusic();
						}
						else
						{
							this._mainMc.topMusicBtn.gotoAndStop(2);
						}
					}

					private _musicSwitch(param1:flash.MouseEvent)
					{
						com.strangevillage.wudywurm.helpers.SoundManager.playClickSnd();
						if(this._mainMc.topMusicBtn.currentFrame == 1)
						{
							com.strangevillage.wudywurm.Config.soArr[2] = 0;
							this._mainMc.topMusicBtn.gotoAndStop(2);
							com.strangevillage.wudywurm.helpers.SoundManager.stopMusic();
						}
						else
						{
							com.strangevillage.wudywurm.Config.soArr[2] = 1;
							this._mainMc.topMusicBtn.gotoAndStop(1);
							com.strangevillage.wudywurm.helpers.SoundManager.playMusic();
						}
						com.strangevillage.wudywurm.Config.updateSO();
					}

					public showHelpOver(param1:boolean)
					{
						com.greensock.TweenLite.killTweensOf(this._mainMc.helpMc);
						this._mainMc.helpMc.touchChildren = false;
						this._mainMc.helpMc.touchEnabled = false;
						if(param1)
						{
							this._overShown = true;
							this._mainMc.helpMc.visible = true;
							com.greensock.TweenLite.to(this._mainMc.helpMc,0.6,{"y":0,"ease":com.greensock.easing.Back.easeOut,"onComplete":flash.bind(this._showEnd,this)});
						}
						else
						{
							this._overShown = false;
							com.greensock.TweenLite.to(this._mainMc.helpMc,0.4,{"y":this.HIDE_Y,"ease":com.greensock.easing.Sine.easeIn,"onComplete":flash.bind(this._hideEnd,this)});
						}
					}

					private _showEnd()
					{
						this._mainMc.helpMc.touchChildren = true;
						this._mainMc.helpMc.touchEnabled = true;
						this._mainMc.helpMc.anm1.gotoAndPlay(2);
						this._mainMc.helpMc.anm2.gotoAndPlay(2);
					}

					private _hideEnd()
					{
						this._mainMc.helpMc.visible = false;
						this._mainMc.helpMc.anm1.gotoAndStop(1);
						this._mainMc.helpMc.anm2.gotoAndStop(1);
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.TopMenu","egret.Sprite")
