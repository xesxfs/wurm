package
{
   import flash.display.MovieClip;
   import flash.display.Sprite;
   import flash.display.StageAlign;
   import flash.display.StageScaleMode;
   import flash.events.Event;
   import flash.events.IOErrorEvent;
   import flash.events.MouseEvent;
   import flash.events.ProgressEvent;
   import flash.net.URLRequest;
   import flash.net.navigateToURL;
   import flash.utils.getDefinitionByName;
   
   public class Preloader extends MovieClip
   {
       
      
      private var main:Sprite;
      
      private var _loader:Loader_mc;
      
      public function Preloader()
      {
         super();
         if(stage)
         {
            stage.scaleMode = StageScaleMode.SHOW_ALL;
            stage.align = StageAlign.TOP;
         }
         addEventListener(Event.ENTER_FRAME,this.checkFrame);
         loaderInfo.addEventListener(ProgressEvent.PROGRESS,this.progress);
         loaderInfo.addEventListener(IOErrorEvent.IO_ERROR,this.ioError);
         this._setLoader();
      }
      
      private function ioError(param1:IOErrorEvent) : void
      {
      }
      
      private function progress(param1:ProgressEvent) : void
      {
         this._loader.loaderFill.scaleX = param1.bytesLoaded / param1.bytesTotal;
         if(this._loader.loaderFill.scaleX < 0)
         {
            this._loader.loaderFill.scaleX = 0;
         }
         else if(this._loader.loaderFill.scaleX > 1)
         {
            this._loader.loaderFill.scaleX = 1;
         }
      }
      
      private function checkFrame(param1:Event) : void
      {
         if(currentFrame == totalFrames)
         {
            stop();
            this.loadingFinished();
         }
      }
      
      private function loadingFinished() : void
      {
         removeEventListener(Event.ENTER_FRAME,this.checkFrame);
         loaderInfo.removeEventListener(ProgressEvent.PROGRESS,this.progress);
         loaderInfo.removeEventListener(IOErrorEvent.IO_ERROR,this.ioError);
         this._removeLoader();
         this.startup();
      }
      
      private function startup() : void
      {
         var _loc1_:Class = getDefinitionByName("Main") as Class;
         this.main = new _loc1_() as Sprite;
         addChildAt(this.main,0);
      }
      
      private function _setLoader() : void
      {
         this._loader = new Loader_mc();
         this._loader.loaderFill.scaleX = 0;
         this.addChild(this._loader);
         this._loader.mouseChildren = false;
         this._loader.buttonMode = true;
         this._loader.addEventListener(MouseEvent.CLICK,this._preloadClick,false,0,true);
      }
      
      private function _preloadClick(param1:MouseEvent) : void
      {
         navigateToURL(new URLRequest("http://www.nowgamez.com/?utm_source=wudywurm&utm_medium=wudywurm&utm_campaign=wudywurm"),"_blank");
      }
      
      private function _removeLoader() : void
      {
         this.removeChild(this._loader);
         this._loader = null;
      }
   }
}
