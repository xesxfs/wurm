package com.strangevillage.wudywurm.parts
{
   import com.greensock.TweenLite;
   import com.greensock.easing.Sine;
   import com.strangevillage.wudywurm.Config;
   import flash.display.Bitmap;
   import flash.display.BitmapData;
   import flash.display.PixelSnapping;
   import flash.display.Sprite;
   import flash.geom.Point;
   import flash.geom.Rectangle;
   
   public class TransitionsLr extends Sprite
   {
       
      
      private var _blackOver:Sprite;
      
      private var _bmsVec:Vector.<Bitmap>;
      
      private var _hitMc:Sprite;
      
      private const PARTS:int = 6;
      
      private const MAX_TRANS_TIME:Number = 0.8;
      
      private const TRANS_DIFF:Number = 0.06;
      
      private var _copyRect:Rectangle;
      
      private var _copyPt:Point;
      
      public function TransitionsLr()
      {
         this._bmsVec = new Vector.<Bitmap>();
         this._copyPt = new Point();
         super();
         this.mouseChildren = false;
         this.visible = false;
         this._setHitMc();
         this._setBlOver();
         this._setBms();
      }
      
      private function _setHitMc() : void
      {
         this._hitMc = new Sprite();
         this._hitMc.graphics.beginFill(0,1);
         this._hitMc.graphics.drawRect(0,0,Config.GAME_W,Config.GAME_H);
         this._hitMc.graphics.endFill();
         this.addChild(this._hitMc);
         this.hitArea = this._hitMc;
         this._hitMc.visible = false;
      }
      
      private function _setBlOver() : void
      {
         this._blackOver = new Sprite();
         this.addChild(this._blackOver);
         this._blackOver.graphics.beginFill(1,1051146);
         this._blackOver.graphics.drawRect(0,0,Config.GAME_W,Config.GAME_H);
         this._blackOver.graphics.endFill();
      }
      
      private function _setBms() : void
      {
         var _loc2_:BitmapData = null;
         var _loc3_:Bitmap = null;
         this._copyRect = new Rectangle(0,0,125,Config.GAME_H);
         var _loc1_:int = 0;
         while(_loc1_ < this.PARTS)
         {
            if(_loc1_ == 0)
            {
               _loc2_ = new BitmapData(125,Config.GAME_H,false,0);
            }
            else
            {
               _loc2_ = new BitmapData(127,Config.GAME_H,false,0);
            }
            _loc3_ = new Bitmap(_loc2_,PixelSnapping.NEVER,true);
            this.addChild(_loc3_);
            this._bmsVec.push(_loc3_);
            if(_loc1_ > 0)
            {
               _loc3_.x = 125 + 127 * (_loc1_ - 1);
               _loc3_.y = Math.random() * 300;
            }
            _loc1_++;
         }
      }
      
      public function playTrans(param1:BitmapData) : void
      {
         this.visible = true;
         var _loc2_:int = 0;
         while(_loc2_ < this.PARTS)
         {
            if(_loc2_ > 0)
            {
               this._copyRect.x = 125 + 127 * (_loc2_ - 1);
               this._copyRect.width = 127;
            }
            else
            {
               this._copyRect.x = 0;
               this._copyRect.width = 125;
            }
            this._bmsVec[_loc2_].bitmapData.copyPixels(param1,this._copyRect,this._copyPt);
            this._bmsVec[_loc2_].smoothing = true;
            this._bmsVec[_loc2_].y = 0;
            if(_loc2_ % 2 == 0)
            {
               TweenLite.to(this._bmsVec[_loc2_],this.MAX_TRANS_TIME - (this.PARTS - _loc2_) * this.TRANS_DIFF,{
                  "y":-Config.GAME_H,
                  "ease":Sine.easeIn
               });
            }
            else
            {
               TweenLite.to(this._bmsVec[_loc2_],this.MAX_TRANS_TIME - (this.PARTS - _loc2_) * this.TRANS_DIFF,{
                  "y":Config.GAME_H,
                  "ease":Sine.easeIn
               });
            }
            _loc2_++;
         }
         this._blackOver.alpha = 0.8;
         TweenLite.to(this._blackOver,this.MAX_TRANS_TIME,{
            "alpha":0,
            "onComplete":this._transAnimEnd
         });
      }
      
      private function _transAnimEnd() : void
      {
         this.visible = false;
      }
   }
}
