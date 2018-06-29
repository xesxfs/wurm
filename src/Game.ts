 class Game extends egret.Sprite {

	public constructor()
	{
		super();
		var _self__:any = this;
		_self__.addChild(SceneManager);
		SceneManager.newScene(new TitleScene());
		SceneManager.mouseChildren = false;
		SceneManager.mouseEnabled = false;
		_self__.addChild(LoadingManager);
		_self__.addChild(InputManager);
		_self__.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this.ent,this),null);
	}

	private ent(param1:egret.Event)
	{
		SceneManager.scene.update();
	}

}

flash.extendsClass("Game","egret.Sprite")
