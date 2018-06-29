 class CountDownSprite extends egret.Sprite {
	private finishBmd:BitmapDisplay;

	public constructor()
	{
		super();
		var _self__:any = this;
		this.touchChildren = false;
		this.touchEnabled = false;
		this.alpha = 0.9;
		this.finishBmd = new BitmapDisplay(90,44,4290493371);
		this.finishBmd.x = 46;
		this.finishBmd.y = 141;
		this.finishBmd.drawString("3",-1,-1,2236962);
		_self__.addChild(this.finishBmd);
		this.x = 29;
		var dy:number = flash.checkInt(141);
		KTW.to(this,1.5,{},null,function ()
		{
			_self__.finishBmd.clear();
			_self__.finishBmd.drawString("2",-1,-1,2236962);
		});
		KTW.to(this,1,{},null,function ()
		{
			_self__.finishBmd.clear();
			_self__.finishBmd.drawString("1",-1,-1,2236962);
		},1.5);
		KTW.to(this,1,{},null,function ()
		{
			_self__.finishBmd.clear();
			_self__.finishBmd.drawString("start",-1,-1,2236962);
		},2.5);
		KTW.to(this,0.2,{"y":-185},net.kawa.tween.easing.Quint.easeIn,null,3.5);
	}

}

flash.extendsClass("CountDownSprite","egret.Sprite")
