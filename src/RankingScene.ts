 class RankingScene extends Scene {
	private index:number = 1;
	private rankingSprite:RankingSprite;
	private inited:boolean = false;

	public constructor()
	{
		super();
		var _self__:any = this;
		var _loc2_:BitmapDisplay = <any>null;
		var _loc3_:BitmapDisplay = <any>null;
		var _loc4_:BitmapDisplay = <any>null;
		DbManager.getRanking();
		InputManager.newInput(InputRanking);
		_loc2_ = new BitmapDisplay(22,22);
		_loc2_.copy(Resource.chip,22,220,22,22,0,0);
		_loc2_.setScale(2);
		_loc2_.alpha = 0.8;
		_loc2_.x = 98;
		_loc2_.y = 290;
		_self__.addChild(_loc2_);
		_loc3_ = new BitmapDisplay(22,22);
		_loc3_.copy(Resource.chip,66,220,22,22,0,0);
		_loc3_.setScale(2);
		_loc3_.alpha = 0.8;
		_loc3_.x = 168;
		_loc3_.y = 290;
		_self__.addChild(_loc3_);
		_loc4_ = new BitmapDisplay(22,22);
		_loc4_.copy(Resource.chip,44,220,22,22,0,0);
		_loc4_.setScale(2);
		_loc4_.alpha = 0.8;
		_loc4_.x = 28;
		_loc4_.y = 290;
		_self__.addChild(_loc4_);
	}

	public update()
	{
		var _self__:any = this;
		var _loc1_:number = flash.checkInt(0);
		if(<any>!LoadingManager.isLoading && <any>!this.inited)
		{
			this.inited = true;
			_loc1_ = flash.checkInt(DbManager.vecScoreRanking.length);
			_self__.addChild(this.rankingSprite = new RankingSprite(this.index));
		}
	}

	public nextSprite(param1:number)
	{
		param1 = flash.checkInt(param1);
		var _self__:any = this;
		this.index = flash.checkInt(this.index + param1);
		if(this.index > 4)
		{
			this.index = flash.checkInt(this.index - 4);
		}
		else if(this.index < 1)
		{
			this.index = flash.checkInt(this.index + 4);
		}
		_self__.removeChild(this.rankingSprite);
		_self__.addChild(this.rankingSprite = new RankingSprite(this.index));
	}

}

flash.extendsClass("RankingScene","Scene")
