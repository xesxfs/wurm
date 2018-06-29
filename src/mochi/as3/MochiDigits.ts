module mochi {
	export module as3 {
		export class MochiDigits extends egret.HashObject {
			private Sibling:mochi.as3.MochiDigits;
			private Fragment:number = NaN;
			private Encoder:number = NaN;

			public constructor(param1:number = 0,param2:number = 0)
			{
				super();
				super();
				this.Encoder = 0;
				this.setValue(param1,param2);
			}

			public reencode()
			{
				var _loc1_:number = flash.checkUint(flash.tranint(2147483647 * Math.random()));
				this.Fragment = this.Fragment ^ (_loc1_ ^ this.Encoder);
				this.Encoder = _loc1_;
			}

			public set value(param1:number)
			{
				this.setValue(param1);
			}

			public toString():string
			{
				var _loc1_:string = String.fromCharCode(this.Fragment ^ this.Encoder);
				if(this.Sibling != null)
				{
					_loc1_ = _loc1_ + this.Sibling.toString();
				}
				return _loc1_;
			}

			public setValue(param1:number = 0,param2:number = 0)
			{
				var _loc3_:string = param1.toString();
				this.Fragment = _loc3_.charCodeAt(param2++) ^ this.Encoder;
				if(param2 < _loc3_.length)
				{
					this.Sibling = new mochi.as3.MochiDigits(param1,param2);
				}
				else
				{
					this.Sibling = null;
				}
				this.reencode();
			}

			public get value():number
			{
				return flash.trannumber(this.toString());
			}

			public addValue(param1:number)
			{
				this.value = this.value + param1;
			}

		}
	}
}

