package com.strangevillage.wudywurm.parts.gameParts
{
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.events.GameEvent;
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import com.strangevillage.wudywurm.helpers.SoundManager;
   import flash.display.Sprite;
   
   public class GrabBlocks extends Sprite
   {
       
      
      private var _grabBlTempIDs:Vector.<int>;
      
      private var _tempID:int = 0;
      
      private var _tempPos:int = 0;
      
      public function GrabBlocks()
      {
         var _loc2_:GrabBlock = null;
         this._grabBlTempIDs = new Vector.<int>();
         super();
         this.x = GridHolder.GRID_X;
         this.y = GridHolder.GRID_Y;
         var _loc1_:int = 0;
         while(_loc1_ < Config.actuaLvl.InitBlocks.children().length())
         {
            this._grabBlTempIDs.push(_loc1_);
            _loc1_++;
         }
         while(this._grabBlTempIDs.length > 0)
         {
            this._tempID = this._grabBlTempIDs.splice(Math.round(Math.random() * (this._grabBlTempIDs.length - 1)),1)[0];
            _loc2_ = new GrabBlock(int(Config.actuaLvl.InitBlocks.tile[this._tempID].@x),int(Config.actuaLvl.InitBlocks.tile[this._tempID].@y),false);
            this.addChild(_loc2_);
         }
      }
      
      public function addRandomBlock() : void
      {
         var _loc1_:GrabBlock = null;
         GridHolder.getEmptyPos();
         if(GridHolder.emptyPosVec.length != 0)
         {
            SoundManager.playBlockCreate();
            this._tempPos = GridHolder.emptyPosVec[Math.round(Math.random() * (GridHolder.emptyPosVec.length - 1))];
            _loc1_ = new GrabBlock(this._tempPos % GridHolder.GRID_W,Math.floor(this._tempPos / GridHolder.GRID_W),true);
            this.addChild(_loc1_);
         }
      }
      
      public function addDoors() : void
      {
         GridHolder.getEmptyPos();
         this._tempPos = GridHolder.emptyPosVec[Math.round(Math.random() * (GridHolder.emptyPosVec.length - 1))];
         var _loc1_:DoorsBlock = new DoorsBlock(this._tempPos % GridHolder.GRID_W,Math.floor(this._tempPos / GridHolder.GRID_W));
         this.addChild(_loc1_);
         Config.effX = _loc1_.x + 24;
         Config.effY = _loc1_.y + 24;
         stage.dispatchEvent(new GameEvent("CreateDoorsEff"));
      }
   }
}
