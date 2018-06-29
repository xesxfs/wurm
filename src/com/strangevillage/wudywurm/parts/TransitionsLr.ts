module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export class TransitionsLr extends egret.Sprite {
					private _blackOver:egret.Sprite;
					private _bmsVec:Array<flash.Bitmap>;
					private _hitMc:egret.Sprite;
					private PARTS:number = 6;
					private MAX_TRANS_TIME:number = 0.8;
					private TRANS_DIFF:number = 0.06;
					private _copyRect:egret.Rectangle;
					private _copyPt:egret.Point;

					public constructor()
					{
						super();
						this._bmsVec = new Array<flash.Bitmap>();
						this._copyPt = new egret.Point();
						this.touchChildren = false;
						this.visible = false;
						this._setHitMc();
						this._setBlOver();
						this._setBms();
					}

					private _setHitMc()
					{
						this._hitMc = new egret.Sprite();
						this._hitMc.graphics.beginFill(0,1);
						this._hitMc.graphics.drawRect(0,0,com.strangevillage.wudywurm.Config.GAME_W,com.strangevillage.wudywurm.Config.GAME_H);
						this._hitMc.graphics.endFill();
						this.addChild(this._hitMc);
						this["hitArea"] = this._hitMc;
						this._hitMc.visible = false;
					}

					private _setBlOver()
					{
						this._blackOver = new egret.Sprite();
						this.addChild(this._blackOver);
						this._blackOver.graphics.beginFill(1,1051146);
						this._blackOver.graphics.drawRect(0,0,com.strangevillage.wudywurm.Config.GAME_W,com.strangevillage.wudywurm.Config.GAME_H);
						this._blackOver.graphics.endFill();
					}

					private _setBms()
					{
						var _loc2_:flash.BitmapData = <any>null;
						var _loc3_:flash.Bitmap = <any>null;
						this._copyRect = new egret.Rectangle(0,0,125,com.strangevillage.wudywurm.Config.GAME_H);
						var _loc1_:number = flash.checkInt(0);
						while(_loc1_ < this.PARTS)
						{
							if(_loc1_ == 0)
							{
								_loc2_ = new flash.BitmapData(125,com.strangevillage.wudywurm.Config.GAME_H,false,0);
							}
							else
							{
								_loc2_ = new flash.BitmapData(127,com.strangevillage.wudywurm.Config.GAME_H,false,0);
							}
							_loc3_ = new flash.Bitmap(_loc2_,flash.PixelSnapping.NEVER,true);
							this.addChild(_loc3_);
							this._bmsVec.push(_loc3_);
							if(_loc1_ > 0)
							{
								_loc3_.x = 125 + 127 * (_loc1_ - 1);
								_loc3_.y = Math.random() * 300;
							}
							_loc1_++;
						}
					}

					public playTrans(param1:flash.BitmapData)
					{
						this.visible = true;
						var _loc2_:number = flash.checkInt(0);
						while(_loc2_ < this.PARTS)
						{
							if(_loc2_ > 0)
							{
								this._copyRect.x = 125 + 127 * (_loc2_ - 1);
								this._copyRect.width = 127;
							}
							else
							{
								this._copyRect.x = 0;
								this._copyRect.width = 125;
							}
							this._bmsVec[_loc2_].bitmapData.copyPixels(param1,this._copyRect,this._copyPt);
							this._bmsVec[_loc2_]["smoothing"] = true;
							this._bmsVec[_loc2_].y = 0;
							if(_loc2_ % 2 == 0)
							{
								com.greensock.TweenLite.to(this._bmsVec[_loc2_],this.MAX_TRANS_TIME - (this.PARTS - _loc2_) * this.TRANS_DIFF,{"y":-com.strangevillage.wudywurm.Config.GAME_H,"ease":com.greensock.easing.Sine.easeIn});
							}
							else
							{
								com.greensock.TweenLite.to(this._bmsVec[_loc2_],this.MAX_TRANS_TIME - (this.PARTS - _loc2_) * this.TRANS_DIFF,{"y":com.strangevillage.wudywurm.Config.GAME_H,"ease":com.greensock.easing.Sine.easeIn});
							}
							_loc2_++;
						}
						this._blackOver.alpha = 0.8;
						com.greensock.TweenLite.to(this._blackOver,this.MAX_TRANS_TIME,{"alpha":0,"onComplete":flash.bind(this._transAnimEnd,this)});
					}

					private _transAnimEnd()
					{
						this.visible = false;
					}

				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.TransitionsLr","egret.Sprite")
