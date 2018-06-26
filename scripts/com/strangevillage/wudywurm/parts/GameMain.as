package com.strangevillage.wudywurm.parts
{
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.events.GameEvent;
   import com.strangevillage.wudywurm.events.MainEvent;
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import com.strangevillage.wudywurm.helpers.SoundManager;
   import com.strangevillage.wudywurm.parts.gameParts.EffectsLayer;
   import com.strangevillage.wudywurm.parts.gameParts.GameGui;
   import com.strangevillage.wudywurm.parts.gameParts.GrabBlocks;
   import com.strangevillage.wudywurm.parts.gameParts.GridBg;
   import com.strangevillage.wudywurm.parts.gameParts.WurmBlock;
   import com.strangevillage.wudywurm.parts.gameParts.Wurms;
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.events.KeyboardEvent;
   
   public class GameMain extends Sprite
   {
       
      
      private var _gridBg:GridBg;
      
      private var _grabBlocks:GrabBlocks;
      
      private var _wurms:Wurms;
      
      private var _gameGui:GameGui;
      
      private var _effLr:EffectsLayer;
      
      private var _spcDn:Boolean = false;
      
      private var _xDn:Boolean = false;
      
      private var _headTempVec:Vector.<WurmBlock>;
      
      private var _currHeadIndex:int = 0;
      
      private var _gameEnabled:Boolean = true;
      
      public function GameMain()
      {
         this._effLr = new EffectsLayer();
         this._headTempVec = new Vector.<WurmBlock>();
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
         Config.resetConfigVars();
         GridHolder.resetGridVars();
         this._setEvents();
         this._setBg();
         this._setGrabBlocks();
         this._setWurms();
         this._setGameGui();
         this._setEffLr();
      }
      
      private function _setBg() : void
      {
         this._gridBg = new GridBg();
         this.addChild(this._gridBg);
      }
      
      private function _setGrabBlocks() : void
      {
         this._grabBlocks = new GrabBlocks();
         this.addChild(this._grabBlocks);
      }
      
      private function _setWurms() : void
      {
         this._wurms = new Wurms();
         this.addChild(this._wurms);
      }
      
      private function _setGameGui() : void
      {
         this._gameGui = new GameGui();
         this.addChild(this._gameGui);
      }
      
      private function _setEffLr() : void
      {
         this.addChild(this._effLr);
      }
      
      private function _setEvents() : void
      {
         this.addEventListener(Event.REMOVED_FROM_STAGE,this._removeLsn,false,0,true);
         stage.addEventListener(GameEvent.GAME_EVT,this._gameEvt,false,0,true);
         stage.addEventListener(Event.ENTER_FRAME,this._loop,false,0,true);
         stage.addEventListener(Event.DEACTIVATE,this._focusLost,false,0,true);
         stage.addEventListener(KeyboardEvent.KEY_DOWN,this._kDn,false,0,true);
         stage.addEventListener(KeyboardEvent.KEY_UP,this._kUp,false,0,true);
      }
      
      private function _removeLsn(param1:Event) : void
      {
         this.removeEventListener(Event.REMOVED_FROM_STAGE,this._removeLsn);
         stage.removeEventListener(GameEvent.GAME_EVT,this._gameEvt);
         stage.removeEventListener(Event.ENTER_FRAME,this._loop);
         stage.removeEventListener(Event.DEACTIVATE,this._focusLost);
         stage.removeEventListener(KeyboardEvent.KEY_DOWN,this._kDn);
         stage.removeEventListener(KeyboardEvent.KEY_UP,this._kUp);
      }
      
      private function _focusLost(param1:Event) : void
      {
         stage.addEventListener(Event.ACTIVATE,this._focusBack,false,0,true);
         stage.dispatchEvent(new MainEvent("FocusOverShow"));
         Config.keysVec = Vector.<uint>([]);
      }
      
      private function _focusBack(param1:Event) : void
      {
         stage.removeEventListener(Event.ACTIVATE,this._focusBack);
         stage.dispatchEvent(new MainEvent("FocusOverHide"));
      }
      
      private function _kDn(param1:KeyboardEvent) : void
      {
         var _loc2_:int = 0;
         switch(param1.keyCode)
         {
            case 88:
               if(!this._xDn)
               {
                  this._xDn = true;
                  if(this._wurms.isKeyEnabled() && this._gameEnabled)
                  {
                     if(GridHolder.wurmsVecs.length > 1)
                     {
                        this._wurms.dragEnd();
                        this._headTempVec = Vector.<WurmBlock>([]);
                        _loc2_ = 0;
                        while(_loc2_ < GridHolder.wurmsVecs.length)
                        {
                           if(GridHolder.wurmsVecs[_loc2_].length > 0)
                           {
                              this._headTempVec.push(GridHolder.wurmsVecs[_loc2_][0]);
                           }
                           _loc2_++;
                        }
                        this._currHeadIndex = this._headTempVec.indexOf(GridHolder.selectedBlock);
                        if(this._currHeadIndex == -1 || this._currHeadIndex == this._headTempVec.length - 1)
                        {
                           GridHolder.selectedBlock = this._headTempVec[0];
                        }
                        else
                        {
                           GridHolder.selectedBlock = this._headTempVec[this._currHeadIndex + 1];
                        }
                        GridHolder.selectedBlock.playHiliteAnim();
                        this._headTempVec = Vector.<WurmBlock>([]);
                     }
                     else
                     {
                        GridHolder.wurmsVecs[0][0].playHiliteAnim();
                     }
                     SoundManager.playHeadClick();
                  }
               }
               break;
            case 32:
               if(!this._spcDn)
               {
                  this._spcDn = true;
                  if(this._gameEnabled)
                  {
                     this._wurms.dragEnd();
                  }
               }
               break;
            case 38:
            case 87:
               this._addKey(1);
               break;
            case 40:
            case 83:
               this._addKey(3);
               break;
            case 39:
            case 68:
               this._addKey(2);
               break;
            case 37:
            case 65:
               this._addKey(4);
         }
      }
      
      private function _addKey(param1:uint) : void
      {
         if(Config.keysVec.indexOf(param1) == -1)
         {
            Config.keysVec.push(param1);
         }
      }
      
      private function _kUp(param1:KeyboardEvent) : void
      {
         switch(param1.keyCode)
         {
            case 88:
               this._xDn = false;
               break;
            case 32:
               this._spcDn = false;
               break;
            case 38:
            case 87:
               this._removeKey(1);
               break;
            case 40:
            case 83:
               this._removeKey(3);
               break;
            case 39:
            case 68:
               this._removeKey(2);
               break;
            case 37:
            case 65:
               this._removeKey(4);
         }
      }
      
      private function _removeKey(param1:uint) : void
      {
         if(Config.keysVec.indexOf(param1) != -1)
         {
            Config.keysVec.splice(Config.keysVec.indexOf(param1),1);
         }
      }
      
      private function _gameEvt(param1:GameEvent) : void
      {
         switch(param1.eventName)
         {
            case "CreateDoorsEff":
               this._effLr.doorsShowEff();
               break;
            case "ComboEff":
               this._effLr.doComboEff();
               break;
            case "AddRandomBlock":
               this._grabBlocks.addRandomBlock();
               break;
            case "AddDoors":
               this._grabBlocks.addDoors();
               break;
            case "enableGame":
               this.enableGame(true);
               break;
            case "disableGame":
               this.enableGame(false);
         }
      }
      
      private function _loop(param1:Event) : void
      {
         this._effLr.effLoop();
         if(this._gameEnabled && Config.keysVec.length > 0)
         {
            this._wurms.tryKeyMove();
         }
      }
      
      public function enableGame(param1:Boolean) : void
      {
         if(param1)
         {
            this.mouseChildren = true;
            this.mouseEnabled = true;
            this._gameEnabled = true;
            stage.focus = this;
         }
         else
         {
            this.mouseChildren = false;
            this.mouseEnabled = false;
            this._gameEnabled = false;
         }
      }
   }
}
