module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export class MainMenu extends egret.Sprite {
					private _mainMc:MainMenuMc;

					public constructor()
					{
						super();
						this._mainMc = new MainMenuMc();
						this.addChild(this._mainMc);
					}

					public showMenu(param1:boolean)
					{
						if(param1)
						{
							this.visible = true;
						}
						else
						{
							this.visible = false;
						}
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.MainMenu","egret.Sprite")
