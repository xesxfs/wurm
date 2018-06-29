 class RankingSprite extends BitmapDisplay {
	private mode:number = 0;

	public constructor(param1:number)
	{
		super(240,285);
		param1 = flash.checkInt(param1);
		var _loc2_:number = flash.checkInt(0);
		var _loc3_:number = flash.checkInt(0);
		var _loc4_:Array<Ranking> = <any>null;
		var _loc5_:Array<Ranking> = <any>null;
		var _loc6_:BitmapString = <any>null;
		var _loc8_:Ranking = <any>null;
		var _loc9_:number = flash.checkUint(0);
		this.mode = flash.checkInt(param1);
		var _loc7_:string = "";
		switch(param1)
		{
		case 1 :
			_loc7_ = "Score";
			_loc4_ = DbManager.vecScoreRanking;
			_loc5_ = DbManager.vecScoreDayRanking;
			break;
		case 2 :
			_loc7_ = "Score30";
			_loc4_ = DbManager.vecScore30Ranking;
			_loc5_ = DbManager.vecScore30DayRanking;
			break;
		case 3 :
			_loc7_ = "Score1min";
			_loc4_ = DbManager.vecScore1minRanking;
			_loc5_ = DbManager.vecScore1minDayRanking;
			break;
		case 4 :
			_loc7_ = "Score1combo";
			_loc4_ = DbManager.vecScore1comboRanking;
			_loc5_ = DbManager.vecScore1comboDayRanking;
		}
		this.drawString("Ranking",75,15);
		this.drawString(_loc7_,140,15);
		this.drawString("All",68,55);
		this.drawString("Day",170,55);
		_loc3_ = flash.checkInt(_loc4_.length);
		_loc2_ = flash.checkInt(0);
		while(_loc2_ < _loc3_)
		{
			_loc8_ = _loc4_[_loc2_];
			if(_loc8_.name != null)
			{
				if(_loc2_ == 0)
				{
					_loc9_ = flash.checkUint(16766720);
				}
				else if(_loc2_ == 1)
				{
					_loc9_ = flash.checkUint(13414434);
				}
				else if(_loc2_ == 2)
				{
					_loc9_ = flash.checkUint(10851906);
				}
				else if(_loc2_ % 2 == 1)
				{
					_loc9_ = flash.checkUint(12303291);
				}
				else
				{
					_loc9_ = flash.checkUint(10066329);
				}
				_loc6_ = new BitmapString("" + _loc8_.score,_loc9_);
				this.drawString("" + (_loc2_ + 1),7,20 * _loc2_ + 75,_loc9_);
				this.copy(_loc6_,0,0,_loc6_.width,_loc6_.height,67 - _loc6_.width,20 * _loc2_ + 75);
				this.drawString(_loc8_.name,76,20 * _loc2_ + 75,_loc9_);
			}
			_loc2_++;
		}
		_loc3_ = flash.checkInt(_loc5_.length);
		_loc2_ = flash.checkInt(0);
		while(_loc2_ < _loc3_)
		{
			_loc8_ = _loc5_[_loc2_];
			if(_loc8_.name != null)
			{
				if(_loc2_ == 0)
				{
					_loc9_ = flash.checkUint(16766720);
				}
				else if(_loc2_ == 1)
				{
					_loc9_ = flash.checkUint(13414434);
				}
				else if(_loc2_ == 2)
				{
					_loc9_ = flash.checkUint(10851906);
				}
				else if(_loc2_ % 2 == 1)
				{
					_loc9_ = flash.checkUint(12303291);
				}
				else
				{
					_loc9_ = flash.checkUint(10066329);
				}
				_loc6_ = new BitmapString("" + _loc8_.score,_loc9_);
				this.copy(_loc6_,0,0,_loc6_.width,_loc6_.height,173 - _loc6_.width,20 * _loc2_ + 75);
				this.drawString(_loc8_.name,183,20 * _loc2_ + 75,_loc9_);
			}
			_loc2_++;
		}
	}

}

flash.extendsClass("RankingSprite","BitmapDisplay")
