 class BitmapString extends BitmapDataEx {
	private vecSpace:Array<number> = Array<number>([2,4,2,0,0,0,0,4,3,3,0,0,4,0,4,0,0,0,0,0,0,0,0,0,0,0,4,4,1,0,1,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,2,0,3,0,0,0,0,0,2,0,0,4,3,1,4,0,0,0,0,0,1,0,0,0,0,0,0,0,0]);
	private chip:flash.BitmapData = Resource.stringChip;
	private cloneChip:flash.BitmapData;
	private string:string;

	public constructor(param1:string,param2:number = 16777215,param3:number = 1.0)
	{
		super(this.getWidth(),9);
		this.string = param1;
		var _loc4_:Array<number> = <any>Color.getRBG(param2);
		this.cloneChip = this.chip["clone"]();
		this.cloneChip["colorTransform"](this.cloneChip.rect,new flash.ColorTransform(0,0,0,param3,_loc4_[0],_loc4_[1],_loc4_[2]));
		this.drawString();
	}

	public getWidth():number
	{
		var _loc1_:number = flash.checkInt(0);
		var _loc2_:number = flash.checkInt(this.string.length);
		var _loc3_:number = flash.checkInt(_loc2_ * 6 - 1);
		_loc1_ = flash.checkInt(0);
		while(_loc1_ < _loc2_)
		{
			if(this.string.charCodeAt(_loc1_) - 32 >= 91)
			{
				_loc3_ = flash.checkInt(_loc3_ - 6);
			}
			else
			{
				_loc3_ = flash.checkInt(_loc3_ - this.vecSpace[this.string.charCodeAt(_loc1_) - 32]);
			}
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
				_loc5_ = flash.checkInt((_loc4_ - 33) % 20 * 5);
				_loc6_ = flash.checkInt(flash.tranint((_loc4_ - 33) / 20) * 9);
				this.copy(this.cloneChip,_loc5_,_loc6_,5,9,_loc3_,0);
				_loc3_ = flash.checkInt(_loc3_ + 6);
				_loc3_ = flash.checkInt(_loc3_ - this.vecSpace[_loc4_ - 32]);
			}
			_loc1_++;
		}
	}

}

flash.extendsClass("BitmapString","BitmapDataEx")
