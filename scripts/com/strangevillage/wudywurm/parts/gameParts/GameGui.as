package com.strangevillage.wudywurm.parts.gameParts
{
   import com.greensock.TweenLite;
   import com.greensock.easing.Sine;
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.events.GameEvent;
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import flash.display.Sprite;
   
   public class GameGui extends Sprite
   {
       
      
      private var _doorsDone:Boolean = false;
      
      private var _bbScale:Number = 0.0;
      
      private var _mainMc:GameGuiMc;
      
      private var _gtScale:Number = 0.0;
      
      public function GameGui()
      {
         super();
         Config.actualGameGui = this;
         this._setMainMc();
         this._setGuiState();
         this.updateCombo();
         this.updateMoves();
         this.updatePoints();
      }
      
      private function _setGuiState() : void
      {
         if(Config.actuaLvlID == 0)
         {
            this._mainMc.gpPt.visible = false;
            this._mainMc.lg1.visible = false;
            this._mainMc.lg2.visible = true;
         }
         else
         {
            this._mainMc.lg1.visible = true;
            this._mainMc.lg2.visible = false;
         }
      }
      
      public function updateCombo() : void
      {
         this._mainMc.fldCombo.text = GridHolder.comboMainVec.length.toString();
      }
      
      public function updatePoints() : void
      {
         this._mainMc.fldTotal.text = Config.totalPts.value.toString();
         if(Config.actuaLvlID != 0)
         {
            if(!this._doorsDone)
            {
               if(Config.doorsLimit.value - Config.doorsPts.value > 0)
               {
                  this._mainMc.gpPt.fldGate.text = String(Config.doorsLimit.value - Config.doorsPts.value);
               }
               else
               {
                  this._mainMc.gpPt.fldGate.text = "0";
               }
               this._gtScale = Config.doorsPts.value / Config.doorsLimit.value;
               if(this._gtScale > 1)
               {
                  this._gtScale = 1;
               }
               if(this._gtScale != this._mainMc.gpPt.gateBar.scaleX)
               {
                  TweenLite.killTweensOf(this._mainMc.gpPt.gateBar);
                  if(this._gtScale == 0)
                  {
                     this._mainMc.gpPt.gateBar.scaleX = this._gtScale;
                  }
                  else
                  {
                     TweenLite.to(this._mainMc.gpPt.gateBar,0.3,{
                        "scaleX":this._gtScale,
                        "ease":Sine.easeInOut
                     });
                  }
               }
            }
            if(Config.totalPts.value > Config.soArr[3])
            {
               Config.soArr[3] = Config.totalPts.value;
            }
            this._mainMc.fldBest.text = Config.soArr[3];
         }
         else
         {
            if(Config.totalPts.value > Config.soArr[4])
            {
               Config.soArr[4] = Config.totalPts.value;
            }
            this._mainMc.fldBest.text = Config.soArr[4];
         }
      }
      
      private function _setMainMc() : void
      {
         this._mainMc = new GameGuiMc();
         this.addChild(this._mainMc);
         this._mainMc.gpPt.gateBar.scaleX = 0;
         this._mainMc.nbPt.nextBlockBar.scaleX = 0;
         this._mainMc.fldBest.text = "0";
      }
      
      public function showDoorsDoneMsg() : void
      {
         this.updatePoints();
         this._doorsDone = true;
         this._mainMc.gpPt.fldGate.text = "ALL OPEN";
         TweenLite.killTweensOf(this._mainMc.gpPt.gateBar);
         TweenLite.to(this._mainMc.gpPt.gateBar,0.3,{
            "scaleX":this._gtScale,
            "ease":Sine.easeInOut
         });
      }
      
      public function updateMoves() : void
      {
         if(Config.newClrCount.value >= Config.newClrLimit.value)
         {
            Config.newClrCount.setValue(Config.newClrCount.value % Config.newClrLimit.value);
            if(Config.posClrsVec.length != 0)
            {
               Config.addRandomClr();
            }
            else
            {
               trace("No color add - all used");
            }
         }
         if(Config.nextBlock.value >= Config.nextBlockLimit.value)
         {
            stage.dispatchEvent(new GameEvent("AddRandomBlock"));
            Config.nextBlock.setValue(0);
            Config.nextBlDec.addValue(1);
            if(Config.nextBlDec.value >= Config.nextBlDecLimit.value)
            {
               Config.nextBlDec.setValue(0);
               if(Config.nextBlockLimit.value > 2)
               {
                  Config.nextBlockLimit.addValue(-1);
               }
            }
         }
         this._mainMc.fldMoves.text = Config.movesTotal.value.toString();
         this._mainMc.nbPt.fldNextBlock.text = String(Config.nextBlockLimit.value - Config.nextBlock.value - 1);
         this._bbScale = Config.nextBlock.value / (Config.nextBlockLimit.value - 1);
         if(this._bbScale > 1)
         {
            this._bbScale = 1;
         }
         if(this._bbScale != this._mainMc.nbPt.nextBlockBar.scaleX)
         {
            TweenLite.killTweensOf(this._mainMc.nbPt.nextBlockBar);
            if(this._bbScale == 0)
            {
               this._mainMc.nbPt.nextBlockBar.scaleX = this._bbScale;
            }
            else
            {
               TweenLite.to(this._mainMc.nbPt.nextBlockBar,0.2,{
                  "scaleX":this._bbScale,
                  "ease":Sine.easeInOut
               });
            }
         }
      }
   }
}
