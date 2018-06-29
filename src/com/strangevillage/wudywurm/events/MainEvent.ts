module com {
	export module strangevillage {
		export module wudywurm {
			export module events {
				export class MainEvent extends egret.Event {
					public static MAIN_EVT:string;
					public eventName:string = "";

					public constructor(param1:string = "",param2:boolean = false,param3:boolean = false)
					{
						super(com.strangevillage.wudywurm.events.MainEvent.MAIN_EVT,param2,param3);
						this.eventName = param1;
					}

				}
			}
		}
	}
}

com.strangevillage.wudywurm.events.MainEvent.MAIN_EVT = "mainEvt";
flash.extendsClass("com.strangevillage.wudywurm.events.MainEvent","egret.Event")
