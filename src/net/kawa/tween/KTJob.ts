module net {
	export module kawa {
		export module tween {
			export class KTJob extends egret.EventDispatcher {
				public name:string;
				public duration:number = NaN;
				public target:any;
				public from:any;
				public to:any;
				public ease:Function;
				public finished:boolean = false;
				public round:boolean = false;
				public repeat:boolean = false;
				public yoyo:boolean = false;
				public onInit:Function;
				public onChange:Function;
				public onComplete:Function;
				public onClose:Function;
				public onCancel:Function;
				public onInitParams:Array<any>;
				public onChangeParams:Array<any>;
				public onCompleteParams:Array<any>;
				public onCloseParams:Array<any>;
				public onCancelParams:Array<any>;
				public next:net.kawa.tween.KTJob;
				private reverse:boolean = false;
				private initialized:boolean = false;
				private canceled:boolean = false;
				private pausing:boolean = false;
				private startTime:number = NaN;
				private lastTime:number = NaN;
				private firstProp:_KTProperty;
				private invokeEvent:boolean = false;

				public constructor(param1:any)
				{
					super();
					this.duration = 1;
					this.ease = net.kawa.tween.easing.Quad.easeOut;
					this.finished = false;
					this.round = false;
					this.repeat = false;
					this.yoyo = false;
					this.reverse = false;
					this.initialized = false;
					this.canceled = false;
					this.pausing = false;
					this.invokeEvent = false;
					this.target = param1;
				}

				public init(param1:number = -1)
				{
					var _self__:any = this;
					var _loc2_:egret.Event = <any>null;
					if(this.initialized)
					{
						return ;
					}
					if(this.finished)
					{
						return ;
					}
					if(this.canceled)
					{
						return ;
					}
					if(this.pausing)
					{
						return ;
					}
					if(param1 < 0)
					{
						param1 = egret.getTimer();
					}
					this.startTime = param1;
					this.setupValues();
					this.initialized = true;
					if(flash.As3is(this.onInit,Function))
					{
						this.onInit.apply(this.onInit,this.onInitParams);
					}
					if(this.invokeEvent)
					{
						_loc2_ = new egret.Event(flash.Event.INIT);
						_self__.dispatchEvent(_loc2_);
					}
				}

				private setupValues()
				{
					var _loc4_:_KTProperty = <any>null;
					var _loc5_:_KTProperty = <any>null;
					var _loc6_:any = null;
					var _loc1_:any = <any>this.from != null?this.from:this.target;
					var _loc2_:any = <any>this.to != null?this.to:this.target;
					var _loc3_:any = <any>this.to != null?this.to:this.from;
					if(_loc3_ == null)
					{
						return ;
					}
					for(_loc6_ in _loc3_)
					{
						if(_loc1_[_loc6_] != _loc2_[_loc6_])
						{
							_loc4_ = new _KTProperty(_loc6_,_loc1_[_loc6_],_loc2_[_loc6_]);
							if(this.firstProp == null)
							{
								this.firstProp = _loc4_;
							}
							else
							{
								_loc5_.next = _loc4_;
							}
							_loc5_ = _loc4_;
						}
					}
					if(this.from != null)
					{
						this.applyFirstValues();
					}
				}

				private applyFirstValues()
				{
					var _self__:any = this;
					var _loc1_:_KTProperty = <any>null;
					var _loc2_:egret.Event = <any>null;
					_loc1_ = this.firstProp;
					while(_loc1_ != null)
					{
						this.target[_loc1_.key] = _loc1_.from;
						_loc1_ = _loc1_.next;
					}
					if(flash.As3is(this.onChange,Function))
					{
						this.onChange.apply(this.onChange,this.onChangeParams);
					}
					if(this.invokeEvent)
					{
						_loc2_ = new egret.Event(egret.Event.CHANGE);
						_self__.dispatchEvent(_loc2_);
					}
				}

				private applyFinalValues()
				{
					var _self__:any = this;
					var _loc1_:_KTProperty = <any>null;
					var _loc2_:egret.Event = <any>null;
					_loc1_ = this.firstProp;
					while(_loc1_ != null)
					{
						this.target[_loc1_.key] = _loc1_.to;
						_loc1_ = _loc1_.next;
					}
					if(flash.As3is(this.onChange,Function))
					{
						this.onChange.apply(this.onChange,this.onChangeParams);
					}
					if(this.invokeEvent)
					{
						_loc2_ = new egret.Event(egret.Event.CHANGE);
						_self__.dispatchEvent(_loc2_);
					}
				}

				public step(param1:number = -1)
				{
					var _self__:any = this;
					var _loc4_:_KTProperty = <any>null;
					var _loc5_:egret.Event = <any>null;
					if(this.finished)
					{
						return ;
					}
					if(this.canceled)
					{
						return ;
					}
					if(this.pausing)
					{
						return ;
					}
					if(param1 < 0)
					{
						param1 = egret.getTimer();
					}
					if(<any>!this.initialized)
					{
						this.init(param1);
						return ;
					}
					if(this.lastTime == param1)
					{
						return ;
					}
					this.lastTime = param1;
					var _loc2_:number = (param1 - this.startTime) * 0.001;
					if(_loc2_ >= this.duration)
					{
						if(this.repeat)
						{
							if(this.yoyo)
							{
								this.reverse = <any>!this.reverse;
							}
							_loc2_ = _loc2_ - this.duration;
							this.startTime = param1 - _loc2_ * 1000;
						}
						else
						{
							this.complete();
							return ;
						}
					}
					var _loc3_:number = _loc2_ / this.duration;
					if(this.reverse)
					{
						_loc3_ = 1 - _loc3_;
					}
					if(flash.As3is(this.ease,Function))
					{
						_loc3_ = this.ease(_loc3_);
					}
					if(this.round)
					{
						_loc4_ = this.firstProp;
						while(_loc4_ != null)
						{
							this.target[_loc4_.key] = Math.round(_loc4_.from + _loc4_.diff * _loc3_);
							_loc4_ = _loc4_.next;
						}
					}
					else
					{
						_loc4_ = this.firstProp;
						while(_loc4_ != null)
						{
							this.target[_loc4_.key] = _loc4_.from + _loc4_.diff * _loc3_;
							_loc4_ = _loc4_.next;
						}
					}
					if(flash.As3is(this.onChange,Function))
					{
						this.onChange.apply(this.onChange,this.onChangeParams);
					}
					if(this.invokeEvent)
					{
						_loc5_ = new egret.Event(egret.Event.CHANGE);
						_self__.dispatchEvent(_loc5_);
					}
				}

				public complete()
				{
					var _self__:any = this;
					var _loc1_:egret.Event = <any>null;
					if(<any>!this.initialized)
					{
						return ;
					}
					if(this.finished)
					{
						return ;
					}
					if(this.canceled)
					{
						return ;
					}
					if(<any>!this.target)
					{
						return ;
					}
					this.applyFinalValues();
					this.finished = true;
					if(flash.As3is(this.onComplete,Function))
					{
						this.onComplete.apply(this.onComplete,this.onCompleteParams);
					}
					if(this.invokeEvent)
					{
						_loc1_ = new egret.Event(egret.Event.COMPLETE);
						_self__.dispatchEvent(_loc1_);
					}
				}

				public cancel()
				{
					var _self__:any = this;
					var _loc1_:egret.Event = <any>null;
					if(<any>!this.initialized)
					{
						return ;
					}
					if(this.canceled)
					{
						return ;
					}
					if(<any>!this.target)
					{
						return ;
					}
					this.applyFirstValues();
					this.finished = true;
					this.canceled = true;
					if(flash.As3is(this.onCancel,Function))
					{
						this.onCancel.apply(this.onCancel,this.onCancelParams);
					}
					if(this.invokeEvent)
					{
						_loc1_ = new egret.Event(flash.Event.CANCEL);
						_self__.dispatchEvent(_loc1_);
					}
				}

				public close()
				{
					var _self__:any = this;
					var _loc1_:egret.Event = <any>null;
					if(<any>!this.initialized)
					{
						return ;
					}
					if(this.canceled)
					{
						return ;
					}
					this.finished = true;
					if(flash.As3is(this.onClose,Function))
					{
						this.onClose.apply(this.onClose,this.onCloseParams);
					}
					if(this.invokeEvent)
					{
						_loc1_ = new egret.Event(egret.Event.CLOSE);
						_self__.dispatchEvent(_loc1_);
					}
					this.clearnup();
				}

				protected clearnup()
				{
					this.onInit = null;
					this.onChange = null;
					this.onComplete = null;
					this.onCancel = null;
					this.onClose = null;
					this.onInitParams = null;
					this.onChangeParams = null;
					this.onCompleteParams = null;
					this.onCloseParams = null;
					this.onCancelParams = null;
					this.firstProp = null;
					this.invokeEvent = false;
				}

				public abort()
				{
					this.finished = true;
					this.canceled = true;
					this.clearnup();
				}

				public pause()
				{
					if(this.pausing)
					{
						return ;
					}
					this.pausing = true;
					this.lastTime = egret.getTimer();
				}

				public resume()
				{
					if(<any>!this.pausing)
					{
						return ;
					}
					this.pausing = false;
					var _loc1_:number = egret.getTimer();
					this.startTime = _loc1_ - (this.lastTime - this.startTime);
					this.step(_loc1_);
				}

				public addEventListener(param1:string,param2:Function,thisObject:any,param3:boolean = false,param4:number = 0,param5:boolean = false)
				{
					super.addEventListener(param1,param2,null,param3,param4);
					this.invokeEvent = true;
				}

			}

			 class _KTProperty extends egret.HashObject {
				public key:string;
				public from:number = NaN;
				public to:number = NaN;
				public diff:number = NaN;
				public next:_KTProperty;

				public constructor(param1:string,param2:number,param3:number,param4:_KTProperty = null)
				{
					super();
					super();
					this.key = param1;
					this.from = param2;
					this.to = param3;
					this.diff = param3 - param2;
					this.next = param4;
				}

			}
		}
	}
}

flash.extendsClass("net.kawa.tween.KTJob","egret.EventDispatcher")
