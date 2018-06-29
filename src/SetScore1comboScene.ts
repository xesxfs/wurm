 class SetScore1comboScene extends Scene {
	public static cnt:number = 0;
	public static isFinish:boolean;
	private field:Field;
	private hudManager:HudManagerScore;
	public undoBmd:BitmapDisplay;

	public constructor()
	{
		super();
		var _self__:any = this;
		var _loc1_:BitmapDisplay = <any>null;
		Status.mode = 4;
		_self__.addChild(this.field = new Field(new StageData("0,0,ScoreAttack,5,4,11111111111111111111")));
		BlockManager.addRandomInventoryBlock(0);
		BlockManager.addRandomInventoryBlock(1);
		BlockManager.addRandomInventoryBlock(2);
		BlockManager.addRandomInventoryBlock(3);
		BlockManager.addRandomInventoryBlock(4);
		_loc1_ = new BitmapDisplay(22,22);
		_loc1_.copy(Resource.chip,22,220,22,22,0,0);
		_loc1_.setScale(2);
		_loc1_.alpha = 0.8;
		_loc1_.x = 98;
		_loc1_.y = 290;
		_self__.addChild(_loc1_);
		_self__.addChild(BlockManager);
		_self__.addChild(this.hudManager = new HudManagerScore());
		_self__.addChild(EffectManager);
		InputSetScore.field = this.field;
		InputSetScore.fieldRect = new egret.Rectangle(this.field.x,this.field.y,this.field.width,this.field.height);
		InputManager.newInput(InputSetScore);
		_self__.addChild(BackMenuBitmap);
		BackMenuBitmap.menuRect = new egret.Rectangle(98,290,44,44);
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

SetScore1comboScene.isFinish = false;
flash.extendsClass("SetScore1comboScene","Scene")
