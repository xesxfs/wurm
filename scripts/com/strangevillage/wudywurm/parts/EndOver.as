package com.strangevillage.wudywurm.parts
{
   import com.greensock.TweenLite;
   import com.greensock.easing.Back;
   import com.greensock.easing.Sine;
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.events.MainEvent;
   import com.strangevillage.wudywurm.helpers.SoundManager;
   import flash.display.Sprite;
   import flash.events.MouseEvent;
   import flash.net.URLRequest;
   import flash.net.navigateToURL;
   import mochi.as3.MochiScores;
   
   public class EndOver extends Sprite
   {
       
      
      private var _mainMc:EndOverMc;
      
      private var _hideType:int = 0;
      
      private const HIDE_Y:Number = -460;
      
      public function EndOver()
      {
         super();
         this.visible = false;
         this._mainMc = new EndOverMc();
         this.addChild(this._mainMc);
         this._mainMc.endTitleMc.gotoAndStop(1);
         this._mainMc.sTh1.gotoAndStop(1);
         this._mainMc.sTh2.gotoAndStop(1);
         this._mainMc.sTh1.buttonMode = true;
         this._mainMc.sTh2.buttonMode = true;
         this._mainMc.EndAgainBtn.doEventDispatch = false;
         this._mainMc.EndMainBtn.doEventDispatch = false;
         this._mainMc.EndAgainBtn.addEventListener(MouseEvent.CLICK,this._againClick,false,0,true);
         this._mainMc.EndMainBtn.addEventListener(MouseEvent.CLICK,this._mainMenuClick,false,0,true);
         this._mainMc.sTh1.addEventListener(MouseEvent.CLICK,this._thumbClick,false,0,true);
         this._mainMc.sTh2.addEventListener(MouseEvent.CLICK,this._thumbClick,false,0,true);
         this._mainMc.EndHighBtn.addEventListener(MouseEvent.CLICK,this._highClick,false,0,true);
         this._mainMc.EndSubmitBtn.addEventListener(MouseEvent.CLICK,this._submitClick,false,0,true);
      }
      
      private function _againClick(param1:MouseEvent) : void
      {
         this._hideType = 1;
         this.hideOver();
      }
      
      private function _mainMenuClick(param1:MouseEvent) : void
      {
         this._hideType = 2;
         this.hideOver();
      }
      
      private function _thumbClick(param1:MouseEvent) : void
      {
         navigateToURL(new URLRequest(Config.REDIRECT_URL),Config.REDIRECT_TYPE);
      }
      
      private function _highClick(param1:MouseEvent) : void
      {
         if(Config.actuaLvlID == 0)
         {
            this._showFreeride();
         }
         else
         {
            this._showChamber();
         }
      }
      
      private function _showChamber() : void
      {
         var o:Object = {
            "n":[2,10,3,10,10,0,12,3,7,13,15,3,10,10,11,6],
            "f":function(param1:Number, param2:String):String
            {
               if(param2.length == 16)
               {
                  return param2;
               }
               return this.f(param1 + 1,param2 + this.n[param1].toString(16));
            }
         };
         var boardID:String = o.f(0,"");
         MochiScores.showLeaderboard({"boardID":boardID});
      }
      
      private function _showFreeride() : void
      {
         var o:Object = {
            "n":[0,0,12,7,12,2,12,7,10,6,1,1,15,2,1,13],
            "f":function(param1:Number, param2:String):String
            {
               if(param2.length == 16)
               {
                  return param2;
               }
               return this.f(param1 + 1,param2 + this.n[param1].toString(16));
            }
         };
         var boardID:String = o.f(0,"");
         MochiScores.showLeaderboard({"boardID":boardID});
      }
      
      private function _submitClick(param1:MouseEvent) : void
      {
         if(Config.actuaLvlID == 0)
         {
            this._submitFreeride();
         }
         else
         {
            this._submitChamber();
         }
      }
      
      private function _submitChamber() : void
      {
         var o:Object = {
            "n":[2,10,3,10,10,0,12,3,7,13,15,3,10,10,11,6],
            "f":function(param1:Number, param2:String):String
            {
               if(param2.length == 16)
               {
                  return param2;
               }
               return this.f(param1 + 1,param2 + this.n[param1].toString(16));
            }
         };
         var boardID:String = o.f(0,"");
         MochiScores.showLeaderboard({
            "boardID":boardID,
            "score":Config.totalPts.value
         });
      }
      
      private function _submitFreeride() : void
      {
         var o:Object = {
            "n":[0,0,12,7,12,2,12,7,10,6,1,1,15,2,1,13],
            "f":function(param1:Number, param2:String):String
            {
               if(param2.length == 16)
               {
                  return param2;
               }
               return this.f(param1 + 1,param2 + this.n[param1].toString(16));
            }
         };
         var boardID:String = o.f(0,"");
         MochiScores.showLeaderboard({
            "boardID":boardID,
            "score":Config.totalPts.value
         });
      }
      
      public function showOver(param1:int) : void
      {
         SoundManager.playGameEnd();
         this._mainMc.sTh1.gotoAndStop(1 + Math.round(Math.random() * 6));
         this._mainMc.sTh2.gotoAndStop(8 + Math.round(Math.random() * 7));
         this.enableOver(false);
         this._mainMc.endTitleMc.gotoAndStop(param1);
         this.visible = true;
         this.y = this.HIDE_Y;
         TweenLite.to(this,0.6,{
            "y":0,
            "ease":Back.easeOut,
            "onComplete":this._showEnd
         });
      }
      
      private function _showEnd() : void
      {
         Config.updateSO();
         this.enableOver(true);
      }
      
      public function hideOver() : void
      {
         this.enableOver(false);
         TweenLite.to(this,0.4,{
            "y":this.HIDE_Y,
            "ease":Sine.easeIn,
            "onComplete":this._hideEnd
         });
      }
      
      private function _hideEnd() : void
      {
         this.visible = false;
         if(this._hideType == 1)
         {
            stage.dispatchEvent(new MainEvent("PlayAgain"));
         }
         else if(this._hideType == 2)
         {
            stage.dispatchEvent(new MainEvent("EndToMain"));
         }
      }
      
      public function enableOver(param1:Boolean) : void
      {
         if(param1)
         {
            this.mouseChildren = true;
            this.mouseEnabled = true;
         }
         else
         {
            this.mouseChildren = false;
            this.mouseEnabled = false;
         }
      }
   }
}
