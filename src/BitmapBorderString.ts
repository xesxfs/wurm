 class BitmapBorderString extends BitmapDataEx {
	private vecSpace:Array<number> = Array<number>([2,4,2,0,0,0,0,4,3,3,0,0,4,0,4,0,0,0,0,0,0,0,0,0,0,0,4,4,1,0,1,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,2,0,3,0,0,0,0,0,2,0,0,4,3,1,4,0,0,0,0,0,1,0,0,0,0,0,0,0,0]);
	private chip:flash.BitmapData = Resource.borderStringChip;
	private cloneChip:flash.BitmapData;
	private string:string;

	public constructor(param1:string,param2:number = 16777215,param3:number = 0,param4:number = 1.0,param5:number = 1.0)
	{
		super(this.getWidth(),11);
		this.string = param1;
		var _loc6_:Array<number> = <any>Color.getRBG(param2);
		var _loc7_:Array<number> = <any>Color.getRBG(param3);
		this.cloneChip = this.chip["clone"]();
		this.cloneChip["colorTransform"](new egret.Rectangle(0,0,140,55),new flash.ColorTransform(0,0,0,param4,_loc6_[0],_loc6_[1],_loc6_[2]));
		this.cloneChip["colorTransform"](new egret.Rectangle(0,55,140,55),new flash.ColorTransform(0,0,0,param5,_loc7_[0],_loc7_[1],_loc7_[2]));
		this.drawString();
	}

	public getWidth():number
	{
		var _loc1_:number = flash.checkInt(0);
		var _loc2_:number = flash.checkInt(this.string.length);
		var _loc3_:number = flash.checkInt(_loc2_ * 8 - 1);
		_loc1_ = flash.checkInt(0);
		while(_loc1_ < _loc2_)
		{
			_loc3_ = flash.checkInt(_loc3_ - this.vecSpace[this.string.charCodeAt(_loc1_) - 32]);
			_loc1_++;
		}
		return _loc3_;
	}

	public drawString()
	{
		var _loc1_:number = flash.checkInt(0);
		var _loc3_:number = flash.checkInt(0);
		var _loc4_:number = flash.checkInt(0);
		var _loc5_:number = flash.checkInt(0);
		var _loc6_:number = flash.checkInt(0);
		var _loc2_:number = flash.checkInt(this.string.length);
		_loc1_ = flash.checkInt(0);
		while(_loc1_ < _loc2_)
		{
			_loc4_ = flash.checkInt(this.string.charCodeAt(_loc1_));
			if(_loc4_ <= 32 || 122 < _loc4_)
			{
				_loc3_ = flash.checkInt(_loc3_ + 4);
			}
			else
			{
				_loc5_ = flash.checkInt((_loc4_ - 33) % 20 * 7);
				_loc6_ = flash.checkInt(flash.tranint((_loc4_ - 33) / 20) * 11);
				this.copy(this.cloneChip,_loc5_,_loc6_,7,11,_loc3_,0);
				this.copy(this.cloneChip,_loc5_,_loc6_ + 55,7,11,_loc3_,0);
				_loc3_ = flash.checkInt(_loc3_ + 8);
				_loc3_ = flash.checkInt(_loc3_ - this.vecSpace[_loc4_ - 32]);
			}
			_loc1_++;
		}
	}

}

flash.extendsClass("BitmapBorderString","BitmapDataEx")
