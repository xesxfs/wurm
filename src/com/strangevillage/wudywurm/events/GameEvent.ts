module com {
	export module strangevillage {
		export module wudywurm {
			export module events {
				export class GameEvent extends egret.Event {
					public static GAME_EVT:string;
					public eventName:string = "";

					public constructor(param1:string = "",param2:boolean = false,param3:boolean = false)
					{
						super(com.strangevillage.wudywurm.events.GameEvent.GAME_EVT,param2,param3);
						this.eventName = param1;
					}

				}
			}
		}
	}
}

com.strangevillage.wudywurm.events.GameEvent.GAME_EVT = "gameEvt";
flash.extendsClass("com.strangevillage.wudywurm.events.GameEvent","egret.Event")
