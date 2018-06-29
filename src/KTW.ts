 class KTW extends egret.HashObject {

	public constructor()
	{
		super();
		super();
	}

	public static to(param1:any,param2:number,param3:any,param4:Function = null,param5:Function = null,param6:number = 0,param7:boolean = false,param8:boolean = false,param9:boolean = false):net.kawa.tween.KTJob
	{
		var _loc10_:net.kawa.tween.KTJob = new net.kawa.tween.KTJob(param1);
		_loc10_.duration = param2;
		_loc10_.to = param3;
		_loc10_.ease = param4;
		_loc10_.onComplete = param5;
		_loc10_.repeat = param8;
		_loc10_.yoyo = param9;
		_loc10_.round = param7;
		net.kawa.tween.KTween.queue(_loc10_,param6);
		return _loc10_;
	}

}

