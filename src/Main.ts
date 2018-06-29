 class Main extends egret.Sprite {
	private _intro:IntroAnimMc;
	private _mochiads_game_id:string = "1277680fc9e270fa";
	private _topMenu:com.strangevillage.wudywurm.parts.TopMenu;
	private _mainMenu:com.strangevillage.wudywurm.parts.MainMenu;
	private _levelsMenu:com.strangevillage.wudywurm.parts.LevelsMenu;
	private _giveUpOver:com.strangevillage.wudywurm.parts.GiveUpOver;
	private _endOver:com.strangevillage.wudywurm.parts.EndOver;
	private _lvlCompleteOver:com.strangevillage.wudywurm.parts.LevelCompleteOver;
	private _focusOver:com.strangevillage.wudywurm.parts.FocusOver;
	private _transLr:com.strangevillage.wudywurm.parts.TransitionsLr;
	private _transBm:flash.BitmapData;
	private _game:com.strangevillage.wudywurm.parts.GameMain;

	public constructor()
	{
		super();
		var _self__:any = this;
		if(this.stage)
		{
			this.init();
		}
		else
		{
			_self__.addEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.init,this),null);
		}
	}

	private init(param1:egret.Event = null)
	{
		var _self__:any = this;
		_self__.removeEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.init,this),null);
		this.stage["stageFocusRect"] = false;
		this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
		this.stage["align"] = flash.StageAlign.TOP;
		MochiBot.track(this,"9e3e85f3");
		this._connectMochiServices();
		this._setIntro();
	}

	private _setIntro()
	{
		this._intro = new IntroAnimMc();
		this.addChild(this._intro);
		this._intro.iAnim.touchChildren = false;
		this._intro.iAnim["buttonMode"] = true;
		this._intro.iAnim.gotoAndStop(1);
		this._intro.iAnim["addFrameScript"](535,flash.bind(this._introAnimEnd,this));
		this._intro.iAnim["addFrameScript"](this._intro.iAnim.totalFrames - 1,flash.bind(this._introAnimComplete,this));
		this._intro.iAnim.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._introRedirect,this),null,false,0);
		this._intro.BtnIntroPlay.doEventDispatch = false;
		this._intro.BtnIntroPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._itroStart,this),null,false,0);
	}

	private _itroStart(param1:flash.MouseEvent)
	{
		this._intro.BtnIntroPlay.visible = false;
		this._intro.bSafe.visible = false;
		this._intro.iAnim.gotoAndPlay(1);
	}

	private _introRedirect(param1:flash.MouseEvent)
	{
		flash.navigateToURL(new egret.URLRequest(com.strangevillage.wudywurm.Config.REDIRECT_URL),com.strangevillage.wudywurm.Config.REDIRECT_TYPE);
	}

	private _introAnimEnd()
	{
		this._mainSetup();
		this.setChildIndex(this._intro,this.numChildren - 1);
	}

	private _introAnimComplete()
	{
		this._intro.iAnim.stop();
		this.removeChild(this._intro);
		this._intro = null;
	}

	private _connectMochiServices()
	{
		mochi.as3.MochiServices.connect(this._mochiads_game_id,this.stage,flash.bind(this._onMochiServConnectError,this));
	}

	private _onMochiServConnectError(param1:string)
	{
	}

	private _mainSetup()
	{
		com.strangevillage.wudywurm.helpers.AssetsHolder.initAssets();
		com.strangevillage.wudywurm.Config.checkMainSO();
		this._setLsns();
		this._setMainLayers();
	}

	private _setDebug()
	{
		this.addChild(new com.strangevillage.wudywurm.parts.DebugOver());
	}

	private _setMainLayers()
	{
		this._setFocusOver();
		this._setGiveUpOver();
		this._setEndOver();
		this._setLvlCompleteOver();
		this._setMainMenu();
		this._setLvlsMenu();
		this._setTransLr();
		this._setTopMenu();
	}

	private _setTopMenu()
	{
		this._topMenu = new com.strangevillage.wudywurm.parts.TopMenu();
		this.addChild(this._topMenu);
	}

	private _setMainMenu()
	{
		this._mainMenu = new com.strangevillage.wudywurm.parts.MainMenu();
		this.addChild(this._mainMenu);
	}

	private _setLvlsMenu()
	{
		this._levelsMenu = new com.strangevillage.wudywurm.parts.LevelsMenu();
		this.addChild(this._levelsMenu);
	}

	private _setGiveUpOver()
	{
		this._giveUpOver = new com.strangevillage.wudywurm.parts.GiveUpOver();
		this.addChild(this._giveUpOver);
	}

	private _setEndOver()
	{
		this._endOver = new com.strangevillage.wudywurm.parts.EndOver();
		this.addChild(this._endOver);
	}

	private _setLvlCompleteOver()
	{
		this._lvlCompleteOver = new com.strangevillage.wudywurm.parts.LevelCompleteOver();
		this.addChild(this._lvlCompleteOver);
	}

	private _setFocusOver()
	{
		this._focusOver = new com.strangevillage.wudywurm.parts.FocusOver();
		this.addChild(this._focusOver);
	}

	private _setTransLr()
	{
		this._transLr = new com.strangevillage.wudywurm.parts.TransitionsLr();
		this.addChild(this._transLr);
	}

	private _playTransition(param1:number)
	{
		param1 = flash.checkInt(param1);
		this._transBm = new flash.BitmapData(com.strangevillage.wudywurm.Config.GAME_W,com.strangevillage.wudywurm.Config.GAME_H,false,0);
		switch(param1)
		{
		case 1 :
			this._transBm.draw2(this._mainMenu);
			break;
		case 2 :
			this._transBm.draw2(this._levelsMenu);
			break;
		case 3 :
			this._transBm.draw2(this._game);
		}
		this._transLr.playTrans(this._transBm);
	}

	private _startGame()
	{
		this._game = new com.strangevillage.wudywurm.parts.GameMain();
		this.addChildAt(this._game,0);
		if(com.strangevillage.wudywurm.Config.soArr[0] == 1)
		{
			this._topMenu.showHelpOver(true);
			com.strangevillage.wudywurm.Config.soArr[0] = 0;
			com.strangevillage.wudywurm.Config.updateSO();
		}
	}

	private _resetGame()
	{
		if(this._game != null)
		{
			this.removeChild(this._game);
			this._game = null;
		}
	}

	private _setLsns()
	{
		this.stage.addEventListener(com.strangevillage.wudywurm.events.ButtonEvent.BUTTON_EVT,flash.bind(this._btnEvt,this),null,false,0);
		this.stage.addEventListener(com.strangevillage.wudywurm.events.MainEvent.MAIN_EVT,flash.bind(this._mainEvt,this),null,false,0);
	}

	private _btnEvt(param1:com.strangevillage.wudywurm.events.ButtonEvent)
	{
		switch(param1.buttonName)
		{
		case "MainStartLevelBtn" :
			this._playTransition(1);
			this._mainMenu.showMenu(false);
			this._levelsMenu.showMenu(true);
			break;
		case "MainFreeridelBtn" :
			this._playTransition(1);
			this._mainMenu.showMenu(false);
			com.strangevillage.wudywurm.Config.actuaLvlID = flash.checkInt(0);
			this._startGame();
			break;
		case "MainMazeBtn" :
			flash.navigateToURL(new egret.URLRequest("http://www.nowgamez.com/GamesGames/2362/wudywurm-bonus-maze?utm_source=wudywurmMaze&utm_medium=wudywurmMaze&utm_campaign=wudywurmMaze"),"_blank");
			break;
		case "LevelsBackBtn" :
			this._playTransition(2);
			this._mainMenu.showMenu(true);
			this._levelsMenu.showMenu(false);
			break;
		case "LevelSelect" :
			this._playTransition(2);
			this._levelsMenu.showMenu(false);
			this._startGame();
			break;
		case "LvlMainBtn" :
			this._lvlCompleteOver.hideOver(3);
			break;
		case "LvlNextBtn" :
			this._lvlCompleteOver.hideOver(1);
			break;
		case "LvlSelectBtn" :
			this._lvlCompleteOver.hideOver(2);
			break;
		case "GameGiveUpBtn" :
			if(this._game)
			{
				this._game.enableGame(false);
				this._giveUpOver.showGiveUp();
			}
			break;
		case "MainMoreBtn" :
		case "EndMoreBtn" :
		case "LevelsMoreBtn" :
		case "LevelCompleteMoreBtn" :
			flash.navigateToURL(new egret.URLRequest(com.strangevillage.wudywurm.Config.REDIRECT_URL),com.strangevillage.wudywurm.Config.REDIRECT_TYPE);
		}
	}

	private _mainEvt(param1:com.strangevillage.wudywurm.events.MainEvent)
	{
		switch(param1.eventName)
		{
		case "GiveUp" :
			this._playTransition(3);
			this._resetGame();
			this._mainMenu.showMenu(true);
			break;
		case "LevelComplete" :
			this._game.enableGame(false);
			this._lvlCompleteOver.showOver();
			break;
		case "CompleteToNextLvl" :
			this._playTransition(3);
			com.strangevillage.wudywurm.Config.doResetScore = false;
			com.strangevillage.wudywurm.Config.actuaLvlID++;
			this._resetGame();
			this._startGame();
			break;
		case "CompleteToLvlSelect" :
			this._playTransition(3);
			this._resetGame();
			this._levelsMenu.showMenu(true);
			break;
		case "CompleteToMain" :
			this._playTransition(3);
			this._resetGame();
			this._mainMenu.showMenu(true);
			break;
		case "EndNoSpace" :
			this._game.enableGame(false);
			this._endOver.showOver(1);
			break;
		case "EndNoMove" :
			this._game.enableGame(false);
			this._endOver.showOver(2);
			break;
		case "PlayAgain" :
			this._playTransition(3);
			this._resetGame();
			this._startGame();
			break;
		case "EndToMain" :
			this._playTransition(3);
			this._resetGame();
			this._mainMenu.showMenu(true);
			break;
		case "FocusOverShow" :
			this._focusOver.showOver();
			break;
		case "FocusOverHide" :
			this._focusOver.hideOver();
		}
	}

}

flash.extendsClass("Main","egret.Sprite")
