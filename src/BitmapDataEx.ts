 class BitmapDataEx extends flash.BitmapData {
	public fillColor:number = 0;
	public x:number = 0;
	public y:number = 0;

	public constructor(param1:number,param2:number,param3:number = 0)
	{
		super(param1,param2,true,param3);
		this.fillColor = flash.checkUint(param3);
	}

	public drawRect(param1:number,param2:number,param3:number,param4:number,param5:number)
	{
		param1 = flash.checkInt(param1);
		param2 = flash.checkInt(param2);
		param3 = flash.checkInt(param3);
		param4 = flash.checkInt(param4);
		param5 = flash.checkUint(param5);
		this["fillRect"](new egret.Rectangle(param1,param2,param3,param4),param5);
	}

	public drawBorderRect(param1:number,param2:number,param3:number,param4:number,param5:number,param6:number,param7:number)
	{
		param1 = flash.checkInt(param1);
		param2 = flash.checkInt(param2);
		param3 = flash.checkInt(param3);
		param4 = flash.checkInt(param4);
		param5 = flash.checkInt(param5);
		param6 = flash.checkUint(param6);
		param7 = flash.checkUint(param7);
		this["fillRect"](new egret.Rectangle(param1,param2,param3,param4),param6);
		this["fillRect"](new egret.Rectangle(param1 + param5,param2 + param5,param3 - param5 * 2,param4 - param5 * 2),param7);
	}

	public copy(param1:flash.BitmapData,param2:number,param3:number,param4:number,param5:number,param6:number = 0,param7:number = 0,param8:boolean = true)
	{
		var _self__:any = this;
		_self__.copyPixels(param1,new egret.Rectangle(param2,param3,param4,param5),new egret.Point(param6,param7),null,null,param8);
	}

	public clear()
	{
		this["fillRect"](this.rect,this.fillColor);
	}

}

flash.extendsClass("BitmapDataEx","flash.BitmapData")
