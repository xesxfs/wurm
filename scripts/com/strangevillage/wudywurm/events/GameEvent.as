package com.strangevillage.wudywurm.events
{
   import flash.events.Event;
   
   public class GameEvent extends Event
   {
      
      public static const GAME_EVT:String = "gameEvt";
       
      
      public var eventName:String = "";
      
      public function GameEvent(param1:String = "", param2:Boolean = false, param3:Boolean = false)
      {
         super(GAME_EVT,param2,param3);
         this.eventName = param1;
      }
   }
}
