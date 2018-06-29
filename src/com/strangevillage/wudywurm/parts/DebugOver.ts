module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export class DebugOver extends egret.Sprite {
					private _stats:net.hires.debug.Stats;
					private _gridInfoVec:Array<flash.TextField>;
					private _checkRects:egret.Sprite;
					private _limArr:Array<any>;

					public constructor()
					{
						super(						var _self__:any = this;
);
						this._gridInfoVec = new Array<flash.TextField>();
						this._limArr = [];
						if(this.stage)
						{
							this.init();
						}
						else
						{
							_self__.addEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.init,this),null);
						}
					}

					private init(param1:egret.Event = null)
					{
						var _self__:any = this;
						_self__.removeEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.init,this),null);
						this.touchChildren = false;
						this.touchEnabled = false;
						this._setStats();
						this.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this._loop,this),null,false,0);
					}

					private _setStats()
					{
						this._stats = new Stats();
						this._stats["alpha"] = 0.3;
						this.addChild(this._stats);
					}

					private _setGridInfo()
					{
						var _loc2_:number = flash.checkInt(0);
						var _loc3_:flash.TextField = <any>null;
						var _loc1_:number = flash.checkInt(0);
						while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.GRID_H)
						{
							_loc2_ = flash.checkInt(0);
							while(_loc2_ < com.strangevillage.wudywurm.helpers.GridHolder.GRID_W)
							{
								_loc3_ = new flash.TextField();
								_loc3_.x = _loc2_ * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE + com.strangevillage.wudywurm.helpers.GridHolder.GRID_X + 20;
								_loc3_.y = _loc1_ * com.strangevillage.wudywurm.helpers.GridHolder.TILE_SIZE + com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y + 15;
								_loc3_.alpha = 0.4;
								this.addChild(_loc3_);
								this._gridInfoVec.push(_loc3_);
								_loc2_++;
							}
							_loc1_++;
						}
					}

					private _setCheckRects()
					{
						this._checkRects = new egret.Sprite();
						this.addChild(this._checkRects);
					}

					private _loop(param1:egret.Event)
					{
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.DebugOver","egret.Sprite")
