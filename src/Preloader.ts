 class Preloader extends egret.SwfMovie {
	private main:egret.Sprite;
	private _loader:Loader_mc;

	public constructor()
	{
		super();
		var _self__:any = this;
		if(this.stage)
		{
			this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
			this.stage["align"] = flash.StageAlign.TOP;
		}
		_self__.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this.checkFrame,this),null);
		this["loaderInfo"].addEventListener(egret.ProgressEvent.PROGRESS,flash.bind(this.progress,this),null);
		this["loaderInfo"].addEventListener(egret.IOErrorEvent.IO_ERROR,flash.bind(this.ioError,this),null);
		this._setLoader();
	}

	private ioError(param1:flash.IOErrorEvent)
	{
	}

	private progress(param1:egret.ProgressEvent)
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

	private checkFrame(param1:egret.Event)
	{
		var _self__:any = this;
		if(this.currentFrame == this.totalFrames)
		{
			_self__.stop();
			this.loadingFinished();
		}
	}

	private loadingFinished()
	{
		var _self__:any = this;
		_self__.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.checkFrame,this),null);
		this["loaderInfo"].removeEventListener(egret.ProgressEvent.PROGRESS,flash.bind(this.progress,this),null);
		this["loaderInfo"].removeEventListener(egret.IOErrorEvent.IO_ERROR,flash.bind(this.ioError,this),null);
		this._removeLoader();
		this.startup();
	}

	private startup()
	{
		var _self__:any = this;
		var _loc1_:any = <any>flash.getDefinitionByName("Main");
		this.main = flash.As3As(new _loc1_(),egret.Sprite);
		_self__.addChildAt(this.main,0);
	}

	private _setLoader()
	{
		this._loader = new Loader_mc();
		this._loader.loaderFill.scaleX = 0;
		this.addChild(this._loader);
		this._loader.touchChildren = false;
		this._loader["buttonMode"] = true;
		this._loader.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this._preloadClick,this),null,false,0);
	}

	private _preloadClick(param1:flash.MouseEvent)
	{
		flash.navigateToURL(new egret.URLRequest("http://www.nowgamez.com/?utm_source=wudywurm&utm_medium=wudywurm&utm_campaign=wudywurm"),"_blank");
	}

	private _removeLoader()
	{
		this.removeChild(this._loader);
		this._loader = null;
	}

}

flash.extendsClass("Preloader","egret.SwfMovie")
