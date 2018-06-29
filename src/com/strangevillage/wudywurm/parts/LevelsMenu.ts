module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export class LevelsMenu extends egret.Sprite {
					private _mainMc:LevelsMenuMc;
					private _tempBtn:com.strangevillage.wudywurm.base.LevelSelectBtnBase;

					public constructor()
					{
						super();
						this.visible = false;
						this._mainMc = new LevelsMenuMc();
						this.addChild(this._mainMc);
					}

					public showMenu(param1:boolean)
					{
						var _loc2_:number = flash.checkInt(0);
						if(param1)
						{
							_loc2_ = flash.checkInt(1);
							while(_loc2_ <= com.strangevillage.wudywurm.Config.lvlsTotal)
							{
								this._tempBtn = flash.As3As(this._mainMc.getChildByName("LvlBtn_" + this.toString()),com.strangevillage.wudywurm.base.LevelSelectBtnBase);
								if(_loc2_ <= com.strangevillage.wudywurm.Config.soArr[5])
								{
									this._tempBtn.lockBtn(false);
								}
								else
								{
									this._tempBtn.lockBtn(true);
								}
								_loc2_++;
							}
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

flash.extendsClass("com.strangevillage.wudywurm.parts.LevelsMenu","egret.Sprite")
