 class Ranking extends egret.HashObject {
	public name:string;
	public score:number = 0;

	public constructor(param1:number,param2:string)
	{
		super();
		param1 = flash.checkInt(param1);
		super();
		this.score = flash.checkInt(param1);
		this.name = param2;
	}

}

