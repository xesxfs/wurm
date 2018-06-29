module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export module gameParts {
					export class WurmsLines extends egret.Sprite {
						private _gr:egret.Graphics;
						private POS_DF:number = 24;
						private _tempRad:number = 0.0;
						private _dfX:number = 0.0;
						private _dfY:number = 0.0;
						private LN_DF:number = 7.0;
						private _dx:number = 0.0;
						private _dy:number = 0.0;
						private _tempVec:Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>;

						public constructor()
						{
							super();
							this._tempVec = new Array<com.strangevillage.wudywurm.parts.gameParts.WurmBlock>();
							this.touchChildren = false;
							this.touchEnabled = false;
							this._gr = this.graphics;
						}

						public drawLines()
						{
							var _loc2_:number = flash.checkInt(0);
							this._gr.clear();
							var _loc1_:number = flash.checkInt(0);
							while(_loc1_ < com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs.length)
							{
								this._tempVec = com.strangevillage.wudywurm.helpers.GridHolder.wurmsVecs[_loc1_];
								_loc2_ = flash.checkInt(0);
								while(_loc2_ < this._tempVec.length - 1)
								{
									if(this._checkDist(this._tempVec[_loc2_].x,this._tempVec[_loc2_].y,this._tempVec[_loc2_ + 1].x,this._tempVec[_loc2_ + 1].y))
									{
										this._gr.lineStyle(14,10054484);
										this._gr.moveTo(this._tempVec[_loc2_].x + this.POS_DF,this._tempVec[_loc2_].y + this.POS_DF);
										this._gr.lineTo(this._tempVec[_loc2_ + 1].x + this.POS_DF,this._tempVec[_loc2_ + 1].y + this.POS_DF);
										this._tempRad = Math.atan2(this._tempVec[_loc2_].y - this._tempVec[_loc2_ + 1].y,this._tempVec[_loc2_].x - this._tempVec[_loc2_ + 1].x);
										this._dfX = Math.sin(this._tempRad) * this.LN_DF;
										this._dfY = Math.cos(this._tempRad) * this.LN_DF;
										this._gr.lineStyle(3,7621946);
										this._gr.moveTo(this._tempVec[_loc2_].x + this.POS_DF + this._dfX,this._tempVec[_loc2_].y + this.POS_DF - this._dfY);
										this._gr.lineTo(this._tempVec[_loc2_ + 1].x + this.POS_DF + this._dfX,this._tempVec[_loc2_ + 1].y + this.POS_DF - this._dfY);
										this._gr.moveTo(this._tempVec[_loc2_].x + this.POS_DF - this._dfX,this._tempVec[_loc2_].y + this.POS_DF + this._dfY);
										this._gr.lineTo(this._tempVec[_loc2_ + 1].x + this.POS_DF - this._dfX,this._tempVec[_loc2_ + 1].y + this.POS_DF + this._dfY);
									}
									_loc2_++;
								}
								_loc1_++;
							}
						}

						private _checkDist(param1:number,param2:number,param3:number,param4:number):boolean
						{
							this._dx = param3 - param1;
							this._dy = param4 - param2;
							if(Math.sqrt(this._dx * this._dx + this._dy * this._dy) < 80)
							{
								return true;
							}
							return false;
						}

					}
				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.gameParts.WurmsLines","egret.Sprite")
