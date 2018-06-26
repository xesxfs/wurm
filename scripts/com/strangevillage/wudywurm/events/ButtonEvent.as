package com.strangevillage.wudywurm.events
{
   import flash.events.Event;
   
   public class ButtonEvent extends Event
   {
      
      public static const BUTTON_EVT:String = "btnEvt";
       
      
      public var buttonName:String = "";
      
      public function ButtonEvent(param1:String = "", param2:Boolean = false, param3:Boolean = false)
      {
         super(BUTTON_EVT,param2,param3);
         this.buttonName = param1;
      }
   }
}
