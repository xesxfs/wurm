 class Input extends egret.Sprite {

	public constructor()
	{
		super();
		var _self__:any = this;
		this.graphics.beginFill(0,0);
		this.graphics.drawRect(0,0,480,762);
		_self__.addEventListener(egret.TouchEvent.TOUCH_BEGIN,flash.bind(this.mouseDownEvent,this),null);
		_self__.addEventListener(egret.TouchEvent.TOUCH_END,flash.bind(this.mouseUpEvent,this),null);
		_self__.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,flash.bind(this.mouseOutEvent,this),null);
	}

	protected mouseDownEvent(param1:flash.MouseEvent)
	{
	}

	protected mouseUpEvent(param1:flash.MouseEvent)
	{
	}

	protected mouseOutEvent(param1:flash.MouseEvent)
	{
	}

}

flash.extendsClass("Input","egret.Sprite")
