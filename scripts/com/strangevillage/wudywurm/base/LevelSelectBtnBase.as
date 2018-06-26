package com.strangevillage.wudywurm.base
{
   import com.greensock.TweenMax;
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.events.ButtonEvent;
   import com.strangevillage.wudywurm.helpers.SoundManager;
   import flash.display.MovieClip;
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.events.MouseEvent;
   import flash.text.TextField;
   
   public class LevelSelectBtnBase extends Sprite
   {
       
      
      public var fldLvlNum:TextField;
      
      private var _btFill:Sprite;
      
      public var bBg:MovieClip;
      
      private var _btnBg:Sprite;
      
      public var fldLvlNumShd:TextField;
      
      private var _lvlFldShd:TextField;
      
      private var _lvlFld:TextField;
      
      public var lvlID:int = 0;
      
      public function LevelSelectBtnBase()
      {
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
         this._btnBg = this.getChildByName("bBg") as Sprite;
         this._btFill = this._btnBg.getChildByName("btFill") as Sprite;
         this.mouseChildren = false;
         this.buttonMode = true;
         this.lvlID = int(this.name.split("_")[1]);
         this._lvlFld = this.getChildByName("fldLvlNum") as TextField;
         this._lvlFldShd = this.getChildByName("fldLvlNumShd") as TextField;
         this._lvlFld.text = this.lvlID.toString();
         this._lvlFldShd.text = this.lvlID.toString();
         this.addEventListener(MouseEvent.ROLL_OVER,this._over,false,0,true);
         this.addEventListener(MouseEvent.ROLL_OUT,this._out,false,0,true);
         this.addEventListener(MouseEvent.CLICK,this._click,false,0,true);
      }
      
      public function lockBtn(param1:Boolean) : void
      {
         if(param1)
         {
            this.mouseEnabled = false;
            this.alpha = 0.4;
         }
         else
         {
            this.mouseEnabled = true;
            this.alpha = 1;
         }
      }
      
      private function _over(param1:MouseEvent) : void
      {
         TweenMax.to(this._btFill,0.2,{"colorTransform":{"exposure":1.1}});
      }
      
      private function _click(param1:MouseEvent) : void
      {
         SoundManager.playClickSnd();
         Config.actuaLvlID = this.lvlID;
         stage.dispatchEvent(new ButtonEvent("LevelSelect"));
      }
      
      private function _out(param1:MouseEvent) : void
      {
         TweenMax.to(this._btFill,0.2,{"colorTransform":{"exposure":1}});
      }
   }
}
