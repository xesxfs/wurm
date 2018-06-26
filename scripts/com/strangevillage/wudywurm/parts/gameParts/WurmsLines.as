package com.strangevillage.wudywurm.parts.gameParts
{
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import flash.display.Graphics;
   import flash.display.Sprite;
   
   public class WurmsLines extends Sprite
   {
       
      
      private var _gr:Graphics;
      
      private const POS_DF:int = 24;
      
      private var _tempRad:Number = 0.0;
      
      private var _dfX:Number = 0.0;
      
      private var _dfY:Number = 0.0;
      
      private const LN_DF:Number = 7.0;
      
      private var _dx:Number = 0.0;
      
      private var _dy:Number = 0.0;
      
      private var _tempVec:Vector.<WurmBlock>;
      
      public function WurmsLines()
      {
         this._tempVec = new Vector.<WurmBlock>();
         super();
         this.mouseChildren = false;
         this.mouseEnabled = false;
         this._gr = this.graphics;
      }
      
      public function drawLines() : void
      {
         var _loc2_:int = 0;
         this._gr.clear();
         var _loc1_:int = 0;
         while(_loc1_ < GridHolder.wurmsVecs.length)
         {
            this._tempVec = GridHolder.wurmsVecs[_loc1_];
            _loc2_ = 0;
            while(_loc2_ < this._tempVec.length - 1)
            {
               if(this._checkDist(this._tempVec[_loc2_].x,this._tempVec[_loc2_].y,this._tempVec[_loc2_ + 1].x,this._tempVec[_loc2_ + 1].y))
               {
                  this._gr.lineStyle(14,10054484);
                  this._gr.moveTo(this._tempVec[_loc2_].x + this.POS_DF,this._tempVec[_loc2_].y + this.POS_DF);
                  this._gr.lineTo(this._tempVec[_loc2_ + 1].x + this.POS_DF,this._tempVec[_loc2_ + 1].y + this.POS_DF);
                  this._tempRad = Math.atan2(this._tempVec[_loc2_].y - this._tempVec[_loc2_ + 1].y,this._tempVec[_loc2_].x - this._tempVec[_loc2_ + 1].x);
                  this._dfX = Math.sin(this._tempRad) * this.LN_DF;
                  this._dfY = Math.cos(this._tempRad) * this.LN_DF;
                  this._gr.lineStyle(3,7621946);
                  this._gr.moveTo(this._tempVec[_loc2_].x + this.POS_DF + this._dfX,this._tempVec[_loc2_].y + this.POS_DF - this._dfY);
                  this._gr.lineTo(this._tempVec[_loc2_ + 1].x + this.POS_DF + this._dfX,this._tempVec[_loc2_ + 1].y + this.POS_DF - this._dfY);
                  this._gr.moveTo(this._tempVec[_loc2_].x + this.POS_DF - this._dfX,this._tempVec[_loc2_].y + this.POS_DF + this._dfY);
                  this._gr.lineTo(this._tempVec[_loc2_ + 1].x + this.POS_DF - this._dfX,this._tempVec[_loc2_ + 1].y + this.POS_DF + this._dfY);
               }
               _loc2_++;
            }
            _loc1_++;
         }
      }
      
      private function _checkDist(param1:Number, param2:Number, param3:Number, param4:Number) : Boolean
      {
         this._dx = param3 - param1;
         this._dy = param4 - param2;
         if(Math.sqrt(this._dx * this._dx + this._dy * this._dy) < 80)
         {
            return true;
         }
         return false;
      }
   }
}
