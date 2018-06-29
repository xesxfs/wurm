 class EffectScore extends Effect {

	public constructor(param1:string,param2:number,param3:number)
	{
		super();
		param2 = flash.checkInt(param2);
		param3 = flash.checkInt(param3);
		var _loc4_:BitmapBorderString = <any>null;
		_loc4_ = new BitmapBorderString(param1,16777215);
		this.x = flash.checkInt(param2 * 45 + Field.fieldX + flash.tranint(45 - _loc4_.width) / 2);
		this.y = flash.checkInt(param3 * 45 + Field.fieldY + flash.tranint(45 - _loc4_.height) / 2);
		this.w = flash.checkInt(_loc4_.width);
		this.h = flash.checkInt(_loc4_.height);
		this.copy(_loc4_,0,0,_loc4_.width,_loc4_.height);
		this.endCnt = flash.checkInt(15);
	}

	public update():boolean
	{
		this.y = flash.checkInt(this.y - (15 - this.frameCnt) / 10);
		if(this.endCnt == this.frameCnt)
		{
			EffectManager.removeEffect(this.effectNumber);
			return true;
		}
		this.frameCnt++;
		return false;
	}

}

flash.extendsClass("EffectScore","Effect")
