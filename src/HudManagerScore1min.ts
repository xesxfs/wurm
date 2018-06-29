 class HudManagerScore1min extends egret.Sprite {
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
		var _loc2_:any = null;
		var _loc3_:number = <any>NaN;
		var _loc4_:number = flash.checkInt(0);
		var _loc5_:number = flash.checkInt(0);
		this.scoreBmd.clear();
		this.timeBmd.clear();
		this.scoreBmd.drawBorderString("" + Status.drawScore,-1,6);
		var _loc1_:number = flash.checkInt(SetScore1minScene.cnt);
		if(_loc1_ >= 0)
		{
			if(_loc1_ > 1800)
			{
				_loc1_ = flash.checkInt(1800);
			}
			_loc2_ = "";
			_loc3_ = (1800 - _loc1_) / 30;
			_loc4_ = flash.checkInt(_loc3_ % 60);
			_loc5_ = flash.checkInt(flash.tranint(_loc3_ * 100) % 100);
			if(_loc4_ < 10)
			{
				_loc2_ = _loc2_ + "0";
			}
			_loc2_ = _loc2_ + ("" + _loc4_ + ".");
			if(_loc5_ < 10)
			{
				_loc2_ = _loc2_ + "0";
			}
			_loc2_ = _loc2_ + ("" + _loc5_);
			this.timeBmd.drawBorderString(_loc2_,-1,6);
		}
		else
		{
			this.timeBmd.drawBorderString("60.00",-1,6);
		}
	}

}

flash.extendsClass("HudManagerScore1min","egret.Sprite")
