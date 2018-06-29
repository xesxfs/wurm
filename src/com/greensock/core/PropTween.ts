module com {
	export module greensock {
		export module core {
			export class PropTween extends egret.HashObject {
				public priority:number = 0;
				public start:number = NaN;
				public prevNode:com.greensock.core.PropTween;
				public change:number = NaN;
				public target:any;
				public name:string;
				public property:string;
				public nextNode:com.greensock.core.PropTween;
				public isPlugin:boolean = false;

				public constructor(param1:any,param2:string,param3:number,param4:number,param5:string,param6:boolean,param7:com.greensock.core.PropTween = null,param8:number = 0)
				{
					super();
					super();
					this.target = param1;
					this.property = param2;
					this.start = param3;
					this.change = param4;
					this.name = param5;
					this.isPlugin = param6;
					if(param7)
					{
						param7.prevNode = this;
						this.nextNode = param7;
					}
					this.priority = flash.checkInt(param8);
				}

			}
		}
	}
}

