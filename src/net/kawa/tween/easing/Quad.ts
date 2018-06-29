module net {
	export module kawa {
		export module tween {
			export module easing {
				export class Quad extends egret.HashObject {

					public constructor()
					{
						super();
						super();
					}

					public static easeIn(param1:number):number
					{
						return param1 * param1;
					}

					public static easeOut(param1:number):number
					{
						return 1 - net.kawa.tween.easing.Quad.easeIn(1 - param1);
					}

					public static easeInOut(param1:number):number
					{
						return param1 < 0.5?flash.trannumber(net.kawa.tween.easing.Quad.easeIn(param1 * 2) * 0.5):flash.trannumber(1 - net.kawa.tween.easing.Quad.easeIn(2 - param1 * 2) * 0.5);
					}

				}
			}
		}
	}
}

