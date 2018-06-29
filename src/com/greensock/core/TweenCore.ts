module com {
	export module greensock {
		export module core {
			export class TweenCore extends egret.HashObject {
				public static version:number;
				public static _classInitted:boolean = false;
				public initted:boolean = false;
				protected _hasUpdate:boolean = false;
				public active:boolean = false;
				protected _delay:number = NaN;
				public cachedReversed:boolean = false;
				public nextNode:com.greensock.core.TweenCore;
				public cachedTime:number = NaN;
				protected _rawPrevTime:number = -1;
				public vars:any;
				public cachedTotalTime:number = NaN;
				public data:any;
				public timeline:com.greensock.core.SimpleTimeline;
				public cachedOrphan:boolean = false;
				public cachedStartTime:number = NaN;
				public prevNode:com.greensock.core.TweenCore;
				public cachedDuration:number = NaN;
				public gc:boolean = false;
				public cachedPauseTime:number = NaN;
				public cacheIsDirty:boolean = false;
				public cachedPaused:boolean = false;
				public cachedTimeScale:number = NaN;
				public cachedTotalDuration:number = NaN;

				public constructor(param1:number = 0,param2:any = null)
				{
					super();
					super();
					this.vars = param2 != null?param2:{};
					if(this.vars["isGSVars"])
					{
						this.vars = this.vars["vars"];
					}
					this.cachedDuration = this.cachedTotalDuration = param1;
					this._delay = <any>!<any>!this.vars["delay"]?flash.trannumber(flash.trannumber(this.vars["delay"])):flash.trannumber(0);
					this.cachedTimeScale = <any>!<any>!this.vars["timeScale"]?flash.trannumber(flash.trannumber(this.vars["timeScale"])):flash.trannumber(1);
					this.active = flash.Boolean(param1 == 0 && this._delay == 0 && this.vars["immediateRender"] != false);
					this.cachedTotalTime = this.cachedTime = 0;
					this.data = this.vars["data"];
					if(<any>!com.greensock.core.TweenCore._classInitted)
					{
						if(isNaN(com.greensock.TweenLite.rootFrame))
						{
							com.greensock.TweenLite.initClass();
							com.greensock.core.TweenCore._classInitted = true;
						}
						else
						{
							return ;
						}
					}
					var _loc3_:com.greensock.core.SimpleTimeline = <any>flash.As3is(this.vars["timeline"],com.greensock.core.SimpleTimeline)?this.vars["timeline"]:<any>!<any>!this.vars["useFrames"]?com.greensock.TweenLite.rootFramesTimeline:com.greensock.TweenLite.rootTimeline;
					_loc3_.insert(this,_loc3_.cachedTotalTime);
					if(this.vars["reversed"])
					{
						this.cachedReversed = true;
					}
					if(this.vars["paused"])
					{
						this.paused = true;
					}
				}

				public renderTime(param1:number,param2:boolean = false,param3:boolean = false)
				{
				}

				public get delay():number
				{
					return this._delay;
				}

				public get duration():number
				{
					return this.cachedDuration;
				}

				public set reversed(param1:boolean)
				{
					if(param1 != this.cachedReversed)
					{
						this.cachedReversed = param1;
						this.setTotalTime(this.cachedTotalTime,true);
					}
				}

				public set startTime(param1:number)
				{
					if(this.timeline != null && (param1 != this.cachedStartTime || this.gc))
					{
						this.timeline.insert(this,param1 - this._delay);
					}
					else
					{
						this.cachedStartTime = param1;
					}
				}

				public restart(param1:boolean = false,param2:boolean = true)
				{
					this.reversed = false;
					this.paused = false;
					this.setTotalTime(<any>!<any>!param1?flash.trannumber(-this._delay):flash.trannumber(0),param2);
				}

				public set delay(param1:number)
				{
					this.startTime = this.startTime + (param1 - this._delay);
					this._delay = param1;
				}

				public resume()
				{
					this.paused = false;
				}

				public get paused():boolean
				{
					return this.cachedPaused;
				}

				public play()
				{
					this.reversed = false;
					this.paused = false;
				}

				public set duration(param1:number)
				{
					var _loc2_:number = param1 / this.cachedDuration;
					this.cachedDuration = this.cachedTotalDuration = param1;
					this.setDirtyCache(true);
					if(this.active && <any>!this.cachedPaused && param1 != 0)
					{
						this.setTotalTime(this.cachedTotalTime * _loc2_,true);
					}
				}

				public invalidate()
				{
				}

				public complete(param1:boolean = false,param2:boolean = false)
				{
					if(<any>!param1)
					{
						this.renderTime(this.totalDuration,param2,false);
						return ;
					}
					if(this.timeline.autoRemoveChildren)
					{
						this.setEnabled(false,false);
					}
					else
					{
						this.active = false;
					}
					if(<any>!param2)
					{
						if(this.vars["onComplete"] && this.cachedTotalTime >= this.cachedTotalDuration && <any>!this.cachedReversed)
						{
							this.vars["onComplete"].apply(null,this.vars["onCompleteParams"]);
						}
						else if(this.cachedReversed && this.cachedTotalTime == 0 && this.vars["onReverseComplete"])
						{
							this.vars["onReverseComplete"].apply(null,this.vars["onReverseCompleteParams"]);
						}
					}
				}

				public get totalTime():number
				{
					return this.cachedTotalTime;
				}

				public get startTime():number
				{
					return this.cachedStartTime;
				}

				public get reversed():boolean
				{
					return this.cachedReversed;
				}

				public set currentTime(param1:number)
				{
					this.setTotalTime(param1,false);
				}

				protected setDirtyCache(param1:boolean = true)
				{
					var _loc2_:com.greensock.core.TweenCore = <any><any>!<any>!param1?this:this.timeline;
					while(_loc2_)
					{
						_loc2_.cacheIsDirty = true;
						_loc2_ = _loc2_.timeline;
					}
				}

				public reverse(param1:boolean = true)
				{
					this.reversed = true;
					if(param1)
					{
						this.paused = false;
					}
					else if(this.gc)
					{
						this.setEnabled(true,false);
					}
				}

				public set paused(param1:boolean)
				{
					if(param1 != this.cachedPaused && this.timeline)
					{
						if(param1)
						{
							this.cachedPauseTime = this.timeline.rawTime;
						}
						else
						{
							this.cachedStartTime = this.cachedStartTime + (this.timeline.rawTime - this.cachedPauseTime);
							this.cachedPauseTime = NaN;
							this.setDirtyCache(false);
						}
						this.cachedPaused = param1;
						this.active = flash.Boolean(<any>!this.cachedPaused && this.cachedTotalTime > 0 && this.cachedTotalTime < this.cachedTotalDuration);
					}
					if(<any>!param1 && this.gc)
					{
						this.setEnabled(true,false);
					}
				}

				public kill()
				{
					this.setEnabled(false,false);
				}

				public set totalTime(param1:number)
				{
					this.setTotalTime(param1,false);
				}

				public get currentTime():number
				{
					return this.cachedTime;
				}

				protected setTotalTime(param1:number,param2:boolean = false)
				{
					var _loc3_:number = <any>NaN;
					var _loc4_:number = <any>NaN;
					if(this.timeline)
					{
						_loc3_ = <any>!<any>!this.cachedPaused?flash.trannumber(this.cachedPauseTime):flash.trannumber(this.timeline.cachedTotalTime);
						if(this.cachedReversed)
						{
							_loc4_ = <any>!<any>!this.cacheIsDirty?flash.trannumber(this.totalDuration):flash.trannumber(this.cachedTotalDuration);
							this.cachedStartTime = _loc3_ - (_loc4_ - param1) / this.cachedTimeScale;
						}
						else
						{
							this.cachedStartTime = _loc3_ - param1 / this.cachedTimeScale;
						}
						if(<any>!this.timeline.cacheIsDirty)
						{
							this.setDirtyCache(false);
						}
						if(this.cachedTotalTime != param1)
						{
							this.renderTime(param1,param2,false);
						}
					}
				}

				public pause()
				{
					this.paused = true;
				}

				public set totalDuration(param1:number)
				{
					this.duration = param1;
				}

				public get totalDuration():number
				{
					return this.cachedTotalDuration;
				}

				public setEnabled(param1:boolean,param2:boolean = false):boolean
				{
					this.gc = <any>!param1;
					if(param1)
					{
						this.active = flash.Boolean(<any>!this.cachedPaused && this.cachedTotalTime > 0 && this.cachedTotalTime < this.cachedTotalDuration);
						if(<any>!param2 && this.cachedOrphan)
						{
							this.timeline.insert(this,this.cachedStartTime - this._delay);
						}
					}
					else
					{
						this.active = false;
						if(<any>!param2 && <any>!this.cachedOrphan)
						{
							this.timeline.remove(this,true);
						}
					}
					return false;
				}

			}
		}
	}
}

com.greensock.core.TweenCore.version = 1.693;
