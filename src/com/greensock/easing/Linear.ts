module com {
	export module greensock {
		export module easing {
			export class Linear extends egret.HashObject {
				public static power:number;

				public constructor()
				{
					super();
					super();
				}

				public static easeOut(param1:number,param2:number,param3:number,param4:number):number
				{
					return param3 * param1 / param4 + param2;
				}

				public static easeIn(param1:number,param2:number,param3:number,param4:number):number
				{
					return param3 * param1 / param4 + param2;
				}

				public static easeNone(param1:number,param2:number,param3:number,param4:number):number
				{
					return param3 * param1 / param4 + param2;
				}

				public static easeInOut(param1:number,param2:number,param3:number,param4:number):number
				{
					return param3 * param1 / param4 + param2;
				}

			}
		}
	}
}

com.greensock.easing.Linear.power = 0;
