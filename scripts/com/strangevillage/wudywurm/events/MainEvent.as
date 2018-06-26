package com.strangevillage.wudywurm.events
{
   import flash.events.Event;
   
   public class MainEvent extends Event
   {
      
      public static const MAIN_EVT:String = "mainEvt";
       
      
      public var eventName:String = "";
      
      public function MainEvent(param1:String = "", param2:Boolean = false, param3:Boolean = false)
      {
         super(MAIN_EVT,param2,param3);
         this.eventName = param1;
      }
   }
}
