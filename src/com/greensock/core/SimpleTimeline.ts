module com {
	export module greensock {
		export module core {
			export class SimpleTimeline extends com.greensock.core.TweenCore {
				public autoRemoveChildren:boolean = false;
				protected _lastChild:com.greensock.core.TweenCore;
				protected _firstChild:com.greensock.core.TweenCore;

				public constructor(param1:any = null)
				{
					super(0,param1);
				}

				public get rawTime():number
				{
					return this.cachedTotalTime;
				}

				public insert(param1:com.greensock.core.TweenCore,param2:any = 0):com.greensock.core.TweenCore
				{
					var _loc3_:com.greensock.core.SimpleTimeline = param1.timeline;
					if(<any>!param1.cachedOrphan && _loc3_)
					{
						_loc3_.remove(param1,true);
					}
					param1.timeline = this;
					param1.cachedStartTime = flash.trannumber(param2) + param1.delay;
					if(param1.gc)
					{
						param1.setEnabled(true,true);
					}
					if(param1.cachedPaused && _loc3_ != this)
					{
						param1.cachedPauseTime = param1.cachedStartTime + (this.rawTime - param1.cachedStartTime) / param1.cachedTimeScale;
					}
					if(this._lastChild)
					{
						this._lastChild.nextNode = param1;
					}
					else
					{
						this._firstChild = param1;
					}
					param1.prevNode = this._lastChild;
					this._lastChild = param1;
					param1.nextNode = null;
					param1.cachedOrphan = false;
					return param1;
				}

				public renderTime(param1:number,param2:boolean = false,param3:boolean = false)
				{
					var _loc5_:number = <any>NaN;
					var _loc6_:com.greensock.core.TweenCore = <any>null;
					var _loc4_:com.greensock.core.TweenCore = this._firstChild;
					this.cachedTotalTime = param1;
					this.cachedTime = param1;
					while(_loc4_)
					{
						_loc6_ = _loc4_.nextNode;
						if(_loc4_.active || param1 >= _loc4_.cachedStartTime && <any>!_loc4_.cachedPaused && <any>!_loc4_.gc)
						{
							if(<any>!_loc4_.cachedReversed)
							{
								_loc4_.renderTime((param1 - _loc4_.cachedStartTime) * _loc4_.cachedTimeScale,param2,false);
							}
							else
							{
								_loc5_ = <any>!<any>!_loc4_.cacheIsDirty?flash.trannumber(_loc4_.totalDuration):flash.trannumber(_loc4_.cachedTotalDuration);
								_loc4_.renderTime(_loc5_ - (param1 - _loc4_.cachedStartTime) * _loc4_.cachedTimeScale,param2,false);
							}
						}
						_loc4_ = _loc6_;
					}
				}

				public remove(param1:com.greensock.core.TweenCore,param2:boolean = false)
				{
					if(param1.cachedOrphan)
					{
						return ;
					}
					if(<any>!param2)
					{
						param1.setEnabled(false,true);
					}
					if(param1.nextNode)
					{
						param1.nextNode.prevNode = param1.prevNode;
					}
					else if(this._lastChild == param1)
					{
						this._lastChild = param1.prevNode;
					}
					if(param1.prevNode)
					{
						param1.prevNode.nextNode = param1.nextNode;
					}
					else if(this._firstChild == param1)
					{
						this._firstChild = param1.nextNode;
					}
					param1.cachedOrphan = true;
				}

			}
		}
	}
}

flash.extendsClass("com.greensock.core.SimpleTimeline","com.greensock.core.TweenCore")
