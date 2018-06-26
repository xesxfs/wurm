package com.strangevillage.wudywurm.parts.gameParts
{
   import com.greensock.TweenLite;
   import com.greensock.TweenMax;
   import com.greensock.easing.Linear;
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.events.GameEvent;
   import com.strangevillage.wudywurm.events.MainEvent;
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import com.strangevillage.wudywurm.helpers.SoundManager;
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.events.MouseEvent;
   
   public class Wurms extends Sprite
   {
       
      
      private var _wurmsNum:int = 0;
      
      private var _wurmsLengthVec:Vector.<int>;
      
      private var _tempL:int = 0;
      
      private var _tempPosX:int = 0;
      
      private var _tempPosY:int = 0;
      
      private var _moving:Boolean = false;
      
      private var _dragAcite:Boolean = false;
      
      private var _moveDir:int = 0;
      
      private var _dragEnded:Boolean = false;
      
      private var _moveTween:TweenMax;
      
      private const MOVE_TIME:Number = 0.2;
      
      private var _selMoveVec:Vector.<WurmBlock>;
      
      private var _addSkippedMove:Boolean = false;
      
      private var _isKeyMove:Boolean = false;
      
      private var _moveCheckTemp:Boolean = false;
      
      private var _grabRetType:int = 0;
      
      private var _wurmsDestroyed:int = 0;
      
      private var _desWurmID:int = 0;
      
      private var _lineLr:WurmsLines;
      
      public function Wurms()
      {
         this._wurmsLengthVec = new Vector.<int>();
         this._selMoveVec = new Vector.<WurmBlock>();
         super();
         this.x = GridHolder.GRID_X;
         this.y = GridHolder.GRID_Y;
         this._getWurmsNum();
         this._getWurmsLength();
         this._setLinesLr();
         this._setWurms();
         this._lineLr.drawLines();
         GridHolder.selectedBlock = GridHolder.wurmsVecs[0][0];
         GridHolder.selectedBlock.playHiliteAnim(true);
      }
      
      private function _getWurmsNum() : void
      {
         this._wurmsNum = 0;
         var _loc1_:int = 0;
         while(_loc1_ < Config.actuaLvl.Worms.children().length())
         {
            if(this._wurmsNum < int(Config.actuaLvl.Worms.WormPart[_loc1_].@wID))
            {
               this._wurmsNum = int(Config.actuaLvl.Worms.WormPart[_loc1_].@wID);
            }
            _loc1_++;
         }
         GridHolder.doorsTotal = this._wurmsNum;
         var _loc2_:int = 0;
         while(_loc2_ < this._wurmsNum)
         {
            this._wurmsLengthVec.push(0);
            GridHolder.wurmsVecs.push(new Vector.<WurmBlock>());
            _loc2_++;
         }
      }
      
      private function _getWurmsLength() : void
      {
         var _loc1_:int = 0;
         while(_loc1_ < Config.actuaLvl.Worms.children().length())
         {
            if(this._wurmsLengthVec[int(Config.actuaLvl.Worms.WormPart[_loc1_].@wID) - 1] < int(Config.actuaLvl.Worms.WormPart[_loc1_].@posID))
            {
               this._wurmsLengthVec[int(Config.actuaLvl.Worms.WormPart[_loc1_].@wID) - 1] = int(Config.actuaLvl.Worms.WormPart[_loc1_].@posID);
            }
            _loc1_++;
         }
      }
      
      private function _setWurms() : void
      {
         var _loc2_:int = 0;
         var _loc3_:int = 0;
         var _loc4_:WurmBlock = null;
         var _loc5_:WurmBlock = null;
         var _loc1_:int = 0;
         while(_loc1_ < this._wurmsNum)
         {
            _loc2_ = 1;
            while(_loc2_ <= this._wurmsLengthVec[_loc1_])
            {
               _loc3_ = 0;
               while(_loc3_ < Config.actuaLvl.Worms.children().length())
               {
                  if(int(Config.actuaLvl.Worms.WormPart[_loc3_].@wID) == _loc1_ + 1 && int(Config.actuaLvl.Worms.WormPart[_loc3_].@posID) == _loc2_)
                  {
                     this._tempPosX = int(Config.actuaLvl.Worms.WormPart[_loc3_].@x) / GridHolder.TILE_SIZE;
                     this._tempPosY = int(Config.actuaLvl.Worms.WormPart[_loc3_].@y) / GridHolder.TILE_SIZE;
                     if(_loc2_ == 1)
                     {
                        _loc4_ = new WurmBlock(_loc1_,this._tempPosX,this._tempPosY,true,111);
                        this.addChild(_loc4_);
                        GridHolder.wurmsVecs[_loc1_].push(_loc4_);
                        _loc4_.addEventListener(MouseEvent.MOUSE_DOWN,this._startPartDrag,false,0,true);
                     }
                     else
                     {
                        _loc5_ = new WurmBlock(_loc1_,this._tempPosX,this._tempPosY,false,50 + GridHolder.getGrabClrID(this._tempPosX,this._tempPosY));
                        this.addChild(_loc5_);
                        GridHolder.wurmsVecs[_loc1_].push(_loc5_);
                     }
                     break;
                  }
                  _loc3_++;
               }
               _loc2_++;
            }
            _loc1_++;
         }
      }
      
      private function _startPartDrag(param1:MouseEvent) : void
      {
         if(GridHolder.comboMainVec.length > 0)
         {
            this.dragEnd();
         }
         else
         {
            SoundManager.playHeadClick();
            this._dragAcite = true;
            GridHolder.dragBlock = param1.target as WurmBlock;
            GridHolder.selectedBlock = GridHolder.dragBlock;
            GridHolder.dragBlock.playHiliteAnim();
            this._dragEnded = false;
            GridHolder.getPossibleMoves();
            stage.addEventListener(Event.ENTER_FRAME,this._dragCheck,false,0,true);
            stage.addEventListener(MouseEvent.MOUSE_UP,this.dragEnd,false,0,true);
            stage.addEventListener(Event.DEACTIVATE,this._focusLost,false,0,true);
         }
      }
      
      public function tryKeyMove() : void
      {
         if(this.isKeyEnabled() && GridHolder.selectedBlock != null)
         {
            GridHolder.dragBlock = GridHolder.selectedBlock;
            this._dragEnded = false;
            GridHolder.getPossibleMoves();
            if(GridHolder.checkIDVec.indexOf(Config.keysVec[Config.keysVec.length - 1]) != -1)
            {
               this._moveDir = Config.keysVec[Config.keysVec.length - 1];
               this._doMove(true);
            }
         }
      }
      
      public function isKeyEnabled() : Boolean
      {
         if(!this._moving && !this._dragAcite)
         {
            return true;
         }
         return false;
      }
      
      private function _dragCheck(param1:Event) : void
      {
         if(!this._moving)
         {
            this._moveDir = GridHolder.checkMove(stage.mouseX,stage.mouseY);
            if(this._moveDir != 0)
            {
               this._doMove(false);
            }
         }
      }
      
      private function _focusLost(param1:Event) : void
      {
         this.dragEnd();
      }
      
      public function dragEnd(param1:MouseEvent = null) : void
      {
         this.removeDragEvents();
         if(!this._moving)
         {
            this._makeCombo();
         }
         else
         {
            this._dragEnded = true;
         }
      }
      
      public function removeDragEvents() : void
      {
         if(this._dragAcite)
         {
            this._dragAcite = false;
            stage.removeEventListener(Event.ENTER_FRAME,this._dragCheck);
            stage.removeEventListener(MouseEvent.MOUSE_UP,this.dragEnd);
            stage.removeEventListener(Event.DEACTIVATE,this._focusLost);
         }
      }
      
      private function _doMove(param1:Boolean) : void
      {
         var _loc2_:int = 0;
         SoundManager.playMoveSnd();
         this._isKeyMove = param1;
         this._moving = true;
         stage.dispatchEvent(new GameEvent("disableGame"));
         this._selMoveVec = GridHolder.wurmsVecs[GridHolder.dragBlock.wormID];
         this._tryGrab(this._selMoveVec[0]);
         if(this._grabRetType != 1)
         {
            this._selMoveVec[this._selMoveVec.length - 1].nullBlockVecID();
            _loc2_ = this._selMoveVec.length - 1;
            while(_loc2_ > 0)
            {
               this._selMoveVec[_loc2_].idUp(this._selMoveVec[_loc2_ - 1].wID,this._selMoveVec[_loc2_ - 1].hID,true);
               _loc2_--;
            }
         }
         switch(this._moveDir)
         {
            case 1:
               GridHolder.dragBlock.idUp(GridHolder.dragBlock.wID,GridHolder.dragBlock.hID - 1,false);
               break;
            case 3:
               GridHolder.dragBlock.idUp(GridHolder.dragBlock.wID,GridHolder.dragBlock.hID + 1,false);
               break;
            case 2:
               GridHolder.dragBlock.idUp(GridHolder.dragBlock.wID + 1,GridHolder.dragBlock.hID,false);
               break;
            case 4:
               GridHolder.dragBlock.idUp(GridHolder.dragBlock.wID - 1,GridHolder.dragBlock.hID,false);
         }
         this._moveTween = new TweenMax(GridHolder.dragBlock,this.MOVE_TIME,{
            "x":GridHolder.dragBlock.wID * GridHolder.TILE_SIZE,
            "y":GridHolder.dragBlock.hID * GridHolder.TILE_SIZE,
            "ease":Linear.easeInOut,
            "onUpdate":this._moveUp,
            "onComplete":this._moveEnd
         });
      }
      
      private function _moveUp(param1:Boolean = false) : void
      {
         var _loc2_:WurmBlock = null;
         for each(_loc2_ in this._selMoveVec)
         {
            if(_loc2_ != GridHolder.dragBlock)
            {
               _loc2_.moveUp(this._moveTween.totalProgress,param1);
            }
         }
         this._lineLr.drawLines();
      }
      
      private function _moveEnd() : void
      {
         this._moveUp(true);
         this._moving = false;
         if(GridHolder.dragBlock.doorsHit)
         {
            GridHolder.resetCombo();
            this.removeDragEvents();
            this._destroyWurm(GridHolder.dragBlock.wormID);
         }
         else
         {
            stage.dispatchEvent(new GameEvent("enableGame"));
            if(Config.addMove())
            {
               GridHolder.getPossibleMoves();
               GridHolder.checkCombos();
               if(this._dragEnded)
               {
                  this._makeCombo();
               }
               else if(this._isKeyMove && GridHolder.comboMainVec.length == 0)
               {
                  this._nextMoveCheck();
               }
            }
            else
            {
               this.removeDragEvents();
               GridHolder.checkCombos();
               if(GridHolder.comboMainVec.length > 0)
               {
                  this._addSkippedMove = true;
                  this._makeCombo();
               }
               else
               {
                  stage.dispatchEvent(new MainEvent("EndNoSpace"));
               }
            }
         }
      }
      
      private function _makeCombo() : void
      {
         if(GridHolder.comboMainVec.length > 0)
         {
            SoundManager.playCombo(GridHolder.comboMainVec.length);
            Config.addPts();
            GridHolder.removeCombo();
            stage.dispatchEvent(new GameEvent("ComboEff"));
            stage.dispatchEvent(new GameEvent("disableGame"));
            this._comboMoveStart();
         }
         else
         {
            this._nextMoveCheck();
         }
      }
      
      private function _comboMoveStart() : void
      {
         this._lineLr.drawLines();
         stage.addEventListener(Event.ENTER_FRAME,this._comboMoveCheck,false,0,true);
      }
      
      private function _comboMoveCheck(param1:Event) : void
      {
         var _loc3_:int = 0;
         this._lineLr.drawLines();
         this._moveCheckTemp = false;
         var _loc2_:int = 0;
         while(_loc2_ < GridHolder.wurmsVecs.length)
         {
            _loc3_ = 0;
            while(_loc3_ < GridHolder.wurmsVecs[_loc2_].length)
            {
               if(GridHolder.wurmsVecs[_loc2_][_loc3_].moving)
               {
                  this._moveCheckTemp = true;
                  break;
               }
               _loc3_++;
            }
            _loc2_++;
         }
         if(!this._moveCheckTemp)
         {
            this._comboMoveEnd();
         }
      }
      
      private function _comboMoveEnd() : void
      {
         stage.removeEventListener(Event.ENTER_FRAME,this._comboMoveCheck);
         if(Config.actuaLvlID != 0 && GridHolder.doorsTotal != 0 && Config.doorsPts.value >= Config.doorsLimit.value)
         {
            GridHolder.doorsTotal--;
            stage.dispatchEvent(new GameEvent("AddDoors"));
            if(GridHolder.doorsTotal != 0)
            {
               Config.doorsPts.setValue(0);
               Config.actualGameGui.updatePoints();
            }
            else
            {
               Config.doorsPts.setValue(Config.doorsLimit.value);
               Config.actualGameGui.showDoorsDoneMsg();
            }
         }
         GridHolder.checkCombos();
         if(GridHolder.comboMainVec.length == 0)
         {
            stage.dispatchEvent(new GameEvent("enableGame"));
            if(this._addSkippedMove)
            {
               this._addSkippedMove = false;
               Config.addMove();
            }
            this._nextMoveCheck();
         }
         else
         {
            TweenLite.to(this,0.6,{"onComplete":this._makeCombo});
         }
      }
      
      private function _nextMoveCheck() : Boolean
      {
         if(!GridHolder.wurmsPosMove())
         {
            stage.dispatchEvent(new MainEvent("EndNoMove"));
            return true;
         }
         return false;
      }
      
      private function _tryGrab(param1:WurmBlock) : void
      {
         if(param1.grabID != 0)
         {
            this._grabRetType = 1;
            this._createGrabBlock(param1.wID,param1.hID,param1.grabID);
            param1.grabID = 0;
         }
         else
         {
            this._grabRetType = 0;
         }
      }
      
      private function _createGrabBlock(param1:int, param2:int, param3:int) : void
      {
         var _loc4_:WurmBlock = new WurmBlock(GridHolder.dragBlock.wormID,param1,param2,false,50 + param3);
         this.addChildAt(_loc4_,1);
         GridHolder.wurmsVecs[GridHolder.dragBlock.wormID].splice(1,0,_loc4_);
      }
      
      private function _destroyWurm(param1:int) : void
      {
         this._desWurmID = param1;
         this._wurmsDestroyed++;
         var _loc2_:int = 0;
         while(_loc2_ < GridHolder.wurmsVecs[param1].length)
         {
            GridHolder.wurmsVecs[param1][_loc2_].doneDestroy();
            _loc2_++;
         }
         this._lineLr.drawLines();
         stage.addEventListener(Event.ENTER_FRAME,this._doneDestroyMoveCheck,false,0,true);
      }
      
      private function _doneDestroyMoveCheck(param1:Event) : void
      {
         this._lineLr.drawLines();
         this._moveCheckTemp = false;
         var _loc2_:int = 0;
         while(_loc2_ < GridHolder.wurmsVecs[this._desWurmID].length)
         {
            if(GridHolder.wurmsVecs[this._desWurmID][_loc2_].moving)
            {
               this._moveCheckTemp = true;
               break;
            }
            _loc2_++;
         }
         if(!this._moveCheckTemp)
         {
            this._wurmDestroyEnd();
         }
      }
      
      private function _wurmDestroyEnd() : void
      {
         var _loc1_:int = 0;
         stage.removeEventListener(Event.ENTER_FRAME,this._doneDestroyMoveCheck);
         while(GridHolder.wurmsVecs[this._desWurmID].length > 0)
         {
            GridHolder.wurmsVecs[this._desWurmID].splice(0,1);
         }
         GridHolder.removeDoors(GridHolder.dragBlock.posID);
         if(this._wurmsDestroyed == GridHolder.wurmsVecs.length)
         {
            stage.dispatchEvent(new MainEvent("LevelComplete"));
         }
         else
         {
            _loc1_ = 0;
            while(_loc1_ < GridHolder.wurmsVecs.length)
            {
               if(GridHolder.wurmsVecs[_loc1_].length > 0)
               {
                  GridHolder.selectedBlock = GridHolder.wurmsVecs[_loc1_][0];
                  GridHolder.selectedBlock.playHiliteAnim();
                  SoundManager.playHeadClick();
                  stage.focus = this;
                  break;
               }
               _loc1_++;
            }
            stage.dispatchEvent(new GameEvent("enableGame"));
            Config.addMove();
            this._nextMoveCheck();
         }
      }
      
      private function _setLinesLr() : void
      {
         this._lineLr = new WurmsLines();
         this.addChild(this._lineLr);
      }
   }
}
