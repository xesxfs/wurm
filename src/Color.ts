 class Color extends egret.HashObject {

	public constructor()
	{
		super();
		super();
	}

	public static getRBG(param1:number):Array<number>
	{
		param1 = flash.checkUint(param1);
		param1 = flash.checkUint(param1 % 16777216);
		return Array<number>([param1 / 65536,param1 % 65536 / 256,param1 % 256]);
	}

}

