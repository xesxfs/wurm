 class Block extends BitmapDisplay {
	public static CHIP:flash.BitmapData;
	public static COLOR:Array<number>;
	public vecLayer:Array<number>;
	public drawPhase:number = 8;
	public gridX:number = 0;
	public gridY:number = 0;
	public inventoryNumber:number = 0;
	public removeFlag:boolean = false;

	public constructor()
	{
		super(44,44);
		this.vecLayer = new Array<number>();
	}

	public setLayer(...rest)
	{
		var _loc2_:number = flash.checkInt(0);
		var _loc3_:number = flash.checkInt(rest.length);
		_loc2_ = flash.checkInt(0);
		while(_loc2_ < _loc3_)
		{
			this.vecLayer.push(rest[_loc2_]);
			_loc2_++;
		}
	}

	public removeLayer():boolean
	{
		EffectManager.addEffect(new EffectScore("" + Status.addScore(),this.gridX,this.gridY));
		this.removeFlag = false;
		this.drawPhase = flash.checkInt(3);
		EffectManager.addEffect(new EffectLayerErase(this.gridX,this.gridY,Block.COLOR[this.vecLayer[0]]));
		this.vecLayer.shift();
		if(this.vecLayer.length != 0)
		{
			this.draw();
			return false;
		}
		this.destroy();
		return true;
	}

	public destroy()
	{
		BlockManager.removeBlock(this);
	}

	public draw()
	{
		var _loc1_:number = flash.checkInt(0);
		var _loc2_:number = flash.checkInt(this.vecLayer.length);
		if(this.drawPhase == 9)
		{
			return ;
		}
		this.drawPhase++;
		this.clear();
		_loc1_ = flash.checkInt(0);
		while(_loc1_ < _loc2_)
		{
			this.copy(Block.CHIP,((2 - _loc1_) * 5 + this.drawPhase) * 44,this.vecLayer[_loc1_] * 44,44,44);
			_loc1_++;
		}
	}

	public update()
	{
		this.draw();
	}

}

Block.CHIP = Resource.chip;
Block.COLOR = Array<number>([4282664191,4294919236,4282711876,4294967074,4294919423]);
flash.extendsClass("Block","BitmapDisplay")
