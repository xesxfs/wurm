 class SelectScene extends Scene {

	public constructor()
	{
		super();
		var _self__:any = this;
		var _loc1_:flash.Bitmap = <any>null;
		var _loc5_:number = flash.checkUint(0);
		var _loc9_:BitmapDisplay = <any>null;
		_loc1_ = new flash.Bitmap(Resource.logicalCell);
		_loc1_.x = 90;
		_loc1_.y = 20;
		_self__.addChild(_loc1_);
		var _loc2_:BitmapDisplay = new BitmapDisplay(52,52);
		_loc2_.copy(Resource.icon48,0,0,48,48,2,2);
		_loc2_.scaleX = 0.5;
		_loc2_.scaleY = 0.5;
		_loc2_.x = 126;
		_loc2_.y = 20;
		_self__.addChild(_loc2_);
		var _loc3_:BitmapDisplay = new BitmapDisplay(120,20);
		_loc3_.bitmapData = Resource.titleLogo;
		_loc3_.scaleX = 0.5;
		_loc3_.scaleY = 0.5;
		_loc3_.x = 45;
		_loc3_.y = 55;
		_self__.addChild(_loc3_);
		_loc5_ = flash.checkUint(2236962);
		var _loc6_:BitmapDisplay = new BitmapDisplay(100,50,4292730333);
		_loc6_.alpha = 0.8;
		_loc6_.drawBorderRect(2,2,96,46,4,0,4292730333);
		_loc6_.x = 15;
		_loc6_.y = 95;
		_loc6_.drawString("Puzzle",-1,15,_loc5_);
		_loc6_.drawString("" + SharedManager.getPuzzleClearNum() + " / 25",-1,30,1136127);
		_self__.addChild(_loc6_);
		var _loc7_:BitmapDisplay = new BitmapDisplay(100,50,4292730333);
		_loc7_.alpha = 0.8;
		_loc7_.drawBorderRect(2,2,96,46,4,0,4292730333);
		_loc7_.x = 125;
		_loc7_.y = 95;
		_loc7_.drawString("Score",-1,15,_loc5_);
		_loc7_.drawString("" + SharedManager.score,-1,30,1136127);
		_self__.addChild(_loc7_);
		var _loc8_:BitmapDisplay = new BitmapDisplay(100,50,4292730333);
		_loc8_.alpha = 0.8;
		_loc8_.drawBorderRect(2,2,96,46,4,0,4292730333);
		_loc8_.x = 15;
		_loc8_.y = 155;
		_loc8_.drawString("Score 30",-1,15,_loc5_);
		_loc8_.drawString("" + SharedManager.score30,-1,30,1136127);
		_self__.addChild(_loc8_);
		_loc9_ = new BitmapDisplay(100,50,4292730333);
		_loc9_.alpha = 0.8;
		_loc9_.drawBorderRect(2,2,96,46,4,0,4292730333);
		_loc9_.x = 125;
		_loc9_.y = 155;
		_loc9_.drawString("Score 1min",-1,15,_loc5_);
		_loc9_.drawString("" + SharedManager.score1min,-1,30,1136127);
		_self__.addChild(_loc9_);
		var _loc10_:BitmapDisplay = new BitmapDisplay(100,50,4292730333);
		_loc10_.alpha = 0.8;
		_loc10_.drawBorderRect(2,2,96,46,4,0,4292730333);
		_loc10_.x = 15;
		_loc10_.y = 275;
		_loc10_.drawString("Ranking",-1,-1,_loc5_);
		_self__.addChild(_loc10_);
		var _loc11_:BitmapDisplay = new BitmapDisplay(100,50,4292730333);
		_loc11_.alpha = 0.8;
		_loc11_.drawBorderRect(2,2,96,46,4,0,4292730333);
		_loc11_.x = 125;
		_loc11_.y = 275;
		_loc11_.drawString("Option",-1,-1,_loc5_);
		_self__.addChild(_loc11_);
		var _loc12_:BitmapDisplay = new BitmapDisplay(100,50,4292730333);
		_loc12_.alpha = 0.8;
		_loc12_.drawBorderRect(2,2,96,46,4,0,4292730333);
		_loc12_.x = 125;
		_loc12_.y = 215;
		_loc12_.drawString("Android",-1,-1,_loc5_);
		_self__.addChild(_loc12_);
		var _loc13_:BitmapDisplay = new BitmapDisplay(100,50,4292730333);
		_loc13_.alpha = 0.8;
		_loc13_.drawBorderRect(2,2,96,46,4,0,4292730333);
		_loc13_.x = 15;
		_loc13_.y = 215;
		_loc13_.drawString("Score 1combo",-1,15,_loc5_);
		_loc13_.drawString("" + SharedManager.score1combo,-1,30,1136127);
		_self__.addChild(_loc13_);
		InputManager.newInput(InputSelect);
	}

	public update()
	{
	}

}

flash.extendsClass("SelectScene","Scene")
