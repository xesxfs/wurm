module com {
	export module strangevillage {
		export module wudywurm {
			export module events {
				export class ButtonEvent extends egret.Event {
					public static BUTTON_EVT:string;
					public buttonName:string = "";

					public constructor(param1:string = "",param2:boolean = false,param3:boolean = false)
					{
						super(com.strangevillage.wudywurm.events.ButtonEvent.BUTTON_EVT,param2,param3);
						this.buttonName = param1;
					}

				}
			}
		}
	}
}

com.strangevillage.wudywurm.events.ButtonEvent.BUTTON_EVT = "btnEvt";
flash.extendsClass("com.strangevillage.wudywurm.events.ButtonEvent","egret.Event")
