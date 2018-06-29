module com {
	export module greensock {
		export class TweenLite extends com.greensock.core.TweenCore {
			public static rootTimeline:com.greensock.core.SimpleTimeline;
			public static fastEaseLookup:flash.Dictionary;
			public static onPluginEvent:Function;
			public static rootFramesTimeline:com.greensock.core.SimpleTimeline;
			public static defaultEase:Function;
			public static version_static_com_greensock_TweenLite:number;
			public static plugins:any;
			public static masterList:flash.Dictionary;
			public static overwriteManager:any;
			public static rootFrame:number = NaN;
			public static killDelayedCallsTo:Function;
			public static _shape:egret.Shape;
			public static _reservedProps:any;
			protected _hasPlugins:boolean = false;
			public propTweenLookup:any;
			public cachedPT1:com.greensock.core.PropTween;
			protected _overwrite:number = 0;
			protected _ease:Function;
			public target:any;
			public ratio:number = 0;
			protected _overwrittenProps:any;
			protected _notifyPluginsOfEnabled:boolean = false;

			public constructor(param1:any,param2:number,param3:any)
			{
				super(param2,param3);
				var _loc5_:com.greensock.TweenLite = <any>null;
				if(param1 == null)
				{
					throw new flash.Error("Cannot tween a null object.").message;
				}
				this.target = param1;
				if(flash.As3is(this.target,com.greensock.core.TweenCore) && this.vars["timeScale"])
				{
					this.cachedTimeScale = 1;
				}
				this.propTweenLookup = {};
				this._ease = com.greensock.TweenLite.defaultEase;
				this._overwrite = flash.checkInt(flash.trannumber(param3["overwrite"]) <= -1 || <any>!com.greensock.TweenLite.overwriteManager["enabled"] && param3["overwrite"] > 1?flash.tranint(com.greensock.TweenLite.overwriteManager["mode"]):flash.tranint(flash.tranint(param3["overwrite"])));
				var _loc4_:Array<any> = <any>com.greensock.TweenLite.masterList.getItem(param1);
				if(<any>!_loc4_)
				{
					com.greensock.TweenLite.masterList.setItem(param1,[this]);
				}
				else if(this._overwrite == 1)
				{
					var _loc5__key_a;
					for(_loc5__key_a in _loc4_)
					{
						_loc5_ = _loc4_[_loc5__key_a];
						if(<any>!_loc5_.gc)
						{
							_loc5_.setEnabled(false,false);
						}
					}
					com.greensock.TweenLite.masterList.setItem(param1,[this]);
				}
				else
				{
					_loc4_[_loc4_.length] = this;
				}
				if(this.active || this.vars["immediateRender"])
				{
					this.renderTime(0,false,true);
				}
			}

			public static initClass()
			{
				com.greensock.TweenLite.rootFrame = 0;
				com.greensock.TweenLite.rootTimeline = new com.greensock.core.SimpleTimeline(null);
				com.greensock.TweenLite.rootFramesTimeline = new com.greensock.core.SimpleTimeline(null);
				com.greensock.TweenLite.rootTimeline.cachedStartTime = egret.getTimer() * 0.001;
				com.greensock.TweenLite.rootFramesTimeline.cachedStartTime = com.greensock.TweenLite.rootFrame;
				com.greensock.TweenLite.rootTimeline.autoRemoveChildren = true;
				com.greensock.TweenLite.rootFramesTimeline.autoRemoveChildren = true;
				com.greensock.TweenLite._shape.addEventListener(egret.Event.ENTER_FRAME,com.greensock.TweenLite.updateAll,null,false,0);
				if(com.greensock.TweenLite.overwriteManager == null)
				{
					com.greensock.TweenLite.overwriteManager = {"mode":1,"enabled":false};
				}
			}

			public static killTweensOf(param1:any,param2:boolean = false,param3:any = null)
			{
				var _loc4_:Array<any> = <any>null;
				var _loc5_:number = flash.checkInt(0);
				var _loc6_:com.greensock.TweenLite = <any>null;
				if(param1 in com.greensock.TweenLite.masterList)
				{
					_loc4_ = com.greensock.TweenLite.masterList.getItem(param1);
					_loc5_ = flash.checkInt(_loc4_.length);
					while(--_loc5_ > -1)
					{
						_loc6_ = _loc4_[_loc5_];
						if(<any>!_loc6_.gc)
						{
							if(param2)
							{
								_loc6_.complete(false,false);
							}
							if(param3 != null)
							{
								_loc6_.killVars(param3);
							}
							if(param3 == null || _loc6_.cachedPT1 == null && _loc6_.initted)
							{
								_loc6_.setEnabled(false,false);
							}
						}
					}
					if(param3 == null)
					{
						com.greensock.TweenLite.masterList.delItem(param1);
					}
				}
			}

			public static from(param1:any,param2:number,param3:any):com.greensock.TweenLite
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
				return new com.greensock.TweenLite(param1,param2,param3);
			}

			protected static easeOut(param1:number,param2:number,param3:number,param4:number):number
			{
				return 1 - (param1 = 1 - param1 / param4) * param1;
			}

			public static delayedCall(param1:number,param2:Function,param3:Array<any> = null,param4:boolean = false):com.greensock.TweenLite
			{
				return new com.greensock.TweenLite(param2,0,{"delay":param1,"onComplete":param2,"onCompleteParams":param3,"immediateRender":false,"useFrames":param4,"overwrite":0});
			}

			protected static updateAll(param1:egret.Event = null)
			{
				var _loc2_:flash.Dictionary = <any>null;
				var _loc3_:any = null;
				var _loc4_:Array<any> = <any>null;
				var _loc5_:number = flash.checkInt(0);
				com.greensock.TweenLite.rootTimeline.renderTime((egret.getTimer() * 0.001 - com.greensock.TweenLite.rootTimeline.cachedStartTime) * com.greensock.TweenLite.rootTimeline.cachedTimeScale,false,false);
				com.greensock.TweenLite.rootFrame = com.greensock.TweenLite.rootFrame + 1;
				com.greensock.TweenLite.rootFramesTimeline.renderTime((com.greensock.TweenLite.rootFrame - com.greensock.TweenLite.rootFramesTimeline.cachedStartTime) * com.greensock.TweenLite.rootFramesTimeline.cachedTimeScale,false,false);
				if(<any>!(com.greensock.TweenLite.rootFrame % 60))
				{
					_loc2_ = com.greensock.TweenLite.masterList;
					for(var forinvar__ in _loc2_.map)
					{
						_loc3_ = _loc2_.map[forinvar__][0];
						_loc4_ = _loc2_.getItem(_loc3_);
						_loc5_ = flash.checkInt(_loc4_.length);
						while(--_loc5_ > -1)
						{
							if((<com.greensock.TweenLite>(_loc4_[_loc5_])).gc)
							{
								_loc4_.splice(_loc5_,1);
							}
						}
						if(_loc4_.length == 0)
						{
							_loc2_.delItem(_loc3_);
						}
					}
				}
			}

			public static to(param1:any,param2:number,param3:any):com.greensock.TweenLite
			{
				return new com.greensock.TweenLite(param1,param2,param3);
			}

			protected easeProxy(param1:number,param2:number,param3:number,param4:number):number
			{
				var _arguments__ = [];
				for(var _arguments__key in arguments)
				{
					_arguments__ = arguments[_arguments__key];
				}
				return this.vars["proxiedEase"].apply(null,_arguments__.concat(this.vars["easeParams"]));
			}

			public renderTime(param1:number,param2:boolean = false,param3:boolean = false)
			{
				var _loc4_:any = false;
				var _loc5_:number = this.cachedTime;
				if(param1 >= this.cachedDuration)
				{
					this.cachedTotalTime = this.cachedTime = this.cachedDuration;
					this.ratio = 1;
					_loc4_ = <any>!this.cachedReversed;
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
					this.cachedTotalTime = this.cachedTime = this.ratio = 0;
					if(param1 < 0)
					{
						this.active = false;
						if(this.cachedDuration == 0)
						{
							if(this._rawPrevTime >= 0)
							{
								param3 = true;
								_loc4_ = this._rawPrevTime > 0;
							}
							this._rawPrevTime = param1;
						}
					}
					if(this.cachedReversed && _loc5_ != 0)
					{
						_loc4_ = true;
					}
				}
				else
				{
					this.cachedTotalTime = this.cachedTime = param1;
					this.ratio = this._ease(param1,0,1,this.cachedDuration);
				}
				if(this.cachedTime == _loc5_ && <any>!param3)
				{
					return ;
				}
				if(<any>!this.initted)
				{
					this.init();
					if(<any>!_loc4_ && this.cachedTime)
					{
						this.ratio = this._ease(this.cachedTime,0,1,this.cachedDuration);
					}
				}
				if(<any>!this.active && <any>!this.cachedPaused)
				{
					this.active = true;
				}
				if(_loc5_ == 0 && this.vars["onStart"] && (this.cachedTime != 0 || this.cachedDuration == 0) && <any>!param2)
				{
					this.vars["onStart"].apply(null,this.vars["onStartParams"]);
				}
				var _loc6_:com.greensock.core.PropTween = this.cachedPT1;
				while(_loc6_)
				{
					_loc6_.target[_loc6_.property] = _loc6_.start + this.ratio * _loc6_.change;
					_loc6_ = _loc6_.nextNode;
				}
				if(this._hasUpdate && <any>!param2)
				{
					this.vars["onUpdate"].apply(null,this.vars["onUpdateParams"]);
				}
				if(_loc4_ && <any>!this.gc)
				{
					if(this._hasPlugins && this.cachedPT1)
					{
						com.greensock.TweenLite.onPluginEvent("onComplete",this);
					}
					this.complete(true,param2);
				}
			}

			public setEnabled(param1:boolean,param2:boolean = false):boolean
			{
				var _loc3_:Array<any> = <any>null;
				if(param1)
				{
					_loc3_ = com.greensock.TweenLite.masterList.getItem(this.target);
					if(<any>!_loc3_)
					{
						com.greensock.TweenLite.masterList.setItem(this.target,[this]);
					}
					else if(_loc3_.indexOf(this) == -1)
					{
						_loc3_[_loc3_.length] = this;
					}
				}
				super.setEnabled(param1,param2);
				if(this._notifyPluginsOfEnabled && this.cachedPT1)
				{
					return com.greensock.TweenLite.onPluginEvent(<any>!<any>!param1?"onEnable":"onDisable",this);
				}
				return false;
			}

			protected init()
			{
				var _loc1_:any = null;
				var _loc2_:number = flash.checkInt(0);
				var _loc3_:any = undefined;
				var _loc4_:boolean = <any>false;
				var _loc5_:Array<any> = <any>null;
				var _loc6_:com.greensock.core.PropTween = <any>null;
				if(this.vars["onInit"])
				{
					this.vars["onInit"].apply(null,this.vars["onInitParams"]);
				}
				if(typeof this.vars["ease"] == "function")
				{
					this._ease = this.vars["ease"];
				}
				if(this.vars["easeParams"])
				{
					this.vars["proxiedEase"] = this._ease;
					this._ease = flash.bind(this.easeProxy,this);
				}
				this.cachedPT1 = null;
				this.propTweenLookup = {};
				for(_loc1_ in this.vars)
				{
					if(<any>!(_loc1_ in com.greensock.TweenLite._reservedProps && <any>!(_loc1_ == "timeScale" && flash.As3is(this.target,com.greensock.core.TweenCore))))
					{
						if(_loc1_ in com.greensock.TweenLite.plugins && (_loc3_ = new (<any>com.greensock.TweenLite.plugins[_loc1_])()).onInitTween(this.target,this.vars[_loc1_],this))
						{
							this.cachedPT1 = new com.greensock.core.PropTween(_loc3_,"changeFactor",0,1,_loc3_.overwriteProps.length == 1?_loc3_.overwriteProps[0]:"_MULTIPLE_",true,this.cachedPT1);
							if(this.cachedPT1.name == "_MULTIPLE_")
							{
								_loc2_ = flash.checkInt(_loc3_.overwriteProps.length);
								while(--_loc2_ > -1)
								{
									this.propTweenLookup[_loc3_.overwriteProps[_loc2_]] = this.cachedPT1;
								}
							}
							else
							{
								this.propTweenLookup[this.cachedPT1.name] = this.cachedPT1;
							}
							if(_loc3_.priority)
							{
								this.cachedPT1.priority = flash.checkInt(_loc3_.priority);
								_loc4_ = true;
							}
							if(_loc3_.onDisable || _loc3_.onEnable)
							{
								this._notifyPluginsOfEnabled = true;
							}
							this._hasPlugins = true;
						}
						else
						{
							this.cachedPT1 = new com.greensock.core.PropTween(this.target,_loc1_,flash.trannumber(this.target[_loc1_]),typeof this.vars[_loc1_] == "number"?flash.trannumber(flash.trannumber(this.vars[_loc1_]) - this.target[_loc1_]):flash.trannumber(flash.trannumber(this.vars[_loc1_])),_loc1_,false,this.cachedPT1);
							this.propTweenLookup[_loc1_] = this.cachedPT1;
						}
					}
				}
				if(_loc4_)
				{
					com.greensock.TweenLite.onPluginEvent("onInitAllProps",this);
				}
				if(this.vars["runBackwards"])
				{
					_loc6_ = this.cachedPT1;
					while(_loc6_)
					{
						_loc6_.start = _loc6_.start + _loc6_.change;
						_loc6_.change = -_loc6_.change;
						_loc6_ = _loc6_.nextNode;
					}
				}
				this._hasUpdate = flash.Boolean(this.vars["onUpdate"] != null);
				if(this._overwrittenProps)
				{
					this.killVars(this._overwrittenProps);
					if(this.cachedPT1 == null)
					{
						this.setEnabled(false,false);
					}
				}
				if(this._overwrite > 1 && this.cachedPT1 && (_loc5_ = com.greensock.TweenLite.masterList.getItem(this.target)) && _loc5_.length > 1)
				{
					if(com.greensock.TweenLite.overwriteManager["manageOverwrites"](this,this.propTweenLookup,_loc5_,this._overwrite))
					{
						this.init();
					}
				}
				this.initted = true;
			}

			public killVars(param1:any,param2:boolean = true):boolean
			{
				var _loc3_:any = null;
				var _loc4_:com.greensock.core.PropTween = <any>null;
				var _loc5_:boolean = <any>false;
				if(this._overwrittenProps == null)
				{
					this._overwrittenProps = {};
				}
				for(_loc3_ in param1)
				{
					if(_loc3_ in this.propTweenLookup)
					{
						_loc4_ = this.propTweenLookup[_loc3_];
						if(_loc4_.isPlugin && _loc4_.name == "_MULTIPLE_")
						{
							_loc4_.target["killProps"](param1);
							if(_loc4_.target["overwriteProps"].length == 0)
							{
								_loc4_.name = "";
							}
							if(_loc3_ != _loc4_.target["propName"] || _loc4_.name == "")
							{
								delete this.propTweenLookup[_loc3_];
							}
						}
						if(_loc4_.name != "_MULTIPLE_")
						{
							if(_loc4_.nextNode)
							{
								_loc4_.nextNode.prevNode = _loc4_.prevNode;
							}
							if(_loc4_.prevNode)
							{
								_loc4_.prevNode.nextNode = _loc4_.nextNode;
							}
							else if(this.cachedPT1 == _loc4_)
							{
								this.cachedPT1 = _loc4_.nextNode;
							}
							if(_loc4_.isPlugin && _loc4_.target["onDisable"])
							{
								_loc4_.target["onDisable"]();
								if(_loc4_.target["activeDisable"])
								{
									_loc5_ = true;
								}
							}
							delete this.propTweenLookup[_loc3_];
						}
					}
					if(param2 && param1 != this._overwrittenProps)
					{
						this._overwrittenProps[_loc3_] = 1;
					}
				}
				return _loc5_;
			}

			public invalidate()
			{
				if(this._notifyPluginsOfEnabled && this.cachedPT1)
				{
					com.greensock.TweenLite.onPluginEvent("onDisable",this);
				}
				this.cachedPT1 = null;
				this._overwrittenProps = null;
				this._hasUpdate = this.initted = this.active = this._notifyPluginsOfEnabled = false;
				this.propTweenLookup = {};
			}

		}
	}
}

com.greensock.TweenLite.fastEaseLookup = new flash.Dictionary(false);
com.greensock.TweenLite.defaultEase = com.greensock.TweenLite.easeOut;
com.greensock.TweenLite.version_static_com_greensock_TweenLite = 11.698;
com.greensock.TweenLite.plugins = {};
com.greensock.TweenLite.masterList = new flash.Dictionary(false);
com.greensock.TweenLite.killDelayedCallsTo = com.greensock.TweenLite.killTweensOf;
com.greensock.TweenLite._shape = new egret.Shape();
com.greensock.TweenLite._reservedProps = {"ease":1,"delay":1,"overwrite":1,"onComplete":1,"onCompleteParams":1,"useFrames":1,"runBackwards":1,"startAt":1,"onUpdate":1,"onUpdateParams":1,"onStart":1,"onStartParams":1,"onInit":1,"onInitParams":1,"onReverseComplete":1,"onReverseCompleteParams":1,"onRepeat":1,"onRepeatParams":1,"proxiedEase":1,"easeParams":1,"yoyo":1,"onCompleteListener":1,"onUpdateListener":1,"onStartListener":1,"onReverseCompleteListener":1,"onRepeatListener":1,"orientToBezier":1,"timeScale":1,"immediateRender":1,"repeat":1,"repeatDelay":1,"timeline":1,"data":1,"paused":1,"reversed":1};
flash.extendsClass("com.greensock.TweenLite","com.greensock.core.TweenCore")
