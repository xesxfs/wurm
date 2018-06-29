 class SetPuzzleScene extends Scene {
	private field:Field;
	public undoBmd:BitmapDisplay;
	public hudManager:HudManagerScore;

	public constructor(param1:StageData)
	{
		super();
		var _self__:any = this;
		var _loc3_:BitmapDisplay = <any>null;
		if(param1 == null)
		{
			return ;
		}
		Status.mode = 0;
		_self__.addChild(this.field = new Field(param1));
		var _loc2_:BitmapDisplay = new BitmapDisplay(60,10);
		_loc2_.x = 5;
		_loc2_.y = 20;
		_loc2_.drawString("stage " + param1.stageNo);
		_self__.addChild(_loc2_);
		this.undoBmd = new BitmapDisplay(22,22);
		this.undoBmd.copy(Resource.chip,0,220,22,22,0,0);
		this.undoBmd.setScale(2);
		this.undoBmd.alpha = 0.2;
		this.undoBmd.x = 146;
		this.undoBmd.y = 290;
		_self__.addChild(this.undoBmd);
		_loc3_ = new BitmapDisplay(22,22);
		_loc3_.copy(Resource.chip,22,220,22,22,0,0);
		_loc3_.setScale(2);
		_loc3_.alpha = 0.8;
		_loc3_.x = 50;
		_loc3_.y = 290;
		_self__.addChild(_loc3_);
		_self__.addChild(BlockManager);
		_self__.addChild(this.hudManager = new HudManagerScore());
		_self__.addChild(EffectManager);
		if(BlockManager.vecInventoryBlock[1] == null)
		{
			BlockManager.inventoryPadding = 96;
		}
		else if(BlockManager.vecInventoryBlock[2] == null)
		{
			BlockManager.inventoryPadding = 72;
		}
		else if(BlockManager.vecInventoryBlock[3] == null)
		{
			BlockManager.inventoryPadding = 48;
		}
		else if(BlockManager.vecInventoryBlock[4] == null)
		{
			BlockManager.inventoryPadding = 24;
		}
		BlockManager.adjustInventoryPosition();
		InputSetPuzzle.inventoryPadding = BlockManager.inventoryPadding;
		InputSetPuzzle.field = this.field;
		InputSetPuzzle.fieldRect = new egret.Rectangle(this.field.x,this.field.y,this.field.width,this.field.height);
		InputManager.newInput(InputSetPuzzle);
		_self__.addChild(BackMenuBitmap);
		BackMenuBitmap.menuRect = new egret.Rectangle(50,290,44,44);
	}

	public update()
	{
		BlockManager.update();
		EffectManager.update();
		Status.update();
		BackMenuBitmap.update();
		this.hudManager.update();
	}

}

flash.extendsClass("SetPuzzleScene","Scene")
