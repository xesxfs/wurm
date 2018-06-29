module mochi {
	export module as3 {
		export class MochiEventDispatcher extends egret.HashObject {
			private eventTable:any;

			public constructor()
			{
				super();
				super();
				this.eventTable = {};
			}

			public addEventListener(param1:string,param2:Function,thisObject:any)
			{
				this.removeEventListener(param1,param2,null);
				this.eventTable[param1].push(param2);
			}

			public removeEventListener(param1:string,param2:Function,thisObject:any)
			{
				var _loc3_:any = null;
				if(this.eventTable[param1] == undefined)
				{
					this.eventTable[param1] = [];
					return ;
				}
				for(_loc3_ in this.eventTable[param1])
				{
					if(this.eventTable[param1][_loc3_] == param2)
					{
						this.eventTable[param1].splice(flash.trannumber(_loc3_),1);
					}
				}
			}

			public triggerEvent(param1:string,param2:any)
			{
				var _loc3_:any = null;
				if(this.eventTable[param1] == undefined)
				{
					return ;
				}
				for(_loc3_ in this.eventTable[param1])
				{
					this.eventTable[param1][_loc3_](param2);
				}
			}

		}
	}
}

