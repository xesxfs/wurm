module comps_fla {
	export class HlpExAnim_50 extends egret.SwfMovie {

		public constructor()
		{
			super();
			this["addFrameScript"](20,flash.bind(this.frame21,this));
		}

		public frame21():any
		{
			var _self__:any = this;
			_self__.stop();
		}

	}
}

flash.extendsClass("comps_fla.HlpExAnim_50","egret.SwfMovie")
