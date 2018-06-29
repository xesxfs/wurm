module mx {
	export module core {
		export class FlexBitmap extends flash.Bitmap {
			public static VERSION:string;

			public constructor(param1:flash.BitmapData = null,param2:string = "auto",param3:boolean = false)
			{
				super(param1,param2,param3);
				try 
				{
					this.name = mx.utils.NameUtil.createUniqueName(this);
					return ;
				}
				catch(e)
				{
					return ;
				}
			}

			public toString():string
			{
				return mx.utils.NameUtil.displayObjectToString(this);
			}

		}
	}
}

mx.core.FlexBitmap.VERSION = "4.6.0.23201";
flash.extendsClass("mx.core.FlexBitmap","flash.Bitmap")
