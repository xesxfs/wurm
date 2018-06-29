 class TitleScene extends Scene {
	private bitmap:flash.Bitmap;
	private bitmap2:flash.Bitmap;

	public constructor()
	{
		super();
		var _self__:any = this;
		this.bitmap = new flash.Bitmap(Resource.logicalCell);
		this.bitmap.scaleX = 4;
		this.bitmap.scaleY = 4;
		this.bitmap.x = 120 - this.bitmap.width / 2;
		this.bitmap.y = 162 - this.bitmap.height / 2;
		_self__.addChild(this.bitmap);
		this.bitmap.alpha = 0;
		this.bitmap2 = new flash.Bitmap(new BitmapString("Logical Cell",16777215));
		this.bitmap2.scaleX = 2;
		this.bitmap2.scaleY = 2;
		this.bitmap2.x = 120 - this.bitmap2.width / 2;
		this.bitmap2.y = 222;
		_self__.addChild(this.bitmap2);
		this.bitmap2.alpha = 0;
		KTW.to(this.bitmap,3,{"alpha":0.5},net.kawa.tween.easing.Linear.easeIn);
		KTW.to(this.bitmap,1,{"alpha":0},net.kawa.tween.easing.Linear.easeIn,flash.bind(this.next2,this),3);
		KTW.to(this.bitmap2,3,{"alpha":0.5},net.kawa.tween.easing.Linear.easeIn);
		KTW.to(this.bitmap2,1,{"alpha":0},net.kawa.tween.easing.Linear.easeIn,null,3);
	}

	private next2()
	{
		if(SharedManager.userName != "")
		{
			SceneManager.newScene(new SelectScene());
		}
		else
		{
			SceneManager.newScene(new NameScene());
		}
	}

	public update()
	{
	}

}

flash.extendsClass("TitleScene","Scene")
