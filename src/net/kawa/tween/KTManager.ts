module net {
	export module kawa {
		export module tween {
			export class KTManager extends egret.HashObject {
				private stage:egret.Sprite;
				private running:boolean = false;
				private firstJob:net.kawa.tween.KTJob;
				private lastJob:net.kawa.tween.KTJob;
				private firstAdded:net.kawa.tween.KTJob;
				private lastAdded:net.kawa.tween.KTJob;

				public constructor()
				{
					super();
					super();
					this.running = false;
					this.stage = new egret.Sprite();
				}

				public queue(param1:net.kawa.tween.KTJob,param2:number = 0)
				{
					var that:net.kawa.tween.KTManager = <any>null;
					var closure:Function = <any>null;
					var job:net.kawa.tween.KTJob = param1;
					var delay:number = param2;
					if(delay > 0)
					{
						that = this;
						closure = function ()
						{
							that.queue(job);
						};
						flash.setTimeout(closure,delay * 1000);
						return ;
					}
					job.init();
					if(this.lastAdded != null)
					{
						this.lastAdded.next = job;
					}
					else
					{
						this.firstAdded = job;
					}
					this.lastAdded = job;
					if(<any>!this.running)
					{
						this.awake();
					}
				}

				private awake()
				{
					if(this.running)
					{
						return ;
					}
					this.stage.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this.enterFrameHandler,this),null,false,0);
					this.running = true;
				}

				private sleep()
				{
					this.stage.removeEventListener(egret.Event.ENTER_FRAME,flash.bind(this.enterFrameHandler,this),null);
					this.running = false;
				}

				private enterFrameHandler(param1:egret.Event)
				{
					if(this.firstAdded != null)
					{
						this.mergeList();
					}
					if(this.firstJob == null)
					{
						this.sleep();
						return ;
					}
					var _loc2_:number = egret.getTimer();
					var _loc3_:net.kawa.tween.KTJob = <any>null;
					var _loc4_:net.kawa.tween.KTJob = this.firstJob;
					_loc4_ = this.firstJob;
					while(_loc4_ != null)
					{
						if(_loc4_.finished)
						{
							if(_loc3_ == null)
							{
								this.firstJob = _loc4_.next;
							}
							else
							{
								_loc3_.next = _loc4_.next;
							}
							if(_loc4_.next == null)
							{
								this.lastJob = _loc3_;
							}
							_loc4_.close();
						}
						else
						{
							_loc4_.step(_loc2_);
							_loc3_ = _loc4_;
						}
						_loc4_ = _loc4_.next;
					}
				}

				public abort()
				{
					var _loc1_:net.kawa.tween.KTJob = <any>null;
					this.mergeList();
					_loc1_ = this.firstJob;
					while(_loc1_ != null)
					{
						_loc1_.abort();
						_loc1_ = _loc1_.next;
					}
				}

				public cancel()
				{
					var _loc1_:net.kawa.tween.KTJob = <any>null;
					this.mergeList();
					_loc1_ = this.firstJob;
					while(_loc1_ != null)
					{
						_loc1_.cancel();
						_loc1_ = _loc1_.next;
					}
				}

				public complete()
				{
					var _loc1_:net.kawa.tween.KTJob = <any>null;
					this.mergeList();
					_loc1_ = this.firstJob;
					while(_loc1_ != null)
					{
						_loc1_.complete();
						_loc1_ = _loc1_.next;
					}
				}

				public pause()
				{
					var _loc1_:net.kawa.tween.KTJob = <any>null;
					this.mergeList();
					_loc1_ = this.firstJob;
					while(_loc1_ != null)
					{
						_loc1_.pause();
						_loc1_ = _loc1_.next;
					}
				}

				public resume()
				{
					var _loc1_:net.kawa.tween.KTJob = <any>null;
					_loc1_ = this.firstJob;
					while(_loc1_ != null)
					{
						_loc1_.resume();
						_loc1_ = _loc1_.next;
					}
				}

				private mergeList()
				{
					if(<any>!this.firstAdded)
					{
						return ;
					}
					if(this.lastJob != null)
					{
						this.lastJob.next = this.firstAdded;
					}
					else
					{
						this.firstJob = this.firstAdded;
					}
					this.lastJob = this.lastAdded;
					this.firstAdded = null;
					this.lastAdded = null;
				}

			}
		}
	}
}

