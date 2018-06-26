package
{
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.events.ButtonEvent;
   import com.strangevillage.wudywurm.events.MainEvent;
   import com.strangevillage.wudywurm.helpers.AssetsHolder;
   import com.strangevillage.wudywurm.parts.DebugOver;
   import com.strangevillage.wudywurm.parts.EndOver;
   import com.strangevillage.wudywurm.parts.FocusOver;
   import com.strangevillage.wudywurm.parts.GameMain;
   import com.strangevillage.wudywurm.parts.GiveUpOver;
   import com.strangevillage.wudywurm.parts.LevelCompleteOver;
   import com.strangevillage.wudywurm.parts.LevelsMenu;
   import com.strangevillage.wudywurm.parts.MainMenu;
   import com.strangevillage.wudywurm.parts.TopMenu;
   import com.strangevillage.wudywurm.parts.TransitionsLr;
   import flash.display.BitmapData;
   import flash.display.Sprite;
   import flash.display.StageAlign;
   import flash.display.StageScaleMode;
   import flash.events.Event;
   import flash.events.MouseEvent;
   import flash.net.URLRequest;
   import flash.net.navigateToURL;
   import mochi.as3.MochiServices;
   
   public class Main extends Sprite
   {
       
      
      private var _intro:IntroAnimMc;
      
      private var _mochiads_game_id:String = "1277680fc9e270fa";
      
      private var _topMenu:TopMenu;
      
      private var _mainMenu:MainMenu;
      
      private var _levelsMenu:LevelsMenu;
      
      private var _giveUpOver:GiveUpOver;
      
      private var _endOver:EndOver;
      
      private var _lvlCompleteOver:LevelCompleteOver;
      
      private var _focusOver:FocusOver;
      
      private var _transLr:TransitionsLr;
      
      private var _transBm:BitmapData;
      
      private var _game:GameMain;
      
      public function Main()
      {
         super();
         if(stage)
         {
            this.init();
         }
         else
         {
            addEventListener(Event.ADDED_TO_STAGE,this.init);
         }
      }
      
      private function init(param1:Event = null) : void
      {
         removeEventListener(Event.ADDED_TO_STAGE,this.init);
         stage.stageFocusRect = false;
         stage.scaleMode = StageScaleMode.SHOW_ALL;
         stage.align = StageAlign.TOP;
         MochiBot.track(this,"9e3e85f3");
         this._connectMochiServices();
         this._setIntro();
      }
      
      private function _setIntro() : void
      {
         this._intro = new IntroAnimMc();
         this.addChild(this._intro);
         this._intro.iAnim.mouseChildren = false;
         this._intro.iAnim.buttonMode = true;
         this._intro.iAnim.gotoAndStop(1);
         this._intro.iAnim.addFrameScript(535,this._introAnimEnd);
         this._intro.iAnim.addFrameScript(this._intro.iAnim.totalFrames - 1,this._introAnimComplete);
         this._intro.iAnim.addEventListener(MouseEvent.CLICK,this._introRedirect,false,0,true);
         this._intro.BtnIntroPlay.doEventDispatch = false;
         this._intro.BtnIntroPlay.addEventListener(MouseEvent.CLICK,this._itroStart,false,0,true);
      }
      
      private function _itroStart(param1:MouseEvent) : void
      {
         this._intro.BtnIntroPlay.visible = false;
         this._intro.bSafe.visible = false;
         this._intro.iAnim.gotoAndPlay(1);
      }
      
      private function _introRedirect(param1:MouseEvent) : void
      {
         navigateToURL(new URLRequest(Config.REDIRECT_URL),Config.REDIRECT_TYPE);
      }
      
      private function _introAnimEnd() : void
      {
         this._mainSetup();
         this.setChildIndex(this._intro,this.numChildren - 1);
      }
      
      private function _introAnimComplete() : void
      {
         this._intro.iAnim.stop();
         this.removeChild(this._intro);
         this._intro = null;
      }
      
      private function _connectMochiServices() : void
      {
         MochiServices.connect(this._mochiads_game_id,stage,this._onMochiServConnectError);
      }
      
      private function _onMochiServConnectError(param1:String) : void
      {
      }
      
      private function _mainSetup() : void
      {
         AssetsHolder.initAssets();
         Config.checkMainSO();
         this._setLsns();
         this._setMainLayers();
      }
      
      private function _setDebug() : void
      {
         this.addChild(new DebugOver());
      }
      
      private function _setMainLayers() : void
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
      
      private function _setTopMenu() : void
      {
         this._topMenu = new TopMenu();
         this.addChild(this._topMenu);
      }
      
      private function _setMainMenu() : void
      {
         this._mainMenu = new MainMenu();
         this.addChild(this._mainMenu);
      }
      
      private function _setLvlsMenu() : void
      {
         this._levelsMenu = new LevelsMenu();
         this.addChild(this._levelsMenu);
      }
      
      private function _setGiveUpOver() : void
      {
         this._giveUpOver = new GiveUpOver();
         this.addChild(this._giveUpOver);
      }
      
      private function _setEndOver() : void
      {
         this._endOver = new EndOver();
         this.addChild(this._endOver);
      }
      
      private function _setLvlCompleteOver() : void
      {
         this._lvlCompleteOver = new LevelCompleteOver();
         this.addChild(this._lvlCompleteOver);
      }
      
      private function _setFocusOver() : void
      {
         this._focusOver = new FocusOver();
         this.addChild(this._focusOver);
      }
      
      private function _setTransLr() : void
      {
         this._transLr = new TransitionsLr();
         this.addChild(this._transLr);
      }
      
      private function _playTransition(param1:int) : void
      {
         this._transBm = new BitmapData(Config.GAME_W,Config.GAME_H,false,0);
         switch(param1)
         {
            case 1:
               this._transBm.draw(this._mainMenu);
               break;
            case 2:
               this._transBm.draw(this._levelsMenu);
               break;
            case 3:
               this._transBm.draw(this._game);
         }
         this._transLr.playTrans(this._transBm);
      }
      
      private function _startGame() : void
      {
         this._game = new GameMain();
         this.addChildAt(this._game,0);
         if(Config.soArr[0] == 1)
         {
            this._topMenu.showHelpOver(true);
            Config.soArr[0] = 0;
            Config.updateSO();
         }
      }
      
      private function _resetGame() : void
      {
         if(this._game != null)
         {
            this.removeChild(this._game);
            this._game = null;
         }
      }
      
      private function _setLsns() : void
      {
         stage.addEventListener(ButtonEvent.BUTTON_EVT,this._btnEvt,false,0,true);
         stage.addEventListener(MainEvent.MAIN_EVT,this._mainEvt,false,0,true);
      }
      
      private function _btnEvt(param1:ButtonEvent) : void
      {
         switch(param1.buttonName)
         {
            case "MainStartLevelBtn":
               this._playTransition(1);
               this._mainMenu.showMenu(false);
               this._levelsMenu.showMenu(true);
               break;
            case "MainFreeridelBtn":
               this._playTransition(1);
               this._mainMenu.showMenu(false);
               Config.actuaLvlID = 0;
               this._startGame();
               break;
            case "MainMazeBtn":
               navigateToURL(new URLRequest("http://www.nowgamez.com/GamesGames/2362/wudywurm-bonus-maze?utm_source=wudywurmMaze&utm_medium=wudywurmMaze&utm_campaign=wudywurmMaze"),"_blank");
               break;
            case "LevelsBackBtn":
               this._playTransition(2);
               this._mainMenu.showMenu(true);
               this._levelsMenu.showMenu(false);
               break;
            case "LevelSelect":
               this._playTransition(2);
               this._levelsMenu.showMenu(false);
               this._startGame();
               break;
            case "LvlMainBtn":
               this._lvlCompleteOver.hideOver(3);
               break;
            case "LvlNextBtn":
               this._lvlCompleteOver.hideOver(1);
               break;
            case "LvlSelectBtn":
               this._lvlCompleteOver.hideOver(2);
               break;
            case "GameGiveUpBtn":
               if(this._game)
               {
                  this._game.enableGame(false);
                  this._giveUpOver.showGiveUp();
               }
               break;
            case "MainMoreBtn":
            case "EndMoreBtn":
            case "LevelsMoreBtn":
            case "LevelCompleteMoreBtn":
               navigateToURL(new URLRequest(Config.REDIRECT_URL),Config.REDIRECT_TYPE);
         }
      }
      
      private function _mainEvt(param1:MainEvent) : void
      {
         switch(param1.eventName)
         {
            case "GiveUp":
               this._playTransition(3);
               this._resetGame();
               this._mainMenu.showMenu(true);
               break;
            case "LevelComplete":
               this._game.enableGame(false);
               this._lvlCompleteOver.showOver();
               break;
            case "CompleteToNextLvl":
               this._playTransition(3);
               Config.doResetScore = false;
               Config.actuaLvlID++;
               this._resetGame();
               this._startGame();
               break;
            case "CompleteToLvlSelect":
               this._playTransition(3);
               this._resetGame();
               this._levelsMenu.showMenu(true);
               break;
            case "CompleteToMain":
               this._playTransition(3);
               this._resetGame();
               this._mainMenu.showMenu(true);
               break;
            case "EndNoSpace":
               this._game.enableGame(false);
               this._endOver.showOver(1);
               break;
            case "EndNoMove":
               this._game.enableGame(false);
               this._endOver.showOver(2);
               break;
            case "PlayAgain":
               this._playTransition(3);
               this._resetGame();
               this._startGame();
               break;
            case "EndToMain":
               this._playTransition(3);
               this._resetGame();
               this._mainMenu.showMenu(true);
               break;
            case "FocusOverShow":
               this._focusOver.showOver();
               break;
            case "FocusOverHide":
               this._focusOver.hideOver();
         }
      }
   }
}
