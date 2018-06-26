package com.strangevillage.wudywurm.parts.gameParts
{
   import com.greensock.TweenLite;
   import com.greensock.easing.Linear;
   import com.strangevillage.wudywurm.base.ItemHiliterBase;
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import com.strangevillage.wudywurm.helpers.SoundManager;
   import flash.display.MovieClip;
   import flash.display.Sprite;
   
   public class WurmBlock extends Sprite
   {
       
      
      public var hID:int = 0;
      
      private var _tempCoHID:int = 0;
      
      private var _posXDiff:int = 0;
      
      private var _hitMc:Sprite;
      
      private var _posYDiff:int = 0;
      
      private var _moveTime:Number = 0.0;
      
      public var posShift:int = 0;
      
      public var cMoveVec:Vector.<int>;
      
      private var _doneAnimSteps:Vector.<int>;
      
      public var bType:int = 0;
      
      private var _doneTempPos:int = 0;
      
      public var doorsHit:Boolean = false;
      
      public var wID:int = 0;
      
      private var _tempCoWID:int = 0;
      
      private var _mainMc:MovieClip;
      
      private var _headHilite:WmHltAnim;
      
      public var grabID:int = 0;
      
      public var wormID:int = 0;
      
      public var posID:int = 0;
      
      private var _hilitePt:ItemHiliterBase;
      
      private var _wurmEyes:snakeEyeFill;
      
      public var moving:Boolean = false;
      
      private const DONE_TWN_TIME:Number = 0.2;
      
      public function WurmBlock(param1:int, param2:int, param3:int, param4:Boolean, param5:int)
      {
         this._doneAnimSteps = new Vector.<int>();
         this.cMoveVec = new Vector.<int>();
         super();
         this.wormID = param1;
         this.bType = param5;
         this.mouseChildren = false;
         if(param4)
         {
            this.buttonMode = true;
            this._setHit();
         }
         else
         {
            this.mouseEnabled = false;
         }
         this._setMc();
         this.idUp(param2,param3,false);
         this.x = this.wID * GridHolder.TILE_SIZE;
         this.y = this.hID * GridHolder.TILE_SIZE;
      }
      
      public function nullBlockVecID() : void
      {
         GridHolder.gridVec[this.posID] = 0;
      }
      
      private function _moveEnd() : void
      {
         this.wID = this._tempCoWID;
         this.hID = this._tempCoHID;
         this.posID = this.hID * GridHolder.GRID_W + this.wID;
         GridHolder.gridVec[this.posID] = this.bType;
         this.cMoveVec = Vector.<int>([]);
         this.moving = false;
      }
      
      public function comboDestroy() : void
      {
         this.nullBlockVecID();
         this._destroyBlock();
      }
      
      private function _playHltAnim() : void
      {
         this._headHilite.visible = true;
         this._headHilite.gotoAndPlay(2);
      }
      
      private function _startDoneMoveTween() : void
      {
         this._tempCoHID = this._doneAnimSteps.splice(this._doneAnimSteps.length - 1,1)[0];
         this._tempCoWID = this._doneAnimSteps.splice(this._doneAnimSteps.length - 1,1)[0];
         TweenLite.to(this,this.DONE_TWN_TIME,{
            "x":this._tempCoWID * GridHolder.TILE_SIZE,
            "y":this._tempCoHID * GridHolder.TILE_SIZE,
            "ease":Linear.easeNone,
            "onComplete":this._doneTwnEnd
         });
      }
      
      public function idUp(param1:int, param2:int, param3:Boolean) : void
      {
         this.posID = param2 * GridHolder.GRID_W + param1;
         this.wID = param1;
         this.hID = param2;
         if(this.bType == 111)
         {
            this._wurmEyes.gotoAndStop(1);
            if(GridHolder.gridVec[this.posID] > 0 && GridHolder.gridVec[this.posID] < 10)
            {
               SoundManager.playGrab();
               this.grabID = GridHolder.gridVec[this.posID];
               this._wurmEyes.gotoAndStop(this.grabID + 1);
               GridHolder.grabBlocksVec[this.posID].grabDestroy();
            }
            else if(GridHolder.gridVec[this.posID] == 66)
            {
               this.doorsHit = true;
            }
         }
         GridHolder.gridVec[this.posID] = this.bType;
         if(param3)
         {
            this._posXDiff = this.x - this.wID * GridHolder.TILE_SIZE;
            this._posYDiff = this.y - this.hID * GridHolder.TILE_SIZE;
         }
      }
      
      private function _combTwnEnd() : void
      {
         if(this.cMoveVec.length != 0)
         {
            this._startCombMoveTween();
         }
         else
         {
            this._moveEnd();
         }
      }
      
      private function _setMc() : void
      {
         if(this.bType == 111)
         {
            this._mainMc = new WurmFrontMc();
            this._wurmEyes = this._mainMc.getChildByName("eyFill") as snakeEyeFill;
            this._wurmEyes.gotoAndStop(1);
            this._headHilite = this._mainMc.getChildByName("hAnim") as WmHltAnim;
            this._headHilite.gotoAndStop(1);
            this._headHilite.visible = false;
            this._headHilite.addFrameScript(this._headHilite.totalFrames - 1,this._hltAnimEnd);
         }
         else
         {
            this._mainMc = new WurmBodyMc();
            this._mainMc.gotoAndStop(this.bType - 50);
            this._hilitePt = this._mainMc.getChildByName("hltBg") as ItemHiliterBase;
         }
         if(this._mainMc != null)
         {
            this.addChild(this._mainMc);
         }
         else
         {
            trace("Wrong Train Block Type!");
         }
      }
      
      public function doneDestroy() : void
      {
         var _loc1_:int = 0;
         this.moving = true;
         this.nullBlockVecID();
         this._doneTempPos = GridHolder.wurmsVecs[this.wormID].indexOf(this);
         if(this._doneTempPos == 0)
         {
            this._doneDestroyEnd();
         }
         else
         {
            _loc1_ = 0;
            while(_loc1_ < this._doneTempPos)
            {
               this._doneAnimSteps.push(GridHolder.wurmsVecs[this.wormID][_loc1_].wID);
               this._doneAnimSteps.push(GridHolder.wurmsVecs[this.wormID][_loc1_].hID);
               _loc1_++;
            }
            this._startDoneMoveTween();
         }
      }
      
      private function _hltAnimEnd() : void
      {
         this._headHilite.gotoAndStop(1);
         this._headHilite.visible = false;
      }
      
      private function _destroyBlock() : void
      {
         this.removeChild(this._mainMc);
         this._mainMc = null;
         this.parent.removeChild(this);
      }
      
      public function playHiliteAnim(param1:Boolean = false) : void
      {
         if(param1)
         {
            TweenLite.to(this._headHilite,0.9,{"onComplete":this._playHltAnim});
         }
         else
         {
            this._playHltAnim();
         }
      }
      
      public function startComboMove(param1:int) : void
      {
         this.posShift = 0;
         this.moving = true;
         this.nullBlockVecID();
         if(param1 <= 3)
         {
            this._moveTime = 0.15;
         }
         else if(param1 <= 6)
         {
            this._moveTime = 0.1;
         }
         else
         {
            this._moveTime = 0.08;
         }
         this._startCombMoveTween();
      }
      
      private function _doneDestroyEnd() : void
      {
         SoundManager.playDoorsFall();
         this._destroyBlock();
         this.moving = false;
      }
      
      public function moveUp(param1:Number, param2:Boolean) : void
      {
         if(!param2)
         {
            if(this._posXDiff != 0)
            {
               this.x = this.wID * GridHolder.TILE_SIZE + this._posXDiff * (1 - param1);
            }
            if(this._posYDiff != 0)
            {
               this.y = this.hID * GridHolder.TILE_SIZE + this._posYDiff * (1 - param1);
            }
         }
         else
         {
            this._posXDiff = 0;
            this._posYDiff = 0;
            this.x = this.wID * GridHolder.TILE_SIZE;
            this.y = this.hID * GridHolder.TILE_SIZE;
         }
      }
      
      private function _doneTwnEnd() : void
      {
         if(this._doneAnimSteps.length != 0)
         {
            this._startDoneMoveTween();
         }
         else
         {
            this._doneDestroyEnd();
         }
      }
      
      public function checkHilite() : void
      {
         if(this._hilitePt != null)
         {
            if(GridHolder.comboMainVec.indexOf(this.posID) != -1)
            {
               this._hilitePt.hilite(true);
            }
            else
            {
               this._hilitePt.hilite(false);
            }
         }
      }
      
      private function _setHit() : void
      {
         this._hitMc = new Sprite();
         this._hitMc.graphics.beginFill(0,1);
         this._hitMc.graphics.drawRect(0,0,GridHolder.TILE_SIZE,GridHolder.TILE_SIZE);
         this._hitMc.graphics.endFill();
         this.addChild(this._hitMc);
         this.hitArea = this._hitMc;
         this._hitMc.visible = false;
      }
      
      private function _startCombMoveTween() : void
      {
         this._tempCoWID = this.cMoveVec.splice(0,1)[0];
         this._tempCoHID = this.cMoveVec.splice(0,1)[0];
         TweenLite.to(this,this._moveTime,{
            "x":this._tempCoWID * GridHolder.TILE_SIZE,
            "y":this._tempCoHID * GridHolder.TILE_SIZE,
            "ease":Linear.easeNone,
            "onComplete":this._combTwnEnd
         });
      }
   }
}
