 class HudManagerScore extends BitmapDisplay {

	public constructor()
	{
		super(120,20,855638016);
		this.y = 0;
		this.scaleX = 2;
		this.scaleY = 2;
	}

	public update()
	{
		this.clear();
		this.drawBorderString("" + Status.drawScore,-1,6);
	}

}

flash.extendsClass("HudManagerScore","BitmapDisplay")
