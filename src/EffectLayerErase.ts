 class EffectLayerErase extends Effect {
	private color:number = 0;

	public constructor(param1:number,param2:number,param3:number)
	{
		super();
		param1 = flash.checkInt(param1);
		param2 = flash.checkInt(param2);
		param3 = flash.checkUint(param3);
		this.x = flash.checkInt(param1 * 45 + Field.fieldX);
		this.y = flash.checkInt(param2 * 45 + Field.fieldY);
		this.w = flash.checkInt(44);
		this.h = flash.checkInt(44);
		this.color = flash.checkUint(param3);
		this.endCnt = flash.checkInt(25);
		this.matrix = new egret.Matrix();
		this.doDraw = true;
		this.drawBorderRect(0,0,44,44,3,param3,0);
	}

	public update():boolean
	{
		var _loc1_:number = 1 + this.frameCnt * 0.5;
		var _loc2_:number = 1 - _loc1_;
		this.matrix.createBox(_loc1_,_loc1_,0,this.x + _loc2_ * this.width / 2,this.y + _loc2_ * this.height / 2);
		this.drawBorderRect(0,0,44,44,3,this.color % 16777216 + (250 - this.frameCnt * 10) * 16777216,0);
		if(this.endCnt == this.frameCnt)
		{
			EffectManager.removeEffect(this.effectNumber);
			return true;
		}
		this.frameCnt++;
		return false;
	}

}

flash.extendsClass("EffectLayerErase","Effect")
