package com.strangevillage.wudywurm.base
{
   import flash.display.MovieClip;
   
   public class AutodestroyEffect extends MovieClip
   {
       
      
      public function AutodestroyEffect()
      {
         super();
         this.mouseChildren = false;
         this.mouseEnabled = false;
         this.addFrameScript(this.totalFrames - 1,this._end);
      }
      
      private function _end() : void
      {
         this.stop();
         this.parent.removeChild(this);
      }
   }
}
