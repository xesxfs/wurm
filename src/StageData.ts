 class StageData extends egret.HashObject {
	public stageString:string;
	public packNo:number = 0;
	public stageNo:number = 0;
	public stageName:string;
	public star3:number = 0;
	public star2:number = 0;
	public fieldW:number = 0;
	public fieldH:number = 0;
	public fieldData:string;
	public vecBlockData:Array<string>;
	public backGroundColor:number = 0;

	public constructor(param1:string)
	{
		super();
		super();
		this.stageString = param1;
		this.convert();
	}

	private convert()
	{
		var _loc1_:Array<any> = <any>null;
		_loc1_ = this.stageString.split(",");
		this.star3 = flash.checkInt(flash.tranint(_loc1_[0]));
		this.stageNo = flash.checkInt(flash.tranint(_loc1_[1]));
		this.stageName = _loc1_[2];
		this.fieldW = flash.checkInt(flash.tranint(_loc1_[3]));
		this.fieldH = flash.checkInt(flash.tranint(_loc1_[4]));
		this.fieldData = _loc1_[5];
		this.vecBlockData = new Array<string>();
		var _loc2_:number = flash.checkInt(6);
		while(_loc2_ < _loc1_.length)
		{
			this.vecBlockData.push(_loc1_[_loc2_]);
			_loc2_++;
		}
	}

}

