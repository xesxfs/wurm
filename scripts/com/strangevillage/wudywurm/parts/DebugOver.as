package com.strangevillage.wudywurm.parts
{
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.text.TextField;
   import net.hires.debug.Stats;
   
   public class DebugOver extends Sprite
   {
       
      
      private var _stats:Stats;
      
      private var _gridInfoVec:Vector.<TextField>;
      
      private var _checkRects:Sprite;
      
      private var _limArr:Array;
      
      public function DebugOver()
      {
         this._gridInfoVec = new Vector.<TextField>();
         this._limArr = [];
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
         this.mouseChildren = false;
         this.mouseEnabled = false;
         this._setStats();
         this.addEventListener(Event.ENTER_FRAME,this._loop,false,0,true);
      }
      
      private function _setStats() : void
      {
         this._stats = new Stats();
         this._stats.alpha = 0.3;
         this.addChild(this._stats);
      }
      
      private function _setGridInfo() : void
      {
         var _loc2_:int = 0;
         var _loc3_:TextField = null;
         var _loc1_:int = 0;
         while(_loc1_ < GridHolder.GRID_H)
         {
            _loc2_ = 0;
            while(_loc2_ < GridHolder.GRID_W)
            {
               _loc3_ = new TextField();
               _loc3_.x = _loc2_ * GridHolder.TILE_SIZE + GridHolder.GRID_X + 20;
               _loc3_.y = _loc1_ * GridHolder.TILE_SIZE + GridHolder.GRID_Y + 15;
               _loc3_.alpha = 0.4;
               this.addChild(_loc3_);
               this._gridInfoVec.push(_loc3_);
               _loc2_++;
            }
            _loc1_++;
         }
      }
      
      private function _setCheckRects() : void
      {
         this._checkRects = new Sprite();
         this.addChild(this._checkRects);
      }
      
      private function _loop(param1:Event) : void
      {
      }
   }
}
