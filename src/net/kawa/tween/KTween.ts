module net {
	export module kawa {
		export module tween {
			export class KTween extends egret.HashObject {
				public static manager:net.kawa.tween.KTManager;
				public static jobClass:any;

				public constructor()
				{
					super();
					super();
				}

				public static from(param1:any,param2:number,param3:any,param4:Function = null,param5:Function = null):net.kawa.tween.KTJob
				{
					var _loc6_:net.kawa.tween.KTJob = <any>new net.kawa.tween.KTween.jobClass(param1);
					_loc6_.from = param3;
					_loc6_.duration = param2;
					if(param4 != null)
					{
						_loc6_.ease = param4;
					}
					_loc6_.onClose = param5;
					net.kawa.tween.KTween.queue(_loc6_);
					return _loc6_;
				}

				public static to(param1:any,param2:number,param3:any,param4:Function = null,param5:Function = null):net.kawa.tween.KTJob
				{
					var _loc6_:net.kawa.tween.KTJob = <any>new net.kawa.tween.KTween.jobClass(param1);
					_loc6_.to = param3;
					_loc6_.duration = param2;
					if(param4 != null)
					{
						_loc6_.ease = param4;
					}
					_loc6_.onClose = param5;
					net.kawa.tween.KTween.queue(_loc6_);
					return _loc6_;
				}

				public static fromTo(param1:any,param2:number,param3:any,param4:any,param5:Function = null,param6:Function = null):net.kawa.tween.KTJob
				{
					var _loc7_:net.kawa.tween.KTJob = <any>new net.kawa.tween.KTween.jobClass(param1);
					_loc7_.from = param3;
					_loc7_.to = param4;
					_loc7_.duration = param2;
					if(param5 != null)
					{
						_loc7_.ease = param5;
					}
					_loc7_.onClose = param6;
					net.kawa.tween.KTween.queue(_loc7_);
					return _loc7_;
				}

				public static queue(param1:net.kawa.tween.KTJob,param2:number = 0)
				{
					if(flash.As3is(param1.from,Function))
					{
						throw new flash.ArgumentError("Function is not allowed for the .from property.").message;
					}
					if(flash.As3is(param1.to,Function))
					{
						throw new flash.ArgumentError("Function is not allowed for the .to property.").message;
					}
					net.kawa.tween.KTween.manager.queue(param1,param2);
				}

				public static abort()
				{
					net.kawa.tween.KTween.manager.abort();
				}

				public static cancel()
				{
					net.kawa.tween.KTween.manager.cancel();
				}

				public static complete()
				{
					net.kawa.tween.KTween.manager.complete();
				}

				public static pause()
				{
					net.kawa.tween.KTween.manager.pause();
				}

				public static resume()
				{
					net.kawa.tween.KTween.manager.resume();
				}

			}
		}
	}
}

net.kawa.tween.KTween.manager = new net.kawa.tween.KTManager();
net.kawa.tween.KTween.jobClass = net.kawa.tween.KTJob;
