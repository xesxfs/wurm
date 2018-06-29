 class Grid extends egret.HashObject {
	public type:number = 0;
	public x:number = 0;
	public y:number = 0;
	public gridX:number = 0;
	public gridY:number = 0;
	public block:Block;

	public constructor(param1:number,param2:number,param3:number,param4:number)
	{
		super();
		param1 = flash.checkInt(param1);
		param2 = flash.checkInt(param2);
		param3 = flash.checkInt(param3);
		param4 = flash.checkInt(param4);
		super();
		this.gridX = flash.checkInt(param1);
		this.gridY = flash.checkInt(param2);
		this.x = flash.checkInt(param3);
		this.y = flash.checkInt(param4);
	}

	public setBlock(param1:Block)
	{
		this.block = param1;
		param1.gridX = flash.checkInt(this.gridX);
		param1.gridY = flash.checkInt(this.gridY);
		param1.x = this.x;
		param1.y = this.y;
	}

}

