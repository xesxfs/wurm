module com {
	export module greensock {
		export class TweenMax extends com.greensock.TweenLite implements egret.IEventDispatcher {
			public static _overwriteMode:number;
			public static version_static_com_greensock_TweenMax:number;
			public static killTweensOf_static_com_greensock_TweenMax:Function;
			public static killDelayedCallsTo_static_com_greensock_TweenMax:Function;
			protected _cyclesComplete:number = 0;
			protected _dispatcher:egret.EventDispatcher;
			protected _hasUpdateListener:boolean = false;
			protected _easeType:number = 0;
			protected _repeatDelay:number = 0;
			public yoyo:boolean = false;
			protected _easePower:number = 0;
			protected _repeat:number = 0;

			public constructor(param1:any,param2:number,param3:any)
			{
				super(param1,param2,param3);
				if(com.greensock.TweenLite.version_static_com_greensock_TweenLite < 11.2)
				{
					throw new flash.Error("TweenMax error! Please update your TweenLite class or try deleting your ASO files. TweenMax requires a more recent version. Download updates at http://www.TweenMax.com.").message;
				}
				this.yoyo = flash.Boolean(this.vars["yoyo"]);
				this._repeat = flash.checkInt(flash.tranint(this.vars["repeat"]));
				this._repeatDelay = <any>!<any>!this.vars["repeatDelay"]?flash.trannumber(flash.trannumber(this.vars["repeatDelay"])):flash.trannumber(0);
				this.cacheIsDirty = true;
				if(this.vars["onCompleteListener"] || this.vars["onInitListener"] || this.vars["onUpdateListener"] || this.vars["onStartListener"] || this.vars["onRepeatListener"] || this.vars["onReverseCompleteListener"])
				{
					this.initDispatcher();
					if(param2 == 0 && this._delay == 0)
					{
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.UPDATE));
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.COMPLETE_static_com_greensock_events_TweenEvent));
					}
				}
				if(this.vars["timeScale"] && <any>!(flash.As3is(this.target,com.greensock.core.TweenCore)))
				{
					this.cachedTimeScale = this.vars["timeScale"];
				}
			}

			public static set globalTimeScale(param1:number)
			{
				if(param1 == 0)
				{
					param1 = 0.0001;
				}
				if(com.greensock.TweenLite.rootTimeline == null)
				{
					com.greensock.TweenLite.to({},0,{});
				}
				var _loc2_:com.greensock.core.SimpleTimeline = com.greensock.TweenLite.rootTimeline;
				var _loc3_:number = egret.getTimer() * 0.001;
				_loc2_.cachedStartTime = _loc3_ - (_loc3_ - _loc2_.cachedStartTime) * _loc2_.cachedTimeScale / param1;
				_loc2_ = com.greensock.TweenLite.rootFramesTimeline;
				_loc3_ = com.greensock.TweenLite.rootFrame;
				_loc2_.cachedStartTime = _loc3_ - (_loc3_ - _loc2_.cachedStartTime) * _loc2_.cachedTimeScale / param1;
				com.greensock.TweenLite.rootFramesTimeline.cachedTimeScale = com.greensock.TweenLite.rootTimeline.cachedTimeScale = param1;
			}

			public static fromTo(param1:any,param2:number,param3:any,param4:any):com.greensock.TweenMax
			{
				if(param4["isGSVars"])
				{
					param4 = param4["vars"];
				}
				if(param3["isGSVars"])
				{
					param3 = param3["vars"];
				}
				param4["startAt"] = param3;
				if(param3["immediateRender"])
				{
					param4["immediateRender"] = true;
				}
				return new com.greensock.TweenMax(param1,param2,param4);
			}

			public static allFromTo(param1:Array<any>,param2:number,param3:any,param4:any,param5:number = 0,param6:Function = null,param7:Array<any> = null):Array<any>
			{
				if(param4["isGSVars"])
				{
					param4 = param4["vars"];
				}
				if(param3["isGSVars"])
				{
					param3 = param3["vars"];
				}
				param4["startAt"] = param3;
				if(param3["immediateRender"])
				{
					param4["immediateRender"] = true;
				}
				return com.greensock.TweenMax.allTo(param1,param2,param4,param5,param6,param7);
			}

			public static pauseAll(param1:boolean = true,param2:boolean = true)
			{
				com.greensock.TweenMax.changePause(true,param1,param2);
			}

			public static getTweensOf(param1:any):Array<any>
			{
				var _loc4_:number = flash.checkInt(0);
				var _loc5_:number = flash.checkInt(0);
				var _loc2_:Array<any> = <any>com.greensock.TweenLite.masterList.getItem(param1);
				var _loc3_:Array<any> = [];
				if(_loc2_)
				{
					_loc4_ = flash.checkInt(_loc2_.length);
					_loc5_ = flash.checkInt(0);
					while(--_loc4_ > -1)
					{
						if(<any>!(<com.greensock.TweenLite>(_loc2_[_loc4_])).gc)
						{
							_loc3_[_loc5_++] = _loc2_[_loc4_];
						}
					}
				}
				return _loc3_;
			}

			public static get globalTimeScale():number
			{
				return com.greensock.TweenLite.rootTimeline == null?flash.trannumber(1):flash.trannumber(com.greensock.TweenLite.rootTimeline.cachedTimeScale);
			}

			public static killChildTweensOf(param1:egret.DisplayObjectContainer,param2:boolean = false)
			{
				var _loc4_:any = <any>null;
				var _loc5_:egret.DisplayObjectContainer = <any>null;
				var _loc3_:Array<any> = com.greensock.TweenMax.getAllTweens();
				var _loc6_:number = flash.checkInt(_loc3_.length);
				while(--_loc6_ > -1)
				{
					_loc4_ = _loc3_[_loc6_].target;
					if(flash.As3is(_loc4_,egret.DisplayObject))
					{
						_loc5_ = _loc4_["parent"];
						while(_loc5_)
						{
							if(_loc5_ == param1)
							{
								if(param2)
								{
									_loc3_[_loc6_].complete(false);
								}
								else
								{
									_loc3_[_loc6_].setEnabled(false,false);
								}
							}
							_loc5_ = _loc5_.parent;
						}
						continue;
					}
				}
			}

			public static delayedCall_static_com_greensock_TweenMax(param1:number,param2:Function,param3:Array<any> = null,param4:boolean = false):com.greensock.TweenMax
			{
				return new com.greensock.TweenMax(param2,0,{"delay":param1,"onComplete":param2,"onCompleteParams":param3,"immediateRender":false,"useFrames":param4,"overwrite":0});
			}

			public static isTweening(param1:any):boolean
			{
				var _loc4_:com.greensock.TweenLite = <any>null;
				var _loc2_:Array<any> = com.greensock.TweenMax.getTweensOf(param1);
				var _loc3_:number = flash.checkInt(_loc2_.length);
				while(--_loc3_ > -1)
				{
					_loc4_ = _loc2_[_loc3_];
					if(_loc4_.active || _loc4_.cachedStartTime == _loc4_.timeline.cachedTime && _loc4_.timeline.active)
					{
						return true;
					}
				}
				return false;
			}

			public static killAll(param1:boolean = false,param2:boolean = true,param3:boolean = true)
			{
				var _loc5_:any = false;
				var _loc4_:Array<any> = com.greensock.TweenMax.getAllTweens();
				var _loc6_:number = flash.checkInt(_loc4_.length);
				while(--_loc6_ > -1)
				{
					_loc5_ = _loc4_[_loc6_].target == _loc4_[_loc6_].vars.onComplete;
					if(_loc5_ == param3 || _loc5_ != param2)
					{
						if(param1)
						{
							_loc4_[_loc6_].complete(false);
						}
						else
						{
							_loc4_[_loc6_].setEnabled(false,false);
						}
					}
				}
			}

			private static changePause(param1:boolean,param2:boolean = true,param3:boolean = false)
			{
				var _loc5_:any = false;
				var _loc4_:Array<any> = com.greensock.TweenMax.getAllTweens();
				var _loc6_:number = flash.checkInt(_loc4_.length);
				while(--_loc6_ > -1)
				{
					_loc5_ = (<com.greensock.TweenLite>(_loc4_[_loc6_])).target == (<com.greensock.TweenLite>(_loc4_[_loc6_])).vars["onComplete"];
					if(_loc5_ == param3 || _loc5_ != param2)
					{
						(<com.greensock.core.TweenCore>(_loc4_[_loc6_])).paused = param1;
					}
				}
			}

			public static from_static_com_greensock_TweenMax(param1:any,param2:number,param3:any):com.greensock.TweenMax
			{
				if(param3["isGSVars"])
				{
					param3 = param3["vars"];
				}
				param3["runBackwards"] = true;
				if(<any>!("immediateRender" in param3))
				{
					param3["immediateRender"] = true;
				}
				return new com.greensock.TweenMax(param1,param2,param3);
			}

			public static allFrom(param1:Array<any>,param2:number,param3:any,param4:number = 0,param5:Function = null,param6:Array<any> = null):Array<any>
			{
				if(param3["isGSVars"])
				{
					param3 = param3["vars"];
				}
				param3["runBackwards"] = true;
				if(<any>!("immediateRender" in param3))
				{
					param3["immediateRender"] = true;
				}
				return com.greensock.TweenMax.allTo(param1,param2,param3,param4,param5,param6);
			}

			public static getAllTweens():Array<any>
			{
				var _loc4_:Array<any> = <any>null;
				var _loc5_:number = flash.checkInt(0);
				var _loc1_:flash.Dictionary = com.greensock.TweenLite.masterList;
				var _loc2_:number = flash.checkInt(0);
				var _loc3_:Array<any> = [];
				var _loc4__key_a;
				for(_loc4__key_a in _loc1_.map)
				{
					_loc4_ = _loc1_.map[_loc4__key_a][1];
					_loc5_ = flash.checkInt(_loc4_.length);
					while(--_loc5_ > -1)
					{
						if(<any>!(<com.greensock.TweenLite>(_loc4_[_loc5_])).gc)
						{
							_loc3_[_loc2_++] = _loc4_[_loc5_];
						}
					}
				}
				return _loc3_;
			}

			public static resumeAll(param1:boolean = true,param2:boolean = true)
			{
				com.greensock.TweenMax.changePause(false,param1,param2);
			}

			public static to_static_com_greensock_TweenMax(param1:any,param2:number,param3:any):com.greensock.TweenMax
			{
				return new com.greensock.TweenMax(param1,param2,param3);
			}

			public static allTo(param1:Array<any>,param2:number,param3:any,param4:number = 0,param5:Function = null,param6:Array<any> = null):Array<any>
			{
				var i:number = flash.checkInt(0);
				var varsDup:any = <any>null;
				var p:string = <any>null;
				var onCompleteProxy:Function = <any>null;
				var onCompleteParamsProxy:Array<any> = <any>null;
				var targets:Array<any> = param1;
				var duration:number = param2;
				var vars:any = param3;
				var stagger:number = param4;
				var onCompleteAll:Function = param5;
				var onCompleteAllParams:Array<any> = param6;
				var l:number = flash.checkInt(targets.length);
				var a:Array<any> = [];
				if(vars["isGSVars"])
				{
					vars = vars["vars"];
				}
				var curDelay:number = <any>"delay" in vars?flash.trannumber(flash.trannumber(vars["delay"])):flash.trannumber(0);
				onCompleteProxy = vars["onComplete"];
				onCompleteParamsProxy = vars["onCompleteParams"];
				var lastIndex:number = flash.checkInt(l - 1);
				i = flash.checkInt(0);
				while(i < l)
				{
					varsDup = {};
					for(p in vars)
					{
						varsDup[p] = vars[p];
					}
					varsDup["delay"] = curDelay;
					if(i == lastIndex && onCompleteAll != null)
					{
						varsDup["onComplete"] = function ()
						{
							if(onCompleteProxy != null)
							{
								onCompleteProxy.apply(null,onCompleteParamsProxy);
							}
							onCompleteAll.apply(null,onCompleteAllParams);
						};
					}
					a[i] = new com.greensock.TweenMax(targets[i],duration,varsDup);
					curDelay = curDelay + stagger;
					i = flash.checkInt(i + 1);
				}
				return a;
			}

			public dispatchEvent(param1:egret.Event):boolean
			{
				return this._dispatcher == null?false:flash.Boolean(this._dispatcher.dispatchEvent(param1));
			}

			public set timeScale(param1:number)
			{
				if(param1 == 0)
				{
					param1 = 0.0001;
				}
				var _loc2_:number = <any>this.cachedPauseTime || this.cachedPauseTime == 0?flash.trannumber(this.cachedPauseTime):flash.trannumber(this.timeline.cachedTotalTime);
				this.cachedStartTime = _loc2_ - (_loc2_ - this.cachedStartTime) * this.cachedTimeScale / param1;
				this.cachedTimeScale = param1;
				this.setDirtyCache(false);
			}

			public renderTime(param1:number,param2:boolean = false,param3:boolean = false)
			{
				var _loc7_:any = false;
				var _loc8_:boolean = <any>false;
				var _loc9_:boolean = <any>false;
				var _loc11_:number = <any>NaN;
				var _loc12_:number = flash.checkInt(0);
				var _loc13_:number = flash.checkInt(0);
				var _loc14_:number = <any>NaN;
				var _loc4_:number = <any><any>!<any>!this.cacheIsDirty?flash.trannumber(this.totalDuration):flash.trannumber(this.cachedTotalDuration);
				var _loc5_:number = this.cachedTime;
				var _loc6_:number = this.cachedTotalTime;
				if(param1 >= _loc4_)
				{
					this.cachedTotalTime = _loc4_;
					this.cachedTime = this.cachedDuration;
					this.ratio = 1;
					_loc7_ = <any>!this.cachedReversed;
					if(this.cachedDuration == 0)
					{
						if((param1 == 0 || this._rawPrevTime < 0) && this._rawPrevTime != param1)
						{
							param3 = true;
						}
						this._rawPrevTime = param1;
					}
				}
				else if(param1 <= 0)
				{
					if(param1 < 0)
					{
						this.active = false;
						if(this.cachedDuration == 0)
						{
							if(this._rawPrevTime >= 0)
							{
								param3 = true;
								_loc7_ = this._rawPrevTime > 0;
							}
							this._rawPrevTime = param1;
						}
					}
					else if(param1 == 0 && <any>!this.initted)
					{
						param3 = true;
					}
					this.cachedTotalTime = this.cachedTime = this.ratio = 0;
					if(this.cachedReversed && _loc6_ != 0)
					{
						_loc7_ = true;
					}
				}
				else
				{
					this.cachedTotalTime = this.cachedTime = param1;
					_loc9_ = true;
				}
				if(this._repeat != 0)
				{
					_loc11_ = this.cachedDuration + this._repeatDelay;
					_loc12_ = flash.checkInt(this._cyclesComplete);
					if((this._cyclesComplete = flash.checkInt(this.cachedTotalTime / _loc11_ >> 0)) == this.cachedTotalTime / _loc11_ && this._cyclesComplete != 0)
					{
						this._cyclesComplete--;
					}
					_loc8_ = flash.Boolean(_loc12_ != this._cyclesComplete);
					if(_loc7_)
					{
						if(this.yoyo && this._repeat % 2)
						{
							this.cachedTime = this.ratio = 0;
						}
					}
					else if(param1 > 0)
					{
						this.cachedTime = this.cachedTotalTime - this._cyclesComplete * _loc11_;
						if(this.yoyo && this._cyclesComplete % 2)
						{
							this.cachedTime = this.cachedDuration - this.cachedTime;
						}
						else if(this.cachedTime >= this.cachedDuration)
						{
							this.cachedTime = this.cachedDuration;
							this.ratio = 1;
							_loc9_ = false;
						}
						if(this.cachedTime <= 0)
						{
							this.cachedTime = this.ratio = 0;
							_loc9_ = false;
						}
					}
					else
					{
						this._cyclesComplete = flash.checkInt(0);
					}
				}
				if(_loc5_ == this.cachedTime && <any>!param3)
				{
					return ;
				}
				if(<any>!this.initted)
				{
					this.init();
				}
				if(<any>!this.active && <any>!this.cachedPaused)
				{
					this.active = true;
				}
				if(_loc9_)
				{
					if(this._easeType)
					{
						_loc13_ = flash.checkInt(this._easePower);
						_loc14_ = this.cachedTime / this.cachedDuration;
						if(this._easeType == 2)
						{
							this.ratio = _loc14_ = 1 - _loc14_;
							while(--_loc13_ > -1)
							{
								this.ratio = _loc14_ * this.ratio;
							}
							this.ratio = 1 - this.ratio;
						}
						else if(this._easeType == 1)
						{
							this.ratio = _loc14_;
							while(--_loc13_ > -1)
							{
								this.ratio = _loc14_ * this.ratio;
							}
						}
						else if(_loc14_ < 0.5)
						{
							this.ratio = _loc14_ = _loc14_ * 2;
							while(--_loc13_ > -1)
							{
								this.ratio = _loc14_ * this.ratio;
							}
							this.ratio = this.ratio * 0.5;
						}
						else
						{
							this.ratio = _loc14_ = (1 - _loc14_) * 2;
							while(--_loc13_ > -1)
							{
								this.ratio = _loc14_ * this.ratio;
							}
							this.ratio = 1 - 0.5 * this.ratio;
						}
					}
					else
					{
						this.ratio = this._ease(this.cachedTime,0,1,this.cachedDuration);
					}
				}
				if(_loc6_ == 0 && (this.cachedTotalTime != 0 || this.cachedDuration == 0) && <any>!param2)
				{
					if(this.vars["onStart"])
					{
						this.vars["onStart"].apply(null,this.vars["onStartParams"]);
					}
					if(this._dispatcher)
					{
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.START));
					}
				}
				var _loc10_:com.greensock.core.PropTween = this.cachedPT1;
				while(_loc10_)
				{
					_loc10_.target[_loc10_.property] = _loc10_.start + this.ratio * _loc10_.change;
					_loc10_ = _loc10_.nextNode;
				}
				if(this._hasUpdate && <any>!param2)
				{
					this.vars["onUpdate"].apply(null,this.vars["onUpdateParams"]);
				}
				if(this._hasUpdateListener && <any>!param2)
				{
					this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.UPDATE));
				}
				if(_loc8_ && <any>!param2 && <any>!this.gc)
				{
					if(this.vars["onRepeat"])
					{
						this.vars["onRepeat"].apply(null,this.vars["onRepeatParams"]);
					}
					if(this._dispatcher)
					{
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.REPEAT));
					}
				}
				if(_loc7_ && <any>!this.gc)
				{
					if(this._hasPlugins && this.cachedPT1)
					{
						com.greensock.TweenLite.onPluginEvent("onComplete",this);
					}
					this.complete(true,param2);
				}
			}

			public set totalDuration(param1:number)
			{
				if(this._repeat == -1)
				{
					return ;
				}
				this.duration = (param1 - this._repeat * this._repeatDelay) / (this._repeat + 1);
			}

			public addEventListener(param1:string,param2:Function,thisObject:any,param3:boolean = false,param4:number = 0,param5:boolean = false)
			{
				if(this._dispatcher == null)
				{
					this.initDispatcher();
				}
				if(param1 == com.greensock.events.TweenEvent.UPDATE)
				{
					this._hasUpdateListener = true;
				}
				this._dispatcher.addEventListener(param1,param2,null,param3,param4);
			}

			protected init()
			{
				var _loc1_:com.greensock.TweenMax = <any>null;
				if(this.vars["startAt"])
				{
					this.vars["startAt"].overwrite = 0;
					this.vars["startAt"].immediateRender = true;
					_loc1_ = new com.greensock.TweenMax(this.target,0,this.vars["startAt"]);
				}
				if(this._dispatcher)
				{
					this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.INIT_static_com_greensock_events_TweenEvent));
				}
				super.init();
				if(this._ease in com.greensock.TweenLite.fastEaseLookup)
				{
					this._easeType = flash.checkInt(com.greensock.TweenLite.fastEaseLookup.getItem(this._ease)[0]);
					this._easePower = flash.checkInt(com.greensock.TweenLite.fastEaseLookup.getItem(this._ease)[1]);
				}
			}

			public removeEventListener(param1:string,param2:Function,thisObject:any,param3:boolean = false)
			{
				if(this._dispatcher)
				{
					this._dispatcher.removeEventListener(param1,param2,null,param3);
				}
			}

			public setDestination(param1:string,param2:any,param3:boolean = true)
			{
				var _loc4_:any = {};
				_loc4_[param1] = param2;
				this.updateTo(_loc4_,<any>!param3);
			}

			public willTrigger(param1:string):boolean
			{
				return this._dispatcher == null?false:flash.Boolean(this._dispatcher.willTrigger(param1));
			}

			public hasEventListener(param1:string):boolean
			{
				return this._dispatcher == null?false:flash.Boolean(this._dispatcher.hasEventListener(param1));
			}

			protected initDispatcher()
			{
				if(this._dispatcher == null)
				{
					this._dispatcher = new egret.EventDispatcher(<any>this);
				}
				if(flash.As3is(this.vars["onInitListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.INIT_static_com_greensock_events_TweenEvent,this.vars["onInitListener"],null,false,0);
				}
				if(flash.As3is(this.vars["onStartListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.START,this.vars["onStartListener"],null,false,0);
				}
				if(flash.As3is(this.vars["onUpdateListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.UPDATE,this.vars["onUpdateListener"],null,false,0);
					this._hasUpdateListener = true;
				}
				if(flash.As3is(this.vars["onCompleteListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.COMPLETE_static_com_greensock_events_TweenEvent,this.vars["onCompleteListener"],null,false,0);
				}
				if(flash.As3is(this.vars["onRepeatListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.REPEAT,this.vars["onRepeatListener"],null,false,0);
				}
				if(flash.As3is(this.vars["onReverseCompleteListener"],Function))
				{
					this._dispatcher.addEventListener(com.greensock.events.TweenEvent.REVERSE_COMPLETE,this.vars["onReverseCompleteListener"],null,false,0);
				}
			}

			public set currentProgress(param1:number)
			{
				if(this._cyclesComplete == 0)
				{
					this.setTotalTime(this.duration * param1,false);
				}
				else
				{
					this.setTotalTime(this.duration * param1 + this._cyclesComplete * this.cachedDuration,false);
				}
			}

			public get totalProgress():number
			{
				return this.cachedTotalTime / this.totalDuration;
			}

			public set totalProgress(param1:number)
			{
				this.setTotalTime(this.totalDuration * param1,false);
			}

			public updateTo(param1:any,param2:boolean = false)
			{
				var _loc4_:any = null;
				var _loc5_:number = <any>NaN;
				var _loc6_:number = <any>NaN;
				var _loc7_:com.greensock.core.PropTween = <any>null;
				var _loc8_:number = <any>NaN;
				var _loc3_:number = this.ratio;
				if(param2 && this.timeline != null && this.cachedStartTime < this.timeline.cachedTime)
				{
					this.cachedStartTime = this.timeline.cachedTime;
					this.setDirtyCache(false);
					if(this.gc)
					{
						this.setEnabled(true,false);
					}
					else
					{
						this.timeline.insert(this,this.cachedStartTime - this._delay);
					}
				}
				for(_loc4_ in param1)
				{
					this.vars[_loc4_] = param1[_loc4_];
				}
				if(this.initted)
				{
					if(param2)
					{
						this.initted = false;
					}
					else
					{
						if(this._notifyPluginsOfEnabled && this.cachedPT1)
						{
							com.greensock.TweenLite.onPluginEvent("onDisable",this);
						}
						if(this.cachedTime / this.cachedDuration > 0.998)
						{
							_loc5_ = this.cachedTime;
							this.renderTime(0,true,false);
							this.initted = false;
							this.renderTime(_loc5_,true,false);
						}
						else if(this.cachedTime > 0)
						{
							this.initted = false;
							this.init();
							_loc6_ = 1 / (1 - _loc3_);
							_loc7_ = this.cachedPT1;
							while(_loc7_)
							{
								_loc8_ = _loc7_.start + _loc7_.change;
								_loc7_.change = _loc7_.change * _loc6_;
								_loc7_.start = _loc8_ - _loc7_.change;
								_loc7_ = _loc7_.nextNode;
							}
						}
					}
				}
			}

			public get currentProgress():number
			{
				return this.cachedTime / this.duration;
			}

			public get repeat():number
			{
				return this._repeat;
			}

			public set currentTime(param1:number)
			{
				if(this._cyclesComplete != 0)
				{
					if(this.yoyo && this._cyclesComplete % 2 == 1)
					{
						param1 = this.duration - param1 + this._cyclesComplete * (this.cachedDuration + this._repeatDelay);
					}
					else
					{
						param1 = param1 + this._cyclesComplete * (this.duration + this._repeatDelay);
					}
				}
				this.setTotalTime(param1,false);
			}

			public get repeatDelay():number
			{
				return this._repeatDelay;
			}

			public killProperties(param1:Array<any>)
			{
				var _loc2_:any = {};
				var _loc3_:number = flash.checkInt(param1.length);
				while(--_loc3_ > -1)
				{
					_loc2_[param1[_loc3_]] = true;
				}
				this.killVars(_loc2_);
			}

			public set repeatDelay(param1:number)
			{
				this._repeatDelay = param1;
				this.setDirtyCache(true);
			}

			public set repeat(param1:number)
			{
				param1 = flash.checkInt(param1);
				this._repeat = flash.checkInt(param1);
				this.setDirtyCache(true);
			}

			public complete(param1:boolean = false,param2:boolean = false)
			{
				super.complete(param1,param2);
				if(<any>!param2 && this._dispatcher)
				{
					if(this.cachedTotalTime == this.cachedTotalDuration && <any>!this.cachedReversed)
					{
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.COMPLETE_static_com_greensock_events_TweenEvent));
					}
					else if(this.cachedReversed && this.cachedTotalTime == 0)
					{
						this._dispatcher.dispatchEvent(new com.greensock.events.TweenEvent(com.greensock.events.TweenEvent.REVERSE_COMPLETE));
					}
				}
			}

			public invalidate()
			{
				this.yoyo = flash.Boolean(this.vars["yoyo"] == true);
				this._repeat = flash.checkInt(<any>!<any>!this.vars["repeat"]?flash.tranint(flash.trannumber(this.vars["repeat"])):0);
				this._repeatDelay = <any>!<any>!this.vars["repeatDelay"]?flash.trannumber(flash.trannumber(this.vars["repeatDelay"])):flash.trannumber(0);
				this._hasUpdateListener = false;
				if(this.vars["onCompleteListener"] != null || this.vars["onUpdateListener"] != null || this.vars["onStartListener"] != null)
				{
					this.initDispatcher();
				}
				this.setDirtyCache(true);
				super.invalidate();
			}

			public get timeScale():number
			{
				return this.cachedTimeScale;
			}

			public get totalDuration():number
			{
				if(this.cacheIsDirty)
				{
					this.cachedTotalDuration = this._repeat == -1?flash.trannumber(999999999999):flash.trannumber(this.cachedDuration * (this._repeat + 1) + this._repeatDelay * this._repeat);
					this.cacheIsDirty = false;
				}
				return this.cachedTotalDuration;
			}

	public once(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{
	}
		}
	}
}

com.greensock.TweenMax._overwriteMode = <any>!<any>!OverwriteManager.enabled?flash.tranint(OverwriteManager.mode):flash.tranint(OverwriteManager.init(2));
com.greensock.TweenMax.version_static_com_greensock_TweenMax = 11.698;
com.greensock.TweenMax.killTweensOf_static_com_greensock_TweenMax = com.greensock.TweenLite.killTweensOf;
com.greensock.TweenMax.killDelayedCallsTo_static_com_greensock_TweenMax = com.greensock.TweenLite.killTweensOf;
flash.extendsClass("com.greensock.TweenMax","com.greensock.TweenLite")
flash.implementsClass("com.greensock.TweenMax",["egret.IEventDispatcher"]);