 class NameScene extends Scene {
	public tf:flash.TextField;
	private bmdTf:BitmapDisplay;

	public constructor()
	{
		super();
		var _self__:any = this;
		var _loc3_:flash.Bitmap = new flash.Bitmap(new BitmapString("Enter Your Name"));
		_loc3_.y = 60;
		_loc3_.x = 120 - _loc3_.width / 2;
		_self__.addChild(_loc3_);
		this.bmdTf = new BitmapDisplay(70,15);
		this.bmdTf.drawBorderRect(0,0,70,15,1,4290493371,0);
		this.bmdTf.y = 85;
		this.bmdTf.x = 85;
		_self__.addChild(this.bmdTf);
		var _loc4_:flash.Bitmap = new flash.Bitmap(new BitmapString("OK"));
		_loc4_.y = 130;
		_loc4_.x = 120 - _loc4_.width / 2;
		_self__.addChild(_loc4_);
		this.tf = new flash.TextField();
		this.tf.type = "input";
		this.tf.visible = false;
		this.tf.maxChars = flash.checkInt(8);
		this.tf.addEventListener(flash.KeyboardEvent.KEY_DOWN,flash.bind(this.keyDownEvent,this),null);
		this.tf.restrict = "a-zA-Z0-9";
		_self__.addChild(this.tf);
		InputName.nameScene = this;
		InputManager.newInput(InputName);
	}

	private keyDownEvent(param1:flash.KeyboardEvent)
	{
		if(param1.keyCode == 13)
		{
			SharedManager.saveUserName(this.tf.text);
			SceneManager.newScene(new SelectScene());
		}
	}

	public update()
	{
		if(this.stage["focus"] != this.tf)
		{
			this.stage["focus"] = this.tf;
		}
		this.bmdTf.clear();
		this.bmdTf.drawBorderRect(0,0,70,15,1,4290493371,0);
		if(this.tf.text != "")
		{
			this.bmdTf.drawString(this.tf.text);
		}
	}

}

flash.extendsClass("NameScene","Scene")
