 class FinishSprite extends egret.Sprite {
	private finishBmd:BitmapDisplay;
	private menuBmd:BitmapDisplay;
	private retryBmd:BitmapDisplay;
	private tweetBmd:BitmapDisplay;

	public constructor()
	{
		super();
		var _self__:any = this;
		this.touchChildren = false;
		this.touchEnabled = false;
		this.alpha = 0.9;
		this.finishBmd = new BitmapDisplay(90,44,4290493371);
		this.finishBmd.x = 46;
		this.finishBmd.y = -44;
		this.menuBmd = new BitmapDisplay(44,44,4290493371);
		this.menuBmd.x = 69;
		this.menuBmd.y = -128;
		this.retryBmd = new BitmapDisplay(44,44,4290493371);
		this.retryBmd.x = 115;
		this.retryBmd.y = -128;
		this.tweetBmd = new BitmapDisplay(44,44,4290493371);
		this.tweetBmd.x = 161;
		this.tweetBmd.y = -128;
		this.finishBmd.drawString("Finish",-1,-1,2236962);
		this.menuBmd.drawString("Menu",-1,-1,2236962);
		this.retryBmd.drawString("Retry",-1,-1,2236962);
		this.tweetBmd.drawString("Tweet",-1,-1,2236962);
		_self__.addChild(this.finishBmd);
		_self__.addChild(this.menuBmd);
		_self__.addChild(this.retryBmd);
		_self__.addChild(this.tweetBmd);
		this.x = 29;
		KTW.to(this.finishBmd,0.5,{"y":141,"x":46},net.kawa.tween.easing.Quint.easeOut);
		KTW.to(this.finishBmd,0.5,{"x":-23},net.kawa.tween.easing.Quint.easeOut,null,0.6);
		KTW.to(this.menuBmd,0.5,{"y":141},net.kawa.tween.easing.Quint.easeOut,null,0.6);
		KTW.to(this.retryBmd,0.5,{"y":141},net.kawa.tween.easing.Quint.easeOut,null,0.8);
		KTW.to(this.tweetBmd,0.5,{"y":141},net.kawa.tween.easing.Quint.easeOut,null,1);
	}

}

flash.extendsClass("FinishSprite","egret.Sprite")
