 class HudManagerScore30 extends egret.Sprite {
	private scoreBmd:BitmapDisplay;
	private timeBmd:BitmapDisplay;
	private matrix:egret.Matrix;

	public constructor()
	{
		super();
		var _self__:any = this;
		this.y = 0;
		this.scoreBmd = new BitmapDisplay(120,20,855638016);
		this.scoreBmd.scaleX = 2;
		this.scoreBmd.scaleY = 2;
		_self__.addChild(this.scoreBmd);
		this.timeBmd = new BitmapDisplay(60,20);
		this.timeBmd.y = 40;
		this.timeBmd.x = 90;
		_self__.addChild(this.timeBmd);
	}

	public update()
	{
		this.scoreBmd.clear();
		this.timeBmd.clear();
		this.scoreBmd.drawBorderString("" + Status.drawScore,-1,6);
		this.timeBmd.drawBorderString("" + SetScore30Scene.cnt,-1,6);
	}

}

flash.extendsClass("HudManagerScore30","egret.Sprite")
