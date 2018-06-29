module com {
	export module greensock {
		export module easing {
			export class Sine extends egret.HashObject {
				public static _HALF_PI:number;

				public constructor()
				{
					super();
					super();
				}

				public static easeOut(param1:number,param2:number,param3:number,param4:number):number
				{
					return param3 * Math.sin(param1 / param4 * com.greensock.easing.Sine._HALF_PI) + param2;
				}

				public static easeIn(param1:number,param2:number,param3:number,param4:number):number
				{
					return -param3 * Math.cos(param1 / param4 * com.greensock.easing.Sine._HALF_PI) + param3 + param2;
				}

				public static easeInOut(param1:number,param2:number,param3:number,param4:number):number
				{
					return -param3 * 0.5 * (Math.cos(Math.PI * param1 / param4) - 1) + param2;
				}

			}
		}
	}
}

com.greensock.easing.Sine._HALF_PI = Math.PI * 0.5;
