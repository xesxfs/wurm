module com {
	export module strangevillage {
		export module wudywurm {
			export module base {
				export class ItemHiliterBase extends egret.Sprite {
					private _hilited:boolean = false;

					public constructor()
					{
						super();
						this.touchChildren = false;
						this.touchEnabled = false;
						this.visible = false;
					}

					public hilite(param1:boolean)
					{
						if(param1 && <any>!this._hilited)
						{
							this.visible = true;
							this._hilited = true;
						}
						else if(<any>!param1 && this._hilited)
						{
							this.visible = false;
							this._hilited = false;
						}
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.base.ItemHiliterBase","egret.Sprite")
