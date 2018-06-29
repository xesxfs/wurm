module com {
	export module greensock {
		export module easing {
			export class Back extends egret.HashObject {

				public constructor()
				{
					super();
					super();
				}

				public static easeOut(param1:number,param2:number,param3:number,param4:number,param5:number = 1.70158):number
				{
					return param3 * ((param1 = param1 / param4 - 1) * param1 * ((param5 + 1) * param1 + param5) + 1) + param2;
				}

				public static easeIn(param1:number,param2:number,param3:number,param4:number,param5:number = 1.70158):number
				{
					return param3 * (param1 = param1 / param4) * param1 * ((param5 + 1) * param1 - param5) + param2;
				}

				public static easeInOut(param1:number,param2:number,param3:number,param4:number,param5:number = 1.70158):number
				{
					if((param1 = param1 / (param4 * 0.5)) < 1)
					{
						return param3 * 0.5 * (param1 * param1 * (((param5 = param5 * 1.525) + 1) * param1 - param5)) + param2;
					}
					return param3 / 2 * ((param1 = param1 - 2) * param1 * (((param5 = param5 * 1.525) + 1) * param1 + param5) + 2) + param2;
				}

			}
		}
	}
}

