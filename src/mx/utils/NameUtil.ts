module mx {
	export module utils {
		export class NameUtil extends egret.HashObject {
			public static VERSION:string;
			public static counter:number;

			public constructor()
			{
				super();
				super();
			}

			public static createUniqueName(param1:any):string
			{
				if(<any>!param1)
				{
					return null;
				}
				var _loc2_:any = <any>egret.getQualifiedClassName(param1);
				var _loc3_:number = flash.checkInt(_loc2_.indexOf("::"));
				if(_loc3_ != -1)
				{
					_loc2_ = _loc2_.substr(_loc3_ + 2);
				}
				var _loc4_:number = flash.checkInt(_loc2_.charCodeAt(_loc2_.length - 1));
				if(_loc4_ >= 48 && _loc4_ <= 57)
				{
					_loc2_ = _loc2_ + "_";
				}
				return _loc2_ + mx.utils.NameUtil.counter++;
			}

			public static displayObjectToString(param1:egret.DisplayObject):string
			{
				var _loc2_:string = <any>null;
				var _loc3_:egret.DisplayObject = <any>null;
				var _loc4_:string = <any>null;
				var _loc5_:Array<any> = <any>null;
				try 
				{
					_loc3_ = param1;
					while(_loc3_ != null)
					{
						if(_loc3_.parent && _loc3_.stage && _loc3_.parent == _loc3_.stage)
						{
							break;
						}
						_loc4_ = "id" in _loc3_ && _loc3_["id"]?_loc3_["id"]:_loc3_.name;
						if(flash.As3is(_loc3_,null,"mx.core.IRepeaterClient"))
						{
							_loc5_ = (<mx.core.IRepeaterClient>(_loc3_)).instanceIndices;
							if(_loc5_)
							{
								_loc4_ = _loc4_ + ("[" + _loc5_.join("][") + "]");
							}
						}
						_loc2_ = _loc2_ == null?_loc4_:_loc4_ + "." + _loc2_;
						_loc3_ = _loc3_.parent;
					}
				}
				catch(e)
				{}
				return _loc2_;
			}

			public static getUnqualifiedClassName(param1:any):string
			{
				var _loc2_:string = <any>null;
				if(flash.As3is(param1,"string"))
				{
					_loc2_ = <string>param1;
				}
				else
				{
					_loc2_ = egret.getQualifiedClassName(param1);
				}
				var _loc3_:number = flash.checkInt(_loc2_.indexOf("::"));
				if(_loc3_ != -1)
				{
					_loc2_ = _loc2_.substr(_loc3_ + 2);
				}
				return _loc2_;
			}

		}
	}
}

mx.utils.NameUtil.VERSION = "4.6.0.23201";
mx.utils.NameUtil.counter = 0;
