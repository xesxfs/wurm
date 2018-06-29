module com {
	export module strangevillage {
		export module wudywurm {
			export module base {
				export class AutodestroyEffect extends egret.SwfMovie {

					public constructor()
					{
						super();
						this.touchChildren = false;
						this.touchEnabled = false;
						this["addFrameScript"](this.totalFrames - 1,flash.bind(this._end,this));
					}

					private _end()
					{
						this.stop();
						this.parent.removeChild(this);
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.base.AutodestroyEffect","egret.SwfMovie")
