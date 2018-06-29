 class BitmapDisplay extends flash.Bitmap {
	public fillColor:number = 0;

	public constructor(param1:number,param2:number,param3:number = 0)
	{
		super();
		this.bitmapData = new flash.BitmapData(param1,param2,true,param3);
		this.fillColor = flash.checkUint(param3);
	}

	public drawRect(param1:number,param2:number,param3:number,param4:number,param5:number)
	{
		param1 = flash.checkInt(param1);
		param2 = flash.checkInt(param2);
		param3 = flash.checkInt(param3);
		param4 = flash.checkInt(param4);
		param5 = flash.checkUint(param5);
		this.bitmapData["fillRect"](new egret.Rectangle(param1,param2,param3,param4),param5);
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
		if(param5 != 0)
		{
			this.bitmapData["fillRect"](new egret.Rectangle(param1,param2,param3,param4),param6);
		}
		if(param5 != -1)
		{
			this.bitmapData["fillRect"](new egret.Rectangle(param1 + param5,param2 + param5,param3 - param5 * 2,param4 - param5 * 2),param7);
		}
	}

	public copy(param1:flash.BitmapData,param2:number,param3:number,param4:number,param5:number,param6:number = 0,param7:number = 0,param8:boolean = true)
	{
		this.bitmapData.copyPixels(param1,new egret.Rectangle(param2,param3,param4,param5),new egret.Point(param6,param7),null,null,param8);
	}

	public drawString(param1:string,param2:number = -1,param3:number = -1,param4:number = 16777215,param5:number = 1.0)
	{
		var _loc6_:BitmapString = new BitmapString(param1,param4,param5);
		if(param2 == -1)
		{
			param2 = flash.checkInt((this.width / this.scaleX - _loc6_.width) / 2);
		}
		if(param3 == -1)
		{
			param3 = flash.checkInt((this.height / this.scaleY - _loc6_.height) / 2);
		}
		this.bitmapData.copyPixels(_loc6_,new egret.Rectangle(0,0,_loc6_.width,_loc6_.height),new egret.Point(param2,param3),null,null,true);
	}

	public drawString714(param1:string,param2:number = -1,param3:number = -1,param4:number = 16777215,param5:number = 1.0)
	{
		var _loc6_:BitmapString714 = new BitmapString714(param1,param4,param5);
		if(param2 == -1)
		{
			param2 = flash.checkInt((this.width - _loc6_.width) / 2);
		}
		if(param3 == -1)
		{
			param3 = flash.checkInt((this.height - _loc6_.height) / 2);
		}
		this.bitmapData.copyPixels(_loc6_,_loc6_.rect,new egret.Point(param2,param3),null,null,true);
	}

	public drawBorderString(param1:string,param2:number = -1,param3:number = -1,param4:number = 16777215,param5:number = 0,param6:number = 1.0,param7:number = 1.0)
	{
		var _loc8_:BitmapBorderString = new BitmapBorderString(param1,param4,param5,param6,param7);
		if(param2 == -1)
		{
			param2 = flash.checkInt((this.width / this.scaleX - _loc8_.width) / 2);
		}
		if(param3 == -1)
		{
			param3 = flash.checkInt((this.height / this.scaleY - _loc8_.height) / 2);
		}
		this.bitmapData.copyPixels(_loc8_,new egret.Rectangle(0,0,_loc8_.width,_loc8_.height),new egret.Point(param2,param3),null,null,true);
	}

	public clear()
	{
		this.bitmapData["fillRect"](this.bitmapData.rect,this.fillColor);
	}

	public setScale(param1:number)
	{
		this.scaleX = param1;
		this.scaleY = param1;
	}

}

flash.extendsClass("BitmapDisplay","flash.Bitmap")
