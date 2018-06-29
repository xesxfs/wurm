 class OptionScene extends Scene {
	private soundBmd:BitmapDisplay;
	private changeBmd:BitmapDisplay;
	private resetBmd:BitmapDisplay;

	public constructor()
	{
		super();
		var _self__:any = this;
		var _loc1_:number = flash.checkUint(0);
		var _loc4_:BitmapDisplay = <any>null;
		_loc1_ = flash.checkUint(4292730333);
		var _loc3_:BitmapDisplay = new BitmapDisplay(120,10);
		_loc3_.y = 20;
		_loc3_.setScale(2);
		_loc3_.drawString("Option",-1,-1,12303291);
		_self__.addChild(_loc3_);
		_loc4_ = new BitmapDisplay(120,10);
		_loc4_.y = 60;
		_loc4_.x = 60;
		_loc4_.drawString("Your Name : " + SharedManager.userName,-1,-1,8947967);
		_self__.addChild(_loc4_);
		this.soundBmd = new BitmapDisplay(100,50,_loc1_);
		this.soundBmd.alpha = 0.8;
		this.soundBmd.drawBorderRect(2,2,96,46,2,0,_loc1_);
		this.soundBmd.x = 70;
		this.soundBmd.y = 155;
		this.soundBmd.drawString("Sound : ",23,-1,2236962);
		if(SharedManager.sound)
		{
			this.soundBmd.drawString("ON",63,-1,2236962);
		}
		else
		{
			this.soundBmd.drawString("OFF",63,-1,2236962);
		}
		_self__.addChild(this.soundBmd);
		this.changeBmd = new BitmapDisplay(100,50,_loc1_);
		this.changeBmd.alpha = 0.8;
		this.changeBmd.drawBorderRect(2,2,96,46,2,0,_loc1_);
		this.changeBmd.x = 70;
		this.changeBmd.y = 85;
		this.changeBmd.drawString("Change Name",-1,-1,2236962);
		_self__.addChild(this.changeBmd);
		this.resetBmd = new BitmapDisplay(100,50,_loc1_);
		this.resetBmd.alpha = 0.8;
		this.resetBmd.drawBorderRect(2,2,96,46,2,0,_loc1_);
		this.resetBmd.x = 70;
		this.resetBmd.y = 225;
		this.resetBmd.drawString("Reset Data",-1,-1,2236962);
		_self__.addChild(this.resetBmd);
		InputManager.newInput(InputOption);
		var _loc5_:BitmapDisplay = new BitmapDisplay(22,22);
		_loc5_.copy(Resource.chip,22,220,22,22,0,0);
		_loc5_.setScale(2);
		_loc5_.alpha = 0.8;
		_loc5_.x = 98;
		_loc5_.y = 290;
		_self__.addChild(_loc5_);
		_self__.addChild(DataResetBitmap);
	}

	public soundChange()
	{
		this.soundBmd.clear();
		this.soundBmd.drawBorderRect(2,2,96,46,2,0,4292730333);
		this.soundBmd.drawString("Sound : ",23,-1,2236962);
		if(SharedManager.sound)
		{
			this.soundBmd.drawString("ON",63,-1,2236962);
		}
		else
		{
			this.soundBmd.drawString("OFF",63,-1,2236962);
		}
	}

	public update()
	{
		DataResetBitmap.update();
	}

}

flash.extendsClass("OptionScene","Scene")
