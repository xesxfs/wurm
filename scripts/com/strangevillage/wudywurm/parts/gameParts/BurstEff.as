package com.strangevillage.wudywurm.parts.gameParts
{
   import flash.display.Graphics;
   import flash.display.Sprite;
   
   public class BurstEff extends Sprite
   {
       
      
      private var _gr:Graphics;
      
      private var _clr1:uint = 0;
      
      private var _clr2:uint = 0;
      
      private var _crFr:int = 0;
      
      private var _frTt:int = 0;
      
      private var _ct:int = 0;
      
      private var _xVec:Vector.<Number>;
      
      private var _yVec:Vector.<Number>;
      
      private var _scVec:Vector.<Number>;
      
      private var _xValVec:Vector.<Number>;
      
      private var _yValVec:Vector.<Number>;
      
      private var _scValVec:Vector.<Number>;
      
      private var _tempAng:Number = 0;
      
      private var _tempMoveSpd:Number = 0;
      
      private const SPD_BASE:Number = 1.8;
      
      private const SPD_DIFF:Number = 0.6;
      
      public function BurstEff(param1:Number, param2:Number, param3:int, param4:uint, param5:uint)
      {
         this._xVec = new Vector.<Number>();
         this._yVec = new Vector.<Number>();
         this._scVec = new Vector.<Number>();
         this._xValVec = new Vector.<Number>();
         this._yValVec = new Vector.<Number>();
         this._scValVec = new Vector.<Number>();
         super();
         this.x = param1;
         this.y = param2;
         this.rotation = Math.round(Math.random() * 360);
         this._clr1 = param4;
         this._clr2 = param5;
         this._gr = this.graphics;
         this._frTt = 14 + Math.round(Math.random() * 6);
         this._ct = param3;
         var _loc6_:int = 0;
         while(_loc6_ < this._ct)
         {
            this._tempAng = 2 * Math.PI / this._ct * _loc6_ - Math.PI / 6 / 2 + Math.random() * (Math.PI / 6);
            this._tempMoveSpd = this.SPD_BASE - this.SPD_DIFF / 2 + Math.random() * this.SPD_DIFF;
            this._xVec.push(Math.cos(this._tempAng) * this._tempMoveSpd);
            this._xValVec.push(-3 + Math.random() * 6);
            this._yVec.push(Math.sin(this._tempAng) * this._tempMoveSpd);
            this._yValVec.push(-3 + Math.random() * 6);
            this._scVec.push(1 / this._frTt);
            this._scValVec.push(1);
            _loc6_++;
         }
      }
      
      public function effUp() : Boolean
      {
         var _loc1_:int = 0;
         this._gr.clear();
         if(this._crFr != this._frTt)
         {
            _loc1_ = 0;
            while(_loc1_ < this._ct)
            {
               this._gr.beginFill(this._clr1,1);
               this._gr.drawCircle(this._xValVec[_loc1_],this._yValVec[_loc1_],16 * this._scValVec[_loc1_]);
               this._gr.beginFill(this._clr2,1);
               this._gr.drawCircle(this._xValVec[_loc1_],this._yValVec[_loc1_],13 * this._scValVec[_loc1_]);
               this._xValVec[_loc1_] = this._xValVec[_loc1_] + this._xVec[_loc1_];
               this._yValVec[_loc1_] = this._yValVec[_loc1_] + this._yVec[_loc1_];
               this._scValVec[_loc1_] = this._scValVec[_loc1_] - this._scVec[_loc1_];
               _loc1_++;
            }
            this._crFr++;
            return true;
         }
         this.parent.removeChild(this);
         return false;
      }
   }
}
