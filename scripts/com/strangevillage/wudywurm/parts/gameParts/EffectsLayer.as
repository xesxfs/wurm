package com.strangevillage.wudywurm.parts.gameParts
{
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.helpers.GridHolder;
   import flash.display.Sprite;
   
   public class EffectsLayer extends Sprite
   {
       
      
      private const EFF_CLR:Vector.<uint> = Vector.<uint>([6262615,10019467,1596788,2461619,12624717,16308344,10701159,14317208,10590323,16775648,13074510,16298107,6067868,10151661,6639992,10389174,11040385,16238802]);
      
      private const EFF_LIMIT:int = 120;
      
      private var _effMainVec:Vector.<BurstEff>;
      
      private var _tempCt:int = 5;
      
      private var _tempClr:int = 0;
      
      private var _delEffVec:Vector.<BurstEff>;
      
      public function EffectsLayer()
      {
         this._effMainVec = new Vector.<BurstEff>();
         this._delEffVec = new Vector.<BurstEff>();
         super();
         this.mouseChildren = false;
         this.mouseEnabled = false;
         this.x = GridHolder.GRID_X;
         this.y = GridHolder.GRID_Y;
      }
      
      public function doorsShowEff() : void
      {
         var _loc1_:DoorsOpenEff = new DoorsOpenEff();
         _loc1_.x = Config.effX;
         _loc1_.y = Config.effY;
         _loc1_.rotation = Math.round(Math.random() * 360);
         this.addChild(_loc1_);
      }
      
      public function doComboEff() : void
      {
         var _loc2_:BurstEff = null;
         this._tempCt = Math.floor(this.EFF_LIMIT / (Config.effComboDataVec.length / 3));
         if(this._tempCt > 5)
         {
            this._tempCt = 5;
         }
         else if(this._tempCt < 1)
         {
            this._tempCt = 1;
         }
         var _loc1_:int = 0;
         while(_loc1_ < Config.effComboDataVec.length / 3)
         {
            this._tempClr = (Config.effComboDataVec[_loc1_ * 3 + 2] - 1) * 2;
            _loc2_ = new BurstEff(Config.effComboDataVec[_loc1_ * 3],Config.effComboDataVec[_loc1_ * 3 + 1],this._tempCt,this.EFF_CLR[this._tempClr],this.EFF_CLR[this._tempClr + 1]);
            this.addChild(_loc2_);
            this._effMainVec.push(_loc2_);
            _loc1_++;
         }
      }
      
      public function effLoop() : void
      {
         var _loc1_:BurstEff = null;
         var _loc2_:BurstEff = null;
         if(this._effMainVec.length != 0)
         {
            for each(_loc1_ in this._effMainVec)
            {
               if(!_loc1_.effUp())
               {
                  this._delEffVec.push(_loc1_);
               }
            }
            if(this._delEffVec.length != 0)
            {
               for each(_loc2_ in this._delEffVec)
               {
                  this._effMainVec.splice(this._effMainVec.indexOf(_loc2_),1);
               }
               this._delEffVec = Vector.<BurstEff>([]);
            }
         }
      }
   }
}
